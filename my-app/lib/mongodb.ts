import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
if (!uri) {
  throw new Error('Missing MONGODB_URI in environment')
}

const client = new MongoClient(uri)
export const clientPromise = client.connect()

const DB_NAME = 'finsight'

export async function getDb() {
  const c = await clientPromise
  return c.db(DB_NAME)
}

export const USERS_COLLECTION = 'users'
export const PLAID_LINKS_COLLECTION = 'plaid_links'
