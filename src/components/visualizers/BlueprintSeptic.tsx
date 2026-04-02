"use client";

import React from 'react';
import { HumanScale } from './HumanScale';

interface BlueprintSepticProps {
  length: number;
  width: number;
  depth: number;
  chambers?: number;
}

export const BlueprintSeptic: React.FC<BlueprintSepticProps> = ({ length, width, depth, chambers = 3 }) => {
  const s = 12;
  const fL = length * s;
  const fW = width * s;
  const fD = depth * s;

  const ox = 150;
  const oy = 180;

  const iso = (x: number, y: number, z: number) => ({
    x: ox + (x - y) * Math.cos(Math.PI / 6),
    y: oy + (x + y) * Math.sin(Math.PI / 6) - z
  });

  const poly = (pts: {x: number, y: number}[]) => pts.map(p => `${p.x},${p.y}`).join(' ');

  const b000 = iso(0, 0, 0);
  const b100 = iso(fL, 0, 0);
  const b110 = iso(fL, fW, 0);
  const b010 = iso(0, fW, 0);
  
  const b001 = iso(0, 0, fD);
  const b101 = iso(fL, 0, fD);
  const b111 = iso(fL, fW, fD);
  const b011 = iso(0, fW, fD);

  return (
    <div className="w-full aspect-video bg-[#FDFDFF] rounded-2xl relative overflow-hidden border border-gray-200 shadow-lg group font-sans">
      {/* Thin branding blue grid */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#1C1C72 1px, transparent 1px), linear-gradient(90deg, #1C1C72 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      
      {/* Title */}
      <div className="absolute top-6 left-6 z-10">
        <div className="text-[10px] font-black text-[#7B2DBF] tracking-[0.3em] uppercase mb-1">Septic System Isometric</div>
        <div className="text-[9px] font-bold text-[#1C1C72]/40 uppercase tracking-widest">{chambers} Chamber Reinforced Tank</div>
      </div>

      <svg viewBox="0 0 400 250" className="w-full h-full p-8 transition-transform duration-700 group-hover:scale-[1.02]">
        {/* Bottom Face */}
        <polygon points={poly([b000, b100, b110, b010])} fill="white" stroke="#1C1C72" strokeWidth="0.5" opacity="0.3" />

        {/* Side faces */}
        <polygon points={poly([b000, b100, b101, b001])} fill="#F8FAFC" stroke="#1C1C72" strokeWidth="0.8" />
        <polygon points={poly([b100, b110, b111, b101])} fill="#F1F5F9" stroke="#1C1C72" strokeWidth="0.8" />
        
        {/* Baffle Walls */}
        {[...Array(chambers - 1)].map((_, i) => {
          const x = (fL / chambers) * (i + 1);
          const p1 = iso(x, 0, 0);
          const p2 = iso(x, fW, 0);
          const p3 = iso(x, fW, fD);
          const p4 = iso(x, 0, fD);
          return (
            <polygon key={i} points={poly([p1, p2, p3, p4])} fill="#1C1C72" opacity="0.04" stroke="#1C1C72" strokeWidth="0.5" strokeDasharray="2,2" />
          );
        })}

        {/* Top Slab — dashed outline */}
        <polygon points={poly([b001, b101, b111, b011])} fill="white" stroke="#1C1C72" strokeWidth="1.2" strokeDasharray="4,2" />

        {/* Pipes */}
        <line x1={iso(-20, fW/2, fD - 10).x} y1={iso(-20, fW/2, fD - 10).y} x2={iso(10, fW/2, fD - 10).x} y2={iso(10, fW/2, fD - 10).y} stroke="#7B2DBF" strokeWidth="3" opacity="0.5" />
        <text x={iso(-30, fW/2, fD).x} y={iso(-30, fW/2, fD).y} fill="#7B2DBF" fontSize="6" fontWeight="900" opacity="0.6">INLET</text>

        <line x1={iso(fL - 10, fW/2, fD - 20).x} y1={iso(fL - 10, fW/2, fD - 20).y} x2={iso(fL + 20, fW/2, fD - 20).x} y2={iso(fL + 20, fW/2, fD - 20).y} stroke="#1C1C72" strokeWidth="3" opacity="0.3" />
        <text x={iso(fL + 30, fW/2, fD).x} y={iso(fL + 30, fW/2, fD).y} fill="#1C1C72" fontSize="6" fontWeight="900" opacity="0.4">OUTLET</text>

        {/* Dimensions */}
        <g opacity="0.4" stroke="#1C1C72" strokeWidth="0.5">
           <line x1={b001.x} y1={b001.y - 15} x2={b101.x} y2={b101.y - 15} />
           <line x1={b101.x + 15} y1={b101.y} x2={b111.x + 15} y2={b111.y} />
        </g>
        <g fill="#1C1C72" fontSize="7" fontWeight="900" textAnchor="middle">
           <text x={(b001.x + b101.x)/2} y={(b001.y + b101.y)/2 - 23}>L: {length}'</text>
           <text x={(b101.x + b111.x)/2 + 42} y={(b101.y + b111.y)/2} transform={`rotate(30 ${(b101.x + b111.x)/2 + 42} ${(b101.y + b111.y)/2})`}>W: {width}'</text>
        </g>

        {/* Human Scale — 3D View */}
        <HumanScale x={ox - 100} y={oy + 20} scale={0.6} variant="3d" />
      </svg>
    </div>
  );
};
