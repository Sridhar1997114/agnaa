import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'downloads', 'AGNAA_Official_Invoice_EnthalpyLabs.pdf');
    if (!fs.existsSync(filePath)) {
      return new NextResponse('Invoice PDF not found', { status: 404 });
    }
    const fileBuffer = fs.readFileSync(filePath);
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="AGNAA_Official_Invoice_EnthalpyLabs.pdf"',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
