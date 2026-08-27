/**
 * Generates the publishable SDK packages under packages/<packageDir>/ from a single
 * OpenAPI spec at spec/sdk.openapi.json.
 *
 * One spec → many packages. Operations are tagged with `x-sdk-audiences: [...]` in the
 * source controllers (src/sdk-api/*) and this script splits them into per-audience
 * packages defined by contract.cjs. Each generated package contains:
 *   - dist/index.js + dist/index.d.ts (runtime client + types)
 *   - openapi.json (audience-filtered spec, used by check-compatibility.cjs)
 *   - package.json, README.md, AGENTS.md, ai-manifest.json
 *   - skills/<skill-dir>/SKILL.md (agent-skill metadata)
 *
 * Why a hand-rolled generator instead of openapi-generator/orval/etc:
 *   - We need first-class agent-facing artifacts (AGENTS.md, ai-manifest.json, SKILL.md)
 *     that off-the-shelf generators don't produce.
 *   - The audience-split + tight control over the public type surface is easier to
 *     express directly than as a plugin to a third-party generator.
 *   - The output must remain dependency-free at runtime (uses globalThis.fetch).
 *
 * Versions are read from versions.json (managed by bump-version.cjs);
 * missing entries fall back to '0.0.0-development'. Prerelease (rc) builds instead
 * baseline off the highest of versions.json and the released dist-tag on npm — see
 * resolvePrereleaseBaseline. The generator wipes each package directory before writing —
 * never hand-edit files under packages/<packageDir>/.
 */
const fs = require('fs')
const path = require('path')
const { execFileSync } = require('child_process')
const { sdkPackages } = require('./contract.cjs')

const rootDir = path.resolve(__dirname, '..')
const packagesRootDir = path.join(rootDir, 'packages')
const openApiSpecPath = path.join(rootDir, 'spec', 'sdk.openapi.json')
const versionsPath = path.join(rootDir, 'versions.json')
const httpMethods = new Set(['get', 'post', 'put', 'patch', 'delete'])
const defaultSdkBaseUrl = 'https://api.rundit.com/api/v2/sdk'

function main() {
  const spec = JSON.parse(fs.readFileSync(openApiSpecPath, 'utf8'))
  const packageVersions = resolveSdkPackageVersions(loadSdkPackageVersions())
  fs.mkdirSync(packagesRootDir, { recursive: true })

  Object.entries(sdkPackages).forEach(([audience, packageConfig]) => {
    const packageDir = path.join(packagesRootDir, packageConfig.packageDir)
    const packageRoutes = collectRoutesForAudience(spec, audience)
    const typeContext = buildTypeContext(spec, packageRoutes)

    // Wipe-and-rewrite: we never want stale files left behind from a previous spec
    // (e.g. a removed endpoint's generated method lingering in dist/index.js).
    fs.rmSync(packageDir, { recursive: true, force: true })
    fs.mkdirSync(path.join(packageDir, 'dist'), { recursive: true })

    writeFile(
      packageDir,
      'package.json',
      JSON.stringify(createPackageJson(packageConfig, packageVersions[audience] || '0.0.0-development'), null, 2) +
        '\n',
    )
    writeFile(packageDir, 'README.md', createReadme(packageConfig, packageRoutes))
    writeFile(packageDir, 'AGENTS.md', createAgentsGuide(packageConfig, packageRoutes))
    writeFile(
      packageDir,
      'ai-manifest.json',
      JSON.stringify(createAiManifest(packageConfig, packageRoutes), null, 2) + '\n',
    )
    writeFile(
      path.join(packageDir, 'skills', createSkillDirectoryName(packageConfig)),
      'SKILL.md',
      createSkillMarkdown(packageConfig, packageRoutes),
    )
    writeFile(packageDir, 'openapi.json', JSON.stringify(createAudienceOpenApiSpec(spec, audience), null, 2) + '\n')
    writeFile(path.join(packageDir, 'dist'), 'index.js', createRuntimeSource(packageConfig, packageRoutes))
    writeFile(
      path.join(packageDir, 'dist'),
      'index.d.ts',
      createTypeDeclarations(packageConfig, packageRoutes, typeContext),
    )
  })
}

function loadSdkPackageVersions() {
  if (!fs.existsSync(versionsPath)) {
    return {}
  }

  return JSON.parse(fs.readFileSync(versionsPath, 'utf8'))
}

function resolveSdkPackageVersions(packageVersions) {
  return Object.fromEntries(
    Object.keys(sdkPackages).map((packageKey) => [
      packageKey,
      resolvePackageVersion(packageKey, packageVersions[packageKey] || '0.0.0-development'),
    ]),
  )
}

function resolvePackageVersion(packageKey, version) {
  const prereleaseChannel = process.env.SDK_PRERELEASE_CHANNEL?.trim()

  if (!prereleaseChannel) {
    return version
  }

  const prereleaseIteration = sanitizePrereleaseIdentifier(process.env.SDK_PRERELEASE_ITERATION || '0')
  const prereleaseBump = process.env.SDK_PRERELEASE_BUMP || 'patch'
  const stableVersion = resolvePrereleaseBaseline(packageKey, version)

  return `${bumpStableVersion(stableVersion, prereleaseBump)}-${sanitizePrereleaseIdentifier(prereleaseChannel)}.${prereleaseIteration}`
}

