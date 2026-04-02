"use client";

import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import { ArrowLeft, Download, Calculator, ShieldCheck, Ruler, Maximize2, Info, MessageCircle } from 'lucide-react';
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
  visualizerType?: 'PLOT' | 'BUILT_UP' | 'FSI' | 'RCC' | 'EXCAVATION' | 'FOOTING' | 'STAIRCASE' | 'WALL' | 'TANK' | 'ROOF' | 'FLOOR' | 'SHAPE' | 'PLASTER' | 'PAINT' | 'ANTI_TERMITE' | 'STEEL' | 'PCC' | 'SETBACK' | 'G_N_FLOOR' | 'SHUTTERING' | 'SCAFFOLDING' | 'ELECTRICAL' | 'INTERIOR';

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
  
  const [whatsappNumber, setWhatsappNumber] = useState('');
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
        margin: 0,
        filename: pdfFileName,
        image: { type: 'jpeg', quality: 1.0 },
        html2canvas: { 
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
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };
      
      await html2pdf().set(opt).from(el).save();
      setToast({ msg: 'Estimate Downloaded Successfully!', err: false });
    } catch (err: any) {
      console.error('PDF Generation Error:', err);
      setToast({ msg: 'PDF Export Failed', err: true });
    } finally {
      setLoadingPdf(false);
      setTimeout(() => setToast(null), 3000);
    }
  };

  const handleWhatsAppRequest = async () => {
    if (!whatsappNumber || whatsappNumber.length < 10) {
      setToast({ msg: 'Please enter a valid WhatsApp number', err: true });
      return;
    }

    setLoadingPdf(true);
    
    // Construct calculation summary for WhatsApp
    // We try to extract some text from results or use the title
    const summaryText = `Hi AGNAA, I just generated a ${title} report using the Agnaa Calculator. \n\nI'd like to receive the official A4 PDF report on this number: ${whatsappNumber}.\n\nReference: ${title} / ${today}`;
    const encodedMsg = encodeURIComponent(summaryText);
    const whatsappUrl = `https://wa.me/918826214348?text=${encodedMsg}`;

    // Show success toast
    setToast({ msg: 'Requesting on WhatsApp...', err: false });
    
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setLoadingPdf(false);
    }, 1500);
  };

  const formattedPdfTitle = pdfTitle.includes('\n') 
    ? pdfTitle.split('\n').map((line, i) => <React.Fragment key={i}>{line}<br/></React.Fragment>)
    : <>{pdfTitle}<br/>Estimate</>;

  return (
    <div className={`antialiased bg-[#F8FAFC] min-h-screen relative text-[#0F172A] ${inter.variable} ${plusJakarta.variable}`}>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js" strategy="afterInteractive" />
      
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
            <span className="text-xs font-black uppercase tracking-widest text-[#7B2DBF]">
              {title}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <TerminalSearch />
        </div>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Stage 1: Inputs (Hidden when calculated to focus on results) */}
        {!isCalculated && (
          <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
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
              <div className="mt-6 bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-sm overflow-hidden relative">
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
                      <div className={`text-[9px] font-black uppercase tracking-widest mb-1 ${presets.current === opt.id ? 'text-[#7B2DBF]' : 'text-gray-400'}`}>
                        {opt.label}
                      </div>
                      <div className="text-[10px] text-gray-400 leading-tight">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Stage 2: Cinematic Results */}
        {isCalculated && (
          <div className="animate-in slide-in-from-bottom-8 fade-in duration-700 fill-mode-both space-y-8">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
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

            <div className="relative overflow-hidden bg-white rounded-[3rem] border border-gray-100 shadow-2xl shadow-gray-200/50 p-8 sm:p-12 min-h-[600px]">
              {/* GLOBAL TILED WATERMARK COVERING ENTIRE RESULTS SECTION */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.03] grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-24 p-12 rotate-[-15deg] scale-125">
                {Array.from({ length: 48 }).map((_, i) => (
                  <SharedLogo key={i} className="w-48 h-auto" />
                ))}
              </div>

              <div className="relative z-10 space-y-12">
                {/* Results Data Grid */}
                <div className="max-w-4xl mx-auto">
                  {resultsContent}
                </div>
                
                {/* ─── EXPANDED CINEMATIC VISUALIZER ─── */}
                {visualizerType && (
                  <div className="max-w-6xl mx-auto">
                    <div className="bg-white rounded-[3.5rem] border border-gray-100/50 p-4 relative group overflow-hidden shadow-inner">
                      {/* LARGE CENTER WATERMARK BEHIND BLUEPRINT */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
                        <SharedLogo className="w-[500px] h-auto rotate-[-5deg]" />
                      </div>
                      
                      <div className="absolute top-10 left-10 z-10 pointer-events-none">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-2 h-2 bg-[#7B2DBF] rounded-full animate-pulse shadow-[0_0_10px_rgba(123,45,191,0.5)]"></div>
                          <span className="text-[10px] font-black text-[#7B2DBF] uppercase tracking-[0.3em]">Engineering Blueprint v1.02</span>
                        </div>
                        <h3 className="text-xs font-bold text-gray-300 uppercase tracking-tighter">AGNAA PRECISION ENGINE // {visualizerType}</h3>
                      </div>
                      
                      <div className="bg-white rounded-[3rem] p-12 min-h-[600px] flex items-center justify-center relative z-10">
                        <CalculationVisualizer 
                          type={visualizerType} 
                          data={visualizerData} 
                          className="w-full h-full max-w-4xl drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-transform duration-700 group-hover:scale-[1.02]" 
                        />
                      </div>

                      {/* Hidden A4 Portal (Still needed for PDF logic) */}
                      <div className="hidden">
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
                )}

                {/* ─── REFINED GLOBAL CALL TO ACTION ─── */}
                <div className="max-w-md mx-auto pt-8">
                  <div className="bg-[#1C1C72] rounded-[2.5rem] p-8 text-white shadow-2xl shadow-[#1C1C72]/30 relative overflow-hidden text-center">
                    <div className="relative z-10 space-y-6">
                      <div>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-white/40 mb-3">Download Engineering Report</h3>
                        <p className="text-sm font-medium leading-relaxed italic opacity-80">Submit your WhatsApp to receive the technical A4 dossier.</p>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="relative">
                          <input 
                            type="tel"
                            placeholder="WhatsApp Number"
                            value={whatsappNumber}
                            onChange={(e) => setWhatsappNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                            className="w-full bg-white/10 border border-white/20 rounded-2xl py-5 px-8 text-white placeholder-white/30 focus:outline-none focus:border-white/50 transition-all font-mono tracking-[0.2em] text-center text-lg"
                          />
                        </div>

                        <button
                          onClick={handleWhatsAppRequest}
                          disabled={loadingPdf || whatsappNumber.length < 10}
                          className="w-full bg-[#25D366] text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all hover:shadow-[0_0_40px_rgba(37,211,102,0.5)] active:scale-[0.98] flex items-center justify-center gap-3 group disabled:opacity-50 disabled:grayscale"
                        >
                          {loadingPdf ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          ) : (
                            <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
                          )}
                          Get Report on WhatsApp
                        </button>
                        
                        {/* Secondary Silent Download */}
                        <button
                          onClick={handleDownloadPdf}
                          disabled={loadingPdf}
                          className="w-full py-2 text-[10px] font-bold text-white/30 hover:text-white transition-colors uppercase tracking-widest"
                        >
                          Direct Download (Beta)
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
