"use client";

import React from 'react';

import { HumanScale } from './HumanScale';

interface BlueprintWallProps {
  length: number; // feet
  height: number; // feet
  thickness: number; // inches
  label?: string;
  unit?: 'FT' | 'M';
  showHuman?: boolean;
}

export const BlueprintWall: React.FC<BlueprintWallProps> = ({ length, height, thickness, label, unit = 'FT', showHuman = true }) => {
  const s = 10; 
  const wallL = length * s;
  const wallH = height * s;
  const wallT = (thickness / 12) * s; 

  const ox = 100;
  const oy = 180;

  // isometric projection
  const p0 = { x: ox, y: oy };
  const p1 = { x: ox + wallL, y: oy };
  const p2 = { x: ox + wallL + wallT, y: oy - wallT };
  const p3 = { x: ox + wallT, y: oy - wallT };

  const t0 = { x: p0.x, y: p0.y - wallH };
  const t1 = { x: p1.x, y: p1.y - wallH };
  const t2 = { x: p2.x, y: p2.y - wallH };
  const t3 = { x: p3.x, y: p3.y - wallH };

  const poly = (pts: any[]) => pts.map(p => `${p.x},${p.y}`).join(' ');

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
      
      <div className="absolute top-6 left-6 z-10">
        <div className="text-[10px] font-black text-[#1C1C72] tracking-[0.3em] uppercase mb-1">
          {label || "Wall Elevation // Section Drafting"}
        </div>
        <div className="flex items-center gap-2">
           <div className="text-[9px] font-bold text-[#7B2DBF] uppercase tracking-widest bg-[#7B2DBF]/10 px-2 py-0.5 rounded-full inline-block">
             {label ? `${thickness}" THICKNESS` : `TMT REINFORCED ${thickness}" BRICKWORK`}
           </div>
        </div>
      </div>

      <svg viewBox="0 0 400 250" className="w-full h-full p-8 transition-transform duration-700 group-hover:scale-[1.02]">
        <defs>
          <pattern id="brickPatternV2" x="0" y="0" width="30" height="15" patternUnits="userSpaceOnUse">
             {/* Stretcher bond logic */}
            <rect width="30" height="15" fill="none" stroke="#1C1C72" strokeWidth="0.2" opacity="0.3" />
            <line x1="0" y1="7.5" x2="30" y2="7.5" stroke="#1C1C72" strokeWidth="0.2" opacity="0.3" />
            <line x1="15" y1="0" x2="15" y2="7.5" stroke="#1C1C72" strokeWidth="0.2" opacity="0.3" />
            <line x1="0" y1="7.5" x2="0" y2="15" stroke="#1C1C72" strokeWidth="0.2" opacity="0.3" />
            <line x1="30" y1="7.5" x2="30" y2="15" stroke="#1C1C72" strokeWidth="0.2" opacity="0.3" />
            <circle cx="2" cy="2" r="0.1" fill="#1C1C72" opacity="0.2" />
          </pattern>
        </defs>

        {/* Isometric Wall */}
        <polygon points={poly([p1, p2, t2, t1])} fill="#F8FAFC" stroke="#1C1C72" strokeWidth="0.8" />
        <polygon points={poly([t0, t1, t2, t3])} fill="#F1F5F9" stroke="#1C1C72" strokeWidth="0.8" />
        <rect x={p0.x} y={t0.y} width={wallL} height={wallH} fill="white" stroke="#1C1C72" strokeWidth="1.5" />
        
        {/* Pattern overlay */}
        <rect x={p0.x} y={t0.y} width={wallL} height={wallH} fill="url(#brickPatternV2)" opacity="0.3" />

        {/* Dimensioning - Swiss Style (Ticks) */}
        <g stroke="#1C1C72" strokeWidth="0.5">
           {/* Horizontal Length */}
           <line x1={p0.x} y1={p0.y + 25} x2={p1.x} y2={p1.y + 25} />
           <line x1={p0.x - 3} y1={p0.y + 22} x2={p0.x + 3} y2={p0.y + 28} />
           <line x1={p1.x - 3} y1={p1.y + 22} x2={p1.x + 3} y2={p1.y + 28} />
           
           {/* Vertical Height */}
           <line x1={p0.x - 25} y1={p0.y} x2={p0.x - 25} y2={t0.y} />
           <line x1={p0.x - 28} y1={p0.y - 3} x2={p0.x - 22} y2={p0.y + 3} />
           <line x1={p0.x - 28} y1={t0.y - 3} x2={p0.x - 22} y2={t0.y + 3} />
        </g>

        {/* Numerical Data Labels */}
        <text x={(p0.x + p1.x)/2} y={p0.y + 40} fill="#1C1C72" fontSize="8" fontWeight="900" textAnchor="middle" className="tracking-tighter">L: {length} {unit}</text>
        <text x={p0.x - 40} y={(p0.y + t0.y)/2} fill="#1C1C72" fontSize="8" fontWeight="900" textAnchor="middle" transform={`rotate(-90 ${p0.x - 40} ${(p0.y + t0.y)/2})`}>H: {height} {unit}</text>

        {/* Thickness callout */}
        <path d={`M ${p1.x + 10} ${p1.y - 5} L ${p1.x + 40} ${p1.y - 30}`} fill="none" stroke="#7B2DBF" strokeWidth="0.5" strokeDasharray="2,2" />
        <text x={p1.x + 45} y={p1.y - 35} fill="#7B2DBF" fontSize="7" fontWeight="bold">T: {thickness}" THICK</text>

        {/* Human Context — Section/Elevation (Optional) */}
        {showHuman && (
          <HumanScale x={p0.x - 60} y={p0.y} scale={0.7} variant="section" />
        )}
        
        {/* Scale indicator */}
        <g transform="translate(20, 230)" opacity="0.4">
          <line x1="0" y1="0" x2="20" y2="0" stroke="#1C1C72" strokeWidth="2" />
          <text x="25" y="3" fontSize="6" fontWeight="bold" fill="#1C1C72">SCALE 1:20</text>
        </g>
      </svg>
    </div>
  );
};

