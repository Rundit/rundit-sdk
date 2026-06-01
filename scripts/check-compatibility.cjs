/**
 * Detects breaking API changes by diffing the freshly generated openapi.json against
 * the openapi.json shipped in the most recently published version of each SDK package.
 *
 * Why bundle openapi.json inside each published package: it's the only artifact we
 * can rely on being available without an extra registry/storage. We `npm pack` the
 * published version, untar it, and compare.
 *
 * What counts as breaking (will cause a non-zero exit):
 *   - Removed paths, operations, parameters, request/response content types
 *   - Required parameters added or made required
 *   - Schema kind changes (object → array, etc.)
 *   - Type/format changes, removed enum values, nullable contract changes
 *   - In requests: properties becoming required
 *   - In responses: properties no longer required (consumers expect them)
 *
 * Set SDK_ALLOW_BREAKING=true to log breakages and exit 0 — used for intentional
 * major-version cuts.
 *
 * Run sdk:generate before this script; it reads packages/<dir>/openapi.json.
 */
const fs = require('fs')
const os = require('os')
const path = require('path')
const { execFileSync } = require('child_process')
const { sdkPackages } = require('./contract.cjs')

const rootDir = path.resolve(__dirname, '..')
const packagesRootDir = path.join(rootDir, 'packages')
const httpMethods = new Set(['get', 'post', 'put', 'patch', 'delete'])
// Memoizes schema-pair comparisons across the whole run. Without this, recursive
// schemas (or just heavily-shared $refs) would re-walk the same subtrees thousands
// of times and emit duplicate breaking-change entries for the same field.
const comparisonState = new Set()
// Returns the list of breaking changes when going previousSpec -> currentSpec.
// Exported so classify-bump.cjs can run it in both directions (forward = breaking,
// reverse = additions). comparisonState is cleared per call so the memoization
// never leaks across the separate forward/reverse passes.
function findBreakingChanges(previousSpec, currentSpec, packageName = 'sdk') {
  comparisonState.clear()
  const issues = []
  compareSpecs(packageName, previousSpec, currentSpec, issues)
  return issues
}

module.exports = { findBreakingChanges, loadPublishedSpec, readPublishedVersion }

if (require.main === module) {
  const packageKeys = process.argv.slice(2)
  const targets = packageKeys.length > 0 ? packageKeys : Object.keys(sdkPackages)
  const allowBreaking = process.env.SDK_ALLOW_BREAKING === 'true'
  // Pre-1.0 a breaking change is permitted (0.x has no stability guarantee) — same
  // policy as classify-bump's major->minor cap. It is reported as a warning, not a
  // failure, while the package's stable major is 0. SDK_ENFORCE_BREAKING=true forces
  // the gate even pre-1.0; SDK_ALLOW_BREAKING=true allows it even post-1.0.
  const enforcePre1 = process.env.SDK_ENFORCE_BREAKING === 'true'
  const distTag = process.env.SDK_DIST_TAG || 'latest'
  const versionsPath = path.join(rootDir, 'versions.json')
  const versions = fs.existsSync(versionsPath) ? JSON.parse(fs.readFileSync(versionsPath, 'utf8')) : {}

  const fatal = []
  const warnings = []

  for (const packageKey of targets) {
    const config = sdkPackages[packageKey]

    if (!config) {
      console.error(`Unknown SDK package key: ${packageKey}`)
      process.exit(1)
    }

    const currentSpecPath = path.join(packagesRootDir, config.packageDir, 'openapi.json')

    if (!fs.existsSync(currentSpecPath)) {
      console.error(`Missing generated SDK spec: ${currentSpecPath}. Run npm run sdk:generate first.`)
      process.exit(1)
    }

    const currentSpec = JSON.parse(fs.readFileSync(currentSpecPath, 'utf8'))
    const publishedSpec = loadPublishedSpec(config.packageName, distTag)

    if (!publishedSpec) {
      console.log(`Skipping compatibility check for ${config.packageName}; nothing published at @${distTag} yet`)
      continue
    }

    const issues = findBreakingChanges(publishedSpec, currentSpec, config.packageName)
    if (issues.length === 0) {
      continue
    }

    const currentMajor = Number.parseInt(String(versions[packageKey] || '0.0.0').split('.')[0], 10) || 0
    const tolerated = allowBreaking || (currentMajor === 0 && !enforcePre1)
    ;(tolerated ? warnings : fatal).push(...issues)
  }

  if (warnings.length > 0) {
    console.warn(['Breaking SDK API changes (tolerated):', ...warnings.map((c) => `- ${c}`)].join('\n'))
    console.warn('Allowed (pre-1.0 or SDK_ALLOW_BREAKING=true). Set SDK_ENFORCE_BREAKING=true to enforce pre-1.0.')
  }

  if (fatal.length > 0) {
    console.error(['Breaking SDK API changes detected:', ...fatal.map((c) => `- ${c}`)].join('\n'))
    process.exit(1)
  }

  console.log(warnings.length > 0 ? 'No fatal SDK API changes' : 'No breaking SDK API changes detected')
  process.exit(0)
}

