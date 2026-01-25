import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { auth0 } from './lib/auth0';

export async function middleware(request: NextRequest) {
  try {
    // Ensure the request URL is valid and absolute
    if (!request.url || !request.nextUrl) {
      console.error('Invalid request URL:', request.url);
      return NextResponse.next();
    }

    // Validate environment variables are set
    if (!process.env.AUTH0_DOMAIN || !process.env.APP_BASE_URL) {
      console.error('Missing Auth0 environment variables');
      return NextResponse.next();
    }

    return await auth0.middleware(request);
  } catch (error) {
    console.error('Auth0 middleware error:', error);
    // If middleware fails, continue without authentication
    // This allows the app to work even if Auth0 has issues
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
