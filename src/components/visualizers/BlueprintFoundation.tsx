"use client";

import React from 'react';
import { HumanScale } from './HumanScale';

interface BlueprintFoundationProps {
  length: number;
  width: number;
  depth: number;
}

export const BlueprintFoundation: React.FC<BlueprintFoundationProps> = ({ length, width, depth }) => {
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
        <div className="text-[10px] font-black text-[#7B2DBF] tracking-[0.3em] uppercase mb-1">Foundation Isometric</div>
        <div className="text-[9px] font-bold text-[#1C1C72]/40 uppercase tracking-widest">{length}' × {width}' × {depth}' Isolated Footing</div>
      </div>

      <svg viewBox="0 0 400 250" className="w-full h-full p-8 transition-transform duration-700 group-hover:scale-[1.02]">
        {/* Ground Level */}
        <line x1="0" y1="200" x2="400" y2="200" stroke="#1C1C72" strokeWidth="0.5" opacity="0.1" />

        {/* Bottom Face */}
        <polygon points={poly([b000, b100, b110, b010])} fill="white" stroke="#1C1C72" strokeWidth="0.5" opacity="0.3" />

        {/* Rebar Cage */}
        <g stroke="#7B2DBF" strokeWidth="0.8" opacity="0.35">
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
        <polygon points={poly([b000, b100, b101, b001])} fill="#F8FAFC" stroke="#1C1C72" strokeWidth="0.8" />
        <polygon points={poly([b100, b110, b111, b101])} fill="#F1F5F9" stroke="#1C1C72" strokeWidth="0.8" />
        
        {/* Top Face */}
        <polygon points={poly([b001, b101, b111, b011])} fill="white" stroke="#1C1C72" strokeWidth="1.2" />

        {/* Column Starter Bars */}
        <g stroke="#7B2DBF" strokeWidth="1.5" strokeLinecap="round" opacity="0.5">
          <line x1={iso(fL/2 - 5, fW/2 - 5, fD).x} y1={iso(fL/2 - 5, fW/2 - 5, fD).y} x2={iso(fL/2 - 5, fW/2 - 5, fD + 40).x} y2={iso(fL/2 - 5, fW/2 - 5, fD + 40).y} />
          <line x1={iso(fL/2 + 5, fW/2 - 5, fD).x} y1={iso(fL/2 + 5, fW/2 - 5, fD).y} x2={iso(fL/2 + 5, fW/2 - 5, fD + 40).x} y2={iso(fL/2 + 5, fW/2 - 5, fD + 40).y} />
          <line x1={iso(fL/2 - 5, fW/2 + 5, fD).x} y1={iso(fL/2 - 5, fW/2 + 5, fD).y} x2={iso(fL/2 - 5, fW/2 + 5, fD + 40).x} y2={iso(fL/2 - 5, fW/2 + 5, fD + 40).y} />
          <line x1={iso(fL/2 + 5, fW/2 + 5, fD).x} y1={iso(fL/2 + 5, fW/2 + 5, fD).y} x2={iso(fL/2 + 5, fW/2 + 5, fD + 40).x} y2={iso(fL/2 + 5, fW/2 + 5, fD + 40).y} />
        </g>
        <text x={iso(fL/2, fW/2, fD + 50).x} y={iso(fL/2, fW/2, fD + 50).y} fill="#7B2DBF" fontSize="6" fontWeight="900" textAnchor="middle" opacity="0.6">COLUMN STARTER BARS</text>

        {/* Dimension Lines */}
        <g opacity="0.4" stroke="#1C1C72" strokeWidth="0.5">
           <line x1={b000.x} y1={b000.y + 15} x2={b100.x} y2={b100.y + 15} />
           <line x1={b100.x + 10} y1={b100.y + 5} x2={b110.x + 10} y2={b110.y + 5} />
           <line x1={b110.x + 15} y1={b110.y} x2={b111.x + 15} y2={b111.y} />
        </g>
        
        <g fill="#1C1C72" fontSize="7" fontWeight="900" textAnchor="middle">
           <text x={(b000.x + b100.x)/2} y={(b000.y + b100.y)/2 + 28}>L: {length}'</text>
           <text x={(b100.x + b110.x)/2 + 42} y={(b100.y + b110.y)/2 + 15} transform={`rotate(30 ${(b100.x + b110.x)/2 + 42} ${(b100.y + b110.y)/2 + 15})`}>W: {width}'</text>
           <text x={b111.x + 38} y={(b110.y + b111.y)/2} transform={`rotate(-90 ${b111.x + 38} ${(b110.y + b111.y)/2})`}>D: {depth}'</text>
        </g>

        {/* Human Scale — 3D View */}
        <HumanScale x={ox - 100} y={oy + 20} scale={0.6} variant="3d" />
      </svg>
    </div>
  );
};