function loadPublishedSpec(packageName, distTag = 'latest') {
  const version = readPublishedVersion(packageName, distTag)

  if (!version) {
    return null
  }

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'rundit-sdk-compat-'))

  try {
    const tarballName = execFileSync(
      'npm',
      ['pack', `${packageName}@${version}`, '--silent', '--pack-destination', tempDir],
      {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe'],
      },
    )
      .trim()
      .split('\n')
      .filter(Boolean)
      .pop()

    if (!tarballName) {
      throw new Error(`Unable to resolve tarball name for ${packageName}@${version}`)
    }

    execFileSync('tar', ['-xzf', path.join(tempDir, tarballName), '-C', tempDir], { stdio: 'ignore' })

    const openApiPath = path.join(tempDir, 'package', 'openapi.json')
    if (!fs.existsSync(openApiPath)) {
      throw new Error(`Published package ${packageName}@${version} is missing openapi.json`)
    }

    return JSON.parse(fs.readFileSync(openApiPath, 'utf8'))
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true })
  }
}

function readPublishedVersion(packageName, distTag = 'latest') {
  try {
    const output = execFileSync('npm', ['view', packageName, `dist-tags.${distTag}`, '--json'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    }).trim()

    if (!output) {
      return null
    }

    return JSON.parse(output)
  } catch {
    return null
  }
}

function compareSpecs(packageName, previousSpec, currentSpec, issues) {
  const previousPaths = previousSpec.paths || {}
  const currentPaths = currentSpec.paths || {}

  for (const [routePath, previousPathItem] of Object.entries(previousPaths)) {
    const currentPathItem = currentPaths[routePath]

    if (!currentPathItem) {
      issues.push(`${packageName}: removed path ${routePath}`)
      continue
    }

    for (const method of Object.keys(previousPathItem)) {
      if (!httpMethods.has(method)) {
        continue
      }

      const previousOperation = previousPathItem[method]
      const currentOperation = currentPathItem[method]
      const operationLabel = `${method.toUpperCase()} ${routePath}`

      if (!currentOperation) {
        issues.push(`${packageName}: removed operation ${operationLabel}`)
        continue
      }

      compareParameters(
        packageName,
        operationLabel,
        previousPathItem,
        previousOperation,
        currentPathItem,
        currentOperation,
        previousSpec,
        currentSpec,
        issues,
      )
      compareRequestBody(
        packageName,
        operationLabel,
        previousOperation,
        currentOperation,
        previousSpec,
        currentSpec,
        issues,
      )
      compareResponses(
        packageName,
        operationLabel,
        previousOperation,
        currentOperation,
        previousSpec,
        currentSpec,
        issues,
      )
    }
  }
}

