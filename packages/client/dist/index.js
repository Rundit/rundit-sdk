const routeManifest = {
  "companies": {
    "getDashboards": {
      "method": "POST",
      "path": "/companies/dashboards",
      "summary": "PREFERRED tool for multi-company analysis — full dashboards for many companies in one call",
      "description": "PREFERRED tool for multi-company analysis. Returns full dashboards (company metadata, positions, metrics with data points, recent transactions, report summaries) for many companies in a single request, grouped per company. Use this instead of looping `GET /companies/:id/dashboard` (the N+1 pattern) whenever the agent needs to look at more than one company — it returns the same shape per company but in one round trip. Typical workflow: resolve company ids (e.g. `GET /companies?nameSearch=[\"acme\",\"beta\"]`), then call this with their `companyIds`. Use `metricTypeIds` or `metricTypeNames` to scope the returned metrics. `metricsFrom` (ISO 8601) sets a lower-bound date for metric data points; omit to include all history. `metricsTimeframe` restricts data point granularity to Month, Quarter, or Year. `currency` (ISO 4217, required) FX-converts all monetary metrics across the batch. `conversionStrategy` controls which rate is applied: `LATEST_FX_RATE` (default) or `ENTITY_DATE_RATE` (the rate on each point's own date). `transactionLimit` / `reportLimit` cap list sizes per company (defaults: 10 and 5 respectively). Dashboards come back in the order the `companyIds` were requested, so `limit`/`cursor` paging is stable.",
      "exampleCall": "client.companies.getDashboards({ companyIds: [123], currency: 'USD' })",
      "responseType": "CompaniesGetDashboardsResponse",
      "pathParams": [],
      "queryParams": []
    },
    "getDashboard": {
      "method": "GET",
      "path": "/companies/:id/dashboard",
      "summary": "Get full company dashboard for ONE company",
      "description": "Returns company metadata, positions per fund, all metrics with data points, recent transactions, and report summaries for a single company. For more than one company, prefer POST /companies/dashboards (`companies.getDashboards`) instead — it returns the same payload per company in one call and avoids the N+1 pattern. Use `metricsFrom` to limit metric history, `transactionLimit` and `reportLimit` to cap list sizes.",
      "exampleCall": "client.companies.getDashboard(123, { currency: 'USD' })",
      "responseType": "CompaniesGetDashboardResponse",
      "pathParams": [
        {
          "name": "id",
          "type": "number",
          "description": "Company identifier"
        }
      ],
      "queryParams": [
        {
          "name": "currency",
          "required": true,
          "type": "string",
          "description": "Reporting currency code (ISO 4217)."
        },
        {
          "name": "metricsFrom",
          "required": false,
          "type": "string",
          "description": "Lower bound for metric data points (ISO 8601). Omit to include all available history."
        },
        {
          "name": "transactionLimit",
          "required": false,
          "type": "number",
          "description": "Maximum number of transactions to include (most recent first). Defaults to 10."
        },
        {
          "name": "reportLimit",
          "required": false,
          "type": "number",
          "description": "Maximum number of reports to include (most recent first). Defaults to 5."
        }
      ]
    },
    "getOne": {
      "method": "GET",
      "path": "/companies/:id",
      "summary": "Get one company available to the SDK consumer",
      "description": "Returns the full company object for a single company. Includes all compact-list fields (id, name, type, currency, website, logo) plus extended metadata: legal name, status, description, vision, address, city, state, country, operating countries, VAT number, founding year, established date, total funding, and accessible fund ids (as `companyGroupIds`). Returns 404 if the company does not exist or is inaccessible to the caller.",
      "exampleCall": "client.companies.getOne(123)",
      "responseType": "CompaniesGetOneResponse",
      "pathParams": [
        {
          "name": "id",
          "type": "number",
          "description": "Company identifier"
        }
      ],
      "queryParams": []
    },
    "getAll": {
      "method": "GET",
      "path": "/companies",
      "summary": "List companies available to the SDK consumer",
      "description": "Returns the compact form (id, name, currency, type, website, logo) for every company the caller can read. Filter by `companyIds`, `companyGroupIds`, and/or `nameSearch` (case-insensitive substring on display name; accepts an array to resolve multiple companies at once with OR semantics — e.g. `nameSearch=[\"acme\",\"beta\",\"gamma\"]` returns any company whose name contains any of the three substrings). Avoids listing the full portfolio when the agent only knows companies by name. Ordered by company id ascending.",
      "exampleCall": "client.companies.getAll({ limit: 123 })",
      "responseType": "CompaniesGetAllResponse",
      "pathParams": [],
      "queryParams": [
        {
          "name": "limit",
          "required": false,
          "type": "number",
          "description": "Maximum items per page (1-500). Omit to receive the full result set in one response. Values outside that range are rejected with 422 rather than clamped, so a page is never quietly smaller than requested."
        },
        {
          "name": "cursor",
          "required": false,
          "type": "string",
          "description": "Opaque cursor from a previous response's `meta.nextCursor`. Carries the page size it was issued with, so a follow-up call needs only the cursor. Valid solely for the endpoint, filters, and caller that produced it — change any of them and you get 422; start again without a cursor. Paging reflects the data as of each request, so rows added or removed mid-walk can shift positions."
        },
        {
          "name": "companyIds",
          "required": false,
          "type": "number[]",
          "description": "Restrict results to these company identifiers"
        },
        {
          "name": "companyGroupIds",
          "required": false,
          "type": "number[]",
          "description": "Restrict results to companies that belong to any of these company groups"
        },
        {
          "name": "nameSearch",
          "required": false,
          "type": "string[]",
          "description": "Case-insensitive substring match on company display name. Pass an array to resolve multiple companies in one call — a company matches if its name contains ANY of the listed substrings (OR semantics). Combine with companyIds/companyGroupIds to find specific companies without first listing the entire portfolio."
        }
      ]
    }
  },
  "companyGroups": {
    "getAll": {
      "method": "GET",
      "path": "/company-groups",
      "summary": "List funds available to the SDK consumer",
      "description": "Returns compact fund metadata (id, name, demo flag, color, member company ids). Filter by `companyGroupIds` and/or `nameSearch` (case-insensitive substring on name; accepts an array to resolve multiple groups in one call with OR semantics — e.g. `nameSearch=[\"fund i\",\"fund ii\"]`). Ordered by fund id ascending.",
      "exampleCall": "client.companyGroups.getAll({ limit: 123 })",
      "responseType": "CompanyGroupsGetAllResponse",
      "pathParams": [],
      "queryParams": [
        {
          "name": "limit",
          "required": false,
          "type": "number",
          "description": "Maximum items per page (1-500). Omit to receive the full result set in one response. Values outside that range are rejected with 422 rather than clamped, so a page is never quietly smaller than requested."
        },
        {
          "name": "cursor",
          "required": false,
          "type": "string",
          "description": "Opaque cursor from a previous response's `meta.nextCursor`. Carries the page size it was issued with, so a follow-up call needs only the cursor. Valid solely for the endpoint, filters, and caller that produced it — change any of them and you get 422; start again without a cursor. Paging reflects the data as of each request, so rows added or removed mid-walk can shift positions."
        },
        {
          "name": "companyGroupIds",
          "required": false,
          "type": "number[]",
          "description": "Restrict results to these company group identifiers"
        },
        {
          "name": "nameSearch",
          "required": false,
          "type": "string[]",
          "description": "Case-insensitive substring match on company group display name. Pass an array to resolve multiple groups in one call — a group matches if its name contains ANY of the listed substrings (OR semantics). Useful for finding funds or visibility groups by name without first listing all groups."
        }
      ]
    },
    "getOne": {
      "method": "GET",
      "path": "/company-groups/:id",
      "summary": "Get one fund available to the SDK consumer",
      "description": "Returns full fund details. Includes all compact-list fields (id, name, type, currency, logo) plus extended fund metadata: legal name, domicile, management company, GP, vintage year, fund currency, opening and closing dates, legal form, investment policy, fees, regulatory info, and service providers. Also includes the list of member companies the caller can access. Returns 404 if the fund does not exist or is inaccessible to the caller.",
      "exampleCall": "client.companyGroups.getOne(123)",
      "responseType": "CompanyGroupsGetOneResponse",
      "pathParams": [
        {
          "name": "id",
          "type": "number",
          "description": "Company group identifier"
        }
      ],
      "queryParams": []
    }
  },
  "positions": {
    "getPortfolioSummary": {
      "method": "GET",
      "path": "/positions/portfolio/summary",
      "summary": "Get portfolio summary with positions and key metrics per company",
      "description": "Returns one row per company *per fund* — a company held by two funds appears twice, distinguished by `companyGroupId` — with position data (invested, fair value, multiple, ROI) and latest values for selected metrics. Defaults to MRR, Cash Balance, Headcount, Net Burn Rate, and Runway. Override with `metricTypeNames`. Designed for portfolio overview tables. Ordered by company id, then fund id.",
      "exampleCall": "client.positions.getPortfolioSummary({ currency: 'USD' })",
      "responseType": "PositionsGetPortfolioSummaryResponse",
      "pathParams": [],
      "queryParams": [
        {
          "name": "limit",
          "required": false,
          "type": "number",
          "description": "Maximum items per page (1-500). Omit to receive the full result set in one response. Values outside that range are rejected with 422 rather than clamped, so a page is never quietly smaller than requested."
        },
        {
          "name": "cursor",
          "required": false,
          "type": "string",
          "description": "Opaque cursor from a previous response's `meta.nextCursor`. Carries the page size it was issued with, so a follow-up call needs only the cursor. Valid solely for the endpoint, filters, and caller that produced it — change any of them and you get 422; start again without a cursor. Paging reflects the data as of each request, so rows added or removed mid-walk can shift positions."
        },
        {
          "name": "companyGroupIds",
          "required": false,
          "type": "number[]",
          "description": "Restrict to companies that belong to any of these company groups."
        },
        {
          "name": "companyIds",
          "required": false,
          "type": "number[]",
          "description": "Restrict to these company identifiers."
        },
        {
          "name": "currency",
          "required": true,
          "type": "string",
          "description": "Reporting currency code (ISO 4217)."
        },
        {
          "name": "date",
          "required": false,
          "type": "string",
          "description": "Position summary date (ISO 8601). Defaults to today."
        },
        {
          "name": "metricTypeNames",
          "required": false,
          "type": "string[]",
          "description": "Metric type names to include in the latest metrics snapshot. Defaults to MRR, Cash Balance, Headcount, Net Burn Rate, and Runway."
        }
      ]
    },
    "getCompanyPositions": {
      "method": "GET",
      "path": "/positions/companies/:id",
      "summary": "Get positions for one company",
      "description": "Returns all fund-level positions for a single company — one entry per fund (`companyGroupId`) that holds a position in the company. Each entry carries invested amount, fair market value, ownership percentage, share counts, multiple, and ROI, all FX-converted to `currency` (ISO 4217, required). Filter by `companyGroupIds` to scope to specific funds. Use `date` (ISO 8601) for a historical snapshot; omit to use the latest available data. Ordered by fund id ascending.",
      "exampleCall": "client.positions.getCompanyPositions(123, { currency: 'USD' })",
      "responseType": "PositionsGetCompanyPositionsResponse",
      "pathParams": [
        {
          "name": "id",
          "type": "number",
          "description": "Company identifier"
        }
      ],
      "queryParams": [
        {
          "name": "limit",
          "required": false,
          "type": "number",
          "description": "Maximum items per page (1-500). Omit to receive the full result set in one response. Values outside that range are rejected with 422 rather than clamped, so a page is never quietly smaller than requested."
        },
        {
          "name": "cursor",
          "required": false,
          "type": "string",
          "description": "Opaque cursor from a previous response's `meta.nextCursor`. Carries the page size it was issued with, so a follow-up call needs only the cursor. Valid solely for the endpoint, filters, and caller that produced it — change any of them and you get 422; start again without a cursor. Paging reflects the data as of each request, so rows added or removed mid-walk can shift positions."
        },
        {
          "name": "companyGroupIds",
          "required": false,
          "type": "number[]",
          "description": "Optional list of company group identifiers to filter the position breakdown"
        },
        {
          "name": "currency",
          "required": true,
          "type": "string",
          "description": "Reporting currency code"
        },
        {
          "name": "date",
          "required": false,
          "type": "string",
          "description": "Optional summary date in ISO format"
        }
      ]
    },
    "getPortfolioPositions": {
      "method": "GET",
      "path": "/positions/portfolio",
      "summary": "Get aggregated portfolio position totals",
      "description": "Returns a single aggregated position object that sums invested amount, fair market value, ownership percentage, share counts, multiple, and ROI across all accessible companies (optionally filtered by `companyIds` and/or `companyGroupIds` to scope to specific funds). `currency` (ISO 4217, required) converts all monetary values. Use `date` (ISO 8601) for a historical snapshot; omit for the latest available data. For a per-company breakdown instead of a single aggregate, use `GET /positions/portfolio/summary`.",
      "exampleCall": "client.positions.getPortfolioPositions({ currency: 'USD' })",
      "responseType": "PositionsGetPortfolioPositionsResponse",
      "pathParams": [],
      "queryParams": [
        {
          "name": "companyGroupIds",
          "required": false,
          "type": "number[]",
          "description": "Optional list of company group identifiers to filter the portfolio positions"
        },
        {
          "name": "companyIds",
          "required": false,
          "type": "number[]",
          "description": "Optional list of company identifiers to narrow the aggregation to"
        },
        {
          "name": "currency",
          "required": true,
          "type": "string",
          "description": "Reporting currency code"
        },
        {
          "name": "date",
          "required": false,
          "type": "string",
          "description": "Optional summary date in ISO format"
        }
      ]
    }
  },
  "transactions": {
    "getSummary": {
      "method": "GET",
      "path": "/transactions/summary",
      "summary": "Get transaction activity summary",
      "description": "Returns aggregated transaction statistics: total invested, total realized, transaction count, company count, and breakdown by transaction type. Optionally group by period (Month, Quarter, Year). Filter by company, fund (`companyGroupIds`), and date range. Ordered by period ascending.",
      "exampleCall": "client.transactions.getSummary({ currency: 'USD' })",
      "responseType": "TransactionsGetSummaryResponse",
      "pathParams": [],
      "queryParams": [
        {
          "name": "limit",
          "required": false,
          "type": "number",
          "description": "Maximum items per page (1-500). Omit to receive the full result set in one response. Values outside that range are rejected with 422 rather than clamped, so a page is never quietly smaller than requested."
        },
        {
          "name": "cursor",
          "required": false,
          "type": "string",
          "description": "Opaque cursor from a previous response's `meta.nextCursor`. Carries the page size it was issued with, so a follow-up call needs only the cursor. Valid solely for the endpoint, filters, and caller that produced it — change any of them and you get 422; start again without a cursor. Paging reflects the data as of each request, so rows added or removed mid-walk can shift positions."
        },
        {
          "name": "companyGroupIds",
          "required": false,
          "type": "number[]",
          "description": "Restrict to companies that belong to any of these company groups."
        },
        {
          "name": "companyIds",
          "required": false,
          "type": "number[]",
          "description": "Restrict to these company identifiers."
        },
        {
          "name": "currency",
          "required": true,
          "type": "string",
          "description": "Reporting currency code (ISO 4217)."
        },
        {
          "name": "groupBy",
          "required": false,
          "type": "\"Month\" | \"Quarter\" | \"Year\"",
          "description": "Group results by this period granularity. When omitted, returns a single summary across all time."
        },
        {
          "name": "from",
          "required": false,
          "type": "string",
          "description": "Lower bound for transaction date (ISO 8601, inclusive)."
        },
        {
          "name": "to",
          "required": false,
          "type": "string",
          "description": "Upper bound for transaction date (ISO 8601, inclusive)."
        }
      ]
    },
    "getCompanyTransactions": {
      "method": "GET",
      "path": "/transactions/companies/:id",
      "summary": "Get transactions for one company",
      "description": "Returns all transactions for a single company, ordered by date descending then id descending. Each transaction is a typed variant — narrow it via its `type` field. Filter by `companyGroupIds` to scope to a specific fund, `types` to limit to specific transaction kinds, and `priorTo` (ISO 8601) for a historical snapshot. Requires transaction read access on the company.",
      "exampleCall": "client.transactions.getCompanyTransactions(123, { limit: 123 })",
      "responseType": "TransactionsGetCompanyTransactionsResponse",
      "pathParams": [
        {
          "name": "id",
          "type": "number",
          "description": "Company identifier"
        }
      ],
      "queryParams": [
        {
          "name": "limit",
          "required": false,
          "type": "number",
          "description": "Maximum items per page (1-500). Omit to receive the full result set in one response. Values outside that range are rejected with 422 rather than clamped, so a page is never quietly smaller than requested."
        },
        {
          "name": "cursor",
          "required": false,
          "type": "string",
          "description": "Opaque cursor from a previous response's `meta.nextCursor`. Carries the page size it was issued with, so a follow-up call needs only the cursor. Valid solely for the endpoint, filters, and caller that produced it — change any of them and you get 422; start again without a cursor. Paging reflects the data as of each request, so rows added or removed mid-walk can shift positions."
        },
        {
          "name": "companyGroupIds",
          "required": false,
          "type": "number[]",
          "description": "Optional company group identifiers to filter transactions by"
        },
        {
          "name": "types",
          "required": false,
          "type": "(\"Auction\" | \"ConvertibleNote\" | \"ConvertToEquity\" | \"Dividend\" | \"EquityInvestment\" | \"EquityReceived\" | \"Extend\" | \"FutureEquityAgreement\" | \"Insolvency\" | \"IPO\" | \"LimitedAuction\" | \"OptionsReceived\" | \"OtherExit\" | \"OtherInvestment\" | \"OtherRealization\" | \"Payback\" | \"Proprietary\" | \"TradeSale\" | \"ValuationChange\" | \"WriteOff\")[]",
          "description": "Restrict results to these transaction types"
        },
        {
          "name": "priorTo",
          "required": false,
          "type": "string",
          "description": "Exclude transactions on or after this ISO 8601 date (cut-off filter)"
        }
      ]
    },
    "getTransactions": {
      "method": "GET",
      "path": "/transactions",
      "summary": "Get transactions for multiple companies",
      "description": "Returns transactions across multiple companies. Each transaction is a typed variant — narrow it via its `type` field. Filter by `companyIds`, `companyGroupIds`, `types`, and `priorTo` (ISO 8601 upper-bound date for a historical snapshot). When `companyIds` is provided, the caller must have transaction read access on every listed company. Ordered by date descending, then id descending.",
      "exampleCall": "client.transactions.getTransactions({ limit: 123 })",
      "responseType": "TransactionsGetTransactionsResponse",
      "pathParams": [],
      "queryParams": [
        {
          "name": "limit",
          "required": false,
          "type": "number",
          "description": "Maximum items per page (1-500). Omit to receive the full result set in one response. Values outside that range are rejected with 422 rather than clamped, so a page is never quietly smaller than requested."
        },
        {
          "name": "cursor",
          "required": false,
          "type": "string",
          "description": "Opaque cursor from a previous response's `meta.nextCursor`. Carries the page size it was issued with, so a follow-up call needs only the cursor. Valid solely for the endpoint, filters, and caller that produced it — change any of them and you get 422; start again without a cursor. Paging reflects the data as of each request, so rows added or removed mid-walk can shift positions."
        },
        {
          "name": "companyGroupIds",
          "required": false,
          "type": "number[]",
          "description": "Optional company group identifiers to filter transactions by"
        },
        {
          "name": "types",
          "required": false,
          "type": "(\"Auction\" | \"ConvertibleNote\" | \"ConvertToEquity\" | \"Dividend\" | \"EquityInvestment\" | \"EquityReceived\" | \"Extend\" | \"FutureEquityAgreement\" | \"Insolvency\" | \"IPO\" | \"LimitedAuction\" | \"OptionsReceived\" | \"OtherExit\" | \"OtherInvestment\" | \"OtherRealization\" | \"Payback\" | \"Proprietary\" | \"TradeSale\" | \"ValuationChange\" | \"WriteOff\")[]",
          "description": "Restrict results to these transaction types"
        },
        {
          "name": "priorTo",
          "required": false,
          "type": "string",
          "description": "Exclude transactions on or after this ISO 8601 date (cut-off filter)"
        },
        {
          "name": "companyIds",
          "required": false,
          "type": "number[]",
          "description": "Optional company identifiers to filter transactions by"
        }
      ]
    }
  },
  "metrics": {
    "getTypes": {
      "method": "GET",
      "path": "/metrics/types",
      "summary": "List metric types available to the SDK consumer",
      "description": "Returns predefined metric types plus user-defined metric types scoped to the caller — VC group custom types for VC users, company custom types for company users. Each entry carries the metric shape needed to interpret values: `valueType` is `\"numeric\"` (read `point.value` as a number; may carry `rangeConfig` with min/max/step for ranged metrics) or `\"option\"` (read `point.optionValue` as a string from `optionConfig.options[]` — this is how boolean / yes-no metrics are encoded, as two options typically labelled \"Yes\"/\"No\"). `unit.unit` describes the measurement (`Currency`, `Percentage`, `Number`, time units, ...); `unit.currencyCode` is intentionally null on this endpoint because monetary types resolve their concrete currency per company — call /metrics to receive `unit.currencyCode` populated with each company's native currency, or pass `currency` to convert all monetary metrics to a chosen target. Ordered by metric type id ascending.",
      "exampleCall": "client.metrics.getTypes({ limit: 123 })",
      "responseType": "MetricsGetTypesResponse",
      "pathParams": [],
      "queryParams": [
        {
          "name": "limit",
          "required": false,
          "type": "number",
          "description": "Maximum items per page (1-500). Omit to receive the full result set in one response. Values outside that range are rejected with 422 rather than clamped, so a page is never quietly smaller than requested."
        },
        {
          "name": "cursor",
          "required": false,
          "type": "string",
          "description": "Opaque cursor from a previous response's `meta.nextCursor`. Carries the page size it was issued with, so a follow-up call needs only the cursor. Valid solely for the endpoint, filters, and caller that produced it — change any of them and you get 422; start again without a cursor. Paging reflects the data as of each request, so rows added or removed mid-walk can shift positions."
        }
      ]
    },
    "search": {
      "method": "POST",
      "path": "/metrics",
      "summary": "Read metric values for accessible companies, grouped by company",
      "description": "Returns metric data points for companies the caller can access (companies in the caller's VC group portfolio, or the caller's own company for company users). Each entry carries company and metric type references with id and human-readable name. Each point carries both `value` (number, for `valueType === \"numeric\"`, including ranged numerics constrained by the type's `rangeConfig`) and `optionValue` (string, for `valueType === \"option\"`, matching one of `metricType.optionConfig.options[].value` — this is how boolean/yes-no metrics report their reading); read whichever matches the metric type's `valueType`. Filter by company id, company name substring (`companyNameSearch`), company group, metric type id, metric type name (`metricTypeNames`), timeframe, and date range to narrow the response. Pass `currency` (ISO 4217) to FX-convert monetary metrics to that target currency in one call instead of fetching company currencies separately. Entries are ordered by company id ascending — one entry per company, so `limit` pages whole companies, never partial metric lists.",
      "exampleCall": "client.metrics.search({})",
      "responseType": "MetricsSearchResponse",
      "pathParams": [],
      "queryParams": []
    },
    "compare": {
      "method": "POST",
      "path": "/metrics/compare",
      "summary": "Compare metrics across companies",
      "description": "Returns date-aligned rows for one or more metric types across multiple companies. Pass `metricTypeIds` (resolve from /metrics/types) to compare several metrics in a single round trip; names are not accepted on this endpoint to keep selection stable. Each row contains one value per company for a given period. Optionally includes period-over-period percentage change. Use `companyIds`, `companyNameSearch`, or `companyGroupIds` to select companies.",
      "exampleCall": "client.metrics.compare({ metricTypeIds: [1,7] })",
      "responseType": "MetricsCompareResponse",
      "pathParams": [],
      "queryParams": []
    },
    "aggregate": {
      "method": "POST",
      "path": "/metrics/aggregate",
      "summary": "Aggregate metrics across portfolio companies",
      "description": "Returns aggregated metric values (SUM, AVG, MEDIAN, MIN, MAX, COUNT) across companies for each reporting period. Pass `metricTypeIds` (resolve from /metrics/types) to select what to aggregate; names are not accepted on this endpoint to keep selection stable. Optionally group results by fund (`companyGroupId`) for fund-level breakdowns. MIN, MAX, and COUNT are always computed. SUM, AVG, and MEDIAN are only produced when the metric type enables them in its `summaryAggregationMethods` configuration; otherwise `point.value` is `null` for that aggregation. Ordered by metric type id, then aggregation, then fund id.",
      "exampleCall": "client.metrics.aggregate({ metricTypeIds: [1,7], aggregation: \"SUM\" })",
      "responseType": "MetricsAggregateResponse",
      "pathParams": [],
      "queryParams": []
    }
  },
  "companyReports": {
    "list": {
      "method": "GET",
      "path": "/company-reports",
      "summary": "List published company reports accessible to the caller (metadata only)",
      "description": "Returns lightweight report metadata (id, title, period, publisher company reference). Use GET /company-reports/:id to fetch the full content of a specific report. Visibility is determined by the caller's roles — VC users see reports for managed-portfolio companies, company employees see their own company's reports, portfolio investors see Published reports shared with their visibility groups. Filters narrow the list by company ids, funds (`companyGroupIds`), company name substring (`companyNameSearch`), and reporting period (timeframe + date range). Ordered by report date descending, then id descending — newest first.",
      "exampleCall": "client.companyReports.list({ limit: 123 })",
      "responseType": "CompanyReportsListResponse",
      "pathParams": [],
      "queryParams": [
        {
          "name": "limit",
          "required": false,
          "type": "number",
          "description": "Maximum items per page (1-500). Omit to receive the full result set in one response. Values outside that range are rejected with 422 rather than clamped, so a page is never quietly smaller than requested."
        },
        {
          "name": "cursor",
          "required": false,
          "type": "string",
          "description": "Opaque cursor from a previous response's `meta.nextCursor`. Carries the page size it was issued with, so a follow-up call needs only the cursor. Valid solely for the endpoint, filters, and caller that produced it — change any of them and you get 422; start again without a cursor. Paging reflects the data as of each request, so rows added or removed mid-walk can shift positions."
        },
        {
          "name": "companyIds",
          "required": false,
          "type": "number[]",
          "description": "Restrict results to these companies. Defaults to all companies the caller can access."
        },
        {
          "name": "companyGroupIds",
          "required": false,
          "type": "number[]",
          "description": "Restrict to companies that belong to any of these company groups."
        },
        {
          "name": "companyNameSearch",
          "required": false,
          "type": "string[]",
          "description": "Case-insensitive substring match on the reporting company name. Pass an array to resolve multiple companies in one call — a report matches if its company name contains ANY of the listed substrings (OR semantics). Intersects with `companyIds`/`companyGroupIds`."
        },
        {
          "name": "timeframe",
          "required": false,
          "type": "\"Month\" | \"Quarter\" | \"Year\"",
          "description": "Restrict to a reporting period granularity (Month, Quarter, Year)."
        },
        {
          "name": "from",
          "required": false,
          "type": "string",
          "description": "Lower bound for the reporting period date (ISO 8601, inclusive)."
        },
        {
          "name": "to",
          "required": false,
          "type": "string",
          "description": "Upper bound for the reporting period date (ISO 8601, inclusive)."
        }
      ]
    },
    "getOne": {
      "method": "GET",
      "path": "/company-reports/:id",
      "summary": "Fetch the full content of a single company report",
      "description": "Returns the report metadata plus structured sections (text/markdown/image) and attachments with pre-signed URLs. Returns 404 if the report does not exist and 403 if the caller cannot access it under their role-based permissions.",
      "exampleCall": "client.companyReports.getOne(123)",
      "responseType": "CompanyReportsGetOneResponse",
      "pathParams": [
        {
          "name": "id",
          "type": "number",
          "description": "Report identifier"
        }
      ],
      "queryParams": []
    }
  }
}
const defaultBaseUrl = "https://api.rundit.com/api/v2/sdk"

