import { NextResponse } from 'next/server'
import { auth0 } from '@/lib/auth0'
import { getWrappedDataFromPlaid } from '@/lib/plaidToWrappedData'
import { hasLinkedAccount } from '@/lib/plaid'

export async function GET() {
  try {
    const session = await auth0.getSession()
    if (!session?.user?.sub) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!hasLinkedAccount(session.user.sub)) {
      return NextResponse.json(
        { error: 'No bank account linked. Connect your bank in the dashboard first.' },
        { status: 400 }
      )
    }

    const data = await getWrappedDataFromPlaid(session.user.sub)
    return NextResponse.json(data)
  } catch (error: unknown) {
    console.error('Error generating wrapped data:', error)
    const message = error instanceof Error ? error.message : 'Failed to generate wrapped data'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