function compareParameters(
  packageName,
  operationLabel,
  previousPathItem,
  previousOperation,
  currentPathItem,
  currentOperation,
  previousSpec,
  currentSpec,
  issues,
) {
  const previousParameters = collectParameters(previousPathItem, previousOperation, previousSpec)
  const currentParameters = collectParameters(currentPathItem, currentOperation, currentSpec)
  const currentParameterMap = new Map(currentParameters.map((parameter) => [parameterKey(parameter), parameter]))

  for (const previousParameter of previousParameters) {
    const key = parameterKey(previousParameter)
    const currentParameter = currentParameterMap.get(key)

    if (!currentParameter) {
      issues.push(`${packageName}: removed parameter ${key} from ${operationLabel}`)
      continue
    }

    compareSchemas(
      previousParameter.schema,
      currentParameter.schema,
      `${packageName}: ${operationLabel} parameter ${key}`,
      previousSpec,
      currentSpec,
      issues,
      'request',
    )
  }

  const previousParameterMap = new Map(previousParameters.map((parameter) => [parameterKey(parameter), parameter]))
  for (const currentParameter of currentParameters) {
    const key = parameterKey(currentParameter)
    const previousParameter = previousParameterMap.get(key)

    if (!previousParameter && currentParameter.required) {
      issues.push(`${packageName}: added required parameter ${key} to ${operationLabel}`)
      continue
    }

    if (previousParameter && !previousParameter.required && currentParameter.required) {
      issues.push(`${packageName}: parameter ${key} became required in ${operationLabel}`)
    }
  }
}

function compareRequestBody(
  packageName,
  operationLabel,
  previousOperation,
  currentOperation,
  previousSpec,
  currentSpec,
  issues,
) {
  const previousRequestBody = resolveRef(previousOperation.requestBody, previousSpec)
  const currentRequestBody = resolveRef(currentOperation.requestBody, currentSpec)

  if (!previousRequestBody) {
    if (currentRequestBody && currentRequestBody.required) {
      issues.push(`${packageName}: ${operationLabel} now requires a request body`)
    }
    return
  }

  if (!currentRequestBody) {
    issues.push(`${packageName}: removed request body from ${operationLabel}`)
    return
  }

  if (!previousRequestBody.required && currentRequestBody.required) {
    issues.push(`${packageName}: request body became required in ${operationLabel}`)
  }

  compareContentMap(
    packageName,
    operationLabel,
    previousRequestBody.content,
    currentRequestBody.content,
    previousSpec,
    currentSpec,
    issues,
    'request body',
    'request',
  )
}

function compareResponses(
  packageName,
  operationLabel,
  previousOperation,
  currentOperation,
  previousSpec,
  currentSpec,
  issues,
) {
  const previousResponses = previousOperation.responses || {}
  const currentResponses = currentOperation.responses || {}

  for (const [statusCode, previousResponseRef] of Object.entries(previousResponses)) {
    if (!String(statusCode).startsWith('2')) {
      continue
    }

    const previousResponse = resolveRef(previousResponseRef, previousSpec)
    const currentResponse = resolveRef(currentResponses[statusCode], currentSpec)

    if (!currentResponse) {
      issues.push(`${packageName}: removed ${statusCode} response from ${operationLabel}`)
      continue
    }

    compareContentMap(
      packageName,
      operationLabel,
      previousResponse.content,
      currentResponse.content,
      previousSpec,
      currentSpec,
      issues,
      `${statusCode} response`,
      'response',
    )
  }
}

function compareContentMap(
  packageName,
  operationLabel,
  previousContent,
  currentContent,
  previousSpec,
  currentSpec,
  issues,
  label,
  mode,
) {
  const previousEntries = Object.entries(previousContent || {})

  if (previousEntries.length === 0) {
    return
  }

  if (!currentContent) {
    issues.push(`${packageName}: removed ${label} content from ${operationLabel}`)
    return
  }

  for (const [contentType, previousMediaType] of previousEntries) {
    const currentMediaType = currentContent[contentType]

    if (!currentMediaType) {
      issues.push(`${packageName}: removed ${label} content type ${contentType} from ${operationLabel}`)
      continue
    }

    compareSchemas(
      previousMediaType.schema,
      currentMediaType.schema,
      `${packageName}: ${operationLabel} ${label} ${contentType}`,
      previousSpec,
      currentSpec,
      issues,
      mode,
    )
  }
}

