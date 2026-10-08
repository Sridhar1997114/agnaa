import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Direct to authoritative full codex ingestion feed
  return NextResponse.redirect(new URL('/llms-full.txt', request.url), 301);
}
