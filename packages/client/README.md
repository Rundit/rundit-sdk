# @rundit-sdk/client

Rundit client SDK for third-party integrations authenticated with a Rundit API key.



## Install

```bash
npm install @rundit-sdk/client
```

## Usage

```ts
import { createClient } from '@rundit-sdk/client'

const client = createClient({
  apiKey: '<API key>',
  // baseUrl: 'https://test.rundit.com/api/v2/sdk',
})

await client.companies.getDashboards({ companyIds: [123], currency: 'USD' })
```

## Authentication

- Authenticated with a tenant-scoped Rundit API key sent via the `X-API-Key` header
- API keys are user-scoped: every request resolves to the owning user's roles and company access; the SDK cannot escape those bounds
- Obtain an API key from your Rundit account settings (personal API keys); rotate or revoke from the same screen
- Treat keys as secrets: never commit them, prefer environment variables, and use separate keys per integration


## AI Quickstart

- Designed for third-party server-side or workflow integrations using a Rundit API key
- Use namespace methods such as `client.companies.getAll()` or `client.positions.getPortfolioPositions({ currency: 'USD' })`
- Inspect `routeManifest` at runtime for a machine-readable map of method paths, parameters, and response types
- Read `AGENTS.md` or `ai-manifest.json` in this package for AI-focused usage guidance
- Agent skill metadata is published under `skills/rundit-sdk-client/SKILL.md`
- Follow the generated DTO types for identifiers; current company, company group, and transaction ids are numeric, while aggregated position summaries do not expose a standalone `id`


## Methods

## companies

### `companies.getDashboards`

PREFERRED tool for multi-company analysis — full dashboards for many companies in one call

- Call: `client.companies.getDashboards({ companyIds: [123], currency: 'USD' })`
- HTTP: `POST /companies/dashboards`
- Returns: `CompaniesGetDashboardsResponse`
- Params: body: CompaniesGetDashboardsBody

### `companies.getDashboard`

Get full company dashboard for ONE company

- Call: `client.companies.getDashboard(123, { currency: 'USD' })`
- HTTP: `GET /companies/:id/dashboard`
- Returns: `CompaniesGetDashboardResponse`
- Params: path: id (number); query: currency (string), metricsFrom? (string), metricsTo? (string), metricsTimeframe? ("Month" | "Quarter" | "Year"), metricsPointLimit? (number), metricTypeNames? (string[]), metricTypeIds? (number[]), conversionStrategy? ("LATEST_FX_RATE" | "ENTITY_DATE_RATE"), transactionLimit? (number), reportLimit? (number)

### `companies.getOne`

Get one company available to the SDK consumer

- Call: `client.companies.getOne(123)`
- HTTP: `GET /companies/:id`
- Returns: `CompaniesGetOneResponse`
- Params: path: id (number)

### `companies.getAll`

List companies available to the SDK consumer

- Call: `client.companies.getAll({ limit: 123 })`
- HTTP: `GET /companies`
- Returns: `CompaniesGetAllResponse`
- Params: query: limit? (number), cursor? (string), companyIds? (number[]), companyGroupIds? (number[]), nameSearch? (string[])

## companyGroups

### `companyGroups.getAll`

List funds available to the SDK consumer

- Call: `client.companyGroups.getAll({ limit: 123 })`
- HTTP: `GET /company-groups`
- Returns: `CompanyGroupsGetAllResponse`
- Params: query: limit? (number), cursor? (string), companyGroupIds? (number[]), nameSearch? (string[])

### `companyGroups.getOne`

Get one fund available to the SDK consumer

- Call: `client.companyGroups.getOne(123)`
- HTTP: `GET /company-groups/:id`
- Returns: `CompanyGroupsGetOneResponse`
- Params: path: id (number)

## positions

### `positions.getPortfolioSummary`

Get portfolio summary with positions and key metrics per company

- Call: `client.positions.getPortfolioSummary({ currency: 'USD' })`
- HTTP: `GET /positions/portfolio/summary`
- Returns: `PositionsGetPortfolioSummaryResponse`
- Params: query: limit? (number), cursor? (string), groupBy? ("CompanyGroup" | "Company"), sortBy? ("companyId" | "fairValue" | "invested" | "realized" | "multiple"), sortDirection? ("asc" | "desc"), includeMetrics? (boolean), companyGroupIds? (number[]), companyIds? (number[]), currency (string), date? (string), metricTypeNames? (string[])

### `positions.getCompanyPositions`

Get positions for one company