function compareSchemas(previousSchema, currentSchema, location, previousSpec, currentSpec, issues, mode) {
  const comparisonKey = `${schemaComparisonKey(previousSchema)}=>${schemaComparisonKey(currentSchema)}:${mode}`

  if (comparisonState.has(comparisonKey)) {
    return
  }

  comparisonState.add(comparisonKey)

  const resolvedPrevious = normalizeSchema(previousSchema, previousSpec)
  const resolvedCurrent = normalizeSchema(currentSchema, currentSpec)

  if (!resolvedPrevious) {
    return
  }

  if (!resolvedCurrent) {
    issues.push(`${location} schema was removed`)
    return
  }

  if (resolvedPrevious.kind !== resolvedCurrent.kind) {
    issues.push(`${location} changed schema kind from ${resolvedPrevious.kind} to ${resolvedCurrent.kind}`)
    return
  }

  if (resolvedPrevious.nullable !== resolvedCurrent.nullable) {
    issues.push(`${location} changed nullable contract`)
  }

  switch (resolvedPrevious.kind) {
    case 'primitive':
      if (resolvedPrevious.type !== resolvedCurrent.type) {
        issues.push(`${location} changed primitive type from ${resolvedPrevious.type} to ${resolvedCurrent.type}`)
      }

      if (resolvedPrevious.format !== resolvedCurrent.format) {
        issues.push(
          `${location} changed primitive format from ${resolvedPrevious.format || 'none'} to ${resolvedCurrent.format || 'none'}`,
        )
      }

      if (resolvedPrevious.enum && resolvedCurrent.enum) {
        for (const value of resolvedPrevious.enum) {
          if (!resolvedCurrent.enum.includes(value)) {
            issues.push(`${location} removed enum value ${JSON.stringify(value)}`)
          }
        }
      }
      return

    case 'array':
      compareSchemas(
        resolvedPrevious.items,
        resolvedCurrent.items,
        `${location}[]`,
        previousSpec,
        currentSpec,
        issues,
        mode,
      )
      return

    case 'object':
      compareObjectSchemas(resolvedPrevious, resolvedCurrent, location, previousSpec, currentSpec, issues, mode)
      return

    case 'union':
      if (JSON.stringify(resolvedPrevious.options) !== JSON.stringify(resolvedCurrent.options)) {
        issues.push(`${location} changed union schema`)
      }
      return

    default:
      if (JSON.stringify(resolvedPrevious.raw) !== JSON.stringify(resolvedCurrent.raw)) {
        issues.push(`${location} changed schema`)
      }
  }
}

function schemaComparisonKey(schema) {
  return stableStringify(normalizeSchemaForComparisonKey(schema))
}

function normalizeSchemaForComparisonKey(schema) {
  if (schema == null) {
    return null
  }

  if (Array.isArray(schema)) {
    return schema.map((entry) => normalizeSchemaForComparisonKey(entry))
  }

  if (typeof schema !== 'object') {
    return schema
  }

  if (schema.$ref) {
    return { $ref: schema.$ref }
  }

  const normalized = {}

  for (const key of Object.keys(schema).sort()) {
    const value = schema[key]

    if (value === undefined) {
      continue
    }

    normalized[key] = normalizeSchemaForComparisonKey(value)
  }

  return normalized
}

