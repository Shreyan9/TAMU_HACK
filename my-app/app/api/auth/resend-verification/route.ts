import { NextResponse } from 'next/server'
import { resendVerificationEmail } from '@/lib/emailVerification'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = body?.email
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const result = await resendVerificationEmail(email)
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
