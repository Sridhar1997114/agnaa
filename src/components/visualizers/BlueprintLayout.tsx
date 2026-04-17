"use client";

import React from 'react';
import { HumanScale } from './HumanScale';

interface BlueprintLayoutProps {
  length: number; // feet
  width: number; // feet
  label?: string;
  subLabel?: string;
  unit?: 'FT' | 'M';
  showHuman?: boolean;
}

export const BlueprintLayout: React.FC<BlueprintLayoutProps> = ({ length, width, label = "Property Layout", subLabel, unit = 'FT' }) => {
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
    <div className="w-full aspect-video bg-white rounded-2xl relative overflow-hidden border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group font-sans">
      {/* Blurred Thin Grid System */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.2]">
        <defs>
          <filter id="gridBlur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.4" />
          </filter>
          <pattern id="whitePortalGrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#E2E8F0" strokeWidth="0.5" filter="url(#gridBlur)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#whitePortalGrid)" />
      </svg>
      
      {/* Title - High Contrast Branding */}
      <div className="absolute top-6 left-6 z-10">
        <div className="text-[10px] font-black text-[#7B2DBF] tracking-[0.3em] uppercase mb-1 drop-shadow-sm">Spatial Planning Layout</div>
        <div className="text-[9px] font-bold text-[#1C1C72]/60 uppercase tracking-widest">{length}{unit} L × {width}{unit} W</div>
      </div>

      <svg viewBox="0 0 400 250" className="w-full h-full p-8 transition-transform duration-700 group-hover:scale-[1.01]">
        {/* Shaded Area with refined border */}
        <rect x={ox} y={oy} width={drawL} height={drawW} fill="white" stroke="#7B2DBF" strokeWidth="1" strokeDasharray="3 2" opacity="0.4" />
        <rect x={ox} y={oy} width={drawL} height={drawW} fill="#7B2DBF" opacity="0.02" />

        {/* Labels */}
        <g transform={`translate(${ox + drawL / 2}, ${oy + drawW / 2})`} textAnchor="middle">
          <text fill="#1C1C72" fontSize="11" fontWeight="900" className="uppercase tracking-wider">{label}</text>
          {subLabel && <text y="16" fill="#7B2DBF" fontSize="8" fontWeight="bold" opacity="0.6" className="uppercase tracking-tight">{subLabel}</text>}
        </g>

        {/* Dimension Lines — Swiss-Style Ticks */}
        <g stroke="#1C1C72" strokeWidth="0.5" opacity="0.2">
          <line x1={ox} y1={oy - 20} x2={ox + drawL} y2={oy - 20} />
          <line x1={ox} y1={oy - 25} x2={ox} y2={oy - 15} />
          <line x1={ox + drawL} y1={oy - 25} x2={ox + drawL} y2={oy - 15} />
          
          <line x1={ox + drawL + 20} y1={oy} x2={ox + drawL + 20} y2={oy + drawW} />
          <line x1={ox + drawL + 15} y1={oy} x2={ox + drawL + 25} y2={oy} />
          <line x1={ox + drawL + 15} y1={oy + drawW} x2={ox + drawL + 25} y2={oy + drawW} />
        </g>

        {/* Dimension Values */}
        <g fill="#1C1C72" fontSize="7" fontWeight="bold" opacity="0.6">
          <text x={ox + drawL / 2} y={oy - 30} textAnchor="middle" className="tracking-tighter">{length} {unit}</text>
          <text x={ox + drawL + 38} y={oy + drawW / 2} textAnchor="middle" transform={`rotate(90 ${ox + drawL + 38} ${oy + drawW / 2})`} className="tracking-tighter">{width} {unit}</text>
        </g>

        {/* Human Scale — Only if label suggests property planning */}
        {label === 'Property Layout' && (
          <HumanScale x={ox - 35} y={oy + drawW} scale={0.5} variant="plan" />
        )}
      </svg>

      {/* Scale indicator */}
      <div className="absolute bottom-4 left-6 flex items-center gap-2 opacity-30">
        <div className="w-5 h-0.5 bg-[#1C1C72]"></div>
        <span className="text-[7px] font-bold text-[#1C1C72] uppercase tracking-widest">NTS</span>
      </div>
    </div>
  );
};
