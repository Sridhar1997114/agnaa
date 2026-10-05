import { PDFDocument } from 'pdf-lib';

export interface EstimatePdfData {
  area: number;
  floors: number;
  location: string;
  tier: 'basic' | 'standard' | 'premium';
  tierName: string;
  tierTag: string;
  ratePerSqft: number;
  benchmarkRate: number;
  totalCost: number;
  totalMarketCost: number;
  totalSavings: number;
  savingPercent: string;
  dateStr: string;
  fileDateStr: string;
  refCode: string;
  specs: {
    cement: string;
    steel: string;
    flooring: string;
    bathrooms: string;
    openings: string;
    electrical: string;
    painting: string;
  };
  categoryTotals: Array<{
    category: string;
    sum: number;
    percent: number;
  }>;
  breakdown: Array<{
    id: string;
    label: string;
    category: string;
    qty: number;
    unit: string;
    unitRate: number;
    marketRate: number;
    mktAmt: number;
    agnaaAmt: number;
  }>;
}

// Helper to format Indian currency
function fmtInr(n: number): string {
  return Math.round(n).toLocaleString('en-IN');
}

// Rounded rect helper for Canvas
function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  fill?: string,
  stroke?: string,
  lineWidth: number = 1
) {
  ctx.save();
  ctx.beginPath();
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(x, y, width, height, radius);
  } else {
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }
  ctx.restore();
}

