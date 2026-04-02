"use client";

import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import { ArrowLeft, Download, Calculator, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

// Logo component since importing might cause circular dependency or path issues if not exported correctly.
// Also ensures we have the exact SVG needed for the PDF export without relying on external layout wrappers.
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

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-plus-jakarta' });

interface BaseCalculatorProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  
  // UI Sections
  inputsContent: React.ReactNode;
  resultsContent: React.ReactNode;
  
  // State
  isCalculated: boolean;
  onCalculate: () => void;
  onReset?: () => void;
  
  // PDF specific
  pdfFileName: string;
  pdfTitle?: string; // e.g. "Plot Area\nEstimate"
  pdfProjectInfo?: Record<string, string>; // key-value pairs for top right of PDF
  pdfContentTable: React.ReactNode; // The breakdown table / primary content in PDF
  pdfSummaryBox?: React.ReactNode; // Optional bottom summary box in PDF
  pdfTotalValue?: string; // Optional final value string
  pdfTotalSubtitle?: string; // Optional text right below final value
}

export function BaseCalculator({
  title,
  description,
  icon = <Calculator className="w-5 h-5" />,
  inputsContent,
  resultsContent,
  isCalculated,
  onCalculate,
  onReset,
  pdfFileName,
  pdfTitle = title,
  pdfProjectInfo = {},
  pdfContentTable,
  pdfSummaryBox = null,
  pdfTotalValue,
  pdfTotalSubtitle
}: BaseCalculatorProps) {
  
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [toast, setToast] = useState<{ msg: string; err?: boolean } | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [today, setToday] = useState('');

  useEffect(() => {
    setIsClient(true);
    setToday(new Date().toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' }));
  }, []);

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
      
      const opt = {
        margin:       0,
        filename:     pdfFileName,
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

      setToast({ msg: 'Estimate Downloaded Successfully!', err: false });

    } catch(err: any) {
      console.error('PDF Generation Error:', err);
      setToast({ msg: 'PDF Export Failed', err: true });
    } finally {
      setLoadingPdf(false);
      setTimeout(() => setToast(null), 3000);
    }
  };

  const formattedPdfTitle = pdfTitle.includes('\n') 
    ? pdfTitle.split('\n').map((line, i) => <React.Fragment key={i}>{line}<br/></React.Fragment>)
    : <>{pdfTitle}<br/>Estimate</>;

  return (
    <div className={`antialiased bg-[#F8FAFC] min-h-screen relative text-[#0F172A] ${inter.variable} ${plusJakarta.variable}`}>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js" strategy="afterInteractive" />
      
      {/* ─── HIDDEN A4 PDF EXPORT — 794×1123px (A4 @ 96dpi) ─── */}
      {isClient && (
        <div id="pdf-export-wrapper" style={{ position:'absolute', top:'-9999px', left:'-9999px', pointerEvents:'none', opacity:0, overflow:'hidden', width:'794px', height:'1123px' }}>
          <div id="agnaa-pdf-view-hq" style={{ width:'794px', height:'1123px', background:'#fff', position:'relative', fontFamily:'Inter, sans-serif', color:'#0F172A', display:'flex', flexDirection:'column', overflow:'hidden' }}>
            
            {/* Subtle Watermark - 5% opacity */}
            <div style={{ position:'absolute', top:'55%', left:'50%', transform:'translate(-50%,-50%) rotate(-15deg)', width:500, opacity:0.05, zIndex:0, pointerEvents:'none' }}>
              <AgnaaLogo fill="#1C1C72" width={500} height={500} />
            </div>

            {/* 1. HEADER */}
            <div style={{ background:'linear-gradient(135deg, #1C1C72 0%, #2A1B81 100%)', padding:'40px 50px', color:'#fff', display:'flex', justifyContent:'space-between', alignItems:'flex-start', borderBottom:'6px solid #7B2DBF', flexShrink:0 }}>
              <div>
                <AgnaaLogo fill="#fff" width={70} height={70} className="mb-4" />
                <div style={{ height:2, width:60, background:'#7B2DBF', marginBottom:12 }} />
                <h1 style={{ fontSize:32, fontWeight:900, textTransform:'uppercase', letterSpacing:'-0.02em', margin:0, lineHeight:0.9 }}>
                  {formattedPdfTitle}
                </h1>
              </div>
              <div style={{ textAlign:'right' }}>
                <div style={{ fontSize:9, fontWeight:900, textTransform:'uppercase', letterSpacing:'0.2em', color:'#A5B4FC', marginBottom:8 }}>Report Config</div>
                {Object.entries(pdfProjectInfo).map(([k, v]) => (
                  <div key={k} style={{ marginBottom: 4 }}>
                    <div style={{ fontSize:15, fontWeight:700, color:'#fff' }}>{v}</div>
                    <div style={{ fontSize:9, color:'#94A3B8' }}>{k}</div>
                  </div>
                ))}
                <div style={{ fontSize:11, color:'#94A3B8', marginTop:8 }}>Date: {today}</div>
              </div>
            </div>

            {/* 3. BREAKDOWN / CONTENT TABLE */}
            <div style={{ flex:1, padding:'30px 50px', overflow:'hidden' }}>
              <div style={{ fontSize:10, fontWeight:900, textTransform:'uppercase', letterSpacing:'0.1em', color:'#1C1C72', marginBottom:15, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span>{title} Detailed Analysis</span>
                <span style={{ color:'#7B2DBF' }}>Page 1 of 1</span>
              </div>
              {pdfContentTable}
            </div>

            {/* 4. SUMMARY BOX */}
            {pdfSummaryBox && (
              <div style={{ padding:'0 50px 30px', flexShrink:0 }}>
                {pdfSummaryBox}
              </div>
            )}

            {/* 5. FINISHERS */}
            <div style={{ background:'linear-gradient(to right, #1C1C72, #7B2DBF)', height:80, display:'flex', alignItems:'center', padding:'0 50px', justifyContent:'space-between', flexShrink:0 }}>
              <div style={{ color:'rgba(255,255,255,0.6)', fontSize:8, fontWeight:600, maxWidth:400 }}>
                ESTIMATE SUBJECT TO TERMS & CONDITIONS. VALUES ARE INDICATIVE AND PROVIDED BY AGNAA ENGINEERING STANDARDS.
              </div>
              {pdfTotalValue && (
                <div style={{ textAlign:'right' }}>
                  <div style={{ fontSize:7, color:'#A5B4FC', fontWeight:900, textTransform:'uppercase' }}>Final Computed Value</div>
                  <div style={{ fontSize:28, fontWeight:900, color:'#fff', fontVariantNumeric:'tabular-nums', lineHeight:1 }}>{pdfTotalValue}</div>
                  {pdfTotalSubtitle && <div style={{ fontSize:8, color:'#7B2DBF', fontWeight:900, textTransform:'uppercase' }}>{pdfTotalSubtitle}</div>}
                </div>
              )}
            </div>

            {/* 6. LEGAL FOOTER */}
            <div style={{ borderTop:'1px solid #F1F5F9', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0 50px', height:'50px', flexShrink:0, background:'#fff' }}>
              <div style={{ fontSize:7, color:'#94A3B8', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em', maxWidth:350 }}>
                © 2026 AGNAA DESIGN STUDIO PRIVATE LIMITED • THIS REPORT IS GENERATED BY AGNAA PRECISION ENGINE.
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

      {/* ─── TOAST NOTIFICATION ─── */}
      {toast && (
        <div className={`fixed top-20 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-sm font-bold animate-in slide-in-from-right flex items-center gap-2
          ${toast.err ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
          {!toast.err && <ShieldCheck size={16} />}
          {toast.msg}
        </div>
      )}

      {/* ─── HEADER ─── */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-3 sm:px-6 lg:px-8 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/calculators" className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-[#1C1C72]">
            <ArrowLeft size={18} />
          </Link>
          <div className="flex items-center gap-2">
            <AgnaaLogo className="h-6 w-auto" />
            <div className="w-px h-4 bg-gray-300 mx-1"></div>
            <span className="text-xs font-black uppercase tracking-widest text-[#7B2DBF] hidden sm:inline-block">
              {title}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isCalculated && (
            <button
              onClick={handleDownloadPdf}
              disabled={loadingPdf}
              className="bg-[#1C1C72] hover:bg-[#2A1B81] text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50"
            >
              {loadingPdf ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <Download size={14} />
              )}
              <span className="hidden sm:inline-block">Download PDF</span>
              <span className="sm:hidden">PDF</span>
            </button>
          )}
        </div>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Title & Desc */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-2xl shadow-sm border border-gray-100 mb-4 text-[#7B2DBF]">
            {icon}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#1C1C72] tracking-tight mb-3">
            {title}
          </h1>
          <p className="text-gray-500 text-sm sm:text-base max-w-2xl leading-relaxed">
            {description}
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr,400px] gap-8 items-start">
          {/* Form Content */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-sm">
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#7B2DBF] mb-6">Input Parameters</h2>
              {inputsContent}
              
              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-3">
                <button
                  onClick={onCalculate}
                  className="flex-1 bg-gradient-to-r from-[#1C1C72] to-[#2A1B81] hover:from-[#2A1B81] hover:to-[#3B1A91] text-white py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs transition-all shadow-md active:scale-[0.98]"
                >
                  Calculate Now
                </button>
                {onReset && (
                  <button
                    onClick={onReset}
                    className="px-6 py-3.5 bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {/* Results Content */}
          <div className="lg:sticky lg:top-24">
            {isCalculated ? (
              <div className="animate-in slide-in-from-bottom-4 fade-in duration-500">
                {resultsContent}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-8 text-center flex flex-col items-center justify-center h-full min-h-[300px]">
                <Calculator className="w-12 h-12 text-gray-200 mb-4" />
                <h3 className="text-sm font-bold text-gray-400 mb-1">Awaiting Inputs</h3>
                <p className="text-xs text-gray-400">Enter parameters and calculate to view results</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
