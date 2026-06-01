#!/usr/bin/env node
/**
 * Guards the published SDK surface against leaking internal package references.
 *
 * Runs three checks per generated SDK package (embed, client):
 *   1. package.json has no dependency/peerDependency/optionalDependency on any
 *      @rundit/* package (only @rundit-sdk/* is considered public).
 *   2. dist/**, openapi.json, README, AGENTS and ai-manifest don't reference any
 *      internal `@rundit/*` or internal source paths (e.g. `src/`, `common/domain`).
 *   3. Consumer typecheck runs against the freshly generated types.
 *
 * Exits non-zero on any finding so CI can block merges / publishes.
 */

const fs = require('fs')
const path = require('path')
const { execFileSync } = require('child_process')
const { sdkPackages } = require('./contract.cjs')

const rootDir = path.resolve(__dirname, '..')
const packagesRootDir = path.join(rootDir, 'packages')

const INTERNAL_DEP_PREFIX = '@rundit/'
const PUBLIC_DEP_PREFIX = '@rundit-sdk/'

// Matches `@rundit/<something>` but NOT `@rundit-sdk/<something>`.
const INTERNAL_REFERENCE_RE = /@rundit\/[A-Za-z0-9._-]+/g

// Internal source-path fragments that should never appear in a published artifact.
const INTERNAL_SOURCE_FRAGMENTS = [
  'src/sdk-api',
  'src/customers-api',
  'src/investments-api',
  'src/common/domain',
  'common/organizations',
]

const SCANNED_FILE_EXTENSIONS = new Set(['.js', '.mjs', '.cjs', '.d.ts', '.ts', '.json', '.md'])

const findings = []

function recordFinding(packageName, message) {
  findings.push(`[${packageName}] ${message}`)
}

function isPublicDep(name) {
  return name.startsWith(PUBLIC_DEP_PREFIX)
}

function checkPackageJson(packageName, packageDir) {
  const packageJsonPath = path.join(packageDir, 'package.json')
  if (!fs.existsSync(packageJsonPath)) {
    recordFinding(packageName, `missing package.json at ${packageJsonPath}`)
    return
  }

  const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
  const depSections = ['dependencies', 'peerDependencies', 'optionalDependencies']

  for (const section of depSections) {
    const deps = pkg[section]
    if (!deps) continue
    for (const depName of Object.keys(deps)) {
      if (depName.startsWith(INTERNAL_DEP_PREFIX) && !isPublicDep(depName)) {
        recordFinding(packageName, `${section}.${depName} is an internal package — strip before publish`)
      }
    }
  }
}

function walk(dir) {
  const out = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      out.push(...walk(full))
    } else if (entry.isFile()) {
      out.push(full)
    }
  }
  return out
}

function scanFileForLeaks(packageName, filePath) {
  const ext = path.extname(filePath)
  if (!SCANNED_FILE_EXTENSIONS.has(ext)) return

  const content = fs.readFileSync(filePath, 'utf8')
  const relative = path.relative(rootDir, filePath)

  // Internal `@rundit/*` references.
  const matches = content.matchAll(INTERNAL_REFERENCE_RE)
  const seen = new Set()
  for (const match of matches) {
    const reference = match[0]
    if (isPublicDep(reference)) continue
    if (seen.has(reference)) continue
    seen.add(reference)

    const line = lineNumberAt(content, match.index)
    recordFinding(packageName, `${relative}:${line} references internal package ${reference}`)
  }

  // Internal source path fragments.
  for (const fragment of INTERNAL_SOURCE_FRAGMENTS) {
    const idx = content.indexOf(fragment)
    if (idx >= 0) {
      const line = lineNumberAt(content, idx)
      recordFinding(packageName, `${relative}:${line} references internal path fragment "${fragment}"`)
    }
  }
}

function lineNumberAt(content, index) {
  let line = 1
  for (let i = 0; i < index; i++) {
    if (content.charCodeAt(i) === 10) line++
  }
  return line
}

function runConsumerTypecheck() {
  const consumerFile = path.join(rootDir, 'consumer-typecheck.ts')
  if (!fs.existsSync(consumerFile)) {
    findings.push(`[consumer-typecheck] missing ${consumerFile}`)
    return
  }

  try {
    execFileSync(
      'npx',
      [
        'tsc',
        '--noEmit',
        '--target',
        'es2020',
        '--module',
        'esnext',
        '--moduleResolution',
        'bundler',
        '--strict',
        '--skipLibCheck',
        consumerFile,
      ],
      { cwd: rootDir, stdio: 'pipe' },
    )
  } catch (error) {
    const stdout = error.stdout ? error.stdout.toString() : ''
    const stderr = error.stderr ? error.stderr.toString() : ''
    findings.push(`[consumer-typecheck] failed:\n${stdout}${stderr}`)
  }
}

function main() {
  for (const [, config] of Object.entries(sdkPackages)) {
    const packageDir = path.join(packagesRootDir, config.packageDir)
    if (!fs.existsSync(packageDir)) {
      findings.push(`[${config.packageName}] package directory missing — run "npm run sdk:generate" first`)
      continue
    }

    checkPackageJson(config.packageName, packageDir)
    for (const file of walk(packageDir)) {
      scanFileForLeaks(config.packageName, file)
    }
  }

  runConsumerTypecheck()

  if (findings.length === 0) {
    console.log('SDK surface is clean: no internal package references, consumer typecheck passed')
    process.exit(0)
  }

  console.error('SDK surface check failed:')
  for (const line of findings) {
    console.error(`- ${line}`)
  }
  process.exit(1)
}

main()
