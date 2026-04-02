"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { TerminalSearch } from '@/components/layout/TerminalSearch';
import { 
  Search, ChevronRight, ChevronLeft, ArrowUpRight, 
  Layers, Settings, Layout, Grid, Box
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { calculators, CalculatorMeta } from '@/lib/calculators';

const CATEGORY_MAPPING: Record<string, string> = {
  'Structure': 'Core Structural & Earthwork',
  'Interior': 'Finishes & Interiors',
  'Site': 'Site & Landscape Planning',
  'MEP': 'Utilities & MEP Systems',
  'Financial': 'Financial & Area Analysis',
  'Tools': 'Enabling Tools & Helpers'
};

const CalculatorCard = ({ item, isCompact = false }: { item: CalculatorMeta, isCompact?: boolean }) => {
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsClicked(true);
    setTimeout(() => {
      router.push(item.path);
    }, 600);
  };

  if (isCompact) {
    return (
      <Link 
        href={item.path}
        onClick={handleClick}
        className="group relative flex items-center gap-3 p-3 rounded-2xl bg-white/40 hover:bg-white/80 border border-transparent hover:border-[#7B2DBF]/20 transition-all duration-500 shadow-sm hover:shadow-md"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1C1C72] to-[#7B2DBF] flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform duration-500">
          <item.icon size={18} strokeWidth={1.5} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-[11px] font-bold text-[#1C1C72] uppercase tracking-wider truncate group-hover:text-[#7B2DBF] transition-colors">
            {item.name}
          </h4>
        </div>
        <ArrowUpRight size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
      </Link>
    );
  }

  return (
    <div className="relative h-full">
      <Link 
        href={item.path}
        onClick={handleClick}
        className={`group relative block h-full bg-white/60 backdrop-blur-xl rounded-[2rem] p-8 border border-white/40 hover:border-[#7B2DBF]/30 hover:shadow-[0_40px_80px_-20px_rgba(28,28,114,0.1)] transition-all duration-700 overflow-hidden ${isClicked ? 'opacity-0 scale-105 pointer-events-none' : ''}`}
      >
        <div className="flex flex-col h-full space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1C1C72] to-[#7B2DBF] flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-700">
            <item.icon className="w-8 h-8 text-white" strokeWidth={1.25} />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-black text-[#1C1C72] uppercase tracking-[0.05em] group-hover:text-[#7B2DBF] transition-colors leading-tight">
              {item.name}
            </h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">
              {item.description}
            </p>
          </div>

          <div className="mt-auto pt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#1C1C72]/30 group-hover:text-[#7B2DBF]/60 transition-colors">
            Open Module <ArrowUpRight size={12} />
          </div>
        </div>
      </Link>

      <AnimatePresence>
        {isClicked && (
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
                    <item.icon className="w-10 h-10 text-white" strokeWidth={1} />
                  </motion.div>
                  <div className="absolute inset-0 bg-white/5 animate-pulse"></div>
               </div>
               <div className="text-center text-white">
                 <h2 className="text-xl font-black uppercase tracking-[0.4em] mb-2">{item.name}</h2>
                 <p className="text-white/40 text-[10px] font-bold tracking-[0.2em]">INITIALIZING AGNAA PRECISION ENGINE</p>
               </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TopDeckCarousel = ({ popularItems }: { popularItems: CalculatorMeta[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 20);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
      
      const index = Math.round(scrollLeft / (clientWidth / (window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3)));
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (scrollEl) {
      scrollEl.addEventListener('scroll', checkScroll);
      checkScroll();
      return () => scrollEl.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative py-12 px-2 md:px-0">
      <div className="max-w-[1400px] mx-auto absolute -top-4 left-6 lg:left-12 flex items-center gap-4 z-20">
         <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1C1C72]/40">Popular Modules</span>
         <div className="h-[1px] w-24 bg-gradient-to-r from-[#7B2DBF]/20 to-transparent"></div>
      </div>

      <div className="group relative">
        {/* Navigation Buttons */}
        <div className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block">
           <button 
             onClick={() => scroll('left')}
             disabled={!canScrollLeft}
             className={`w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center border border-slate-100 transition-all ${!canScrollLeft ? 'opacity-20 scale-90 grayscale cursor-not-allowed' : 'hover:scale-110 active:scale-95 text-[#1C1C72]'}`}
           >
             <ChevronLeft size={24} strokeWidth={2.5} />
           </button>
        </div>
        <div className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block">
           <button 
             onClick={() => scroll('right')}
             disabled={!canScrollRight}
             className={`w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center border border-slate-100 transition-all ${!canScrollRight ? 'opacity-20 scale-90 grayscale cursor-not-allowed' : 'hover:scale-110 active:scale-95 text-[#1C1C72]'}`}
           >
             <ChevronRight size={24} strokeWidth={2.5} />
           </button>
        </div>

        {/* Carousel Container */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory px-4 md:px-0 pb-12 transition-all"
        >
          {popularItems.map((item) => (
            <div key={item.id} className="min-w-full md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)] snap-start h-[420px]">
              <CalculatorCard item={item} />
            </div>
          ))}
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-2">
          {Array.from({ length: Math.ceil(popularItems.length / (typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3)) }).map((_, i) => (
            <div 
              key={i} 
              className={`h-1 rounded-full transition-all duration-500 ${activeIndex === i ? 'w-8 bg-[#7B2DBF]' : 'w-2 bg-[#1C1C72]/10'}`} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default function CalculatorsHub() {
  const [searchQuery, setSearchQuery] = useState('');
  const popularCalculators = calculators.filter(c => c.popular);

  const groupedCalculators = calculators.reduce((acc, calc) => {
    const categoryName = CATEGORY_MAPPING[calc.category] || calc.category;
    if (!acc[categoryName]) acc[categoryName] = [];
    acc[categoryName].push(calc);
    return acc;
  }, {} as Record<string, CalculatorMeta[]>);

  return (
    <div className="min-h-screen bg-slate-50 text-[#0F172A] font-inter selection:bg-[#7B2DBF] selection:text-white pb-32 relative overflow-hidden">
      
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#1C1C72 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-[#7B2DBF]/10 to-transparent blur-[120px] pointer-events-none" />
      
      <div className="fixed top-8 right-8 z-[60]">
        <TerminalSearch />
      </div>

      <div className="relative z-10 pt-32 pb-16 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#7B2DBF]/30" />
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-[#1C1C72]/50">Agnaa Intelligence</span>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#7B2DBF]/30" />
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-[#1C1C72] tracking-[-0.05em] mb-10 leading-[0.9]">
              Precision <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1C1C72] via-[#7B2DBF] to-[#1C1C72] animate-gradient-x">Engineering</span><br/>Calculators.
            </h1>
          </motion.div>

          <TopDeckCarousel popularItems={popularCalculators} />

          {/* SEARCH ZONE */}
          <div className="max-w-xl mx-auto mb-24 mt-12 relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#1C1C72]/5 to-[#7B2DBF]/5 rounded-[2.5rem] blur-xl opacity-0 group-focus-within:opacity-100 transition-all duration-1000"></div>
            <div className="relative flex items-center bg-white/70 backdrop-blur-xl rounded-2xl border border-slate-200/60 shadow-xl overflow-hidden transition-all duration-500 group-focus-within:border-[#7B2DBF]/30">
              <div className="pl-6 pointer-events-none">
                <Search className="w-5 h-5 text-slate-400 group-focus-within:text-[#7B2DBF] transition-colors" />
              </div>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search all engineering systems..." 
                className="w-full bg-transparent outline-none text-base font-bold text-[#1C1C72] placeholder:text-slate-300 px-4 py-6"
              />
            </div>
          </div>

          {/* ALL CALCULATORS GRID */}
          <div className="space-y-20">
            <div className="flex items-center gap-6 mb-12">
               <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1C1C72]">Full Library Matrix</h2>
               <div className="flex-1 h-[1px] bg-gradient-to-r from-[#1C1C72]/10 via-[#1C1C72]/5 to-transparent"></div>
            </div>

            {Object.entries(groupedCalculators).map(([category, items]) => {
              const filteredItems = items.filter(item => 
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                item.description.toLowerCase().includes(searchQuery.toLowerCase())
              );

              if (filteredItems.length === 0) return null;

              return (
                <div key={category} className="space-y-8">
                  <div className="flex items-center gap-4">
                    <h3 className="text-sm font-bold text-[#1C1C72] tracking-tight">{category}</h3>
                    <div className="h-px flex-1 bg-slate-100"></div>
                    <span className="text-[10px] font-black text-slate-300 tabular-nums">{filteredItems.length} UNITS</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {filteredItems.map((item) => (
                      <CalculatorCard key={item.id} item={item} isCompact={true} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
