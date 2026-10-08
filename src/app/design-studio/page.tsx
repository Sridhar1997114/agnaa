"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, Code2, Sparkles, Film, ArrowUpRight, Search, 
  MessageCircle, Eye, X, CheckCircle2, Lock, Download, 
  FileText, Mic, Volume2, ShieldCheck, ArrowRight, Laptop, Layers
} from 'lucide-react';
import { 
  DISCIPLINE_PILLARS, 
  BENTO_SHOWCASES, 
  MASTER_STUDIO_REGISTRY, 
  CATEGORIES, 
  DisciplineType, 
  StudioProject 
} from '@/data/studioProjects';
import { OPEN_STUDIO_TOOLS } from '@/data/openTools';

export default function DesignStudioPage() {
  const [activeDiscipline, setActiveDiscipline] = useState<DisciplineType>('All Disciplines');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<StudioProject | null>(null);

  // Filter Bento showcases
  const filteredBento = useMemo(() => {
    if (activeDiscipline === 'All Disciplines') return BENTO_SHOWCASES;
    return BENTO_SHOWCASES.filter(p => p.discipline === activeDiscipline);
  }, [activeDiscipline]);

  // Filter Master Ledger
  const filteredLedger = useMemo(() => {
    return MASTER_STUDIO_REGISTRY.filter(item => {
      const matchesCategory = 
        activeDiscipline === 'All Disciplines' 
          ? true 
          : item.discipline === activeDiscipline;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.clientOrContext.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q) ||
        (item.tag && item.tag.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [activeDiscipline, searchQuery]);

  const connectOnWhatsApp = (project: StudioProject) => {
    const text = `Hi Ar. Sridhar, I was reviewing the "${project.title}" (${project.discipline} • ${project.location}) on the AGNAA Design Studio. I would like to consult with you on a similar commission.`;
    const url = `https://wa.me/918826214348?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const directGeneralWhatsApp = () => {
    const text = `Hi Ar. Sridhar, I would like to discuss an interdisciplinary design commission (Spatial Architecture / Software / Joinery / 3D Cinema) with AGNAA Design Studio.`;
    const url = `https://wa.me/918826214348?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-white text-[#1C1C72] font-sans selection:bg-[#7B2DBF] selection:text-white pb-32 relative overflow-hidden">
      
      {/* ── TOP RADIAL LUMINOUS AMBIENT GLOW ── */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[640px] pointer-events-none opacity-40 z-0"
        style={{
          background: 'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(123, 45, 191, 0.14), rgba(37, 99, 235, 0.08), transparent 75%)'
        }}
      />

      <div className="relative z-10 pt-32 sm:pt-40 px-5 sm:px-10 lg:px-16 max-w-[1440px] mx-auto space-y-28">
        
        {/* ── 1. MONUMENTAL EDITORIAL HERO ── */}
        <header className="space-y-6 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-slate-200/90 text-[10px] sm:text-[11px] font-black tracking-[0.25em] text-[#1C1C72] uppercase shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />
            <Sparkles size={13} className="text-[#7B2DBF]" />
            <span>AGNAA INTERDISCIPLINARY DESIGN STUDIO • TOTAL DESIGN</span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter pb-2 leading-[1.06]">
            <span className="bg-clip-text text-transparent bg-gradient-to-br from-[#1C1C72] via-[#1C1C72] to-[#2563EB]">DESIGN STUDIO</span>{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#7B2DBF] font-black">& ARCHIVE</span>
          </h1>

          <p className="text-slate-600 text-base sm:text-xl font-bold max-w-3xl mx-auto leading-relaxed">
            Directed by <strong className="text-[#1C1C72]">Ar. Sridhar Chauhan</strong> (SPA Delhi, CA/2023/161405). 
            Unifying monumental architecture, local AI software tools, bespoke joinery, and 4K cinema under one holistic practice.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <button 
              onClick={directGeneralWhatsApp}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#1C1C72] via-[#2563EB] to-[#7B2DBF] text-white text-xs sm:text-sm font-black hover:opacity-95 transition-all shadow-[0_10px_30px_rgba(28,28,114,0.18)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <MessageCircle size={16} />
              <span>Direct WhatsApp: Ar. Sridhar</span>
              <ArrowUpRight size={15} />
            </button>

            <a
              href="#open-tools"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white border border-slate-200/90 text-xs font-black uppercase tracking-wider text-[#1C1C72] hover:border-[#7B2DBF] transition-all shadow-sm"
            >
              <Download size={15} className="text-[#7B2DBF]" />
              <span>Free Software & A2 Sheets</span>
            </a>

            <div className="inline-flex items-center gap-2 px-5 py-4 rounded-full bg-[#F5F5F7] border border-slate-200 text-xs font-black uppercase tracking-wider text-[#1C1C72] shadow-sm">
              <CheckCircle2 size={16} className="text-[#2563EB]" />
              <span>{MASTER_STUDIO_REGISTRY.length}+ Verified Works</span>
            </div>
          </div>
        </header>

        {/* ── 2. THE 4 INTERDISCIPLINARY PILLARS (INTERACTIVE SELECTORS) ── */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#7B2DBF]">Explore by Discipline</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1C1C72] tracking-tight">
              Four Pillars of Spatial & Digital Creation
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm font-bold">
              Click any discipline below to view its philosophy, curated showcases, and verified project records.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DISCIPLINE_PILLARS.map((pillar) => {
              const isSelected = activeDiscipline === pillar.id;
              return (
                <div
                  key={pillar.id}
                  onClick={() => {
                    setActiveDiscipline(pillar.id);
                    const el = document.getElementById('selected-showcases');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`group relative p-7 rounded-[32px] border transition-all duration-500 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white border-[#7B2DBF] shadow-[0_20px_50px_rgba(123,45,191,0.15)] ring-2 ring-[#7B2DBF]/20'
                      : 'bg-[#F5F5F7]/80 hover:bg-white border-slate-200/80 hover:border-slate-300 shadow-sm hover:shadow-lg'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br ${pillar.gradient} shadow-md`}>
                        {pillar.iconName === 'Building2' && <Building2 size={22} />}
                        {pillar.iconName === 'Code2' && <Code2 size={22} />}
                        {pillar.iconName === 'Sparkles' && <Sparkles size={22} />}
                        {pillar.iconName === 'Film' && <Film size={22} />}
                      </div>

                      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-200/60 text-[#1C1C72]">
                        {pillar.countBadge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-black text-[#1C1C72] tracking-tight group-hover:text-[#7B2DBF] transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="text-xs font-bold text-[#2563EB] mt-0.5">
                        {pillar.subtitle}
                      </p>
                    </div>

                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      {pillar.description}
                    </p>

                    <ul className="space-y-1.5 pt-2 border-t border-slate-200/60 text-[11px] font-bold text-slate-600">
                      {pillar.keyDeliverables.slice(0, 3).map((item, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#7B2DBF]" />
                          <span className="truncate">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 mt-4 flex items-center justify-between border-t border-slate-200/60">
                    <span className="text-[10px] font-black uppercase text-slate-400">
                      {pillar.standardsBadge}
                    </span>
                    <span className={`inline-flex items-center gap-1 text-xs font-black ${isSelected ? 'text-[#7B2DBF]' : 'text-slate-500 group-hover:text-[#1C1C72]'}`}>
                      <span>{isSelected ? 'Active' : 'Inspect'}</span>
                      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── 3. INTERACTIVE DISCIPLINARY SEGMENTED TABS ── */}
        <section id="selected-showcases" className="space-y-8 scroll-mt-28">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-200 pb-6">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100/80 text-[#7B2DBF] text-[10px] font-black uppercase tracking-widest mb-2 border border-purple-200/60">
                <Sparkles size={12} /> Curated Showcase Gallery
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#1C1C72] tracking-tight">
                Selected Works Bento
              </h2>
            </div>

            {/* Apple Segmented Discipline Switcher */}
            <div className="flex flex-wrap items-center gap-2 bg-[#F5F5F7] p-1.5 rounded-2xl border border-slate-200">
              {CATEGORIES.map((cat) => {
                const isSelected = activeDiscipline === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveDiscipline(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#1C1C72] text-white shadow-md'
                        : 'text-slate-600 hover:text-[#1C1C72] hover:bg-white/80'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Apple Asymmetric Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px] sm:auto-rows-[340px]">
            {filteredBento.map((card, idx) => (
              <motion.div
                key={card.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
                onClick={() => setSelectedProject(card)}
                className={`group relative rounded-[32px] sm:rounded-[36px] bg-[#F5F5F7] p-2 sm:p-2.5 border border-slate-200/90 hover:border-[#7B2DBF]/50 shadow-[0_10px_30px_rgba(28,28,114,0.06)] hover:shadow-[0_25px_60px_rgba(123,45,191,0.16)] transition-all duration-500 flex flex-col justify-end cursor-pointer ${card.bentoSpan || 'col-span-1 row-span-1'}`}
              >
                {/* Inner Shell with Image & Multi-Stop Scrim */}
                <div className="relative w-full h-full rounded-[calc(32px-8px)] sm:rounded-[calc(36px-10px)] overflow-hidden bg-slate-950 flex flex-col justify-end p-6 sm:p-8">
                  {card.image ? (
                    <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950">
                      <img 
                        src={card.image} 
                        alt={card.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 via-45% to-transparent opacity-95 group-hover:opacity-90 transition-opacity" />
                      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-transparent opacity-60" />
                    </div>
                  ) : (
                    <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#1C1C72] to-[#7B2DBF] flex items-center justify-center p-8">
                      <Code2 size={64} className="text-white/20" />
                    </div>
                  )}

                  {/* Top Glass Badges */}
                  <div className="absolute top-5 left-5 right-5 z-10 flex items-center justify-between text-[11px] pointer-events-none">
                    <span className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-white/60 text-[#1C1C72] font-black uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7B2DBF]" />
                      <span>{card.tag || card.discipline}</span>
                    </span>

                    <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#1C1C72] font-bold text-[10px] border border-white/60 shadow-sm">
                      {card.year}
                    </span>
                  </div>

                  {/* Bottom Typography & Action Bar */}
                  <div className="relative z-10 space-y-2 mt-auto">
                    <div className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-blue-200 drop-shadow-sm">
                      {card.clientOrContext} • {card.location}
                    </div>

                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight group-hover:text-blue-100 transition-colors leading-tight drop-shadow-md">
                      {card.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed line-clamp-2 max-w-xl drop-shadow-sm">
                      {card.scope}
                    </p>

                    <div className="pt-2 flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-purple-200 truncate hidden sm:inline">
                        {card.bentoHighlight}
                      </span>

                      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#1C1C72] text-xs font-black shadow-lg group-hover:bg-[#7B2DBF] group-hover:text-white transition-all transform group-hover:translate-x-1 shrink-0 ml-auto">
                        <Eye size={13} />
                        <span>Inspect Specs</span>
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── 4. FREE OPEN SOFTWARE & A2 ARCHITECTURAL SHEETS (USER HIGHLIGHT) ── */}
        <section id="open-tools" className="space-y-8 scroll-mt-28">
          <div className="bg-gradient-to-br from-[#1C1C72] via-[#2563EB] to-[#7B2DBF] rounded-[40px] p-8 sm:p-14 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-3xl space-y-4 mb-12">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-black uppercase tracking-widest border border-white/20">
                <Laptop size={12} /> Open-Source Tools & Working Standards
              </span>

              <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Free Offline AI Software & Standard A2 Drawing Sheets
              </h2>

              <p className="text-sm sm:text-base text-blue-100 font-medium leading-relaxed">
                We believe in packaging open-source intelligence directly for the desktop. 
                Download our offline voice AI tools, neural speech synthesizers, and complete standard A2 architectural detail sheets—zero subscription required.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              {OPEN_STUDIO_TOOLS.map((tool) => (
                <div 
                  key={tool.id}
                  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[28px] p-7 flex flex-col justify-between hover:bg-white/15 transition-all group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-white text-[#1C1C72] flex items-center justify-center font-bold shadow-md">
                        {tool.iconName === 'Mic' && <Mic size={20} />}
                        {tool.iconName === 'Volume2' && <Volume2 size={20} />}
                        {tool.iconName === 'FileText' && <FileText size={20} />}
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/20 text-white border border-white/20">
                        {tool.version}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-black text-white tracking-tight">
                        {tool.name}
                      </h3>
                      <p className="text-xs font-bold text-blue-200 mt-1">
                        {tool.tagline}
                      </p>
                    </div>

                    <p className="text-xs text-blue-100/90 font-medium leading-relaxed">
                      {tool.description}
                    </p>

                    <ul className="space-y-1.5 pt-3 border-t border-white/15 text-[11px] font-medium text-white/90">
                      {tool.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 size={13} className="text-emerald-300 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/15 space-y-3">
                    <div className="text-[10px] text-blue-200 font-bold">
                      {tool.systemSpecs}
                    </div>

                    <a
                      href={tool.downloadUrl}
                      target={tool.downloadUrl.startsWith('http') ? '_blank' : undefined}
                      rel={tool.downloadUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="w-full py-3.5 px-5 rounded-2xl bg-white hover:bg-blue-50 text-[#1C1C72] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer group-hover:scale-[1.02]"
                    >
                      <Download size={14} className="text-[#2563EB]" />
                      <span>Download Free ({tool.fileSize})</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. MASTER ARCHITECTURAL & SYSTEMS LEDGER ── */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#2563EB] text-[10px] font-black uppercase tracking-widest mb-2 border border-blue-100">
                Master Studio Index
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1C1C72] tracking-tight">
                Master Architectural & Systems Ledger
              </h2>
            </div>
            <span className="text-xs font-bold text-slate-500">
              Showing {filteredLedger.length} of {MASTER_STUDIO_REGISTRY.length} verified projects & systems
            </span>
          </div>

          {/* Search bar & Live Filter */}
          <div className="flex flex-col sm:flex-row items-stretch gap-4">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search across all 52+ works by title, client, discipline, or typology..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F5F5F7] border border-slate-200/90 rounded-2xl pl-12 pr-4 py-3.5 text-sm font-bold text-[#1C1C72] placeholder:text-slate-400 outline-none focus:border-[#7B2DBF] focus:bg-white transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Ledger Table */}
          <div className="rounded-[28px] border border-slate-200/90 bg-white shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-bold">
                <thead className="bg-[#F5F5F7] text-slate-500 uppercase tracking-widest text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="py-4 px-6">Work / System</th>
                    <th className="py-4 px-6">Discipline</th>
                    <th className="py-4 px-6">Client / Context</th>
                    <th className="py-4 px-6">Location</th>
                    <th className="py-4 px-6">Year</th>
                    <th className="py-4 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredLedger.map((item) => (
                    <tr 
                      key={item.id}
                      onClick={() => setSelectedProject(item)}
                      className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          {item.image ? (
                            <img 
                              src={item.image} 
                              alt={item.title} 
                              className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0" 
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-xl bg-[#F5F5F7] text-[#1C1C72] flex items-center justify-center font-bold shrink-0">
                              <Layers size={16} />
                            </div>
                          )}
                          <div>
                            <div className="font-black text-sm text-[#1C1C72] group-hover:text-[#7B2DBF] transition-colors">
                              {item.title}
                            </div>
                            <div className="text-[11px] text-slate-500 font-medium truncate max-w-md">
                              {item.scope}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-100 text-[#1C1C72] border border-slate-200">
                          {item.discipline}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-slate-700">
                        {item.clientOrContext}
                      </td>

                      <td className="py-4 px-6 text-slate-500">
                        {item.location}
                      </td>

                      <td className="py-4 px-6 text-slate-500 font-mono">
                        {item.year}
                      </td>

                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            connectOnWhatsApp(item);
                          }}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F5F5F7] group-hover:bg-[#1C1C72] text-[#1C1C72] group-hover:text-white text-[11px] font-black transition-all"
                        >
                          <MessageCircle size={12} />
                          <span>WhatsApp</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── 6. DIRECT AR. SRIDHAR CONCIERGE ── */}
        <section className="bg-[#F5F5F7] rounded-[36px] p-8 sm:p-14 border border-slate-200/90 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#7B2DBF]">Direct Principal Access</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1C1C72] tracking-tight">
              Begin an Interdisciplinary Commission
            </h2>
            <p className="text-slate-600 text-sm font-medium leading-relaxed">
              Every commission—from civic landmarks and luxury residences to custom software systems and timber fabrication—is directed personally by Ar. Sridhar Chauhan (SPA Delhi, CA/2023/161405).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <button
              onClick={directGeneralWhatsApp}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#1C1C72] via-[#2563EB] to-[#7B2DBF] text-white font-black text-sm uppercase tracking-wider flex items-center gap-2.5 shadow-xl hover:opacity-95 transition-all cursor-pointer"
            >
              <MessageCircle size={16} />
              <span>Direct WhatsApp: +91 8826214348</span>
              <ArrowUpRight size={15} />
            </button>
          </div>
        </section>

      </div>

      {/* ── 7. APPLE PRO INTERACTIVE LIGHTBOX MODAL ── */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[36px] max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl relative p-6 sm:p-10 space-y-6"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-[#F5F5F7] hover:bg-slate-200 text-[#1C1C72] transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              {selectedProject.image && (
                <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-950 relative">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-black uppercase text-[#1C1C72]">
                    {selectedProject.tag || selectedProject.discipline}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <div className="text-xs font-black uppercase tracking-widest text-[#2563EB]">
                  {selectedProject.clientOrContext} • {selectedProject.location} • {selectedProject.year}
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#1C1C72]">
                  {selectedProject.title}
                </h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  {selectedProject.scope}
                </p>
              </div>

              {selectedProject.specs && (
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <div className="text-xs font-black uppercase tracking-wider text-slate-400">Technical Specifications</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-slate-700">
                    {selectedProject.specs.map((spec, i) => (
                      <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F5F5F7]">
                        <CheckCircle2 size={14} className="text-[#2563EB]" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-400 font-medium">
                  Statutory Accreditation: <strong className="text-[#1C1C72]">CA/2023/161405</strong>
                </div>

                <button
                  onClick={() => connectOnWhatsApp(selectedProject)}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-[#1C1C72] to-[#7B2DBF] text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:opacity-95 transition-all cursor-pointer"
                >
                  <MessageCircle size={15} />
                  <span>Consult Ar. Sridhar on WhatsApp</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
