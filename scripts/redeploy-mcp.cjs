// Wait for npm propagation before rebuilding the hosted MCP image from its SDK dist-tag.
const { setTimeout: sleep } = require('node:timers/promises')

const hookSecrets = {
  rc: 'CLOUD66_MCP_REDEPLOY_HOOK_TEST',
  latest: 'CLOUD66_MCP_REDEPLOY_HOOK_PROD',
}

async function redeployMcp({
  distTag,
  expectedVersion,
  env = process.env,
  fetchImpl = fetch,
  wait = sleep,
  attempts = 20,
  intervalMs = 10_000,
  log = console.log,
}) {
  const secretName = hookSecrets[distTag]
  if (!secretName) throw new Error('SDK dist-tag must be rc or latest')
  if (!env[secretName]?.trim()) throw new Error(`Missing ${secretName}`)

  let hook
  try {
    hook = new URL(env[secretName].trim())
  } catch {
    throw new Error(`${secretName} must be a valid redeployment hook URL`)
  }
  if (hook.protocol !== 'https:') throw new Error(`${secretName} must use HTTPS`)
  if (!hook.searchParams.get('deployment_profile')) {
    throw new Error(`${secretName} must select a deployment_profile with Build and Publish enabled for mcp`)
  }
  hook.searchParams.set('services', 'mcp')

  let version
  let lastError
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const response = await fetchImpl(`https://registry.npmjs.org/@rundit-sdk/client/${distTag}`, {
        cache: 'no-store', signal: AbortSignal.timeout(5_000),
      })
      if (!response.ok) throw new Error(`npm manifest returned HTTP ${response.status}`)
      const manifest = await response.json()
      if (!manifest.version || !manifest.dist?.tarball) throw new Error('npm manifest is incomplete')
      if (expectedVersion && manifest.version !== expectedVersion) {
        throw new Error(`npm @${distTag} still resolves to ${manifest.version}, expected ${expectedVersion}`)
      }

      const tarball = await fetchImpl(manifest.dist.tarball, { method: 'HEAD', signal: AbortSignal.timeout(5_000) })
      if (!tarball.ok) throw new Error(`npm tarball returned HTTP ${tarball.status}`)
      version = manifest.version
      break
    } catch (error) {
      lastError = error.message
      log(`Waiting for @rundit-sdk/client@${distTag} (${attempt}/${attempts}): ${lastError}`)
      if (attempt < attempts) await wait(intervalMs)
    }
  }
  if (!version) throw new Error(`npm package did not become available: ${lastError}`)

  log(`Requesting MCP rebuild from @rundit-sdk/client@${version} (@${distTag})`)
  let response
  try {
    response = await fetchImpl(hook.toString(), {
      method: 'POST', redirect: 'error', signal: AbortSignal.timeout(30_000),
    })
  } catch {
    // Hook URLs contain credentials; keep them out of errors and build logs.
    throw new Error('Cloud 66 MCP rebuild request failed (network error or timeout)')
  }
  if (!response.ok) throw new Error(`Cloud 66 MCP rebuild request failed: HTTP ${response.status}`)
  await response.body?.cancel()
  log('Cloud 66 accepted the MCP rebuild request; follow deployment progress in Cloud 66.')
  return version
}

module.exports = { redeployMcp }

if (require.main === module) {
  const [distTag, expectedVersion] = process.argv.slice(2)
  redeployMcp({ distTag, expectedVersion }).catch((error) => {
    console.error(error.message)
    process.exitCode = 1
  })
}
