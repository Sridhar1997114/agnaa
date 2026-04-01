"use client";

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Script from 'next/script';
import { useSearchParams } from 'next/navigation';
import { Inter, Space_Grotesk } from 'next/font/google';
import {
  CheckCircle, MapPin, Hammer, Package, LayoutGrid, Hexagon, Waves, 
  AppWindow, Grid as GridIcon, DoorClosed, Zap, Paintbrush, Droplets, Utensils, Ruler, 
  ArrowRight, GripVertical, Download, X, Loader2
} from 'lucide-react';

// ─── AGNAA LOGO ────────────────────────────────────────────────────────────
const AgnaaLogo = ({ className = "h-8 w-auto", fill = "", width, height }: { className?: string, fill?: string, width?: number|string, height?: number|string }) => (
  <svg viewBox="0 0 4000 4000" className={className} width={width} height={height} xmlns="http://www.w3.org/2000/svg">
    {!fill && (
      <defs>
        <linearGradient id="lg2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7B2DBF" />
          <stop offset="100%" stopColor="#1C1C72" />
        </linearGradient>
      </defs>
    )}
    <g fill={fill || "url(#lg2)"}>
      <path fillRule="evenodd" d="M104.5,3397.1 L104.5,1340.9 L703.1,1108.1 L703.1,3397.1 L503.5,3397.1 L503.5,2200 L304,2200 L304,3397.1 Z M304,2000.4 L503.5,2000.4 L503.5,1399.8 L304,1477.3 Z"/>
      <path fillRule="evenodd" d="M902.6,3197.6 L902.6,3397.1 L1501.1,3397.1 L1501.1,797.7 L902.6,1030.5 L902.6,2200 L1301.6,2200 L1301.6,3197.6 Z M1102.1,1167 L1301.6,1089.4 L1301.6,2000.4 L1102.1,2000.4 Z"/>
      <polygon fillRule="evenodd" points="1700.7,3397.1 1900.2,3397.1 1900.2,856.7 1999.9,817.8 2099.7,856.7 2099.7,3397.1 2299.2,3397.1 2299.2,720.1 1999.9,603.8 1700.7,720.1"/>
      <path fillRule="evenodd" d="M2498.9,1011.8 L2897.9,1167 L2897.9,2000.4 L2498.9,2000.4 L2498.9,3397.1 L3097.4,3397.1 L3097.4,1030.5 L2498.9,797.7 Z M2698.4,2200 L2897.9,2200 L2897.9,3197.6 L2698.4,3197.6 Z"/>
      <path fillRule="evenodd" d="M3296.9,1108.1 L3895.5,1340.9 L3895.5,3397.1 L3696,3397.1 L3696,2200 L3496.5,2200 L3496.5,3397.1 L3296.9,3397.1 Z M3496.5,1399.8 L3696,1477.3 L3696,2000.4 L3496.5,2000.4 Z"/>
    </g>
  </svg>
);