export class RunditSdkError extends Error {
  constructor(message, details) {
    super(message)
    this.name = 'RunditSdkError'
    this.status = details.status
    this.body = details.body
  }
}

function resolveFetch(customFetch) {
  if (customFetch) {
    return customFetch
  }

  if (typeof globalThis.fetch === 'function') {
    return globalThis.fetch.bind(globalThis)
  }

  throw new Error('No fetch implementation available. Pass options.fetch when initializing the client.')
}

function normalizeBaseUrl(baseUrl) {
  return baseUrl.replace(/\/+$/, '')
}

function shouldSendNgrokBypassHeader(baseUrl) {
  try {
    const { hostname } = new URL(baseUrl)
    return hostname.includes('ngrok')
  } catch {
    return false
  }
}

function interpolatePath(pathTemplate, pathParams = {}) {
  return pathTemplate.replace(/:([A-Za-z0-9_]+)/g, (_, key) => {
    const value = pathParams[key]

    if (value === undefined || value === null) {
      throw new Error(`Missing required path parameter: ${key}`)
    }

    return encodeURIComponent(String(value))
  })
}

function appendQueryString(url, query = {}) {
  const searchParams = new URLSearchParams()

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return
    }

    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item !== undefined && item !== null) {
          searchParams.append(key, String(item))
        }
      })
      return
    }

    searchParams.append(key, String(value))
  })

  const queryString = searchParams.toString()
  return queryString.length > 0 ? `${url}?${queryString}` : url
}

