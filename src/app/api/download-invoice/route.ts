import { NextResponse } from 'next/server';
import { INVOICE_PDF_BASE64 } from './pdf-data';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const fileBuffer = Buffer.from(INVOICE_PDF_BASE64, 'base64');
    
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="AGNAA_Official_Invoice_EnthalpyLabs.pdf"',
        'Content-Length': fileBuffer.length.toString(),
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    console.error('Error serving invoice PDF:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
