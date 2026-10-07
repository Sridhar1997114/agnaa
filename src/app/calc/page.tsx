"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { TerminalSearch } from '@/components/layout/TerminalSearch';
import { 
  Search, ArrowUpRight, Grid, Box, 
  Sparkles, CheckCircle, Cpu, ChevronDown, ChevronUp, Layers, Wrench
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { calculators, CalculatorMeta } from '@/lib/calculators';

const CATEGORIES = [
  { id: 'all', label: 'All 8 Core Modules' },
  { id: 'Structure', label: 'Construction & Setbacks' },
  { id: 'Interior', label: 'Interiors & Finishes' },
  { id: 'Financial', label: 'Approvals & ROI' },
  { id: 'Tools', label: 'Vastu & Plot Tools' }
];

// Custom Bento Layout Spans for 12 Items (4 columns grid)
const BENTO_LAYOUTS: Record<string, { colSpan: string; rowSpan: string; theme: string; tag?: string }> = {
  'gn-floor': { 
    colSpan: 'col-span-1 md:col-span-2 lg:col-span-2', 
    rowSpan: 'row-span-2', 
    theme: 'gradient-hero',
    tag: 'Flagship Estimator'
  },
  'interior': { 
    colSpan: 'col-span-1 md:col-span-2 lg:col-span-2', 
    rowSpan: 'row-span-2', 
    theme: 'gradient-violet',
    tag: 'Luxury Interior'
  },
  'rcc': {
    colSpan: 'col-span-1 md:col-span-1 lg:col-span-1',
    rowSpan: 'row-span-1',
    theme: 'glass-dark',
    tag: 'Steel & Concrete'
  },
  'fsi': { 
    colSpan: 'col-span-1 md:col-span-1 lg:col-span-1', 
    rowSpan: 'row-span-1', 
    theme: 'glass-dark',
    tag: 'GHMC / HMDA'
  },
  'paint': {
    colSpan: 'col-span-1 md:col-span-1 lg:col-span-1',
    rowSpan: 'row-span-1',
    theme: 'glass-compact',
    tag: 'Finishes'
  },
  'vastu': { 
    colSpan: 'col-span-1 md:col-span-1 lg:col-span-1', 
    rowSpan: 'row-span-1', 
    theme: 'glass-gold',
    tag: 'Ayadi Math'
  },
  'envelope': { 
    colSpan: 'col-span-1 md:col-span-2 lg:col-span-2', 
    rowSpan: 'row-span-1', 
    theme: 'glass-wide',
    tag: 'Approval Norms'
  },
  'tiles': {
    colSpan: 'col-span-1 md:col-span-2 lg:col-span-2',
    rowSpan: 'row-span-1',
    theme: 'glass-wide',
    tag: 'Flooring'
  },
  'aac-blocks': {
    colSpan: 'col-span-1 md:col-span-1 lg:col-span-1',
    rowSpan: 'row-span-1',
    theme: 'glass-compact',
    tag: 'Masonry'
  },
  'efficiency': { 
    colSpan: 'col-span-1 md:col-span-1 lg:col-span-1', 
    rowSpan: 'row-span-1', 
    theme: 'glass-compact',
    tag: 'Carpet Area'
  },
  'roi': { 
    colSpan: 'col-span-1 md:col-span-1 lg:col-span-1', 
    rowSpan: 'row-span-1', 
    theme: 'glass-compact',
    tag: 'Yield'
  },
  'plot-area': { 
    colSpan: 'col-span-1 md:col-span-1 lg:col-span-1', 
    rowSpan: 'row-span-1', 
    theme: 'glass-compact',
    tag: 'Land'
  }
};

export default function CalculatorsHub() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showExtra, setShowExtra] = useState(false);

  const filteredCalculators = calculators.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const importantCalculators = filteredCalculators.filter(item => item.isImportant);
  const extraCalculators = filteredCalculators.filter(item => !item.isImportant);

  const isExpanded = showExtra || searchQuery.trim() !== '' || activeCategory !== 'all';

  const renderCalculatorCard = (item: CalculatorMeta) => {
    const layout = BENTO_LAYOUTS[item.id] || { colSpan: 'col-span-1', rowSpan: 'row-span-1', theme: 'glass-compact' };
    const Icon = item.icon || Grid;
    const isHero = layout.rowSpan === 'row-span-2';

    return (
      <motion.div
        key={item.id}
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`${layout.colSpan} ${layout.rowSpan}`}
      >
        <Link
          href={item.path}
          className={`group relative h-full w-full flex flex-col justify-between overflow-hidden rounded-[2.2rem] p-7 transition-all duration-500 
            ${isHero 
              ? 'bg-gradient-to-br from-[#1C1C72] via-[#2A1B81] to-[#7B2DBF] text-white shadow-xl shadow-[#1C1C72]/15 hover:shadow-2xl hover:shadow-[#7B2DBF]/25 hover:scale-[1.01]' 
              : 'bg-white/80 hover:bg-white backdrop-blur-xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:shadow-[#1C1C72]/5 hover:border-[#7B2DBF]/40 hover:scale-[1.01]'
            }`}
        >
          {/* Background Ambient Glow */}
          {isHero ? (
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl transition-all duration-700 group-hover:scale-150" />
          ) : (
            <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br from-[#7B2DBF]/5 to-transparent blur-xl transition-all duration-700 group-hover:scale-125" />
          )}

          {/* CARD TOP */}
          <div className="flex items-start justify-between relative z-10">
            <div className={`flex items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110 
              ${isHero 
                ? 'h-14 w-14 bg-white/15 backdrop-blur-md text-white border border-white/20' 
                : 'h-12 w-12 bg-[#1C1C72]/5 text-[#1C1C72] border border-[#1C1C72]/10 group-hover:bg-[#1C1C72] group-hover:text-white'
              }`}
            >
              <Icon className={isHero ? "h-7 w-7" : "h-6 w-6"} strokeWidth={1.5} />
            </div>

            <div className="flex items-center gap-2">
              {layout.tag && (
                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                  isHero ? 'bg-white/15 text-white/90 border border-white/20' : 'bg-[#7B2DBF]/10 text-[#7B2DBF]'
                }`}>
                  {layout.tag}
                </span>
              )}
              <div className={`p-2 rounded-full transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 ${
                isHero ? 'bg-white/10 text-white' : 'text-slate-400 group-hover:text-[#7B2DBF]'
              }`}>
                <ArrowUpRight size={18} />
              </div>
            </div>
          </div>

          {/* CARD BOTTOM / CONTENT */}
          <div className="relative z-10 mt-auto pt-4 space-y-2">
            {isHero && (
              <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-[#7B2DBF] bg-white/90 w-fit px-2.5 py-0.5 rounded-full shadow-sm">
                <Cpu size={10} /> Premium Engine
              </div>
            )}

            <h3 className={`font-black uppercase tracking-[0.02em] leading-tight transition-colors 
              ${isHero ? 'text-2xl sm:text-3xl text-white' : 'text-lg text-[#1C1C72] group-hover:text-[#7B2DBF]'}`}
            >
              {item.name}
            </h3>

            <p className={`text-xs font-semibold leading-relaxed line-clamp-2 ${
              isHero ? 'text-white/80' : 'text-slate-500'
            }`}>
              {item.description}
            </p>

            <div className={`pt-3 border-t flex items-center justify-between text-[9px] font-black uppercase tracking-[0.2em] ${
              isHero ? 'border-white/15 text-white/60 group-hover:text-white' : 'border-slate-100 text-slate-400 group-hover:text-[#7B2DBF]'
            }`}>
              <span>Initialize Engine</span>
              <span className="text-[11px]">→</span>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-inter selection:bg-[#7B2DBF] selection:text-white pb-32 relative overflow-hidden">
      
      {/* BACKGROUND GRADIENT GLOWS */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#1C1C72 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <div className="absolute -top-[15%] -right-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-[#7B2DBF]/15 via-purple-500/5 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute top-[35%] -left-[10%] w-[45%] h-[45%] rounded-full bg-gradient-to-br from-indigo-500/10 to-transparent blur-[140px] pointer-events-none" />

      <div className="fixed top-6 right-8 z-[60]">
        <TerminalSearch />
      </div>

      <div className="relative z-10 pt-28 pb-16 px-4 sm:px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          
          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-slate-200/80 shadow-sm backdrop-blur-md mb-6">
              <Sparkles size={14} className="text-[#7B2DBF]" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1C1C72]">AGNAA DESIGN STUDIO ENGINE</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-[#1C1C72] tracking-[-0.04em] mb-4 leading-[0.95]">
              Precision <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1C1C72] via-[#7B2DBF] to-[#1C1C72]">Calculators</span>
            </h1>
            
            <p className="text-slate-500 text-sm sm:text-base font-semibold max-w-xl mx-auto mb-6">
              Official architectural & structural estimation suite for plot owners, luxury villa builders & commercial investors.
            </p>

            <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400">
              <CheckCircle size={14} className="text-emerald-500" />
              <span>8 Core Important Calculators + Extra Modules Available</span>
            </div>
          </motion.div>

          {/* SEARCH & CATEGORY CONTROLS */}
          <div className="max-w-3xl mx-auto mb-12 space-y-6">
            <div className="relative group">
              <div className="relative flex items-center bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-200/90 shadow-lg overflow-hidden transition-all duration-300 group-focus-within:border-[#7B2DBF]/50 group-focus-within:shadow-[0_10px_30px_rgba(123,45,191,0.1)]">
                <div className="pl-5 pointer-events-none">
                  <Search className="w-5 h-5 text-slate-400 group-focus-within:text-[#7B2DBF] transition-colors" />
                </div>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search FSI, RCC, Steel, AAC Blocks, Paint, Tiles, Vastu..." 
                  className="w-full bg-transparent outline-none text-sm font-bold text-[#1C1C72] placeholder:text-slate-300 px-4 py-4"
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap justify-center gap-2">
              {CATEGORIES.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all duration-300 ${
                    activeCategory === category.id 
                    ? 'bg-[#1C1C72] text-white shadow-md shadow-[#1C1C72]/20' 
                    : 'bg-white/70 hover:bg-white border border-slate-200/70 text-slate-500 hover:text-[#1C1C72]'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* ─── 8 IMPORTANT CALCULATORS (PRIMARY BENTO GRID) ─── */}
          {importantCalculators.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#1C1C72]">
                    Core Precision Engines ({importantCalculators.length})
                  </span>
                </div>
              </div>

              <motion.div 
                layout 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-[210px]"
              >
                <AnimatePresence mode="popLayout">
                  {importantCalculators.map((item) => renderCalculatorCard(item))}
                </AnimatePresence>
              </motion.div>
            </div>
          )}

          {/* ─── EXTRA CALCULATORS TOGGLE BUTTON ─── */}
          {extraCalculators.length > 0 && searchQuery.trim() === '' && activeCategory === 'all' && (
            <div className="mt-14 text-center flex flex-col items-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowExtra(!showExtra)}
                className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-white/90 hover:bg-white border border-slate-200/90 shadow-md hover:shadow-xl hover:border-[#7B2DBF]/50 transition-all duration-300 group cursor-pointer"
              >
                <div className="p-2.5 rounded-xl bg-[#7B2DBF]/10 text-[#7B2DBF] group-hover:bg-[#7B2DBF] group-hover:text-white transition-colors shadow-sm">
                  {showExtra ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
                <div className="text-left">
                  <div className="text-sm font-black uppercase tracking-wider text-[#1C1C72] group-hover:text-[#7B2DBF] transition-colors flex items-center gap-2">
                    {showExtra ? 'Hide Extra Calculators' : 'View Extra Calculators'}
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#1C1C72] text-white">
                      {extraCalculators.length} Extra Tools
                    </span>
                  </div>
                  <div className="text-[11px] font-semibold text-slate-400 mt-0.5">
                    {showExtra 
                      ? 'Click to collapse secondary estimation tools' 
                      : 'AAC Blocks, Carpet Area Efficiency, Commercial ROI & Plot Converter'}
                  </div>
                </div>
              </motion.button>
            </div>
          )}

          {/* ─── EXTRA CALCULATORS GRID (SHOWN ON BUTTON CLICK OR SEARCH/FILTER) ─── */}
          <AnimatePresence>
            {extraCalculators.length > 0 && isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: 25 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: 25 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-14 pt-10 border-t border-slate-200/80 space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100/80 text-[#7B2DBF] text-[10px] font-black uppercase tracking-widest mb-2">
                      <Sparkles size={12} /> Extra Module Suite
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-[#1C1C72] tracking-tight">
                      Extra & Specialized Calculators
                    </h2>
                  </div>
                  <p className="text-xs font-semibold text-slate-400 max-w-md">
                    Additional architectural estimation tools for AAC block masonry, carpet efficiency ratios, commercial ROI, and plot area unit conversions.
                  </p>
                </div>

                <motion.div 
                  layout 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-[210px]"
                >
                  <AnimatePresence mode="popLayout">
                    {extraCalculators.map((item) => renderCalculatorCard(item))}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* EMPTY STATE */}
          {filteredCalculators.length === 0 && (
            <div className="w-full text-center py-20 bg-white/60 backdrop-blur-xl border border-dashed border-slate-200 rounded-[2.5rem]">
              <div className="text-slate-300 text-5xl mb-4">🔍</div>
              <h3 className="text-lg font-black text-[#1C1C72] uppercase tracking-widest">No Calculators Found</h3>
              <p className="text-xs text-slate-400 font-semibold mt-2">Try adjusting your search query or switching categories</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

