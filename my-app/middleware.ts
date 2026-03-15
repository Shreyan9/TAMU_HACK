import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Auth is enforced in dashboard and wrapped pages via getServerSession + redirect.
// Middleware no longer blocks /dashboard or /wrapped to avoid getToken issues in Edge.
export function middleware(_request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
