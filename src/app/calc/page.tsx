"use client";

import dynamic from 'next/dynamic';
import React, { useState, useMemo, useEffect } from 'react';
import Script from 'next/script';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import {
  CheckCircle, MapPin, Hammer, AlertCircle, Package, LayoutGrid, Hexagon, Waves, 
  AppWindow, Grid as GridIcon, DoorClosed, Zap, Paintbrush, Droplets, Utensils, Ruler, 
  ArrowRight, GripVertical, Download, X, Loader2, ShieldCheck
} from 'lucide-react';

// ─── AGNAA LOGO ────────────────────────────────────────────────────────────
const AgnaaLogo = ({ className = "h-8 w-auto", fill = "", width, height }: { className?: string, fill?: string, width?: number|string, height?: number|string }) => (
  <svg viewBox="0 0 4000 4000" className={className} width={width} height={height} xmlns="http://www.w3.org/2000/svg">
    {!fill && (
      <defs>
        <linearGradient id="lg-shared" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7B2DBF" />
          <stop offset="100%" stopColor="#1C1C72" />
        </linearGradient>
      </defs>
    )}
    <g fill={fill || "url(#lg-shared)"}>
      <path fillRule="evenodd" d="M104.5,3397.1 L104.5,1340.9 L703.1,1108.1 L703.1,3397.1 L503.5,3397.1 L503.5,2200 L304,2200 L304,3397.1 Z M304,2000.4 L503.5,2000.4 L503.5,1399.8 L304,1477.3 Z"/>
      <path fillRule="evenodd" d="M902.6,3197.6 L902.6,3397.1 L1501.1,3397.1 L1501.1,797.7 L902.6,1030.5 L902.6,2200 L1301.6,2200 L1301.6,3197.6 Z M1102.1,1167 L1301.6,1089.4 L1301.6,2000.4 L1102.1,2000.4 Z"/>
      <polygon fillRule="evenodd" points="1700.7,3397.1 1900.2,3397.1 1900.2,856.7 1999.9,817.8 2099.7,856.7 2099.7,3397.1 2299.2,3397.1 2299.2,720.1 1999.9,603.8 1700.7,720.1"/>
      <path fillRule="evenodd" d="M2498.9,1011.8 L2897.9,1167 L2897.9,2000.4 L2498.9,2000.4 L2498.9,3397.1 L3097.4,3397.1 L3097.4,1030.5 L2498.9,797.7 Z M2698.4,2200 L2897.9,2200 L2897.9,3197.6 L2698.4,3197.6 Z"/>
      <path fillRule="evenodd" d="M3296.9,1108.1 L3895.5,1340.9 L3895.5,3397.1 L3696,3397.1 L3696,2200 L3496.5,2200 L3496.5,3397.1 L3296.9,3397.1 Z M3496.5,1399.8 L3696,1477.3 L3696,2000.4 L3496.5,2000.4 Z"/>
    </g>
  </svg>
);

