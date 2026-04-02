"use client";

import React from 'react';
import { HumanScale } from './HumanScale';

interface BlueprintLayoutProps {
  length: number; // feet
  width: number; // feet
  label?: string;
  subLabel?: string;
}

export const BlueprintLayout: React.FC<BlueprintLayoutProps> = ({ length, width, label = "Plot Area", subLabel }) => {
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
    <div className="w-full aspect-video bg-[#0F172A] rounded-2xl relative overflow-hidden border-2 border-[#1C1C72] shadow-2xl group">
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: 'linear-gradient(#475569 1px, transparent 1px), linear-gradient(90deg, #475569 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      
      <div className="absolute top-4 left-4 z-10">
        <div className="text-[10px] font-black text-[#7B2DBF] tracking-[0.2em] uppercase mb-1">Space Planning Layout</div>
        <div className="text-white font-mono text-xs opacity-50">{length}' L x {width}' W</div>
      </div>

      <svg viewBox="0 0 400 250" className="w-full h-full p-8 transition-transform duration-700 group-hover:scale-[1.02]">
        <defs>
          <pattern id="gridPattern" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#1E293B" strokeWidth="0.5"/>
          </pattern>
        </defs>

        {/* Compass / North Arrow */}
        <g transform="translate(360, 40)" opacity="0.6">
          <circle r="15" fill="none" stroke="#A5B4FC" strokeWidth="1" strokeDasharray="2,2" />
          <path d="M 0 -12 L 4 0 L 0 12 L -4 0 Z" fill="#EF4444" />
          <text y="-18" fill="#A5B4FC" fontSize="8" fontWeight="black" textAnchor="middle">N</text>
        </g>

        {/* Shaded Area */}
        <rect x={ox} y={oy} width={drawL} height={drawW} fill="url(#gridPattern)" stroke="#3B82F6" strokeWidth="2" />
        <rect x={ox} y={oy} width={drawL} height={drawW} fill="#3B82F6" opacity="0.05" />

        {/* Labels */}
        <g transform={`translate(${ox + drawL / 2}, ${oy + drawW / 2})`} textAnchor="middle">
          <text fill="#3B82F6" fontSize="12" fontWeight="black" className="uppercase tracking-tighter" style={{ filter: 'drop-shadow(0px 0px 2px rgba(59, 130, 246, 0.5))' }}>{label}</text>
          {subLabel && <text y="15" fill="#A5B4FC" fontSize="8" fontWeight="bold" opacity="0.6" className="uppercase">{subLabel}</text>}
        </g>

        {/* Dimension Lines (Professional Architectural Style) */}
        <g stroke="#A5B4FC" strokeWidth="1" opacity="0.8">
          {/* Length */}
          <line x1={ox} y1={oy - 25} x2={ox + drawL} y2={oy - 25} />
          <line x1={ox} y1={oy - 30} x2={ox + 5} y2={oy - 20} /> {/* Tick */}
          <line x1={ox + drawL} y1={oy - 30} x2={ox + drawL - 5} y2={oy - 20} stroke="#EF4444" /> {/* Tick */}
          
          {/* Width */}
          <line x1={ox + drawL + 25} y1={oy} x2={ox + drawL + 25} y2={oy + drawW} />
          <line x1={ox + drawL + 20} y1={oy} x2={ox + drawL + 30} y2={oy + 5} /> {/* Tick */}
          <line x1={ox + drawL + 20} y1={oy + drawW} x2={ox + drawL + 30} y2={oy + drawW - 5} stroke="#EF4444" /> {/* Tick */}
        </g>

        <g fill="#A5B4FC" fontSize="10" fontWeight="black">
          <text x={ox + drawL / 2} y={oy - 35} textAnchor="middle" className="tracking-tighter">{length} FT 0"</text>
          <text x={ox + drawL + 45} y={oy + drawW / 2} textAnchor="middle" transform={`rotate(90 ${ox + drawL + 45} ${oy + drawW / 2})`} className="tracking-tighter">{width} FT 0"</text>
        </g>

        {/* Space Usage Indicators (Subtle Crosses) */}
        <path d={`M ${ox+10} ${oy+10} L ${ox+20} ${oy+20} M ${ox+20} ${oy+10} L ${ox+10} ${oy+20}`} stroke="#3B82F6" strokeWidth="0.5" opacity="0.3" />

        {/* Human Scale */}
        <HumanScale x={ox - 40} y={oy + drawW} scale={0.7} />
      </svg>

    </div>
  );
};
