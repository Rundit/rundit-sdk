# @rundit-sdk/embed

Public Rundit embed SDK for iframe and embedded module consumers.



## Install

```bash
npm install @rundit-sdk/embed
```

## Usage

```ts
import { createEmbedClient } from '@rundit-sdk/embed'

const client = createEmbedClient({
  token: '<embed token>',
  // baseUrl: 'https://test.rundit.com/api/v2/sdk',
})

await client.companies.getDashboards({ companyIds: [123], currency: 'USD' })
```

## Authentication

- Authenticated with an embed session token sent as a `Bearer` token in the `Authorization` header
- Embed tokens are short-lived and minted by the host application for a specific user
- Tokens carry the issuing user's security context; the SDK cannot escape those bounds


## AI Quickstart

- Designed for embedded Lovable modules and iframe integrations
- Use namespace methods such as `client.companies.getAll()` or `client.positions.getPortfolioPositions({ currency: 'USD' })`
- Inspect `routeManifest` at runtime for a machine-readable map of method paths, parameters, and response types
- Read `AGENTS.md` or `ai-manifest.json` in this package for AI-focused usage guidance
- Agent skill metadata is published under `skills/rundit-sdk-embed/SKILL.md`
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
- Params: path: id (number); query: currency (string), metricsFrom? (string), transactionLimit? (number), reportLimit? (number)

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
- Params: query: limit? (number), cursor? (string), companyGroupIds? (number[]), companyIds? (number[]), currency (string), date? (string), metricTypeNames? (string[])

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

List metric types available to the SDK consumer

- Call: `client.metrics.getTypes({ limit: 123 })`
- HTTP: `GET /metrics/types`
- Returns: `MetricsGetTypesResponse`
- Params: query: limit? (number), cursor? (string)

### `metrics.search`

Read metric values for accessible companies, grouped by company

- Call: `client.metrics.search({})`
- HTTP: `POST /metrics`
- Returns: `MetricsSearchResponse`
- Params: body: MetricsSearchBody

### `metrics.compare`

Compare metrics across companies

- Call: `client.metrics.compare({ metricTypeIds: [1,7] })`
- HTTP: `POST /metrics/compare`
- Returns: `MetricsCompareResponse`
- Params: body: MetricsCompareBody

### `metrics.aggregate`

Aggregate metrics across portfolio companies

- Call: `client.metrics.aggregate({ metricTypeIds: [1,7], aggregation: "SUM" })`
- HTTP: `POST /metrics/aggregate`
- Returns: `MetricsAggregateResponse`
- Params: body: MetricsAggregateBody

## companyReports

### `companyReports.list`

List published company reports accessible to the caller (metadata only)

- Call: `client.companyReports.list({ limit: 123 })`
- HTTP: `GET /company-reports`
- Returns: `CompanyReportsListResponse`
- Params: query: limit? (number), cursor? (string), companyIds? (number[]), companyGroupIds? (number[]), companyNameSearch? (string[]), timeframe? ("Month" | "Quarter" | "Year"), from? (string), to? (string)

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
- Agent skill metadata is published under `skills/rundit-sdk-embed/SKILL.md`

## Notes

- This package is generated from `spec/sdk.openapi.json`
- Defaults to `https://api.rundit.com/api/v2/sdk`; pass `baseUrl` to target a different environment such as test
- Do not edit files under `dist/` manually