- Call: `client.positions.getCompanyPositions(123, { currency: 'USD' })`
- HTTP: `GET /positions/companies/:id`
- Returns: `PositionsGetCompanyPositionsResponse`
- Params: path: id (number); query: limit? (number), cursor? (string), companyGroupIds? (number[]), currency (string), date? (string)

### `positions.getPortfolioPositions`

Get aggregated portfolio position totals

- Call: `client.positions.getPortfolioPositions({ currency: 'USD' })`
- HTTP: `GET /positions/portfolio`
- Returns: `PositionsGetPortfolioPositionsResponse`
- Params: query: companyGroupIds? (number[]), companyIds? (number[]), currency (string), date? (string)

## transactions

### `transactions.getSummary`

Get transaction activity summary

- Call: `client.transactions.getSummary({ currency: 'USD' })`
- HTTP: `GET /transactions/summary`
- Returns: `TransactionsGetSummaryResponse`
- Params: query: limit? (number), cursor? (string), companyGroupIds? (number[]), companyIds? (number[]), currency (string), groupBy? ("Month" | "Quarter" | "Year"), from? (string), to? (string)

### `transactions.getCompanyTransactions`

Get transactions for one company

- Call: `client.transactions.getCompanyTransactions(123, { limit: 123 })`
- HTTP: `GET /transactions/companies/:id`
- Returns: `TransactionsGetCompanyTransactionsResponse`
- Params: path: id (number); query: limit? (number), cursor? (string), companyGroupIds? (number[]), types? (("Auction" | "ConvertibleNote" | "ConvertToEquity" | "Dividend" | "EquityInvestment" | "EquityReceived" | "Extend" | "FutureEquityAgreement" | "Insolvency" | "IPO" | "LimitedAuction" | "OptionsReceived" | "OtherExit" | "OtherInvestment" | "OtherRealization" | "Payback" | "Proprietary" | "TradeSale" | "ValuationChange" | "WriteOff")[]), priorTo? (string)

### `transactions.getTransactions`

Get transactions for multiple companies

- Call: `client.transactions.getTransactions({ limit: 123 })`
- HTTP: `GET /transactions`
- Returns: `TransactionsGetTransactionsResponse`
- Params: query: limit? (number), cursor? (string), companyGroupIds? (number[]), types? (("Auction" | "ConvertibleNote" | "ConvertToEquity" | "Dividend" | "EquityInvestment" | "EquityReceived" | "Extend" | "FutureEquityAgreement" | "Insolvency" | "IPO" | "LimitedAuction" | "OptionsReceived" | "OtherExit" | "OtherInvestment" | "OtherRealization" | "Payback" | "Proprietary" | "TradeSale" | "ValuationChange" | "WriteOff")[]), priorTo? (string), companyIds? (number[])

## metrics

### `metrics.getTypes`

Search metric types available to the SDK consumer

- Call: `client.metrics.getTypes({ limit: 123 })`
- HTTP: `GET /metrics/types`
- Returns: `MetricsGetTypesResponse`
- Params: query: limit? (number), cursor? (string), origin? ("Predefined" | "UserDefined"), nameSearch? (string[])

### `metrics.createType`

Create a VC-owned custom metric type

- Call: `client.metrics.createType({ name: 'example', valueType: "numeric", aggMethod: "SUM", summaryAggregationMethods: ["SUM"] })`
- HTTP: `POST /metrics/types`
- Returns: `MetricsCreateTypeResponse`
- Params: body: MetricsCreateTypeBody

### `metrics.writePointsBatch`

Deprecated: upsert points for existing metrics across multiple companies

- Call: `client.metrics.writePointsBatch({ companies: [{ companyId: 123, currency: 'USD', items: [{ points: [{ date: '2024-12-31', value: 123, optionValue: null, timeframe: "Month" }] }] }] })`
- HTTP: `PUT /metrics/points`
- Returns: `MetricsWritePointsBatchResponse`
- Params: body: MetricsWritePointsBatchBody

### `metrics.writePoints`

Upsert metric points

- Call: `client.metrics.writePoints(123, { points: [{ date: '2024-12-31', value: 123, optionValue: null, timeframe: "Month" }] })`
- HTTP: `PUT /metrics/:metricId/points`
- Returns: `MetricsWritePointsResponse`
- Params: path: metricId (number); body: MetricsWritePointsBody

### `metrics.deletePoints`

Delete selected metric points

- Call: `client.metrics.deletePoints(123, { points: [{ date: '2024-12-31', timeframe: "Month" }] })`
- HTTP: `DELETE /metrics/:metricId/points`
- Returns: `MetricsDeletePointsResponse`
- Params: path: metricId (number); body: MetricsDeletePointsBody

### `metrics.search`

Read metric values for accessible companies, grouped by company