// ─── DATA ──────────────────────────────────────────────────────────────────
const MATERIALS = [
  { id: 'cement',     label: 'Cement',        unit: 'Bags',  icon: Package,      getQty: (a: number) => Math.ceil(a * 0.45),            rates: { Basic: 380,  Standard: 413,  Premium: 450  } },
  { id: 'steel',      label: 'Steel',         unit: 'KG',    icon: GripVertical, getQty: (a: number) => Math.ceil(a * 3.5),             rates: { Basic: 65,   Standard: 75,   Premium: 85   } },
  { id: 'bricks',     label: 'Bricks',        unit: 'PCS',   icon: LayoutGrid,   getQty: (a: number) => Math.ceil(a * 19),              rates: { Basic: 7,    Standard: 9,    Premium: 12   } },
  { id: 'aggregate',  label: 'Aggregate',     unit: 'Tons',  icon: Hexagon,      getQty: (a: number) => +(a * 1.9 * 0.045).toFixed(1), rates: { Basic: 900,  Standard: 1100, Premium: 1350 } },
  { id: 'sand',       label: 'Sand',          unit: 'Tons',  icon: Waves,        getQty: (a: number) => +(a * 2.0 * 0.045).toFixed(1), rates: { Basic: 1100, Standard: 1350, Premium: 1650 } },
  { id: 'flooring',   label: 'Flooring',      unit: 'Sqft',  icon: GridIcon,     getQty: (a: number) => a,                              rates: { Basic: 80,   Standard: 120,  Premium: 200  } },
  { id: 'windows',    label: 'Windows',       unit: 'Sqft',  icon: AppWindow,    getQty: (a: number) => Math.ceil(a * 0.17),            rates: { Basic: 300,  Standard: 450,  Premium: 600  } },
  { id: 'doors',      label: 'Doors',         unit: 'Sqft',  icon: DoorClosed,   getQty: (a: number) => Math.ceil(a * 0.18),            rates: { Basic: 400,  Standard: 600,  Premium: 900  } },
  { id: 'electrical', label: 'Electrical',    unit: 'Sqft',  icon: Zap,          getQty: (a: number) => a,                              rates: { Basic: 50,   Standard: 75,   Premium: 110  } },
  { id: 'painting',   label: 'Painting',      unit: 'Sqft',  icon: Paintbrush,   getQty: (a: number) => Math.ceil(a * 6),               rates: { Basic: 20,   Standard: 30,   Premium: 45   } },
  { id: 'sanitary',   label: 'Plumbing',      unit: 'Sqft',  icon: Droplets,     getQty: (a: number) => a,                              rates: { Basic: 70,   Standard: 100,  Premium: 150  } },
  { id: 'kitchen',    label: 'Kitchen',       unit: 'Sqft',  icon: Utensils,     getQty: (a: number) => Math.ceil(a * 0.055),           rates: { Basic: 950,  Standard: 1200, Premium: 1800 } },
  { id: 'contractor', label: 'Service Cost',  unit: 'Sqft',  icon: Hammer,       getQty: (a: number) => a,                              rates: { Basic: 220,  Standard: 250,  Premium: 300  } },
  { id: 'architect',  label: 'Architect Fee', unit: 'Sqft',  icon: Ruler,        getQty: (a: number) => a,                              rates: { Basic: 100,  Standard: 150,  Premium: 250  } },
];
const COLORS    = ['#1C1C72','#2A1B81','#3B1A91','#4D1AA1','#6019B1','#7B2DBF','#9335D2','#AA3CE5','#C445F8','#38B6FF','#0094FF','#0071FF','#4A4A4A','#8B5CF6'];
const LOCATIONS = ['Hyderabad', 'Bengaluru', 'Chennai', 'Mumbai', 'Delhi NCR', 'Pune', 'Kolkata'];
const QUALITIES = ['Basic', 'Standard', 'Premium'] as const;