async function parseResponse(response) {
  if (response.status === 204) {
    return undefined
  }

  const contentType = response.headers.get('content-type') || ''

  if (contentType.includes('application/json')) {
    return response.json()
  }

  return response.text()
}

function createRequester(options) {
  const fetchImplementation = resolveFetch(options.fetch)
  const baseUrl = normalizeBaseUrl(options.baseUrl || defaultBaseUrl)
  const shouldBypassNgrokBrowserWarning = shouldSendNgrokBypassHeader(baseUrl)
  const defaultHeaders = {
    Accept: 'application/json',
    ...(shouldBypassNgrokBrowserWarning ? { 'ngrok-skip-browser-warning': '69420' } : {}),
    ...options.headers,
    "X-API-Key": options.apiKey,
  }

  return async ({ method, path, pathParams, query, body, signal }) => {
    const url = appendQueryString(baseUrl + interpolatePath(path, pathParams), query)
    const hasBody = body !== undefined && body !== null
    const requestHeaders = hasBody ? { ...defaultHeaders, 'Content-Type': 'application/json' } : defaultHeaders

    const response = await fetchImplementation(url, {
      method,
      headers: requestHeaders,
      body: hasBody ? JSON.stringify(body) : undefined,
      signal,
    })

    const responseBody = await parseResponse(response)

    if (!response.ok) {
      throw new RunditSdkError(`Rundit request failed with status ${response.status}`, {
        status: response.status,
        body: responseBody,
      })
    }

    return responseBody
  }
}

