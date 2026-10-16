const { test } = require('node:test')
const assert = require('node:assert/strict')
const { redeployMcp } = require('./redeploy-mcp.cjs')

const version = '0.3.7-rc.22'
const tarballUrl = `https://registry.npmjs.org/@rundit-sdk/client/-/client-${version}.tgz`
const env = {
  CLOUD66_MCP_REDEPLOY_HOOK_TEST: 'https://hooks.cloud66.com/stacks/redeploy/test/secret?deployment_profile=mcp-rebuild',
  CLOUD66_MCP_REDEPLOY_HOOK_PROD: 'https://hooks.cloud66.com/stacks/redeploy/prod/secret?deployment_profile=mcp-rebuild',
}
const manifest = (value = version) => Response.json({ version: value,
  dist: { tarball: `https://registry.npmjs.org/@rundit-sdk/client/-/client-${value}.tgz` } })

function harness(responses, overrides = {}) {
  const calls = []
  const waits = []
  return {
    calls, waits,
    run: () => redeployMcp({
      distTag: 'rc', expectedVersion: version, env, attempts: 3, log: () => {},
      wait: async (ms) => { waits.push(ms) },
      fetchImpl: async (url, init) => {
        calls.push({ url, init })
        const response = responses.shift()
        if (response instanceof Error) throw response
        assert.ok(response, `Unexpected request: ${url}`)
        return response
      },
      ...overrides,
    }),
  }
}

test('waits for the exact published version, then rebuilds only test MCP using the selected profile', async () => {
  const h = harness([manifest('0.3.7-rc.21'), manifest(), new Response(null), new Response(null, { status: 202 })])
  assert.equal(await h.run(), version)
  assert.deepEqual(h.waits, [10_000])
  assert.equal(h.calls.length, 4)
  assert.equal(h.calls[0].url, 'https://registry.npmjs.org/@rundit-sdk/client/rc')
  assert.equal(h.calls[2].url, tarballUrl)
  assert.equal(h.calls[2].init.method, 'HEAD')
  const hook = new URL(h.calls[3].url)
  assert.equal(hook.pathname, '/stacks/redeploy/test/secret')
  assert.equal(hook.searchParams.get('deployment_profile'), 'mcp-rebuild')
  assert.equal(hook.searchParams.get('services'), 'mcp')
  assert.equal(h.calls[3].init.method, 'POST')
  assert.equal(h.calls[3].init.body, undefined)
})

test('manual redeploy resolves the existing latest release and selects the production hook', async () => {
  const h = harness([manifest('0.3.6'), new Response(null), new Response(null)], {
    distTag: 'latest', expectedVersion: undefined,
  })
  assert.equal(await h.run(), '0.3.6')
  assert.equal(h.calls[0].url, 'https://registry.npmjs.org/@rundit-sdk/client/latest')
  assert.equal(h.calls[1].url, 'https://registry.npmjs.org/@rundit-sdk/client/-/client-0.3.6.tgz')
  assert.equal(new URL(h.calls[2].url).pathname, '/stacks/redeploy/prod/secret')
})

test('retries registry failures and unavailable tarballs before calling Cloud 66', async () => {
  const h = harness([new Error('Registry unavailable'), manifest(), new Response(null, { status: 404 }),
    manifest(), new Response(null), new Response(null)])
  assert.equal(await h.run(), version)
  assert.equal(h.waits.length, 2)
  assert.equal(h.calls.filter(({ init }) => init.method === 'POST').length, 1)
})

test('fails without triggering a rebuild when npm propagation times out', async () => {
  const h = harness([manifest('old'), manifest('old'), manifest('old')])
  await assert.rejects(h.run(), /npm package did not become available/)
  assert.equal(h.calls.length, 3)
  assert.equal(h.waits.length, 2)
  assert.ok(h.calls.every(({ init }) => init.method !== 'POST'))
})

test('rejects a missing channel secret instead of falling back to the other environment', async () => {
  const h = harness([], { env: { CLOUD66_MCP_REDEPLOY_HOOK_PROD: env.CLOUD66_MCP_REDEPLOY_HOOK_PROD } })
  await assert.rejects(h.run(), /Missing CLOUD66_MCP_REDEPLOY_HOOK_TEST/)
  assert.equal(h.calls.length, 0)
})

test('requires a rebuild profile and overrides any broader service selection', async () => {
  const missingProfile = harness([], { env: { CLOUD66_MCP_REDEPLOY_HOOK_TEST: 'https://hooks.cloud66.com/secret' } })
  await assert.rejects(missingProfile.run(), /must select a deployment_profile/)
  assert.equal(missingProfile.calls.length, 0)
  const h = harness([manifest(), new Response(null), new Response(null)], {
    env: { CLOUD66_MCP_REDEPLOY_HOOK_TEST: `${env.CLOUD66_MCP_REDEPLOY_HOOK_TEST}&services=backend,mcp` },
  })
  await h.run()
  assert.equal(new URL(h.calls[2].url).searchParams.get('services'), 'mcp')
})

test('fails on hook errors without exposing the secret URL or retrying deployment', async () => {
  const h = harness([manifest(), new Response(null), new Response(null, { status: 503 })])
  await assert.rejects(h.run(), { message: 'Cloud 66 MCP rebuild request failed: HTTP 503' })
  assert.equal(h.calls.length, 3)
  const networkFailure = harness([manifest(), new Response(null), new Error(env.CLOUD66_MCP_REDEPLOY_HOOK_TEST)])
  await assert.rejects(networkFailure.run(), { message: 'Cloud 66 MCP rebuild request failed (network error or timeout)' })
})