/**
 * Picks the stable version an rc should preview.
 *
 * An rc is "the next stable", so its baseline must be the newest released version. It
 * cannot be versions.json alone: that file is only bumped by the release job on the
 * production branch and is never merged back, so on develop it stays frozen at whatever
 * it was when the line started. That is how rc got stuck re-issuing 0.3.1-rc.N after
 * 0.3.1, 0.3.2 and 0.3.3 had already shipped to `latest`.
 *
 * Taking the highest of (released dist-tag, versions.json) makes the rc line correct by
 * construction while still honouring a deliberate manual jump in versions.json — moving
 * the line forward by hand (as `chore(sdk): move rc/stable line to 0.3.x` once did) keeps
 * working, because a hand-set higher version wins.
 *
 * Falls back to versions.json when the package has never been published, and when the
 * registry cannot be reached at all — the publish step queries npm again and will fail
 * loudly there rather than here.
 */
function resolvePrereleaseBaseline(packageKey, version) {
  const declared = normalizeStableVersion(version)
  const releaseTag = process.env.SDK_RELEASE_DIST_TAG?.trim() || 'latest'
  const packageName = sdkPackages[packageKey]?.packageName

  if (!packageName) {
    return declared
  }

  const published = normalizeStableVersion(readPublishedVersion(packageName, releaseTag) || '0.0.0')

  if (compareStableVersions(published, declared) > 0) {
    console.log(
      `${packageKey}: baselining rc on ${packageName}@${releaseTag} (${published}) — versions.json says ${declared}`,
    )
    return published
  }

  return declared
}

/** Released version behind a dist-tag, or null when unpublished / registry unreachable. */
function readPublishedVersion(packageName, tag) {
  try {
    const output = execFileSync('npm', ['view', packageName, `dist-tags.${tag}`, '--json'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    }).trim()

    return output ? JSON.parse(output) : null
  } catch {
    return null
  }
}

/** Numeric compare of two x.y.z strings. Returns >0 when `left` is newer. */
function compareStableVersions(left, right) {
  const leftParts = left.split('.').map((part) => Number.parseInt(part, 10) || 0)
  const rightParts = right.split('.').map((part) => Number.parseInt(part, 10) || 0)

  for (let index = 0; index < 3; index += 1) {
    if (leftParts[index] !== rightParts[index]) {
      return leftParts[index] - rightParts[index]
    }
  }

  return 0
}

function normalizeStableVersion(version) {
  return String(version).split('-')[0]
}

function bumpStableVersion(version, bump) {
  const [major, minor, patch] = normalizeStableVersion(version)
    .split('.')
    .map((part) => Number.parseInt(part, 10) || 0)

  switch (bump) {
    case 'major':
      return `${major + 1}.0.0`
    case 'minor':
      return `${major}.${minor + 1}.0`
    case 'patch':
    default:
      return `${major}.${minor}.${patch + 1}`
  }
}

function sanitizePrereleaseIdentifier(value) {
  return (
    String(value)
      .trim()
      .replace(/[^0-9A-Za-z-]+/g, '-')
      .replace(/^-+|-+$/g, '') || '0'
  )
}

function createAudienceOpenApiSpec(spec, audience) {
  const filteredPaths = Object.fromEntries(
    Object.entries(spec.paths || {})
      .map(([specPath, pathItem]) => {
        const filteredOperations = Object.fromEntries(
          Object.entries(pathItem || {}).filter(
            ([method, operation]) =>
              httpMethods.has(method) &&
              Array.isArray(operation['x-sdk-audiences']) &&
              operation['x-sdk-audiences'].includes(audience),
          ),
        )

        return [specPath, filteredOperations]
      })
      .filter(([, pathItem]) => Object.keys(pathItem).length > 0),
  )

  return {
    ...spec,
    paths: filteredPaths,
  }
}

function createPackageJson(packageConfig, version) {
  return {
    name: packageConfig.packageName,
    version,
    description: packageConfig.description,
    // Must point at the repo that publishes these packages (rundit-sdk), not where the
    // API lives (rundit-back) — npm provenance validates repository.url against the
    // building repo and rejects a mismatch (422). git+https is npm's normalized form.
    repository: {
      type: 'git',
      url: 'git+https://github.com/Rundit/rundit-sdk.git',
      directory: `packages/${packageConfig.packageDir}`,
    },
    type: 'module',
    sideEffects: false,
    main: './dist/index.js',
    types: './dist/index.d.ts',
    exports: {
      '.': {
        import: './dist/index.js',
        types: './dist/index.d.ts',
      },
    },
    files: ['dist', 'README.md', 'AGENTS.md', 'ai-manifest.json', 'openapi.json', 'skills'],
    publishConfig: {
      access: 'public',
    },
  }
}

