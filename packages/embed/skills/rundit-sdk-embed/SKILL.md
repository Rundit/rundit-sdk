---
description: Public Rundit embed SDK for iframe and embedded module consumers. Preferred skill for embedded clients and Lovable modules.
intent:
  - Use when building Lovable modules or embedded Rundit integrations against the SDK API
  - Use when an agent should prefer generated SDK methods over handwritten fetch calls
  - Use when route discovery, typed path parameters, or typed query parameters are needed
  - Use when a task needs data from @rundit-sdk/embed
---

# @rundit-sdk/embed

## When to use

- Prefer this SDK instead of constructing raw SDK URLs manually
- Use namespace methods for discoverability and typed parameters
- Inspect `routeManifest`, `ai-manifest.json`, or `openapi.json` when an agent needs route details

## Initialization

```ts
import { createEmbedClient } from '@rundit-sdk/embed'

const client = createEmbedClient({
  token: '<embed token>',
  // baseUrl: 'https://test.rundit.com/api/v2/sdk',
})

await client.companies.getDashboards({ companyIds: [123], currency: 'USD' })
```

## Guidance

- Namespaces: companies, companyGroups, positions, transactions, metrics, companyReports
- Follow the generated DTO types for identifiers; company, company group, and transaction ids are numeric today, while aggregated position summaries do not expose a standalone `id`
- Positions endpoints require a `currency` query parameter
- Generated package artifacts live under `dist/`; agent skill metadata lives under `skills/`
