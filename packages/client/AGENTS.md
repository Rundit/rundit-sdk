# AI Guide for @rundit-sdk/client

This package is generated for agentic and human consumers.



## Initialization

```ts
import { createClient, routeManifest } from '@rundit-sdk/client'

const client = createClient({
  apiKey: '<API key>',
  // baseUrl: 'https://test.rundit.com/api/v2/sdk',
})

console.log(routeManifest)
```

## Guidance

- Prefer namespace methods on the client instead of constructing URLs manually
- Use `routeManifest` or `ai-manifest.json` to discover available calls programmatically
- Pass required path ids using the generated method signatures; current company and company-group path ids are numeric
- Positions endpoints require a `currency` query value
- Follow the generated DTO types for identifiers; current company, company group, and transaction ids are numeric, while aggregated position summaries do not expose a standalone `id`

## companies

- companies.getDashboards: PREFERRED tool for multi-company analysis — full dashboards for many companies in one call
  - Call: `client.companies.getDashboards({ companyIds: [123], currency: 'USD' })`
  - Returns: `CompaniesGetDashboardsResponse`
  - Params: body: CompaniesGetDashboardsBody
- companies.getDashboard: Get full company dashboard for ONE company
  - Call: `client.companies.getDashboard(123, { currency: 'USD' })`
  - Returns: `CompaniesGetDashboardResponse`
  - Params: path: id (number); query: currency (string), metricsFrom? (string), transactionLimit? (number), reportLimit? (number)
- companies.getOne: Get one company available to the SDK consumer
  - Call: `client.companies.getOne(123)`
  - Returns: `CompaniesGetOneResponse`
  - Params: path: id (number)
- companies.getAll: List companies available to the SDK consumer
  - Call: `client.companies.getAll({ limit: 123 })`
  - Returns: `CompaniesGetAllResponse`
  - Params: query: limit? (number), cursor? (string), companyIds? (number[]), companyGroupIds? (number[]), nameSearch? (string[])

## companyGroups

- companyGroups.getAll: List funds available to the SDK consumer
  - Call: `client.companyGroups.getAll({ limit: 123 })`
  - Returns: `CompanyGroupsGetAllResponse`
  - Params: query: limit? (number), cursor? (string), companyGroupIds? (number[]), nameSearch? (string[])
- companyGroups.getOne: Get one fund available to the SDK consumer
  - Call: `client.companyGroups.getOne(123)`
  - Returns: `CompanyGroupsGetOneResponse`
  - Params: path: id (number)

## positions

- positions.getPortfolioSummary: Get portfolio summary with positions and key metrics per company
  - Call: `client.positions.getPortfolioSummary({ currency: 'USD' })`
  - Returns: `PositionsGetPortfolioSummaryResponse`
  - Params: query: limit? (number), cursor? (string), companyGroupIds? (number[]), companyIds? (number[]), currency (string), date? (string), metricTypeNames? (string[])
- positions.getCompanyPositions: Get positions for one company
  - Call: `client.positions.getCompanyPositions(123, { currency: 'USD' })`
  - Returns: `PositionsGetCompanyPositionsResponse`
  - Params: path: id (number); query: limit? (number), cursor? (string), companyGroupIds? (number[]), currency (string), date? (string)
- positions.getPortfolioPositions: Get aggregated portfolio position totals
  - Call: `client.positions.getPortfolioPositions({ currency: 'USD' })`
  - Returns: `PositionsGetPortfolioPositionsResponse`
  - Params: query: companyGroupIds? (number[]), companyIds? (number[]), currency (string), date? (string)

## transactions

- transactions.getSummary: Get transaction activity summary
  - Call: `client.transactions.getSummary({ currency: 'USD' })`
  - Returns: `TransactionsGetSummaryResponse`
  - Params: query: limit? (number), cursor? (string), companyGroupIds? (number[]), companyIds? (number[]), currency (string), groupBy? ("Month" | "Quarter" | "Year"), from? (string), to? (string)
- transactions.getCompanyTransactions: Get transactions for one company
  - Call: `client.transactions.getCompanyTransactions(123, { limit: 123 })`
  - Returns: `TransactionsGetCompanyTransactionsResponse`
  - Params: path: id (number); query: limit? (number), cursor? (string), companyGroupIds? (number[]), types? (("Auction" | "ConvertibleNote" | "ConvertToEquity" | "Dividend" | "EquityInvestment" | "EquityReceived" | "Extend" | "FutureEquityAgreement" | "Insolvency" | "IPO" | "LimitedAuction" | "OptionsReceived" | "OtherExit" | "OtherInvestment" | "OtherRealization" | "Payback" | "Proprietary" | "TradeSale" | "ValuationChange" | "WriteOff")[]), priorTo? (string)
- transactions.getTransactions: Get transactions for multiple companies
  - Call: `client.transactions.getTransactions({ limit: 123 })`
  - Returns: `TransactionsGetTransactionsResponse`
  - Params: query: limit? (number), cursor? (string), companyGroupIds? (number[]), types? (("Auction" | "ConvertibleNote" | "ConvertToEquity" | "Dividend" | "EquityInvestment" | "EquityReceived" | "Extend" | "FutureEquityAgreement" | "Insolvency" | "IPO" | "LimitedAuction" | "OptionsReceived" | "OtherExit" | "OtherInvestment" | "OtherRealization" | "Payback" | "Proprietary" | "TradeSale" | "ValuationChange" | "WriteOff")[]), priorTo? (string), companyIds? (number[])

## metrics

- metrics.getTypes: List metric types available to the SDK consumer
  - Call: `client.metrics.getTypes()`
  - Returns: `MetricsGetTypesResponse`
- metrics.search: Read metric values for accessible companies, grouped by company
  - Call: `client.metrics.search({})`
  - Returns: `MetricsSearchResponse`
  - Params: body: MetricsSearchBody
- metrics.compare: Compare metrics across companies
  - Call: `client.metrics.compare({ metricTypeIds: [1,7] })`
  - Returns: `MetricsCompareResponse`
  - Params: body: MetricsCompareBody
- metrics.aggregate: Aggregate metrics across portfolio companies
  - Call: `client.metrics.aggregate({ metricTypeIds: [1,7], aggregation: "SUM" })`
  - Returns: `MetricsAggregateResponse`
  - Params: body: MetricsAggregateBody

## companyReports

- companyReports.list: List published company reports accessible to the caller (metadata only)
  - Call: `client.companyReports.list({ limit: 123 })`
  - Returns: `CompanyReportsListResponse`
  - Params: query: limit? (number), cursor? (string), companyIds? (number[]), companyGroupIds? (number[]), companyNameSearch? (string[]), timeframe? ("Month" | "Quarter" | "Year"), from? (string), to? (string)
- companyReports.getOne: Fetch the full content of a single company report
  - Call: `client.companyReports.getOne(123)`
  - Returns: `CompanyReportsGetOneResponse`
  - Params: path: id (number)
