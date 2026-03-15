import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { hasLinkedAccount } from '@/lib/plaid'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ linked: false }, { status: 200 })
    }
    const linked = await hasLinkedAccount(session.user.id)
    return NextResponse.json({ linked })
  } catch {
    return NextResponse.json({ linked: false }, { status: 200 })
  }
}
