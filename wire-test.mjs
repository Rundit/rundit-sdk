// Runtime contract test for the generated SDK packages.
//
// Walks the runtime `routeManifest` of each generated client, invokes every
// namespaced method with synthesized arguments, and asserts that the mocked
// `fetch` saw the right method, URL, auth header, content-type, and body.
//
// This catches generator regressions that the consumer typecheck (types-only)
// and the SDK integration tests (which bypass the SDK and call supertest
// directly) would miss — URL interpolation, query encoding, body serialization,
// auth header placement, the path/body/query positional contract.
//
// Driven entirely by the runtime manifest so newly-added endpoints are covered
// automatically. Run via `npm run sdk:check-wire-contract` (Node's built-in
// test runner, no extra dependencies).

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createEmbedClient, routeManifest as embedManifest } from './packages/embed/dist/index.js'
import { createClient, routeManifest as clientManifest } from './packages/client/dist/index.js'

const BASE_URL = 'https://test.rundit.com/api/v2/sdk'
const WRITE_METHODS = new Set(['POST', 'PUT', 'PATCH'])

function makeMockFetch() {
  const calls = []
  const mockFetch = async (url, init) => {
    calls.push({
      url: String(url),
      method: init?.method,
      headers: init?.headers || {},
      body: init?.body,
    })
    return new Response('{}', {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })
  }
  return { calls, mockFetch }
}

// Best-effort sample value for a parameter described by a TS type string. The
// goal is a value the SDK runtime will accept and serialize — server-side
// validation doesn't run here because fetch is mocked.
function exampleValueFor(type) {
  if (type.includes('[]')) {
    if (type.includes('number')) return [123]
    return ['example']
  }
  if (type.includes('number')) return 123
  if (type.includes('boolean')) return true
  return 'example'
}

// Build the positional argument list for a route, matching the generator's
// `createMethodImplementation` shape: <pathParams...>, body?, query?, init?.
function buildArgs(route) {
  const args = route.pathParams.map((param) => exampleValueFor(param.type))

  if (WRITE_METHODS.has(route.method)) {
    // Empty body is sufficient — we're testing that the SDK *forwards* it,
    // not what the body shape should be.
    args.push({})
  }

  if (route.queryParams.length > 0) {
    const query = {}
    for (const param of route.queryParams) {
      if (param.required) query[param.name] = exampleValueFor(param.type)
    }
    args.push(query)
  }

  return args
}

function interpolatePath(template, pathParams, args) {
  return template.replace(/:([A-Za-z0-9_]+)/g, (_, key) => {
    const index = pathParams.findIndex((param) => param.name === key)
    return encodeURIComponent(String(args[index]))
  })
}

const SUITES = [
  {
    name: 'embed',
    factory: createEmbedClient,
    manifest: embedManifest,
    authHeader: 'Authorization',
    authValueStart: 'Bearer ',
    options: { baseUrl: BASE_URL, token: 'test-embed-token' },
  },
  {
    name: 'client',
    factory: createClient,
    manifest: clientManifest,
    authHeader: 'X-API-Key',
    authValueStart: 'rdt_',
    options: { baseUrl: BASE_URL, apiKey: 'rdt_ten_test_api_key' },
  },
]

for (const suite of SUITES) {
  for (const [namespace, ops] of Object.entries(suite.manifest)) {
    for (const [operation, route] of Object.entries(ops)) {
      test(`${suite.name}: ${namespace}.${operation} ${route.method} ${route.path}`, async () => {
        const { calls, mockFetch } = makeMockFetch()
        const client = suite.factory({ ...suite.options, fetch: mockFetch })
        const args = buildArgs(route)

        await client[namespace][operation](...args)

        assert.equal(calls.length, 1, 'exactly one fetch should be issued per SDK method call')
        const call = calls[0]

        // Method
        assert.equal(call.method, route.method, 'HTTP method matches manifest')

        // URL: starts with baseUrl + interpolated path (query string may follow)
        const expectedPath = interpolatePath(route.path, route.pathParams, args)
        const expectedUrlPrefix = BASE_URL + expectedPath
        assert.ok(
          call.url === expectedUrlPrefix || call.url.startsWith(expectedUrlPrefix + '?'),
          `URL ${call.url} should be ${expectedUrlPrefix} (or with a query string)`,
        )

        // Required query params present in the URL
        if (route.queryParams.some((param) => param.required)) {
          const parsedUrl = new URL(call.url)
          for (const param of route.queryParams.filter((p) => p.required)) {
            assert.ok(
              parsedUrl.searchParams.has(param.name),
              `required query param '${param.name}' should be present in ${parsedUrl.search}`,
            )
          }
        }

        // Auth header set to the audience-appropriate value
        const authValue = call.headers[suite.authHeader]
        assert.ok(authValue, `${suite.authHeader} header must be set`)
        assert.ok(
          String(authValue).startsWith(suite.authValueStart),
          `${suite.authHeader} should start with '${suite.authValueStart}', got '${authValue}'`,
        )

        // Body & Content-Type only for write methods
        if (WRITE_METHODS.has(route.method)) {
          assert.equal(
            call.headers['Content-Type'],
            'application/json',
            'write methods must declare Content-Type: application/json',
          )
          assert.equal(typeof call.body, 'string', 'write methods must send a string body')
          assert.doesNotThrow(() => JSON.parse(call.body), 'write body must be valid JSON')
        } else {
          assert.equal(call.body, undefined, 'read methods must not send a body')
          assert.equal(call.headers['Content-Type'], undefined, 'read methods must not set Content-Type')
        }
      })
    }
  }
}

