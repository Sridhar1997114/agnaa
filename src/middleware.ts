import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SESSION_COOKIE = "el-pro-session";

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;

  // ─── PRO Subdomain Routing ─────────────────────────────────────────────────
  if (hostname.startsWith('pro.agnaa.in') || hostname.startsWith('pro.localhost')) {
    if (pathname === '/') {
      return NextResponse.rewrite(new URL('/pro', request.url));
    }
  }

  // ─── PRO Auth Protection (cookie-based, no Supabase) ──────────────────────
  if (pathname.startsWith('/pro')) {
    const session = request.cookies.get(SESSION_COOKIE);
    const isLoginPage = pathname === '/pro/login';

    if (isLoginPage) {
      // If already logged in, redirect to dashboard
      if (session?.value) {
        return NextResponse.redirect(new URL('/pro', request.url));
      }
      return NextResponse.next();
    }

    // All other /pro/* routes require a valid session
    if (!session?.value) {
      return NextResponse.redirect(new URL('/pro/login', request.url));
    }

    return NextResponse.next();
  }

  // ─── Shop Subdomain ────────────────────────────────────────────────────────
  if (hostname.startsWith('shop.agnaa.in') || hostname.startsWith('shop.localhost')) {
    if (pathname === '/') {
      return NextResponse.rewrite(new URL('/shop', request.url));
    }
  }

  if (pathname.startsWith('/shop') && !hostname.startsWith('shop.') && !hostname.includes('localhost')) {
    return NextResponse.redirect(new URL('https://shop.agnaa.in', request.url));
  }

  // ─── Legacy Redirects ──────────────────────────────────────────────────────
  if (pathname === '/construction-cost' || pathname === '/calculators') {
    return NextResponse.redirect(new URL('/calc', request.url));
  }

  if (pathname === '/cost' && !hostname.startsWith('cost.agnaa.in')) {
    return NextResponse.redirect(new URL('/calc', request.url));
  }

  if (pathname === '/construction') {
    return NextResponse.redirect(new URL('/constructions', request.url));
  }

  // ─── Cost Subdomain ────────────────────────────────────────────────────────
  if (hostname.startsWith('cost.agnaa.in')) {
    if (pathname === '/') {
      return NextResponse.rewrite(new URL('/cost', request.url));
    }
  }

  // ─── Agnaa Intelligence / AI Subdomain ────────────────────────────────────
  if (pathname.startsWith('/agnaa-intelligence')) {
    if (!hostname.startsWith('ai.')) {
      return NextResponse.redirect(new URL('https://ai.agnaa.in', request.url));
    }
    if (pathname === '/agnaa-intelligence') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (hostname.startsWith('ai.agnaa.in') || hostname.startsWith('ai.localhost')) {
    if (pathname === '/') {
      return NextResponse.rewrite(new URL('/agnaa-intelligence', request.url));
    }
  }

  // ─── Brand Subdomain ──────────────────────────────────────────────────────
  if (hostname.startsWith('brand.enthalpylabs.com') || hostname.startsWith('brand.localhost')) {
    if (pathname === '/') {
      return NextResponse.rewrite(new URL('/brand', request.url));
    }
  }

  // ─── Client Subdomain ─────────────────────────────────────────────────────
  if (hostname.startsWith('client.agnaa.in') || hostname.startsWith('client.localhost') || hostname.startsWith('clients.agnaa.in')) {
    if (pathname === '/') {
      return NextResponse.rewrite(new URL('/client', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg).*)',
  ],
};
