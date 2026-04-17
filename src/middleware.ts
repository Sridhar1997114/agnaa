import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateSession } from './lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;

  // Check if the request is coming from the 'pro' subdomain
  if (hostname.startsWith('pro.agnaa.in') || hostname.startsWith('pro.localhost')) {
    if (pathname === '/') {
      return NextResponse.rewrite(new URL('/pro', request.url));
    }
  }

  // Auth Protection for /app and /admin routes
  if (pathname.startsWith('/app') || pathname.startsWith('/admin') || pathname.startsWith('/pro')) {
    const { response, user } = await updateSession(request);
    
    // Allow login page access
    if (pathname === '/login' || pathname === '/pro/login') {
      if (user) {
        // Redirect based on role if logged in
        const supabase = await updateSession(request); // Refresh user state
        // In a real scenario, we might want to check the profile role here,
        // but for middleware, just redirecting to /app or /admin is enough if logged in.
        return NextResponse.redirect(new URL('/app', request.url));
      }
      return response;
    }

    // Protect all other secured routes
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    return response;
  }

  // Redirect /pro to pro.agnaa.in if accessed directly
  if (pathname.startsWith('/pro') && !hostname.startsWith('pro.') && !hostname.includes('localhost')) {
    return NextResponse.redirect(new URL('https://pro.agnaa.in', request.url));
  }

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

  // Check if the request is coming from the 'brand' subdomain
  if (hostname.startsWith('brand.enthalpylabs.com') || hostname.startsWith('brand.localhost')) {
    if (pathname === '/') {
      return NextResponse.rewrite(new URL('/brand', request.url));
    }
  }

  // Check if the request is coming from the 'client' subdomain
  if (hostname.startsWith('client.agnaa.in') || hostname.startsWith('client.localhost') || hostname.startsWith('clients.agnaa.in')) {
    if (pathname === '/') {
      return NextResponse.rewrite(new URL('/clients', request.url));
    }
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
