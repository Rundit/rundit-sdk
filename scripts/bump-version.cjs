/**
 * Selects a shared release version above npm's latest versions and the configured
 * minimums in versions.json. Only the local build copy is updated, never Git.
 *
 * Usage: node scripts/bump-version.cjs [patch|minor|major] [packageKey ...]
 * For previews, set SDK_NPM_DIST_TAG=rc and SDK_PRERELEASE_ITERATION=run.attempt.
 */
const fs = require('fs')
const path = require('path')
const { execFileSync } = require('child_process')
const { sdkPackages } = require('./contract.cjs')

const versionsPath = path.resolve(__dirname, '..', 'versions.json')
const releaseType = process.argv[2] || process.env.SDK_VERSION_BUMP || 'patch'
const packageKeys = process.argv.slice(3)
const validReleaseTypes = new Set(['patch', 'minor', 'major'])

if (!validReleaseTypes.has(releaseType)) {
  console.error(`Unsupported release type: ${releaseType}`)
  process.exit(1)
}

const targetKeys = packageKeys.length > 0 ? packageKeys : Object.keys(sdkPackages)
const versions = loadVersions()

let baseline = '0.0.0'
for (const packageKey of targetKeys) {
  if (!sdkPackages[packageKey]) {
    console.error(`Unknown SDK package key: ${packageKey}`)
    process.exit(1)
  }

  const declared = versions[packageKey] || '0.0.0'
  const published = readPublishedVersion(sdkPackages[packageKey].packageName) || '0.0.0'
  for (const candidate of [declared, published]) {
    if (compareVersions(candidate, baseline) > 0) baseline = candidate
  }
}

let nextVersion = bumpVersion(baseline, releaseType)
if (process.env.SDK_NPM_DIST_TAG === 'rc') {
  const iteration = process.env.SDK_PRERELEASE_ITERATION
  if (!/^[1-9]\d*\.[1-9]\d*$/.test(iteration || '')) {
    throw new Error('SDK_PRERELEASE_ITERATION must be run.attempt (positive integers)')
  }
  nextVersion += `-rc.${iteration}`
}
for (const packageKey of targetKeys) {
  versions[packageKey] = nextVersion
  console.log(`${packageKey}: ${nextVersion}`)
}

fs.writeFileSync(versionsPath, JSON.stringify(versions, null, 2) + '\n')

function loadVersions() {
  if (!fs.existsSync(versionsPath)) {
    return {}
  }

  return JSON.parse(fs.readFileSync(versionsPath, 'utf8'))
}

function readPublishedVersion(packageName) {
  let output
  try {
    output = execFileSync('npm', ['view', packageName, 'dist-tags.latest', '--json'], {
      encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], timeout: 30_000,
    }).trim()
  } catch (error) {
    // A package with no stable release may be published for the first time.
    let code
    try { code = JSON.parse(error.stdout?.toString() || '{}').error?.code } catch {}
    if (code === 'E404') return null
    throw error // Registry failures must not silently select a stale version.
  }
  const version = output ? JSON.parse(output) : null
  if (version && (typeof version !== 'string' || !/^\d+\.\d+\.\d+$/.test(version))) {
    throw new Error(`Expected a stable npm version for ${packageName}, got ${JSON.stringify(version)}`)
  }
  return version
}

function compareVersions(left, right) {
  const a = left.split('.').map(Number)
  const b = right.split('.').map(Number)
  return a[0] - b[0] || a[1] - b[1] || a[2] - b[2]
}

function bumpVersion(version, bump) {
  const [major, minor, patch] = String(version)
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