- Call: `client.metrics.search({})`
- HTTP: `POST /metrics`
- Returns: `MetricsSearchResponse`
- Params: body: MetricsSearchBody

### `metrics.compare`

Compare metrics across companies

- Call: `client.metrics.compare({})`
- HTTP: `POST /metrics/compare`
- Returns: `MetricsCompareResponse`
- Params: body: MetricsCompareBody

### `metrics.aggregate`

Aggregate metrics across portfolio companies

- Call: `client.metrics.aggregate({ aggregation: "SUM" })`
- HTTP: `POST /metrics/aggregate`
- Returns: `MetricsAggregateResponse`
- Params: body: MetricsAggregateBody

### `metrics.import`

Import metrics across many companies in one call

- Call: `client.metrics.import({ companies: [{ companyId: 123, currency: 'USD', items: [{ points: [{ date: '2024-12-31', value: 123, optionValue: null, timeframe: "Month" }] }] }] })`
- HTTP: `POST /metrics/import`
- Returns: `MetricsImportResponse`
- Params: body: MetricsImportBody

### `metrics.getTypeUsage`

Get custom metric type usage

- Call: `client.metrics.getTypeUsage(123)`
- HTTP: `GET /metrics/types/:metricTypeId/usage`
- Returns: `MetricsGetTypeUsageResponse`
- Params: path: metricTypeId (number)

### `metrics.deleteType`

Delete an unused custom metric type

- Call: `client.metrics.deleteType(123)`
- HTTP: `DELETE /metrics/types/:metricTypeId`
- Returns: `MetricsDeleteTypeResponse`
- Params: path: metricTypeId (number)

### `metrics.delete`

Delete a company metric row and its data

- Call: `client.metrics.delete(123)`
- HTTP: `DELETE /metrics/:metricId`
- Returns: `MetricsDeleteResponse`
- Params: path: metricId (number)

## metricTemplates

### `metricTemplates.get`

Get the VC metric template

- Call: `client.metricTemplates.get()`
- HTTP: `GET /metrics/templates`
- Returns: `MetricTemplatesGetResponse`

### `metricTemplates.createEntry`

Request a metric through the VC template

- Call: `client.metricTemplates.createEntry('123', { metricTypeId: 123, hasForecast: true, hasBudget: true, companyFilter: [{ type: "all" }] })`
- HTTP: `POST /metrics/templates/:templateId/entries`
- Returns: `MetricTemplatesCreateEntryResponse`
- Params: path: templateId (string); body: MetricTemplatesCreateEntryBody

### `metricTemplates.updateEntry`

Update a metric template entry

- Call: `client.metricTemplates.updateEntry('123', '123', { metricTypeId: 123, hasForecast: true, hasBudget: true, companyFilter: [{ type: "all" }] })`
- HTTP: `PUT /metrics/templates/:templateId/entries/:entryId`
- Returns: `MetricTemplatesUpdateEntryResponse`
- Params: path: templateId (string), entryId (string); body: MetricTemplatesUpdateEntryBody

### `metricTemplates.deleteEntry`

Stop requesting a metric through the template

- Call: `client.metricTemplates.deleteEntry('123', '123')`
- HTTP: `DELETE /metrics/templates/:templateId/entries/:entryId`
- Returns: `MetricTemplatesDeleteEntryResponse`
- Params: path: templateId (string), entryId (string)

## companyReports

### `companyReports.list`

List published company reports accessible to the caller (metadata only)

- Call: `client.companyReports.list({ limit: 123 })`
- HTTP: `GET /company-reports`
- Returns: `CompanyReportsListResponse`
- Params: query: limit? (number), cursor? (string), sortBy? ("date" | "publishedAt"), companyIds? (number[]), companyGroupIds? (number[]), companyNameSearch? (string[]), timeframe? ("Month" | "Quarter" | "Year"), from? (string), to? (string)

### `companyReports.getOne`

Fetch the full content of a single company report

- Call: `client.companyReports.getOne(123)`
- HTTP: `GET /company-reports/:id`
- Returns: `CompanyReportsGetOneResponse`
- Params: path: id (number)

## TypeScript

- This package ships generated `.d.ts` files
- Public DTOs, response aliases, and query parameter types are generated from `spec/sdk.openapi.json`
- Generated methods and query types include JSDoc summaries for editor and agent consumption
- Agent skill metadata is published under `skills/rundit-sdk-client/SKILL.md`

## Notes

- This package is generated from `spec/sdk.openapi.json`
- Defaults to `https://api.rundit.com/api/v2/sdk`; pass `baseUrl` to target a different environment such as test
- Do not edit files under `dist/` manually
