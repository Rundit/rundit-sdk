const BUMPS = new Set(['patch', 'minor', 'major'])

function parseStableVersion(version) {
  const match = String(version).match(
    /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/,
  )
  if (!match) throw new Error(`Invalid semantic version: ${version}`)
  return match.slice(1).map(Number)
}

function normalizeStableVersion(version) {
  return parseStableVersion(version).join('.')
}

function compareStableVersions(left, right) {
  const leftParts = parseStableVersion(left)
  const rightParts = parseStableVersion(right)

  for (let index = 0; index < 3; index += 1) {
    if (leftParts[index] !== rightParts[index]) return leftParts[index] - rightParts[index]
  }
  return 0
}

function bumpStableVersion(version, bump) {
  if (!BUMPS.has(bump)) throw new Error(`Unsupported release type: ${bump}`)
  const [major, minor, patch] = parseStableVersion(version)
  if (bump === 'major') return `${major + 1}.0.0`
  if (bump === 'minor') return `${major}.${minor + 1}.0`
  return `${major}.${minor}.${patch + 1}`
}

function sanitizePrereleaseIdentifier(value) {
  return (
    String(value)
      .trim()
      .replace(/[^0-9A-Za-z-]+/g, '-')
      .replace(/^-+|-+$/g, '') || '0'
  )
}

function createPrereleaseVersion(stableVersion, bump, channel, iteration) {
  const prerelease = `${sanitizePrereleaseIdentifier(channel)}.${sanitizePrereleaseIdentifier(iteration)}`
  return `${bumpStableVersion(stableVersion, bump)}-${prerelease}`
}

function applyPre1Policy(bump, stableVersion, allowMajor = false) {
  if (bump !== 'major' || allowMajor) return bump
  return parseStableVersion(stableVersion)[0] === 0 ? 'minor' : 'major'
}

module.exports = {
  applyPre1Policy,
  bumpStableVersion,
  compareStableVersions,
  createPrereleaseVersion,
  normalizeStableVersion,
}
