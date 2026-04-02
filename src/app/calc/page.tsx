"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { TerminalSearch } from '@/components/layout/TerminalSearch';
import { 
  Map, Ruler, Layers, Building, Maximize, Expand, AlignLeft, 
  Settings, Bug, Box, Grid, Columns,
  Layout, Square, Droplet, Frame, Scan,
  Paintbrush, Compass, PenTool, Home, 
  Zap, RefreshCcw, Database, Calculator, Search, ChevronRight,
  ArrowUpRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const CATEGORIES = [
  {
    title: 'Architecture & Spatial Planning',
    items: [
      { id: 'plot-area', name: 'Plot Area Module', desc: 'Compute bounds in SqFt, SqYards, Acres & Guntas.', href: '/calc/plot-area', icon: Map },
      { id: 'setback-envelope', name: 'Setback Envelope', desc: 'Extrapolate buildable rectangle after offset subtractions.', href: '/calc/setback-envelope', icon: Ruler },
      { id: 'g-n-floor-estimator', name: 'G+N Floor Estimator', desc: 'Distribute permissible built-up area across per-floor levels.', href: '/calc/gn-floor-estimator', icon: Layers },
      { id: 'fsi', name: 'FAR / FSI Computed', desc: 'Compute Floor Area Ratio and maximum allowable density.', href: '/calc/fsi', icon: Building },
      { id: 'built-up-efficiency', name: 'Volumetric Efficiency', desc: 'Calculate percent efficiency of carpet vs. built-up area.', href: '/calc/built-up-efficiency', icon: Maximize },
      { id: 'built-up', name: 'Legacy Area Translate', desc: 'Estimate simple carpet to super built-up scaling.', href: '/calc/built-up', icon: Expand },
      { id: 'staircase', name: 'Stairway Ergonomics', desc: 'Architectural planning for algorithmic tread/riser ratios.', href: '/calc/staircase', icon: AlignLeft },
    ]
  },
  {
    title: 'Core Structural & Earthwork',
    items: [
      { id: 'excavation-earthwork', name: 'Trench / Excavation', desc: 'Earthwork volume factoring spatial soil bulking expansion.', href: '/calc/excavation-earthwork', icon: Settings },
      { id: 'anti-termite', name: 'Anti-Termite Treatment', desc: 'Chemical emulsion calculation for sub-grade foundation zones.', href: '/calc/anti-termite', icon: Bug },
      { id: 'pcc-concrete', name: 'PCC Bed Configuration', desc: 'Volumetric concrete and aggregate breakdown for base.', href: '/calc/pcc-concrete', icon: Box },
      { id: 'foundation-footing', name: 'Footing Matrix Array', desc: 'Concrete mass requirements for isolated/combined footings.', href: '/calc/foundation-footing', icon: Grid },
      { id: 'concrete-shapes', name: 'Advanced Volume Engine', desc: 'Geometric volume formulas for cylinders, cones, and trenches.', href: '/calc/concrete-shapes', icon: Box },
      { id: 'steel-rebar', name: 'Reinforcement Steel', desc: 'Compute metric tonnage for column, slab, and beam grids.', href: '/calc/steel-rebar', icon: Columns },
      { id: 'rcc', name: 'RCC Slab Casting', desc: 'Volume splits for cement, sand, and coarse aggregates.', href: '/calc/rcc', icon: Layers },
    ]
  },
  {
    title: 'Masonry & Enabling Works',
    items: [
      { id: 'brick', name: 'Brickwork Massing', desc: 'Unit block counts and mortar batching for partition walls.', href: '/calc/brick', icon: Grid },
      { id: 'aac-blocks', name: 'AAC Block Array', desc: 'Lightweight aerated core elements and thin-bed joining mortar.', href: '/calc/aac-blocks', icon: Grid },
      { id: 'compound-wall', name: 'Boundary Extension', desc: 'Estimate foundations and masonry for perimeter protection.', href: '/calc/compound-wall', icon: Square },
      { id: 'plaster', name: 'Wall Plaster Gauge', desc: 'Render material counts for uniform internal/external surfacing.', href: '/calc/plaster', icon: Droplet },
      { id: 'roofing', name: 'Cladding & Roofing', desc: 'Sheet counts factoring slope overlap and overhang metrics.', href: '/calc/roofing', icon: Layout },
      { id: 'shuttering', name: 'Shuttering Formwork', desc: 'Calculate contact plywood area required for concrete containment.', href: '/calc/shuttering', icon: Frame },
      { id: 'scaffolding', name: 'Scaffolding Matrix', desc: 'Required tubular scaffolding area and grid setup volumes.', href: '/calc/scaffolding', icon: Scan },
    ]
  },
  {
    title: 'Finishes & Interiors',
    items: [
      { id: 'paint', name: 'Paint Surface Yield', desc: 'Estimate gallons correcting for negative wall openings.', href: '/calc/paint', icon: Paintbrush },
      { id: 'advanced-flooring', name: 'Advanced Tile Topology', desc: 'Stone/tile layouts factoring complex edge cutoff wastage.', href: '/calc/advanced-flooring', icon: Compass },
      { id: 'tiles', name: 'Simple Floor Grid', desc: 'Orthogonal raw grid array for standard square coverage.', href: '/calc/tiles', icon: PenTool },
      { id: 'interior-cost', name: 'Interiors Fit-Out Matrix', desc: 'Logistical budget scaling for premium spatial finishes.', href: '/calc/interior-cost', icon: Home },
    ]
  },
  {
    title: 'Utilities & Macro Financials',
    items: [
      { id: 'electrical', name: 'Electrical Hub Loading', desc: 'Wattage threshold and primary lighting/power node arrays.', href: '/calc/electrical', icon: Zap },
      { id: 'septic-tank', name: 'Septic Sludge Digester', desc: 'Sanitary volumetric scaling for residential liquid waste.', href: '/calc/septic-tank', icon: RefreshCcw },
      { id: 'tank', name: 'Liquid Sump Array', desc: 'Total maximum storage load capacity for underground reservoirs.', href: '/calc/tank', icon: Database },
      { id: 'cost', name: 'Holistic Macro Costing', desc: 'Phase-wise financial distribution of base-build lifecycle.', href: '/estimate', icon: Calculator },
    ]
  }
];

const CalculatorCard = ({ item, index }: { item: any, index: number }) => {
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsClicked(true);
    // Timing synced with the expansion animation
    setTimeout(() => {
      router.push(item.href);
    }, 600);
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1 }
      }}
      transition={{ delay: index * 0.03, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <Link 
        href={item.href}
        onClick={handleClick}
        className={`group block bg-white/70 backdrop-blur-xl rounded-[1.5rem] p-8 hover:shadow-[0_40px_80px_-20px_rgba(28,28,114,0.12)] transition-all duration-700 border border-white/40 hover:border-[#7B2DBF]/20 overflow-hidden active:scale-[0.98] ${isClicked ? 'opacity-0 scale-105 pointer-events-none' : ''}`}
      >
        <div className="flex flex-col items-center text-center space-y-6">
          {/* ROUNDED GRADIENT ICON Container */}
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1C1C72] to-[#7B2DBF] flex items-center justify-center shadow-[0_12px_24px_-6px_rgba(123,45,191,0.4)] group-hover:shadow-[0_20px_40px_-8px_rgba(123,45,191,0.5)] group-hover:scale-110 group-hover:rotate-[10deg] transition-all duration-700 ease-[0.16, 1, 0.3, 1]">
              <item.icon className="w-8 h-8 text-white" strokeWidth={1.25} />
            </div>
            {/* Pulsing ring */}
            <div className="absolute inset-0 rounded-full border-2 border-[#7B2DBF]/0 group-hover:border-[#7B2DBF]/20 group-hover:scale-125 transition-all duration-1000"></div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-black text-[#1C1C72] uppercase tracking-[0.15em] group-hover:text-[#7B2DBF] transition-colors duration-500">
              {item.name}
            </h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-[180px] mx-auto opacity-70 group-hover:opacity-100 transition-opacity duration-500">
              {item.desc}
            </p>
          </div>
        </div>

        {/* Minimal indicator */}
        <div className="absolute bottom-6 right-6 translate-x-2 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500">
          <div className="w-8 h-8 rounded-full bg-[#1C1C72]/5 flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4 text-[#1C1C72]" />
          </div>
        </div>
      </Link>

      {/* Premium Liquid Expansion Reveal */}
      <AnimatePresence>
        {isClicked && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 50% 50%)', opacity: 0 }}
            animate={{ clipPath: 'circle(150% at 50% 50%)', opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-gradient-to-br from-[#1C1C72] to-[#7B2DBF] flex items-center justify-center pointer-events-none"
          >
             <motion.div
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ delay: 0.2, duration: 0.5 }}
               className="text-white flex flex-col items-center gap-6"
             >
               <div className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center relative overflow-hidden">
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <item.icon className="w-10 h-10 text-white" strokeWidth={1} />
                  </motion.div>
                  <div className="absolute inset-0 bg-white/5 animate-pulse"></div>
               </div>
               <div className="text-center">
                 <h2 className="text-xl font-black uppercase tracking-[0.4em] mb-2">{item.name}</h2>
                 <p className="text-white/40 text-[10px] font-bold tracking-[0.2em]">INITIALIZING AGNAA PRECISION ENGINE</p>
               </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function CalculatorsHub() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-slate-50 text-[#0F172A] font-inter selection:bg-[#7B2DBF] selection:text-white pb-32 relative overflow-hidden">
      
      {/* ARCHITECTURAL DOT GRID BACKGROUND */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#1C1C72 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      
      {/* FLOWING GRADIENT ORBS */}
      <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-[#7B2DBF]/10 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] -left-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-tr from-[#1C1C72]/5 to-transparent blur-[100px] pointer-events-none" />

      {/* TERMINAL SEARCH - TOP RIGHT */}
      <div className="fixed top-8 right-8 z-[60]">
        <TerminalSearch />
      </div>

      {/* MINIMALIST HEADER */}
      <div className="relative z-10 pt-40 pb-20 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#7B2DBF]/30" />
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-[#1C1C72]/50">Agnaa Intelligence</span>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#7B2DBF]/30" />
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-[#1C1C72] tracking-[-0.05em] mb-10 leading-[0.9]">
              Precision <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1C1C72] via-[#7B2DBF] to-[#1C1C72] animate-gradient-x">Engineering</span><br/>Calculators.
            </h1>

            <div className="max-w-2xl mx-auto space-y-12">
              <p className="text-lg text-slate-500 font-medium leading-relaxed opacity-80 italic">
                Validating structural integrity through algorithmic excellence.
              </p>

              <div className="relative group max-w-xl mx-auto">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#1C1C72]/10 to-[#7B2DBF]/10 rounded-2xl blur opacity-25 group-focus-within:opacity-100 transition-all duration-1000"></div>
                <div className="relative flex items-center bg-white rounded-2xl border border-slate-200/60 shadow-[0_20px_40px_-15px_rgba(28,28,114,0.05)] overflow-hidden transition-all duration-500 group-focus-within:shadow-[0_25px_50px_-12px_rgba(123,45,191,0.15)] group-focus-within:border-[#7B2DBF]/30">
                  <div className="pl-6 pointer-events-none">
                    <Search className="w-5 h-5 text-slate-400 group-focus-within:text-[#7B2DBF] transition-colors" />
                  </div>
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search engineering modules..." 
                    className="w-full bg-transparent outline-none text-base font-bold text-[#1C1C72] placeholder:text-slate-300 placeholder:font-medium px-4 py-6"
                  />
                  <div className="pr-6">
                    <kbd className="hidden md:inline-flex items-center px-2 py-1 bg-slate-50 border border-slate-200 rounded-md text-[10px] font-black text-slate-400">⌘ K</kbd>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CALCULATORS GRID */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="space-y-24">
          {CATEGORIES.map((cat, catIdx) => {
            const filteredItems = cat.items.filter(item => 
              item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
              item.desc.toLowerCase().includes(searchQuery.toLowerCase())
            );

            if (filteredItems.length === 0) return null;

            return (
              <div key={cat.title}>
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 mb-10"
                >
                  <h2 className="text-xs font-black tracking-[0.2em] uppercase text-[#1C1C72]/60">{cat.title}</h2>
                  <div className="flex-1 h-[1px] bg-gray-100"></div>
                  <span className="text-[10px] font-bold text-gray-300 tabular-nums">{filteredItems.length} TOOLS</span>
                </motion.div>

                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
                >
                  {filteredItems.map((item, index) => (
                    <CalculatorCard key={item.id} item={item} index={index} />
                  ))}
                </motion.div>
              </div>
            );
          })}
          
          {/* Empty State */}
          {CATEGORIES.every(cat => cat.items.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.desc.toLowerCase().includes(searchQuery.toLowerCase())).length === 0) && (
            <div className="py-24 text-center">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mb-2">No matching systems</div>
              <div className="text-lg font-medium text-gray-400">Try searching for a different module.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
