import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;

  // Check if the request is coming from the 'cost' subdomain
  if (hostname.startsWith('cost.agnaa.in')) {
    // If visiting the root of the subdomain, rewrite to the /cost page invisibly
    if (pathname === '/') {
      return NextResponse.rewrite(new URL('/cost', request.url));
    }
  }

  // Handle redirects for broken/legacy links
  if (pathname === '/construction-cost') {
    return NextResponse.redirect(new URL('/calculators', request.url));
  }
  
  if (pathname === '/cost' && !hostname.startsWith('cost.agnaa.in')) {
    // Optionally redirect /cost to /calculators if calculators is the primary tool
    // For now, let's just fix the 404s the user saw.
    return NextResponse.redirect(new URL('/calculators', request.url));
  }

  if (pathname === '/construction') {
    return NextResponse.redirect(new URL('/constructions', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - any other static assets in public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg).*)',
  ],
};
