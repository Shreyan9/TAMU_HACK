import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getWrappedDataFromPlaid, type WrappedRange } from '@/lib/plaidToWrappedData'
import { hasLinkedAccount } from '@/lib/plaid'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const rangeParam = (searchParams.get('range') as WrappedRange | null) || 'ytd'

    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!(await hasLinkedAccount(session.user.id))) {
      return NextResponse.json(
        { error: 'No bank account linked. Connect your bank in the dashboard first.' },
        { status: 400 }
      )
    }

    const data = await getWrappedDataFromPlaid(session.user.id, rangeParam)
    return NextResponse.json(data)
  } catch (error: unknown) {
    console.error('Error generating wrapped data:', error)
    const message = error instanceof Error ? error.message : 'Failed to generate wrapped data'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
