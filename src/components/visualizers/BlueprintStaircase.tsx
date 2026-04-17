"use client";

import React from 'react';
import { HumanScale } from './HumanScale';

interface BlueprintStaircaseProps {
  totalRise: number;
  totalRun: number;
  riserCount: number;
  treadWidth: number;
  riserHeight: number;
  showHuman?: boolean;
}

export const BlueprintStaircase: React.FC<BlueprintStaircaseProps> = ({ 
  totalRise, 
  totalRun, 
  riserCount, 
  treadWidth, 
  riserHeight,
  showHuman = true 
}) => {
  const s = 1.0;
  const ox = 50;
  const oy = 200;

  const points = [];
  let curX = 0;
  let curY = 0;

  for (let i = 0; i < riserCount; i++) {
    points.push({ x: curX, y: curY - riserHeight });
    curY -= riserHeight;
    points.push({ x: curX + treadWidth, y: curY });
    curX += treadWidth;
  }

  const polyPoints = points.map(p => `${ox + p.x * s},${oy + p.y * s}`).join(' ');

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
      
      {/* Title */}
      <div className="absolute top-6 left-6 z-10">
        <div className="text-[10px] font-black text-[#7B2DBF] tracking-[0.3em] uppercase mb-1">Staircase Structural Section</div>
        <div className="text-[9px] font-bold text-[#1C1C72]/40 uppercase tracking-widest">{riserCount} Risers @ {riserHeight.toFixed(1)}"</div>
      </div>

      <svg viewBox="0 0 400 250" className="w-full h-full p-8 transition-transform duration-700 group-hover:scale-[1.02]">
        {/* Ground Line */}
        <line x1={0} y1={oy} x2={400} y2={oy} stroke="#1C1C72" strokeWidth="0.5" strokeDasharray="4,3" opacity="0.1" />

        {/* Stair Profile */}
        <path d={`M ${ox},${oy} ${polyPoints} L ${ox + totalRun * s},${oy} Z`} fill="white" stroke="#1C1C72" strokeWidth="1.5" />
        <path d={`M ${ox},${oy} ${polyPoints} L ${ox + totalRun * s},${oy} Z`} fill="#1C1C72" opacity="0.02" />
        
        {/* Rebar */}
        <path d={`M ${ox + 5},${oy - 5} ${points.map(p => `${ox + p.x * s},${oy + (p.y + 10) * s}`).join(' ')}`} 
              fill="none" stroke="#7B2DBF" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
        
        {/* Dimension Lines */}
        <g stroke="#1C1C72" strokeWidth="0.5" opacity="0.4">
           <line x1={ox - 20} y1={oy} x2={ox - 20} y2={oy - totalRise * s} />
           <line x1={ox - 25} y1={oy} x2={ox - 15} y2={oy} />
           <line x1={ox - 25} y1={oy - totalRise * s} x2={ox - 15} y2={oy - totalRise * s} />
           
           <line x1={ox} y1={oy + 25} x2={ox + totalRun * s} y2={oy + 25} />
           <line x1={ox} y1={oy + 20} x2={ox} y2={oy + 30} />
           <line x1={ox + totalRun * s} y1={oy + 20} x2={ox + totalRun * s} y2={oy + 30} />
        </g>

        <g fill="#1C1C72" fontSize="7" fontWeight="900" textAnchor="middle">
           <text x={ox - 35} y={oy - (totalRise * s / 2)} transform={`rotate(-90 ${ox - 35} ${oy - (totalRise * s / 2)})`}>RISE: {(totalRise/12).toFixed(1)} FT</text>
           <text x={ox + (totalRun * s / 2)} y={oy + 40}>RUN: {(totalRun/12).toFixed(1)} FT</text>
        </g>

        {/* Step Detail Callout */}
        <g transform={`translate(${ox + treadWidth * 1.5}, ${oy - riserHeight * 1.5})`}>
          <circle r="14" fill="none" stroke="#7B2DBF" strokeWidth="0.8" strokeDasharray="2,2" opacity="0.4" />
          <text x="20" y="-5" fill="#1C1C72" fontSize="6" fontWeight="bold" opacity="0.6">TREAD: {treadWidth}"</text>
          <text x="20" y="5" fill="#1C1C72" fontSize="6" fontWeight="bold" opacity="0.6">RISER: {riserHeight.toFixed(1)}"</text>
        </g>

        {/* Human Scale — Section View (Optional) */}
        {showHuman && (
          <HumanScale x={ox + totalRun * s - 20} y={oy - totalRise * s} scale={0.7} variant="section" />
        )}
      </svg>
    </div>
  );
};
