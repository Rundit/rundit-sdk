const fs = require('node:fs')
const path = require('node:path')
const crypto = require('node:crypto')
const { execFileSync } = require('node:child_process')
const { sdkPackages } = require('./contract.cjs')
const { applyPre1Policy, compareStableVersions, normalizeStableVersion } = require('./versioning.cjs')

const rootDir = path.resolve(__dirname, '..')
const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'))
const digest = (value) => crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex')
const nonempty = (value) => typeof value === 'string' && value.trim().length > 0

function loadNotes(root) {
  const dir = path.join(root, 'release-notes')
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter((name) => name.endsWith('.json')).sort().map((name) => {
    if (!/^[a-z0-9][a-z0-9-]*\.json$/.test(name)) throw new Error(`Invalid note filename: ${name}`)
    const note = readJson(path.join(dir, name))
    const allowed = ['title', 'type', 'packages', 'changes', 'migration']
    if (Object.keys(note).some((key) => !allowed.includes(key)) ||
        !nonempty(note.title) || /[\r\n]/.test(note.title) ||
        !['breaking', 'feature', 'fix', 'docs'].includes(note.type) ||
        !Array.isArray(note.packages) || note.packages.length === 0 ||
        new Set(note.packages).size !== note.packages.length ||
        note.packages.some((key) => !Object.hasOwn(sdkPackages, key)) ||
        !Array.isArray(note.changes) || note.changes.length === 0 || !note.changes.every(nonempty) ||
        (note.migration !== undefined && !nonempty(note.migration)) ||
        (note.type === 'breaking' && !nonempty(note.migration))) {
      throw new Error(`Invalid release note: ${name}; breaking changes require migration guidance`)
    }
    return { id: name.slice(0, -5), hash: digest(note), ...note }
  })
}

function loadState(root) {
  const file = process.env.SDK_RELEASE_INDEX_FILE || path.join(root, 'releases/index.json')
  const releases = fs.existsSync(file) ? readJson(file) : []
  const notes = loadNotes(root)
  const released = new Map(releases.flatMap((release) => release.notes.map((note) => [note.id, note.hash])))
  for (const note of notes) {
    if (released.has(note.id) && released.get(note.id) !== note.hash) {
      throw new Error(`Released note ${note.id} was changed; add a new note instead`)
    }
  }
  return { releases, pending: notes.filter((note) => !released.has(note.id)) }
}

function parseClassification(input) {
  const levels = ['none', 'patch', 'minor', 'major']
  if (levels.includes(input)) return { bump: input, packages: null }
  let classification
  try {
    classification = JSON.parse(input)
  } catch {
    throw new Error(`Invalid automatic bump: ${input}`)
  }
  if (
    !classification ||
    !levels.includes(classification.bump) ||
    !classification.packages ||
    Array.isArray(classification.packages) ||
    Object.keys(classification.packages).length === 0 ||
    Object.entries(classification.packages).some(
      ([key, bump]) => !Object.hasOwn(sdkPackages, key) || !levels.includes(bump),
    )
  ) {
    throw new Error(`Invalid automatic classification: ${input}`)
  }
  const computed = Object.values(classification.packages).reduce(
    (highest, bump) => levels[Math.max(levels.indexOf(highest), levels.indexOf(bump))],
    'none',
  )
  if (classification.bump !== computed) throw new Error(`Inconsistent automatic classification: ${input}`)
  return classification
}

