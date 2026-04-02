"use client";

import React from 'react';
import { HumanScale } from './HumanScale';

interface BlueprintSepticProps {
  length: number; // feet
  width: number; // feet
  depth: number; // feet
  chambers?: number;
}

export const BlueprintSeptic: React.FC<BlueprintSepticProps> = ({ length, width, depth, chambers = 3 }) => {
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

  // Nodes for the tank block
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
        <div className="text-[10px] font-black text-[#7B2DBF] tracking-[0.2em] uppercase mb-1">Septic System Isometric</div>
        <div className="text-white font-mono text-xs opacity-50">{chambers} Chamber Reinforced Tank</div>
      </div>

      <svg viewBox="0 0 400 250" className="w-full h-full p-8 transition-transform duration-700 group-hover:scale-[1.02]">
        <defs>
          <pattern id="concretePattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="#1E293B" />
            <circle cx="5" cy="5" r="1.5" fill="#475569" />
          </pattern>
        </defs>

        {/* Tank Body (Semi-Transparent top to see chambers) */}
        <polygon points={poly([b000, b100, b110, b010])} fill="#0F172A" stroke="#1C1C72" strokeWidth="1" />
        <polygon points={poly([b000, b100, b101, b001])} fill="#1E293B" stroke="#3B82F6" strokeWidth="0.5" />
        <polygon points={poly([b100, b110, b111, b101])} fill="#0F172A" stroke="#3B82F6" strokeWidth="0.5" />
        
        {/* Baffle Walls (Chambers) */}
        {[...Array(chambers - 1)].map((_, i) => {
          const x = (fL / chambers) * (i + 1);
          const p1 = iso(x, 0, 0);
          const p2 = iso(x, fW, 0);
          const p3 = iso(x, fW, fD);
          const p4 = iso(x, 0, fD);
          return (
            <polygon key={i} points={poly([p1, p2, p3, p4])} fill="#3B82F6" opacity="0.1" stroke="#3B82F6" strokeWidth="0.5" strokeDasharray="2,2" />
          );
        })}

        {/* Top Slab (Outline only to show interior) */}
        <polygon points={poly([b001, b101, b111, b011])} fill="none" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4,2" />

        {/* Pipes */}
        {/* Inlet */}
        <line x1={iso(-20, fW/2, fD - 10).x} y1={iso(-20, fW/2, fD - 10).y} x2={iso(10, fW/2, fD - 10).x} y2={iso(10, fW/2, fD - 10).y} stroke="#EF4444" strokeWidth="4" />
        <text x={iso(-30, fW/2, fD).x} y={iso(-30, fW/2, fD).y} fill="#EF4444" fontSize="6" fontWeight="black">INLET</text>

        {/* Outlet */}
        <line x1={iso(fL - 10, fW/2, fD - 20).x} y1={iso(fL - 10, fW/2, fD - 20).y} x2={iso(fL + 20, fW/2, fD - 20).x} y2={iso(fL + 20, fW/2, fD - 20).y} stroke="#3B82F6" strokeWidth="4" />
        <text x={iso(fL + 30, fW/2, fD).x} y={iso(fL + 30, fW/2, fD).y} fill="#3B82F6" fontSize="6" fontWeight="black">OUTLET</text>

        {/* Dimensions */}
        <g stroke="#A5B4FC" strokeWidth="1" opacity="0.6">
           <line x1={b001.x} y1={b001.y - 15} x2={b101.x} y2={b101.y - 15} />
           <line x1={b101.x + 15} y1={b101.y} x2={b111.x + 15} y2={b111.y} />
        </g>
        <g fill="#A5B4FC" fontSize="8" fontWeight="black" textAnchor="middle">
           <text x={(b001.x + b101.x)/2} y={(b001.y + b101.y)/2 - 25}>LENGTH: {length}'</text>
           <text x={(b101.x + b111.x)/2 + 45} y={(b101.y + b111.y)/2} transform={`rotate(30 ${(b101.x + b111.x)/2 + 45} ${(b101.y + b111.y)/2})`}>WIDTH: {width}'</text>
        </g>

        {/* Human Scale */}
        <HumanScale x={ox - 100} y={oy + 20} scale={0.6} />
      </svg>
    </div>
  );
};
