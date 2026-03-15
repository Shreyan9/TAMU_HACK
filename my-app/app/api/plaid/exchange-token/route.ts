import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { exchangePublicToken } from '@/lib/plaid'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { publicToken } = body

    if (!publicToken || typeof publicToken !== 'string') {
      return NextResponse.json(
        { error: 'publicToken is required' },
        { status: 400 }
      )
    }

    await exchangePublicToken(publicToken, session.user.id)
    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    console.error('Error exchanging token:', error)
    const message = error instanceof Error ? error.message : 'Failed to link account'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