function requiredBump(root, automaticInput) {
  const levels = ['none', 'patch', 'minor', 'major']
  const automatic = parseClassification(automaticInput)
  const { releases, pending } = loadState(root)
  if (!pending.length) throw new Error('No unreleased consumer notes. Add a release-notes/*.json file before publishing.')
  if (automatic.packages) {
    for (const [key, bump] of Object.entries(automatic.packages)) {
      if (bump === 'none') continue
      const packageNotes = pending.filter((note) => note.packages.includes(key))
      const allowedTypes = bump === 'major' ? ['breaking'] : bump === 'minor' ? ['breaking', 'feature'] : null
      if (!packageNotes.length || (allowedTypes && !packageNotes.some((note) => allowedTypes.includes(note.type)))) {
        const expected = bump === 'major' ? 'a breaking' : bump === 'minor' ? 'a feature or breaking' : 'a'
        throw new Error(`${key} has a ${bump} SDK surface change and requires ${expected} release note`)
      }
    }
  } else if (automatic.bump === 'major' && !pending.some((note) => note.type === 'breaking')) {
    throw new Error('A breaking SDK surface change requires a breaking release note with migration guidance')
  }
  const versionsFile = process.env.SDK_STABLE_VERSIONS_FILE || path.join(root, 'versions.json')
  const versions = readJson(versionsFile)
  for (const release of releases) {
    for (const key of Object.keys(sdkPackages)) {
      const releasedVersion = release.versions[key]
      if (releasedVersion && compareStableVersions(releasedVersion, versions[key] || '0.0.0') > 0) {
        versions[key] = normalizeStableVersion(releasedVersion)
      }
    }
  }
  const allowMajor = process.env.SDK_ALLOW_MAJOR === 'true'
  const applyPolicy = (bump, packageKeys) => {
    if (bump !== 'major') return bump
    return packageKeys.some(
      (key) => applyPre1Policy(bump, versions[key] || '0.0.0', allowMajor) === 'major',
    )
      ? 'major'
      : 'minor'
  }
  let level = levels.indexOf(applyPolicy(automatic.bump, Object.keys(sdkPackages)))
  for (const note of pending) {
    const noteBump =
      note.type === 'breaking' ? applyPolicy('major', note.packages) : note.type === 'feature' ? 'minor' : 'patch'
    level = Math.max(level, levels.indexOf(noteBump))
  }
  return levels[level]
}

function bodyFor(release, key) {
  const config = sdkPackages[key]
  const version = release.versions[key]
  const notes = release.notes.filter((note) => note.packages.includes(key))
  const sections = notes.map((note) => [
    `### ${note.type === 'breaking' ? 'Breaking: ' : ''}${note.title}`,
    ...note.changes.map((change) => `- ${change}`),
    ...(note.migration ? [`\n**Migration:** ${note.migration}`] : []),
  ].join('\n\n'))
  return [
    `## ${config.packageName}@${version} — ${release.date}`,
    `Install: \`npm install ${config.packageName}@${version}\``,
    ...sections,
    ...(notes.length ? [] : ['No package-specific API changes; published alongside the other SDK package.']),
  ].filter(Boolean).join('\n\n') + '\n'
}

function prepare(root, channel, source, date = new Date().toISOString().slice(0, 10)) {
  if (channel !== 'latest') throw new Error('Release notes are prepared only for stable releases')
  if (!/^[a-f0-9]{40}$/.test(source)) throw new Error('An exact source commit SHA is required')
  const { releases, pending } = loadState(root)
  if (!pending.length) throw new Error('No unreleased consumer notes; refusing an undocumented release')
  const versions = {}
  for (const [key, config] of Object.entries(sdkPackages)) {
    const pkg = readJson(path.join(root, 'packages', config.packageDir, 'package.json'))
    if (pkg.name !== config.packageName || !/^\d+\.\d+\.\d+(?:-rc\.\d+)?$/.test(pkg.version) ||
        pkg.version.includes('-')) throw new Error(`Unexpected package/version for ${key}`)
    versions[key] = pkg.version
    if (releases.some((entry) => entry.versions[key] === pkg.version)) throw new Error(`Version ${pkg.version} is already documented for ${key}`)
  }
  const release = { channel, source, date, versions, notes: pending }
  const history = [release, ...releases]
  const output = path.join(root, '.release-output')
  fs.mkdirSync(output, { recursive: true })
  const plan = Object.entries(sdkPackages).map(([key, config]) => {
    const body = bodyFor(release, key)
    fs.writeFileSync(path.join(output, `${key}.md`), body)
    // Written after codegen so npm ships the notes for this exact version.
    fs.writeFileSync(path.join(root, 'packages', config.packageDir, 'CHANGELOG.md'),
      '# Changelog\n\n' + history.map((entry) => bodyFor(entry, key)).join('\n'))
    return { key, tag: `${key}-v${versions[key]}`, title: `${config.packageName}@${versions[key]}`, body }
  })
  fs.writeFileSync(path.join(output, 'plan.json'), JSON.stringify({ source, channel, releases: plan }, null, 2) + '\n')
  fs.mkdirSync(path.join(root, 'releases'), { recursive: true })
  fs.writeFileSync(path.join(root, 'releases/index.json'), JSON.stringify(history, null, 2) + '\n')
  fs.writeFileSync(path.join(root, 'CHANGELOG.md'), '# Changelog\n\n' + history.flatMap((entry) =>
    Object.keys(sdkPackages).map((key) => bodyFor(entry, key))).join('\n'))
  return release
}