function createCompaniesNamespace(request) {
  return {
    getDashboards: (body, init = {}) => request({ method: "POST", path: "/companies/dashboards", pathParams: undefined, query: undefined, body: body, signal: init.signal }),
    getDashboard: (id, query = {}, init = {}) => request({ method: "GET", path: "/companies/:id/dashboard", pathParams: { id }, query: query, body: undefined, signal: init.signal }),
    getOne: (id, init = {}) => request({ method: "GET", path: "/companies/:id", pathParams: { id }, query: undefined, body: undefined, signal: init.signal }),
    getAll: (query = {}, init = {}) => request({ method: "GET", path: "/companies", pathParams: undefined, query: query, body: undefined, signal: init.signal }),
  }
}

function createCompanyGroupsNamespace(request) {
  return {
    getAll: (query = {}, init = {}) => request({ method: "GET", path: "/company-groups", pathParams: undefined, query: query, body: undefined, signal: init.signal }),
    getOne: (id, init = {}) => request({ method: "GET", path: "/company-groups/:id", pathParams: { id }, query: undefined, body: undefined, signal: init.signal }),
  }
}

function createPositionsNamespace(request) {
  return {
    getPortfolioSummary: (query = {}, init = {}) => request({ method: "GET", path: "/positions/portfolio/summary", pathParams: undefined, query: query, body: undefined, signal: init.signal }),
    getCompanyPositions: (id, query = {}, init = {}) => request({ method: "GET", path: "/positions/companies/:id", pathParams: { id }, query: query, body: undefined, signal: init.signal }),
    getPortfolioPositions: (query = {}, init = {}) => request({ method: "GET", path: "/positions/portfolio", pathParams: undefined, query: query, body: undefined, signal: init.signal }),
  }
}

