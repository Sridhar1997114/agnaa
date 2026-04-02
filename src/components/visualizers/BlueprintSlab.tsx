"use client";

import React from 'react';
import { HumanScale } from './HumanScale';

interface BlueprintSlabProps {
  length: number; // feet
  width: number; // feet
  thickness: number; // inches
  preset?: 'economy' | 'safe' | 'strong';
  label?: string;
}

export const BlueprintSlab: React.FC<BlueprintSlabProps> = ({ length, width, thickness, preset = 'safe', label = "RCC Structural Section" }) => {
  const s = 15;
  const slabL = Math.min(length, 20) * s;
  const slabH = (thickness / 12) * s * 2;

  const ox = 60;
  const oy = 180;

  const spacing = preset === 'economy' ? 20 : preset === 'strong' ? 10 : 15;
  const rebars = [];
  for (let x = 10; x < slabL; x += spacing) {
    rebars.push(x);
  }

  return (
    <div className="w-full aspect-video bg-[#FDFDFF] rounded-2xl relative overflow-hidden border border-gray-200 shadow-lg group font-sans">
      {/* Thin branding blue grid */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#1C1C72 1px, transparent 1px), linear-gradient(90deg, #1C1C72 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      
      {/* Title */}
      <div className="absolute top-6 left-6 z-10">
        <div className="text-[10px] font-black text-[#7B2DBF] tracking-[0.3em] uppercase mb-1">{label}</div>
        <div className="flex items-center gap-2">
          <div className="text-[9px] font-bold text-[#1C1C72]/40 uppercase tracking-widest">
            {thickness}" THK · {preset.toUpperCase()} PRESET
          </div>
        </div>
      </div>

      <svg viewBox="0 0 400 250" className="w-full h-full p-8 transition-transform duration-700 group-hover:scale-[1.02]">
        {/* Ground Line */}
        <line x1={0} y1={oy} x2={400} y2={oy} stroke="#1C1C72" strokeWidth="0.5" strokeDasharray="4,3" opacity="0.15" />

        {/* Concrete Slab Shadow */}
        <rect x={ox + 3} y={oy - slabH + 3} width={slabL} height={slabH} fill="#1C1C72" opacity="0.04" rx="1" />

        {/* Concrete Slab Body */}
        <rect x={ox} y={oy - slabH} width={slabL} height={slabH} fill="white" stroke="#1C1C72" strokeWidth="1.5" rx="1" />
        
        {/* Concrete hatch pattern */}
        <rect x={ox} y={oy - slabH} width={slabL} height={slabH} fill="#1C1C72" opacity="0.02" />

        {/* Clear Cover */}
        <g opacity="0.3">
          <line x1={ox + 10} y1={oy} x2={ox + 10} y2={oy - 10} stroke="#7B2DBF" strokeWidth="0.5" />
          <text x={ox + 15} y={oy - 3} fill="#7B2DBF" fontSize="5" fontWeight="bold">25mm CLR COVER</text>
        </g>

        {/* Rebar Stools */}
        {rebars.filter((_, i) => i % 3 === 0).map((rx, i) => (
          <path key={`stool-${i}`} d={`M ${ox + rx - 5} ${oy} L ${ox + rx} ${oy - (slabH * 0.70)} L ${ox + rx + 5} ${oy}`} fill="none" stroke="#1C1C72" strokeWidth="0.3" opacity="0.2" />
        ))}

        {/* Rebars */}
        {rebars.map((rx, i) => (
          <circle key={i} cx={ox + rx} cy={oy - (slabH * 0.25)} r="2.5" fill="none" stroke="#7B2DBF" strokeWidth="1" opacity="0.5" />
        ))}
        {rebars.map((rx, i) => (
          <circle key={`bot-${i}`} cx={ox + rx} cy={oy - (slabH * 0.75)} r="2.5" fill="none" stroke="#7B2DBF" strokeWidth="1" opacity="0.5" />
        ))}

        {/* Main Reinforcement Lines */}
        <line x1={ox + 5} y1={oy - (slabH * 0.25)} x2={ox + slabL - 5} y2={oy - (slabH * 0.25)} stroke="#7B2DBF" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <line x1={ox + 5} y1={oy - (slabH * 0.75)} x2={ox + slabL - 5} y2={oy - (slabH * 0.75)} stroke="#7B2DBF" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />

        {/* Reinforcement Label */}
        <g transform={`translate(${ox + slabL + 20}, ${oy - slabH/2})`}>
          <text fill="#7B2DBF" fontSize="6" fontWeight="900" className="uppercase tracking-widest">Main Reinforcement</text>
          <text y="9" fill="#1C1C72" fontSize="5" fontWeight="bold" opacity="0.35">TMT FE500 GRADE</text>
        </g>

        {/* Human Scale — Section View */}
        <HumanScale x={ox - 40} y={oy} scale={0.7} variant="section" />

        {/* Dimension Lines */}
        <g opacity="0.5">
          <line x1={ox} y1={oy + 25} x2={ox + slabL} y2={oy + 25} stroke="#1C1C72" strokeWidth="0.5" />
          <line x1={ox} y1={oy + 20} x2={ox} y2={oy + 30} stroke="#1C1C72" strokeWidth="0.5" />
          <line x1={ox + slabL} y1={oy + 20} x2={ox + slabL} y2={oy + 30} stroke="#1C1C72" strokeWidth="0.5" />
          <text x={ox + slabL/2} y={oy + 40} fill="#1C1C72" fontSize="8" fontWeight="900" textAnchor="middle" className="tracking-tighter">SPAN: {length} FT</text>

          <line x1={ox + slabL + 10} y1={oy} x2={ox + slabL + 10} y2={oy - slabH} stroke="#1C1C72" strokeWidth="0.5" />
          <line x1={ox + slabL + 5} y1={oy} x2={ox + slabL + 15} y2={oy} stroke="#1C1C72" strokeWidth="0.5" />
          <line x1={ox + slabL + 5} y1={oy - slabH} x2={ox + slabL + 15} y2={oy - slabH} stroke="#1C1C72" strokeWidth="0.5" />
          <text x={ox + slabL + 30} y={oy - slabH/2} fill="#1C1C72" fontSize="8" fontWeight="900" textAnchor="middle" transform={`rotate(-90 ${ox + slabL + 30} ${oy - slabH/2})`}>{thickness}" THK</text>
        </g>
      </svg>
    </div>
  );
};
