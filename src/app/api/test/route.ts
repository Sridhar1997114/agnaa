import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ status: 'API is operational', timestamp: new Date().toISOString() });
}

export async function POST(req: NextRequest) {
  return NextResponse.json({ status: 'POST received' });
}