function createTransactionsNamespace(request) {
  return {
    getSummary: (query = {}, init = {}) => request({ method: "GET", path: "/transactions/summary", pathParams: undefined, query: query, body: undefined, signal: init.signal }),
    getCompanyTransactions: (id, query = {}, init = {}) => request({ method: "GET", path: "/transactions/companies/:id", pathParams: { id }, query: query, body: undefined, signal: init.signal }),
    getTransactions: (query = {}, init = {}) => request({ method: "GET", path: "/transactions", pathParams: undefined, query: query, body: undefined, signal: init.signal }),
  }
}

function createMetricsNamespace(request) {
  return {
    getTypes: (query = {}, init = {}) => request({ method: "GET", path: "/metrics/types", pathParams: undefined, query: query, body: undefined, signal: init.signal }),
    search: (body, init = {}) => request({ method: "POST", path: "/metrics", pathParams: undefined, query: undefined, body: body, signal: init.signal }),
    compare: (body, init = {}) => request({ method: "POST", path: "/metrics/compare", pathParams: undefined, query: undefined, body: body, signal: init.signal }),
    aggregate: (body, init = {}) => request({ method: "POST", path: "/metrics/aggregate", pathParams: undefined, query: undefined, body: body, signal: init.signal }),
  }
}

function createCompanyReportsNamespace(request) {
  return {
    list: (query = {}, init = {}) => request({ method: "GET", path: "/company-reports", pathParams: undefined, query: query, body: undefined, signal: init.signal }),
    getOne: (id, init = {}) => request({ method: "GET", path: "/company-reports/:id", pathParams: { id }, query: undefined, body: undefined, signal: init.signal }),
  }
}

export function createClient(options) {
  if (!options || typeof options !== 'object') {
    throw new Error('options is required')
  }

  if (!options.apiKey) {
    throw new Error('options.apiKey is required')
  }

  const request = createRequester(options)

  return {
    companies: createCompaniesNamespace(request),
    companyGroups: createCompanyGroupsNamespace(request),
    positions: createPositionsNamespace(request),
    transactions: createTransactionsNamespace(request),
    metrics: createMetricsNamespace(request),
    companyReports: createCompanyReportsNamespace(request),
  }
}

export { routeManifest }