function createReadme(packageConfig, packageRoutes) {
  const installCommand = `npm install ${packageConfig.packageName}`
  const authField = packageConfig.auth.optionKey
  const sampleRoute = packageRoutes[0]
  const usageLine = sampleRoute ? `await ${createExampleCall(sampleRoute)}` : '// No SDK routes available yet'
  const namespaceSections = Object.entries(buildNamespaceMap(packageRoutes))
    .map(([namespace, routes]) => createNamespaceReadmeSection(namespace, routes))
    .join('\n\n')
  const placeholderBlock =
    packageConfig.maturity === 'placeholder'
      ? `## Status\n\n> Placeholder package. ${packageConfig.placeholderNotice}\n\n`
      : ''
  const usageContextLabel = packageConfig.usage?.contextLabel
  const contextLine = usageContextLabel ? `- Designed for ${usageContextLabel}\n` : ''
  const authSection = createReadmeAuthSection(packageConfig)
  const aiQuickstart =
    packageConfig.maturity === 'placeholder'
      ? `## AI Quickstart\n\n- Treat this package as a future-facing placeholder, not the primary SDK for current integrations\n- Prefer \`${sdkPackages.embed.packageName}\` for active embedded integrations today\n- You may still inspect \`routeManifest\`, \`AGENTS.md\`, and \`ai-manifest.json\` to understand the generalized client-generation shape\n- Agent skill metadata is published under \`skills/${createSkillDirectoryName(packageConfig)}/SKILL.md\`\n`
      : `## AI Quickstart\n\n${contextLine}- Use namespace methods such as \`client.companies.getAll()\` or \`client.positions.getPortfolioPositions({ currency: 'USD' })\`\n- Inspect \`routeManifest\` at runtime for a machine-readable map of method paths, parameters, and response types\n- Read \`AGENTS.md\` or \`ai-manifest.json\` in this package for AI-focused usage guidance\n- Agent skill metadata is published under \`skills/${createSkillDirectoryName(packageConfig)}/SKILL.md\`\n- Follow the generated DTO types for identifiers; current company, company group, and transaction ids are numeric, while aggregated position summaries do not expose a standalone \`id\`\n`

  return `# ${packageConfig.packageName}

${packageConfig.description}

${placeholderBlock}

## Install

\`\`\`bash
${installCommand}
\`\`\`

## Usage

\`\`\`ts
import { ${packageConfig.factoryName} } from '${packageConfig.packageName}'

const client = ${packageConfig.factoryName}({
  ${authField}: '<${packageConfig.auth.docsLabel}>',
  // baseUrl: 'https://test.rundit.com/api/v2/sdk',
})

${usageLine}
\`\`\`

${authSection}

${aiQuickstart}

## Methods

${namespaceSections}

## TypeScript

- This package ships generated \`.d.ts\` files
- Public DTOs, response aliases, and query parameter types are generated from \`spec/sdk.openapi.json\`
- Generated methods and query types include JSDoc summaries for editor and agent consumption
- Agent skill metadata is published under \`skills/${createSkillDirectoryName(packageConfig)}/SKILL.md\`

## Notes

- This package is generated from \`spec/sdk.openapi.json\`
- Defaults to \`${defaultSdkBaseUrl}\`; pass \`baseUrl\` to target a different environment such as test
- Do not edit files under \`dist/\` manually
`
}

function createReadmeAuthSection(packageConfig) {
  if (packageConfig.auth.optionKey === 'apiKey') {
    return `## Authentication

- Authenticated with a tenant-scoped Rundit API key sent via the \`X-API-Key\` header
- API keys are user-scoped: every request resolves to the owning user's roles and company access; the SDK cannot escape those bounds
- Obtain an API key from your Rundit account settings (personal API keys); rotate or revoke from the same screen
- Treat keys as secrets: never commit them, prefer environment variables, and use separate keys per integration
`
  }

  return `## Authentication

- Authenticated with an embed session token sent as a \`Bearer\` token in the \`Authorization\` header
- Embed tokens are short-lived and minted by the host application for a specific user
- Tokens carry the issuing user's security context; the SDK cannot escape those bounds
`
}

function createAgentsGuide(packageConfig, packageRoutes) {
  const namespaceGuides = Object.entries(buildNamespaceMap(packageRoutes))
    .map(([namespace, routes]) => {
      const methodLines = routes.map((route) => {
        const params = createReadableParamSummary(route)
        return `- ${route.namespace}.${route.operation}: ${route.summary || route.description || `${route.method} ${route.path}`}\n  - Call: \`${createExampleCall(route)}\`\n  - Returns: \`${route.responseTypeName}\`${params ? `\n  - Params: ${params}` : ''}`
      })

      return `## ${namespace}\n\n${methodLines.join('\n')}`
    })
    .join('\n\n')

  const placeholderBlock =
    packageConfig.maturity === 'placeholder'
      ? `## Status\n\nThis is a placeholder package. ${packageConfig.placeholderNotice}\n\nUse it as a reference for future API-key client ergonomics, not as the primary SDK recommendation today.\n\n`
      : ''

  return `# AI Guide for ${packageConfig.packageName}

This package is generated for agentic and human consumers.

${placeholderBlock}

## Initialization

\`\`\`ts
import { ${packageConfig.factoryName}, routeManifest } from '${packageConfig.packageName}'

const client = ${packageConfig.factoryName}({
  ${packageConfig.auth.optionKey}: '<${packageConfig.auth.docsLabel}>',
  // baseUrl: 'https://test.rundit.com/api/v2/sdk',
})

console.log(routeManifest)
\`\`\`

## Guidance

- Prefer namespace methods on the client instead of constructing URLs manually
- Use \`routeManifest\` or \`ai-manifest.json\` to discover available calls programmatically
- Pass required path ids using the generated method signatures; current company and company-group path ids are numeric
- Positions endpoints require a \`currency\` query value
- Follow the generated DTO types for identifiers; current company, company group, and transaction ids are numeric, while aggregated position summaries do not expose a standalone \`id\`

${namespaceGuides}
`
}

