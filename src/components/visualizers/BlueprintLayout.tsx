"use client";

import React from 'react';
import { HumanScale } from './HumanScale';

interface BlueprintLayoutProps {
  length: number; // feet
  width: number; // feet
  label?: string;
  subLabel?: string;
}

export const BlueprintLayout: React.FC<BlueprintLayoutProps> = ({ length, width, label = "Property Layout", subLabel }) => {
  const maxSize = 300;
  const aspectRatio = length / width;
  
  let drawL, drawW;
  if (aspectRatio > 1) {
    drawL = maxSize;
    drawW = maxSize / aspectRatio;
  } else {
    drawW = maxSize;
    drawL = maxSize * aspectRatio;
  }

  const ox = (400 - drawL) / 2;
  const oy = (250 - drawW) / 2;

  return (
    <div className="w-full aspect-video bg-[#FDFDFF] rounded-2xl relative overflow-hidden border border-gray-200 shadow-lg group font-sans">
      {/* Thin branding blue grid */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#1C1C72 1px, transparent 1px), linear-gradient(90deg, #1C1C72 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      
      {/* Title - branding violet */}
      <div className="absolute top-6 left-6 z-10">
        <div className="text-[10px] font-black text-[#7B2DBF] tracking-[0.3em] uppercase mb-1">Space Planning Layout</div>
        <div className="text-[9px] font-bold text-[#1C1C72]/40 uppercase tracking-widest">{length}' L × {width}' W</div>
      </div>

      <svg viewBox="0 0 400 250" className="w-full h-full p-8 transition-transform duration-700 group-hover:scale-[1.02]">
        {/* NO COMPASS — removed as irrelevant for calculators */}

        {/* Shaded Area */}
        <rect x={ox} y={oy} width={drawL} height={drawW} fill="white" stroke="#1C1C72" strokeWidth="1.5" />
        <rect x={ox} y={oy} width={drawL} height={drawW} fill="#1C1C72" opacity="0.03" />

        {/* Labels */}
        <g transform={`translate(${ox + drawL / 2}, ${oy + drawW / 2})`} textAnchor="middle">
          <text fill="#7B2DBF" fontSize="11" fontWeight="900" className="uppercase tracking-wider">{label}</text>
          {subLabel && <text y="16" fill="#1C1C72" fontSize="8" fontWeight="bold" opacity="0.35" className="uppercase">{subLabel}</text>}
        </g>

        {/* Dimension Lines — Swiss-Style Ticks */}
        <g stroke="#1C1C72" strokeWidth="0.5" opacity="0.4">
          {/* Length (top) */}
          <line x1={ox} y1={oy - 20} x2={ox + drawL} y2={oy - 20} />
          <line x1={ox} y1={oy - 25} x2={ox} y2={oy - 15} />
          <line x1={ox + drawL} y1={oy - 25} x2={ox + drawL} y2={oy - 15} />
          
          {/* Width (right) */}
          <line x1={ox + drawL + 20} y1={oy} x2={ox + drawL + 20} y2={oy + drawW} />
          <line x1={ox + drawL + 15} y1={oy} x2={ox + drawL + 25} y2={oy} />
          <line x1={ox + drawL + 15} y1={oy + drawW} x2={ox + drawL + 25} y2={oy + drawW} />
        </g>

        {/* Dimension Values */}
        <g fill="#1C1C72" fontSize="8" fontWeight="900">
          <text x={ox + drawL / 2} y={oy - 30} textAnchor="middle" className="tracking-tighter">{length} FT</text>
          <text x={ox + drawL + 38} y={oy + drawW / 2} textAnchor="middle" transform={`rotate(90 ${ox + drawL + 38} ${oy + drawW / 2})`} className="tracking-tighter">{width} FT</text>
        </g>

        {/* Corner Markers (subtle) */}
        <g opacity="0.15" stroke="#1C1C72" strokeWidth="1.5" fill="none">
          <path d={`M ${ox} ${oy + 15} L ${ox} ${oy} L ${ox + 15} ${oy}`} />
          <path d={`M ${ox + drawL - 15} ${oy + drawW} L ${ox + drawL} ${oy + drawW} L ${ox + drawL} ${oy + drawW - 15}`} />
        </g>

        {/* Human Scale — Plan View */}
        <HumanScale x={ox - 35} y={oy + drawW} scale={0.6} variant="plan" />
      </svg>

      {/* Scale indicator */}
      <div className="absolute bottom-4 left-6 flex items-center gap-2 opacity-30">
        <div className="w-5 h-0.5 bg-[#1C1C72]"></div>
        <span className="text-[7px] font-bold text-[#1C1C72] uppercase tracking-widest">NTS</span>
      </div>
    </div>
  );
};
