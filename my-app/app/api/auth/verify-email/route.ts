import { NextResponse } from 'next/server'
import { verifyEmailToken } from '@/lib/emailVerification'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = (searchParams.get('token') || '').trim()

  const result = await verifyEmailToken(token)

  if (!result.ok) {
    return NextResponse.redirect(
      new URL(`/auth/verify-email?error=${encodeURIComponent(result.error || 'Invalid link')}`, request.url)
    )
  }

  return NextResponse.redirect(new URL('/auth/login?verified=1', request.url))
}
