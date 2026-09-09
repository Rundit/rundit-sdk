const assert = require('node:assert/strict')
const { execFileSync } = require('node:child_process')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const test = require('node:test')

const SHA = '1234567890abcdef1234567890abcdef12345678'
const sourceRoot = path.resolve(__dirname, '..')

function run(root, script, args = [], env = {}) {
  return execFileSync(process.execPath, [script, ...args], {
    cwd: root,
    env: { ...process.env, SDK_RELEASE_INDEX_FILE: '', SDK_STABLE_VERSIONS_FILE: '', ...env },
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  })
}

test('develop rc promotes to the same production version while only stable attaches release notes', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'rundit-release-lifecycle-'))
  fs.cpSync(path.join(sourceRoot, 'scripts'), path.join(root, 'scripts'), { recursive: true })
  fs.mkdirSync(path.join(root, 'spec'))
  fs.mkdirSync(path.join(root, 'release-notes'))
  fs.mkdirSync(path.join(root, 'releases'))
  fs.writeFileSync(
    path.join(root, 'spec/sdk.openapi.json'),
    JSON.stringify({ openapi: '3.0.0', info: { title: 'fixture', version: '1' }, paths: {}, components: {} }),
  )
  fs.writeFileSync(path.join(root, 'versions.json'), '{"client":"0.3.4","embed":"0.3.4"}\n')
  fs.writeFileSync(path.join(root, 'releases/index.json'), '[]\n')
  fs.writeFileSync(
    path.join(root, 'release-notes/change.json'),
    JSON.stringify({
      title: 'Change an SDK capability',
      type: 'breaking',
      packages: ['client', 'embed'],
      changes: ['Changed a consumer-facing response.'],
      migration: 'Read the replacement response field.',
    }),
  )

  const bin = path.join(root, 'bin')
  fs.mkdirSync(bin)
  const npmStub = path.join(bin, 'npm')
  fs.writeFileSync(npmStub, '#!/bin/sh\n[ "$SDK_TEST_NPM_EMPTY" = true ] && exit 0\necho \'"0.3.4"\'\n')
  fs.chmodSync(npmStub, 0o755)
  const rcEnv = {
    PATH: `${bin}${path.delimiter}${process.env.PATH}`,
    SDK_PRERELEASE_CHANNEL: 'rc',
    SDK_PRERELEASE_ITERATION: '42',
  }

  run(root, 'scripts/generate-sdk.cjs', [], rcEnv)
  const classification = run(root, 'scripts/classify-bump.cjs', ['rc', '--json'], {
    ...rcEnv,
    SDK_TEST_NPM_EMPTY: 'true',
  }).trim()
  assert.deepEqual(JSON.parse(classification), {
    bump: 'minor',
    packages: { client: 'minor', embed: 'minor' },
  })
  const bump = run(root, 'scripts/release-notes.cjs', ['bump', classification]).trim()
  assert.equal(bump, 'minor')
  rcEnv.SDK_PRERELEASE_BUMP = bump
  run(root, 'scripts/generate-sdk.cjs', [], rcEnv)
  for (const packageName of ['client', 'embed']) {
    const pkg = JSON.parse(fs.readFileSync(path.join(root, `packages/${packageName}/package.json`), 'utf8'))
    assert.equal(pkg.version, '0.4.0-rc.42')
    assert.ok(!pkg.files.includes('CHANGELOG.md'))
    assert.ok(!fs.existsSync(path.join(root, `packages/${packageName}/CHANGELOG.md`)))
  }
  assert.ok(!fs.existsSync(path.join(root, '.release-output')))

  const productionClassification = run(root, 'scripts/classify-bump.cjs', ['latest', '--json'], {
    ...rcEnv,
    SDK_TEST_NPM_EMPTY: 'true',
  }).trim()
  assert.equal(productionClassification, classification)
  const productionBump = run(
    root,
    'scripts/release-notes.cjs',
    ['bump', productionClassification],
  ).trim()
  assert.equal(productionBump, bump)

  run(root, 'scripts/bump-version.cjs', [productionBump])
  run(root, 'scripts/generate-sdk.cjs')
  run(root, 'scripts/release-notes.cjs', ['prepare', 'latest', SHA])
  for (const packageName of ['client', 'embed']) {
    const pkg = JSON.parse(fs.readFileSync(path.join(root, `packages/${packageName}/package.json`), 'utf8'))
    assert.equal(pkg.version, '0.4.0')
    assert.ok(pkg.files.includes('CHANGELOG.md'))
    assert.match(fs.readFileSync(path.join(root, `packages/${packageName}/CHANGELOG.md`), 'utf8'), /0\.4\.0/)
  }
  const history = JSON.parse(fs.readFileSync(path.join(root, 'releases/index.json'), 'utf8'))
  assert.equal(history.length, 1)
  assert.equal(history[0].versions.client, '0.4.0')
  assert.equal(history[0].channel, 'latest')
})