function createSkillDirectoryName(packageConfig) {
  return packageConfig.packageName.replace('@', '').replace(/\//g, '-')
}

function createSkillMarkdown(packageConfig, packageRoutes) {
  const namespaces = Object.keys(buildNamespaceMap(packageRoutes))
  const sampleRoute = packageRoutes[0]
  const usageLine = sampleRoute ? `await ${createExampleCall(sampleRoute)}` : '// No SDK routes available yet'
  const intent = [
    'Use when an agent should prefer generated SDK methods over handwritten fetch calls',
    'Use when route discovery, typed path parameters, or typed query parameters are needed',
    `Use when a task needs data from ${packageConfig.packageName}`,
  ]

  if (packageConfig.maturity === 'placeholder') {
    intent.unshift('Use when exploring the future API-key SDK surface or the generalized SDK generator output')
  } else if (packageConfig.usage?.skillIntent) {
    intent.unshift(packageConfig.usage.skillIntent)
  }

  const description =
    packageConfig.maturity === 'placeholder'
      ? `${packageConfig.description} Placeholder skill for future client ergonomics and generator discovery.`
      : `${packageConfig.description}${packageConfig.usage?.skillTagline ? ` ${packageConfig.usage.skillTagline}` : ''}`

  return `---
description: ${description}
intent:
${intent.map((line) => `  - ${line}`).join('\n')}
---

# ${packageConfig.packageName}

## When to use

- Prefer this SDK instead of constructing raw SDK URLs manually
- Use namespace methods for discoverability and typed parameters
- Inspect \`routeManifest\`, \`ai-manifest.json\`, or \`openapi.json\` when an agent needs route details

## Initialization

\`\`\`ts
import { ${packageConfig.factoryName} } from '${packageConfig.packageName}'

const client = ${packageConfig.factoryName}({
  ${packageConfig.auth.optionKey}: '<${packageConfig.auth.docsLabel}>',
  // baseUrl: 'https://test.rundit.com/api/v2/sdk',
})

${usageLine}
\`\`\`

## Guidance

- Namespaces: ${namespaces.join(', ') || 'none yet'}
- Follow the generated DTO types for identifiers; company, company group, and transaction ids are numeric today, while aggregated position summaries do not expose a standalone \`id\`
- Positions endpoints require a \`currency\` query parameter
${packageConfig.maturity === 'placeholder' ? `- This is a placeholder skill; prefer \`${sdkPackages.embed.packageName}\` for active integrations today\n` : ''}- Generated package artifacts live under \`dist/\`; agent skill metadata lives under \`skills/\`
`
}

function createAiManifest(packageConfig, packageRoutes) {
  return {
    packageName: packageConfig.packageName,
    description: packageConfig.description,
    maturity: packageConfig.maturity || 'active',
    placeholderNotice: packageConfig.placeholderNotice || null,
    factoryName: packageConfig.factoryName,
    initialization: {
      baseUrlDefault: defaultSdkBaseUrl,
      authOption: packageConfig.auth.optionKey,
      authLabel: packageConfig.auth.docsLabel,
    },
    guidance: {
      mixedIdentifierTypes: false,
      runtimeManifestExport: 'routeManifest',
      notes: [
        'Use namespace methods instead of manual fetch calls',
        'Positions endpoints require currency',
        'Follow generated DTO types for identifiers; positions are aggregated summaries and do not expose a standalone id',
      ],
    },
    namespaces: Object.fromEntries(
      Object.entries(buildNamespaceMap(packageRoutes)).map(([namespace, routes]) => [
        namespace,
        routes.map((route) => ({
          operation: route.operation,
          summary: route.summary || null,
          description: route.description || null,
          method: route.method,
          path: route.path,
          exampleCall: createExampleCall(route),
          responseType: route.responseTypeName,
          pathParams: route.pathParams,
          queryParams: route.queryParams,
        })),
      ]),
    ),
  }
}

function createRuntimeSource(packageConfig, packageRoutes) {
  const namespaces = buildNamespaceMap(packageRoutes)
  const routeManifest = createRouteManifest(namespaces)
  const namespaceFactories = Object.entries(namespaces)
    .map(([namespace, routes]) => createNamespaceFactory(namespace, routes))
    .join('\n\n')

  return `const routeManifest = ${routeManifest}
const defaultBaseUrl = ${JSON.stringify(defaultSdkBaseUrl)}

export class RunditSdkError extends Error {
  constructor(message, details) {
    super(message)
    this.name = 'RunditSdkError'
    this.status = details.status
    this.body = details.body
  }
}

function resolveFetch(customFetch) {
  if (customFetch) {
    return customFetch
  }

  if (typeof globalThis.fetch === 'function') {
    return globalThis.fetch.bind(globalThis)
  }

  throw new Error('No fetch implementation available. Pass options.fetch when initializing the client.')
}

function normalizeBaseUrl(baseUrl) {
  return baseUrl.replace(/\\/+$/, '')
}

function shouldSendNgrokBypassHeader(baseUrl) {
  try {
    const { hostname } = new URL(baseUrl)
    return hostname.includes('ngrok')
  } catch {
    return false
  }
}

function interpolatePath(pathTemplate, pathParams = {}) {
  return pathTemplate.replace(/:([A-Za-z0-9_]+)/g, (_, key) => {
    const value = pathParams[key]

    if (value === undefined || value === null) {
      throw new Error(\`Missing required path parameter: \${key}\`)
    }

    return encodeURIComponent(String(value))
  })
}

function appendQueryString(url, query = {}) {
  const searchParams = new URLSearchParams()

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return
    }

    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item !== undefined && item !== null) {
          searchParams.append(key, String(item))
        }
      })
      return
    }

    searchParams.append(key, String(value))
  })

  const queryString = searchParams.toString()
  return queryString.length > 0 ? \`\${url}?\${queryString}\` : url
}

async function parseResponse(response) {
  if (response.status === 204) {
    return undefined
  }

  const contentType = response.headers.get('content-type') || ''

  if (contentType.includes('application/json')) {
    return response.json()
  }

  return response.text()
}

function createRequester(options) {
  const fetchImplementation = resolveFetch(options.fetch)
  const baseUrl = normalizeBaseUrl(options.baseUrl || defaultBaseUrl)
  const shouldBypassNgrokBrowserWarning = shouldSendNgrokBypassHeader(baseUrl)
  const defaultHeaders = {
    Accept: 'application/json',
    ...(shouldBypassNgrokBrowserWarning ? { 'ngrok-skip-browser-warning': '69420' } : {}),
    ...options.headers,
    ${JSON.stringify(packageConfig.auth.headerName)}: ${packageConfig.auth.headerValueExpression},
  }

  return async ({ method, path, pathParams, query, body, signal }) => {
    const url = appendQueryString(baseUrl + interpolatePath(path, pathParams), query)
    const hasBody = body !== undefined && body !== null
    const requestHeaders = hasBody ? { ...defaultHeaders, 'Content-Type': 'application/json' } : defaultHeaders

    const response = await fetchImplementation(url, {
      method,
      headers: requestHeaders,
      body: hasBody ? JSON.stringify(body) : undefined,
      signal,
    })

    const responseBody = await parseResponse(response)

    if (!response.ok) {
      throw new RunditSdkError(\`Rundit request failed with status \${response.status}\`, {
        status: response.status,
        body: responseBody,
      })
    }

    return responseBody
  }
}

${namespaceFactories}

export function ${packageConfig.factoryName}(options) {
  if (!options || typeof options !== 'object') {
    throw new Error('options is required')
  }

  if (!options.${packageConfig.auth.optionKey}) {
    throw new Error('options.${packageConfig.auth.optionKey} is required')
  }

  const request = createRequester(options)

  return {
${Object.keys(namespaces)
  .map((namespace) => `    ${namespace}: create${toPascalCase(namespace)}Namespace(request),`)
  .join('\n')}
  }
}

export { routeManifest }
`
}

