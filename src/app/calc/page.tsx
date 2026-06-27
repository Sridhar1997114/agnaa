"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { TerminalSearch } from '@/components/layout/TerminalSearch';
import { 
  Search, ArrowUpRight, Layers, Layout, Grid, Box, 
  Settings, Zap, ShieldAlert, Cpu, CheckCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { calculators, CalculatorMeta } from '@/lib/calculators';

const CATEGORIES = [
  { id: 'all', label: 'All Modules' },
  { id: 'Structure', label: 'Core Structure' },
  { id: 'Interior', label: 'Finishes & Interior' },
  { id: 'Site', label: 'Site & Landscaping' },
  { id: 'MEP', label: 'MEP Utilities' },
  { id: 'Financial', label: 'Financial & Area' },
  { id: 'Tools', label: 'Helpers & Tools' }
];

const CATEGORY_COLORS: Record<string, string> = {
  'Structure': 'from-blue-500/10 to-indigo-500/10 border-blue-500/20 text-blue-600',
  'Interior': 'from-pink-500/10 to-rose-500/10 border-pink-500/20 text-pink-600',
  'Site': 'from-emerald-500/10 to-teal-500/10 border-emerald-500/20 text-emerald-600',
  'MEP': 'from-amber-500/10 to-orange-500/10 border-amber-500/20 text-amber-600',
  'Financial': 'from-purple-500/10 to-violet-500/10 border-purple-500/20 text-purple-600',
  'Tools': 'from-slate-500/10 to-zinc-500/10 border-slate-500/20 text-slate-600'
};

const CalculatorBentoCard = ({ 
  item, 
  index, 
  onClick 
}: { 
  item: CalculatorMeta; 
  index: number;
  onClick: (e: React.MouseEvent, path: string) => void;
}) => {
  const Icon = item.icon || Grid;
  
  // Decide Bento Cell dimensions based on popular flag and index pattern
  let spanClass = 'col-span-1 row-span-1 h-full';
  let layoutType: 'large' | 'wide' | 'tall' | 'standard' = 'standard';
  
  if (item.popular) {
    spanClass = 'md:col-span-2 md:row-span-2 h-full';
    layoutType = 'large';
  } else {
    const pattern = index % 6;
    if (pattern === 1) {
      spanClass = 'md:col-span-2 md:row-span-1 h-full';
      layoutType = 'wide';
    } else if (pattern === 4) {
      spanClass = 'md:col-span-1 md:row-span-2 h-full';
      layoutType = 'tall';
    }
  }

  const baseCardStyle = "group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-white/60 bg-white/50 p-6 backdrop-blur-xl shadow-sm transition-all duration-700 hover:border-[#7B2DBF]/40 hover:bg-white/80 hover:shadow-[0_30px_60px_-15px_rgba(123,45,191,0.08)]";

  if (layoutType === 'large') {
    return (
      <Link href={item.path} onClick={(e) => onClick(e, item.path)} className={`${spanClass} ${baseCardStyle} min-h-[340px]`}>
        {/* Glow effect */}
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-[#7B2DBF]/10 to-indigo-500/0 blur-2xl transition-all duration-700 group-hover:scale-125" />
        
        <div className="flex justify-between items-start">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1C1C72] to-[#7B2DBF] text-white shadow-md transition-all duration-700 group-hover:scale-110 group-hover:rotate-6">
            <Icon className="h-8 w-8" strokeWidth={1.5} />
          </div>
          <span className={`rounded-full border px-3 py-1 text-[9px] font-black uppercase tracking-widest ${CATEGORY_COLORS[item.category] || 'bg-slate-100 text-slate-600'}`}>
            {item.category}
          </span>
        </div>

        <div className="mt-8 space-y-3">
          <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-[#7B2DBF]">
            <Cpu size={10} className="animate-spin-slow" /> Premium Module
          </span>
          <h3 className="text-2xl font-black leading-tight text-[#1C1C72] uppercase tracking-[0.02em] group-hover:text-[#7B2DBF] transition-colors">
            {item.name}
          </h3>
          <p className="text-xs font-semibold leading-relaxed text-slate-500/80">
            {item.description}
          </p>
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#1C1C72]/40 group-hover:text-[#7B2DBF] transition-colors">
          <span>Initialize Engine</span>
          <ArrowUpRight size={14} className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
      </Link>
    );
  }

  if (layoutType === 'wide') {
    return (
      <Link href={item.path} onClick={(e) => onClick(e, item.path)} className={`${spanClass} ${baseCardStyle} min-h-[160px] flex-row items-center gap-6`}>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#1C1C72]/10 to-[#7B2DBF]/10 text-[#1C1C72] transition-all duration-700 group-hover:bg-gradient-to-br group-hover:from-[#1C1C72] group-hover:to-[#7B2DBF] group-hover:text-white group-hover:scale-110">
          <Icon className="h-6 w-6" strokeWidth={1.5} />
        </div>

        <div className="flex-1 space-y-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">
              {item.category}
            </span>
          </div>
          <h3 className="text-base font-black text-[#1C1C72] uppercase tracking-[0.02em] truncate group-hover:text-[#7B2DBF] transition-colors">
            {item.name}
          </h3>
          <p className="text-xs text-slate-400 font-semibold line-clamp-1">
            {item.description}
          </p>
        </div>

        <ArrowUpRight size={16} className="text-slate-300 transition-all duration-500 group-hover:text-[#7B2DBF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    );
  }

  if (layoutType === 'tall') {
    return (
      <Link href={item.path} onClick={(e) => onClick(e, item.path)} className={`${spanClass} ${baseCardStyle} min-h-[340px]`}>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#1C1C72]/10 to-[#7B2DBF]/10 text-[#1C1C72] transition-all duration-700 group-hover:bg-gradient-to-br group-hover:from-[#1C1C72] group-hover:to-[#7B2DBF] group-hover:text-white group-hover:scale-110">
          <Icon className="h-6 w-6" strokeWidth={1.5} />
        </div>

        <div className="mt-auto space-y-2">
          <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">
            {item.category}
          </span>
          <h3 className="text-lg font-black text-[#1C1C72] uppercase tracking-[0.02em] leading-tight group-hover:text-[#7B2DBF] transition-colors">
            {item.name}
          </h3>
          <p className="text-xs text-slate-500/80 font-semibold leading-relaxed">
            {item.description}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-slate-100/50 pt-3 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-[#7B2DBF] transition-colors">
          <span>Open</span>
          <ArrowUpRight size={12} />
        </div>
      </Link>
    );
  }

  // Standard Compact Bento Cell
  return (
    <Link href={item.path} onClick={(e) => onClick(e, item.path)} className={`${spanClass} ${baseCardStyle} min-h-[160px]`}>
      <div className="flex justify-between items-start">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#1C1C72]/5 to-[#7B2DBF]/5 border border-[#1C1C72]/5 text-[#1C1C72] transition-all duration-700 group-hover:bg-gradient-to-br group-hover:from-[#1C1C72] group-hover:to-[#7B2DBF] group-hover:text-white group-hover:scale-110">
          <Icon className="h-5 w-5" strokeWidth={1.5} />
        </div>
        <ArrowUpRight size={14} className="text-slate-300 transition-transform duration-500 group-hover:text-[#7B2DBF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>

      <div className="space-y-1 mt-4">
        <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">
          {item.category}
        </span>
        <h3 className="text-sm font-black text-[#1C1C72] uppercase tracking-[0.02em] leading-snug truncate group-hover:text-[#7B2DBF] transition-colors">
          {item.name}
        </h3>
      </div>
    </Link>
  );
};

export default function CalculatorsHub() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [transitioningItem, setTransitioningItem] = useState<CalculatorMeta | null>(null);

  const handleCardClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    const item = calculators.find(c => c.path === path);
    if (item) {
      setTransitioningItem(item);
      setTimeout(() => {
        router.push(path);
      }, 600);
    }
  };

  const filteredCalculators = calculators.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-[#0F172A] font-inter selection:bg-[#7B2DBF] selection:text-white pb-32 relative overflow-hidden">
      
      {/* BACKGROUND GRID ELEMENTS */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#1C1C72 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-[#7B2DBF]/10 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-indigo-500/5 to-transparent blur-[120px] pointer-events-none" />

      <div className="fixed top-8 right-8 z-[60]">
        <TerminalSearch />
      </div>

      <div className="relative z-10 pt-32 pb-16 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          
          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#7B2DBF]/30" />
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-[#1C1C72]/50">Agnaa Precision Suite</span>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#7B2DBF]/30" />
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-[#1C1C72] tracking-[-0.05em] mb-6 leading-[0.9]">
              Precision <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1C1C72] via-[#7B2DBF] to-[#1C1C72] animate-gradient-x">Engineering</span><br/>Calculators.
            </h1>
            
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400 mt-6">
              <CheckCircle size={14} className="text-emerald-500" />
              <span>All <span className="text-[#1C1C72] font-black">{calculators.length} Modules</span> compiling & operating perfectly</span>
            </div>
          </motion.div>

          {/* SEARCH & FILTER CONTROLS */}
          <div className="max-w-4xl mx-auto mb-16 space-y-8">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#1C1C72]/5 to-[#7B2DBF]/5 rounded-[2.5rem] blur-xl opacity-0 group-focus-within:opacity-100 transition-all duration-1000"></div>
              <div className="relative flex items-center bg-white/70 backdrop-blur-xl rounded-2xl border border-slate-200/60 shadow-xl overflow-hidden transition-all duration-500 group-focus-within:border-[#7B2DBF]/30">
                <div className="pl-6 pointer-events-none">
                  <Search className="w-5 h-5 text-slate-400 group-focus-within:text-[#7B2DBF] transition-colors" />
                </div>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search all 43 engineering calculators..." 
                  className="w-full bg-transparent outline-none text-base font-bold text-[#1C1C72] placeholder:text-slate-300 px-4 py-5"
                />
              </div>
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap justify-center gap-2">
              {CATEGORIES.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-500 ${
                    activeCategory === category.id 
                    ? 'bg-gradient-to-r from-[#1C1C72] to-[#7B2DBF] text-white shadow-md' 
                    : 'bg-white/60 hover:bg-white border border-slate-200/40 hover:border-slate-300/60 text-slate-500 hover:text-[#1C1C72]'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* BENTO GRID */}
          <motion.div 
            layout 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[160px]"
          >
            <AnimatePresence mode="popLayout">
              {filteredCalculators.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <CalculatorBentoCard 
                    item={item} 
                    index={idx}
                    onClick={handleCardClick}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* EMPTY STATE */}
          {filteredCalculators.length === 0 && (
            <div className="w-full text-center py-20 bg-white/30 backdrop-blur-xl border border-dashed border-slate-200 rounded-[2rem]">
              <div className="text-slate-300 text-5xl mb-4">🔍</div>
              <h3 className="text-lg font-black text-[#1C1C72] uppercase tracking-widest">No Calculators Found</h3>
              <p className="text-xs text-slate-400 font-semibold mt-2">Try adjusting your search query or switching categories</p>
            </div>
          )}

        </div>
      </div>

      {/* FULLSCREEN ROUTE INITIALIZATION TRANSITION */}
      <AnimatePresence>
        {transitioningItem && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 50% 50%)', opacity: 0 }}
            animate={{ clipPath: 'circle(150% at 50% 50%)', opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-gradient-to-br from-[#1C1C72] to-[#7B2DBF] flex items-center justify-center pointer-events-none"
          >
             <div className="flex flex-col items-center gap-6">
               <div className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center relative overflow-hidden">
                  <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                    {React.createElement(transitioningItem.icon || Grid, { className: "w-10 h-10 text-white", strokeWidth: 1 })}
                  </motion.div>
                  <div className="absolute inset-0 bg-white/5 animate-pulse"></div>
               </div>
               <div className="text-center text-white">
                 <h2 className="text-xl font-black uppercase tracking-[0.4em] mb-2">{transitioningItem.name}</h2>
                 <p className="text-white/40 text-[10px] font-bold tracking-[0.2em]">INITIALIZING AGNAA PRECISION ENGINE</p>
               </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
