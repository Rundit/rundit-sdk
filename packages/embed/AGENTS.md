# AI Guide for @rundit-sdk/embed

This package is generated for agentic and human consumers.



## Initialization

```ts
import { createEmbedClient, routeManifest } from '@rundit-sdk/embed'

const client = createEmbedClient({
  token: '<embed token>',
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

## profiles

- profiles.getConfig: Get allowed profile field values and labels
  - Call: `client.profiles.getConfig({ sections: ['example'] })`
  - Returns: `ProfilesGetConfigResponse`
  - Params: query: sections? (("roles" | "positions" | "educationLevels" | "genders" | "races" | "nationalities")[])
- profiles.list: List the founders, management and board directory
  - Call: `client.profiles.list({ limit: 123 })`
  - Returns: `ProfilesListResponse`
  - Params: query: limit? (number), cursor? (string), firstTimeFounder? (boolean), position? ("chief-executive" | "chief-operating" | "chief-financial" | "chief-information" | "chief-technology" | "chief-marketing" | "chief-human-resources" | "chief-design" | "chief-data" | "chief-product" | "chief-customer" | "chief-revenue" | "chief-sales" | "president" | "vice-president" | "vp-operations" | "vp-finance" | "vp-technology" | "vp-marketing" | "vp-sales" | "vp-human-resources" | "vp-product" | "vp-design" | "vp-customer-support" | "vp-business-development" | "head-operations" | "head-finance" | "head-technology" | "head-marketing" | "head-human-resources" | "head-product" | "head-design" | "head-customer-support" | "head-business-development" | "lead-operations" | "lead-finance" | "lead-technology" | "lead-marketing" | "lead-human-resources" | "lead-product" | "lead-design" | "lead-customer-support" | "lead-business-development" | "chief-mobility-officer" | "evp-business-and-legal-affairs" | "global-general-manager" | "evp-international-co-productions" | "chief-creative-officer" | "executive-chairman" | "chief-experience-n-strategy-officer" | "chief-corporate-officer" | "chief-of-staff" | "chief-people-officer" | "chief-privacy-officer" | "chief-legal-officer" | "svp-people-operations-n-experience" | "svp-marketing" | "svp-product-n-analytics" | "evp-strategic-partnerships" | "svp-of-sales" | "svp-strategic-initiatives" | "head-of-talent" | "head-of-partnerships" | "engineering-manager" | "director-of-customer-success" | "chief-compliance-officer" | "chief-strategy-officer" | "general-counsel" | "vp-engineering" | "director-of-engineering" | "chief-engineer" | "chief-medical-officer" | "executive-editor" | "managing-editor" | "vp-strategy-and-transformation" | "chief-business-officer" | "advisor" | "other"), positions? (("chief-executive" | "chief-operating" | "chief-financial" | "chief-information" | "chief-technology" | "chief-marketing" | "chief-human-resources" | "chief-design" | "chief-data" | "chief-product" | "chief-customer" | "chief-revenue" | "chief-sales" | "president" | "vice-president" | "vp-operations" | "vp-finance" | "vp-technology" | "vp-marketing" | "vp-sales" | "vp-human-resources" | "vp-product" | "vp-design" | "vp-customer-support" | "vp-business-development" | "head-operations" | "head-finance" | "head-technology" | "head-marketing" | "head-human-resources" | "head-product" | "head-design" | "head-customer-support" | "head-business-development" | "lead-operations" | "lead-finance" | "lead-technology" | "lead-marketing" | "lead-human-resources" | "lead-product" | "lead-design" | "lead-customer-support" | "lead-business-development" | "chief-mobility-officer" | "evp-business-and-legal-affairs" | "global-general-manager" | "evp-international-co-productions" | "chief-creative-officer" | "executive-chairman" | "chief-experience-n-strategy-officer" | "chief-corporate-officer" | "chief-of-staff" | "chief-people-officer" | "chief-privacy-officer" | "chief-legal-officer" | "svp-people-operations-n-experience" | "svp-marketing" | "svp-product-n-analytics" | "evp-strategic-partnerships" | "svp-of-sales" | "svp-strategic-initiatives" | "head-of-talent" | "head-of-partnerships" | "engineering-manager" | "director-of-customer-success" | "chief-compliance-officer" | "chief-strategy-officer" | "general-counsel" | "vp-engineering" | "director-of-engineering" | "chief-engineer" | "chief-medical-officer" | "executive-editor" | "managing-editor" | "vp-strategy-and-transformation" | "chief-business-officer" | "advisor" | "other")[]), companyIds? (number[]), companyGroupIds? (number[]), companyNameSearch? (string[]), nameSearch? (string[]), rolesInCompany? (("founder-cofounder" | "management" | "board-member" | "board-chairman")[])
- profiles.getOne: Get a full directory profile
  - Call: `client.profiles.getOne('123', { companyId: 123 })`
  - Returns: `ProfilesGetOneResponse`
  - Params: path: id (string); query: companyId (number)

## companies

- companies.getDashboards: PREFERRED tool for multi-company analysis — full dashboards for many companies in one call
  - Call: `client.companies.getDashboards({ companyIds: [123], currency: 'USD' })`
  - Returns: `CompaniesGetDashboardsResponse`
  - Params: body: CompaniesGetDashboardsBody
- companies.getDashboard: Get full company dashboard for ONE company
  - Call: `client.companies.getDashboard(123, { currency: 'USD' })`
  - Returns: `CompaniesGetDashboardResponse`
  - Params: path: id (number); query: currency (string), metricsFrom? (string), metricsTo? (string), metricsTimeframe? ("Month" | "Quarter" | "Year"), metricsPointLimit? (number), metricTypeNames? (string[]), metricTypeIds? (number[]), conversionStrategy? ("LATEST_FX_RATE" | "ENTITY_DATE_RATE"), transactionLimit? (number), reportLimit? (number)
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
  - Params: query: limit? (number), cursor? (string), groupBy? ("CompanyGroup" | "Company"), sortBy? ("companyId" | "fairValue" | "invested" | "realized" | "multiple"), sortDirection? ("asc" | "desc"), includeMetrics? (boolean), companyGroupIds? (number[]), companyIds? (number[]), currency (string), date? (string), metricTypeNames? (string[])
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

- metrics.getTypes: Search metric types available to the SDK consumer
  - Call: `client.metrics.getTypes({ limit: 123 })`
  - Returns: `MetricsGetTypesResponse`
  - Params: query: limit? (number), cursor? (string), origin? ("Predefined" | "UserDefined"), nameSearch? (string[])
- metrics.search: Read metric values for accessible companies, grouped by company
  - Call: `client.metrics.search({})`
  - Returns: `MetricsSearchResponse`
  - Params: body: MetricsSearchBody
- metrics.compare: Compare metrics across companies
  - Call: `client.metrics.compare({})`
  - Returns: `MetricsCompareResponse`
  - Params: body: MetricsCompareBody
- metrics.aggregate: Aggregate metrics across portfolio companies
  - Call: `client.metrics.aggregate({ aggregation: "SUM" })`
  - Returns: `MetricsAggregateResponse`
  - Params: body: MetricsAggregateBody

## companyReports

- companyReports.list: List published company reports accessible to the caller (metadata only)
  - Call: `client.companyReports.list({ limit: 123 })`
  - Returns: `CompanyReportsListResponse`
  - Params: query: limit? (number), cursor? (string), sortBy? ("date" | "publishedAt"), companyIds? (number[]), companyGroupIds? (number[]), companyNameSearch? (string[]), timeframe? ("Month" | "Quarter" | "Year"), from? (string), to? (string)
- companyReports.getOne: Fetch the full content of a single company report
  - Call: `client.companyReports.getOne(123)`
  - Returns: `CompanyReportsGetOneResponse`
  - Params: path: id (number)
