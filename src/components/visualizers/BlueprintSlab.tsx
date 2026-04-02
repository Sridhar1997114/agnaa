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
  const s = 15; // scale pixels per foot
  const slabL = Math.min(length, 20) * s; // Cap visual length for display
  const slabH = (thickness / 12) * s * 2; // exaggerated height for visibility

  const ox = 60;
  const oy = 180;

  // Rebar Layout based on preset
  const spacing = preset === 'economy' ? 20 : preset === 'strong' ? 10 : 15; // visual spacing
  const rebars = [];
  for (let x = 10; x < slabL; x += spacing) {
    rebars.push(x);
  }

  return (
    <div className="w-full aspect-video bg-[#0F172A] rounded-2xl relative overflow-hidden border-2 border-[#1C1C72] shadow-2xl group">
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: 'linear-gradient(#475569 1px, transparent 1px), linear-gradient(90deg, #475569 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      
      <div className="absolute top-4 left-4 z-10">
        <div className="text-[10px] font-black text-[#7B2DBF] tracking-[0.2em] uppercase mb-1">{label}</div>
        <div className="text-white font-mono text-xs opacity-50">{thickness}" Thickness | {preset.toUpperCase()} PRESET</div>
      </div>

      <svg viewBox="0 0 400 250" className="w-full h-full p-8 transition-transform duration-700 group-hover:scale-[1.02]">
        <defs>
          <pattern id="concretePattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="#1E293B" />
            <circle cx="5" cy="5" r="1.5" fill="#475569" />
            <circle cx="25" cy="15" r="1" fill="#475569" />
            <circle cx="15" cy="30" r="2" fill="#334155" />
            <path d="M 0 20 L 5 25 M 30 5 L 35 10" stroke="#475569" strokeWidth="0.5" />
          </pattern>
          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#A5B4FC" />
          </marker>
        </defs>

        {/* Foundations / Earth */}
        <line x1={0} y1={oy} x2={400} y2={oy} stroke="#1E293B" strokeWidth="2" strokeDasharray="5,3" />

        {/* Concrete Slab Shadow */}
        <rect x={ox + 5} y={oy - slabH + 5} width={slabL} height={slabH} fill="black" opacity="0.3" />

        {/* Concrete Slab Main Body */}
        <rect x={ox} y={oy - slabH} width={slabL} height={slabH} fill="url(#concretePattern)" stroke="#3B82F6" strokeWidth="1.5" rx="2" />
        
        {/* Clear Cover Annotations */}
        <g opacity="0.4">
          <line x1={ox + 10} y1={oy} x2={ox + 10} y2={oy - 12} stroke="#A5B4FC" strokeWidth="0.5" markerEnd="url(#arrow)" />
          <text x={ox + 15} y={oy - 5} fill="#A5B4FC" fontSize="5" fontWeight="bold">25mm CLR COVER</text>
        </g>

        {/* Rebar Stools (Chairs) - Visual only */}
        {rebars.filter((_, i) => i % 3 === 0).map((rx, i) => (
          <path key={`stool-${i}`} d={`M ${ox + rx - 5} ${oy} L ${ox + rx} ${oy - (slabH * 0.70)} L ${ox + rx + 5} ${oy}`} fill="none" stroke="#64748B" strokeWidth="0.5" opacity="0.5" />
        ))}

        {/* Rebars (Steel) */}
        {/* Distribution Bars (Cross sections) */}
        {rebars.map((rx, i) => (
          <circle key={i} cx={ox + rx} cy={oy - (slabH * 0.25)} r="2.5" fill="#EF4444" stroke="#B91C1C" strokeWidth="0.5" className="animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
        ))}
        {rebars.map((rx, i) => (
          <circle key={`bot-${i}`} cx={ox + rx} cy={oy - (slabH * 0.75)} r="2.5" fill="#EF4444" stroke="#B91C1C" strokeWidth="0.5" className="animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
        ))}

        {/* Main Bars (Horizontal) */}
        <line x1={ox + 5} y1={oy - (slabH * 0.25)} x2={ox + slabL - 5} y2={oy - (slabH * 0.25)} stroke="#EF4444" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
        <line x1={ox + 5} y1={oy - (slabH * 0.75)} x2={ox + slabL - 5} y2={oy - (slabH * 0.75)} stroke="#EF4444" strokeWidth="2" strokeLinecap="round" opacity="0.8" />

        {/* Technical Labels */}
        <g transform={`translate(${ox + slabL + 20}, ${oy - slabH/2})`}>
          <text fill="#EF4444" fontSize="6" fontWeight="black" className="uppercase tracking-widest">Main Reinforcement</text>
          <text y="8" fill="#A5B4FC" fontSize="5" fontWeight="bold" opacity="0.6">TMT FE500 GRADE</text>
        </g>

        {/* Human Scale */}
        <HumanScale x={ox - 40} y={oy} scale={0.7} />

        {/* Dimension Labels */}
        <g opacity="0.8">
          {/* Span Line */}
          <line x1={ox} y1={oy + 25} x2={ox + slabL} y2={oy + 25} stroke="#A5B4FC" strokeWidth="1" />
          <line x1={ox} y1={oy + 20} x2={ox} y2={oy + 30} stroke="#A5B4FC" strokeWidth="1" />
          <line x1={ox + slabL} y1={oy + 20} x2={ox + slabL} y2={oy + 30} stroke="#A5B4FC" strokeWidth="1" />
          <text x={ox + slabL/2} y={oy + 40} fill="#A5B4FC" fontSize="10" fontWeight="black" textAnchor="middle" className="tracking-tighter">SPAN: {length}FT 0"</text>

          {/* Thickness Line */}
          <line x1={ox + slabL + 10} y1={oy} x2={ox + slabL + 10} y2={oy - slabH} stroke="#A5B4FC" strokeWidth="1" />
          <line x1={ox + slabL + 5} y1={oy} x2={ox + slabL + 15} y2={oy} stroke="#A5B4FC" strokeWidth="1" />
          <line x1={ox + slabL + 5} y1={oy - slabH} x2={ox + slabL + 15} y2={oy - slabH} stroke="#A5B4FC" strokeWidth="1" />
          <text x={ox + slabL + 35} y={oy - slabH/2} fill="#A5B4FC" fontSize="10" fontWeight="black" textAnchor="middle" transform={`rotate(-90 ${ox + slabL + 35} ${oy - slabH/2})`}>{thickness}" THK</text>
        </g>
      </svg>

    </div>
  );
};
