"use client";

import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { Inter, Space_Grotesk } from 'next/font/google';
import QuotationForm from './QuotationForm';
import QuotationPreview from './QuotationPreview';
import { QuotationState } from './types';
import { AgnaaLogo } from '@/components/AgnaaLogo';
import { ShieldCheck, Lock, ArrowLeft, FileText, CheckCircle2, Sparkles } from 'lucide-react';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });

const AUTH_PASSCODE = "88262143";

export default function QuotationPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [quotationData, setQuotationData] = useState<QuotationState | null>(null);

  useEffect(() => {
    // Check if session token exists
    const storedAuth = sessionStorage.getItem('agnaa_quotation_auth');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === AUTH_PASSCODE) {
      sessionStorage.setItem('agnaa_quotation_auth', 'true');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid Admin Passcode. Access Denied.');
    }
  };

  // ─── AUTH LOCK MODAL ───
  if (!isAuthenticated) {
    return (
      <div className={`${inter.variable} ${space.variable} font-sans min-h-screen bg-[#0A0B10] text-white flex items-center justify-center p-6 relative overflow-hidden`}>
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#7B2DBF]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-md w-full bg-[#12131C] border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10 text-center animate-in zoom-in-95 duration-500">
          <div className="w-16 h-16 bg-gradient-to-br from-[#1C1C72] to-[#7B2DBF] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#7B2DBF]/20">
            <Lock className="w-8 h-8 text-white" />
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-space font-bold tracking-tight text-white mb-2">
              AGNAA Commercial Portal
            </h1>
            <p className="text-xs text-white/50 font-medium">
              Internal Quotation Engine. Admin authorization required.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <input
                type="password"
                placeholder="Enter Passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-center font-mono text-lg tracking-[0.3em] text-white placeholder-white/20 focus:outline-none focus:border-[#7B2DBF] transition-all"
                autoFocus
              />
              {error && (
                <p className="text-xs text-rose-400 font-semibold mt-2 animate-bounce">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#1C1C72] to-[#7B2DBF] hover:from-[#2A1B81] hover:to-[#9335D2] text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <ShieldCheck size={18} />
              Unlock Commercial Engine
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-white/30">
            <ShieldCheck size={12} className="text-[#059669]" />
            <span>AGNAA OS v3.0 • Encrypted Channel</span>
          </div>
        </div>
      </div>
    );
  }

  // ─── AUTHENTICATED QUOTATION SUITE ───
  return (
    <div className={`${inter.variable} ${space.variable} font-sans min-h-screen bg-[#0A0B10] text-white p-4 md:p-8 lg:p-12 transition-colors duration-500`}>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js" />
      
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 pb-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all text-white/70 hover:text-white">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-[#7B2DBF]/20 text-[#7B2DBF] text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-md border border-[#7B2DBF]/30">
                  Internal Protocol
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 size={10} /> Authorized Session
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-space font-bold tracking-tight text-white flex items-center gap-3">
                Commercial <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B2DBF] to-indigo-400">Quotation Engine</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:block text-right">
              <p className="text-[10px] uppercase tracking-widest text-white/40">Studio Rate Matrix</p>
              <p className="text-xs font-bold text-white flex items-center gap-1 justify-end">
                <Sparkles size={12} className="text-[#7B2DBF]" /> Live Tier Pricing v2.4
              </p>
            </div>
            <AgnaaLogo className="h-9 w-auto" />
          </div>
        </header>

        {/* WORKSPACE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* FORM COLUMN */}
          <div className="bg-[#12131C] border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
              <h2 className="text-sm font-black uppercase tracking-widest text-white/80 flex items-center gap-2">
                <FileText size={16} className="text-[#7B2DBF]" /> Service & Scope Selection
              </h2>
              <span className="text-[10px] font-mono text-white/40">STEP 01</span>
            </div>
            
            <QuotationForm onUpdate={setQuotationData} />
          </div>

          {/* PREVIEW COLUMN */}
          <div className="bg-[#12131C] border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
              <h2 className="text-sm font-black uppercase tracking-widest text-white/80 flex items-center gap-2">
                <ShieldCheck size={16} className="text-emerald-400" /> A4 Commercial Dossier Preview
              </h2>
              <span className="text-[10px] font-mono text-white/40">STEP 02</span>
            </div>

            {quotationData ? (
              <QuotationPreview data={quotationData} />
            ) : (
              <div className="h-full min-h-[450px] flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-2xl bg-white/[0.02] text-center p-8">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/30 mb-4">
                  <FileText size={24} />
                </div>
                <p className="text-white/40 font-space text-sm max-w-xs">
                  Configure services and client details to build the commercial document
                </p>
              </div>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <footer className="mt-16 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-white/30 text-xs gap-4">
          <p>© {new Date().getFullYear()} AGNAA ARCHITECTS & INTERIORS. PROPRIETARY SYSTEM.</p>
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest">
            <span>Passcode Protected</span>
            <span>•</span>
            <span>Admin OS Integrated</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