function createTypeDeclarations(packageConfig, packageRoutes, typeContext) {
  const namespaces = buildNamespaceMap(packageRoutes)
  const namespaceInterfaces = Object.entries(namespaces)
    .map(([namespace, routes]) => createNamespaceInterface(namespace, routes))
    .join('\n\n')
  const clientInterfaceFields = Object.keys(namespaces)
    .map((namespace) => `  ${namespace}: ${toPascalCase(namespace)}Namespace`)
    .join('\n')
  const routeManifestType = createRouteManifestType(namespaces)
  const queryTypeBlocks = packageRoutes
    .filter((route) => route.queryTypeName)
    .map((route) => createQueryTypeDeclaration(route))
    .join('\n\n')

  return `export type PathParam = string | number

export interface RequestOptions {
  signal?: AbortSignal
}

export interface RunditSdkErrorDetails {
  status: number
  body: unknown
}

export declare class RunditSdkError extends Error {
  status: number
  body: unknown
  constructor(message: string, details: RunditSdkErrorDetails)
}

export interface ${packageConfig.optionsTypeName} {
  baseUrl?: string
  ${packageConfig.auth.optionKey}: ${packageConfig.auth.optionType}
  fetch?: typeof fetch
  headers?: Record<string, string>
}

${typeContext.typeDeclarations.join('\n\n')}${typeContext.typeDeclarations.length > 0 ? '\n\n' : ''}${queryTypeBlocks}${queryTypeBlocks ? '\n\n' : ''}${namespaceInterfaces}

export interface ${packageConfig.clientTypeName} {
${clientInterfaceFields}
}

export declare function ${packageConfig.factoryName}(options: ${packageConfig.optionsTypeName}): ${packageConfig.clientTypeName}

export declare const routeManifest: ${routeManifestType}
`
}

function collectRoutesForAudience(spec, audience) {
  return Object.entries(spec.paths)
    .flatMap(([specPath, pathItem]) => {
      return Object.entries(pathItem)
        .filter(([method]) => httpMethods.has(method))
        .map(([method, operation]) => ({ method: method.toUpperCase(), specPath, operation }))
    })
    .filter(
      ({ operation }) => Array.isArray(operation['x-sdk-audiences']) && operation['x-sdk-audiences'].includes(audience),
    )
    .map(({ method, specPath, operation }) => {
      const parsedOperationId = parseOperationId(operation.operationId)
      const namespace = operation['x-sdk-namespace'] || parsedOperationId.namespace
      const operationName = operation['x-sdk-operation'] || parsedOperationId.operation
      const parameters = operation.parameters || []
      const pathParams = parameters
        .filter((parameter) => parameter.in === 'path')
        .map((parameter) => ({
          name: parameter.name,
          type: schemaToTsType(parameter.schema || {}),
          description: parameter.description || null,
        }))
      const queryParams = parameters
        .filter((parameter) => parameter.in === 'query')
        .map((parameter) => ({
          name: parameter.name,
          required: Boolean(parameter.required),
          type: schemaToTsType(parameter.schema || {}),
          description: parameter.description || null,
        }))

      const requestBodySchema = operation.requestBody?.content?.['application/json']?.schema || null
      const requestBodyRequired = Boolean(operation.requestBody?.required)
      const bodyExample = requestBodySchema
        ? createRequestBodyExample(requestBodySchema, spec.components?.schemas || {})
        : null

      return {
        namespace,
        operation: operationName,
        method,
        path: normalizeRuntimePath(specPath),
        specPath,
        summary: operation.summary,
        description: operation.description,
        pathParams,
        queryParams,
        queryTypeName: queryParams.length > 0 ? `${toPascalCase(namespace)}${toPascalCase(operationName)}Query` : null,
        requestBodySchema,
        requestBodyRequired,
        bodyTypeName: requestBodySchema ? `${toPascalCase(namespace)}${toPascalCase(operationName)}Body` : null,
        bodyExample,
        responseTypeName: `${toPascalCase(namespace)}${toPascalCase(operationName)}Response`,
        responseSchema: resolveSuccessSchema(operation.responses || {}),
      }
    })
}

