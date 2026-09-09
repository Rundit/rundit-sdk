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
 * Usage:  node scripts/classify-bump.cjs [latest|rc] [packageKey ...] [--json]
 * Prints one of major/minor/patch/none, or a per-package object with --json.
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
const SEVERITY = { none: 0, patch: 1, minor: 2, major: 3 }

function main() {
  const args = process.argv.slice(2)
  const json = args.includes('--json')
  const positional = args.filter((arg) => arg !== '--json')
  const distTag = (positional.shift() || 'latest').trim()
  const packageKeys = positional
  const targets = packageKeys.length > 0 ? packageKeys : Object.keys(sdkPackages)
  const packages = {}
  let bump = 'none'

  for (const packageKey of targets) {
    const config = sdkPackages[packageKey]

    if (!config) throw new Error(`Unknown SDK package key: ${packageKey}`)

    const currentSpecPath = path.join(packagesRootDir, config.packageDir, 'openapi.json')
    if (!fs.existsSync(currentSpecPath)) {
      throw new Error(`Missing generated SDK spec: ${currentSpecPath}. Run npm run sdk:generate first.`)
    }

    const currentSpec = JSON.parse(fs.readFileSync(currentSpecPath, 'utf8'))
    const publishedSpec = loadPublishedSpec(config.packageName, distTag)
    const level = classify(config.packageName, publishedSpec, currentSpec)
    packages[packageKey] = level

    console.error(`${config.packageName}: ${level}`)
    if (SEVERITY[level] > SEVERITY[bump]) bump = level
  }

  console.error(`overall bump for @${distTag}: ${bump}`)
  process.stdout.write(json ? JSON.stringify({ bump, packages }) : bump)
}

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

module.exports = { classify }

if (require.main === module) {
  try {
    main()
  } catch (error) {
    console.error(error.message)
    process.exitCode = 1
  }
}
