/**
 * Bumps the published version of one or more SDK packages in versions.json.
 *
 * Versions live in a shared JSON file (not in each package.json) because package.json
 * for each SDK is regenerated from scratch on every `sdk:generate` run; the JSON file
 * is the durable source the generator reads from.
 *
 * Usage:
 *   node scripts/sdk/bump-version.cjs [patch|minor|major] [packageKey ...]
 *   SDK_VERSION_BUMP=minor node scripts/sdk/bump-version.cjs
 *
 * With no package keys, every entry in contract.cjs is bumped. Release type defaults
 * to 'patch'. The baseline is the newer of versions.json and npm's latest stable
 * release, so queued checkouts cannot reuse a version published by a prior run.
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

for (const packageKey of targetKeys) {
  if (!sdkPackages[packageKey]) {
    console.error(`Unknown SDK package key: ${packageKey}`)
    process.exit(1)
  }

  const declared = versions[packageKey] || '0.0.0'
  const published = readPublishedVersion(sdkPackages[packageKey].packageName) || '0.0.0'
  const baseline = compareVersions(published, declared) > 0 ? published : declared
  versions[packageKey] = bumpVersion(baseline, releaseType)
  console.log(`${packageKey}: ${versions[packageKey]}`)
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
