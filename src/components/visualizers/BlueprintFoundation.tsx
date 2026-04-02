"use client";

import React from 'react';
import { HumanScale } from './HumanScale';

interface BlueprintFoundationProps {
  length: number; // feet
  width: number; // feet
  depth: number; // feet
}

export const BlueprintFoundation: React.FC<BlueprintFoundationProps> = ({ length, width, depth }) => {
  const s = 12; // Scale
  const fL = length * s;
  const fW = width * s;
  const fD = depth * s;

  const ox = 150;
  const oy = 180;

  // Isometric helper
  const iso = (x: number, y: number, z: number) => ({
    x: ox + (x - y) * Math.cos(Math.PI / 6),
    y: oy + (x + y) * Math.sin(Math.PI / 6) - z
  });

  const poly = (pts: {x: number, y: number}[]) => pts.map(p => `${p.x},${p.y}`).join(' ');

  // Nodes for the footing block
  const b000 = iso(0, 0, 0);
  const b100 = iso(fL, 0, 0);
  const b110 = iso(fL, fW, 0);
  const b010 = iso(0, fW, 0);
  
  const b001 = iso(0, 0, fD);
  const b101 = iso(fL, 0, fD);
  const b111 = iso(fL, fW, fD);
  const b011 = iso(0, fW, fD);

  return (
    <div className="w-full aspect-video bg-[#0F172A] rounded-2xl relative overflow-hidden border-2 border-[#1C1C72] shadow-2xl group">
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: 'linear-gradient(#475569 1px, transparent 1px), linear-gradient(90deg, #475569 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      
      <div className="absolute top-4 left-4 z-10">
        <div className="text-[10px] font-black text-[#7B2DBF] tracking-[0.2em] uppercase mb-1">Foundation Isometric</div>
        <div className="text-white font-mono text-xs opacity-50">{length}' x {width}' x {depth}' Isolated Footing</div>
      </div>

      <svg viewBox="0 0 400 250" className="w-full h-full p-8 transition-transform duration-700 group-hover:scale-[1.02]">
        <defs>
          <linearGradient id="foundationGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>
          <pattern id="soilPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 0 10 L 20 10 M 10 0 L 10 20" stroke="#1E293B" strokeWidth="0.5" opacity="0.2" />
          </pattern>
        </defs>

        {/* Soil/Ground Representation */}
        <rect x="0" y="200" width="400" height="50" fill="url(#soilPattern)" />
        <line x1="0" y1="200" x2="400" y2="200" stroke="#1E293B" strokeWidth="1" />

        {/* Bottom Face (Ground) */}
        <polygon points={poly([b000, b100, b110, b010])} fill="#0F172A" stroke="#1C1C72" strokeWidth="1" />

        {/* Rebar Cage (Bottom Mat) - Conceptual */}
        <g stroke="#EF4444" strokeWidth="1" opacity="0.6">
          {[0.2, 0.4, 0.6, 0.8].map(p => (
            <line key={`lx-${p}`} 
              x1={iso(fL * p, 0, fD * 0.2).x} y1={iso(fL * p, 0, fD * 0.2).y} 
              x2={iso(fL * p, fW, fD * 0.2).x} y2={iso(fL * p, fW, fD * 0.2).y} />
          ))}
          {[0.2, 0.4, 0.6, 0.8].map(p => (
            <line key={`ly-${p}`} 
              x1={iso(0, fW * p, fD * 0.2).x} y1={iso(0, fW * p, fD * 0.2).y} 
              x2={iso(fL, fW * p, fD * 0.2).x} y2={iso(fL, fW * p, fD * 0.2).y} />
          ))}
        </g>

        {/* Side faces */}
        <polygon points={poly([b000, b100, b101, b001])} fill="#1E293B" stroke="#3B82F6" strokeWidth="0.5" />
        <polygon points={poly([b100, b110, b111, b101])} fill="#0F172A" stroke="#3B82F6" strokeWidth="0.5" />
        
        {/* Top Face */}
        <polygon points={poly([b001, b101, b111, b011])} fill="#334155" stroke="#3B82F6" strokeWidth="1" />

        {/* Column Starter Bars (Dowels) */}
        <g stroke="#EF4444" strokeWidth="2" strokeLinecap="round">
          <line x1={iso(fL/2 - 5, fW/2 - 5, fD).x} y1={iso(fL/2 - 5, fW/2 - 5, fD).y} x2={iso(fL/2 - 5, fW/2 - 5, fD + 40).x} y2={iso(fL/2 - 5, fW/2 - 5, fD + 40).y} />
          <line x1={iso(fL/2 + 5, fW/2 - 5, fD).x} y1={iso(fL/2 + 5, fW/2 - 5, fD).y} x2={iso(fL/2 + 5, fW/2 - 5, fD + 40).x} y2={iso(fL/2 + 5, fW/2 - 5, fD + 40).y} />
          <line x1={iso(fL/2 - 5, fW/2 + 5, fD).x} y1={iso(fL/2 - 5, fW/2 + 5, fD).y} x2={iso(fL/2 - 5, fW/2 + 5, fD + 40).x} y2={iso(fL/2 - 5, fW/2 + 5, fD + 40).y} />
          <line x1={iso(fL/2 + 5, fW/2 + 5, fD).x} y1={iso(fL/2 + 5, fW/2 + 5, fD).y} x2={iso(fL/2 + 5, fW/2 + 5, fD + 40).x} y2={iso(fL/2 + 5, fW/2 + 5, fD + 40).y} />
        </g>
        <text x={iso(fL/2, fW/2, fD + 50).x} y={iso(fL/2, fW/2, fD + 50).y} fill="#EF4444" fontSize="6" fontWeight="black" textAnchor="middle">COLUMN STARTER BARS</text>

        {/* Dimension Lines */}
        <g opacity="0.6" stroke="#A5B4FC" strokeWidth="1">
           <line x1={b000.x} y1={b000.y + 15} x2={b100.x} y2={b100.y + 15} />
           <line x1={b100.x + 10} y1={b100.y + 5} x2={b110.x + 10} y2={b110.y + 5} />
           <line x1={b110.x + 15} y1={b110.y} x2={b111.x + 15} y2={b111.y} />
        </g>
        
        <g fill="#A5B4FC" fontSize="8" fontWeight="black" textAnchor="middle">
           <text x={(b000.x + b100.x)/2} y={(b000.y + b100.y)/2 + 30}>L: {length}'</text>
           <text x={(b100.x + b110.x)/2 + 45} y={(b100.y + b110.y)/2 + 15} transform={`rotate(30 ${(b100.x + b110.x)/2 + 45} ${(b100.y + b110.y)/2 + 15})`}>W: {width}'</text>
           <text x={b111.x + 40} y={(b110.y + b111.y)/2} transform={`rotate(-90 ${b111.x + 40} ${(b110.y + b111.y)/2})`}>D: {depth}'</text>
        </g>

        {/* Human Scale */}
        <HumanScale x={ox - 100} y={oy + 20} scale={0.6} />
      </svg>

    </div>
  );
};
