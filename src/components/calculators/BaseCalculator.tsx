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

        <div className="grid lg:grid-cols-1 gap-8 items-start">
          {/* Form Content - Stage 1 */}
          <div className={`${isCalculated ? 'hidden lg:block lg:opacity-50 lg:pointer-events-none' : 'block animate-in fade-in transition-all duration-500'}`}>
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-[0.03]">
                  <Ruler size={120} />
                </div>
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#7B2DBF] mb-6">Input Parameters</h2>
                {inputsContent}
                
                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-3">
                  <button
                    onClick={onCalculate}
                    className="flex-1 bg-gradient-to-r from-[#1C1C72] to-[#2A1B81] hover:from-[#2A1B81] hover:to-[#3B1A91] text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <Calculator size={16} />
                    Process Calculation
                  </button>
                  {onReset && (
                    <button
                      onClick={onReset}
                      className="px-6 py-4 bg-gray-50 hover:bg-gray-100 text-gray-400 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* PRESET SELECTOR */}
              {presets && (
                <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-sm overflow-hidden relative">
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
                        <div className={`text-[9px] font-black uppercase tracking-widest mb-1 ${presets.current === opt.id ? 'text-[#7B2DBF]' : 'text-gray-50'}`}>
                          {opt.label}
                        </div>
                        <div className="text-[10px] text-gray-400 leading-tight">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Results Content - Stage 2 */}
          {isCalculated && (
            <div className="animate-in slide-in-from-bottom-8 fade-in duration-700 fill-mode-both space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-[#1C1C72]">Analysis Complete</h2>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Ref: AGNAA/EST/{today?.replace(/ /g, '-')}</p>
                  </div>
                </div>
                {onReset && (
                  <button
                    onClick={onReset}
                    className="flex items-center gap-2 text-xs font-bold text-[#7B2DBF] hover:bg-[#7B2DBF]/5 px-3 py-2 rounded-lg transition-colors uppercase tracking-widest"
                  >
                    <ArrowLeft size={14} />
                    Modify Inputs
                  </button>
                )}
              </div>

                  <div className="grid lg:grid-cols-[1fr,400px] gap-8 items-start relative">
                    <div className="space-y-8 relative z-10">
                      <div className="relative bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm overflow-hidden min-h-[400px]">
                        {/* TILED WATERMARK PATTERN FOR SCREENSHOT PROTECTION */}
                        <div className="absolute inset-0 pointer-events-none opacity-[0.04] grid grid-cols-2 sm:grid-cols-3 gap-20 p-10 rotate-[-15deg] scale-150">
                          {Array.from({ length: 12 }).map((_, i) => (
                            <SharedLogo key={i} className="w-40 h-auto" />
                          ))}
                        </div>
                        <div className="relative z-10">
                          {resultsContent}
                        </div>
                      </div>
                      
                      {/* ─── LIVE DRAFTING VISUALIZER (SVG) ─── */}
                      {visualizerType && (
                        <div className="bg-white rounded-3xl border border-gray-100 p-2 shadow-xl shadow-gray-200/50 relative group overflow-hidden">
                          {/* LARGE CENTER WATERMARK */}
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05]">
                            <SharedLogo className="w-[350px] h-auto rotate-[-10deg]" />
                          </div>
                          
                          <div className="absolute top-6 left-6 z-10 pointer-events-none">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-1.5 h-1.5 bg-[#7B2DBF] rounded-full animate-pulse"></div>
                              <span className="text-[9px] font-black text-[#7B2DBF] uppercase tracking-widest">Structural Projection</span>
                            </div>
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Blueprint v1.02</h3>
                          </div>
                          
                          <div className="bg-gray-50 rounded-[2.5rem] p-8 min-h-[450px] flex items-center justify-center border border-gray-100/50 relative z-10">
                            <CalculationVisualizer type={visualizerType} data={visualizerData} className="w-full h-full max-w-md drop-shadow-2xl" />
                          </div>
                        </div>
                      )}
                    </div>


                    {/* ─── A4 PREVIEW PORTAL ─── */}
                <div className="lg:sticky lg:top-24 space-y-4">
                  <div className="bg-[#1C1C72] rounded-3xl p-6 text-white shadow-2xl shadow-[#1C1C72]/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                    <div className="relative z-10">
                      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-4">Export Protocol</h3>
                      <p className="text-sm font-medium leading-relaxed mb-6">Generated a professional 2-page A4 architectural report with embedded visualizations.</p>
                      
                      <button
                        onClick={handleDownloadPdf}
                        disabled={loadingPdf}
                        className="w-full bg-white text-[#1C1C72] py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2 group disabled:opacity-50"
                      >
                        {loadingPdf ? (
                          <div className="w-4 h-4 border-2 border-[#1C1C72]/30 border-t-[#1C1C72] rounded-full animate-spin"></div>
                        ) : (
                          <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />
                        )}
                        Download Report
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-lg group">
                    <div className="p-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">A4 Preview Portal</span>
                      <Maximize2 size={12} className="text-gray-300" />
                    </div>
                    
                    <div 
                      ref={previewContainerRef} 
                      className="w-full relative overflow-hidden bg-gray-100 cursor-zoom-in"
                      style={{ height: `500px` }}
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
                    <div className="p-3 text-center bg-gray-50/30">
                      <span className="text-[8px] font-bold text-gray-300 uppercase tracking-[0.3em]">Multi-Page Architectural Dossier</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