function avatarFetch({ failUpload = false } = {}) {
  const calls = []
  const descriptor = {
    fileUuid: 'upload-id',
    uploadUrl: 'https://storage.example.test/avatar?signature=secret',
    httpMethod: 'PUT',
    headers: { 'Content-Type': 'image/png', 'If-None-Match': '*' },
    expiresIn: 600,
    maxBytes: 5242880,
  }
  const fetch = async (url, init) => {
    calls.push({ url: String(url), init })
    if (calls.length === 1) return Response.json(descriptor)
    if (calls.length === 2) return new Response('', { status: failUpload ? 403 : 200 })
    return Response.json({
      id: 'profile-id',
      avatarImageFileUuid: 'upload-id',
      avatarImageUrl: 'https://images.example.test/avatar.png',
    })
  }
  return { fetch, calls, descriptor }
}

test('avatar helper transfers exact bytes without API credentials then attaches the avatar', async () => {
  const { fetch, calls, descriptor } = avatarFetch()
  const client = createClient({
    apiKey: 'private-api-key',
    baseUrl: BASE_URL,
    fetch,
    headers: {
      Authorization: 'private-authorization',
      'x-private-header': 'private-value',
    },
  })
  const file = new Uint8Array([0, 255, 42, 128])
  const signal = new AbortController().signal
  const result = await client.profiles.uploadAvatar(
    'profile-id',
    {
      companyId: 123,
      file,
      filename: 'avatar.png',
      filetype: 'image/png',
    },
    { signal },
  )
  assert.equal(calls.length, 3)
  assert.deepEqual(JSON.parse(calls[0].init.body), {
    companyId: 123,
    filename: 'avatar.png',
    filetype: 'image/png',
    filesize: 4,
  })
  assert.equal(calls[1].url, descriptor.uploadUrl)
  assert.equal(calls[1].init.method, 'PUT')
  assert.equal(calls[1].init.body, file)
  assert.deepEqual(calls[1].init.headers, descriptor.headers)
  assert.equal(calls[1].init.credentials, 'omit')
  assert.equal(calls[1].init.redirect, 'error')
  assert.equal(calls[1].init.signal, signal)
  assert.deepEqual(JSON.parse(calls[2].init.body), {
    companyId: 123,
    fileUuid: 'upload-id',
  })
  assert.equal(result.avatarImageFileUuid, 'upload-id')
})

test('avatar helper accepts Blob and uses its MIME type and exact size', async () => {
  const { fetch, calls } = avatarFetch()
  const client = createClient({ apiKey: 'test-key', fetch })
  const file = new Blob([new Uint8Array([1, 2, 3])], { type: 'image/png' })
  await client.profiles.uploadAvatar('profile-id', {
    companyId: 123,
    file,
    filename: 'avatar.png',
  })
  assert.equal(JSON.parse(calls[0].init.body).filetype, 'image/png')
  assert.equal(JSON.parse(calls[0].init.body).filesize, 3)
  assert.equal(calls[1].init.body, file)
})

test('failed avatar byte transfer never completes or attaches an avatar', async () => {
  const { fetch, calls } = avatarFetch({ failUpload: true })
  const client = createClient({ apiKey: 'test-key', fetch })
  await assert.rejects(
    client.profiles.uploadAvatar('profile-id', {
      companyId: 123,
      file: new Uint8Array([1]),
      filename: 'avatar.png',
      filetype: 'image/png',
    }),
    { status: 403 },
  )
  assert.equal(calls.length, 2)
})

test('avatar helper rejects paths and empty images instead of serializing them', async () => {
  const { fetch, calls } = avatarFetch()
  const client = createClient({ apiKey: 'test-key', fetch })
  for (const file of ['/tmp/avatar.png', new Uint8Array([])]) {
    await assert.rejects(
      client.profiles.uploadAvatar('profile-id', {
        companyId: 123,
        file,
        filename: 'avatar.png',
        filetype: 'image/png',
      }),
      TypeError,
    )
  }
  assert.equal(calls.length, 0)
})
