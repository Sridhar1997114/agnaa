import { NextRequest, NextResponse } from 'next/server';
import liveRatesData from '@/data/liveRates.json';

export const revalidate = 3600;

export async function GET(req: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      data: liveRatesData,
      escrowGuarantee: "Zero contractor markup. Direct factory-to-site mill disbursement.",
    });
  } catch (error: any) {
    return NextResponse.json({ 
      error: 'Failed to retrieve live material index',
      details: error.message 
    }, { status: 500 });
  }
}