// ─── DATA ──────────────────────────────────────────────────────────────────
// ─── EXACT DATA MAPPING ───────────────────────────────────────────────────
const MATERIALS = [
  { id: 'cement',     label: 'Cement',        unit: 'Bags',  icon: Package,      getQty: (a: number) => Math.ceil(a * 0.45),            rates: { Standard: 413  } },
  { id: 'steel',      label: 'Steel',         unit: 'KG',    icon: GripVertical, getQty: (a: number) => Math.ceil(a * 3.5),             rates: { Standard: 75   } },
  { id: 'bricks',     label: 'Bricks',        unit: 'PCS',   icon: LayoutGrid,   getQty: (a: number) => Math.ceil(a * 19),              rates: { Standard: 9    } },
  { id: 'aggregate',  label: 'Aggregate',     unit: 'Tons',  icon: Hexagon,      getQty: (a: number) => +(a * 0.0855).toFixed(1),       rates: { Standard: 1100 } },
  { id: 'sand',       label: 'Sand',          unit: 'Tons',  icon: Waves,        getQty: (a: number) => +(a * 0.09).toFixed(1),         rates: { Standard: 1350 } },
  { id: 'flooring',   label: 'Flooring',      unit: 'Sqft',  icon: GridIcon,     getQty: (a: number) => a,                              rates: { Standard: 120  } },
  { id: 'windows',    label: 'Windows',       unit: 'Sqft',  icon: AppWindow,    getQty: (a: number) => Math.ceil(a * 0.17),            rates: { Standard: 450  } },
  { id: 'doors',      label: 'Doors',         unit: 'Sqft',  icon: DoorClosed,   getQty: (a: number) => Math.ceil(a * 0.18),            rates: { Standard: 600  } },
  { id: 'electrical', label: 'Electrical',    unit: 'Sqft',  icon: Zap,          getQty: (a: number) => a,                              rates: { Standard: 75   } },
  { id: 'painting',   label: 'Painting',      unit: 'Sqft',  icon: Paintbrush,   getQty: (a: number) => Math.ceil(a * 6),               rates: { Standard: 30   } },
  { id: 'sanitary',   label: 'Plumbing',      unit: 'Sqft',  icon: Droplets,     getQty: (a: number) => a,                              rates: { Standard: 100  } },
  { id: 'kitchen',    label: 'Kitchen',       unit: 'Sqft',  icon: Utensils,     getQty: (a: number) => Math.ceil(a * 0.055),           rates: { Standard: 1200 } },
  { id: 'contractor', label: 'Service Cost',  unit: 'Sqft',  icon: Hammer,       getQty: (a: number) => a,                              rates: { Standard: 250  } },
  { id: 'architect',  label: 'Architect Fee', unit: 'Sqft',  icon: Ruler,        getQty: (a: number) => a,                              rates: { Standard: 150  } },
];
const COLORS    = ['#1C1C72','#2A1B81','#3B1A91','#4D1AA1','#6019B1','#7B2DBF','#9335D2','#AA3CE5','#C445F8','#38B6FF','#0094FF','#0071FF','#4A4A4A','#8B5CF6'];

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', weight: ['400', '500', '600', '700', '800', '900'] });
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-space', weight: ['400', '500', '600', '700'] });

declare global {
  interface Window {
    html2pdf: any;
  }
}