// ─── MINI DONUT CHART ──────────────────────────────────────────────────────
const DonutChart = ({ data, total }: { data: { value: number; color: string; label: string }[]; total: number }) => {
  const [hovered, setHovered] = useState<string | null>(null);
  if (!total) return null;
  let cum = 0;
  const slices = data.map(d => {
    const pct = d.value / total; const start = cum; cum += pct;
    return { ...d, pct, start, end: cum };
  }).filter(s => s.pct > 0.005);
  const arc = (s: number, e: number) => {
    const sx = Math.cos(2*Math.PI*s - Math.PI/2), sy = Math.sin(2*Math.PI*s - Math.PI/2);
    const ex = Math.cos(2*Math.PI*e - Math.PI/2), ey = Math.sin(2*Math.PI*e - Math.PI/2);
    return `M ${sx} ${sy} A 1 1 0 ${(e-s)>0.5?1:0} 1 ${ex} ${ey} L 0 0`;
  };
  return (
    <div className="w-full aspect-square max-w-[170px] mx-auto">
      <svg viewBox="-1.1 -1.1 2.2 2.2" className="w-full h-full">
        {slices.map((s, i) => (
          <path key={i} d={arc(s.start,s.end)} fill={s.color}
            className="transition-all duration-200 cursor-pointer stroke-white stroke-[0.03]"
            style={{ transform: hovered===s.label?'scale(1.06)':'scale(1)', transformOrigin:'0 0' }}
            onMouseEnter={()=>setHovered(s.label)} onMouseLeave={()=>setHovered(null)} />
        ))}
        <circle cx="0" cy="0" r="0.58" fill="white" />
        <text x="0" y="-0.1" textAnchor="middle" style={{ fontSize:'0.17px', fontWeight:700, fill:'#9ca3af' }}>TOTAL</text>
        <text x="0" y="0.19" textAnchor="middle" style={{ fontSize:'0.29px', fontWeight:900, fill:'#1C1C72' }}>{(total/100000).toFixed(1)}L</text>
      </svg>
    </div>
  );
};

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-plus-jakarta' });

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────
// ─── INTERNAL COMPONENT (RENDERED ON CLIENT) ───────────────────────────────
function CalcContent() {
  const [area,     setArea]     = useState<string>('2000');
  const [location, setLocation] = useState('Hyderabad');
  const [isCalculated, setIsCalculated] = useState(false);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [toast,    setToast]    = useState<{ msg: string; err?: boolean } | null>(null);
  const [qualities, setQualities] = useState<Record<string, string>>(
    MATERIALS.reduce((a, m) => ({ ...a, [m.id]: 'Standard' }), {})
  );
  const [isClient, setIsClient] = useState(false);
  const [today, setToday] = useState('');

  useEffect(() => {
    setIsClient(true);
    setToday(new Date().toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' }));
    document.title = "AGNAA DESIGN STUDIO | Precision Calculator";
  }, []);

  const numArea    = parseFloat(area) || 0;
  const isSupported = location === 'Hyderabad';
  const fmt        = (n: number) => (n || 0).toLocaleString('en-IN');

  const breakdown = useMemo(() => MATERIALS.map((mat, i) => {
    const qty      = mat.getQty(numArea);
    const q        = qualities[mat.id] as 'Basic'|'Standard'|'Premium';
    const rate     = mat.rates[q];
    const disc     = (mat.id==='contractor'||mat.id==='architect') ? 0.10 : 0.05;
    const agnaaAmt = qty * rate * (1 - disc);
    return { ...mat, qty, quality:q, mktAmt:qty*rate, agnaaAmt, color:COLORS[i%COLORS.length] };
  }), [numArea, qualities]);

  const totalMkt   = breakdown.reduce((s,r)=>s+r.mktAmt,   0);
  const totalAgnaa = breakdown.reduce((s,r)=>s+r.agnaaAmt, 0);
  const savings    = totalMkt - totalAgnaa;
  const chartData  = breakdown.map(r=>({ value:r.agnaaAmt, color:r.color, label:r.label }));

  const handleGenerate = () => {
    if (numArea <= 0) { setToast({ msg:'Enter a valid area', err:true }); return; }
    setIsCalculated(true); setToast(null);
  };

  const handleDownloadPdf = async () => {
    if (loadingPdf) return;
    setLoadingPdf(true);
    
    try {
      const html2pdf = (window as any).html2pdf;
      if (!html2pdf) {
        setToast({ msg: 'PDF Library still loading...', err: true });
        setLoadingPdf(false);
        return;
      }

      const el = document.getElementById('agnaa-pdf-view-hq');
      if (!el) throw new Error('PDF container not found');

      const dateStr = new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' }).replace(/ /g, '-');
      const fileName = `agnaa_estimate_${numArea}sqft_hyderabad_${dateStr}.pdf`;
      
      const opt = {
        margin:       0,
        filename:     fileName,
        image:        { type: 'jpeg', quality: 1.0 },
        html2canvas:  { 
          scale: 3, 
          useCORS: true, 
          letterRendering: true,
          windowWidth: 794,
          width: 794,
          x: 0,
          y: 0,
          scrollX: 0,
          scrollY: 0
        },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      
      const wrapper = document.getElementById('pdf-export-wrapper');
      if (wrapper) {
        wrapper.style.top = '0px';
        wrapper.style.left = '0px';
      }
      
      await html2pdf().set(opt).from(el).save();
      
      if (wrapper) {
        wrapper.style.top = '-9999px';
        wrapper.style.left = '-9999px';
      }

      setToast({ msg: 'Precision Estimate Downloaded!', err: false });
      
      // WhatsApp Lead Capture
      const waMsg = `Hi AGNAA, I just downloaded my ${numArea}sqft precision estimate for Hyderabad. I'd like to discuss the next steps.`;
      const waUrl = `https://wa.me/918826214348?text=${encodeURIComponent(waMsg)}`;
      window.open(waUrl, '_blank');

    } catch(err: any) {
      console.error('PDF Generation Error:', err);
      setToast({ msg: 'PDF Export Failed', err: true });
    } finally {
      setLoadingPdf(false);
    }
  };

  // ─── SCREEN UI ───
  return (
    <div className={`antialiased bg-white text-[#0F172A] min-h-screen relative ${inter.variable} ${plusJakarta.variable}`}>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js" strategy="afterInteractive" />
      
      {/* ─── HIDDEN A4 PDF EXPORT — 794×1123px (A4 @ 96dpi) ─── */}
      {isClient && (
        <div id="pdf-export-wrapper" style={{ position:'absolute', top:'-9999px', left:'-9999px', pointerEvents:'none', opacity:0, overflow:'hidden', width:'794px', height:'1123px' }}>
        <div id="agnaa-pdf-view-hq" style={{ width:'794px', height:'1123px', background:'#fff', position:'relative', fontFamily:'Inter, sans-serif', color:'#0F172A', display:'flex', flexDirection:'column', overflow:'hidden' }}>
          
          {/* Subtle Watermark */}
          <div style={{ position:'absolute', top:'55%', left:'50%', transform:'translate(-50%,-50%) rotate(-15deg)', width:500, opacity:0.04, zIndex:0, pointerEvents:'none' }}>
            <AgnaaLogo fill="#1C1C72" width={500} height={500} />
          </div>

          {/* 1. HEADER */}
          <div style={{ background:'linear-gradient(135deg, #1C1C72 0%, #2A1B81 100%)', padding:'40px 50px', color:'#fff', display:'flex', justifyContent:'space-between', alignItems:'flex-start', borderBottom:'6px solid #7B2DBF', flexShrink:0 }}>
            <div>
              <AgnaaLogo fill="#fff" width={180} height={40} className="mb-4" />
              <div style={{ height:2, width:60, background:'#7B2DBF', marginBottom:12 }} />
              <h1 style={{ fontSize:32, fontWeight:900, textTransform:'uppercase', letterSpacing:'-0.02em', margin:0, lineHeight:0.9 }}>Precision<br/>Estimate</h1>
            </div>
            <div style={{ textAlign:'right' }}>
              <div style={{ fontSize:9, fontWeight:900, textTransform:'uppercase', letterSpacing:'0.2em', color:'#A5B4FC', marginBottom:8 }}>Offered To</div>
              <div style={{ fontSize:15, fontWeight:700, color:'#fff' }}>{location.toUpperCase()} PROJECT</div>
              <div style={{ fontSize:11, color:'#94A3B8', marginTop:4 }}>Ref: AG/{numArea}/{location.slice(0,3).toUpperCase()}</div>
              <div style={{ fontSize:11, color:'#94A3B8', marginTop:2 }}>Date: {today}</div>
            </div>
          </div>

          {/* 2. STATS BAR */}
          <div style={{ display:'flex', background:'#F8FAFC', borderBottom:'1px solid #E2E8F0', flexShrink:0 }}>
            <div style={{ flex:1, padding:'25px 50px', borderRight:'1px solid #E2E8F0' }}>
              <div style={{ fontSize:8, color:'#64748B', fontWeight:900, textTransform:'uppercase', marginBottom:4 }}>Project Footprint</div>
              <div style={{ fontSize:22, fontWeight:900, color:'#1C1C72' }}>{fmt(numArea)} <span style={{ fontSize:12, color:'#94A3B8' }}>SQFT</span></div>
            </div>
            <div style={{ flex:1, padding:'25px 50px', borderRight:'1px solid #E2E8F0' }}>
              <div style={{ fontSize:8, color:'#64748B', fontWeight:900, textTransform:'uppercase', marginBottom:4 }}>Market Valuation</div>
              <div style={{ fontSize:22, fontWeight:900, color:'#64748B', textDecoration:'line-through', opacity:0.6 }}>₹{fmt(totalMkt)}</div>
            </div>
            <div style={{ flex:1.2, padding:'25px 50px', background:'#EEF2FF' }}>
              <div style={{ fontSize:8, color:'#7B2DBF', fontWeight:900, textTransform:'uppercase', marginBottom:4 }}>Agnaa Exclusive Cost</div>
              <div style={{ fontSize:26, fontWeight:900, color:'#7B2DBF' }}>₹{fmt(totalAgnaa)}</div>
            </div>
          </div>

          {/* 3. BREAKDOWN TABLE */}
          <div style={{ flex:1, padding:'30px 50px', overflow:'hidden' }}>
            <div style={{ fontSize:10, fontWeight:900, textTransform:'uppercase', letterSpacing:'0.1em', color:'#1C1C72', marginBottom:15, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <span>Bill of Quantities & Detailed Analysis</span>
              <span style={{ color:'#7B2DBF' }}>Page 1 of 1</span>
            </div>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:9 }}>
              <thead>
                <tr style={{ background:'#1C1C72', color:'#fff' }}>
                  <th style={{ padding:'10px 12px', textAlign:'left', borderTopLeftRadius:6 }}>RESOURCE NAME</th>
                  <th style={{ padding:'10px 12px', textAlign:'left' }}>QUANTITY</th>
                  <th style={{ padding:'10px 12px', textAlign:'left' }}>GRADE</th>
                  <th style={{ padding:'10px 12px', textAlign:'right' }}>MARKET ₹</th>
                  <th style={{ padding:'10px 12px', textAlign:'right', borderTopRightRadius:6, background:'#7B2DBF' }}>AGNAA ₹</th>
                </tr>
              </thead>
              <tbody style={{ color:'#475569' }}>
                {breakdown.map((item, i) => (
                  <tr key={item.id} style={{ borderBottom:'1px solid #F1F5F9', background: i%2===0?'#FCFDFF':'#fff' }}>
                    <td style={{ padding:'9px 12px', fontWeight:800, color:'#1C1C72' }}>{item.label.toUpperCase()}</td>
                    <td style={{ padding:'9px 12px', fontWeight:600 }}>{fmt(item.qty)} <span style={{ fontSize:7, color:'#94A3B8' }}>{item.unit}</span></td>
                    <td style={{ padding:'9px 12px', fontWeight:900, color:'#7B2DBF', fontSize:8 }}>{item.quality.toUpperCase()}</td>
                    <td style={{ padding:'9px 12px', textAlign:'right', fontWeight:600, color:'#94A3B8' }}>₹{fmt(item.mktAmt)}</td>
                    <td style={{ padding:'9px 12px', textAlign:'right', fontWeight:900, color:'#1C1C72', background:'rgba(123,45,191,0.03)' }}>₹{fmt(item.agnaaAmt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 4. SUMMARY BOX */}
          <div style={{ padding:'0 50px 30px', flexShrink:0 }}>
            <div style={{ border:'2px solid #1C1C72', borderRadius:12, display:'flex', overflow:'hidden' }}>
              <div style={{ flex:1, padding:20, background:'#F8FAFC' }}>
                <div style={{ fontSize:8, fontWeight:900, color:'#64748B', textTransform:'uppercase', marginBottom:10 }}>Project Metadata</div>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  {[
                    ['ESTIMATE ID', `AG-${numArea}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`],
                    ['BUILT-UP AREA', `${fmt(numArea)} SQFT`],
                    ['PROJECT LOCATION', location.toUpperCase()],
                    ['SPECIFICATION', 'A-GRADE PRECISION']
                  ].map(([k,v]) => (
                    <div key={k} style={{ display:'flex', justifyContent:'space-between', fontSize:8, fontWeight:700 }}>
                      <span style={{ color:'#94A3B8' }}>{k}</span>
                      <span style={{ color:'#334155' }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ flex:1.5, background:'#1C1C72', padding:'20px 25px', color:'#fff', position:'relative' }}>
                <div style={{ fontSize:8, fontWeight:900, color:'#A5B4FC', textTransform:'uppercase', marginBottom:4, letterSpacing:'0.1em' }}>Total Dynamic Savings</div>
                <div style={{ fontSize:38, fontWeight:900, color:'#fff', lineHeight:0.9, letterSpacing:'-0.03em', marginBottom:6 }}>₹{fmt(savings)}</div>
                <div style={{ fontSize:9, color:'#A5B4FC', opacity:0.8 }}>Saved exclusively through Agnaa Strategic Network</div>
                <div style={{ position:'absolute', bottom:10, right:15 }}>
                  <ShieldCheck size={40} color="#7B2DBF" style={{ opacity:0.5 }} />
                </div>
              </div>
            </div>
          </div>

          {/* 5. FINISHERS */}
          <div style={{ background:'linear-gradient(to right, #1C1C72, #7B2DBF)', height:80, display:'flex', alignItems:'center', padding:'0 50px', justifyContent:'space-between', flexShrink:0 }}>
            <div style={{ color:'rgba(255,255,255,0.6)', fontSize:8, fontWeight:600, maxWidth:400 }}>
              ESTIMATE SUBJECT TO TERMS & CONDITIONS. PRICES ARE INDICATIVE AND MAY VARY BASED ON FINAL DESIGN SPECIFICATIONS AND MARKET FLUCTUATIONS AT TIME OF PROCUREMENT.
            </div>
            <div style={{ textAlign:'right' }}>
              <div style={{ fontSize:7, color:'#A5B4FC', fontWeight:900, textTransform:'uppercase' }}>Final Computed Value</div>
              <div style={{ fontSize:28, fontWeight:900, color:'#fff', fontVariantNumeric:'tabular-nums', lineHeight:1 }}>₹{fmt(totalAgnaa)}</div>
              <div style={{ fontSize:8, color:'#7B2DBF', fontWeight:900, textTransform:'uppercase' }}>~ {((savings/totalMkt)*100).toFixed(1)}% BELOW MARKET</div>
            </div>
          </div>

          {/* 6. LEGAL FOOTER */}
          <div style={{ borderTop:'1px solid #F1F5F9', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0 50px', height:'50px', flexShrink:0, background:'#fff' }}>
            <div style={{ fontSize:7, color:'#94A3B8', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em', maxWidth:350 }}>
              © 2026 AGNAA DESIGN STUDIO PRIVATE LIMITED • THIS ESTIMATE IS GENERATED BY AGNAA PRECISION ENGINE AND IS VALID FOR 30 DAYS.
            </div>
            <div style={{ display:'flex', gap:10, alignItems:'center' }}>
              <span style={{ fontSize:9, fontWeight:900, color:'#7B2DBF' }}>+91 8826214348</span>
              <div style={{ width:1, height:12, background:'#E2E8F0' }} />
              <span style={{ fontSize:9, fontWeight:900, color:'#1C1C72' }}>WWW.AGNAA.IN</span>
              <span style={{ fontSize:6, background:'#7B2DBF', color:'#fff', fontWeight:900, padding:'3px 7px', borderRadius:4, textTransform:'uppercase', letterSpacing:'0.1em', marginLeft:5 }}>OFFICIAL</span>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* MAIN UI */}
    <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-3.5 flex items-center justify-between shadow-sm">
      <AgnaaLogo className="h-7 w-auto" />
      <span className="text-[10px] font-black uppercase tracking-widest text-[#7B2DBF]">Precision Calc</span>
    </div>

    <div className="px-4 pt-5 pb-3 max-w-2xl mx-auto">
      <div className="bg-[#F5F5F7] rounded-2xl border border-gray-200 p-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-end">
        <div className="flex-1">
          <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Built-up Area (Sqft)</label>
          <input type="number" value={area}
            onChange={e=>{setArea(e.target.value);setIsCalculated(false);}}
            className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors"
            placeholder="e.g. 2000" />
        </div>
        <div className="flex-1">
          <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Location</label>
          <select value={location} onChange={e=>{setLocation(e.target.value);setIsCalculated(false);}}
            className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors appearance-none cursor-pointer">
            {LOCATIONS.map(l=><option key={l}>{l}</option>)}
          </select>
        </div>
        <button onClick={handleGenerate}
          className="flex items-center justify-center gap-2 bg-[#1C1C72] hover:bg-[#7B2DBF] text-white font-black rounded-xl px-6 py-2.5 transition-all duration-300 text-sm shadow-lg active:scale-95">
          Generate <ArrowRight size={15} />
        </button>
      </div>
    </div>

    {isCalculated && (
      <div className="px-4 pb-10 max-w-2xl mx-auto">
        {isSupported ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
              <div className="bg-[#F5F5F7] rounded-xl p-3 border border-gray-100">
                <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Market Total</p>
                <p className="text-sm font-black text-[#1C1C72] font-[var(--font-space)]">₹{fmt(totalMkt)}</p>
              </div>
              <div className="bg-[#1C1C72] rounded-xl p-3 border border-[#7B2DBF]">
                <p className="text-[9px] font-black uppercase tracking-widest text-indigo-300 mb-0.5">Agnaa Total</p>
                <p className="text-sm font-black text-white font-[var(--font-space)]">₹{fmt(totalAgnaa)}</p>
              </div>
              <div className="bg-[#7B2DBF] rounded-xl p-3 border border-purple-400 sm:col-span-2 shadow-[0_4px_20px_rgba(123,45,191,0.2)]">
                <p className="text-[9px] font-black uppercase tracking-widest text-purple-200 mb-0.5">You Save</p>
                <p className="text-sm font-black text-white font-[var(--font-space)]">₹{fmt(savings)}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div className="bg-[#F5F5F7] rounded-2xl border border-gray-200 p-4 flex flex-col items-center justify-center">
                <DonutChart data={chartData} total={totalAgnaa} />
                <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mt-2">Cost Breakdown</p>
              </div>
              <div className="bg-gradient-to-br from-[#1C1C72] to-[#2D1B69] rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden min-h-[160px]">
                <div className="absolute -right-6 -bottom-6 opacity-[0.06] scale-[2.2]"><AgnaaLogo fill="#fff"/></div>
                <div className="relative z-10">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-300 mb-1">Agnaa Intelligent Design</p>
                  <p className="text-3xl font-bold text-white tracking-tight mb-3 font-[var(--font-space)]">₹{fmt(totalAgnaa)}</p>
                </div>
                <div className="relative z-10 inline-flex items-center gap-1.5 bg-white text-[#7B2DBF] rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-wider w-fit shadow">
                  <CheckCircle size={12}/> Save ₹{fmt(savings)} with Agnaa
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm mb-5">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse" style={{ minWidth:'540px' }}>
                  <thead>
                    <tr className="bg-[#F5F5F7] border-b border-gray-200 text-[9px] uppercase tracking-[0.15em] text-gray-400 font-[var(--font-inter)]">
                      <th className="px-3 py-3 font-semibold">Resource</th>
                      <th className="px-3 py-3 font-semibold">Qty</th>
                      <th className="px-3 py-3 font-semibold text-center">Quality</th>
                      <th className="px-3 py-3 font-semibold text-right">Market ₹</th>
                      <th className="px-3 py-3 font-semibold text-right text-[#7B2DBF]">Savings ₹</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {breakdown.map((item: any)=>(
                      <tr key={item.id} className="hover:bg-[#F5F5F7]/40 transition-colors text-[11px] group">
                        <td className="px-3 py-2.5 font-bold text-[#1C1C72] font-[var(--font-space)] text-[13px]">
                          <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full flex-shrink-0 bg-[#1C1C72] opacity-60 group-hover:opacity-100 transition-opacity"/>
                            {item.label}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 text-[#1C1C72] font-semibold whitespace-nowrap">
                          {fmt(item.qty)} <span className="text-[9px] text-gray-400 font-normal">{item.unit}</span>
                        </td>
                        <td className="px-3 py-2.5">
                          <div className="flex flex-col gap-1.5 items-center px-1 w-32 mx-auto">
                            <div className="flex justify-between w-full text-[8px] font-black uppercase leading-none">
                              <span className={`cursor-pointer transition-colors ${item.quality === 'Basic' ? 'text-[#1C1C72]' : 'text-gray-400 hover:text-gray-600'}`} onClick={() => setQualities(p => ({ ...p, [item.id]: 'Basic' }))}>Basic</span>
                              <span className={`cursor-pointer transition-colors ${item.quality === 'Standard' ? 'text-[#1C1C72]' : 'text-gray-400 hover:text-gray-600'}`} onClick={() => setQualities(p => ({ ...p, [item.id]: 'Standard' }))}>Std</span>
                              <span className={`cursor-pointer transition-colors ${item.quality === 'Premium' ? 'text-[#1C1C72]' : 'text-gray-400 hover:text-gray-600'}`} onClick={() => setQualities(p => ({ ...p, [item.id]: 'Premium' }))}>Prem</span>
                            </div>
                            <input 
                              type="range" 
                              min="0" max="2" step="1" 
                              value={QUALITIES.indexOf(item.quality)}
                              onChange={(e) => setQualities(p => ({ ...p, [item.id]: QUALITIES[parseInt(e.target.value)] }))}
                              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1C1C72]"
                              style={{ accentColor: '#1C1C72' }}
                            />
                          </div>
                        </td>
                        <td className="px-3 py-2.5 text-right font-bold text-[#1C1C72] whitespace-nowrap font-[var(--font-space)] text-[13px]">₹{fmt(item.mktAmt)}</td>
                        <td className="px-3 py-2.5 text-right font-bold text-[#7B2DBF] whitespace-nowrap font-[var(--font-space)] text-[13px]">+₹{fmt(item.mktAmt-item.agnaaAmt)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={3} className="px-4 py-3 font-bold text-[11px] uppercase tracking-wider bg-[#1C1C72] text-white font-[var(--font-space)]">Grand Total</td>
                      <td className="px-3 py-3 text-right font-bold bg-[#1C1C72] text-white whitespace-nowrap font-[var(--font-space)] text-[14px]">₹{fmt(totalMkt)}</td>
                      <td className="px-3 py-3 text-right font-bold bg-[#1C1C72] text-[#C445F8] whitespace-nowrap font-[var(--font-space)] text-[14px]">+₹{fmt(savings)}</td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="px-4 py-3 font-bold text-[11px] uppercase tracking-widest bg-gradient-to-r from-[#7B2DBF] to-[#1C1C72] text-white font-[var(--font-space)]">Agnaa Intelligent Cost</td>
                      <td colSpan={2} className="px-3 py-3 text-right font-bold text-lg bg-[#1C1C72] text-white whitespace-nowrap font-[var(--font-space)]">₹{fmt(totalAgnaa)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div className="flex justify-center">
              <button 
                onClick={handleDownloadPdf}
                disabled={loadingPdf}
                className="flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#1C1C72] to-[#7B2DBF] text-white font-black rounded-full px-12 py-4 transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(123,45,191,0.5)] hover:-translate-y-0.5 active:scale-95 text-base disabled:opacity-50"
              >
                {loadingPdf ? (
                  <>
                    <Loader2 size={17} className="animate-spin" />
                    Generating Precision Report...
                  </>
                ) : (
                  <>
                    <Download size={17}/> Download Precision PDF
                  </>
                )}
              </button>
            </div>
          </>
        ) : (
          <div className="bg-[#F5F5F7] p-10 rounded-2xl text-center border border-gray-200 mt-4">
            <MapPin size={32} className="text-[#7B2DBF] mx-auto mb-3 opacity-40"/>
            <h3 className="text-lg font-black text-[#1C1C72] mb-2 font-[var(--font-space)]">Coming Soon to {location}</h3>
            <p className="text-gray-500 text-sm max-w-xs mx-auto">Agnaa is expanding its vendor network to your city.</p>
          </div>
        )}
      </div>
    )}

    {toast && (
      <div className="fixed bottom-5 right-5 z-50">
        <div className={`px-5 py-3 rounded-xl border shadow-lg text-white flex items-center gap-2 text-sm font-bold ${toast.err?'bg-red-600 border-red-500':'bg-[#1C1C72] border-[#7B2DBF]'}`}>
          {toast.err ? <AlertCircle size={16}/> : <CheckCircle size={16}/>}
          {toast.msg}
        </div>
      </div>
    )}
    </div>
  );
}

// ─── SSR WRAPPER ────────────────────────────────────────────────────────────
const CalcPage = dynamic(() => Promise.resolve(CalcContent), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-[#1C1C72]" />
        <p className="text-sm font-black text-[#1C1C72] animate-pulse uppercase tracking-widest">
          Loading Precision Engine...
        </p>
      </div>
    </div>
  )
});

export default CalcPage;
