/**
 * Derives the semver bump for a publish by diffing the freshly generated SDK surface
 * against what is currently published on npm at a dist-tag. Replaces the old manual
 * release-type marker.
 *
 * Method — run the breaking-change comparator (from check-compatibility.cjs) in BOTH
 * directions against each package's openapi.json:
 *   - forward  (published -> current) reports anything breaking  -> additions/removals
 *     that break consumers                                          => major
 *   - reverse  (current -> published) reports "removals" that are, from current's point
 *     of view, things current ADDED                                 => minor (additive)
 *   - neither, but the surface still differs (descriptions, etc.)   => patch
 *   - identical surface                                             => none (skip)
 * The overall bump is the most severe across all packages.
 *
 * Usage:  node scripts/classify-bump.cjs [latest|rc] [packageKey ...]
 * Prints one of: major | minor | patch | none   (stdout; diagnostics on stderr).
 * A package with nothing published at the tag classifies as `minor` (new release line).
 *
 * Run `npm run sdk:generate` first; it writes packages/<dir>/openapi.json.
 */
const fs = require('fs')
const path = require('path')
const { sdkPackages } = require('./contract.cjs')
const { findBreakingChanges, loadPublishedSpec } = require('./check-compatibility.cjs')

const rootDir = path.resolve(__dirname, '..')
const packagesRootDir = path.join(rootDir, 'packages')
const versionsPath = path.join(rootDir, 'versions.json')
const distTag = (process.argv[2] || 'latest').trim()
const packageKeys = process.argv.slice(3)
const targets = packageKeys.length > 0 ? packageKeys : Object.keys(sdkPackages)

// Pre-1.0 policy: while a package's stable major is 0 there are no stability
// guarantees, so a breaking change is published as a minor bump (e.g. the v1 -> v2
// cut lands as 0.2.0 -> 0.3.0, not 1.0.0). The cap lifts automatically once the
// package reaches 1.0.0. Set SDK_ALLOW_MAJOR=true to cut a real major (e.g. 1.0.0).
const versions = fs.existsSync(versionsPath) ? JSON.parse(fs.readFileSync(versionsPath, 'utf8')) : {}
const allowMajor = process.env.SDK_ALLOW_MAJOR === 'true'

const SEVERITY = { none: 0, patch: 1, minor: 2, major: 3 }
let bump = 'none'

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

  let level = classify(config.packageName, publishedSpec, currentSpec)

  const currentMajor = Number.parseInt(String(versions[packageKey] || '0.0.0').split('.')[0], 10) || 0
  if (level === 'major' && currentMajor === 0 && !allowMajor) {
    console.error(`${config.packageName}: breaking, but pre-1.0 -> capping major to minor (SDK_ALLOW_MAJOR=true to override)`)
    level = 'minor'
  }

  console.error(`${config.packageName}: ${level}`)

  if (SEVERITY[level] > SEVERITY[bump]) {
    bump = level
  }
}

console.error(`overall bump for @${distTag}: ${bump}`)
process.stdout.write(bump)

function classify(packageName, publishedSpec, currentSpec) {
  if (!publishedSpec) {
    return 'minor' // nothing on this tag yet -> start a fresh feature line
  }

  if (findBreakingChanges(publishedSpec, currentSpec, packageName).length > 0) {
    return 'major'
  }

  if (findBreakingChanges(currentSpec, publishedSpec, packageName).length > 0) {
    return 'minor' // current has surface the published spec lacks -> additive
  }

  if (stableStringify(surfaceOf(publishedSpec)) !== stableStringify(surfaceOf(currentSpec))) {
    return 'patch' // non-structural change (descriptions, examples, ordering)
  }

  return 'none'
}

function surfaceOf(spec) {
  return { paths: spec.paths || {}, components: spec.components || {} }
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
