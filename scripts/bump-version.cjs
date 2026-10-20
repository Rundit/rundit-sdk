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
 * to 'patch'. Versions missing from versions.json are treated as 0.0.0.
 */
const fs = require('fs')
const path = require('path')
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

  versions[packageKey] = bumpVersion(versions[packageKey] || '0.0.0', releaseType)
  console.log(`${packageKey}: ${versions[packageKey]}`)
}

fs.writeFileSync(versionsPath, JSON.stringify(versions, null, 2) + '\n')

function loadVersions() {
  if (!fs.existsSync(versionsPath)) {
    return {}
  }

  return JSON.parse(fs.readFileSync(versionsPath, 'utf8'))
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
