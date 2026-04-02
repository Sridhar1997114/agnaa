"use client";

import React, { useState } from 'react';
import Link from 'next/link';

import { TerminalSearch } from '@/components/layout/TerminalSearch';

// Categorized structure mapping to the 29 existing tools
const CATEGORIES = [
  {
    title: 'Architecture & Spatial Planning',
    items: [
      { id: 'plot-area', name: 'Plot Area Module', desc: 'Compute bounds in SqFt, SqYards, Acres & Guntas.', href: '/calc/plot-area' },
      { id: 'setback-envelope', name: 'Setback Envelope', desc: 'Extrapolate buildable rectangle after offset subtractions.', href: '/calc/setback-envelope' },
      { id: 'g-n-floor-estimator', name: 'G+N Floor Estimator', desc: 'Distribute permissible built-up area across per-floor levels.', href: '/calc/gn-floor-estimator' },
      { id: 'fsi', name: 'FAR / FSI Computed', desc: 'Compute Floor Area Ratio and maximum allowable density.', href: '/calc/fsi' },
      { id: 'built-up-efficiency', name: 'Volumetric Efficiency', desc: 'Calculate percent efficiency of carpet vs. built-up area.', href: '/calc/built-up-efficiency' },
      { id: 'built-up', name: 'Legacy Area Translate', desc: 'Estimate simple carpet to super built-up scaling.', href: '/calc/built-up' },
      { id: 'staircase', name: 'Stairway Ergonomics', desc: 'Architectural planning for algorithmic tread/riser ratios.', href: '/calc/staircase' },
    ]
  },
  {
    title: 'Core Structural & Earthwork',
    items: [
      { id: 'excavation-earthwork', name: 'Trench / Excavation', desc: 'Earthwork volume factoring spatial soil bulking expansion.', href: '/calc/excavation-earthwork' },
      { id: 'anti-termite', name: 'Anti-Termite Treatment', desc: 'Chemical emulsion calculation for sub-grade foundation zones.', href: '/calc/anti-termite' },
      { id: 'pcc-concrete', name: 'PCC Bed Configuration', desc: 'Volumetric concrete and aggregate breakdown for base.', href: '/calc/pcc-concrete' },
      { id: 'foundation-footing', name: 'Footing Matrix Array', desc: 'Concrete mass requirements for isolated/combined footings.', href: '/calc/foundation-footing' },
      { id: 'concrete-shapes', name: 'Advanced Volume Engine', desc: 'Geometric volume formulas for cylinders, cones, and trenches.', href: '/calc/concrete-shapes' },
      { id: 'steel-rebar', name: 'Reinforcement Steel', desc: 'Compute metric tonnage for column, slab, and beam grids.', href: '/calc/steel-rebar' },
      { id: 'rcc', name: 'RCC Slab Casting', desc: 'Volume splits for cement, sand, and coarse aggregates.', href: '/calc/rcc' },
    ]
  },
  {
    title: 'Masonry & Enabling Works',
    items: [
      { id: 'brick', name: 'Brickwork Massing', desc: 'Unit block counts and mortar batching for partition walls.', href: '/calc/brick' },
      { id: 'aac-blocks', name: 'AAC Block Array', desc: 'Lightweight aerated core elements and thin-bed joining mortar.', href: '/calc/aac-blocks' },
      { id: 'compound-wall', name: 'Boundary Extension', desc: 'Estimate foundations and masonry for perimeter protection.', href: '/calc/compound-wall' },
      { id: 'plaster', name: 'Wall Plaster Gauge', desc: 'Render material counts for uniform internal/external surfacing.', href: '/calc/plaster' },
      { id: 'roofing', name: 'Cladding & Roofing', desc: 'Sheet counts factoring slope overlap and overhang metrics.', href: '/calc/roofing' },
      { id: 'shuttering', name: 'Shuttering Formwork', desc: 'Calculate contact plywood area required for concrete containment.', href: '/calc/shuttering' },
      { id: 'scaffolding', name: 'Scaffolding Matrix', desc: 'Required tubular scaffolding area and grid setup volumes.', href: '/calc/scaffolding' },
    ]
  },
  {
    title: 'Finishes & Interiors',
    items: [
      { id: 'paint', name: 'Paint Surface Yield', desc: 'Estimate gallons correcting for negative wall openings.', href: '/calc/paint' },
      { id: 'advanced-flooring', name: 'Advanced Tile Topology', desc: 'Stone/tile layouts factoring complex edge cutoff wastage.', href: '/calc/advanced-flooring' },
      { id: 'tiles', name: 'Simple Floor Grid', desc: 'Orthogonal raw grid array for standard square coverage.', href: '/calc/tiles' },
      { id: 'interior-cost', name: 'Interiors Fit-Out Matrix', desc: 'Logistical budget scaling for premium spatial finishes.', href: '/calc/interior-cost' },
    ]
  },
  {
    title: 'Utilities & Macro Financials',
    items: [
      { id: 'electrical', name: 'Electrical Hub Loading', desc: 'Wattage threshold and primary lighting/power node arrays.', href: '/calc/electrical' },
      { id: 'septic-tank', name: 'Septic Sludge Digester', desc: 'Sanitary volumetric scaling for residential liquid waste.', href: '/calc/septic-tank' },
      { id: 'tank', name: 'Liquid Sump Array', desc: 'Total maximum storage load capacity for underground reservoirs.', href: '/calc/tank' },
      { id: 'cost', name: 'Holistic Macro Costing', desc: 'Phase-wise financial distribution of base-build lifecycle.', href: '/estimate' },
    ]
  }
];