function createRequestBodyExample(bodySchema, schemas) {
  const resolved = resolveSchemaWithRefs(bodySchema, schemas)
  const { properties } = collectObjectProperties(resolved, schemas)
  const requiredFields = properties.filter((property) => property.required)
  if (!requiredFields.length) return '{}'

  const fragments = requiredFields.map((property) => {
    const value = exampleValueFromSchema(property.name, property.schema, schemas)
    return `${quotePropertyNameIfNeeded(property.name)}: ${value}`
  })
  return `{ ${fragments.join(', ')} }`
}

function resolveSchemaWithRefs(schema, schemas) {
  if (!schema) return {}
  if (schema.$ref) {
    const name = refToTypeName(schema.$ref)
    return resolveSchemaWithRefs(schemas[name] || {}, schemas)
  }
  return schema
}

function collectObjectProperties(schema, schemas) {
  const properties = []
  const resolved = resolveSchemaWithRefs(schema, schemas)
  if (resolved.allOf) {
    resolved.allOf.forEach((part) => {
      const nested = collectObjectProperties(part, schemas)
      properties.push(...nested.properties)
    })
  }
  const required = new Set(resolved.required || [])
  Object.entries(resolved.properties || {}).forEach(([name, propertySchema]) => {
    properties.push({ name, required: required.has(name), schema: propertySchema })
  })
  return { properties }
}

function exampleValueFromSchema(name, schema, schemas) {
  const resolved = resolveSchemaWithRefs(schema, schemas)

  if (resolved.example !== undefined) {
    return JSON.stringify(resolved.example)
  }
  if (Array.isArray(resolved.enum) && resolved.enum.length > 0) {
    return JSON.stringify(resolved.enum[0])
  }
  if (resolved.type === 'array') {
    const itemValue = exampleValueFromSchema(name, resolved.items || {}, schemas)
    return `[${itemValue}]`
  }
  if (resolved.type === 'object' || resolved.properties) {
    const { properties } = collectObjectProperties(resolved, schemas)
    const requiredNested = properties.filter((property) => property.required)
    if (!requiredNested.length) return '{}'
    const fragments = requiredNested.map(
      (property) =>
        `${quotePropertyNameIfNeeded(property.name)}: ${exampleValueFromSchema(property.name, property.schema, schemas)}`,
    )
    return `{ ${fragments.join(', ')} }`
  }

  return createExampleValue(name, schemaToTsType(resolved), false)
}

function buildTypeContext(spec, routes) {
  const schemas = spec.components?.schemas || {}
  const referencedSchemaNames = new Set()

  routes.forEach((route) => {
    collectReferencedSchemaNames(route.responseSchema, referencedSchemaNames)
    if (route.requestBodySchema) {
      collectReferencedSchemaNames(route.requestBodySchema, referencedSchemaNames)
    }
  })

  const orderedSchemaNames = orderSchemaNames(schemas, referencedSchemaNames)
  const typeDeclarations = orderedSchemaNames.map((schemaName) =>
    createSchemaDeclaration(schemaName, schemas[schemaName], schemas),
  )

  routes.forEach((route) => {
    typeDeclarations.push(`export type ${route.responseTypeName} = ${schemaToTsType(route.responseSchema)}`)
    if (route.bodyTypeName) {
      typeDeclarations.push(`export type ${route.bodyTypeName} = ${schemaToTsType(route.requestBodySchema)}`)
    }
  })

  return { typeDeclarations }
}

function createNamespaceFactory(namespace, routes) {
  const methods = routes.map((route) => createMethodImplementation(route)).join('\n')

  return `function create${toPascalCase(namespace)}Namespace(request) {
  return {
${methods}
  }
}`
}

function createMethodImplementation(route) {
  const pathParamNames = route.pathParams.map((param) => param.name)
  const hasQuery = route.queryParams.length > 0
  const hasBody = Boolean(route.bodyTypeName)

  // Positional shape: <pathParams...>, body?, query?, init.
  // Body is positionally required when the operation defines a request body so the
  // call signature stays predictable; pass `{}` if you have nothing to send.
  const params = [...pathParamNames]
  if (hasBody) params.push('body')
  if (hasQuery) params.push('query = {}')
  params.push('init = {}')

  const signature = params.join(', ')
  const pathParams = pathParamNames.length > 0 ? `{ ${pathParamNames.join(', ')} }` : 'undefined'
  const query = hasQuery ? 'query' : 'undefined'
  const body = hasBody ? 'body' : 'undefined'

  return `    ${route.operation}: (${signature}) => request({ method: ${JSON.stringify(route.method)}, path: ${JSON.stringify(route.path)}, pathParams: ${pathParams}, query: ${query}, body: ${body}, signal: init.signal }),`
}

function createNamespaceInterface(namespace, routes) {
  const methods = routes.map((route) => createMethodSignature(route)).join('\n')
  return `export interface ${toPascalCase(namespace)}Namespace {
${methods}
}`
}

