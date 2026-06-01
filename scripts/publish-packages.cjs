/**
 * Publishes generated SDK packages to npm, skipping versions already on the registry.
 *
 * Designed to be safe to re-run: `npm view <name>@<version>` is consulted first so a
 * partial publish (e.g. one of two packages succeeded) can be retried without errors.
 *
 * Usage:
 *   node scripts/sdk/publish-packages.cjs [packageKey ...]
 *
 * With no package keys, every entry in contract.cjs is published. Provenance is enabled
 * automatically in GitHub Actions unless SDK_PUBLISH_PROVENANCE=false, or enabled
 * explicitly when SDK_PUBLISH_PROVENANCE=true.
 *
 * Expected pipeline: sdk:generate → sdk:check-surface → sdk:check-compatibility →
 * sdk:version:bump → sdk:generate (again, to bake the new version into package.json) →
 * sdk:publish.
 */
const fs = require('fs')
const path = require('path')
const { execFileSync } = require('child_process')
const { sdkPackages } = require('./contract.cjs')

const rootDir = path.resolve(__dirname, '..')
const packageKeys = process.argv.slice(2)
const targets = packageKeys.length > 0 ? packageKeys : Object.keys(sdkPackages)

for (const packageKey of targets) {
  const config = sdkPackages[packageKey]

  if (!config) {
    console.error(`Unknown SDK package key: ${packageKey}`)
    process.exit(1)
  }

  const packageDir = path.join(rootDir, 'packages', config.packageDir)
  const packageJson = JSON.parse(fs.readFileSync(path.join(packageDir, 'package.json'), 'utf8'))

  if (isPublished(packageJson.name, packageJson.version)) {
    console.log(`Skipping ${packageJson.name}@${packageJson.version} because it is already published`)
    continue
  }

  console.log(`Publishing ${packageJson.name}@${packageJson.version}`)
  execFileSync('npm', createPublishArgs(), {
    cwd: packageDir,
    stdio: 'inherit',
  })
}

function createPublishArgs() {
  const args = ['publish', '--access', 'public']
  const distTag = process.env.SDK_NPM_DIST_TAG?.trim()

  if (distTag) {
    args.push('--tag', distTag)
  }

  if (shouldUseProvenance()) {
    args.push('--provenance')
  }

  return args
}

function shouldUseProvenance() {
  if (process.env.SDK_PUBLISH_PROVENANCE === 'false') {
    return false
  }

  return process.env.SDK_PUBLISH_PROVENANCE === 'true' || process.env.GITHUB_ACTIONS === 'true'
}

function isPublished(packageName, version) {
  try {
    const publishedVersion = execFileSync('npm', ['view', `${packageName}@${version}`, 'version', '--json'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    }).trim()

    return publishedVersion.length > 0
  } catch {
    return false
  }
}