function stableStringify(value) {
  if (value == null || typeof value !== 'object') {
    return JSON.stringify(value)
  }

  if (Array.isArray(value)) {
    return `[${value.map((entry) => stableStringify(entry)).join(',')}]`
  }

  const entries = Object.keys(value)
    .sort()
    .map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`)

  return `{${entries.join(',')}}`
}

function compareObjectSchemas(previousSchema, currentSchema, location, previousSpec, currentSpec, issues, mode) {
  const currentProperties = currentSchema.properties || {}

  for (const [propertyName, previousPropertySchema] of Object.entries(previousSchema.properties || {})) {
    const currentPropertySchema = currentProperties[propertyName]

    if (!currentPropertySchema) {
      issues.push(`${location} removed property ${propertyName}`)
      continue
    }

    compareSchemas(
      previousPropertySchema,
      currentPropertySchema,
      `${location}.${propertyName}`,
      previousSpec,
      currentSpec,
      issues,
      mode,
    )
  }

  const previousRequired = new Set(previousSchema.required || [])
  const currentRequired = new Set(currentSchema.required || [])

  // Required-ness flips in opposite directions for requests vs responses:
  //   - Response: dropping `required` is breaking — consumers may rely on the field.
  //   - Request:  adding `required` is breaking — old callers will start to 400.
  for (const propertyName of previousRequired) {
    if (mode === 'response' && !currentRequired.has(propertyName)) {
      issues.push(`${location}.${propertyName} is no longer required in responses`)
    }
  }

  if (mode === 'request') {
    for (const propertyName of currentRequired) {
      if (!previousRequired.has(propertyName)) {
        issues.push(`${location}.${propertyName} became required in requests`)
      }
    }
  }
}

function collectParameters(pathItem, operation, spec) {
  return [...(pathItem.parameters || []), ...(operation.parameters || [])]
    .map((parameter) => resolveRef(parameter, spec))
    .filter(Boolean)
}

function parameterKey(parameter) {
  return `${parameter.in}:${parameter.name}`
}

function normalizeSchema(schema, spec) {
  const resolved = resolveRef(schema, spec)

  if (!resolved) {
    return null
  }

  if (resolved.oneOf || resolved.anyOf) {
    return {
      kind: 'union',
      nullable: Boolean(resolved.nullable),
      options: (resolved.oneOf || resolved.anyOf).map((entry) => normalizeSchema(entry, spec)),
    }
  }

  if (resolved.allOf) {
    const merged = mergeAllOf(resolved, spec)
    return normalizeSchema(merged, spec)
  }

  if (resolved.type === 'array' || resolved.items) {
    return {
      kind: 'array',
      nullable: Boolean(resolved.nullable),
      items: normalizeSchema(resolved.items || {}, spec),
    }
  }

  if (resolved.type === 'object' || resolved.properties || resolved.additionalProperties) {
    return {
      kind: 'object',
      nullable: Boolean(resolved.nullable),
      properties: Object.fromEntries(Object.entries(resolved.properties || {}).map(([key, value]) => [key, value])),
      required: [...new Set(resolved.required || [])],
    }
  }

  if (resolved.type || resolved.enum) {
    return {
      kind: 'primitive',
      nullable: Boolean(resolved.nullable),
      type: resolved.type || 'unknown',
      format: resolved.format || null,
      enum: Array.isArray(resolved.enum) ? resolved.enum : null,
    }
  }

  return {
    kind: 'raw',
    nullable: Boolean(resolved.nullable),
    raw: resolved,
  }
}

function mergeAllOf(schema, spec) {
  return schema.allOf.reduce(
    (accumulator, part) => {
      const resolvedPart = resolveRef(part, spec) || {}
      const normalizedPart = resolvedPart.allOf ? mergeAllOf(resolvedPart, spec) : resolvedPart

      return {
        ...accumulator,
        ...normalizedPart,
        properties: {
          ...(accumulator.properties || {}),
          ...(normalizedPart.properties || {}),
        },
        required: [...new Set([...(accumulator.required || []), ...(normalizedPart.required || [])])],
      }
    },
    { ...schema, allOf: undefined, properties: schema.properties || {}, required: schema.required || [] },
  )
}

function resolveRef(value, spec) {
  if (!value) {
    return null
  }

  if (!value.$ref) {
    return value
  }

  const refPath = value.$ref.replace(/^#\//, '').split('/')
  let current = spec

  for (const segment of refPath) {
    current = current ? current[segment] : undefined
  }

  return current || null
}
