"use client";

import React from 'react';
import Link from 'next/link';
import { Sparkles, Trees, BookOpen, Compass, MessageCircle, ArrowUpRight, Mail, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { AgnaaLogo } from '@/components/AgnaaLogo';

export default function FoundationPage() {
  const directWhatsApp = () => {
    const text = `Hi Ar. Sridhar, I am reaching out regarding the AGNAA Foundation & Civic Charter. I would like to explore institutional collaboration, civic research, or philanthropic initiatives.`;
    window.open(`https://wa.me/918826214348?text=${encodeURIComponent(text)}`, '_blank');
  };

  const pillars = [
    {
      num: '01',
      icon: Trees,
      title: 'Urban Canopy & Microclimate Defense',
      description: 'Advocating for pedestrianized tree shade, permeable ground surfaces, and urban heat island mitigation across developing residential sectors in Telangana.',
      focus: ['Urban Shading Corridors', 'Permeable Ground Paving', 'Rainwater Aquifer Replenishment']
    },
    {
      num: '02',
      icon: BookOpen,
      title: 'Democratized Building Literacy',
      description: 'Publishing open-access, first-principles safety guides translating NBC 2026 and seismic structural engineering into clear vernacular knowledge for grassroots builders.',
      focus: ['Open Architectural Codex', 'Structural Safety Checklists', 'Worker Ergonomics Standards']
    },
    {
      num: '03',
      icon: Compass,
      title: 'Heritage & Vernacular Stewardship',
      description: 'Rigorous architectural documentation, measured drawings, and conservation research for endangered historic fabric and indigenous Indian construction tectonics.',
      focus: ['Measured Field Drawings', 'Vernacular Material Research', 'Craftsperson Apprenticeships']
    }
  ];

  return (
    <div className="bg-white min-h-screen text-[#1C1C72] font-sans selection:bg-[#7B2DBF] selection:text-white pb-32 relative overflow-hidden">
      
      {/* ── TOP RADIAL LUMINOUS AMBIENT GLOW ── */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[550px] pointer-events-none opacity-40 z-0"
        style={{
          background: 'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(123, 45, 191, 0.12), rgba(37, 99, 235, 0.08), transparent 75%)'
        }}
      />

      <div className="relative z-10 pt-32 sm:pt-40 px-5 sm:px-10 lg:px-16 max-w-[1300px] mx-auto space-y-24">
        
        {/* ── 1. EDITORIAL HEADER ── */}
        <header className="space-y-6 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/90 text-[10px] sm:text-[11px] font-black tracking-[0.25em] text-[#1C1C72] uppercase shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />
            <Sparkles size={13} className="text-[#7B2DBF]" />
            <span>AGNAA CIVIC CHARTER • INCEPTION PHASE</span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.08] pb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-br from-[#1C1C72] via-[#1C1C72] to-[#2563EB]">Architecture as a</span>{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#7B2DBF] font-black">Public Good.</span>
          </h1>

          <p className="text-slate-600 text-base sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            The philanthropic and civic research charter of AGNAA Design Studio. Dedicated to urban ecology, democratized building codes, and regional heritage preservation.
          </p>

          {/* Status Chip */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5F5F7] border border-slate-200 text-xs font-bold text-slate-600">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Status: <strong>Charter Formation & Research Phase</strong></span>
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5F5F7] border border-slate-200 text-xs font-bold text-slate-600">
              <ShieldCheck size={14} className="text-[#2563EB]" />
              <span>Directed by Ar. Sridhar Chauhan (SPA Delhi)</span>
            </span>
          </div>
        </header>

        {/* ── 2. MANIFESTO CARD ── */}
        <section className="rounded-3xl border border-slate-200/90 bg-gradient-to-br from-[#F5F5F7]/80 via-white to-[#F5F5F7]/40 p-8 sm:p-14 shadow-sm relative overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-6 text-center">
            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#7B2DBF]">
              The Founding Premise
            </span>
            <blockquote className="text-2xl sm:text-3xl font-black text-[#1C1C72] leading-snug tracking-tight">
              &ldquo;Before we build for the private client, our first responsibility as architects is to the ground we touch, the shade we cast, and the public realm we leave behind.&rdquo;
            </blockquote>
            <div className="pt-2">
              <div className="font-bold text-[#1C1C72] text-sm">Ar. Sridhar Chauhan</div>
              <div className="text-xs text-slate-500 font-mono">COA CA/2023/161405 • School of Planning & Architecture, New Delhi</div>
            </div>
          </div>
        </section>

        {/* ── 3. THREE CHARTER PILLARS ── */}
        <section className="space-y-8">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-[#1C1C72] tracking-tight">
              Three Pillars of Civic Action
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-slate-500">
              Areas of focus currently being structured for formal public programs and research fellowships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map(pillar => {
              const Icon = pillar.icon;
              return (
                <div 
                  key={pillar.num}
                  className="rounded-3xl border border-slate-200/90 bg-white p-8 flex flex-col justify-between hover:shadow-lg hover:border-[#7B2DBF]/40 transition-all duration-300 group"
                >
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50 border border-slate-200/70 flex items-center justify-center text-[#7B2DBF] group-hover:scale-105 transition-transform">
                        <Icon size={22} className="text-[#1C1C72]" />
                      </div>
                      <span className="font-mono text-xs font-black text-slate-400">
                        {pillar.num}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-[#1C1C72] tracking-tight group-hover:text-[#2563EB] transition-colors">
                      {pillar.title}
                    </h3>

                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 space-y-2">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                      Focus Areas
                    </div>
                    <ul className="space-y-1.5">
                      {pillar.focus.map((item, idx) => (
                        <li key={idx} className="text-[11px] font-semibold text-slate-600 flex items-center gap-2">
                          <CheckCircle2 size={12} className="text-[#2563EB] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── 4. INVITATION FOR ACADEMIC & CIVIC PARTNERSHIP ── */}
        <section className="rounded-3xl border border-slate-200/90 bg-[#F5F5F7] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
          <div className="space-y-3 max-w-xl">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#2563EB]">
              Civic Collaboration
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#1C1C72] tracking-tight">
              Propose an Initiative or Research Grant
            </h3>
            <p className="text-xs sm:text-sm font-medium text-slate-600 leading-relaxed">
              If you represent an academic institution, urban planning think-tank, or municipal body interested in partnering on urban microclimate research or building code accessibility, connect with our principal.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={directWhatsApp}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#1C1C72] text-white text-xs font-black hover:bg-[#7B2DBF] transition-all shadow-sm cursor-pointer"
            >
              <MessageCircle size={15} />
              <span>Connect on WhatsApp</span>
              <ArrowUpRight size={13} />
            </button>
            <a
              href="mailto:sridhar.ar@agnaa.in?subject=AGNAA%20Foundation%20Civic%20Initiative"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white border border-slate-300 text-slate-700 hover:text-[#1C1C72] hover:border-slate-400 text-xs font-bold transition-all shadow-sm"
            >
              <Mail size={15} />
              <span>foundation@agnaa.in</span>
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
