import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createLinkToken } from '@/lib/plaid'

export async function POST() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const linkToken = await createLinkToken(session.user.id)
    return NextResponse.json({ linkToken })
  } catch (error: unknown) {
    console.error('Error creating link token:', error)
    const message = error instanceof Error ? error.message : 'Failed to create link token'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
