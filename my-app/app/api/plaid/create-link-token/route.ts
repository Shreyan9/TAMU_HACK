import { NextResponse } from 'next/server'
import { auth0 } from '@/lib/auth0'
import { createLinkToken } from '@/lib/plaid'

export async function POST() {
  try {
    const session = await auth0.getSession()
    if (!session?.user?.sub) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const linkToken = await createLinkToken(session.user.sub)
    return NextResponse.json({ linkToken })
  } catch (error: unknown) {
    console.error('Error creating link token:', error)
    const message = error instanceof Error ? error.message : 'Failed to create link token'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