function EstimateContent() {
  const searchParams = useSearchParams();
  const initialSqft = searchParams?.get('sqft') || '2000';
  const [area, setArea] = useState<string>(initialSqft);
  const [isGenerating, setIsGenerating] = useState(false);

  const numArea = parseFloat(area) || 0;
  const location = 'Hyderabad';
  const fmt = (n: number) => n.toLocaleString('en-IN');
  
  const d = new Date();
  const dd = String(d.getDate()).padStart(2,'0');
  const mmm = d.toLocaleString('en-GB',{month:'short'});
  const yyyy = d.getFullYear();
  const dateStr = `${dd} ${mmm} ${yyyy}`;
  const fileDateStr = `${dd}-${mmm}-${yyyy}`;

  useEffect(() => {
    document.title = "AGNAA | Precision Estimate";
  }, []);

  const breakdown = useMemo(() => MATERIALS.map((mat, i) => {
    const qty = mat.getQty(numArea);
    const rate = mat.rates['Standard'];
    const disc = (mat.id==='contractor'||mat.id==='architect') ? 0.10 : 0.05;
    const mktAmt = qty * rate;
    const itemSavings = mktAmt * disc;
    const agnaaAmt = mktAmt - itemSavings;
    return { ...mat, qty, quality: 'STANDARD', mktAmt, agnaaAmt, savings: itemSavings, color: COLORS[i%COLORS.length] };
  }), [numArea]);

  const totalMkt = breakdown.reduce((s,r)=>s+r.mktAmt, 0);
  const totalAgnaa = breakdown.reduce((s,r)=>s+r.agnaaAmt, 0);
  const totalSavings = totalMkt - totalAgnaa;
  const savingPercent = ((totalSavings/totalMkt)*100).toFixed(0);

  const generateAndDownloadPDF = async () => {
    try {
      const el = document.getElementById('agnaa-pdf-view');
      if (!el || !window.html2pdf) return;

      const fileName = `agnaa_estimate_${numArea}sqft_hyderabad_${fileDateStr}.pdf`;
      
      const opt = {
        margin:       0,
        filename:     fileName,
        image:        { type: 'jpeg', quality: 1.0 },
        html2canvas:  { 
          scale: 3, 
          useCORS: true, 
          letterRendering: true,
          scrollY: 0,
          scrollX: 0,
          windowWidth: 794,
          removeContainer: true
        },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      
      // Use html2pdf's native save() which correctly sets the filename
      await window.html2pdf().set(opt).from(el).save();
    } catch(err) {
      console.error('PDF Generation Error:', err);
    }
  };

  const handleDownloadClick = async () => {
    setIsGenerating(true);
    try {
      await generateAndDownloadPDF();
      
      // WhatsApp Redirect
      const waMsg = `Hi AGNAA, I just downloaded my ${numArea}sqft precision estimate for Hyderabad. I'd like to discuss the next steps.`;
      const waUrl = `https://wa.me/918826214348?text=${encodeURIComponent(waMsg)}`;
      
      setTimeout(() => {
        window.open(waUrl, '_blank');
        setIsGenerating(false);
      }, 1500);
    } catch (err) {
      console.error("Download failed:", err);
      setIsGenerating(false);
    }
  };

  return (
    <div className={`antialiased bg-[#F3F4F6] text-[#0F172A] min-h-screen relative flex flex-col items-center py-20 px-4 ${inter.variable} ${space.variable}`}>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js" strategy="afterInteractive" />
      
      {/* ─── HERO & CALCULATOR FRONT ─── */}
      <div className="bg-white max-w-4xl w-full rounded-[40px] shadow-2xl overflow-hidden border border-gray-100 flex flex-col mb-12">
        <div className="bg-gradient-to-br from-[#1C1C72] to-[#7B2DBF] px-10 py-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none flex justify-center items-center scale-150">
            <AgnaaLogo fill="#fff" />
          </div>
          <div className="relative z-10 flex flex-col items-center">
             <div className="bg-white/10 p-4 rounded-3xl backdrop-blur-md border border-white/20 mb-8 inline-block shadow-2xl">
                <AgnaaLogo fill="#FFFFFF" height={48} width={48} className="h-[48px] w-[48px]" />
             </div>
             <h1 className="text-white text-4xl sm:text-5xl font-extrabold font-[var(--font-space)] mb-4 uppercase tracking-tighter leading-none">Precision Construction <br/>Estimate</h1>
             <p className="text-white/80 font-[var(--font-inter)] text-lg max-w-xl mx-auto leading-relaxed">Download your authenticated, A-Grade construction quote for Hyderabad instantly.</p>
          </div>
        </div>

        <div className="p-10 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <label className="text-[12px] font-black text-[#1C1C72] uppercase tracking-[0.3em] block mb-4 px-1">Built-up Area (Sqft)</label>
              <div className="relative">
                <select 
                  value={area} 
                  onChange={e => setArea(e.target.value)}
                  className="w-full bg-[#F8F9FA] rounded-[24px] px-8 py-5 text-2xl font-bold text-[#1C1C72] font-[var(--font-space)] outline-none border-2 border-transparent focus:border-[#7B2DBF] hover:border-gray-200 transition-all appearance-none cursor-pointer shadow-inner"
                >
                  <option value="1500">1,500 SQFT</option>
                  <option value="2000">2,000 SQFT</option>
                  <option value="2500">2,500 SQFT</option>
                  <option value="3000">3,000 SQFT</option>
                </select>
                <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-[#7B2DBF]">
                   <GridIcon size={24} />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-8">
              <button 
                onClick={handleDownloadClick}
                disabled={isGenerating}
                className="w-full relative group overflow-hidden bg-[#1C1C72] text-white font-bold font-[var(--font-space)] text-xl rounded-[24px] px-8 py-6 transition-all duration-500 shadow-2xl shadow-[#1C1C72]/30 hover:shadow-[#7B2DBF]/50 active:scale-[0.98] disabled:opacity-50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_2s_infinite]"></div>
                <div className="relative flex items-center justify-center gap-4">
                  {isGenerating ? (
                    <>
                      <Loader2 size={24} className="animate-spin" />
                      Generating PDF...
                    </>
                  ) : (
                    <>
                      Download Precision Estimate
                      <Download size={24} className="group-hover:translate-y-0.5 transition-transform" />
                    </>
                  )}
                </div>
              </button>
              <p className="text-center text-[12px] text-gray-400 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                <CheckCircle size={14} className="text-green-500" /> A4 High-Resolution PDF
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── PREVIEW TABLE ─── */}
      <div className="max-w-6xl w-full bg-white rounded-[32px] shadow-xl border border-gray-100 overflow-hidden mb-20">
        <div className="px-10 py-8 border-b border-gray-50 flex justify-between items-center bg-[#F8F9FA]">
          <div>
             <h2 className="text-xl font-bold text-[#0F172A] font-[var(--font-space)]">Live Estimate Explorer</h2>
             <p className="text-sm text-gray-500">Real-time calculations for {numArea} Sqft in Hyderabad</p>
          </div>
          <div className="text-right">
             <p className="text-[10px] font-black text-[#1C1C72] uppercase tracking-widest mb-1">Total Intelligent Cost</p>
             <p className="text-2xl font-bold text-[#0F172A] tabular-nums">₹{fmt(totalAgnaa)}</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
             <thead className="bg-gray-50/50">
               <tr>
                 <th className="px-10 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Resource</th>
                 <th className="px-10 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">Quantities</th>
                 <th className="px-10 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Market Est.</th>
                 <th className="px-10 py-5 text-[11px] font-black text-[#1C1C72] uppercase tracking-widest text-right bg-[#1C1C72]/5">Agnaa Cost</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-50">
               {breakdown.slice(0, 8).map((item, idx) => (
                 <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                   <td className="px-10 py-5 flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-[#F3F4F6] flex items-center justify-center">
                        <item.icon size={16} className="text-[#1C1C72]" />
                      </div>
                      <span className="font-bold text-[#0F172A]">{item.label}</span>
                   </td>
                   <td className="px-10 py-5 text-center text-gray-500 font-medium">{fmt(item.qty)} {item.unit}</td>
                   <td className="px-10 py-5 text-right text-gray-400 tabular-nums">₹{fmt(item.mktAmt)}</td>
                   <td className="px-10 py-5 text-right font-bold text-[#1C1C72] tabular-nums bg-[#1C1C72]/[0.02]">₹{fmt(item.agnaaAmt)}</td>
                 </tr>
               ))}
               <tr>
                 <td colSpan={4} className="px-10 py-6 text-center text-gray-400 text-xs italic">
                    + 6 more resources included in full PDF download
                 </td>
               </tr>
             </tbody>
          </table>
        </div>
      </div>

      {/* ─── HIDDEN A4 PDF EXPORT — 794×1123px (A4 @ 96dpi) ─── */}
      <div style={{ position:'fixed', top:0, left:'50%', transform:'translateX(-50%)', zIndex:-100, opacity:0, pointerEvents:'none', overflow:'hidden', width:'794px', height:'1123px' }}>
        <div id="agnaa-pdf-view" style={{ width:'794px', height:'1123px', background:'#fff', position:'relative', fontFamily:'Inter,sans-serif', color:'#0F172A', display:'flex', flexDirection:'column', overflow:'hidden' }}>

          {/* Watermark */}
          <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:420, opacity:0.03, zIndex:0, pointerEvents:'none' }}>
            <AgnaaLogo fill="#1C1C72" />
          </div>

          {/* HEADER — 70px */}
          <div style={{ background:'linear-gradient(135deg,#1C1C72 0%,#7B2DBF 100%)', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0 48px', height:'70px', flexShrink:0, zIndex:1 }}>
            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
              <AgnaaLogo fill="#FFFFFF" width={32} height={32} />
              <div style={{ width:1, height:30, background:'rgba(255,255,255,0.2)', margin:'0 6px' }} />
              <div>
                <div style={{ fontSize:16, fontWeight:900, color:'#fff', letterSpacing:'-0.02em', textTransform:'uppercase' as const, lineHeight:1.1 }}>AGNAA DESIGN STUDIO</div>
                <div style={{ fontSize:10, color:'rgba(255,255,255,0.6)', fontStyle:'italic' as const }}>Design. Build. Soul.</div>
              </div>
            </div>
            <div style={{ textAlign:'right' as const }}>
              <div style={{ fontSize:9, fontWeight:900, color:'rgba(255,255,255,0.5)', textTransform:'uppercase' as const, letterSpacing:'0.2em', marginBottom:2 }}>Precision Construction Estimate</div>
              <div style={{ fontSize:14, fontWeight:700, color:'#fff' }}>{dateStr}</div>
            </div>
          </div>

          {/* SCOPE BAR — 52px */}
          <div style={{ background:'#fff', borderBottom:'1px solid #E5E7EB', display:'flex', flexShrink:0, height:'52px', zIndex:1 }}>
            {([['Built-up Area', `${fmt(numArea)} SQFT`], ['Location', location], ['Standard', 'A-GRADE PRECISION']] as [string,string][]).map(([label, val], i) => (
              <div key={i} style={{ flex:1, borderRight: i<2 ? '1px solid #E5E7EB' : 'none', display:'flex', flexDirection:'column', justifyContent:'center', padding:'0 24px' }}>
                <div style={{ fontSize:8, fontWeight:900, color:'#94A3B8', textTransform:'uppercase' as const, letterSpacing:'0.15em', marginBottom:1 }}>{label}</div>
                <div style={{ fontSize:13, fontWeight:800, color: i===2 ? '#7B2DBF' : '#0F172A' }}>{val}</div>
              </div>
            ))}
          </div>

          {/* KPI CARDS — 68px */}
          <div style={{ display:'flex', gap:10, padding:'8px 40px', flexShrink:0, height:'68px', alignItems:'center' }}>
            {[
              { label:'Market Total', value:`₹${fmt(totalMkt)}`, bg:'#F8F8FC', border:'1px solid rgba(28,28,114,0.15)', color:'#0F172A', labelColor:'#64748B' },
              { label:'Agnaa Intelligent', value:`₹${fmt(totalAgnaa)}`, bg:'linear-gradient(135deg,#7B2DBF,#1C1C72)', border:'none', color:'#fff', labelColor:'rgba(255,255,255,0.6)' },
              { label:'Total Savings', value:`₹${fmt(totalSavings)}`, bg:'#F0FDF4', border:'1px solid #BBF7D0', color:'#15803D', labelColor:'#16A34A' },
            ].map((card, i) => (
              <div key={i} style={{ flex:1, height:52, background:card.bg, border:card.border, borderRadius:10, display:'flex', flexDirection:'column', justifyContent:'center', padding:'0 16px' }}>
                <div style={{ fontSize:8, fontWeight:900, color:card.labelColor, textTransform:'uppercase' as const, letterSpacing:'0.15em' }}>{card.label}</div>
                <div style={{ fontSize:18, fontWeight:700, color:card.color, fontVariantNumeric:'tabular-nums' as const }}>{card.value}</div>
              </div>
            ))}
          </div>

          {/* TABLE — fills remaining space */}
          <div style={{ flex:1, overflow:'hidden', minHeight:0, display:'flex', flexDirection:'column' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', tableLayout:'fixed' }}>
              <thead>
                <tr style={{ background:'#0F172A' }}>
                  <th style={{ padding:'6px 18px', fontSize:9, color:'#fff', textTransform:'uppercase' as const, fontWeight:900, letterSpacing:'0.15em', textAlign:'left', width:'34%' }}>Construction Resource</th>
                  <th style={{ padding:'6px 18px', fontSize:9, color:'rgba(255,255,255,0.7)', textTransform:'uppercase' as const, fontWeight:900, letterSpacing:'0.15em', textAlign:'center', width:'22%' }}>Quantity</th>
                  <th style={{ padding:'6px 18px', fontSize:9, color:'rgba(255,255,255,0.7)', textTransform:'uppercase' as const, fontWeight:900, letterSpacing:'0.15em', textAlign:'center', width:'18%' }}>Quality</th>
                  <th style={{ padding:'6px 18px', fontSize:9, color:'#fff', textTransform:'uppercase' as const, fontWeight:900, letterSpacing:'0.15em', textAlign:'right', width:'26%' }}>Agnaa Cost</th>
                </tr>
              </thead>
              <tbody>
                {breakdown.map((item: any, idx: number) => (
                  <tr key={item.id} style={{ background: idx % 2 === 0 ? '#fff' : '#F8FAFC', borderBottom:'1px solid #F1F5F9' }}>
                    <td style={{ padding:'4px 18px' }}><span style={{ fontSize:11, fontWeight:800, color:'#0F172A', textTransform:'uppercase' as const }}>{item.label}</span></td>
                    <td style={{ padding:'4px 18px', textAlign:'center' as const }}>
                      <span style={{ fontSize:12, fontWeight:900, color:'#0F172A', fontVariantNumeric:'tabular-nums' as const }}>{fmt(item.qty)}</span>
                      <span style={{ fontSize:8, color:'#94A3B8', fontWeight:700, marginLeft:4, textTransform:'uppercase' as const }}>{item.unit}</span>
                    </td>
                    <td style={{ padding:'4px 18px', textAlign:'center' as const }}>
                      <span style={{ fontSize:8, fontWeight:900, color:'#7B2DBF', background:'rgba(123,45,191,0.06)', padding:'2px 8px', borderRadius:6, textTransform:'uppercase' as const, letterSpacing:'0.1em' }}>{item.quality}</span>
                    </td>
                    <td style={{ padding:'4px 18px', textAlign:'right' as const }}>
                      <span style={{ fontSize:12, fontWeight:900, color:'#7B2DBF', fontVariantNumeric:'tabular-nums' as const }}>₹{fmt(item.agnaaAmt)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* SAVINGS BADGE — 52px */}
          <div style={{ background:'linear-gradient(90deg,#0F172A,#1E293B)', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0 40px', height:'52px', flexShrink:0 }}>
            <div>
              <div style={{ fontSize:10, fontWeight:900, color:'#fff', textTransform:'uppercase' as const, letterSpacing:'0.25em' }}>AGNAA INTELLIGENT COST</div>
              <div style={{ fontSize:8, color:'rgba(255,255,255,0.5)', textTransform:'uppercase' as const, letterSpacing:'0.1em' }}>Save {((totalSavings/totalMkt)*100).toFixed(1)}% vs market — Hyderabad</div>
            </div>
            <div style={{ fontSize:26, fontWeight:900, color:'#fff', fontVariantNumeric:'tabular-nums' as const }}>₹{fmt(totalAgnaa)}</div>
          </div>

          {/* FOOTER — 40px */}
          <div style={{ borderTop:'1px solid #E5E7EB', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0 40px', height:'40px', flexShrink:0, background:'#fff' }}>
            <div style={{ fontSize:8, color:'#94A3B8', fontWeight:700, textTransform:'uppercase' as const, letterSpacing:'0.08em' }}>© 2026 AGNAA DESIGN STUDIO PRIVATE LIMITED • A-GRADE CONSTRUCTION</div>
            <div style={{ display:'flex', gap:8, alignItems:'center' }}>
              <span style={{ fontSize:9, fontWeight:900, color:'#7B2DBF' }}>+91 8826214348</span>
              <span style={{ fontSize:9, color:'#CBD5E1' }}>|</span>
              <span style={{ fontSize:9, fontWeight:900, color:'#0F172A' }}>WWW.AGNAA.IN</span>
              <span style={{ fontSize:7, background:'#FEF2F2', color:'#DC2626', fontWeight:900, padding:'2px 6px', borderRadius:4, textTransform:'uppercase' as const, letterSpacing:'0.1em' }}>VALID 30 DAYS</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function EstimatePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#F3F4F6]">
        <Loader2 className="w-12 h-12 text-[#1C1C72] animate-spin" />
      </div>
    }>
      <EstimateContent />
    </Suspense>
  );
}
