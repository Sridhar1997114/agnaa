import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  MessageCircle, 
  ArrowUpRight, 
  ShieldCheck, 
  Compass, 
  Layers, 
  ChevronRight, 
  CheckCircle2, 
  Calculator,
  BookOpen,
  Terminal,
  Building2,
  Hammer,
  Code2,
  Check
} from 'lucide-react';
import { BLOG_POSTS } from '@/app/blog/data';
import VoiceSimulatorIsland from '@/components/home/VoiceSimulatorIsland';
import ZoningSearchIsland from '@/components/home/ZoningSearchIsland';
import ProjectsFilterIsland from '@/components/home/ProjectsFilterIsland';

export default function HomePage() {
  const featuredArticles = BLOG_POSTS.slice(0, 3);
  const whatsappConsultUrl = `https://wa.me/918826214348?text=${encodeURIComponent('Hi Ar. Sridhar, I am reviewing the AGNAA Interdisciplinary Design Studio platform and would like to consult with you directly regarding a project commission.')}`;

  return (
    <div className="bg-white min-h-screen text-[#1D1D1F] font-sans selection:bg-[#7B2DBF] selection:text-white pb-24">

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 1. MONUMENTAL ARCHITECTURAL HERO (EGM RESTRAINED CANVAS)     */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="pt-32 sm:pt-40 pb-20 text-center bg-white relative overflow-hidden">
        {/* Luminous Ambient Light */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[600px] pointer-events-none opacity-40 z-0"
          style={{
            background: 'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(123, 45, 191, 0.14), rgba(28, 28, 114, 0.08), transparent 75%)'
          }}
        />

        <div className="max-w-[1080px] mx-auto px-5 relative z-10 space-y-6">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#F8F9FA] border border-black/[0.08] text-[11px] font-mono font-semibold tracking-[0.2em] text-[#5F6368] uppercase shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
            <span>SPA Delhi • CA/2023/161405 • Financial District, Hyderabad</span>
          </div>

          {/* Monumental Headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-[76px] font-bold tracking-[-0.035em] text-[#1C1C72] leading-[1.04]">
            From Code to Concrete.
            <span className="block text-2xl sm:text-4xl lg:text-[36px] font-semibold text-[#5F6368] mt-3 tracking-[-0.02em]">
              Urban Design, Institutional Campuses & Living Habitats
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg font-normal text-[#5F6368] tracking-[-0.01em] max-w-2xl mx-auto leading-relaxed">
            Directed by Ar. M. Sridhar Chauhan (SPA Delhi). A sovereign interdisciplinary studio executing territorial urban master planning, institutional campuses, high-density residential habitats, and turnkey bespoke estates with zero-latency in-house AI systems.
          </p>

          {/* Dual Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3 text-[15px]">
            <a 
              href={whatsappConsultUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#1C1C72] to-[#7B2DBF] hover:opacity-95 text-white font-medium transition-all shadow-[0_10px_30px_rgba(28,28,114,0.22)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center gap-2.5 text-sm"
            >
              <MessageCircle size={18} />
              <span>Consult Ar. Sridhar</span>
            </a>
            <Link 
              href="/design-studio" 
              className="px-6 py-3.5 rounded-full bg-[#F8F9FA] hover:bg-[#F1F3F4] text-[#1C1C72] font-semibold border border-black/[0.08] transition-all inline-flex items-center gap-2 hover:scale-[1.02] text-sm"
            >
              <span>Explore 114+ Masterworks</span>
              <ChevronRight size={17} />
            </Link>
          </div>

          {/* Cinematic Flagship Visual Anchor */}
          <div className="pt-8">
            <Link 
              href="/design-studio/sunder-nursery-garden-house"
              className="block group"
            >
              <div className="relative w-full aspect-[16/9] max-w-[1080px] mx-auto rounded-[32px] overflow-hidden shadow-[0_30px_80px_rgba(28,28,114,0.12)] border border-black/[0.06]">
                <Image 
                  src="/projects/manila/sunder-nursery-garden-house.webp" 
                  alt="Sunder Nursery Garden House by AGNAA" 
                  fill
                  priority
                  sizes="(max-width: 1200px) 100vw, 1080px"
                  className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D1A]/85 via-transparent to-transparent flex items-end p-8 sm:p-14 text-left">
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-mono tracking-widest text-purple-300 uppercase font-bold">
                      Flagship Spatial Commission • New Delhi / Hyderabad
                    </span>
                    <h2 className="text-white text-2xl sm:text-4xl font-bold tracking-tight">
                      Sunder Nursery Garden House
                    </h2>
                    <p className="text-white/80 text-xs sm:text-sm font-medium max-w-xl">
                      Passive solar orientation, sculpted stone masonry, and high-performance climate envelope designed and executed under NBC 2026 statutory rigor.
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>

        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 2. THE DUAL-ENGINE MATRIX (ELEPHANT & GOLDFISH MODEL)        */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#F8F9FA] border-y border-black/[0.06]">
        <div className="max-w-[1080px] mx-auto px-5 space-y-12">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/[0.08] pb-6">
            <div>
              <span className="text-[11px] font-mono tracking-widest text-[#7B2DBF] uppercase font-bold">
                Two Symbiotic Engines
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-[#1C1C72] mt-1">
                The Architecture of AGNAA.
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#5F6368] font-medium max-w-md">
              A sovereign interdisciplinary practice where spatial luxury construction and zero-latency computational engineering reinforce each other.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* ── ENGINE 1: SPATIAL ARCHITECTURE & TURNKEY CONSTRUCTION ── */}
            <div className="rounded-[32px] bg-white p-8 sm:p-10 flex flex-col justify-between border border-black/[0.08] shadow-sm hover:shadow-[0_20px_50px_rgba(28,28,114,0.08)] transition-all duration-500 group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono tracking-widest text-[#1C1C72] uppercase font-bold px-3 py-1 rounded-full bg-[#F1F3F4] border border-black/[0.05]">
                    Engine 01 / Spatial & Civil
                  </span>
                  <span className="text-xs font-semibold text-[#5F6368]">114+ Delivered Works</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1C72]">
                  Urban Design, Institutional Campuses & Living Habitats.
                </h3>
                <p className="text-sm text-[#5F6368] leading-relaxed">
                  Full-scale territorial urban planning, institutional and university campuses, high-density residential habitats, and turnkey bespoke estates with direct-to-source civil material escrow and verified master craftsmen across Hyderabad and beyond.
                </p>

                <ul className="space-y-2 text-xs font-medium text-[#1C1C72] pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-[#7B2DBF] shrink-0" />
                    <span>Statutory Sanctions: HMDA, GHMC G.O. 168 & NBC 2026</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-[#7B2DBF] shrink-0" />
                    <span>Turnkey Civil Execution: Direct-to-source concrete & steel escrow</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-[#7B2DBF] shrink-0" />
                    <span>Aga Khan Trust for Culture & State Ministerial Pedigree</span>
                  </li>
                </ul>

                <div className="pt-2">
                  <Link href="/constructions" className="text-[#1C1C72] hover:text-[#7B2DBF] inline-flex items-center gap-1.5 text-sm font-bold">
                    <span>Inspect Construction Standards & Pricing</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>

              <div className="mt-8 rounded-2xl overflow-hidden aspect-[16/10] relative shadow-sm border border-black/[0.06]">
                <Image 
                  src="/projects/manila/balinese-luxury-resort-villa-exterior.webp" 
                  alt="Balinese Luxury Villa Architecture" 
                  fill
                  sizes="(max-width: 768px) 100vw, 520px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>

            {/* ── ENGINE 2: COMPUTATIONAL SYSTEMS & AI ── */}
            <div className="rounded-[32px] bg-[#0A0D1A] text-white p-8 sm:p-10 flex flex-col justify-between border border-white/10 hover:shadow-[0_20px_50px_rgba(123,45,191,0.2)] transition-all duration-500 group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono tracking-widest text-purple-400 uppercase font-bold px-3 py-1 rounded-full bg-white/[0.08] border border-white/10">
                    Engine 02 / Computation & AI
                  </span>
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Checkpoint-250 Ready
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  AGNAA Voice v2.0 & Custom Reasoning AI.
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  In-house trained reasoning models (Checkpoint-250 for Aayam proportions & NBC byelaws), zero-latency offline Whisper dictation for AutoCAD/Revit, and 12 live civil engineering calculators.
                </p>

                <ul className="space-y-2 text-xs font-medium text-slate-300 pt-2 font-mono">
                  <li className="flex items-center gap-2">
                    <Terminal size={14} className="text-purple-400 shrink-0" />
                    <span>AGNAA Voice v2.0: Sub-0.4s F8 Whisper CAD Dictation (442MB)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Terminal size={14} className="text-purple-400 shrink-0" />
                    <span>Checkpoint-250: Trained Aayam & GHMC Reasoning Engine</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Terminal size={14} className="text-purple-400 shrink-0" />
                    <span>12 Free Calculators: Setback Envelopes, RCC Steel, FSI/FAR</span>
                  </li>
                </ul>

                <div className="pt-2">
                  <Link href="/calc" className="text-purple-400 hover:text-purple-300 inline-flex items-center gap-1.5 text-sm font-bold">
                    <span>Launch 12 Engineering Calculators</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>

              {/* Hardware Preview Container */}
              <div className="mt-8 rounded-2xl bg-white/[0.04] border border-white/10 p-5 space-y-3 backdrop-blur-md">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>OFFLINE CAD COMPANION • WINDOWS PORTABLE</span>
                  <span className="text-purple-400 font-bold">F8 GLOBAL KEY</span>
                </div>
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 font-mono text-xs flex items-center justify-between text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-white font-semibold">Whisper F8 Model Active</span>
                  </div>
                  <span className="text-emerald-400 font-bold">Sub-0.4s Local Latency</span>
                </div>
                <div className="text-center text-[11px] text-slate-400 font-mono">
                  AutoCAD • Revit • Windows Desktop • Zero Cloud Dependency
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 3. THE ARCHITECTURAL CONTINUUM (EGM LOOP STEPPER)            */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-[1080px] mx-auto px-5 space-y-14">
          
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <span className="text-[11px] font-mono tracking-widest text-[#7B2DBF] uppercase font-bold">
              The Sovereign Execution Continuum
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-[#1C1C72]">
              From Raw Land to Bespoke Handover.
            </h2>
            <p className="text-sm text-[#5F6368]">
              A continuous, milestone-verified lifecycle combining algorithmic byelaw compliance with uncompromising material craftsmanship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            
            {/* Step 1 */}
            <div className="relative pt-6 border-t-2 border-[#1C1C72] space-y-3">
              <span className="text-[11px] font-mono text-[#7B2DBF] font-bold tracking-widest">
                STEP 01
              </span>
              <h3 className="text-lg font-bold text-[#1C1C72]">
                Algorithmic Byelaw Zoning
              </h3>
              <p className="text-xs text-[#5F6368] leading-relaxed">
                Automated GHMC G.O. 168, TG-bPASS setback calculation, permissible FAR/FSI optimization, and statutory sanction mapping.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative pt-6 border-t-2 border-[#1C1C72] space-y-3">
              <span className="text-[11px] font-mono text-[#7B2DBF] font-bold tracking-widest">
                STEP 02
              </span>
              <h3 className="text-lg font-bold text-[#1C1C72]">
                Spatial Physics & BIM
              </h3>
              <p className="text-xs text-[#5F6368] leading-relaxed">
                Passive solar orientation, climate envelope modeling, Aayam proportioning, and IS 456 structural load-path coordination.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative pt-6 border-t-2 border-[#1C1C72] space-y-3">
              <span className="text-[11px] font-mono text-[#7B2DBF] font-bold tracking-widest">
                STEP 03
              </span>
              <h3 className="text-lg font-bold text-[#1C1C72]">
                Turnkey Material Escrow
              </h3>
              <p className="text-xs text-[#5F6368] leading-relaxed">
                Direct-to-source steel and cement procurement without contractor markups, verified master masons, and stage-gate escrow payments.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative pt-6 border-t-2 border-[#7B2DBF] space-y-3">
              <span className="text-[11px] font-mono text-[#7B2DBF] font-bold tracking-widest">
                STEP 04
              </span>
              <h3 className="text-lg font-bold text-[#1C1C72]">
                Micro-Architecture & Joinery
              </h3>
              <p className="text-xs text-[#5F6368] leading-relaxed">
                Solid Burma teak dining tables, custom brass lighting fixtures, acoustic millwork, and final turnkey commissioning.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 4. LIVE COMPUTATIONAL SUITE & AI PLAYGROUND                  */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#F8F9FA] border-t border-black/[0.06]">
        <div className="max-w-[1080px] mx-auto px-5 space-y-12">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/[0.08] pb-6">
            <div>
              <span className="text-[11px] font-mono tracking-widest text-[#2563EB] uppercase font-bold">
                Applied Systems Laboratory
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-[#1C1C72] mt-1">
                Proprietary Architectural Computing.
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#5F6368] font-medium max-w-md">
              Deterministic computational models engineered for practicing architects, structural engineers, and institutional commissions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Interactive Voice Simulator Island */}
            <VoiceSimulatorIsland />

            {/* Interactive Zoning & Checkpoint-250 Island */}
            <ZoningSearchIsland />
          </div>

          {/* ── STATUTORY ESCROW & PROVENANCE INDEX (RULE 33 PURE AGENT PROTOCOL) ── */}
          <div className="rounded-3xl bg-white border border-black/[0.08] p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/[0.06] pb-4">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-mono tracking-widest text-[#1C1C72] font-bold uppercase">
                  Statutory Escrow & Provenance Index • Hyderabad Regional Terminal
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#5F6368]">
                COA Rule 33 Pure Agent Protocol • Direct-to-Source Batch Pass-Through
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-black/[0.05] space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#5F6368] uppercase">
                  <span>TMT Steel (Fe 500D)</span>
                  <span className="text-[#2563EB] font-bold">IS 1786</span>
                </div>
                <div className="text-xl font-bold text-[#1C1C72]">₹64.5 <span className="text-xs font-normal text-[#5F6368]">/ kg</span></div>
                <div className="text-[10px] font-mono text-emerald-700 font-semibold">Tata Tiscon / JSW Mill Test Vouchers</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-black/[0.05] space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#5F6368] uppercase">
                  <span>OPC 53 Grade Cement</span>
                  <span className="text-[#2563EB] font-bold">IS 269</span>
                </div>
                <div className="text-xl font-bold text-[#1C1C72]">₹385 <span className="text-xs font-normal text-[#5F6368]">/ bag</span></div>
                <div className="text-[10px] font-mono text-emerald-700 font-semibold">UltraTech / Bharathi 28D Cube Tested</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-black/[0.05] space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#5F6368] uppercase">
                  <span>Ready-Mix Concrete</span>
                  <span className="text-[#2563EB] font-bold">IS 456</span>
                </div>
                <div className="text-xl font-bold text-[#1C1C72]">₹4,450 <span className="text-xs font-normal text-[#5F6368]">/ m³</span></div>
                <div className="text-[10px] font-mono text-emerald-700 font-semibold">M25/M35 Batch Plant Docket Audit</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-black/[0.05] space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#5F6368] uppercase">
                  <span>Double-Washed Robo Sand</span>
                  <span className="text-[#2563EB] font-bold">IS 383</span>
                </div>
                <div className="text-xl font-bold text-[#1C1C72]">₹46 <span className="text-xs font-normal text-[#5F6368]">/ CFT</span></div>
                <div className="text-[10px] font-mono text-emerald-700 font-semibold">Silt Content &lt; 3% Lab Verified</div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#5F6368] border-t border-black/[0.04]">
              <span className="font-mono text-[11px]">Zero contractor markups. Invoices issued directly from manufacturer to client escrow.</span>
              <Link href="/constructions" className="text-[#1C1C72] hover:text-[#7B2DBF] font-bold inline-flex items-center gap-1 font-mono text-[11px] pt-1 sm:pt-0">
                <span>Inspect 6-Stage Escrow Protocol</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 5. FILTERABLE MASTERWORKS LEDGER (114+ PROJECTS)             */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-[1080px] mx-auto px-5 space-y-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/[0.08] pb-6">
            <div>
              <span className="text-[11px] font-mono tracking-widest text-[#7B2DBF] uppercase font-bold">
                Masterworks Archive
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1C72] mt-1">
                Selected Works from 114+ Commissions.
              </h2>
            </div>
            <Link href="/design-studio" className="text-[#1C1C72] hover:text-[#7B2DBF] inline-flex items-center gap-1.5 text-sm font-bold">
              <span>View Complete Studio Registry</span>
              <ChevronRight size={16} />
            </Link>
          </div>

          {/* Interactive Filter Island */}
          <ProjectsFilterIsland />

        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 6. PEDIGREE & TECHNICAL RIGOR SYSTEM                         */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#F8F9FA] border-y border-black/[0.06]">
        <div className="max-w-[1080px] mx-auto px-5">
          
          <div className="text-center space-y-2 mb-12">
            <span className="text-[11px] font-mono tracking-widest text-[#5F6368] uppercase font-bold">
              Pedigree & Technical Standards
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1C72]">
              Engineered with Mathematical Integrity.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-7 rounded-3xl bg-white border border-black/[0.08] shadow-sm space-y-3">
              <div className="p-2.5 rounded-xl bg-[#F1F3F4] text-[#1C1C72] w-fit">
                <Compass size={20} />
              </div>
              <h3 className="text-base font-bold text-[#1C1C72]">
                School of Planning & Architecture, New Delhi
              </h3>
              <p className="text-xs text-[#5F6368] leading-relaxed">
                National Institute of Importance pedigree under Council of Architecture Reg. CA/2023/161405.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-white border border-black/[0.08] shadow-sm space-y-3">
              <div className="p-2.5 rounded-xl bg-[#F1F3F4] text-[#7B2DBF] w-fit">
                <Layers size={20} />
              </div>
              <h3 className="text-base font-bold text-[#1C1C72]">
                Aga Khan Trust for Culture (AKTC)
              </h3>
              <p className="text-xs text-[#5F6368] leading-relaxed">
                Heritage stone craftsmanship and monument-grade conservation detailing at Sunder Nursery, Humayun’s Tomb.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-white border border-black/[0.08] shadow-sm space-y-3">
              <div className="p-2.5 rounded-xl bg-[#F1F3F4] text-[#2563EB] w-fit">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-base font-bold text-[#1C1C72]">
                Statutory Regulatory Mastery
              </h3>
              <p className="text-xs text-[#5F6368] leading-relaxed">
                HMDA Master Plan 2031, GHMC G.O. Ms 168, TG-bPASS compliance, and National Building Code 2026.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-white border border-black/[0.08] shadow-sm space-y-3">
              <div className="p-2.5 rounded-xl bg-[#F1F3F4] text-emerald-600 w-fit">
                <Hammer size={20} />
              </div>
              <h3 className="text-base font-bold text-[#1C1C72]">
                Direct Mill Material Escrow
              </h3>
              <p className="text-xs text-[#5F6368] leading-relaxed">
                100% transparent pass-through billing with live spot rates on steel, cement, and RMC directly from batch plants.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 7. RESEARCH JOURNAL (GEO CODEX)                              */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-[1080px] mx-auto px-5 space-y-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/[0.08] pb-6">
            <div>
              <span className="text-[11px] font-mono tracking-widest text-[#2563EB] uppercase font-bold">
                Architectural Codex
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1C72] mt-1">
                AGNAA Research Journal (50 Papers).
              </h2>
            </div>
            <Link href="/blog" className="text-[#1C1C72] hover:text-[#7B2DBF] inline-flex items-center gap-1.5 text-sm font-bold">
              <span>View All 50 Research Papers</span>
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredArticles.map((post) => (
              <Link 
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="rounded-3xl border border-black/[0.08] bg-[#F8F9FA] p-7 flex flex-col justify-between hover:bg-white hover:border-[#7B2DBF]/40 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#5F6368]">
                    <span className="font-bold text-[#7B2DBF]">{post.category}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#1C1C72] group-hover:text-[#2563EB] transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-[#5F6368] font-medium line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-black/[0.06] flex items-center justify-between text-xs font-bold text-[#1C1C72] group-hover:text-[#7B2DBF]">
                  <span>Read {post.category} Paper</span>
                  <ArrowUpRight size={14} />
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 8. EXECUTIVE CONCIERGE TO AR. SRIDHAR CHAUHAN                */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#F8F9FA] text-center border-t border-black/[0.06]">
        <div className="max-w-[780px] mx-auto px-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/[0.08] text-[11px] font-mono font-semibold tracking-[0.2em] text-[#5F6368] uppercase shadow-sm">
            <span>Direct Principal Engagement</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#1C1C72] leading-tight">
            Commission a spatial or computational work.
          </h2>
          <p className="text-base sm:text-lg text-[#5F6368] leading-relaxed max-w-xl mx-auto">
            Whether commissioning an institutional campus, an urban master plan, high-density residential habitats, or custom architectural AI engineering, connect directly with Ar. Sridhar Chauhan.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href={whatsappConsultUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#1C1C72] to-[#7B2DBF] hover:opacity-95 text-white text-sm font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle size={17} />
              <span>Connect on WhatsApp: +91 8826214348</span>
              <ArrowUpRight size={14} />
            </a>
            <a 
              href="mailto:sridhar.ar@agnaa.in" 
              className="px-7 py-3.5 rounded-full bg-white border border-black/[0.12] hover:border-black/[0.25] text-[#1C1C72] text-sm font-bold transition-all shadow-sm"
            >
              sridhar.ar@agnaa.in
            </a>
          </div>

          <div className="pt-4 text-xs font-mono text-[#5F6368]">
            AGNAA Design Studio • 469 TNGOS Colony, Financial District, Gachibowli, Hyderabad 500032
          </div>
        </div>
      </section>

    </div>
  );
}
