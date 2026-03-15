import { Configuration, PlaidApi, PlaidEnvironments, Products, CountryCode } from 'plaid'
import { getDb, PLAID_LINKS_COLLECTION } from './mongodb'

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

  const db = await getDb()
  const col = db.collection(PLAID_LINKS_COLLECTION)
  await col.updateOne(
    { userId },
    {
      $set: {
        accessToken,
        accountId: account.account_id,
        itemId: exchangeResponse.data.item_id,
        updatedAt: new Date(),
      },
    },
    { upsert: true }
  )
}

export async function getAccessToken(userId: string): Promise<{ accessToken: string; accountId: string } | null> {
  const db = await getDb()
  const doc = await db.collection(PLAID_LINKS_COLLECTION).findOne({ userId })
  if (!doc?.accessToken) return null
  return { accessToken: doc.accessToken, accountId: doc.accountId }
}

export async function hasLinkedAccount(userId: string): Promise<boolean> {
  const stored = await getAccessToken(userId)
  return !!stored
}

export async function fetchTransactions(userId: string, startDate: string, endDate: string) {
  const stored = await getAccessToken(userId)
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
