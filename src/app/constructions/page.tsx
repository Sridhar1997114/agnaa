"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Scale, 
  Lock,
  ChevronRight
} from 'lucide-react';

export default function ConstructionsPage() {
  const [activeTab, setActiveTab] = useState<'escrow' | 'tax' | 'warranty'>('escrow');

  // Interactive Pure Agent Tax & Escrow Gate Simulator State
  const [calcPlotYards, setCalcPlotYards] = useState<number>(500);
  const [calcTier, setCalcTier] = useState<'luxury' | 'ultra'>('luxury');
  const [showDossier, setShowDossier] = useState<boolean>(false);

  const ratePerSqft = calcTier === 'luxury' ? 2450 : 3450;
  const builtUpSqft = Math.round(calcPlotYards * 9 * 1.5);
  const grossCapital = builtUpSqft * ratePerSqft;
  const pmcFee = grossCapital * 0.14;
  const contractorTax = grossCapital * 0.18;
  const agnaaPureAgentTax = pmcFee * 0.18;
  const netTaxSavings = contractorTax - agnaaPureAgentTax;

  const gates = [
    { name: "Gate 01: Substructure & Plinth Beam Casting", pct: 15, amt: grossCapital * 0.15 },
    { name: "Gate 02: Ground & First Floor RCC Framed Slabs", pct: 25, amt: grossCapital * 0.25 },
    { name: "Gate 03: 200mm AAC Masonry & MEP Conduiting", pct: 20, amt: grossCapital * 0.20 },
    { name: "Gate 04: Weatherproof Plaster & Double Glazing", pct: 15, amt: grossCapital * 0.15 },
    { name: "Gate 05: Italian Marble Flooring & Wall Priming", pct: 15, amt: grossCapital * 0.15 },
    { name: "Gate 06: Joinery, Snags & 24-Month DLP Escrow", pct: 10, amt: grossCapital * 0.10 },
  ];

  const fmt = (num: number) => {
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(2)} L`;
    return `₹${Math.round(num).toLocaleString('en-IN')}`;
  };

  const directWhatsApp = (subject: string) => {
    const text = encodeURIComponent(`Hi Ar. Sridhar, I am inquiring regarding AGNAA Turnkey Construction: ${subject}`);
    window.open(`https://wa.me/918826214348?text=${text}`, '_blank');
  };

  return (
    <div className="bg-white min-h-screen text-[#1D1D1F] pt-24 pb-24 font-sans selection:bg-[#7B2DBF] selection:text-white">
      
      {/* ── 1. HERO SECTION ── */}
      <section className="pt-16 pb-20 text-center bg-white border-b border-black/[0.06] relative overflow-hidden">
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] pointer-events-none opacity-40 z-0"
          style={{
            background: 'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(123, 45, 191, 0.12), rgba(28, 28, 114, 0.06), transparent 75%)'
          }}
        />

        <div className="max-w-[1040px] mx-auto px-5 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#F8F9FA] border border-black/[0.08] text-[11px] font-semibold tracking-[0.2em] text-[#5F6368] uppercase shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span>Turnkey EPC Protocol • Pass-Through Escrow • Hyderabad</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.035em] text-[#1C1C72] leading-[1.08]">
            Architectural Construction.
            <span className="block text-2xl sm:text-4xl font-semibold bg-gradient-to-r from-[#1C1C72] via-[#7B2DBF] to-[#2563EB] bg-clip-text text-transparent mt-2 tracking-normal">
              Zero Markup. Guaranteed Provenance.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#5F6368] max-w-[780px] mx-auto leading-relaxed">
            Eliminating traditional contractor arbitrage through Council of Architecture direct supervision (CA/2023/161405), Tri-Partite Bank Escrow accounts, and Rule 33 Pure Agent pass-through procurement.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => directWhatsApp('Luxury Turnkey Villa Execution Commission')}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#1C1C72] to-[#7B2DBF] hover:opacity-95 text-white font-medium text-sm transition-all shadow-md cursor-pointer flex items-center gap-2"
            >
              <span>Consult Ar. Sridhar Chauhan</span>
              <ArrowRight size={16} />
            </button>
            <Link
              href="/calc"
              className="px-6 py-3.5 rounded-full bg-[#F8F9FA] hover:bg-[#F1F3F4] text-[#1C1C72] font-semibold text-sm border border-black/[0.08] transition-all"
            >
              <span>Setback & RCC Suite</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. THE 3 CONTRACTUAL PILLARS (SPEC-08 CODIFIED) ── */}
      <section className="py-24 bg-[#F8F9FA] border-b border-black/[0.06]">
        <div className="max-w-[1080px] mx-auto px-5 space-y-12">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/[0.08] pb-6">
            <div>
              <span className="text-[11px] font-mono tracking-widest text-[#7B2DBF] uppercase font-bold">
                SPEC-08 Legal & Commercial Protocols
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-[#1C1C72] mt-1">
                The Anatomy of Sovereign Turnkey EPC.
              </h2>
            </div>
            <span className="text-xs font-mono text-[#5F6368]">
              Council of Architecture Reg. CA/2023/161405
            </span>
          </div>

          {/* Interactive Feature Tabs */}
          <div className="flex gap-2 p-1.5 bg-black/[0.04] rounded-2xl text-xs font-mono font-bold max-w-lg">
            <button
              onClick={() => setActiveTab('escrow')}
              className={`flex-1 py-2.5 px-4 rounded-xl transition-all ${activeTab === 'escrow' ? 'bg-white shadow text-[#1C1C72]' : 'text-[#5F6368] hover:text-[#1C1C72]'}`}
            >
              Tri-Partite Escrow
            </button>
            <button
              onClick={() => setActiveTab('tax')}
              className={`flex-1 py-2.5 px-4 rounded-xl transition-all ${activeTab === 'tax' ? 'bg-white shadow text-[#1C1C72]' : 'text-[#5F6368] hover:text-[#1C1C72]'}`}
            >
              Pure Agent GST
            </button>
            <button
              onClick={() => setActiveTab('warranty')}
              className={`flex-1 py-2.5 px-4 rounded-xl transition-all ${activeTab === 'warranty' ? 'bg-white shadow text-[#1C1C72]' : 'text-[#5F6368] hover:text-[#1C1C72]'}`}
            >
              10-Yr Chemical Bond
            </button>
          </div>

          {/* Tab 1: Tri-Partite Bank Escrow */}
          {activeTab === 'escrow' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white p-8 sm:p-12 rounded-[32px] border border-black/[0.08] shadow-sm">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1C72]/10 text-[#1C1C72] text-xs font-mono font-bold">
                  <Lock size={14} className="text-[#7B2DBF]" />
                  <span>SPEC-08 §3.12 • ZERO-LIEN ESCROW PROTOCOL</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#1C1C72] leading-tight">
                  Funds Protected in a Joint Bank Escrow.
                </h3>
                <p className="text-sm text-[#5F6368] leading-relaxed">
                  Traditional contractors divert Project A's advances to fund Project B's deficits. AGNAA mandates a tri-partite project escrow account with a scheduled commercial bank (HDFC / ICICI / SBI).
                </p>
                <ul className="space-y-3 text-xs font-medium text-[#1C1C72]">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#7B2DBF] shrink-0 mt-0.5" />
                    <span><strong>Dual Authorization:</strong> Disbursed only upon physical site verification by Ar. M. Sridhar Chauhan and digital sign-off by the Client.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#7B2DBF] shrink-0 mt-0.5" />
                    <span><strong>Direct Mill Settlement:</strong> Factory invoices for Tata Tiscon steel and UltraTech cement are funded directly from escrow.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#7B2DBF] shrink-0 mt-0.5" />
                    <span><strong>Zero Contractor Float:</strong> Eliminates site stoppages, contractor insolvency, and mid-construction disputes.</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-[#0A0D1A] text-white font-mono text-xs space-y-4 border border-white/10">
                <div className="flex items-center justify-between text-[11px] text-[#A5B4FC] border-b border-white/10 pb-3">
                  <span>ESCROW DISBURSEMENT GATES (SAMPLE ₹4.5 CR VILLA)</span>
                  <span className="text-[#10B981]">DUAL SIGN-OFF</span>
                </div>
                <div className="space-y-2 text-[11px]">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Gate 01: Substructure & Plinth LVL +450</span>
                    <span className="font-bold text-white">15% (₹67.5L)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Gate 02: Ground & First Floor RCC Slabs</span>
                    <span className="font-bold text-white">25% (₹1.12 Cr)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Gate 03: AAC Masonry & MEP Conduiting</span>
                    <span className="font-bold text-white">20% (₹90.0L)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Gate 04: Weatherproof Plaster & Glazing</span>
                    <span className="font-bold text-white">15% (₹67.5L)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Gate 05: Italian Marble Flooring & Priming</span>
                    <span className="font-bold text-white">15% (₹67.5L)</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Gate 06: Joinery, Snags & 24-Mo DLP Escrow</span>
                    <span className="font-bold text-purple-300">10% (₹45.0L)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Pure Agent GST Optimization */}
          {activeTab === 'tax' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white p-8 sm:p-12 rounded-[32px] border border-black/[0.08] shadow-sm">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-mono font-bold">
                  <Scale size={14} className="text-emerald-600" />
                  <span>SPEC-08 §3.13 • CGST RULE 33 COMPLIANCE</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#1C1C72] leading-tight">
                  Zero Cascading Tax on Primary Materials.
                </h3>
                <p className="text-sm text-[#5F6368] leading-relaxed">
                  Under conventional turnkey contracts, contractors add an 18% GST surcharge onto gross turnover, effectively levying tax on material taxes. AGNAA operates as a statutory <strong>Pure Agent</strong>.
                </p>
                <ul className="space-y-3 text-xs font-medium text-[#1C1C72]">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#7B2DBF] shrink-0 mt-0.5" />
                    <span><strong>Direct Factory Invoicing:</strong> Invoices for steel, cement, and RMC are billed directly from the manufacturer to the Client's legal name/PAN.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#7B2DBF] shrink-0 mt-0.5" />
                    <span><strong>100% Tax Savings on Capital:</strong> Saves villa owners ₹36 Lakhs to ₹90 Lakhs in avoidable cascading contractor tax.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#7B2DBF] shrink-0 mt-0.5" />
                    <span><strong>Transparent Fee Structure:</strong> GST (18%) is charged solely on AGNAA's professional PMC design and supervision fee.</span>
                  </li>
                </ul>
              </div>

              <div className="p-7 rounded-2xl bg-[#F8F9FA] border border-black/[0.08] space-y-4 text-xs">
                <span className="font-mono font-bold text-[#1C1C72] uppercase text-[11px] tracking-wider block border-b border-black/[0.06] pb-2">
                  Tax Cascade Comparison (₹5 Cr Luxury Villa)
                </span>
                
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 space-y-1">
                  <div className="font-bold flex justify-between">
                    <span>Traditional Turnkey Contractor:</span>
                    <span>+₹90 Lakhs GST</span>
                  </div>
                  <p className="text-[11px] text-red-700">18% GST levied on gross ₹5 Cr construction bill, double-taxing raw steel and cement.</p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1">
                  <div className="font-bold flex justify-between">
                    <span>AGNAA Pure Agent Architecture:</span>
                    <span className="text-emerald-700">₹12.6 Lakhs GST</span>
                  </div>
                  <p className="text-[11px] text-emerald-800">18% GST applied exclusively to ₹70L architectural & PMC services fee. Direct ₹77.4 Lakhs net client savings.</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: 10-Year Chemical Warranty Bond */}
          {activeTab === 'warranty' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white p-8 sm:p-12 rounded-[32px] border border-black/[0.08] shadow-sm">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-mono font-bold">
                  <ShieldCheck size={14} className="text-blue-600" />
                  <span>SPEC-08 §3.14 • DECCAN GROUND BONDING</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#1C1C72] leading-tight">
                  10-Year Sub-Structure Chemical Warranty.
                </h3>
                <p className="text-sm text-[#5F6368] leading-relaxed">
                  Subterranean moisture ingress and termite attacks account for 78% of latent residential structural litigation. AGNAA binds every turnkey handover with verified chemical guarantees.
                </p>
                <ul className="space-y-3 text-xs font-medium text-[#1C1C72]">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#7B2DBF] shrink-0 mt-0.5" />
                    <span><strong>IS 6313 Anti-Termite Guarantee:</strong> Pre-construction pressurized emulsion injection along footing trenches and plinth beams, backed by Bayer/Pest Control India joint warranty.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#7B2DBF] shrink-0 mt-0.5" />
                    <span><strong>IS 5966 Crystalline Waterproofing:</strong> Hydrophilic crystalline slurry applied to all basement retaining walls, lift pits, and sunken slabs.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#7B2DBF] shrink-0 mt-0.5" />
                    <span><strong>10-Year Performance Retention Bond:</strong> 5% capital or bank guarantee held to enforce free remedial pressure grouting within 14 days of notice.</span>
                  </li>
                </ul>
              </div>

              <div className="aspect-[16/10] relative rounded-2xl overflow-hidden border border-black/[0.06] shadow-sm">
                <Image
                  src="/projects/manila/balinese-luxury-resort-villa-exterior.webp"
                  alt="AGNAA Turnkey Luxury Villa Waterproofing & Structure"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D1A]/85 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white space-y-1">
                    <span className="text-[10px] font-mono text-purple-300 font-bold uppercase">Material Invariant</span>
                    <div className="text-sm font-bold">28-Day Concrete Cube Compressive Strength Tested</div>
                    <div className="text-xs text-slate-300">Target M30/M35 verified via NABL-accredited third-party labs.</div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ── 3. INTERACTIVE PURE AGENT TAX & ESCROW GATE SIMULATOR (SPEC-08 §3.12 - §3.13) ── */}
      <section className="py-20 bg-white border-b border-black/[0.06]">
        <div className="max-w-[1080px] mx-auto px-5 space-y-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/[0.08] pb-6">
            <div>
              <span className="text-[11px] font-mono tracking-widest text-[#2563EB] uppercase font-bold">
                Interactive Financial Modeling (SPEC-08)
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1C72] mt-1">
                Calculate Exact Escrow Milestones & Tax Savings.
              </h2>
            </div>
            <button
              onClick={() => setShowDossier(!showDossier)}
              className="px-5 py-2 rounded-full border border-[#7B2DBF]/30 bg-purple-50 text-[#7B2DBF] hover:bg-[#7B2DBF] hover:text-white transition-all text-xs font-mono font-bold cursor-pointer"
            >
              {showDossier ? 'Close Specifications' : 'Inspect Technical BOQ Dossier'}
            </button>
          </div>

          {/* Interactive Calculator Bento */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Input Controls (5 cols) */}
            <div className="lg:col-span-5 rounded-3xl bg-[#F8F9FA] border border-black/[0.08] p-7 space-y-6">
              <div>
                <span className="text-[10px] font-mono text-[#5F6368] uppercase tracking-wider block">Plot Dimensions</span>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xl font-bold text-[#1C1C72]">{calcPlotYards} Sq. Yards</span>
                  <span className="text-xs font-mono text-[#7B2DBF] font-bold">{(calcPlotYards * 9).toLocaleString('en-IN')} Sq. Ft Plot</span>
                </div>
                <input 
                  type="range"
                  min="250"
                  max="1500"
                  step="25"
                  value={calcPlotYards}
                  onChange={(e) => setCalcPlotYards(Number(e.target.value))}
                  className="w-full mt-3 accent-[#7B2DBF] cursor-pointer"
                />
              </div>

              <div>
                <span className="text-[10px] font-mono text-[#5F6368] uppercase tracking-wider block mb-2">Specification Tier</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setCalcTier('luxury')}
                    className={`py-3 px-3 rounded-2xl border text-xs font-bold transition-all text-left cursor-pointer ${
                      calcTier === 'luxury'
                        ? 'bg-[#1C1C72] text-white border-[#1C1C72] shadow-sm'
                        : 'bg-white text-[#5F6368] border-black/[0.08] hover:border-black/[0.2]'
                    }`}
                  >
                    <span className="block text-[11px] font-normal opacity-80">Prime Residential</span>
                    <span>Luxury (₹2,450/sft)</span>
                  </button>
                  <button
                    onClick={() => setCalcTier('ultra')}
                    className={`py-3 px-3 rounded-2xl border text-xs font-bold transition-all text-left cursor-pointer ${
                      calcTier === 'ultra'
                        ? 'bg-[#1C1C72] text-white border-[#1C1C72] shadow-sm'
                        : 'bg-white text-[#5F6368] border-black/[0.08] hover:border-black/[0.2]'
                    }`}
                  >
                    <span className="block text-[11px] font-normal opacity-80">Jubilee/Kokapet</span>
                    <span>Ultra (₹3,450/sft)</span>
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-black/[0.06] space-y-2 text-xs">
                <div className="flex justify-between text-[#5F6368]">
                  <span>Permissible Built-Up (FSI 1.5):</span>
                  <span className="font-bold text-[#1C1C72]">{builtUpSqft.toLocaleString('en-IN')} sq.ft</span>
                </div>
                <div className="flex justify-between text-[#5F6368]">
                  <span>Gross Capital Construction:</span>
                  <span className="font-bold text-[#1C1C72]">{fmt(grossCapital)}</span>
                </div>
                <div className="flex justify-between text-[#5F6368] border-t border-black/[0.06] pt-2">
                  <span>AGNAA PMC Fee (14%):</span>
                  <span className="font-bold text-[#7B2DBF]">{fmt(pmcFee)}</span>
                </div>
              </div>

              {/* Tax Savings Callout */}
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
                <span className="text-[10px] font-mono text-emerald-800 font-bold uppercase tracking-wider block">
                  Rule 33 Pure Agent Net Savings
                </span>
                <div className="text-2xl font-bold text-emerald-950">
                  {fmt(netTaxSavings)} Saved
                </div>
                <p className="text-[11px] text-emerald-800 leading-relaxed">
                  Contractor double-tax of {fmt(contractorTax)} reduced to {fmt(agnaaPureAgentTax)} via direct mill invoicing for Tata Tiscon steel & UltraTech cement.
                </p>
              </div>
            </div>

            {/* Escrow Milestone Release Schedule (7 cols) */}
            <div className="lg:col-span-7 rounded-3xl bg-[#0A0D1A] text-white p-7 sm:p-8 flex flex-col justify-between border border-white/10 space-y-6">
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#A5B4FC] uppercase font-bold">
                      SPEC-08 §3.12 Tri-Partite Escrow Account
                    </span>
                    <h3 className="text-xl font-bold text-white mt-0.5">
                      Milestone Release Gates ({fmt(grossCapital)} Total)
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                    DUAL SIGN-OFF
                  </span>
                </div>

                <div className="space-y-3 pt-5">
                  {gates.map((g, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/5 text-xs font-mono">
                      <div className="space-y-0.5 max-w-[70%]">
                        <span className="text-white font-medium block truncate">{g.name}</span>
                        <span className="text-[10px] text-slate-400">Tranche {i + 1} • {g.pct}% Total Allocation</span>
                      </div>
                      <span className="font-bold text-purple-300 text-sm">{fmt(g.amt)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <span className="text-slate-400 font-mono text-[11px]">
                  Funds released strictly on physical verification & MTC lab checks.
                </span>
                <button
                  onClick={() => directWhatsApp(`Turnkey Villa Quotation for ${calcPlotYards} sq.yds (${calcTier}) - Budget ${fmt(grossCapital)}`)}
                  className="px-6 py-2.5 rounded-full bg-white text-[#1C1C72] hover:bg-slate-100 font-bold font-mono transition-all w-full sm:w-auto text-center cursor-pointer"
                >
                  Inquire Calibrated Dossier ↗
                </button>
              </div>
            </div>

          </div>

          {/* Expandable Technical BOQ & Specification Dossier Drawer */}
          {showDossier && (
            <div className="p-8 rounded-3xl bg-[#F8F9FA] border border-black/[0.08] space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-black/[0.06] pb-4 flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#7B2DBF] uppercase tracking-wider">
                    Turnkey Architectural Specification Dossier
                  </span>
                  <h4 className="text-xl font-bold text-[#1C1C72]">
                    Material Invariants & Engineering Standards
                  </h4>
                </div>
                <span className="text-xs font-mono text-[#5F6368]">NABL Third-Party Tested</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                <div className="p-5 rounded-2xl bg-white border border-black/[0.06] space-y-2">
                  <span className="font-mono font-bold text-[#1C1C72] uppercase text-[11px] block">1. Structural & Concrete</span>
                  <p className="text-[#5F6368] leading-relaxed">
                    M30/M35 design mix from verified batching plants (UltraTech/ACC). Direct mill Tata Tiscon Fe 500D rebar with 28-day cube crushing tests verified under IS 456.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-black/[0.06] space-y-2">
                  <span className="font-mono font-bold text-[#1C1C72] uppercase text-[11px] block">2. Thermal Envelope & Glazing</span>
                  <p className="text-[#5F6368] leading-relaxed">
                    Wienerberger Porotherm hollow clay masonry with thermal U-value &lt; 0.8 W/m²K. Saint-Gobain Low-E double-glazed units with thermal break aluminum frames.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-black/[0.06] space-y-2">
                  <span className="font-mono font-bold text-[#1C1C72] uppercase text-[11px] block">3. Micro-Architecture & Joinery</span>
                  <p className="text-[#5F6368] leading-relaxed">
                    Solid quarter-sawn Burma teak entry portals and stairs with concealed acoustic gaskets. 20mm book-matched Italian Statuario marble with epoxy grout.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ── 4. FLAGSHIP RESIDENTIAL PORTFOLIO ANCHOR ── */}
      <section className="py-24 bg-white">
        <div className="max-w-[1080px] mx-auto px-5 space-y-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/[0.08] pb-6">
            <div>
              <span className="text-[11px] font-mono tracking-widest text-[#7B2DBF] uppercase font-bold">
                Private Commission Ledger
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1C72] mt-1">
                Turnkey Civil & Structural Works.
              </h2>
            </div>
            <Link href="/design-studio" className="text-[#1C1C72] hover:text-[#7B2DBF] inline-flex items-center gap-1.5 text-sm font-bold">
              <span>View 114+ Studio Registry</span>
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="rounded-3xl border border-black/[0.08] bg-[#F8F9FA] overflow-hidden flex flex-col justify-between">
              <div>
                <div className="aspect-[16/10] relative w-full bg-slate-200">
                  <Image 
                    src="/projects/manila/balinese-luxury-resort-villa-exterior.webp" 
                    alt="Balinese Luxury Villa Architecture" 
                    fill 
                    className="object-cover" 
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 text-[10px] font-mono text-white font-bold">
                    2024
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#5F6368]">
                    <span className="font-bold text-[#7B2DBF]">Turnkey Villa</span>
                    <span>Kokapet, Hyderabad</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#1C1C72]">Balinese Resort Residence</h3>
                  <p className="text-xs text-[#5F6368] leading-relaxed">
                    Full-cycle civil execution: M35 RCC framed structure, cantilevered pool, direct mill steel pass-through.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0 border-t border-black/[0.05] mt-4 flex items-center justify-between text-xs font-bold text-[#1C1C72]">
                <button onClick={() => directWhatsApp('Balinese Resort Residence Turnkey Inquiry')} className="hover:text-[#7B2DBF] cursor-pointer">
                  Inquire Specifications ↗
                </button>
                <span className="text-[11px] font-mono text-slate-400">₹4.2 Cr Scope</span>
              </div>
            </div>

            <div className="rounded-3xl border border-black/[0.08] bg-[#F8F9FA] overflow-hidden flex flex-col justify-between">
              <div>
                <div className="aspect-[16/10] relative w-full bg-slate-200">
                  <Image 
                    src="/projects/manila/sunder-nursery-garden-house.webp" 
                    alt="Sunder Nursery Garden House" 
                    fill 
                    className="object-cover" 
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 text-[10px] font-mono text-white font-bold">
                    2023
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#5F6368]">
                    <span className="font-bold text-[#7B2DBF]">Passive Solar</span>
                    <span>New Delhi / Hyderabad</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#1C1C72]">Sunder Nursery Garden House</h3>
                  <p className="text-xs text-[#5F6368] leading-relaxed">
                    Dressed red sandstone cladding, thermal-break double glazing, and passive solar seasonal envelopes.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0 border-t border-black/[0.05] mt-4 flex items-center justify-between text-xs font-bold text-[#1C1C72]">
                <button onClick={() => directWhatsApp('Sunder Nursery Garden House Case Study')} className="hover:text-[#7B2DBF] cursor-pointer">
                  Inquire Specifications ↗
                </button>
                <span className="text-[11px] font-mono text-slate-400">AKTC Pedigree</span>
              </div>
            </div>

            <div className="rounded-3xl border border-black/[0.08] bg-[#F8F9FA] overflow-hidden flex flex-col justify-between">
              <div>
                <div className="aspect-[16/10] relative w-full bg-slate-200">
                  <Image 
                    src="/projects/manila/double-height-sculptural-atrium-lobby.webp" 
                    alt="Bespoke Sculptural Atrium" 
                    fill 
                    className="object-cover" 
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 text-[10px] font-mono text-white font-bold">
                    2025
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#5F6368]">
                    <span className="font-bold text-[#7B2DBF]">Micro-Architecture</span>
                    <span>Jubilee Hills</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#1C1C72]">Sculpted Teak Staircase Atrium</h3>
                  <p className="text-xs text-[#5F6368] leading-relaxed">
                    Solid quarter-sawn Burma teak joinery, concealed brass stringer anchors, and acoustic millwork.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0 border-t border-black/[0.05] mt-4 flex items-center justify-between text-xs font-bold text-[#1C1C72]">
                <button onClick={() => directWhatsApp('Teak Staircase Atrium Architectural Joinery')} className="hover:text-[#7B2DBF] cursor-pointer">
                  Inquire Specifications ↗
                </button>
                <span className="text-[11px] font-mono text-slate-400">Handcrafted</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── 5. CONCIERGE CTA ── */}
      <section className="py-20 bg-[#F8F9FA] text-center border-t border-black/[0.06]">
        <div className="max-w-[720px] mx-auto px-5 space-y-5">
          <span className="text-[11px] font-mono tracking-widest text-[#5F6368] uppercase font-bold">
            Milestone Commissioning
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-[#1C1C72] tracking-tight">
            Commission a Turnkey Residence.
          </h2>
          <p className="text-sm sm:text-base text-[#5F6368] max-w-lg mx-auto leading-relaxed">
            Directly engage Ar. M. Sridhar Chauhan (SPA Delhi) for site inspections, statutory byelaw viability, and zero-markup material escrow contracts.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => directWhatsApp('Direct Principal Turnkey Villa Engagement')}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#1C1C72] to-[#7B2DBF] hover:opacity-95 text-white font-bold text-sm transition-all shadow-md cursor-pointer flex items-center gap-2"
            >
              <span>Connect on WhatsApp: +91 8826214348</span>
              <ArrowRight size={15} />
            </button>
            <a
              href="mailto:sridhar.ar@agnaa.in"
              className="px-7 py-3.5 rounded-full bg-white border border-black/[0.12] hover:border-black/[0.25] text-[#1C1C72] text-sm font-bold transition-all shadow-sm"
            >
              sridhar.ar@agnaa.in
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
