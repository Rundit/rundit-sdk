import { createEmbedClient, type PositionsGetPortfolioPositionsQuery } from './packages/embed/dist/index.js'

const client = createEmbedClient({
  baseUrl: 'https://test.rundit.com/api/v2/sdk',
  token: 'embed-token',
})

const query: PositionsGetPortfolioPositionsQuery = {
  companyGroupIds: [1, 2, 3],
  companyIds: [10, 20],
  currency: 'USD',
}

void client.positions.getPortfolioPositions(query)
