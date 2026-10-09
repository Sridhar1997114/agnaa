"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { AgnaaLogo } from '@/components/AgnaaLogo';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  Circle,
  Activity, 
  LogOut,
  Sparkles,
  Zap,
  Globe,
  Search,
  Lock,
  CreditCard,
  FileText,
  Layers,
  ShieldCheck,
  Download,
  Filter,
  Flame,
  FileCheck2,
  Clock,
  ArrowRight
} from 'lucide-react';
import portalData from './data.json';

export default function EnthalpyLabsStatusPage() {
  const router = useRouter();
  const [session, setSession] = useState<{ clientName: string; id: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'done' | 'handover'>('all');
  const [selectedStage, setSelectedStage] = useState<string>('all');

  useEffect(() => {
    try {
      const savedSession = localStorage.getItem('client_session');
      if (savedSession) {
        setSession(JSON.parse(savedSession));
      } else {
        const defaultSession = { clientName: 'Enthalpy Labs', id: 'AGN080426-1001' };
        localStorage.setItem('client_session', JSON.stringify(defaultSession));
        setSession(defaultSession);
      }
    } catch {
      setSession({ clientName: 'Enthalpy Labs', id: 'AGN080426-1001' });
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('client_session');
    }
    router.push('/client');
  };

  // Filtered stages & items
  const filteredStages = useMemo(() => {
    return portalData.stages
      .filter((stage) => {
        if (selectedStage !== 'all' && stage.id !== selectedStage) return false;
        return true;
      })
      .map((stage) => {
        const matchingItems = stage.items.filter((item) => {
          if (activeTab === 'done' && item.status !== 'done') return false;
          if (activeTab === 'handover' && item.status !== 'todo') return false;
          if (searchQuery.trim() !== '') {
            const q = searchQuery.toLowerCase();
            return (
              item.name.toLowerCase().includes(q) ||
              item.desc.toLowerCase().includes(q) ||
              stage.title.toLowerCase().includes(q)
            );
          }
          return true;
        });

        return {
          ...stage,
          items: matchingItems
        };
      })
      .filter((stage) => stage.items.length > 0);
  }, [searchQuery, activeTab, selectedStage]);

  const totalFilteredCount = useMemo(() => {
    return filteredStages.reduce((acc, s) => acc + s.items.length, 0);
  }, [filteredStages]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] pb-24 font-sans selection:bg-[#7B2DBF]/15 selection:text-[#1C1C72]">
      {/* Top Executive Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <AgnaaLogo className="h-9 w-auto" />
            <div className="hidden sm:block h-5 w-px bg-slate-200" />
            <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-slate-500 uppercase">
              <span className="text-[#1C1C72] font-black">Client</span> Executive Portal
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200/80 text-xs font-semibold text-slate-700">
              <span className="w-2 h-2 rounded-full bg-[#7B2DBF] animate-pulse" />
              <span>Enthalpy Labs</span>
              <span className="text-slate-400 font-mono text-[11px]">({session?.id || 'AGN080426-1001'})</span>
            </div>

            <button 
              onClick={handleLogout}
              className="px-4 py-2 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center gap-2 shadow-sm cursor-pointer"
              title="End Secure Session"
            >
              <LogOut className="h-3.5 w-3.5 text-slate-500" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-6 pt-10">
        
        {/* Hero Header Section */}
        <div className="grid lg:grid-cols-[1fr,auto] gap-8 items-end mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#1C1C72]/5 to-[#7B2DBF]/5 border border-[#1C1C72]/15 text-[11px] font-bold text-[#1C1C72] tracking-wide mb-4 shadow-sm">
              <Activity className="h-3.5 w-3.5 text-[#7B2DBF] animate-pulse" />
              <span>Live Deliverables & Project Handover Tracker</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-3">
              Enthalpy Labs <span className="text-slate-400 font-light">Dashboard</span>
            </h1>
            <p className="text-slate-600 text-base md:text-lg max-w-2xl leading-relaxed">
              Every deliverable documented, every milestone reconciled. Tracking the complete end-to-end branding, digital infrastructure, 126 web pages, and business assets built by AGNAA.
            </p>
          </div>

          {/* Top Metric Cards */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-md">
            <div className="text-center px-2">
              <div className="text-3xl sm:text-4xl font-black text-[#1C1C72] mb-0.5">{portalData.stats.deliverables}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Tasks</div>
            </div>
            <div className="w-px bg-slate-200" />
            <div className="text-center px-2">
              <div className="text-3xl sm:text-4xl font-black text-[#7B2DBF] mb-0.5">{portalData.stats.stages}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Stages</div>
            </div>
            <div className="w-px bg-slate-200" />
            <div className="text-center px-2">
              <div className="text-3xl sm:text-4xl font-black text-[#D97706] mb-0.5">4</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Days Active</div>
            </div>
          </div>
        </div>

        {/* Executive Progress Card */}
        <section className="bg-white rounded-[32px] p-8 md:p-10 border border-slate-200/90 shadow-lg mb-12 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-6">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Project Scope Execution</p>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900">
                {portalData.progress.completed} <span className="text-slate-400 font-normal">/ {portalData.progress.total} Tasks Completed</span>
              </h2>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-[#1C1C72]">{portalData.progress.percent}%</span>
              <span className="text-xs font-bold text-[#7B2DBF] uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                Handover & Review Phase
              </span>
            </div>
          </div>

          {/* AGNAA Gradient Progress Bar — Filled to 95% */}
          <div className="w-full h-5 bg-slate-100 rounded-full overflow-hidden p-1 border border-slate-200/90 mb-10 shadow-inner">
            <div 
              style={{ width: `${portalData.progress.percent}%` }}
              className="h-full bg-gradient-to-r from-[#1C1C72] via-[#4A259C] to-[#7B2DBF] rounded-full shadow-[0_0_15px_rgba(123,45,191,0.4)]"
            />
          </div>

          {/* 4 Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {portalData.summary.map((item, idx) => (
              <div key={idx} className={`${item.bg} rounded-2xl p-5 border ${item.border} shadow-sm transition-transform hover:-translate-y-0.5`}>
                <div className={`text-2xl sm:text-3xl font-black mb-1 ${item.color}`}>{item.val}</div>
                <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">{item.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Handover & Final Review Spotlight Banner */}
        <div className="bg-gradient-to-r from-purple-50 via-indigo-50/50 to-amber-50/60 rounded-3xl p-6 md:p-8 border border-purple-200/70 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#1C1C72] text-white flex items-center justify-center flex-shrink-0 shadow-md">
              <Sparkles className="h-6 w-6 text-[#F4B400]" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#7B2DBF] mb-1">
                <Clock className="h-3.5 w-3.5" /> 5% Remaining Scope in Review
              </div>
              <h3 className="text-lg font-black text-slate-900">
                Final Collateral & Presentation Sign-off Today
              </h3>
              <p className="text-slate-600 text-sm mt-1 max-w-2xl leading-relaxed">
                All 164 core deliverables (126 web pages, 100 whitepapers, 1,500 FAQs, 12 staff IDs, visiting cards) are complete. The remaining 8 items awaiting review with Hari Sir include the final tri-fold brochure, partner pitch deck, official legal rubber stamps, letterhead print sign-off, and production domain cutover.
              </p>
            </div>
          </div>

          <div className="flex-shrink-0 flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-white border border-purple-200 text-[#1C1C72] shadow-sm">
              8 Tasks in Review
            </span>
          </div>
        </div>

        {/* Interactive Filter & Search Toolbar */}
        <section className="mb-10 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text"
                placeholder="Search across all 172 deliverables (e.g. brochure, stamps, ID cards, DSC)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7B2DBF]/20 focus:border-[#7B2DBF] transition-all shadow-sm"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filter Pills with AGNAA Gradient on Active */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <button 
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shadow-sm cursor-pointer ${activeTab === 'all' ? 'bg-gradient-to-r from-[#1C1C72] to-[#7B2DBF] text-white shadow-md' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}`}
              >
                All Tasks ({portalData.progress.total})
              </button>
              <button 
                onClick={() => setActiveTab('done')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shadow-sm flex items-center gap-1.5 cursor-pointer ${activeTab === 'done' ? 'bg-gradient-to-r from-[#1C1C72] to-[#7B2DBF] text-white shadow-md' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}`}
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                Completed ({portalData.progress.completed})
              </button>
              <button 
                onClick={() => setActiveTab('handover')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shadow-sm flex items-center gap-1.5 cursor-pointer ${activeTab === 'handover' ? 'bg-gradient-to-r from-[#1C1C72] to-[#7B2DBF] text-white shadow-md' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}`}
              >
                <Circle className="h-3.5 w-3.5 text-amber-500" />
                In Review ({portalData.progress.total - portalData.progress.completed})
              </button>
            </div>
          </div>

          {/* Stage Selector Dropdown */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1 mr-2">
              <Filter className="h-3 w-3" /> Filter Stage:
            </span>
            <button
              onClick={() => setSelectedStage('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${selectedStage === 'all' ? 'bg-slate-900 text-white font-bold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              All Stages
            </button>
            {portalData.stages.map((st) => (
              <button
                key={st.id}
                onClick={() => setSelectedStage(st.id)}
                className={`px-3 py-1 rounded-lg text-xs transition-all flex items-center gap-1.5 cursor-pointer ${selectedStage === st.id ? 'bg-[#1C1C72] text-white font-bold shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                <span>{st.icon}</span>
                <span className="truncate max-w-[120px]">{st.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Results Counter Bar */}
        <div className="flex justify-between items-center text-xs font-bold text-slate-400 mb-6 uppercase tracking-wider">
          <span>Displaying {totalFilteredCount} matching deliverables</span>
          {searchQuery && <span>Search filter active</span>}
        </div>

        {/* Stages Grid with Clean AGNAA Palette */}
        <section className="space-y-10">
          {filteredStages.map((stage) => (
            <div key={stage.id} className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-sm">
              {/* Stage Header */}
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-2xl shadow-sm">
                    {stage.icon}
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                      {stage.title}
                    </h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                      Stage Deliverables
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-3.5 py-1 rounded-full text-xs font-bold tracking-wide border ${stage.doneItems === stage.totalItems ? 'bg-purple-50 text-[#7B2DBF] border-purple-200' : 'bg-amber-50 text-amber-800 border-amber-200'}`}>
                    {stage.count}
                  </span>
                </div>
              </div>

              {/* Items Grid with Clean AGNAA Theme */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stage.items.map((item, j) => (
                  <div 
                    key={j} 
                    className={`p-5 rounded-2xl border transition-all duration-200 flex items-start gap-4 ${item.status === 'done' ? 'bg-white border-slate-200/90 hover:border-[#7B2DBF]/40 hover:shadow-sm' : 'bg-amber-50/40 border-amber-200/80 hover:bg-amber-50/70'}`}
                  >
                    <div className={`mt-0.5 h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${item.status === 'done' ? 'bg-emerald-500 text-white' : 'bg-amber-100 text-amber-700 border border-amber-300'}`}>
                      {item.status === 'done' ? (
                        <CheckCircle2 size={14} strokeWidth={3} />
                      ) : (
                        <Circle size={14} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className={`text-sm font-bold leading-snug ${item.status === 'done' ? 'text-slate-900' : 'text-amber-950 font-black'}`}>
                          {item.name}
                        </h4>
                        {item.status === 'todo' && (
                          <span className="text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md border border-amber-200 flex-shrink-0">
                            In Review
                          </span>
                        )}
                      </div>
                      <p className={`text-xs leading-relaxed ${item.status === 'done' ? 'text-slate-500' : 'text-amber-800/90'}`}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {filteredStages.length === 0 && (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm">
              <Search className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <h4 className="text-lg font-bold text-slate-800 mb-1">No matching deliverables found</h4>
              <p className="text-sm text-slate-500">Try adjusting your search query or stage filter above.</p>
            </div>
          )}
        </section>

        {/* Project Milestones & Financial Reconciliation */}
        <section className="mt-16 bg-white rounded-[36px] p-8 md:p-12 border border-slate-200/90 shadow-xl">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#1C1C72]/5 to-[#7B2DBF]/5 border border-[#1C1C72]/20 text-xs font-bold text-[#1C1C72] mb-3">
              <CreditCard className="h-3.5 w-3.5 text-[#7B2DBF]" />
              Transparent Financial Ledger & Milestone Log
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-3">
              Project Milestones & Deliverable Handover
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Fully reconciled with AGNAA Official Invoice (Option 02 Negotiated Value ₹1,25,000.00).
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-8">
            {portalData.milestones.map((m, idx) => (
              <div 
                key={idx} 
                className={`p-6 rounded-3xl border transition-all ${m.status === 'paid' ? 'bg-emerald-50/60 border-emerald-200' : m.status === 'active' ? 'bg-purple-50/70 border-purple-200 shadow-sm' : 'bg-slate-50 border-slate-200'}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    {m.label}
                  </span>
                  {m.status === 'paid' && (
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  )}
                  {m.status === 'active' && (
                    <span className="h-2 w-2 rounded-full bg-[#7B2DBF] animate-ping" />
                  )}
                </div>

                <div className={`text-xl font-black mb-2 ${m.status === 'paid' ? 'text-emerald-800' : m.status === 'active' ? 'text-[#1C1C72]' : 'text-slate-700'}`}>
                  {m.val}
                </div>

                <div className={`text-xs font-semibold ${m.status === 'paid' ? 'text-emerald-700' : m.status === 'active' ? 'text-[#7B2DBF]' : 'text-slate-500'}`}>
                  {m.tag}
                </div>
              </div>
            ))}
          </div>

          {/* Action Callout Bar */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#1C1C72] shadow-sm">
                <FileCheck2 className="h-5 w-5" />
              </div>
              <div>
                <h5 className="text-sm font-bold text-slate-900">Official AGNAA Tax Invoice & Statement of Account</h5>
                <p className="text-xs text-slate-500 mt-0.5">Option 02 negotiated @ ₹1.25L &bull; Paid: ₹55,000 &bull; Balance Due: ₹70,000</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full md:w-auto justify-end flex-wrap">
              <a 
                href="/downloads/AGNAA_Official_Invoice_EnthalpyLabs.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 text-xs font-bold shadow-sm transition-all cursor-pointer"
              >
                <FileText className="h-3.5 w-3.5 text-[#1C1C72]" />
                <span>View Clean HTML</span>
              </a>

              <a 
                href="/downloads/AGNAA_Official_Invoice_EnthalpyLabs.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#1C1C72] to-[#7B2DBF] hover:from-[#151559] hover:to-[#6823a3] text-white text-xs font-bold shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download Invoice PDF</span>
              </a>
            </div>
          </div>
        </section>

        {/* Executive Studio Footer */}
        <footer className="text-center pt-16 pb-8 text-xs font-bold text-slate-400 tracking-[0.25em] uppercase">
          AGNAA Design Studio &bull; Architecture & Digital Engineering &bull; Hyderabad
        </footer>

      </main>
    </div>
  );
}
