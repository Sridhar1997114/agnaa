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
  Zap, RefreshCcw, Database, Calculator, Search, ChevronRight
} from 'lucide-react';

const CATEGORIES = [
  {
    title: 'Architecture & Spatial Planning',
    color: 'from-[#7B2DBF]/10 to-[#1C1C72]/10',
    iconColor: 'text-[#1C1C72]',
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
    color: 'from-[#7B2DBF]/10 to-[#1C1C72]/10',
    iconColor: 'text-[#1C1C72]',
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
    color: 'from-[#7B2DBF]/10 to-[#1C1C72]/10',
    iconColor: 'text-[#1C1C72]',
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
    color: 'from-[#7B2DBF]/10 to-[#1C1C72]/10',
    iconColor: 'text-[#1C1C72]',
    items: [
      { id: 'paint', name: 'Paint Surface Yield', desc: 'Estimate gallons correcting for negative wall openings.', href: '/calc/paint', icon: Paintbrush },
      { id: 'advanced-flooring', name: 'Advanced Tile Topology', desc: 'Stone/tile layouts factoring complex edge cutoff wastage.', href: '/calc/advanced-flooring', icon: Compass },
      { id: 'tiles', name: 'Simple Floor Grid', desc: 'Orthogonal raw grid array for standard square coverage.', href: '/calc/tiles', icon: PenTool },
      { id: 'interior-cost', name: 'Interiors Fit-Out Matrix', desc: 'Logistical budget scaling for premium spatial finishes.', href: '/calc/interior-cost', icon: Home },
    ]
  },
  {
    title: 'Utilities & Macro Financials',
    color: 'from-[#7B2DBF]/10 to-[#1C1C72]/10',
    iconColor: 'text-[#1C1C72]',
    items: [
      { id: 'electrical', name: 'Electrical Hub Loading', desc: 'Wattage threshold and primary lighting/power node arrays.', href: '/calc/electrical', icon: Zap },
      { id: 'septic-tank', name: 'Septic Sludge Digester', desc: 'Sanitary volumetric scaling for residential liquid waste.', href: '/calc/septic-tank', icon: RefreshCcw },
      { id: 'tank', name: 'Liquid Sump Array', desc: 'Total maximum storage load capacity for underground reservoirs.', href: '/calc/tank', icon: Database },
      { id: 'cost', name: 'Holistic Macro Costing', desc: 'Phase-wise financial distribution of base-build lifecycle.', href: '/estimate', icon: Calculator },
    ]
  }
];

export default function CalculatorsHub() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#0F172A] font-inter selection:bg-[#7B2DBF] selection:text-white pb-32">
      
      {/* ELEGANT HEADER */}
      <div className="relative overflow-hidden bg-white border-b border-gray-100/60 pt-28 pb-20 px-6 lg:px-12">
        {/* Soft Ambient Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full overflow-hidden pointer-events-none opacity-40">
          <div className="absolute -top-[40%] -left-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-r from-purple-400/20 to-indigo-400/20 blur-[100px]" />
          <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-r from-pink-400/20 to-rose-400/20 blur-[100px]" />
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16">
            <div className="max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#1C1C72]/5 border border-[#1C1C72]/10 text-[#1C1C72] text-xs font-semibold tracking-wide mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-[#7B2DBF] animate-pulse" />
                AGNAA PRECISION ENGINE
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6"
              >
                Calculation Hub
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-gray-500 leading-relaxed font-light"
              >
                A suite of elegant, high-performance tools engineered for architectural validation, precise material estimation, and structural sanity checks.
              </motion.p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex-shrink-0"
            >
               <TerminalSearch />
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="group relative max-w-2xl"
          >
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <Search className="w-6 h-6 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search estimators and modules..." 
              className="w-full bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl outline-none text-xl md:text-2xl font-medium text-gray-800 placeholder:text-gray-400 pl-16 pr-8 py-5 shadow-sm transform transition-all duration-300 focus:shadow-xl focus:border-[#7B2DBF]/30 focus:ring-4 focus:ring-[#7B2DBF]/10"
            />
          </motion.div>
        </div>
      </div>

      {/* CALCULATORS GRID */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mt-20">
        <div className="space-y-24">
          {CATEGORIES.map((cat, catIdx) => {
            const filteredItems = cat.items.filter(item => 
              item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
              item.desc.toLowerCase().includes(searchQuery.toLowerCase())
            );

            if (filteredItems.length === 0) return null;

            return (
              <motion.div 
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-10">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${cat.color} backdrop-blur-sm shadow-sm border border-white/50`}>
                     {/* Category Icon */}
                     {catIdx === 0 && <Compass className={`w-6 h-6 ${cat.iconColor}`} />}
                     {catIdx === 1 && <Layers className={`w-6 h-6 ${cat.iconColor}`} />}
                     {catIdx === 2 && <Grid className={`w-6 h-6 ${cat.iconColor}`} />}
                     {catIdx === 3 && <Paintbrush className={`w-6 h-6 ${cat.iconColor}`} />}
                     {catIdx === 4 && <Zap className={`w-6 h-6 ${cat.iconColor}`} />}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">{cat.title}</h2>
                    <p className="text-sm font-medium text-gray-400 mt-1">{filteredItems.length} modules available</p>
                  </div>
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredItems.map((item, index) => (
                    <Link 
                      key={item.id} 
                      href={item.href}
                      className="group relative bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:border-[#1C1C72]/20 transition-all duration-500 overflow-hidden flex flex-col h-[280px]"
                    >
                      {/* Background Gradient Hover Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#7B2DBF]/0 to-[#7B2DBF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Content */}
                      <div className="relative z-10 flex-1 flex flex-col">
                        <div className="flex items-start justify-between mb-8">
                          <div className={`w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:scale-110 group-hover:bg-[#1C1C72]/5 group-hover:border-[#1C1C72]/20 group-hover:shadow-lg group-hover:shadow-[#1C1C72]/10 transition-all duration-500 ease-out`}>
                            <item.icon className={`w-7 h-7 text-gray-400 group-hover:${cat.iconColor} transition-colors duration-500`} strokeWidth={1.5} />
                          </div>
                          
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shadow-sm border border-gray-100">
                             <ChevronRight className="w-4 h-4 text-[#7B2DBF]" />
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-[#1C1C72] transition-colors">
                          {item.name}
                        </h3>
                        
                        <p className="text-sm text-gray-500 leading-relaxed font-normal mt-auto">
                          {item.desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            );
          })}
          
          {/* 404 Empty State */}
          {CATEGORIES.every(cat => cat.items.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.desc.toLowerCase().includes(searchQuery.toLowerCase())).length === 0) && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="py-32 text-center flex flex-col items-center justify-center"
            >
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                 <Search className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No modules found</h3>
              <p className="text-gray-500 max-w-md">We couldn't find anything matching "{searchQuery}". Try adjusting your search terms or browsing the categories.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
