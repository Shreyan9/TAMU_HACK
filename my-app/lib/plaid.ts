import { Configuration, PlaidApi, PlaidEnvironments, Products, CountryCode } from 'plaid'

// In-memory store for Plaid access tokens (keyed by Auth0 user sub)
// Replace with a database (e.g. Vercel Postgres, Supabase) for production
const accessTokenStore = new Map<string, { accessToken: string; accountId: string }>()

function getPlaidClient() {
  const clientId = process.env.PLAID_CLIENT_ID
  const secret = process.env.PLAID_SECRET

  if (!clientId || !secret) {
    throw new Error('PLAID_CLIENT_ID and PLAID_SECRET must be set in .env')
  }

  const configuration = new Configuration({
    basePath: PlaidEnvironments[process.env.PLAID_ENV === 'production' ? 'production' : 'sandbox'],
    baseOptions: {
      headers: {
        'PLAID-CLIENT-ID': clientId,
        'PLAID-SECRET': secret,
      },
    },
  })

  return new PlaidApi(configuration)
}

export async function createLinkToken(userId: string): Promise<string> {
  const client = getPlaidClient()
  const response = await client.linkTokenCreate({
    user: { client_user_id: userId },
    client_name: 'FinSight',
    products: [Products.Transactions],
    country_codes: [CountryCode.Us],
    language: 'en',
  })
  return response.data.link_token
}

export async function exchangePublicToken(publicToken: string, userId: string): Promise<void> {
  const client = getPlaidClient()
  const exchangeResponse = await client.itemPublicTokenExchange({
    public_token: publicToken,
  })

  const accessToken = exchangeResponse.data.access_token

  const accountsResponse = await client.accountsGet({
    access_token: accessToken,
  })

  const accounts = accountsResponse.data.accounts || []
  const account = accounts.find(
    (a) => a.type === 'depository' || a.type === 'credit'
  ) || accounts[0]

  if (!account) {
    throw new Error('No accounts found')
  }

  accessTokenStore.set(userId, {
    accessToken,
    accountId: account.account_id,
  })
}

export function getAccessToken(userId: string): { accessToken: string; accountId: string } | null {
  return accessTokenStore.get(userId) || null
}

export function hasLinkedAccount(userId: string): boolean {
  return accessTokenStore.has(userId)
}

export async function fetchTransactions(userId: string, startDate: string, endDate: string) {
  const stored = getAccessToken(userId)
  if (!stored) {
    throw new Error('No bank account linked. Please connect your bank first.')
  }

  const client = getPlaidClient()
  const response = await client.transactionsGet({
    access_token: stored.accessToken,
    start_date: startDate,
    end_date: endDate,
    options: { account_ids: [stored.accountId] },
  })

  return response.data.transactions || []
}
