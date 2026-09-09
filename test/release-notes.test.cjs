const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const test = require('node:test')

const {
  loadState,
  prepare,
  publishGithub,
  requiredBump,
  syncStableGithub,
} = require('../scripts/release-notes.cjs')

const SHA = '1234567890abcdef1234567890abcdef12345678'

function fixture(note = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'rundit-release-notes-'))
  fs.mkdirSync(path.join(root, 'release-notes'))
  fs.mkdirSync(path.join(root, 'releases'))
  fs.mkdirSync(path.join(root, 'packages/client'), { recursive: true })
  fs.mkdirSync(path.join(root, 'packages/embed'), { recursive: true })
  fs.writeFileSync(path.join(root, 'versions.json'), '{"client":"0.3.3","embed":"0.3.3"}\n')
  fs.writeFileSync(path.join(root, 'releases/index.json'), '[]\n')
  fs.writeFileSync(
    path.join(root, 'release-notes/change.json'),
    JSON.stringify({
      title: 'A consumer-visible change',
      type: 'breaking',
      packages: ['client', 'embed'],
      changes: ['Changed the response shape.'],
      migration: 'Read the replacement field.',
      ...note,
    }),
  )
  for (const key of ['client', 'embed']) {
    fs.writeFileSync(
      path.join(root, `packages/${key}/package.json`),
      JSON.stringify({ name: `@rundit-sdk/${key}`, version: '0.4.0' }),
    )
  }
  return root
}

test('release note type raises the version bump and breaking notes require migration guidance', () => {
  const root = fixture()
  assert.equal(requiredBump(root, 'patch'), 'minor')
  assert.equal(requiredBump(root, 'major'), 'minor')
  fs.writeFileSync(
    path.join(root, 'release-notes/change.json'),
    JSON.stringify({
      title: 'Missing migration',
      type: 'breaking',
      packages: ['client'],
      changes: ['Changed something.'],
    }),
  )
  assert.throws(() => loadState(root), /breaking changes require migration guidance/)
})

test('a breaking surface classification requires an explicit breaking note', () => {
  const root = fixture({ type: 'fix', migration: undefined })
  assert.throws(() => requiredBump(root, 'major'), /requires a breaking release note/)
})

test('per-package classifications must be covered by notes for the affected package', () => {
  const root = fixture({ packages: ['client'] })
  assert.equal(
    requiredBump(root, JSON.stringify({ bump: 'major', packages: { client: 'major', embed: 'none' } })),
    'minor',
  )
  assert.throws(
    () => requiredBump(root, JSON.stringify({ bump: 'major', packages: { client: 'major', embed: 'major' } })),
    /embed.*breaking release note/,
  )
  assert.throws(
    () => requiredBump(root, JSON.stringify({ bump: 'patch', packages: { client: 'major' } })),
    /Inconsistent automatic classification/,
  )
})

test('stable preparation records immutable notes and writes package-specific changelogs', () => {
  const root = fixture()
  prepare(root, 'latest', SHA, '2026-09-09')
  const history = JSON.parse(fs.readFileSync(path.join(root, 'releases/index.json'), 'utf8'))
  assert.equal(history[0].versions.client, '0.4.0')
  assert.match(fs.readFileSync(path.join(root, 'CHANGELOG.md'), 'utf8'), /Breaking: A consumer-visible change/)
  assert.match(fs.readFileSync(path.join(root, 'packages/client/CHANGELOG.md'), 'utf8'), /Migration:/)

  const noteFile = path.join(root, 'release-notes/change.json')
  const changed = JSON.parse(fs.readFileSync(noteFile, 'utf8'))
  changed.changes.push('Edited after release.')
  fs.writeFileSync(noteFile, JSON.stringify(changed))
  assert.throws(() => loadState(root), /was changed/)
})

test('rc releases cannot render or publish release notes', () => {
  const root = fixture()
  assert.throws(() => prepare(root, 'rc', SHA, '2026-09-09'), /only for stable releases/)
  assert.ok(!fs.existsSync(path.join(root, '.release-output')))
})

test('an external stable index prevents released notes from repeating on another branch', () => {
  const root = fixture()
  prepare(root, 'latest', SHA, '2026-09-09')
  const stableIndex = path.join(root, 'stable-index.json')
  fs.copyFileSync(path.join(root, 'releases/index.json'), stableIndex)
  fs.writeFileSync(path.join(root, 'releases/index.json'), '[]\n')

  const previous = process.env.SDK_RELEASE_INDEX_FILE
  process.env.SDK_RELEASE_INDEX_FILE = stableIndex
  try {
    assert.equal(loadState(root).pending.length, 0)
  } finally {
    if (previous === undefined) delete process.env.SDK_RELEASE_INDEX_FILE
    else process.env.SDK_RELEASE_INDEX_FILE = previous
  }
})

test('stable history lifts the pre-1.0 cap even when the branch version file is stale', () => {
  const root = fixture()
  prepare(root, 'latest', SHA, '2026-09-09')
  const history = JSON.parse(fs.readFileSync(path.join(root, 'releases/index.json'), 'utf8'))
  history[0].versions = { client: '1.0.0', embed: '1.0.0' }
  fs.writeFileSync(path.join(root, 'releases/index.json'), JSON.stringify(history))
  fs.writeFileSync(
    path.join(root, 'release-notes/next-break.json'),
    JSON.stringify({
      title: 'A post-1.0 break',
      type: 'breaking',
      packages: ['client', 'embed'],
      changes: ['Changed the stable contract.'],
      migration: 'Update the affected calls.',
    }),
  )

  assert.equal(requiredBump(root, 'patch'), 'major')
})

test('GitHub publication is package-specific, idempotent, and uses exact targets', () => {
  const root = fixture({ type: 'feature', migration: undefined })
  prepare(root, 'latest', SHA, '2026-09-09')
  const calls = []
  const run = (command, args) => {
    calls.push([command, args])
    return args[0] === 'api' ? '[]' : ''
  }
  publishGithub(root, SHA, run)
  const creates = calls.filter(([, args]) => args[0] === 'release')
  assert.equal(creates.length, 2)
  assert.ok(creates.every(([, args]) => args.includes(SHA)))

  const releaseIndex = JSON.parse(fs.readFileSync(path.join(root, 'releases/index.json'), 'utf8'))
  const existing = Object.keys({ client: true, embed: true }).map((key) => ({
    tag_name: `${key}-v0.4.0`,
    body: require('../scripts/release-notes.cjs').bodyFor(releaseIndex[0], key),
    draft: false,
    prerelease: false,
  }))
  const retryCalls = []
  syncStableGithub(root, (command, args) => {
    retryCalls.push([command, args])
    return args[0] === 'api' ? JSON.stringify([existing]) : ''
  })
  assert.equal(retryCalls.filter(([, args]) => args[0] === 'release').length, 0)
})
