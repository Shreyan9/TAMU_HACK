import { NextResponse } from 'next/server'
import { auth0 } from '@/lib/auth0'
import { exchangePublicToken } from '@/lib/plaid'

export async function POST(request: Request) {
  try {
    const session = await auth0.getSession()
    if (!session?.user?.sub) {
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

    await exchangePublicToken(publicToken, session.user.sub)
    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    console.error('Error exchanging token:', error)
    const message = error instanceof Error ? error.message : 'Failed to link account'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
