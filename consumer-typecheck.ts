import { createEmbedClient, type CompaniesGetAllResponse } from './packages/embed/dist/index.js'
import { createClient, type RunditClient } from './packages/client/dist/index.js'

const embedClient = createEmbedClient({
  baseUrl: 'https://test.rundit.com/api/v2/sdk',
  token: 'embed-token',
})

const apiKeyClient: RunditClient = createClient({
  baseUrl: 'https://test.rundit.com/api/v2/sdk',
  apiKey: 'rdt_ten_example',
})

async function main() {
  const response: CompaniesGetAllResponse = await embedClient.companies.getAll()
  const firstCompany = response.data[0]
  const nextCursor: string | null = response.meta.nextCursor
  void nextCursor

  if (firstCompany) {
    const details = await embedClient.companies.getOne(firstCompany.id)
    console.log(details.name)
  }

  const apiKeyCompanies = await apiKeyClient.companies.getAll()
  if (apiKeyCompanies.data[0]) {
    await apiKeyClient.positions.getPortfolioPositions({ currency: 'USD' })
  }

  // POST /metrics now accepts a typed body; empty body sends no filters.
  await apiKeyClient.metrics.search({})
  await apiKeyClient.metrics.search({
    companyIds: [1, 2],
    timeframe: 'Quarter',
    from: '2024-01-01',
  })
}

void main()
