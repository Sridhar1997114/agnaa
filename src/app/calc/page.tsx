"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Calculator, Square, Info, Maximize, Building2, Ruler, Box, 
  Map, Home, Waves, PaintBucket, Grid
} from 'lucide-react';

const CALCULATORS = [
  { id: 'plot-area', name: 'Plot Area Calculator', desc: 'Calculate the area of your plot in SqFt, SqYards, Acres, and Guntas.', icon: <Square className="w-6 h-6" />, href: '/calc/plot-area' },
  { id: 'fsi', name: 'FAR / FSI Calculator', desc: 'Compute Floor Area Ratio and maximum allowable built-up area.', icon: <Building2 className="w-6 h-6" />, href: '/calc/fsi' },
  { id: 'built-up', name: 'Carpet to Built-up Area', desc: 'Estimate carpet, built-up, and super built-up areas.', icon: <Maximize className="w-6 h-6" />, href: '/calc/built-up' },
  { id: 'rcc', name: 'RCC Slab Calculator', desc: 'Calculate cement, sand, aggregate, and steel required for RCC slab.', icon: <Box className="w-6 h-6" />, href: '/calc/rcc' },
  { id: 'brick', name: 'Brickwork Calculator', desc: 'Calculate number of bricks, cement, and sand needed for walls.', icon: <Grid className="w-6 h-6" />, href: '/calc/brick' },
  { id: 'plaster', name: 'Plaster Calculator', desc: 'Calculate materials required for wall plastering.', icon: <Home className="w-6 h-6" />, href: '/calc/plaster' },
  { id: 'paint', name: 'Paint Calculator', desc: 'Estimate paint quantity required for interior and exterior walls.', icon: <PaintBucket className="w-6 h-6" />, href: '/calc/paint' },
  { id: 'tiles', name: 'Tiles Calculator', desc: 'Estimate the number of tiles required for a given floor or wall area.', icon: <Grid className="w-6 h-6" />, href: '/calc/tiles' },
  { id: 'tank', name: 'Water Tank Calculator', desc: 'Calculate the volume and total water capacity in liters for rectangular water tanks.', icon: <Waves className="w-6 h-6" />, href: '/calc/tank' },
  { id: 'cost', name: 'Construction Cost Estimator', desc: 'Detailed cost breakdown for building construction.', icon: <Calculator className="w-6 h-6" />, href: '/estimate' },
];

export default function CalculatorsHub() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* HEADER */}
      <div className="bg-white border-b border-gray-100 py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-[#1C1C72] mb-4 tracking-tight">
          Agnaa <span className="text-[#7B2DBF]">Calculators</span>
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
          A suite of precision tools for civil engineering, architecture, and construction estimations. Get accurate results and download official PDF reports instantly.
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CALCULATORS.map(calc => (
            <Link key={calc.id} href={calc.href} className="group block h-full">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 h-full shadow-sm hover:shadow-xl hover:border-[#7B2DBF]/30 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#7B2DBF]/5 rounded-full blur-3xl group-hover:bg-[#7B2DBF]/20 transition-colors"></div>
                <div className="w-12 h-12 bg-[#F8FAFC] rounded-xl border border-gray-100 flex items-center justify-center text-[#1C1C72] mb-6 group-hover:scale-110 group-hover:bg-[#1C1C72] group-hover:text-white transition-all">
                  {calc.icon}
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-2">{calc.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  {calc.desc}
                </p>
                <div className="text-[10px] font-black uppercase tracking-widest text-[#7B2DBF] flex items-center gap-1 mt-auto">
                  Open Calculator &rarr;
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
