const assert = require('node:assert/strict')
const test = require('node:test')

const {
  applyPre1Policy,
  bumpStableVersion,
  createPrereleaseVersion,
} = require('../scripts/versioning.cjs')

test('rc versions promote to the same final core version for every bump type', () => {
  for (const bump of ['patch', 'minor', 'major']) {
    const stable = bumpStableVersion('1.2.3', bump)
    const rc = createPrereleaseVersion('1.2.3', bump, 'rc', '42')
    assert.equal(rc, `${stable}-rc.42`)
  }
})

test('the major cap follows the stable release rather than a stale branch version', () => {
  assert.equal(applyPre1Policy('major', '0.9.0'), 'minor')
  assert.equal(applyPre1Policy('major', '1.0.0'), 'major')
  assert.equal(applyPre1Policy('major', '0.9.0', true), 'major')
})

test('invalid versions and bump types fail instead of publishing an accidental patch', () => {
  assert.throws(() => bumpStableVersion('1.2', 'patch'), /Invalid semantic version/)
  assert.throws(() => bumpStableVersion('01.2.3', 'patch'), /Invalid semantic version/)
  assert.throws(() => bumpStableVersion('1.2.3', 'banana'), /Unsupported release type/)
})
