"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  MessageCircle, 
  ArrowUpRight, 
  ShieldCheck, 
  Compass, 
  Layers, 
  Cpu, 
  Sparkles, 
  ChevronRight, 
  CheckCircle2, 
  Sliders, 
  Calculator,
  BookOpen
} from 'lucide-react';
import { BLOG_POSTS } from '@/app/blog/data';

export default function HomePage() {
  const [activeDiscipline, setActiveDiscipline] = useState<'all' | 'architecture' | 'software' | 'furniture' | 'cinema'>('all');

  const directWhatsApp = (subject: string = 'General Inquiry') => {
    const text = `Hi Ar. Sridhar, I am reviewing the AGNAA Interdisciplinary Design Studio website and would like to consult with you directly regarding: ${subject}.`;
    window.open(`https://wa.me/918826214348?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Top 3 authoritative journal articles with backlinks
  const featuredArticles = BLOG_POSTS.slice(0, 3);

  return (
    <div className="bg-white min-h-screen text-[#1D1D1F] font-sans selection:bg-[#0071E3] selection:text-white pb-32">

      {/* ── 1. MONUMENTAL APPLE HERO SECTION ── */}
      <section className="pt-28 sm:pt-36 pb-16 text-center bg-white relative overflow-hidden">
        
        {/* Apple Ambient Luminous Light */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[550px] pointer-events-none opacity-40 z-0"
          style={{
            background: 'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(123, 45, 191, 0.12), rgba(37, 99, 235, 0.08), transparent 75%)'
          }}
        />

        <div className="max-w-[1024px] mx-auto px-5 relative z-10 space-y-4">
          
          {/* Apple Monospaced Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5F5F7] border border-black/[0.06] text-[11px] font-semibold tracking-[0.2em] text-[#86868B] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
            <span>Interdisciplinary Practice • Ar. M. Sridhar Chauhan (SPA Delhi)</span>
          </div>

          {/* Monumental Headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-[84px] font-bold tracking-[-0.035em] text-[#1C1C72] leading-[1.04]">
            From Code to Concrete.
            <span className="block text-xl sm:text-3xl lg:text-[34px] font-semibold text-[#7B2DBF] mt-3 tracking-normal">
              Architects & Turnkey Villa Construction in Hyderabad
            </span>
          </h1>

          {/* Apple Slate Subtitle */}
          <p className="text-lg sm:text-xl font-normal text-[#86868B] tracking-[-0.015em] max-w-[800px] mx-auto leading-relaxed">
            Led by Ar. M. Sridhar Chauhan (SPA Delhi). We dissolve the artificial boundaries between spatial luxury villa architecture, turnkey construction, bespoke furniture, and digital engineering.
          </p>

          {/* Apple Dual CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-5 pt-3 text-[16px]">
            <button 
              onClick={() => directWhatsApp('Total Design Project')}
              className="px-7 py-3 rounded-full bg-[#1C1C72] hover:bg-[#2563EB] text-white font-medium transition-all shadow-[0_10px_30px_rgba(28,28,114,0.18)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center gap-2"
            >
              <MessageCircle size={17} />
              <span>Consult Ar. Sridhar</span>
            </button>
            <Link 
              href="/design-studio" 
              className="text-[#0071E3] hover:underline inline-flex items-center gap-1 font-normal"
            >
              <span>Explore 42+ Masterworks</span>
              <ChevronRight size={17} />
            </Link>
          </div>

          {/* Cinematic Architectural Hero Visual Anchor */}
          <div className="pt-10">
            <div className="relative w-full aspect-[16/9] max-w-[1080px] mx-auto rounded-[32px] overflow-hidden shadow-[0_40px_100px_rgba(28,28,114,0.10)] border border-black/[0.05] group">
              <Image 
                src="/projects/manila/sunder-nursery-garden-house.webp" 
                alt="Sunder Nursery Garden House by AGNAA" 
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D1A]/80 via-transparent to-transparent flex items-end p-8 sm:p-14 text-left">
                <div className="space-y-1">
                  <span className="text-[11px] font-mono tracking-widest text-purple-300 uppercase font-bold">
                    Flagship Spatial Commission • New Delhi / Hyderabad
                  </span>
                  <h2 className="text-white text-2xl sm:text-4xl font-bold tracking-tight">
                    Sunder Nursery Garden House
                  </h2>
                  <p className="text-white/80 text-xs sm:text-sm font-medium max-w-xl">
                    Passive solar orientation, sculpted stone masonry, and high-performance climate envelope. Designed and executed by AGNAA.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 2. APPLE 2×2 DUO SHOWCASE (THE 4 DISCIPLINES) ── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1080px] mx-auto px-5 space-y-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/[0.06] pb-6">
            <div>
              <span className="text-[11px] font-mono tracking-widest text-[#86868B] uppercase font-bold">
                Interdisciplinary Matrix
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-[#1C1C72] mt-1">
                Four Domains. One Standard of Rigor.
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#86868B] font-medium max-w-md">
              A sovereign design practice where software engineers and structural architects work under a single creative direction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* ── CARD 1: SPATIAL ARCHITECTURE ── */}
            <div className="rounded-[32px] bg-[#F5F5F7] p-8 sm:p-10 flex flex-col justify-between border border-black/[0.04] hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] transition-all duration-500 group">
              <div className="space-y-3">
                <span className="text-[11px] font-mono tracking-widest text-[#86868B] uppercase font-bold">
                  01 / Spatial Architecture
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1C72]">
                  Private Villas & State Corridors.
                </h3>
                <p className="text-sm text-[#86868B] leading-relaxed">
                  Delivered landmarks for the Aga Khan Trust for Culture, state ministerial corridors, and ultra-luxury turnkey residences in Financial District, Hyderabad.
                </p>
                <div className="pt-1">
                  <Link href="/design-studio" className="text-[#0071E3] hover:underline inline-flex items-center gap-1 text-sm font-medium">
                    <span>Explore Architectural Works & Heritage</span>
                    <ChevronRight size={15} />
                  </Link>
                </div>
              </div>

              <div className="mt-8 rounded-2xl overflow-hidden aspect-[4/3] relative shadow-sm border border-black/[0.05]">
                <Image 
                  src="/projects/manila/balinese-luxury-resort-villa-exterior.webp" 
                  alt="Balinese Luxury Villa Architecture" 
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>

            {/* ── CARD 2: SOFTWARE & UI/UX SYSTEMS ── */}
            <div className="rounded-[32px] bg-[#0A0D1A] text-white p-8 sm:p-10 flex flex-col justify-between border border-white/10 hover:shadow-[0_30px_60px_rgba(123,45,191,0.15)] transition-all duration-500 group">
              <div className="space-y-3">
                <span className="text-[11px] font-mono tracking-widest text-purple-400 uppercase font-bold">
                  02 / Software Systems & UI/UX
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Agnaa Voice AI & Engineering Suites.
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Native zero-latency voice software, interactive GHMC setback calculators, and custom milestone escrow dashboards engineered with tactile Swiss precision.
                </p>
                <div className="pt-1">
                  <Link href="/calc" className="text-purple-400 hover:text-purple-300 inline-flex items-center gap-1 text-sm font-medium">
                    <span>Launch 8 Precision Calculators</span>
                    <ChevronRight size={15} />
                  </Link>
                </div>
              </div>

              {/* Tactile Dark Hardware UI Preview */}
              <div className="mt-8 rounded-2xl bg-white/[0.04] border border-white/10 p-6 space-y-4 backdrop-blur-md">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>AGNAA VOICE v2.0 • PORTABLE DESKTOP ENGINE</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>
                
                {/* Audio Waveform Visualization */}
                <div className="h-16 flex items-center justify-center gap-2">
                  <div className="w-1.5 h-6 bg-gradient-to-t from-purple-500 to-blue-400 rounded-full animate-pulse" />
                  <div className="w-1.5 h-12 bg-gradient-to-t from-purple-500 to-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }} />
                  <div className="w-1.5 h-8 bg-gradient-to-t from-purple-500 to-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="w-1.5 h-14 bg-gradient-to-t from-purple-500 to-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
                  <div className="w-1.5 h-10 bg-gradient-to-t from-purple-500 to-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                  <div className="w-1.5 h-5 bg-gradient-to-t from-purple-500 to-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                </div>
                <div className="text-center text-[11px] text-slate-400 font-mono">
                  Local Speech-to-Design Engine • Windows Portable Build
                </div>
              </div>
            </div>

            {/* ── CARD 3: BESPOKE FURNITURE & JOINERY ── */}
            <div className="rounded-[32px] bg-[#F5F5F7] p-8 sm:p-10 flex flex-col justify-between border border-black/[0.04] hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] transition-all duration-500 group">
              <div className="space-y-3">
                <span className="text-[11px] font-mono tracking-widest text-[#86868B] uppercase font-bold">
                  03 / Furniture & Objects
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1C72]">
                  Micro-Architecture & Custom Joinery.
                </h3>
                <p className="text-sm text-[#86868B] leading-relaxed">
                  Solid Burma teak dining tables, custom brass lighting fixtures, and ergonomic architectural millwork tailored to exact room proportions.
                </p>
                <div className="pt-1">
                  <Link href="/design-studio" className="text-[#0071E3] hover:underline inline-flex items-center gap-1 text-sm font-medium">
                    <span>Explore Bespoke Furniture Joinery</span>
                    <ChevronRight size={15} />
                  </Link>
                </div>
              </div>

              <div className="mt-8 rounded-2xl overflow-hidden aspect-[4/3] relative shadow-sm border border-black/[0.05]">
                <Image 
                  src="/projects/manila/curated-luxury-residence-living-interior.webp" 
                  alt="Bespoke Luxury Interior & Furniture Joinery" 
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>

            {/* ── CARD 4: 3D CINEMA & COMPUTATION ── */}
            <div className="rounded-[32px] bg-[#F5F5F7] p-8 sm:p-10 flex flex-col justify-between border border-black/[0.04] hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] transition-all duration-500 group">
              <div className="space-y-3">
                <span className="text-[11px] font-mono tracking-widest text-[#86868B] uppercase font-bold">
                  04 / Computational Design
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1C72]">
                  Algorithmic Form & 4K Cinema.
                </h3>
                <p className="text-sm text-[#86868B] leading-relaxed">
                  Procedural parametric modeling, daylight physics simulations, and cinematic architectural films crafted in-house for visionary developers.
                </p>
                <div className="pt-1">
                  <Link href="/design-studio" className="text-[#0071E3] hover:underline inline-flex items-center gap-1 text-sm font-medium">
                    <span>View Computational 3D Films</span>
                    <ChevronRight size={15} />
                  </Link>
                </div>
              </div>

              <div className="mt-8 rounded-2xl overflow-hidden aspect-[4/3] relative shadow-sm border border-black/[0.05]">
                <Image 
                  src="/projects/manila/double-height-sculptural-atrium-lobby.webp" 
                  alt="Sculptural Atrium Lobby by AGNAA" 
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── 3. APPLE HARDWARE BENTO: TECHNICAL PRECISION & STATS ── */}
      <section className="py-20 bg-[#F5F5F7] border-y border-black/[0.06]">
        <div className="max-w-[1080px] mx-auto px-5">
          
          <div className="text-center space-y-2 mb-12">
            <span className="text-[11px] font-mono tracking-widest text-[#86868B] uppercase font-bold">
              Pedigree & Technical Rigor
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1C72]">
              Engineered with Mathematical Integrity.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white rounded-3xl p-7 border border-black/[0.06] shadow-sm space-y-2 hover:border-[#7B2DBF]/40 transition-colors">
              <div className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1C1C72]">114+</div>
              <div className="text-sm font-bold text-[#1C1C72]">Delivered Works</div>
              <p className="text-xs text-[#86868B] leading-relaxed">
                State heritage exhibits, CM urban corridors, and private luxury villas across India.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-7 border border-black/[0.06] shadow-sm space-y-2 hover:border-[#7B2DBF]/40 transition-colors">
              <div className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1C1C72]">SPA Delhi</div>
              <div className="text-sm font-bold text-[#1C1C72]">India Rank #1 Pedigree</div>
              <p className="text-xs text-[#86868B] leading-relaxed">
                School of Planning & Architecture, New Delhi. Grounded in spatial tectonics and first principles.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-7 border border-black/[0.06] shadow-sm space-y-2 hover:border-[#7B2DBF]/40 transition-colors">
              <div className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1C1C72]">CA/2023</div>
              <div className="text-sm font-bold text-[#1C1C72]">Registered Architect</div>
              <p className="text-xs text-[#86868B] leading-relaxed">
                Council of Architecture CA/2023/161405. Statutory legal accreditation for civil sanctions.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-7 border border-black/[0.06] shadow-sm space-y-2 hover:border-[#7B2DBF]/40 transition-colors">
              <div className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1C1C72]">NBC 2026</div>
              <div className="text-sm font-bold text-[#1C1C72]">Byelaw Precision</div>
              <p className="text-xs text-[#86868B] leading-relaxed">
                Strict adherence to GHMC G.O. 168, TG-bPASS, and IS 456 structural code standards.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ── 4. GEO RESEARCH JOURNAL & BACKLINKS ── */}
      <section className="py-24 bg-white">
        <div className="max-w-[1080px] mx-auto px-5 space-y-12">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/[0.06] pb-6">
            <div>
              <span className="text-[11px] font-mono tracking-widest text-[#2563EB] uppercase font-bold">
                Generative Engine Optimization • Architectural Codex
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1C72] mt-1">
                AGNAA Research Journal (50 Articles)
              </h2>
            </div>
            <Link href="/blog" className="text-[#0071E3] hover:underline inline-flex items-center gap-1 text-sm font-medium">
              <span>View All 50 Research Papers</span>
              <ChevronRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredArticles.map((post) => (
              <Link 
                key={post.slug}
                href={`https://blog.agnaa.in/post/${post.slug}`}
                className="rounded-3xl border border-slate-200/90 bg-[#F5F5F7] p-7 flex flex-col justify-between hover:bg-white hover:border-[#7B2DBF]/40 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="font-bold text-[#7B2DBF]">{post.category}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#1C1C72] group-hover:text-[#2563EB] transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-[#86868B] font-medium line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-[#1C1C72] group-hover:text-[#7B2DBF]">
                  <span>Read {post.category} Paper</span>
                  <ArrowUpRight size={14} />
                </div>
              </Link>
            ))}
          </div>

          {/* Quick Backlink Hub to Free Calculators */}
          <div className="rounded-3xl bg-gradient-to-r from-slate-50 via-white to-slate-50 border border-slate-200 p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="space-y-1 text-center md:text-left">
              <h4 className="text-base font-bold text-[#1C1C72]">
                Instant Building & Financial Estimation Suite
              </h4>
              <p className="text-xs text-[#86868B] font-medium">
                Calculate GHMC Setbacks, FAR/FSI Permissible Area, RCC Slab Concrete, and Turnkey Interior Cost free online.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link href="/calc/setback-envelope" className="px-4 py-2 rounded-full bg-white border border-slate-300 text-xs font-bold text-[#1C1C72] hover:border-[#7B2DBF] transition-colors shadow-sm">
                Setback Calculator
              </Link>
              <Link href="/calc/rcc" className="px-4 py-2 rounded-full bg-white border border-slate-300 text-xs font-bold text-[#1C1C72] hover:border-[#7B2DBF] transition-colors shadow-sm">
                RCC Steel Calculator
              </Link>
              <Link href="/estimate" className="px-4 py-2 rounded-full bg-[#1C1C72] text-white text-xs font-bold hover:bg-[#2563EB] transition-colors shadow-sm">
                Cost Estimator ↗
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ── 5. EXECUTIVE CONCIERGE TO AR. SRIDHAR ── */}
      <section className="py-24 bg-[#F5F5F7] text-center border-t border-black/[0.06]">
        <div className="max-w-[760px] mx-auto px-5 space-y-6">
          <span className="text-[11px] font-mono tracking-widest text-[#86868B] uppercase font-bold">
            Executive Consultation
          </span>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#1C1C72] leading-tight">
            Have a complex design challenge?
          </h2>
          <p className="text-base sm:text-lg text-[#86868B] leading-relaxed max-w-xl mx-auto">
            Whether you are commissioning an ultra-luxury private residence, architecting digital software systems, or designing custom furniture, connect directly with Ar. Sridhar Chauhan.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => directWhatsApp('Executive Architecture & Turnkey Consultation')}
              className="px-8 py-3.5 rounded-full bg-[#1C1C72] hover:bg-[#2563EB] text-white text-sm font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle size={16} />
              <span>Connect on WhatsApp: +91 8826214348</span>
              <ArrowUpRight size={14} />
            </button>
            <a 
              href="mailto:sridhar.ar@agnaa.in" 
              className="px-7 py-3.5 rounded-full bg-white border border-slate-300 hover:border-slate-400 text-[#1C1C72] text-sm font-bold transition-all shadow-sm"
            >
              sridhar.ar@agnaa.in
            </a>
          </div>

          <div className="pt-4 text-xs font-mono text-slate-400">
            AGNAA Design Studio • Financial District, Gachibowli, Hyderabad 500032
          </div>
        </div>
      </section>

    </div>
  );
}
