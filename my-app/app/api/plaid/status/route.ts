import { NextResponse } from 'next/server'
import { auth0 } from '@/lib/auth0'
import { hasLinkedAccount } from '@/lib/plaid'

export async function GET() {
  try {
    const session = await auth0.getSession()
    if (!session?.user?.sub) {
      return NextResponse.json({ linked: false }, { status: 200 })
    }
    const linked = hasLinkedAccount(session.user.sub)
    return NextResponse.json({ linked })
  } catch {
    return NextResponse.json({ linked: false }, { status: 200 })
  }
}