function createMethodSignature(route) {
  const pathParams = route.pathParams.map((param) => `${param.name}: ${param.type}`)
  const args = [...pathParams]

  if (route.bodyTypeName) {
    args.push(`body: ${route.bodyTypeName}`)
  }

  if (route.queryTypeName) {
    args.push(`query?: ${route.queryTypeName}`)
  }

  args.push('init?: RequestOptions')
  const docLines = [route.summary || `Calls ${route.method} ${route.path}`]

  if (route.description) {
    docLines.push(route.description)
  }

  const params = createReadableParamSummary(route)
  if (params) {
    docLines.push(`Parameters: ${params}`)
  }

  docLines.push(`Returns: ${route.responseTypeName}`)

  return `${createDocComment(docLines, '  ')}\n  ${route.operation}(${args.join(', ')}): Promise<${route.responseTypeName}>`
}

function createQueryTypeDeclaration(route) {
  const fields = route.queryParams
    .map((queryParam) => {
      const field = `  ${quotePropertyNameIfNeeded(queryParam.name)}${queryParam.required ? '' : '?'}: ${queryParam.type}`

      if (!queryParam.description) {
        return field
      }

      return `${createDocComment([queryParam.description], '  ')}\n${field}`
    })
    .join('\n')

  return `export interface ${route.queryTypeName} {
${fields}
}`
}

function createRouteManifest(namespaces) {
  const manifest = {}

  Object.entries(namespaces).forEach(([namespace, routes]) => {
    manifest[namespace] = {}
    routes.forEach((route) => {
      manifest[namespace][route.operation] = {
        method: route.method,
        path: route.path,
        summary: route.summary || null,
        description: route.description || null,
        exampleCall: createExampleCall(route),
        responseType: route.responseTypeName,
        pathParams: route.pathParams,
        queryParams: route.queryParams,
      }
    })
  })

  return JSON.stringify(manifest, null, 2)
}

function createRouteManifestType(namespaces) {
  const namespaceTypes = Object.entries(namespaces).map(([namespace, routes]) => {
    const routeTypes = routes
      .map(
        (route) =>
          `    ${route.operation}: { method: ${JSON.stringify(route.method)}; path: ${JSON.stringify(route.path)}; summary: ${JSON.stringify(route.summary || null)}; description: ${JSON.stringify(route.description || null)}; exampleCall: ${JSON.stringify(createExampleCall(route))}; responseType: ${JSON.stringify(route.responseTypeName)}; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }`,
      )
      .join('\n')

    return `  ${namespace}: {\n${routeTypes}\n  }`
  })

  return `{\n${namespaceTypes.join('\n')}\n}`
}

function buildNamespaceMap(routes) {
  return routes.reduce((accumulator, route) => {
    accumulator[route.namespace] ||= []
    accumulator[route.namespace].push(route)
    return accumulator
  }, {})
}

function createSchemaDeclaration(schemaName, schema, schemas) {
  if (schema.type === 'object' || schema.properties || schema.allOf) {
    const { properties, extendsTypes } = resolveObjectSchema(schema, schemas)
    const lines = properties.map((property) => {
      const propertyType = schemaToTsType(property.schema)
      return `  ${quotePropertyNameIfNeeded(property.name)}${property.required ? '' : '?'}: ${propertyType}`
    })
    const extendsClause = extendsTypes.length > 0 ? ` extends ${extendsTypes.join(', ')}` : ''
    return `export interface ${schemaName}${extendsClause} {\n${lines.join('\n')}\n}`
  }

  return `export type ${schemaName} = ${schemaToTsType(schema)}`
}

function resolveObjectSchema(schema, schemas) {
  const properties = []
  const extendsTypes = []

  if (schema.allOf) {
    schema.allOf.forEach((part) => {
      if (part.$ref) {
        extendsTypes.push(refToTypeName(part.$ref))
        return
      }

      const resolved = resolveObjectSchema(part, schemas)
      properties.push(...resolved.properties)
      extendsTypes.push(...resolved.extendsTypes)
    })
  }

  const required = new Set(schema.required || [])
  Object.entries(schema.properties || {}).forEach(([name, propertySchema]) => {
    properties.push({ name, required: required.has(name), schema: propertySchema })
  })

  return { properties, extendsTypes }
}

function schemaToTsType(schema) {
  if (!schema) {
    return 'unknown'
  }

  if (schema.$ref) {
    return refToTypeName(schema.$ref)
  }

  if (schema.oneOf?.length) {
    return schema.oneOf.map((part) => schemaToTsType(part)).join(' | ')
  }

  if (schema.anyOf?.length) {
    return schema.anyOf.map((part) => schemaToTsType(part)).join(' | ')
  }

  if (schema.allOf?.length) {
    return schema.allOf.map((part) => schemaToTsType(part)).join(' & ')
  }

  if (schema.enum?.length) {
    return schema.enum.map((value) => JSON.stringify(value)).join(' | ')
  }

  if (schema.type === 'array') {
    const itemType = schemaToTsType(schema.items || {})
    const needsParens = / [|&] /.test(itemType)
    return `${needsParens ? `(${itemType})` : itemType}[]`
  }

  if (schema.type === 'integer' || schema.type === 'number') {
    return applyNullable('number', schema)
  }

  if (schema.type === 'boolean') {
    return applyNullable('boolean', schema)
  }

  if (schema.type === 'string') {
    return applyNullable('string', schema)
  }

  if (schema.type === 'object' || schema.properties) {
    const required = new Set(schema.required || [])
    const inlineProperties = Object.entries(schema.properties || {}).map(([name, propertySchema]) => {
      const optional = required.has(name) ? '' : '?'
      return `${quotePropertyNameIfNeeded(name)}${optional}: ${schemaToTsType(propertySchema)}`
    })

    return applyNullable(`{ ${inlineProperties.join('; ')} }`, schema)
  }

  return 'unknown'
}

