const routeManifest = {
  "profiles": {
    "getConfig": {
      "method": "GET",
      "path": "/profiles/config",
      "summary": "Get allowed profile field values and labels",
      "description": "Reference data for directory CRUD: roles, positions, education levels, genders, races and nationalities. Use sections to request only what you need (e.g. [\"roles\",\"positions\"]); omitted or [] returns the complete config. Contains no customer profiles. Use the option value, not its label, when writing.",
      "exampleCall": "client.profiles.getConfig({ sections: ['example'] })",
      "responseType": "ProfilesGetConfigResponse",
      "pathParams": [],
      "queryParams": [
        {
          "name": "sections",
          "required": false,
          "type": "(\"roles\" | \"positions\" | \"educationLevels\" | \"genders\" | \"races\" | \"nationalities\")[]",
          "description": "Return only these reference-data sections. Omit or pass [] for the complete config."
        }
      ]
    },
    "list": {
      "method": "GET",
      "path": "/profiles",
      "summary": "List the founders, management and board directory",
      "description": "Returns full profile fields for accessible companies, one entry per profile and company. Filter by company ids, funds, company name, person name, recorded roles, firstTimeFounder, position or positions (OR within the array). Filters intersect. firstTimeFounder=false matches recorded No answers only, not unknown answers or non-founders. Omitted roles returns the whole directory. Absence of a role means not recorded, not a verified negative. First-time-founder null means Not specified. Ordered by company id then profile UUID; repeat the original filters when passing the next cursor. Existing legacy free-text values remain readable; format validation applies to supplied write fields.",
      "exampleCall": "client.profiles.list({ limit: 123 })",
      "responseType": "ProfilesListResponse",
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
          "description": "Opaque cursor from a previous response's `meta.nextCursor`. Repeat the original filters and pass nextCursor as cursor; limit can be omitted because the cursor carries its page size. Valid solely for the endpoint, filters, and caller that produced it — change any of them and you get 422; start again without a cursor. Paging reflects the data as of each request, so rows added or removed mid-walk can shift positions."
        },
        {
          "name": "firstTimeFounder",
          "required": false,
          "type": "boolean",
          "description": "Filter founders by a recorded Yes/No answer. false does not match unknown answers or non-founders."
        },
        {
          "name": "position",
          "required": false,
          "type": "\"chief-executive\" | \"chief-operating\" | \"chief-financial\" | \"chief-information\" | \"chief-technology\" | \"chief-marketing\" | \"chief-human-resources\" | \"chief-design\" | \"chief-data\" | \"chief-product\" | \"chief-customer\" | \"chief-revenue\" | \"chief-sales\" | \"president\" | \"vice-president\" | \"vp-operations\" | \"vp-finance\" | \"vp-technology\" | \"vp-marketing\" | \"vp-sales\" | \"vp-human-resources\" | \"vp-product\" | \"vp-design\" | \"vp-customer-support\" | \"vp-business-development\" | \"head-operations\" | \"head-finance\" | \"head-technology\" | \"head-marketing\" | \"head-human-resources\" | \"head-product\" | \"head-design\" | \"head-customer-support\" | \"head-business-development\" | \"lead-operations\" | \"lead-finance\" | \"lead-technology\" | \"lead-marketing\" | \"lead-human-resources\" | \"lead-product\" | \"lead-design\" | \"lead-customer-support\" | \"lead-business-development\" | \"chief-mobility-officer\" | \"evp-business-and-legal-affairs\" | \"global-general-manager\" | \"evp-international-co-productions\" | \"chief-creative-officer\" | \"executive-chairman\" | \"chief-experience-n-strategy-officer\" | \"chief-corporate-officer\" | \"chief-of-staff\" | \"chief-people-officer\" | \"chief-privacy-officer\" | \"chief-legal-officer\" | \"svp-people-operations-n-experience\" | \"svp-marketing\" | \"svp-product-n-analytics\" | \"evp-strategic-partnerships\" | \"svp-of-sales\" | \"svp-strategic-initiatives\" | \"head-of-talent\" | \"head-of-partnerships\" | \"engineering-manager\" | \"director-of-customer-success\" | \"chief-compliance-officer\" | \"chief-strategy-officer\" | \"general-counsel\" | \"vp-engineering\" | \"director-of-engineering\" | \"chief-engineer\" | \"chief-medical-officer\" | \"executive-editor\" | \"managing-editor\" | \"vp-strategy-and-transformation\" | \"chief-business-officer\" | \"advisor\" | \"other\"",
          "description": "Filter by a company position from profiles.getConfig."
        },
        {
          "name": "positions",
          "required": false,
          "type": "(\"chief-executive\" | \"chief-operating\" | \"chief-financial\" | \"chief-information\" | \"chief-technology\" | \"chief-marketing\" | \"chief-human-resources\" | \"chief-design\" | \"chief-data\" | \"chief-product\" | \"chief-customer\" | \"chief-revenue\" | \"chief-sales\" | \"president\" | \"vice-president\" | \"vp-operations\" | \"vp-finance\" | \"vp-technology\" | \"vp-marketing\" | \"vp-sales\" | \"vp-human-resources\" | \"vp-product\" | \"vp-design\" | \"vp-customer-support\" | \"vp-business-development\" | \"head-operations\" | \"head-finance\" | \"head-technology\" | \"head-marketing\" | \"head-human-resources\" | \"head-product\" | \"head-design\" | \"head-customer-support\" | \"head-business-development\" | \"lead-operations\" | \"lead-finance\" | \"lead-technology\" | \"lead-marketing\" | \"lead-human-resources\" | \"lead-product\" | \"lead-design\" | \"lead-customer-support\" | \"lead-business-development\" | \"chief-mobility-officer\" | \"evp-business-and-legal-affairs\" | \"global-general-manager\" | \"evp-international-co-productions\" | \"chief-creative-officer\" | \"executive-chairman\" | \"chief-experience-n-strategy-officer\" | \"chief-corporate-officer\" | \"chief-of-staff\" | \"chief-people-officer\" | \"chief-privacy-officer\" | \"chief-legal-officer\" | \"svp-people-operations-n-experience\" | \"svp-marketing\" | \"svp-product-n-analytics\" | \"evp-strategic-partnerships\" | \"svp-of-sales\" | \"svp-strategic-initiatives\" | \"head-of-talent\" | \"head-of-partnerships\" | \"engineering-manager\" | \"director-of-customer-success\" | \"chief-compliance-officer\" | \"chief-strategy-officer\" | \"general-counsel\" | \"vp-engineering\" | \"director-of-engineering\" | \"chief-engineer\" | \"chief-medical-officer\" | \"executive-editor\" | \"managing-editor\" | \"vp-strategy-and-transformation\" | \"chief-business-officer\" | \"advisor\" | \"other\")[]",
          "description": "Match any of these positions (OR). Intersects with other filters, including scalar position when supplied."
        },
        {
          "name": "companyIds",
          "required": false,
          "type": "number[]",
          "description": null
        },
        {
          "name": "companyGroupIds",
          "required": false,
          "type": "number[]",
          "description": "Restrict to companies in these funds"
        },
        {
          "name": "companyNameSearch",
          "required": false,
          "type": "string[]",
          "description": "Case-insensitive company name substrings (OR)"
        },
        {
          "name": "nameSearch",
          "required": false,
          "type": "string[]",
          "description": "Case-insensitive person full-name substrings (OR)"
        },
        {
          "name": "rolesInCompany",
          "required": false,
          "type": "(\"founder-cofounder\" | \"management\" | \"board-member\" | \"board-chairman\")[]",
          "description": "Match any of these recorded roles; omitted returns the whole directory"
        }
      ]
    },
    "create": {
      "method": "POST",
      "path": "/profiles",
      "summary": "Create a founder, management or board profile",
      "description": "Creates a directory profile for a company. Requires name, companyId and at least one role or position. Optional fields default to null, including firstTimeFounder. Non-null firstTimeFounder requires the founder role. Uses profiles.getConfig option values. Managed-company and connected-company editing permissions apply.",
      "exampleCall": "client.profiles.create({ companyId: 123, name: 'example' })",
      "responseType": "ProfilesCreateResponse",
      "pathParams": [],
      "queryParams": []
    },
    "getOne": {
      "method": "GET",
      "path": "/profiles/:id",
      "summary": "Get a full directory profile",
      "description": "Requires the profile UUID and companyId from a directory entry. Returns all fields in that company context without disclosing other company associations.",
      "exampleCall": "client.profiles.getOne('123', { companyId: 123 })",
      "responseType": "ProfilesGetOneResponse",
      "pathParams": [
        {
          "name": "id",
          "type": "string",
          "description": null
        }
      ],
      "queryParams": [
        {
          "name": "companyId",
          "required": true,
          "type": "number",
          "description": "Company context for this directory entry. Must match an existing association; profiles cannot be moved to another company."
        }
      ]
    },
    "update": {
      "method": "PATCH",
      "path": "/profiles/:id",
      "summary": "Partially update a directory profile",
      "description": "PATCH semantics: omitted fields are preserved; null clears optional scalar fields, position or firstTimeFounder. Name cannot be cleared. rolesInCompany replaces only the specified company roles; other role fields are preserved when omitted. Removing founder status clears its first-time answer. At least one role or position must remain. companyId must be an existing association. Updates are atomic. Requires edit access to every company association because personal fields are shared.",
      "exampleCall": "client.profiles.update('123', { companyId: 123 })",
      "responseType": "ProfilesUpdateResponse",
      "pathParams": [
        {
          "name": "id",
          "type": "string",
          "description": null
        }
      ],
      "queryParams": []
    },
    "delete": {
      "method": "DELETE",
      "path": "/profiles/:id",
      "summary": "Delete a directory profile",
      "description": "Permanently deletes the profile and all company role associations. Requires companyId matching the directory entry and delete permission for every associated company. Does not delete a platform user account.",
      "exampleCall": "client.profiles.delete('123', { companyId: 123 })",
      "responseType": "ProfilesDeleteResponse",
      "pathParams": [
        {
          "name": "id",
          "type": "string",
          "description": null
        }
      ],
      "queryParams": [
        {
          "name": "companyId",
          "required": true,
          "type": "number",
          "description": "Company context for this directory entry. Must match an existing association; profiles cannot be moved to another company."
        }
      ]
    },
    "prepareAvatarUpload": {
      "method": "POST",
      "path": "/profiles/:id/avatar/uploads",
      "summary": "Prepare a profile avatar upload",
      "description": "Returns a short-lived, single-use PUT URL for an existing profile. Accepts JPEG, PNG or WebP, up to 5 MiB and 16 megapixels. The host or client must send the exact raw image bytes to uploadUrl with the returned headers; do not send base64, multipart or JSON, and never forward the Rundit API key. This tool does not read chat attachments or local paths. After uploading, call profiles.completeAvatarUpload with fileUuid. Requires edit access to every company associated with the profile. If the upload is explicitly blocked by the client network policy, explain the restriction and ask the user or their administrator to allowlist the exact hostname from uploadUrl, not a wildcard covering all storage domains. Once access is granted, prepare a fresh upload URL and retry. If policy cannot be changed, suggest uploading through the Rundit UI. Do not assume other upload failures are network restrictions: expired signatures, invalid headers and permission errors require separate diagnosis.",
      "exampleCall": "client.profiles.prepareAvatarUpload('123', { companyId: 123, filename: 'example', filetype: \"image/jpeg\", filesize: 123 })",
      "responseType": "ProfilesPrepareAvatarUploadResponse",
      "pathParams": [
        {
          "name": "id",
          "type": "string",
          "description": null
        }
      ],
      "queryParams": []
    },
    "completeAvatarUpload": {
      "method": "POST",
      "path": "/profiles/:id/avatar/uploads/complete",
      "summary": "Complete and attach a profile avatar upload",
      "description": "Call after sending raw image bytes to the URL returned by prepareAvatarUpload. Verifies upload ownership, actual size and image contents, then atomically attaches it and replaces the previous avatar. Requires the same uploading user, matching profile/company, and edit access to every associated company. Retrying the currently attached upload is safe. A failed completion preserves the existing avatar. Returns the updated profile and avatarImageUrl. Remove an avatar through profiles.update with avatarImageFileUuid: null.",
      "exampleCall": "client.profiles.completeAvatarUpload('123', { companyId: 123, fileUuid: '123' })",
      "responseType": "ProfilesCompleteAvatarUploadResponse",
      "pathParams": [
        {
          "name": "id",
          "type": "string",
          "description": null
        }
      ],
      "queryParams": []
    }
  },
  "companies": {
    "getDashboards": {
      "method": "POST",
      "path": "/companies/dashboards",
      "summary": "PREFERRED tool for multi-company analysis — full dashboards for many companies in one call",
      "description": "PREFERRED tool for multi-company analysis. Returns full dashboards (company metadata, positions, metrics with data points, recent transactions, report summaries) for many companies in a single request, grouped per company. Use this instead of looping `GET /companies/:id/dashboard` (the N+1 pattern) whenever the agent needs to look at more than one company — it returns the same shape per company but in one round trip. Typical workflow: resolve company ids (e.g. `GET /companies?nameSearch=[\"acme\",\"beta\"]`), then call this with their `companyIds`. Use `metricTypeIds` or `metricTypeNames` (case-insensitive exact match on full name or `shortName`) to scope the returned metrics. `metricsFrom` (ISO 8601) sets a lower-bound date for metric data points; omit to include all history. `metricsTimeframe` restricts data point granularity to Month, Quarter, or Year. `metricsPointLimit` keeps only the most recent N points per metric (`1` = latest dated point; set `metricsTo` to today to exclude future values) — full histories for many companies add up quickly. `currency` (ISO 4217, required) FX-converts all monetary metrics across the batch. `conversionStrategy` controls which rate is applied: `LATEST_FX_RATE` (default) or `ENTITY_DATE_RATE` (the rate on each point's own date). `transactionLimit` / `reportLimit` cap list sizes per company (defaults: 10 and 5 respectively). Dashboards come back in the order the `companyIds` were requested, so `limit`/`cursor` paging is stable.",
      "exampleCall": "client.companies.getDashboards({ companyIds: [123], currency: 'USD' })",
      "responseType": "CompaniesGetDashboardsResponse",
      "pathParams": [],
      "queryParams": []
    },
    "getDashboard": {
      "method": "GET",
      "path": "/companies/:id/dashboard",
      "summary": "Get full company dashboard for ONE company",
      "description": "Returns company metadata, positions per fund, metrics with data points, recent transactions, and report summaries for a single company. For more than one company, prefer POST /companies/dashboards (`companies.getDashboards`) instead — it returns the same payload per company in one call and avoids the N+1 pattern. Takes the same metric options as the batch route: `metricTypeNames` / `metricTypeIds` scope which metrics are included, `metricsTimeframe` picks a granularity, `metricsFrom`, `metricsTo`, and `metricsPointLimit` limit history (`metricsPointLimit: 1` = latest dated point; set `metricsTo` to today for current values — prefer it over `metricsFrom` for \"latest\" reads, since a date lower bound hides values last reported before it). `transactionLimit` and `reportLimit` cap list sizes.",
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
          "name": "metricsTo",
          "required": false,
          "type": "string",
          "description": "Inclusive upper bound for metric data points (ISO 8601). Pair with metricsPointLimit: 1 for latest values as of this date; omit to allow future-dated points."
        },
        {
          "name": "metricsTimeframe",
          "required": false,
          "type": "\"Month\" | \"Quarter\" | \"Year\"",
          "description": "Restrict metric data points to this reporting period granularity."
        },
        {
          "name": "metricsPointLimit",
          "required": false,
          "type": "number",
          "description": "Keep only the most recent N data points per metric (applied after `metricsFrom` / `metricsTo` / `metricsTimeframe`). Omit for the full history; `1` yields the latest dated point, which may be in the future. Set `metricsTo` to today for current values and `metricsTimeframe` for a single granularity."
        },
        {
          "name": "metricTypeNames",
          "required": false,
          "type": "string[]",
          "description": "Metric type names to include (case-insensitive exact match on display name or `shortName`). Omit to include all metrics. Names that match no accessible metric type are ignored."
        },
        {
          "name": "metricTypeIds",
          "required": false,
          "type": "number[]",
          "description": "Metric type identifiers to include. Intersected with `metricTypeNames` when both are provided."
        },
        {
          "name": "conversionStrategy",
          "required": false,
          "type": "\"LATEST_FX_RATE\" | \"ENTITY_DATE_RATE\"",
          "description": "FX rate selection when converting monetary metrics. `LATEST_FX_RATE` (default) uses the most recent rate; `ENTITY_DATE_RATE` uses the rate on each point's date."
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
      "description": "Returns the full company object for a single company. Includes all compact-list fields (id, name, type, currency, website, logo) plus extended metadata: legal name, status, description, vision, address, city, state, country, operating countries, VAT number, founding year, established date, total funding, and accessible fund ids (as `companyGroupIds`). Returns 403 (not 404) both when the company does not exist and when it is outside the caller's access — existence is deliberately not disclosed. Once the request is authenticated and carries the required scope, a 403 on this route therefore means an unknown or inaccessible id; resolve ids via `GET /companies` first. (A missing API key scope also yields 403, with an \"Insufficient API key scopes\" message.)",
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
          "description": "Opaque cursor from a previous response's `meta.nextCursor`. Repeat the original filters and pass nextCursor as cursor; limit can be omitted because the cursor carries its page size. Valid solely for the endpoint, filters, and caller that produced it — change any of them and you get 422; start again without a cursor. Paging reflects the data as of each request, so rows added or removed mid-walk can shift positions."
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
          "description": "Opaque cursor from a previous response's `meta.nextCursor`. Repeat the original filters and pass nextCursor as cursor; limit can be omitted because the cursor carries its page size. Valid solely for the endpoint, filters, and caller that produced it — change any of them and you get 422; start again without a cursor. Paging reflects the data as of each request, so rows added or removed mid-walk can shift positions."
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
      "description": "Returns full fund details. Includes all compact-list fields (id, name, type, currency, logo) plus extended fund metadata: legal name, domicile, management company, GP, vintage year, fund currency, opening and closing dates, legal form, investment policy, fees, regulatory info, and service providers. Also includes the list of member companies the caller can access. Returns 403 (not 404) both when the fund does not exist and when it is outside the caller's access — existence is deliberately not disclosed. Once the request is authenticated and carries the required scope, a 403 on this route therefore means an unknown or inaccessible id; resolve ids via `GET /company-groups` first. (A missing API key scope also yields 403, with an \"Insufficient API key scopes\" message.)",
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
      "description": "Returns position data (invested, fair value, multiple, ROI) and latest monthly metrics as of `date` (today by default). One row per company and fund by default; `groupBy: Company` combines selected accessible funds into one row per company. For top 3 companies by fair value use `groupBy: Company`, `sortBy: fairValue`, `sortDirection: desc`, `limit: 3`, `includeMetrics: false`. Sorting happens before pagination; metrics are loaded only for the returned page. Default metrics are MRR, Cash Balance, Headcount, Net Burn Rate, and Runway. Override with `metricTypeNames` or set `includeMetrics: false` to skip metrics entirely. Without a limit all rows are returned and can be large. Default order is company id, then fund id.",
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
          "description": "Opaque cursor from a previous response's `meta.nextCursor`. Repeat the original filters and pass nextCursor as cursor; limit can be omitted because the cursor carries its page size. Valid solely for the endpoint, filters, and caller that produced it — change any of them and you get 422; start again without a cursor. Paging reflects the data as of each request, so rows added or removed mid-walk can shift positions."
        },
        {
          "name": "groupBy",
          "required": false,
          "type": "\"CompanyGroup\" | \"Company\"",
          "description": "CompanyGroup (default) returns one row per company and fund. Company combines all selected, accessible funds into one row per company using the investment engine totals; companyGroupId is null and companyGroup is omitted."
        },
        {
          "name": "sortBy",
          "required": false,
          "type": "\"companyId\" | \"fairValue\" | \"invested\" | \"realized\" | \"multiple\"",
          "description": "Sort before pagination. For the top companies by fair value use groupBy: Company, sortBy: fairValue, sortDirection: desc, limit: 3. Missing values sort last; company and fund ids break ties."
        },
        {
          "name": "sortDirection",
          "required": false,
          "type": "\"asc\" | \"desc\"",
          "description": null
        },
        {
          "name": "includeMetrics",
          "required": false,
          "type": "boolean",
          "description": "Include the latest monthly metric snapshot as of date (defaults to today). Set false for position-only queries: skips metric computation and returns latestMetrics: []."
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
          "description": "Metric type names to include in the latest metrics snapshot (case-insensitive exact match on display name or `shortName`). Defaults to MRR, Cash Balance, Headcount, Net Burn Rate, and Runway. Names that match no accessible metric type are ignored."
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
          "description": "Opaque cursor from a previous response's `meta.nextCursor`. Repeat the original filters and pass nextCursor as cursor; limit can be omitted because the cursor carries its page size. Valid solely for the endpoint, filters, and caller that produced it — change any of them and you get 422; start again without a cursor. Paging reflects the data as of each request, so rows added or removed mid-walk can shift positions."
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
          "description": "Reporting currency code (ISO 4217)"
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
          "description": "Reporting currency code (ISO 4217)"
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
          "description": "Opaque cursor from a previous response's `meta.nextCursor`. Repeat the original filters and pass nextCursor as cursor; limit can be omitted because the cursor carries its page size. Valid solely for the endpoint, filters, and caller that produced it — change any of them and you get 422; start again without a cursor. Paging reflects the data as of each request, so rows added or removed mid-walk can shift positions."
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
          "description": "Opaque cursor from a previous response's `meta.nextCursor`. Repeat the original filters and pass nextCursor as cursor; limit can be omitted because the cursor carries its page size. Valid solely for the endpoint, filters, and caller that produced it — change any of them and you get 422; start again without a cursor. Paging reflects the data as of each request, so rows added or removed mid-walk can shift positions."
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
          "description": "Opaque cursor from a previous response's `meta.nextCursor`. Repeat the original filters and pass nextCursor as cursor; limit can be omitted because the cursor carries its page size. Valid solely for the endpoint, filters, and caller that produced it — change any of them and you get 422; start again without a cursor. Paging reflects the data as of each request, so rows added or removed mid-walk can shift positions."
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
      "summary": "Search metric types available to the SDK consumer",
      "description": "Returns predefined metric types plus user-defined metric types scoped to the caller — VC group custom types for VC users, company custom types for company users. Each entry carries the metric shape needed to interpret values: `valueType` is `\"numeric\"` (read `point.value` as a number; may carry `rangeConfig` with min/max/step for ranged metrics) or `\"option\"` (read `point.optionValue` as a string from `optionConfig.options[]` — this is how boolean / yes-no metrics are encoded, as two options typically labelled \"Yes\"/\"No\"). `unit.unit` describes the measurement (`Currency`, `Percentage`, `Number`, time units, ...); `unit.currencyCode` is intentionally null on this endpoint because monetary types resolve their concrete currency per company — call /metrics to receive `unit.currencyCode` populated with each company's native currency, or pass `currency` to convert all monetary metrics to a chosen target. Filter with `nameSearch` (case-insensitive substring on name or `shortName`, OR across an array) to find a few types without paging the whole catalogue — e.g. `nameSearch=[\"mrr\",\"burn\"]`. Ordered by metric type id ascending.",
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
          "description": "Opaque cursor from a previous response's `meta.nextCursor`. Repeat the original filters and pass nextCursor as cursor; limit can be omitted because the cursor carries its page size. Valid solely for the endpoint, filters, and caller that produced it — change any of them and you get 422; start again without a cursor. Paging reflects the data as of each request, so rows added or removed mid-walk can shift positions."
        },
        {
          "name": "origin",
          "required": false,
          "type": "\"Predefined\" | \"UserDefined\"",
          "description": null
        },
        {
          "name": "nameSearch",
          "required": false,
          "type": "string[]",
          "description": "Case-insensitive substring match on metric type name or `shortName`. Pass an array to look up several types in one call — a type matches if ANY listed substring occurs (OR semantics). Use it to find ids or exact names without paging the whole catalogue."
        }
      ]
    },
    "createType": {
      "method": "POST",
      "path": "/metrics/types",
      "summary": "Create a VC-owned custom metric type",
      "description": "Creates a definition only, not company rows. Add the returned type to a metric template to request it from companies. Ownership is derived from the API key user. Numeric, ranged numeric and option metrics are supported; formulas are not.",
      "exampleCall": "client.metrics.createType({ name: 'example', valueType: \"numeric\", aggMethod: \"SUM\", summaryAggregationMethods: [\"SUM\"] })",
      "responseType": "MetricsCreateTypeResponse",
      "pathParams": [],
      "queryParams": []
    },
    "writePointsBatch": {
      "method": "PUT",
      "path": "/metrics/points",
      "summary": "Deprecated: upsert points for existing metrics across multiple companies",
      "description": "@deprecated Use metrics.import; this operation will be removed in a future release.\n\nDeprecated; retained for compatibility and scheduled for future removal. Prefer metrics.import. For existing-row upserts use onConflict=overwrite and provisionMissing=false. Import writes immediately; requires metrics:write, metric-types:read and metric-templates:read; uses period-start dates; returns per-item results and can partially succeed, so inspect success and item statuses. This endpoint retains its existing behavior: companies contains companyId, native currency and metric items selected by type id or exact name/shortName, optionally flavor actual/forecast/budget. Upserts replace existing values. Returns company, metric and point counts. Does not create metric types, rows or template requests; missing rows return 404. VC API-key callers only; metrics:write and metric-value edit access are required for every company. Non-managed companies must explicitly grant investor metric editing. All access, currencies, rows and values are checked before writes begin. Limits: 100 companies, 50 items per company, 1000 items and 10000 points total, 250 points per item. Duplicate companies/rows/periods are rejected. Set exactly one of value or optionValue and the other to null. No deletion or FX conversion. Unexpected persistence failures may leave earlier companies written; replaying the same values is safe.",
      "exampleCall": "client.metrics.writePointsBatch({ companies: [{ companyId: 123, currency: 'USD', items: [{ points: [{ date: '2024-12-31', value: 123, optionValue: null, timeframe: \"Month\" }] }] }] })",
      "responseType": "MetricsWritePointsBatchResponse",
      "pathParams": [],
      "queryParams": []
    },
    "writePoints": {
      "method": "PUT",
      "path": "/metrics/:metricId/points",
      "summary": "Upsert metric points",
      "description": "Writes points for one metric instance. Requires metric-value edit access; non-managed companies must explicitly grant investor metric editing. Set exactly one of value or optionValue according to the metric type and set the other field to null.",
      "exampleCall": "client.metrics.writePoints(123, { points: [{ date: '2024-12-31', value: 123, optionValue: null, timeframe: \"Month\" }] })",
      "responseType": "MetricsWritePointsResponse",
      "pathParams": [
        {
          "name": "metricId",
          "type": "number",
          "description": null
        }
      ],
      "queryParams": []
    },
    "deletePoints": {
      "method": "DELETE",
      "path": "/metrics/:metricId/points",
      "summary": "Delete selected metric points",
      "description": "Deletes stored points identified by exact date and timeframe for one metric instance. Missing points are a no-op. Requires metric-value edit access; non-managed companies must explicitly grant investor metric editing. Does not delete the metric row, metric type, template entry, or underlying points of calculated aggregates. Calculated values may still appear on reads when other stored points can be aggregated. Returns remaining stored points within the requested date bounds.",
      "exampleCall": "client.metrics.deletePoints(123, { points: [{ date: '2024-12-31', timeframe: \"Month\" }] })",
      "responseType": "MetricsDeletePointsResponse",
      "pathParams": [
        {
          "name": "metricId",
          "type": "number",
          "description": null
        }
      ],
      "queryParams": []
    },
    "search": {
      "method": "POST",
      "path": "/metrics",
      "summary": "Read metric values for accessible companies, grouped by company",
      "description": "Row existence does not imply a current investor request: removing template targeting preserves reported data. Use metricTemplates.get and its company/group targeting to inspect request state; entries outside full targeting visibility are omitted, so absence from a restricted template response is not proof of no request. Returns metric data points for companies the caller can access (companies in the caller's VC group portfolio, or the caller's own company for company users). Each entry carries company and metric type references with id and human-readable name. Each point carries both `value` (number, for `valueType === \"numeric\"`, including ranged numerics constrained by the type's `rangeConfig`) and `optionValue` (string, for `valueType === \"option\"`, matching one of `metricType.optionConfig.options[].value` — this is how boolean/yes-no metrics report their reading); read whichever matches the metric type's `valueType`. Each entry embeds a metric type *summary* (id, name, shortName, valueType, unit, plus option/range config when relevant); the full definition lives on /metrics/types. Filter by company id, company name substring (`companyNameSearch`), company group, metric type id, metric type name (`metricTypeNames` — case-insensitive exact match on either the full name or the `shortName`, so \"MRR\" and \"MRR - Monthly Recurring Revenue\" both work), timeframe, and date range to narrow the response. Pass `currency` (ISO 4217) to FX-convert monetary metrics to that target currency in one call instead of fetching company currencies separately. Use `pointLimit` to keep only the most recent N points per metric (`pointLimit: 1` = latest dated point; set `to` to today to exclude future values) — without it every historical point is returned, which can be very large across a portfolio. Entries are ordered by company id ascending — one entry per company, so `limit` pages whole companies, never partial metric lists.",
      "exampleCall": "client.metrics.search({})",
      "responseType": "MetricsSearchResponse",
      "pathParams": [],
      "queryParams": []
    },
    "compare": {
      "method": "POST",
      "path": "/metrics/compare",
      "summary": "Compare metrics across companies",
      "description": "Returns date-aligned rows for one or more metric types across multiple companies. Select metric types with `metricTypeIds` and/or `metricTypeNames` (case-insensitive exact match on name or `shortName`, e.g. \"MRR\"); several metrics are compared in a single round trip, one entry per metric type in `metricTypeIds` order; name-only selections follow catalogue order. Each row contains one value per company for a given period. Optionally includes period-over-period percentage change. Use `companyIds`, `companyNameSearch`, or `companyGroupIds` to select companies.",
      "exampleCall": "client.metrics.compare({})",
      "responseType": "MetricsCompareResponse",
      "pathParams": [],
      "queryParams": []
    },
    "aggregate": {
      "method": "POST",
      "path": "/metrics/aggregate",
      "summary": "Aggregate metrics across portfolio companies",
      "description": "Returns aggregated metric values (SUM, AVG, MEDIAN, MIN, MAX, COUNT) across companies for each reporting period. Select metric types with `metricTypeIds` and/or `metricTypeNames` (case-insensitive exact match on name or `shortName`, e.g. \"MRR\"). Optionally group results by fund (`companyGroupId`) for fund-level breakdowns. MIN, MAX, and COUNT are always computed. SUM, AVG, and MEDIAN are only produced when the metric type enables them in its `summaryAggregationMethods` configuration; otherwise `point.value` is `null` for that aggregation. Every requested metric type the caller can access yields one entry (per fund when grouped) — with an empty `points` array when none of the selected companies has a value for it, so \"no data\" is explicit rather than a missing row. Ids that match no accessible metric type produce no entry. Select companies with `companyIds`, `companyNameSearch`, or `companyGroupIds`; when those select no company at all the response is an empty list. Ordered by fund id, then in the order the metric types were requested (`metricTypeIds` order; name-resolved types follow the catalogue order).",
      "exampleCall": "client.metrics.aggregate({ aggregation: \"SUM\" })",
      "responseType": "MetricsAggregateResponse",
      "pathParams": [],
      "queryParams": []
    },
    "import": {
      "method": "POST",
      "path": "/metrics/import",
      "summary": "Import metrics across many companies in one call",
      "description": "Preferred multi-company write operation. Every item supplies exactly one of metricTypeId, metricTypeName or createType; never combine selectors. provisionMissing defaults to true; set false for existing-row-only writes. For migration from writePointsBatch use onConflict=overwrite and provisionMissing=false, then handle per-item statuses. Requires metric-value edit access for every company; non-managed companies must explicitly grant investor metric editing. This grant only permits point values, not provisioning metric rows or changing templates. Writes immediately; there is no preview mode. Import a fund in one request: companies contains up to 100 companies, each with its native currency and up to 50 metric items; maximum 1000 items and 10000 points overall. Resolve types by id or exact name, optionally create custom definitions, request missing rows through the VC template, and write actual/forecast/budget points. No instance-id discovery needed. Rejects conflicting stored values unless overwrite is explicit. Access and currency are validated for all companies before writes. Results follow input order and return counts and ids, never point echoes. Each item is atomic; failed items roll back their database changes. The batch can partially succeed: check success and item statuses. Existing targeting is preserved. Dynamic scopes: metric-types:write for type creation, metric-templates:write for template changes. Replays reuse compatible types and skip identical points. Template changes can notify companies after commit; forecast/budget flags affect existing targets and require full targeting access. Dates are period starts. No formulas or forecast intervals.",
      "exampleCall": "client.metrics.import({ companies: [{ companyId: 123, currency: 'USD', items: [{ points: [{ date: '2024-12-31', value: 123, optionValue: null, timeframe: \"Month\" }] }] }] })",
      "responseType": "MetricsImportResponse",
      "pathParams": [],
      "queryParams": []
    },
    "getTypeUsage": {
      "method": "GET",
      "path": "/metrics/types/:metricTypeId/usage",
      "summary": "Get custom metric type usage",
      "description": "Returns template usage and accessible companies with rows referencing this VC-owned custom type. Inaccessible company details are never returned. Deletion checks all references, including those outside the caller visibility.",
      "exampleCall": "client.metrics.getTypeUsage(123)",
      "responseType": "MetricsGetTypeUsageResponse",
      "pathParams": [
        {
          "name": "metricTypeId",
          "type": "number",
          "description": null
        }
      ],
      "queryParams": []
    },
    "deleteType": {
      "method": "DELETE",
      "path": "/metrics/types/:metricTypeId",
      "summary": "Delete an unused custom metric type",
      "description": "Deletes a VC-owned custom definition only when no company row or template entry references it. Returns 409 when in use. Does not cascade-delete company data or templates. Predefined types cannot be deleted.",
      "exampleCall": "client.metrics.deleteType(123)",
      "responseType": "MetricsDeleteTypeResponse",
      "pathParams": [
        {
          "name": "metricTypeId",
          "type": "number",
          "description": null
        }
      ],
      "queryParams": []
    },
    "delete": {
      "method": "DELETE",
      "path": "/metrics/:metricId",
      "summary": "Delete a company metric row and its data",
      "description": "Destructively deletes the company row and all child forecast/budget rows and points. Requires company metric DELETE permission and rejects rows or children still requested by any investor with 409. Remove template requests first. Does not delete the metric type or edit a template. Missing rows return 404.",
      "exampleCall": "client.metrics.delete(123)",
      "responseType": "MetricsDeleteResponse",
      "pathParams": [
        {
          "name": "metricId",
          "type": "number",
          "description": null
        }
      ],
      "queryParams": []
    }
  },
  "metricTemplates": {
    "get": {
      "method": "GET",
      "path": "/metrics/templates",
      "summary": "Get the VC metric template",
      "description": "Use template targeting to determine which metrics are currently requested from a company. A company row may remain after a request is removed; row existence alone is not request state. Returns the caller VC template and entries whose complete targeting is accessible. Entries define requested metric types, company/group filters and forecast/budget rows. An entry hidden due to wider targeting cannot be replaced by creating another entry for the same type.",
      "exampleCall": "client.metricTemplates.get()",
      "responseType": "MetricTemplatesGetResponse",
      "pathParams": [],
      "queryParams": []
    },
    "createEntry": {
      "method": "POST",
      "path": "/metrics/templates/:templateId/entries",
      "summary": "Request a metric through the VC template",
      "description": "Creates company metric rows or links existing rows for matching companies, and synchronizes forecast/budget requests. May notify companies. Selectors are OR-combined. Duplicate type entries return 409, never replace existing targeting. all targets the entire VC portfolio and requires a VC admin. Does not write point values.",
      "exampleCall": "client.metricTemplates.createEntry('123', { metricTypeId: 123, hasForecast: true, hasBudget: true, companyFilter: [{ type: \"all\" }] })",
      "responseType": "MetricTemplatesCreateEntryResponse",
      "pathParams": [
        {
          "name": "templateId",
          "type": "string",
          "description": null
        }
      ],
      "queryParams": []
    },
    "updateEntry": {
      "method": "PUT",
      "path": "/metrics/templates/:templateId/entries/:entryId",
      "summary": "Update a metric template entry",
      "description": "Replaces targeting and requested forecast/budget flags. Requires access to both old and new targets. Keep metricTypeId unchanged. Removing companies stops requesting the metric; stored data is preserved. Does not change metric points or the custom type definition.",
      "exampleCall": "client.metricTemplates.updateEntry('123', '123', { metricTypeId: 123, hasForecast: true, hasBudget: true, companyFilter: [{ type: \"all\" }] })",
      "responseType": "MetricTemplatesUpdateEntryResponse",
      "pathParams": [
        {
          "name": "templateId",
          "type": "string",
          "description": null
        },
        {
          "name": "entryId",
          "type": "string",
          "description": null
        }
      ],
      "queryParams": []
    },
    "deleteEntry": {
      "method": "DELETE",
      "path": "/metrics/templates/:templateId/entries/:entryId",
      "summary": "Stop requesting a metric through the template",
      "description": "Removes the template entry and unlinks this VC from matching company metrics and their forecast/budget rows. Preserves stored actual, forecast and budget data and other investors requests. Empty, unrequested rows may be removed. Does not delete the metric type. Use metrics.delete only for explicit data deletion.",
      "exampleCall": "client.metricTemplates.deleteEntry('123', '123')",
      "responseType": "MetricTemplatesDeleteEntryResponse",
      "pathParams": [
        {
          "name": "templateId",
          "type": "string",
          "description": null
        },
        {
          "name": "entryId",
          "type": "string",
          "description": null
        }
      ],
      "queryParams": []
    }
  },
  "companyReports": {
    "list": {
      "method": "GET",
      "path": "/company-reports",
      "summary": "List published company reports accessible to the caller (metadata only)",
      "description": "Returns lightweight report metadata (id, title, period, publisher company reference). Use GET /company-reports/:id to fetch the full content of a specific report. Visibility is determined by the caller's roles — VC users see reports for managed-portfolio companies, company employees see their own company's reports, portfolio investors see Published reports shared with their visibility groups. Filters narrow the list by company ids, funds (`companyGroupIds`), company name substring (`companyNameSearch`), and reporting period (timeframe + date range). Ordered by reporting period date descending, then id descending by default. Use `sortBy: publishedAt` and `limit: 1` for the most recently published report; publication order can differ from period order.",
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
          "description": "Opaque cursor from a previous response's `meta.nextCursor`. Repeat the original filters and pass nextCursor as cursor; limit can be omitted because the cursor carries its page size. Valid solely for the endpoint, filters, and caller that produced it — change any of them and you get 422; start again without a cursor. Paging reflects the data as of each request, so rows added or removed mid-walk can shift positions."
        },
        {
          "name": "sortBy",
          "required": false,
          "type": "\"date\" | \"publishedAt\"",
          "description": "Descending sort, with report id descending as a tiebreaker and missing dates last. date (default) is the reporting period; publishedAt is the publication timestamp. Use publishedAt with limit: 1 for the most recently published report."
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

function createProfilesNamespace(request) {
  return {
    getConfig: (query = {}, init = {}) => request({ method: "GET", path: "/profiles/config", pathParams: undefined, query: query, body: undefined, signal: init.signal }),
    list: (query = {}, init = {}) => request({ method: "GET", path: "/profiles", pathParams: undefined, query: query, body: undefined, signal: init.signal }),
    create: (body, init = {}) => request({ method: "POST", path: "/profiles", pathParams: undefined, query: undefined, body: body, signal: init.signal }),
    getOne: (id, query = {}, init = {}) => request({ method: "GET", path: "/profiles/:id", pathParams: { id }, query: query, body: undefined, signal: init.signal }),
    update: (id, body, init = {}) => request({ method: "PATCH", path: "/profiles/:id", pathParams: { id }, query: undefined, body: body, signal: init.signal }),
    delete: (id, query = {}, init = {}) => request({ method: "DELETE", path: "/profiles/:id", pathParams: { id }, query: query, body: undefined, signal: init.signal }),
    prepareAvatarUpload: (id, body, init = {}) => request({ method: "POST", path: "/profiles/:id/avatar/uploads", pathParams: { id }, query: undefined, body: body, signal: init.signal }),
    completeAvatarUpload: (id, body, init = {}) => request({ method: "POST", path: "/profiles/:id/avatar/uploads/complete", pathParams: { id }, query: undefined, body: body, signal: init.signal }),
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
    createType: (body, init = {}) => request({ method: "POST", path: "/metrics/types", pathParams: undefined, query: undefined, body: body, signal: init.signal }),
    writePointsBatch: (body, init = {}) => request({ method: "PUT", path: "/metrics/points", pathParams: undefined, query: undefined, body: body, signal: init.signal }),
    writePoints: (metricId, body, init = {}) => request({ method: "PUT", path: "/metrics/:metricId/points", pathParams: { metricId }, query: undefined, body: body, signal: init.signal }),
    deletePoints: (metricId, body, init = {}) => request({ method: "DELETE", path: "/metrics/:metricId/points", pathParams: { metricId }, query: undefined, body: body, signal: init.signal }),
    search: (body, init = {}) => request({ method: "POST", path: "/metrics", pathParams: undefined, query: undefined, body: body, signal: init.signal }),
    compare: (body, init = {}) => request({ method: "POST", path: "/metrics/compare", pathParams: undefined, query: undefined, body: body, signal: init.signal }),
    aggregate: (body, init = {}) => request({ method: "POST", path: "/metrics/aggregate", pathParams: undefined, query: undefined, body: body, signal: init.signal }),
    import: (body, init = {}) => request({ method: "POST", path: "/metrics/import", pathParams: undefined, query: undefined, body: body, signal: init.signal }),
    getTypeUsage: (metricTypeId, init = {}) => request({ method: "GET", path: "/metrics/types/:metricTypeId/usage", pathParams: { metricTypeId }, query: undefined, body: undefined, signal: init.signal }),
    deleteType: (metricTypeId, init = {}) => request({ method: "DELETE", path: "/metrics/types/:metricTypeId", pathParams: { metricTypeId }, query: undefined, body: undefined, signal: init.signal }),
    delete: (metricId, init = {}) => request({ method: "DELETE", path: "/metrics/:metricId", pathParams: { metricId }, query: undefined, body: undefined, signal: init.signal }),
  }
}

function createMetricTemplatesNamespace(request) {
  return {
    get: (init = {}) => request({ method: "GET", path: "/metrics/templates", pathParams: undefined, query: undefined, body: undefined, signal: init.signal }),
    createEntry: (templateId, body, init = {}) => request({ method: "POST", path: "/metrics/templates/:templateId/entries", pathParams: { templateId }, query: undefined, body: body, signal: init.signal }),
    updateEntry: (templateId, entryId, body, init = {}) => request({ method: "PUT", path: "/metrics/templates/:templateId/entries/:entryId", pathParams: { templateId, entryId }, query: undefined, body: body, signal: init.signal }),
    deleteEntry: (templateId, entryId, init = {}) => request({ method: "DELETE", path: "/metrics/templates/:templateId/entries/:entryId", pathParams: { templateId, entryId }, query: undefined, body: undefined, signal: init.signal }),
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
    profiles: createProfilesNamespace(request),
    companies: createCompaniesNamespace(request),
    companyGroups: createCompanyGroupsNamespace(request),
    positions: createPositionsNamespace(request),
    transactions: createTransactionsNamespace(request),
    metrics: createMetricsNamespace(request),
    metricTemplates: createMetricTemplatesNamespace(request),
    companyReports: createCompanyReportsNamespace(request),
  }
}

export { routeManifest }
