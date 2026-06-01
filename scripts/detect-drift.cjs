/**
 * Decides whether the freshly generated SDK surface differs from what is currently
 * published on npm for a given dist-tag — i.e. whether a publish is warranted.
 *
 * Generated artifacts are no longer committed to git (they are .gitignored and
 * regenerated on every run), so the publish workflow can't diff them against the
 * repo. Instead we npm-pack the published package at the target dist-tag, read its
 * bundled openapi.json, and deep-compare the API surface (paths + components)
 * against the freshly generated packages/<dir>/openapi.json. info/servers/tags
 * are ignored because they don't define the consumable surface.
 *
 * Usage:
 *   node scripts/sdk/detect-drift.cjs [latest|rc] [packageKey ...]
 *
 * Prints "true" (drift -> needs publish) or "false" to stdout; all diagnostics go
 * to stderr so the value can be captured cleanly. A package with no version at the
 * tag counts as drift (first publish). Exits non-zero only on unexpected errors.
 *
 * Run `npm run sdk:generate` first; it writes packages/<dir>/openapi.json.
 */
const fs = require('fs')
const os = require('os')
const path = require('path')
const { execFileSync } = require('child_process')
const { sdkPackages } = require('./contract.cjs')

const rootDir = path.resolve(__dirname, '..')
const packagesRootDir = path.join(rootDir, 'packages')
const distTag = (process.argv[2] || 'latest').trim()
const packageKeys = process.argv.slice(3)
const targets = packageKeys.length > 0 ? packageKeys : Object.keys(sdkPackages)

let drift = false

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

  const currentSurface = surfaceOf(JSON.parse(fs.readFileSync(currentSpecPath, 'utf8')))
  const publishedSpec = loadPublishedSpec(config.packageName, distTag)

  if (!publishedSpec) {
    console.error(`${config.packageName}: nothing published at dist-tag "${distTag}" -> publish needed`)
    drift = true
    continue
  }

  if (stableStringify(surfaceOf(publishedSpec)) !== stableStringify(currentSurface)) {
    console.error(`${config.packageName}: generated surface differs from @${distTag} -> publish needed`)
    drift = true
  } else {
    console.error(`${config.packageName}: generated surface matches @${distTag}`)
  }
}

process.stdout.write(drift ? 'true' : 'false')

function surfaceOf(spec) {
  return { paths: spec.paths || {}, components: spec.components || {} }
}

function loadPublishedSpec(packageName, tag) {
  const version = readPublishedVersion(packageName, tag)

  if (!version) {
    return null
  }

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'rundit-sdk-drift-'))

  try {
    const tarballName = execFileSync(
      'npm',
      ['pack', `${packageName}@${version}`, '--silent', '--pack-destination', tempDir],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] },
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

function readPublishedVersion(packageName, tag) {
  try {
    const output = execFileSync('npm', ['view', packageName, `dist-tags.${tag}`, '--json'], {
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