function resolveSuccessSchema(responses) {
  const successResponse = responses['200'] || responses['201']
  return successResponse?.content?.['application/json']?.schema || null
}

function collectReferencedSchemaNames(schema, target) {
  if (!schema) {
    return
  }

  if (schema.$ref) {
    target.add(refToTypeName(schema.$ref))
    return
  }

  const nestedSchemas = []
  if (schema.items) nestedSchemas.push(schema.items)
  if (schema.properties) nestedSchemas.push(...Object.values(schema.properties))
  if (schema.oneOf) nestedSchemas.push(...schema.oneOf)
  if (schema.anyOf) nestedSchemas.push(...schema.anyOf)
  if (schema.allOf) nestedSchemas.push(...schema.allOf)

  nestedSchemas.forEach((nestedSchema) => collectReferencedSchemaNames(nestedSchema, target))
}

function orderSchemaNames(schemas, referencedSchemaNames) {
  const visited = new Set()
  const ordered = []

  referencedSchemaNames.forEach((schemaName) => visitSchema(schemaName, schemas, visited, ordered))
  return ordered
}

function visitSchema(schemaName, schemas, visited, ordered) {
  if (visited.has(schemaName) || !schemas[schemaName]) {
    return
  }

  visited.add(schemaName)
  const dependencies = new Set()
  collectReferencedSchemaNames(schemas[schemaName], dependencies)
  dependencies.forEach((dependency) => visitSchema(dependency, schemas, visited, ordered))
  ordered.push(schemaName)
}

function parseOperationId(operationId = '') {
  const [namespace = 'default', operation = 'execute'] = operationId.split('.')
  return { namespace, operation }
}

// Strip the /api/v2/sdk prefix because the generated client joins paths against
// `options.baseUrl` (which already points at /api/v2/sdk). Convert OpenAPI's
// `{name}` placeholders to `:name` to match the runtime interpolatePath() format.
function normalizeRuntimePath(specPath) {
  return specPath.replace(/^\/api\/v2\/sdk/, '').replace(/\{([^}]+)\}/g, ':$1')
}

function refToTypeName(ref) {
  return ref.split('/').at(-1)
}

function applyNullable(typeName, schema) {
  return schema.nullable ? `${typeName} | null` : typeName
}

function quotePropertyNameIfNeeded(name) {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(name) ? name : JSON.stringify(name)
}

function toPascalCase(value) {
  return value
    .split(/[^A-Za-z0-9]/)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join('')
}

function createNamespaceReadmeSection(namespace, routes) {
  const methodSections = routes.map((route) => {
    const params = createReadableParamSummary(route)
    const lines = [
      `### \`${route.namespace}.${route.operation}\``,
      '',
      route.summary || route.description || `${route.method} ${route.path}`,
      '',
      `- Call: \`${createExampleCall(route)}\``,
      `- HTTP: \`${route.method} ${route.path}\``,
      `- Returns: \`${route.responseTypeName}\``,
    ]

    if (params) {
      lines.push(`- Params: ${params}`)
    }

    return lines.join('\n')
  })

  return `## ${namespace}\n\n${methodSections.join('\n\n')}`
}

function createExampleCall(route) {
  const args = []

  route.pathParams.forEach((param) => {
    args.push(createExampleValue(param.name, param.type, false))
  })

  if (route.bodyTypeName) {
    args.push(route.bodyExample || '{}')
  }

  if (route.queryParams.length > 0) {
    const requiredParams = route.queryParams.filter((param) => param.required)
    const paramsForExample = requiredParams.length > 0 ? requiredParams : route.queryParams.slice(0, 1)
    const queryFields = paramsForExample.map(
      (param) => `${quotePropertyNameIfNeeded(param.name)}: ${createExampleValue(param.name, param.type, true)}`,
    )

    args.push(`{ ${queryFields.join(', ')} }`)
  }

  return `client.${route.namespace}.${route.operation}(${args.join(', ')})`
}

function createExampleValue(name, type, isQuery) {
  if (type.includes('[]')) {
    if (type.includes('number')) return '[123]'
    return `['example']`
  }

  if (type.includes('number')) {
    return isQuery && name.toLowerCase().includes('ids') ? '[123]' : '123'
  }

  if (type.includes('boolean')) {
    return 'true'
  }

  if (name.toLowerCase() === 'currency') {
    return `'USD'`
  }

  if (name.toLowerCase().includes('date')) {
    return `'2024-12-31'`
  }

  if (name.toLowerCase().includes('id')) {
    return `'123'`
  }

  return `'example'`
}

function createReadableParamSummary(route) {
  const parts = []

  if (route.pathParams.length > 0) {
    parts.push(`path: ${route.pathParams.map((param) => `${param.name} (${param.type})`).join(', ')}`)
  }

  if (route.bodyTypeName) {
    parts.push(`body: ${route.bodyTypeName}`)
  }

  if (route.queryParams.length > 0) {
    parts.push(
      `query: ${route.queryParams.map((param) => `${param.name}${param.required ? '' : '?'} (${param.type})`).join(', ')}`,
    )
  }

  return parts.join('; ')
}

function createDocComment(lines, indent = '') {
  const filteredLines = lines.filter(Boolean)
  return `${indent}/**\n${filteredLines.map((line) => `${indent} * ${line}`).join('\n')}\n${indent} */`
}

function writeFile(dir, fileName, content) {
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, fileName), content)
}

main()