// Draw crisp AGNAA Logo using pure Canvas vector paths
function drawAgnaaLogoVector(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string = '#FFFFFF') {
  ctx.save();
  ctx.translate(x, y);
  const scale = size / 4000;
  ctx.scale(scale, scale);
  ctx.fillStyle = color;

  // Pillar 1
  ctx.beginPath();
  ctx.moveTo(104.5, 3397.1);
  ctx.lineTo(104.5, 1340.9);
  ctx.lineTo(703.1, 1108.1);
  ctx.lineTo(703.1, 3397.1);
  ctx.lineTo(503.5, 3397.1);
  ctx.lineTo(503.5, 2200);
  ctx.lineTo(304, 2200);
  ctx.lineTo(304, 3397.1);
  ctx.closePath();
  ctx.fill();

  // Pillar 2
  ctx.beginPath();
  ctx.moveTo(902.6, 3197.6);
  ctx.lineTo(902.6, 3397.1);
  ctx.lineTo(1501.1, 3397.1);
  ctx.lineTo(1501.1, 797.7);
  ctx.lineTo(902.6, 1030.5);
  ctx.lineTo(902.6, 2200);
  ctx.lineTo(1301.6, 2200);
  ctx.lineTo(1301.6, 3197.6);
  ctx.closePath();
  ctx.fill();

  // Pillar 3 (Apex Tower)
  ctx.beginPath();
  ctx.moveTo(1700.7, 3397.1);
  ctx.lineTo(1900.2, 3397.1);
  ctx.lineTo(1900.2, 856.7);
  ctx.lineTo(1999.9, 817.8);
  ctx.lineTo(2099.7, 856.7);
  ctx.lineTo(2099.7, 3397.1);
  ctx.lineTo(2299.2, 3397.1);
  ctx.lineTo(2299.2, 720.1);
  ctx.lineTo(1999.9, 603.8);
  ctx.lineTo(1700.7, 720.1);
  ctx.closePath();
  ctx.fill();

  // Pillar 4
  ctx.beginPath();
  ctx.moveTo(2498.9, 1011.8);
  ctx.lineTo(2897.9, 1167);
  ctx.lineTo(2897.9, 2000.4);
  ctx.lineTo(2498.9, 2000.4);
  ctx.lineTo(2498.9, 3397.1);
  ctx.lineTo(3097.4, 3397.1);
  ctx.lineTo(3097.4, 1030.5);
  ctx.lineTo(2498.9, 797.7);
  ctx.closePath();
  ctx.fill();

  // Pillar 5
  ctx.beginPath();
  ctx.moveTo(3296.9, 1108.1);
  ctx.lineTo(3895.5, 1340.9);
  ctx.lineTo(3895.5, 3397.1);
  ctx.lineTo(3696, 3397.1);
  ctx.lineTo(3696, 2200);
  ctx.lineTo(3496.5, 2200);
  ctx.lineTo(3496.5, 3397.1);
  ctx.lineTo(3296.9, 3397.1);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

/**
 * Generate Apple-Quality, 100% Unclipped, Single-Page A4 Construction Estimate PDF
 */
export async function generateEstimatePdf(data: EstimatePdfData): Promise<Blob> {
  // A4 dimensions at 300 DPI: 2480 × 3508 pixels
  const CANVAS_WIDTH = 2480;
  const CANVAS_HEIGHT = 3508;
  const MARGIN_X = 100;
  const CONTENT_WIDTH = CANVAS_WIDTH - MARGIN_X * 2; // 2280px

  const canvas = document.createElement('canvas');
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) throw new Error('Could not get 2D context');

  // 1. Crisp white background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Background subtle studio watermark in center
  ctx.save();
  ctx.globalAlpha = 0.025;
  drawAgnaaLogoVector(ctx, CANVAS_WIDTH / 2 - 450, CANVAS_HEIGHT / 2 - 450, 900, '#1C1C72');
  ctx.restore();

  // ─────────────────────────────────────────────────────────────────────────
  // 2. HEADER BANNER (y: 0 -> 240)
  // ─────────────────────────────────────────────────────────────────────────
  const headerGrad = ctx.createLinearGradient(0, 0, CANVAS_WIDTH, 0);
  headerGrad.addColorStop(0, '#1C1C72');
  headerGrad.addColorStop(0.55, '#2A1B81');
  headerGrad.addColorStop(1, '#7B2DBF');
  ctx.fillStyle = headerGrad;
  ctx.fillRect(0, 0, CANVAS_WIDTH, 240);

  // Gold accent line under header
  ctx.fillStyle = '#C445F8';
  ctx.fillRect(0, 236, CANVAS_WIDTH, 4);

  // Left: AGNAA Vector Logo mark
  drawAgnaaLogoVector(ctx, MARGIN_X, 45, 145, '#FFFFFF');

  // Title typography
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 52px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('AGNAA DESIGN STUDIO', MARGIN_X + 175, 115);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.font = '600 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('ARCHITECTURE • STRUCTURAL ENGINEERING • TURNKEY EXECUTION', MARGIN_X + 175, 160);

  // Right: Document Protocol Metadata
  ctx.textAlign = 'right';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.font = '800 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('ESTIMATE PROTOCOL', CANVAS_WIDTH - MARGIN_X, 90);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 36px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(data.dateStr, CANVAS_WIDTH - MARGIN_X, 138);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.font = '700 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(data.refCode, CANVAS_WIDTH - MARGIN_X, 172);
  ctx.textAlign = 'left';

  // ─────────────────────────────────────────────────────────────────────────
  // 3. PROJECT SCOPE BAR (y: 265 -> 405)
  // ─────────────────────────────────────────────────────────────────────────
  const scopeY = 265;
  const scopeH = 140;
  drawRoundedRect(ctx, MARGIN_X, scopeY, CONTENT_WIDTH, scopeH, 20, '#F8FAFC', '#E2E8F0', 2);

  const colW = CONTENT_WIDTH / 4;
  const scopeItems = [
    { label: 'PROJECT LOCATION', value: data.location, sub: 'Micro-Market Logistics' },
    { label: 'BUILT-UP AREA', value: `${fmtInr(data.area)} SQFT`, sub: `${data.floors === 1 ? 'Ground Only' : `G+${data.floors - 1} Floors`}` },
    { label: 'CALIBRATED RATE', value: `₹${fmtInr(data.ratePerSqft)} / SFT`, sub: `${data.tierName.toUpperCase()} TIER` },
    { label: 'ESTIMATE VALIDITY', value: '30 DAYS', sub: 'Price-Lock Guaranteed' }
  ];

  scopeItems.forEach((item, idx) => {
    const itemX = MARGIN_X + idx * colW + 28;
    if (idx > 0) {
      // Divider line
      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(MARGIN_X + idx * colW, scopeY + 20);
      ctx.lineTo(MARGIN_X + idx * colW, scopeY + scopeH - 20);
      ctx.stroke();
    }

    ctx.fillStyle = '#64748B';
    ctx.font = '800 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(item.label, itemX, scopeY + 44);

    ctx.fillStyle = idx === 2 ? '#7B2DBF' : '#1C1C72';
    ctx.font = '900 30px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(item.value, itemX, scopeY + 86);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '600 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(item.sub, itemX, scopeY + 118);
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 4. FINANCIAL HIGHLIGHT CARDS (y: 430 -> 660)
  // ─────────────────────────────────────────────────────────────────────────
  const kpiY = 430;
  const kpiH = 230;
  const cardGap = 28;
  const card1W = 660;
  const card2W = 900;
  const card3W = CONTENT_WIDTH - card1W - card2W - cardGap * 2; // ~664px

  // Card 1: Unit Rate Card
  drawRoundedRect(ctx, MARGIN_X, kpiY, card1W, kpiH, 24, '#FFFFFF', '#E2E8F0', 2);
  ctx.fillStyle = '#64748B';
  ctx.font = '800 19px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('CALIBRATED TURNKEY RATE', MARGIN_X + 32, kpiY + 50);

  ctx.fillStyle = '#1C1C72';
  ctx.font = '900 56px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(`₹${fmtInr(data.ratePerSqft)}`, MARGIN_X + 32, kpiY + 125);

  ctx.fillStyle = '#64748B';
  ctx.font = '700 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('/ SQFT', MARGIN_X + 32 + ctx.measureText(`₹${fmtInr(data.ratePerSqft)}`).width + 12, kpiY + 125);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(`Market Benchmark: ₹${fmtInr(Math.round(data.ratePerSqft * 1.12))}/sft`, MARGIN_X + 32, kpiY + 185);

  // Card 2 (Hero): Total AGNAA Investment
  const heroX = MARGIN_X + card1W + cardGap;
  const heroGrad = ctx.createLinearGradient(heroX, kpiY, heroX + card2W, kpiY + kpiH);
  heroGrad.addColorStop(0, '#1C1C72');
  heroGrad.addColorStop(1, '#7B2DBF');
  drawRoundedRect(ctx, heroX, kpiY, card2W, kpiH, 24, undefined, undefined, 0);
  ctx.save();
  ctx.fillStyle = heroGrad;
  ctx.fill();
  ctx.restore();

  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.font = '800 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('TOTAL TURNKEY AGNAA INVESTMENT', heroX + 40, kpiY + 52);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 68px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(`₹${fmtInr(data.totalCost)}`, heroX + 40, kpiY + 135);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.font = '700 22px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  const inLakhs = (data.totalCost / 100000).toFixed(2);
  ctx.fillText(`≈ ₹${inLakhs} Lakhs • Full Turnkey (Material + Labor + Management)`, heroX + 40, kpiY + 185);

  // Card 3: Guaranteed Direct Savings
  const card3X = heroX + card2W + cardGap;
  drawRoundedRect(ctx, card3X, kpiY, card3W, kpiH, 24, '#F0FDF4', '#BBF7D0', 2);

  ctx.fillStyle = '#15803D';
  ctx.font = '800 19px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('DIRECT CLIENT SAVINGS', card3X + 32, kpiY + 50);

  ctx.fillStyle = '#15803D';
  ctx.font = '900 54px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(`₹${fmtInr(data.totalSavings)}`, card3X + 32, kpiY + 125);

  ctx.fillStyle = '#166534';
  ctx.font = '700 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(`${data.savingPercent}% lower than market contractor markup`, card3X + 32, kpiY + 185);

  // ─────────────────────────────────────────────────────────────────────────
  // 5. PHASE-WISE BUDGET PILLS (y: 685 -> 770)
  // ─────────────────────────────────────────────────────────────────────────
  const phaseY = 685;
  const phaseH = 85;
  const phaseW = (CONTENT_WIDTH - 3 * 18) / 4;

  data.categoryTotals.forEach((cat, idx) => {
    const pX = MARGIN_X + idx * (phaseW + 18);
    drawRoundedRect(ctx, pX, phaseY, phaseW, phaseH, 16, '#F8FAFC', '#E2E8F0', 1.5);

    ctx.fillStyle = '#64748B';
    ctx.font = '800 17px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(cat.category, pX + 20, phaseY + 34);

    ctx.fillStyle = '#1C1C72';
    ctx.font = '900 26px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(`₹${fmtInr(cat.sum)}`, pX + 20, phaseY + 68);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#7B2DBF';
    ctx.font = '800 22px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(`${cat.percent}%`, pX + phaseW - 20, phaseY + 68);
    ctx.textAlign = 'left';
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 6. ITEMIZED 14-TRADE BOQ TABLE (y: 795 -> 2200)
  // ─────────────────────────────────────────────────────────────────────────
  const tableY = 795;
  const headerRowH = 60;
  const dataRowH = 64;

  // Table Column Definitions
  const colTradeX = MARGIN_X + 20;
  const colCatX = MARGIN_X + 820;
  const colQtyX = MARGIN_X + 1300;
  const colRateX = MARGIN_X + 1620;
  const colMktX = MARGIN_X + 1920;
  const colAgnaaX = CANVAS_WIDTH - MARGIN_X - 20;

  // Table Header Background
  drawRoundedRect(ctx, MARGIN_X, tableY, CONTENT_WIDTH, headerRowH, 14, '#1C1C72');
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 19px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

  ctx.fillText('TRADE / RESOURCE HEAD', colTradeX, tableY + 38);
  ctx.fillText('WORK PHASE', colCatX, tableY + 38);
  ctx.textAlign = 'center';
  ctx.fillText('ESTIMATED QTY', colQtyX, tableY + 38);
  ctx.textAlign = 'right';
  ctx.fillText('UNIT RATE', colRateX, tableY + 38);
  ctx.fillText('MARKET EST.', colMktX, tableY + 38);
  ctx.fillText('AGNAA COST', colAgnaaX, tableY + 38);
  ctx.textAlign = 'left';

  // 14 Table Rows
  let currentY = tableY + headerRowH;
  data.breakdown.forEach((item, idx) => {
    const isEven = idx % 2 === 0;
    ctx.fillStyle = isEven ? '#FFFFFF' : '#F8FAFC';
    ctx.fillRect(MARGIN_X, currentY, CONTENT_WIDTH, dataRowH);

    // Bottom subtle line
    ctx.strokeStyle = '#F1F5F9';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(MARGIN_X, currentY + dataRowH);
    ctx.lineTo(MARGIN_X + CONTENT_WIDTH, currentY + dataRowH);
    ctx.stroke();

    // Trade Label
    ctx.fillStyle = '#0F172A';
    ctx.font = '800 21px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(item.label, colTradeX, currentY + 40);

    // Category
    ctx.fillStyle = '#64748B';
    ctx.font = '600 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(item.category, colCatX, currentY + 40);

    // Quantity & Unit
    ctx.textAlign = 'center';
    ctx.fillStyle = '#334155';
    ctx.font = '700 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(`${fmtInr(item.qty)} ${item.unit}`, colQtyX, currentY + 40);

    // Unit Rate
    ctx.textAlign = 'right';
    ctx.fillStyle = '#64748B';
    ctx.font = '600 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(`₹${fmtInr(item.unitRate)}`, colRateX, currentY + 40);

    // Market Total (with subtle strikethrough)
    ctx.fillStyle = '#94A3B8';
    ctx.font = '600 19px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    const mktStr = `₹${fmtInr(item.mktAmt)}`;
    ctx.fillText(mktStr, colMktX, currentY + 40);
    const mktWidth = ctx.measureText(mktStr).width;
    ctx.strokeStyle = '#CBD5E1';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(colMktX - mktWidth - 2, currentY + 34);
    ctx.lineTo(colMktX + 2, currentY + 34);
    ctx.stroke();

    // AGNAA Cost
    ctx.fillStyle = '#1C1C72';
    ctx.font = '900 22px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(`₹${fmtInr(item.agnaaAmt)}`, colAgnaaX, currentY + 40);
    ctx.textAlign = 'left';

    currentY += dataRowH;
  });

  // Table Total Summary Row
  const totalRowH = 75;
  drawRoundedRect(ctx, MARGIN_X, currentY, CONTENT_WIDTH, totalRowH, 12, '#EEF2FF', '#1C1C72', 2.5);

  ctx.fillStyle = '#1C1C72';
  ctx.font = '900 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(`TOTAL TURNKEY INVESTMENT (${data.tierName.toUpperCase()} TIER • ${fmtInr(data.area)} SQFT)`, colTradeX, currentY + 46);

  ctx.textAlign = 'right';
  ctx.fillStyle = '#7B2DBF';
  ctx.font = '800 22px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(`₹${fmtInr(data.ratePerSqft)}/sft`, colRateX, currentY + 46);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '700 21px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(`₹${fmtInr(data.totalMarketCost)}`, colMktX, currentY + 46);

  ctx.fillStyle = '#1C1C72';
  ctx.font = '900 32px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(`₹${fmtInr(data.totalCost)}`, colAgnaaX, currentY + 48);
  ctx.textAlign = 'left';

  // ─────────────────────────────────────────────────────────────────────────
  // 7. PAYMENT MILESTONES SCHEDULE (y: 1850 -> 2140)
  // ─────────────────────────────────────────────────────────────────────────
  const msY = currentY + totalRowH + 28;
  const msH = 260;
  drawRoundedRect(ctx, MARGIN_X, msY, CONTENT_WIDTH, msH, 20, '#F8FAFC', '#E2E8F0', 1.5);

  ctx.fillStyle = '#1C1C72';
  ctx.font = '900 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('STAGE-WISE MILESTONE PAYMENT SCHEDULE (ESCROW / PROGRESS LINKED)', MARGIN_X + 28, msY + 38);

  const stages = [
    { num: '01', name: 'Soil & Architecture', pct: '10%', amt: Math.round(data.totalCost * 0.10) },
    { num: '02', name: 'Plinth & Foundation', pct: '20%', amt: Math.round(data.totalCost * 0.20) },
    { num: '03', name: 'RCC Roof Slabs', pct: '25%', amt: Math.round(data.totalCost * 0.25) },
    { num: '04', name: 'Brickwork & MEP', pct: '20%', amt: Math.round(data.totalCost * 0.20) },
    { num: '05', name: 'Flooring & Tiling', pct: '15%', amt: Math.round(data.totalCost * 0.15) },
    { num: '06', name: 'Handover & QA', pct: '10%', amt: Math.round(data.totalCost * 0.10) }
  ];

  const stageBoxW = (CONTENT_WIDTH - 56 - 5 * 16) / 6;
  stages.forEach((st, idx) => {
    const stX = MARGIN_X + 28 + idx * (stageBoxW + 16);
    const stY = msY + 58;
    drawRoundedRect(ctx, stX, stY, stageBoxW, 175, 14, '#FFFFFF', '#E2E8F0', 1);

    // Number Badge
    ctx.fillStyle = '#7B2DBF';
    ctx.font = '900 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(`PHASE ${st.num}`, stX + 16, stY + 32);

    ctx.fillStyle = '#0F172A';
    ctx.font = '800 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(st.name, stX + 16, stY + 68);

    ctx.fillStyle = '#64748B';
    ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(`Disbursement: ${st.pct}`, stX + 16, stY + 104);

    ctx.fillStyle = '#1C1C72';
    ctx.font = '900 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(`₹${fmtInr(st.amt)}`, stX + 16, stY + 148);
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 8. MATERIAL SPECIFICATION MATRIX (y: msY + msH + 28 -> ...)
  // ─────────────────────────────────────────────────────────────────────────
  const specY = msY + msH + 24;
  const specH = 270;
  drawRoundedRect(ctx, MARGIN_X, specY, CONTENT_WIDTH, specH, 20, '#F8FAFC', '#E2E8F0', 1.5);

  ctx.fillStyle = '#1C1C72';
  ctx.font = '900 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(`AUTHENTICATED MATERIAL SPECIFICATIONS (${data.tierName.toUpperCase()} ARCHITECTURAL QUALITY)`, MARGIN_X + 28, specY + 38);

  const colSpecW = (CONTENT_WIDTH - 56) / 2;

  // Left Column Specs
  const leftSpecs = [
    `• Cement Grade: ${data.specs.cement}`,
    `• High-Ductility Steel: ${data.specs.steel}`,
    `• Flooring & Surfaces: ${data.specs.flooring}`,
    `• Sanitary & Diverters: ${data.specs.bathrooms}`
  ];
  leftSpecs.forEach((sp, i) => {
    ctx.fillStyle = '#334155';
    ctx.font = '600 19px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(sp, MARGIN_X + 28, specY + 80 + i * 42);
  });

  // Right Column Specs
  const rightSpecs = [
    `• Openings & Windows: ${data.specs.openings}`,
    `• Electrical & Conduits: ${data.specs.electrical}`,
    `• Surface Painting: ${data.specs.painting}`,
    `• Structural Quality: M25 RCC with automated weigh-batching`
  ];
  rightSpecs.forEach((sp, i) => {
    ctx.fillStyle = '#334155';
    ctx.font = '600 19px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(sp, MARGIN_X + 28 + colSpecW, specY + 80 + i * 42);
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 9. CORPORATE FOOTER (y: 3330 -> 3508)
  // ─────────────────────────────────────────────────────────────────────────
  const footY = 3330;
  ctx.strokeStyle = '#CBD5E1';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(MARGIN_X, footY);
  ctx.lineTo(CANVAS_WIDTH - MARGIN_X, footY);
  ctx.stroke();

  ctx.fillStyle = '#475569';
  ctx.font = '700 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('© 2026 AGNAA DESIGN STUDIO PRIVATE LIMITED • UDYAM-TS-09-0010399 • ISO 9001:2015 COMPLIANT', MARGIN_X, footY + 40);

  ctx.fillStyle = '#64748B';
  ctx.font = '600 17px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Corporate Studio: Financial District, Gachibowli, Hyderabad, Telangana 500032 • info@agnaa.in', MARGIN_X, footY + 75);

  ctx.textAlign = 'right';
  ctx.fillStyle = '#1C1C72';
  ctx.font = '800 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('+91 8826214348 • www.agnaa.in', CANVAS_WIDTH - MARGIN_X, footY + 40);

  ctx.fillStyle = '#7B2DBF';
  ctx.font = '700 17px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('OFFICIAL ARCHITECTURAL ESTIMATE PROTOCOL • VALID FOR 30 DAYS', CANVAS_WIDTH - MARGIN_X, footY + 75);
  ctx.textAlign = 'left';

  // ─────────────────────────────────────────────────────────────────────────
  // 10. EMBED IN SINGLE-PAGE A4 PDF USING PDF-LIB
  // ─────────────────────────────────────────────────────────────────────────
  const imgDataUrl = canvas.toDataURL('image/jpeg', 0.94);
  const pdfDoc = await PDFDocument.create();

  // Exactly 1 Page: A4 Dimensions in points (72 DPI: 595.28 x 841.89 pt)
  const a4Page = pdfDoc.addPage([595.28, 841.89]);
  const embeddedImg = await pdfDoc.embedJpg(imgDataUrl);

  a4Page.drawImage(embeddedImg, {
    x: 0,
    y: 0,
    width: 595.28,
    height: 841.89
  });

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
}