// Runs only in publishing CI, after npm publishing has succeeded. Arguments are never
// interpolated into a shell, and note text is passed via a file.
function findGithubReleases(run) {
  return JSON.parse(
    run('gh', ['api', '--paginate', '--slurp', 'repos/{owner}/{repo}/releases'], { encoding: 'utf8' }),
  ).flat()
}

function createGithubRelease(release, target, bodyFile, existing, run) {
  const found = existing.find((entry) => entry.tag_name === release.tag)
  if (found) {
    if (
      found.body?.trim() !== release.body.trim() ||
      found.draft ||
      found.prerelease
    ) {
      throw new Error(`Conflicting GitHub release: ${release.tag}`)
    }
    return
  }
  run(
    'gh',
    [
      'release',
      'create',
      release.tag,
      '--target',
      target,
      '--title',
      release.title,
      '--notes-file',
      bodyFile,
      '--latest=false',
    ],
    { stdio: 'inherit' },
  )
}

function publishGithub(root, target, run = execFileSync) {
  const output = path.join(root, '.release-output')
  const plan = readJson(path.join(output, 'plan.json'))
  if (plan.channel !== 'latest') throw new Error('GitHub Releases are published only for stable versions')
  const existing = findGithubReleases(run)
  for (const release of plan.releases) {
    createGithubRelease(
      release,
      target || plan.source,
      path.join(output, `${release.key}.md`),
      existing,
      run,
    )
  }
}

function syncStableGithub(root, run = execFileSync) {
  const { releases } = loadState(root)
  const existing = findGithubReleases(run)
  const output = path.join(root, '.release-output', 'stable')
  fs.mkdirSync(output, { recursive: true })
  for (const release of releases) {
    for (const [key, config] of Object.entries(sdkPackages)) {
      const body = bodyFor(release, key)
      const bodyFile = path.join(output, `${key}-${release.versions[key]}.md`)
      fs.writeFileSync(bodyFile, body)
      createGithubRelease(
        {
          key,
          tag: `${key}-v${release.versions[key]}`,
          title: `${config.packageName}@${release.versions[key]}`,
          body,
        },
        release.source,
        bodyFile,
        existing,
        run,
      )
    }
  }
}

module.exports = { loadNotes, loadState, requiredBump, prepare, publishGithub, syncStableGithub, bodyFor }

if (require.main === module) {
  const [command, ...args] = process.argv.slice(2)
  try {
    if (command === 'check') {
      const state = loadState(rootDir)
      console.log(`${state.pending.length} unreleased notes; ${state.releases.length} stable releases`)
    } else if (command === 'pending') console.log(loadState(rootDir).pending.length > 0)
    else if (command === 'bump') console.log(requiredBump(rootDir, args[0]))
    else if (command === 'prepare') prepare(rootDir, args[0], process.env.GITHUB_SHA || args[1])
    else if (command === 'publish-github') publishGithub(rootDir, args[0])
    else if (command === 'sync-github') syncStableGithub(rootDir)
    else throw new Error('Usage: release-notes.cjs check|pending|bump <classification>|prepare latest [sha]|publish-github [target]|sync-github')
  } catch (error) {
    console.error(error.message)
    process.exitCode = 1
  }
}
