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

  // 1. Strict Subdomain Enforcement for Agnaa Intelligence
  if (pathname.startsWith('/agnaa-intelligence')) {
    // If on main domain, redirect to the AI subdomain
    if (!hostname.startsWith('ai.')) {
      return NextResponse.redirect(new URL('https://ai.agnaa.in', request.url));
    }
    // If on the AI subdomain but using the internal path, redirect to root for a clean URL
    if (pathname === '/agnaa-intelligence') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // 2. Rewrite root of AI subdomain to internal page
  if (hostname.startsWith('ai.agnaa.in') || hostname.startsWith('ai.localhost')) {
    if (pathname === '/') {
      return NextResponse.rewrite(new URL('/agnaa-intelligence', request.url));
    }
  }

  // Handle redirects for broken/legacy links
  if (pathname === '/construction-cost' || pathname === '/calculators') {
    return NextResponse.redirect(new URL('/calc', request.url));
  }
  
  if (pathname === '/cost' && !hostname.startsWith('cost.agnaa.in')) {
    // Optionally redirect /cost to /calc if calc is the primary tool
    // For now, let's just fix the 404s the user saw.
    return NextResponse.redirect(new URL('/calc', request.url));
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
