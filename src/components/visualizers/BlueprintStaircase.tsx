"use client";

import React from 'react';
import { HumanScale } from './HumanScale';

interface BlueprintStaircaseProps {
  totalRise: number; // inches
  totalRun: number; // inches
  riserCount: number;
  treadWidth: number; // inches
  riserHeight: number; // inches
}

export const BlueprintStaircase: React.FC<BlueprintStaircaseProps> = ({ 
  totalRise, 
  totalRun, 
  riserCount, 
  treadWidth, 
  riserHeight 
}) => {
  const s = 1.0; // Scale factor
  const ox = 50;
  const oy = 200;

  // Calculate points for the stairs
  const points = [];
  let curX = 0;
  let curY = 0;

  for (let i = 0; i < riserCount; i++) {
    // Riser up
    points.push({ x: curX, y: curY - riserHeight });
    curY -= riserHeight;
    // Tread across
    points.push({ x: curX + treadWidth, y: curY });
    curX += treadWidth;
  }

  const polyPoints = points.map(p => `${ox + p.x * s},${oy + p.y * s}`).join(' ');
  const waistSlabThickness = 6; // inches (visual constant)

  // Waist slab bottom points (offset from stairs)
  const waistPoints = points.map(p => ({
    x: p.x,
    y: p.y + waistSlabThickness * 1.5 // exaggerated for visual
  })).map(p => `${ox + p.x * s},${oy + p.y * s}`).join(' ');

  return (
    <div className="w-full aspect-video bg-[#0F172A] rounded-2xl relative overflow-hidden border-2 border-[#1C1C72] shadow-2xl group">
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: 'linear-gradient(#475569 1px, transparent 1px), linear-gradient(90deg, #475569 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      
      <div className="absolute top-4 left-4 z-10">
        <div className="text-[10px] font-black text-[#7B2DBF] tracking-[0.2em] uppercase mb-1">Staircase Structural Section</div>
        <div className="text-white font-mono text-xs opacity-50">{riserCount} Risers @ {riserHeight.toFixed(1)}"</div>
      </div>

      <svg viewBox="0 0 400 250" className="w-full h-full p-8 transition-transform duration-700 group-hover:scale-[1.02]">
        <defs>
          <pattern id="concretePattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="#1E293B" />
            <circle cx="5" cy="5" r="1" fill="#475569" />
            <path d="M 0 20 L 5 25 M 30 5 L 35 10" stroke="#475569" strokeWidth="0.5" />
          </pattern>
        </defs>

        {/* Foundations */}
        <line x1={0} y1={oy} x2={400} y2={oy} stroke="#1E293B" strokeWidth="2" strokeDasharray="5,3" />

        {/* Waist Slab & Steps */}
        <path d={`M ${ox},${oy} ${polyPoints} L ${ox + totalRun * s},${oy} Z`} fill="url(#concretePattern)" stroke="#3B82F6" strokeWidth="1.5" />
        
        {/* Rebar (Main Tension Bars) */}
        <path d={`M ${ox + 5},${oy - 5} ${points.map(p => `${ox + p.x * s},${oy + (p.y + 10) * s}`).join(' ')}`} 
              fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
        
        {/* Dimensions */}
        <g stroke="#A5B4FC" strokeWidth="1" opacity="0.6">
           {/* Total Height */}
           <line x1={ox - 20} y1={oy} x2={ox - 20} y2={oy - totalRise * s} />
           <line x1={ox - 25} y1={oy} x2={ox - 15} y2={oy} />
           <line x1={ox - 25} y1={oy - totalRise * s} x2={ox - 15} y2={oy - totalRise * s} />
           
           {/* Total Run */}
           <line x1={ox} y1={oy + 25} x2={ox + totalRun * s} y2={oy + 25} />
           <line x1={ox} y1={oy + 20} x2={ox} y2={oy + 30} />
           <line x1={ox + totalRun * s} y1={oy + 20} x2={ox + totalRun * s} y2={oy + 30} />
        </g>

        <g fill="#A5B4FC" fontSize="8" fontWeight="black" textAnchor="middle">
           <text x={ox - 35} y={oy - (totalRise * s / 2)} transform={`rotate(-90 ${ox - 35} ${oy - (totalRise * s / 2)})`}>RISE: {(totalRise/12).toFixed(1)} FT</text>
           <text x={ox + (totalRun * s / 2)} y={oy + 40}>RUN: {(totalRun/12).toFixed(1)} FT</text>
        </g>

        {/* Step Detail Callout */}
        <g transform={`translate(${ox + treadWidth * 1.5}, ${oy - riserHeight * 1.5})`}>
          <circle r="15" fill="none" stroke="#7B2DBF" strokeWidth="1" strokeDasharray="2,2" />
          <text x="20" y="-5" fill="white" fontSize="6" fontWeight="bold">TREAD: {treadWidth}"</text>
          <text x="20" y="5" fill="white" fontSize="6" fontWeight="bold">RISER: {riserHeight.toFixed(1)}"</text>
        </g>

        {/* Human Scale */}
        <HumanScale x={ox + totalRun * s - 20} y={oy - totalRise * s} scale={0.7} />
      </svg>
    </div>
  );
};
