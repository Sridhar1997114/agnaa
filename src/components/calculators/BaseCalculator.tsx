"use client";

import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import { ArrowLeft, Download, Calculator, ShieldCheck, Ruler, Maximize2, Info } from 'lucide-react';
import Link from 'next/link';
import { CalculationVisualizer } from './CalculationVisualizer';
import { CalculatorPDFEngine } from './CalculatorPDFEngine';
import { AgnaaLogo as SharedLogo } from '../AgnaaLogo';
import { TerminalSearch } from '../layout/TerminalSearch';


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

  // Advanced UX
  visualizerType?: 'PLOT' | 'BUILT_UP' | 'FSI' | 'RCC' | 'EXCAVATION' | 'FOOTING' | 'STAIRCASE' | 'WALL' | 'TANK' | 'ROOF' | 'FLOOR' | 'SHAPE' | 'PLASTER' | 'PAINT' | 'ANTI_TERMITE' | 'STEEL' | 'PCC' | 'SETBACK' | 'G_N_FLOOR' | 'SHUTTERING' | 'SCAFFOLDING';

  visualizerData?: any;
  presets?: {
    current: string;
    onChange: (preset: string) => void;
    options: Array<{ id: string; label: string; desc: string }>;
  };
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
  pdfTotalSubtitle,
  visualizerType,
  visualizerData,
  presets
}: BaseCalculatorProps) {
  
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [toast, setToast] = useState<{ msg: string; err?: boolean } | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [today, setToday] = useState('');
  const [previewScale, setPreviewScale] = useState(1);
  const previewContainerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
    setToday(new Date().toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' }));
  }, []);

  useEffect(() => {
    if (!isCalculated || !previewContainerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        setPreviewScale(width / 794);
      }
    });
    observer.observe(previewContainerRef.current);
    
    // Initial
    const width = previewContainerRef.current.offsetWidth;
    setPreviewScale(width / 794);
    
    return () => observer.disconnect();
  }, [isCalculated]);

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
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
      };
      
      await html2pdf().set(opt).from(el).save();

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
      
      {/* PDF is now rendered inline within the results preview portal. */}

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
            <SharedLogo className="h-6 w-auto" />
            <div className="w-px h-4 bg-gray-300 mx-1"></div>
            <span className="text-xs font-black uppercase tracking-widest text-[#7B2DBF] hidden sm:inline-block">
              {title}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <TerminalSearch />
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

            {/* PRESET SELECTOR (If applicable) */}
            {presets && (
              <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-sm overflow-hidden relative">
                <div className="absolute top-0 right-0 p-2 opacity-5">
                  <ShieldCheck size={40} />
                </div>
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#7B2DBF] mb-4">Structural Confidence Profile</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {presets.options.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => presets.onChange(opt.id)}
                      className={`text-left p-3 rounded-xl border transition-all ${
                        presets.current === opt.id 
                          ? 'border-[#7B2DBF] bg-[#7B2DBF]/5 ring-1 ring-[#7B2DBF]' 
                          : 'border-gray-100 bg-gray-50 hover:border-gray-300'
                      }`}
                    >
                      <div className={`text-[9px] font-black uppercase tracking-widest mb-1 ${presets.current === opt.id ? 'text-[#7B2DBF]' : 'text-gray-500'}`}>
                        {opt.label}
                      </div>
                      <div className="text-[10px] text-gray-400 leading-tight">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Results Content */}
          <div className="lg:sticky lg:top-24">
            {isCalculated ? (
              <div className="animate-in slide-in-from-bottom-4 fade-in duration-500 space-y-6">
                {resultsContent}
                
                {/* ─── LIVE DRAFTING VISUALIZER ─── */}
                {visualizerType && (
                  <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#7B2DBF]">Live Drafting Port</h3>
                        <p className="text-xs text-gray-500 mt-1">Algorithmic Spatial Projection</p>
                      </div>
                      <div className="flex gap-1">
                        <div className="w-1 h-1 bg-[#7B2DBF] rounded-full animate-ping"></div>
                        <div className="text-[8px] font-bold text-[#7B2DBF] uppercase">System Live</div>
                      </div>
                    </div>
                    <CalculationVisualizer type={visualizerType} data={visualizerData} className="aspect-[4/3]" />
                  </div>
                )}
                
                {/* ─── A4 PREVIEW PORTAL ─── */}
                <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#7B2DBF]">Report Preview</h3>
                      <p className="text-xs text-gray-500 mt-1">A4 format, ready for dispatch</p>
                    </div>
                    <button
                      onClick={handleDownloadPdf}
                      disabled={loadingPdf}
                      className="text-[#1C1C72] hover:bg-gray-50 p-2 rounded-lg transition-colors disabled:opacity-50"
                      title="Download full PDF"
                    >
                      {loadingPdf ? (
                        <div className="w-4 h-4 border-2 border-[#1C1C72]/30 border-t-[#1C1C72] rounded-full animate-spin"></div>
                      ) : (
                        <Download size={18} />
                      )}
                    </button>
                  </div>

                    <div 
                      ref={previewContainerRef} 
                      className="w-full relative overflow-hidden bg-gray-100 rounded-lg border border-gray-200 shadow-inner"
                      style={{ height: `${(visualizerType ? 1123 * 2 : 1123) * previewScale}px` }}
                    >
                      <div style={{ transform: `scale(${previewScale})`, transformOrigin: 'top left', width: '794px' }}>
                        <CalculatorPDFEngine
                          id="agnaa-pdf-view-hq"
                          title={pdfTitle || title}
                          subtitle="Precision Engineering Report"
                          projectInfo={pdfProjectInfo}
                          contentTable={pdfContentTable}
                          summaryBox={pdfSummaryBox}
                          totalValue={pdfTotalValue}
                          totalSubtitle={pdfTotalSubtitle}
                          date={today}
                          logo={<SharedLogo className="h-10 w-auto" />}
                          watermarkLogo={<SharedLogo className="w-full h-full" />}
                          visualizer={visualizerType ? (
                            <div style={{ width: 400, height: 300 }}>
                              <CalculationVisualizer type={visualizerType} data={visualizerData} />
                            </div>
                          ) : undefined}
                          visualizerLabel={visualizerType ? `Structural Diagram // Ref: ${visualizerType}-01` : undefined}
                        />
                      </div>
                    </div>
                </div>
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
