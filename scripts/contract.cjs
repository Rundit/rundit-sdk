/**
 * Single source of truth for the SDK packages this repo publishes.
 *
 * Every other script in scripts/sdk/* (generate, bump-version, check-compatibility,
 * check-sdk-surface, publish-packages) reads from `sdkPackages` so that adding a new
 * audience requires changing only this file plus the `x-sdk-audiences` tags on the
 * OpenAPI operations under src/sdk-api/.
 *
 * Each entry describes:
 *   - packageName / packageDir: published npm name and the folder under packages/
 *   - maturity: 'active' (real consumers) vs 'placeholder' (reserved surface, not yet used)
 *   - factoryName / clientTypeName / optionsTypeName: identifiers baked into the generated
 *     runtime + .d.ts so the public API is stable and predictable
 *   - auth: how the generated client attaches credentials. headerValueExpression is a JS
 *     expression string spliced into generate-sdk.cjs's runtime template — keep it valid JS.
 */
const sdkPackages = {
  embed: {
    packageName: '@rundit-sdk/embed',
    packageDir: 'embed',
    description: 'Public Rundit embed SDK for iframe and embedded module consumers.',
    maturity: 'active',
    factoryName: 'createEmbedClient',
    clientTypeName: 'EmbedClient',
    optionsTypeName: 'CreateEmbedClientOptions',
    usage: {
      contextLabel: 'embedded Lovable modules and iframe integrations',
      skillIntent: 'Use when building Lovable modules or embedded Rundit integrations against the SDK API',
      skillTagline: 'Preferred skill for embedded clients and Lovable modules.',
    },
    auth: {
      headerName: 'Authorization',
      headerValueExpression: '`Bearer ${options.token}`',
      optionKey: 'token',
      optionType: 'string',
      docsLabel: 'embed token',
    },
  },
  client: {
    packageName: '@rundit-sdk/client',
    packageDir: 'client',
    description: 'Rundit client SDK for third-party integrations authenticated with a Rundit API key.',
    maturity: 'active',
    factoryName: 'createClient',
    clientTypeName: 'RunditClient',
    optionsTypeName: 'CreateClientOptions',
    usage: {
      contextLabel: 'third-party server-side or workflow integrations using a Rundit API key',
      skillIntent: 'Use when integrating Rundit data into a third-party server, worker, or automation using an API key',
      skillTagline: 'Preferred skill for third-party server-side and workflow integrations.',
    },
    auth: {
      headerName: 'X-API-Key',
      headerValueExpression: 'options.apiKey',
      optionKey: 'apiKey',
      optionType: 'string',
      docsLabel: 'API key',
    },
  },
}

module.exports = {
  sdkPackages,
}