export default function CalculatorsHub() {
  const [searchQuery, setSearchQuery] = useState('');

  // SVG Abstract Blueprint Hover Component
  const HoverBlueprint = () => (
    <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] pointer-events-none transition-opacity duration-300 overflow-hidden draw-svg">
      <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
        <path d="M-10,50 L100,50 L150,150 L300,100 L450,150 M50,-10 L50,210 M250,-10 L250,210 M-10,25 L450,25 M-10,175 L450,175" fill="none" stroke="#1C1C72" strokeWidth="1.5" />
        <circle cx="150" cy="150" r="10" fill="none" stroke="#1C1C72" strokeWidth="1.5" />
        <circle cx="300" cy="100" r="15" fill="none" stroke="#1C1C72" strokeWidth="1.5" />
        <rect x="80" y="30" width="40" height="40" fill="none" stroke="#1C1C72" strokeWidth="1.5" transform="rotate(25 100 50)" />
      </svg>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FFF] text-[#0F172A] font-inter selection:bg-[#7B2DBF] selection:text-white pb-32">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes drawBlueprint {
          0% { stroke-dashoffset: 350; }
          100% { stroke-dashoffset: 0; }
        }
        .draw-svg path, .draw-svg circle, .draw-svg rect {
          animation: drawBlueprint 20s linear infinite;
          stroke-dasharray: 4 8;
        }
      `}} />

      {/* TERMINAL HEADER */}
      <div className="border-b border-[#E2E8F0] pt-24 pb-16 px-6 lg:px-12 bg-[#F8FAFC] relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <svg width="400" height="400" viewBox="0 0 24 24" fill="none" stroke="#1C1C72" strokeWidth="0.5"><path d="M3 3h18v18H3zM3 9h18M3 15h18M9 3v18M15 3v18"/></svg>
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-2 h-2 bg-[#7B2DBF] animate-pulse"></div>
                <div className="text-[10px] font-black tracking-[0.4em] uppercase text-gray-500">Agnaa Precision Engine // Live System</div>
              </div>
              <h1 className="text-4xl md:text-7xl font-black text-[#1C1C72] tracking-tighter leading-none mb-4">
                CALCULATION<br/>MATRIX<span className="text-[#7B2DBF]">.</span>
              </h1>
              <p className="max-w-xl text-gray-500 text-sm md:text-base leading-relaxed font-medium">
                High-performance engineering tools for architectural validation, material estimation, and structural sanity checks.
              </p>
            </div>
            
            <div className="flex flex-col items-end gap-4">
               <TerminalSearch />
               <div className="text-[9px] font-black uppercase tracking-widest text-gray-400">Press ⌘K to jump anywhere</div>
            </div>
          </div>
          
          <div className="relative group max-w-4xl">
            <span className="absolute left-0 top-[12px] md:top-[16px] text-[#1C1C72] text-3xl md:text-5xl font-light opacity-50">&gt;</span>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter specific operational modules..." 
              className="w-full bg-transparent border-none outline-none text-2xl md:text-5xl font-black text-[#1C1C72] placeholder:text-gray-200 pl-10 md:pl-16 py-2"
            />
            <div className={`absolute bottom-0 left-0 h-[2px] bg-[#1C1C72] transition-all duration-700 ease-out ${searchQuery ? 'w-full' : 'w-0 group-hover:w-full'}`}></div>
          </div>
        </div>
      </div>

      {/* DRAFTING MAT GRID */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mt-16">
        <div className="border-t border-l border-[#E2E8F0]">
          {CATEGORIES.map((cat, catIdx) => {
            const filteredItems = cat.items.filter(item => 
              item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
              item.desc.toLowerCase().includes(searchQuery.toLowerCase())
            );

            if (filteredItems.length === 0) return null;

            return (
              <div key={cat.title} className="mb-0">
                {/* DRAFTING TITLE BLOCK */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr,auto] border-b border-r border-[#E2E8F0] bg-[#F8FAFC]">
                  <div className="p-6 md:p-8 flex items-end">
                    <h2 className="text-xs font-black tracking-[0.2em] uppercase text-[#1C1C72]">{cat.title}</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 md:flex border-t md:border-t-0 md:border-l border-[#E2E8F0]">
                    <div className="p-4 md:p-8 border-b sm:border-b-0 sm:border-r border-[#E2E8F0]">
                      <div className="text-[8px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-1">Status</div>
                      <div className="text-[10px] font-black text-[#22C55E]">CALIBRATED</div>
                    </div>
                    <div className="p-4 md:p-8 border-b sm:border-b-0 sm:border-r border-[#E2E8F0]">
                      <div className="text-[8px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-1">Format</div>
                      <div className="text-[10px] font-black text-[#1C1C72]">A4 EXPORT</div>
                    </div>
                    <div className="p-4 md:p-8">
                      <div className="text-[8px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-1">Author</div>
                      <div className="text-[10px] font-black text-[#1C1C72]">AGNAA ENG.</div>
                    </div>
                  </div>
                </div>

                {/* ITEMS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredItems.map((item, index) => (
                    <Link 
                      key={item.id} 
                      href={item.href}
                      className="group block relative border-b border-r border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] transition-colors duration-500 p-6 md:p-8 min-h-[240px] flex flex-col justify-between overflow-hidden"
                    >
                      <HoverBlueprint />
                      
                      <div className="relative z-10 w-full">
                        <div className="flex justify-between items-start mb-10 w-full border-b border-gray-100 pb-4">
                          <span className="text-[11px] font-black text-gray-400 font-mono tracking-widest leading-none">
                            {String(catIdx + 1).padStart(2,'0')}.{String(index + 1).padStart(2,'0')}
                          </span>
                          <span className="text-gray-300 group-hover:text-[#1C1C72] transition-colors duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
                          </span>
                        </div>
                        
                        <h3 className="text-lg md:text-xl font-extrabold text-[#1C1C72] mb-3 leading-[1.15] tracking-tight group-hover:underline decoration-2 underline-offset-4 decoration-[#7B2DBF]/30">
                          {item.name}
                        </h3>
                      </div>
                      
                      <div className="relative z-10 mt-auto">
                        <p className="text-xs text-gray-500 leading-relaxed font-medium">
                          {item.desc}
                        </p>
                      </div>
                      
                      {/* Technical Crosshairs */}
                      <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-gray-300 group-hover:border-[#1C1C72] transition-colors"></div>
                      <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-gray-300 group-hover:border-[#1C1C72] transition-colors"></div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
          
          {/* 404 Empty State */}
          {CATEGORIES.every(cat => cat.items.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.desc.toLowerCase().includes(searchQuery.toLowerCase())).length === 0) && (
            <div className="border-b border-r border-[#E2E8F0] p-24 text-center bg-gray-50">
              <div className="text-xs font-black tracking-widest uppercase text-gray-400 mb-4 animate-pulse">ERR 404 //</div>
              <div className="text-2xl font-medium text-[#1C1C72]">No exact matching modules found in system registry.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
