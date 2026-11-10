import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SESSION_COOKIE = "el-pro-session";

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;

  // ─── 0. Canonical WWW to Non-WWW 301 Permanent Redirect ─────────────
  if (hostname === 'www.agnaa.in' || hostname.startsWith('www.')) {
    const canonicalHost = hostname.replace(/^www\./, '');
    const search = request.nextUrl.search || '';
    return NextResponse.redirect(new URL(`https://${canonicalHost}${pathname}${search}`), 301);
  }

  // Dynamic subdomain path rewriter supporting nested routes
  const rewriteSubdomain = (baseRoute: string) => {
    const targetPath = pathname.startsWith(baseRoute)
      ? pathname
      : pathname === '/'
        ? baseRoute
        : `${baseRoute}${pathname}`;
    return NextResponse.rewrite(new URL(targetPath, request.url));
  };

  // ─── ADMIN Subdomain ────────────────────────────────────────────────
  if (hostname.startsWith('admin.agnaa.in') || hostname.startsWith('admin.localhost')) {
    return rewriteSubdomain('/admin');
  }

  // ─── PRO Subdomain ──────────────────────────────────────────────────
  if (hostname.startsWith('pro.agnaa.in') || hostname.startsWith('pro.localhost')) {
    return rewriteSubdomain('/pro');
  }

  // ─── MAP / GeoGIS Subdomain ─────────────────────────────────────────
  if (hostname.startsWith('map.agnaa.in') || hostname.startsWith('map.localhost')) {
    return rewriteSubdomain('/map');
  }

  // ─── ARC Studio Canvas Subdomain ────────────────────────────────────
  if (hostname.startsWith('arc.agnaa.in') || hostname.startsWith('arc.localhost')) {
    return rewriteSubdomain('/arc');
  }

  // ─── BLOG / Journal Subdomain ───────────────────────────────────────
  if (hostname.startsWith('blog.agnaa.in') || hostname.startsWith('blog.localhost')) {
    return rewriteSubdomain('/blog');
  }

  // ─── CALC / Precision Calculator Subdomain ──────────────────────────
  if (hostname.startsWith('calc.agnaa.in') || hostname.startsWith('calc.localhost')) {
    return rewriteSubdomain('/calc');
  }

  // ─── SEVA / Foundation & Education Subdomain ──────────────────────
  if (
    hostname.startsWith('seva.agnaa.in') || 
    hostname.startsWith('seva.localhost') ||
    hostname.startsWith('edu.agnaa.in') || 
    hostname.startsWith('edu.localhost') ||
    hostname.startsWith('earth.agnaa.in') || 
    hostname.startsWith('earth.localhost')
  ) {
    return rewriteSubdomain('/foundation');
  }

  // ─── PRO Auth Protection (cookie-based) ──────────────────────────────
  if (pathname.startsWith('/pro')) {
    const session = request.cookies.get(SESSION_COOKIE);
    const isLoginPage = pathname === '/pro/login';

    if (isLoginPage) {
      if (session?.value) {
        return NextResponse.redirect(new URL('/pro', request.url));
      }
      return NextResponse.next();
    }

    if (!session?.value) {
      return NextResponse.redirect(new URL('/pro/login', request.url));
    }

    return NextResponse.next();
  }

  // ─── Shop Subdomain ──────────────────────────────────────────────────
  if (hostname.startsWith('shop.agnaa.in') || hostname.startsWith('shop.localhost')) {
    return rewriteSubdomain('/shop');
  }

  if (pathname.startsWith('/shop') && !hostname.startsWith('shop.') && !hostname.includes('localhost')) {
    return NextResponse.redirect(new URL('https://shop.agnaa.in', request.url));
  }

  // ─── Legacy Redirects ────────────────────────────────────────────────
  if (pathname === '/construction-cost' || pathname === '/calculators') {
    return NextResponse.redirect(new URL('/calc', request.url));
  }

  if (pathname === '/cost' && !hostname.startsWith('cost.agnaa.in')) {
    return NextResponse.redirect(new URL('/calc', request.url));
  }

  if (pathname === '/construction') {
    return NextResponse.redirect(new URL('/constructions', request.url));
  }

  // ─── Cost Subdomain ──────────────────────────────────────────────────
  if (hostname.startsWith('cost.agnaa.in')) {
    return rewriteSubdomain('/cost');
  }

  // ─── Agnaa Intelligence / AI Subdomain ──────────────────────────────
  if (pathname.startsWith('/agnaa-intelligence')) {
    if (!hostname.startsWith('ai.')) {
      return NextResponse.redirect(new URL('https://ai.agnaa.in', request.url));
    }
    if (pathname === '/agnaa-intelligence') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (hostname.startsWith('ai.agnaa.in') || hostname.startsWith('ai.localhost')) {
    return rewriteSubdomain('/agnaa-intelligence');
  }

  // ─── Brand Subdomain ────────────────────────────────────────────────
  if (hostname.startsWith('brand.enthalpylabs.com') || hostname.startsWith('brand.localhost')) {
    return rewriteSubdomain('/brand');
  }

  // ─── Client Subdomain ───────────────────────────────────────────────
  if (hostname.startsWith('client.agnaa.in') || hostname.startsWith('client.localhost') || hostname.startsWith('clients.agnaa.in')) {
    return rewriteSubdomain('/client');
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.webp|.*\\.svg|.*\\.gif|.*\\.mp4|.*\\.pdf).*)',
  ],
};
