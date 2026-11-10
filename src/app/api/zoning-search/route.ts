import { NextRequest, NextResponse } from 'next/server';

function safeHostname(rawUrl: string | undefined | null): string {
  if (!rawUrl) return 'Govt Portal';
  try {
    const parsed = new URL(rawUrl);
    return parsed.hostname.replace(/^www\./, '');
  } catch {
    return 'Govt Portal';
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const query = body?.query;

    if (!query || typeof query !== 'string' || !query.trim()) {
      return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    const trimmedQuery = query.trim().slice(0, 300);

    const apiKey = process.env.OCTEN_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ 
        error: 'OCTEN_API_KEY is not configured on the server' 
      }, { status: 500 });
    }

    // Call Octen.ai real-time search API with an 8-second timeout
    const octenResponse = await fetch('https://api.octen.ai/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': apiKey,
      },
      body: JSON.stringify({
        query: `${trimmedQuery} Telangana Hyderabad GHMC TG-bPASS NBC 2026`,
        count: 4,
        search_type: 'auto',
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!octenResponse.ok) {
      return NextResponse.json({ 
        error: `Octen statutory retrieval upstream returned status ${octenResponse.status}`
      }, { status: 502 });
    }

    const octenData = await octenResponse.json();
    const results = octenData?.data?.results || [];

    // Map into clean structured citations for AGNAA
    const formattedCitations = results.map((r: any) => ({
      title: r.title || 'Statutory Gazette Reference',
      url: r.url || '',
      snippet: r.highlight || r.snippet || '',
      sourceDomain: r.domain || safeHostname(r.url),
    }));

    return NextResponse.json({
      success: true,
      query: trimmedQuery,
      timestamp: new Date().toISOString(),
      citations: formattedCitations,
    });
  } catch (error: any) {
    if (error?.name === 'TimeoutError') {
      return NextResponse.json({ 
        error: 'Statutory search timed out after 8 seconds' 
      }, { status: 504 });
    }

    return NextResponse.json({ 
      error: 'Failed to execute real-time statutory search'
    }, { status: 500 });
  }
}
