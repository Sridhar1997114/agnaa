"use client";

import React from 'react';
import { HumanScale } from './HumanScale';

interface BlueprintFootingProps {
  length: number; 
  width: number;  
  depth: number;
  unit?: 'FT' | 'M';
  showHuman?: boolean;
}

export const BlueprintFooting: React.FC<BlueprintFootingProps> = ({ length, width, depth, unit = 'M', showHuman = true }) => {
  const ox = 150;
  const oy = 180;
  const s = unit === 'M' ? 40 : 12;
  
  const p0 = { x: ox, y: oy }; 
  const p1 = { x: ox + length * s, y: oy - (length * s * 0.3) };
  const p2 = { x: ox + (length * s) - (width * s), y: oy - (length * s * 0.3) - (width * s * 0.3) };
  const p3 = { x: ox - width * s, y: oy - (width * s * 0.3) };

  const dy = depth * s;
  const t0 = { x: p0.x, y: p0.y - dy };
  const t1 = { x: p1.x, y: p1.y - dy };
  const t2 = { x: p2.x, y: p2.y - dy };
  const t3 = { x: p3.x, y: p3.y - dy };

  const colW = unit === 'M' ? 0.3 * s : 1 * s; 
  const cx = (t0.x + t1.x + t2.x + t3.x) / 4;
  const cy = (t0.y + t1.y + t2.y + t3.y) / 4;
  
  const c0 = { x: cx - colW, y: cy + colW * 0.3 };
  const c1 = { x: cx + colW, y: cy - colW * 0.3 };
  const c2 = { x: cx + colW - colW, y: cy - colW * 0.3 - colW * 0.3 };
  const c3 = { x: cx - colW - colW, y: cy + colW * 0.3 - colW * 0.3 };
  
  const ch = 1 * s; 
  const ct0 = { x: c0.x, y: c0.y - ch };
  const ct1 = { x: c1.x, y: c1.y - ch };
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
        <div className="text-[10px] font-black text-[#7B2DBF] tracking-[0.3em] uppercase mb-1">Structural Footing Section</div>
        <div className="text-[9px] font-bold text-[#1C1C72]/40 uppercase tracking-widest">{length} {unit} × {width} {unit} × {depth} {unit} Base</div>
      </div>

      <svg viewBox="0 0 400 250" className="w-full h-full p-8 transition-transform duration-700 group-hover:scale-[1.02]">
        <defs>
          <pattern id="concreteHatch" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.5" fill="#1C1C72" opacity="0.4" />
            <circle cx="12" cy="8" r="0.3" fill="#1C1C72" opacity="0.3" />
            <circle cx="6" cy="15" r="0.7" fill="#1C1C72" opacity="0.5" />
            <path d="M 15 5 L 17 7 M 5 15 L 7 17" stroke="#1C1C72" strokeWidth="0.2" opacity="0.3" />
          </pattern>
        </defs>

        <polygon points={poly([p0, p1, p2, p3])} fill="#F8FAFC" stroke="#1C1C72" strokeWidth="0.5" opacity="0.5" />
        <polygon points={poly([p0, p1, t1, t0])} fill="#F8FAFC" stroke="#1C1C72" strokeWidth="0.8" />
        <polygon points={poly([p1, p2, t2, t1])} fill="#F1F5F9" stroke="#1C1C72" strokeWidth="0.8" />
        <polygon points={poly([t0, t1, t2, t3])} fill="white" stroke="#1C1C72" strokeWidth="1.2" />
        <polygon points={poly([t0, t1, t2, t3])} fill="url(#concreteHatch)" opacity="0.4" />

        <polygon points={poly([c0, c1, ct1, ct0])} fill="#7B2DBF" stroke="#1C1C72" strokeWidth="1.5" opacity="0.6" />
        <text x={cx} y={ct0.y - 10} fill="#7B2DBF" fontSize="6" fontWeight="900" textAnchor="middle" opacity="0.8">COLUMN STUB</text>

        <g opacity="0.4" stroke="#1C1C72" strokeWidth="0.5">
           <line x1={p0.x} y1={p0.y + 15} x2={p1.x} y2={p1.y + 15} />
           <line x1={p0.x - 15} y1={p0.y} x2={t0.x - 15} y2={t0.y} />
        </g>
        
        <text x={(p0.x + p1.x)/2} y={(p0.y + p1.y)/2 + 25} fill="#1C1C72" fontSize="7" fontWeight="bold" textAnchor="middle">{length} {unit}</text>
        <text x={p0.x - 30} y={(p0.y + t0.y)/2} fill="#1C1C72" fontSize="7" fontWeight="bold" textAnchor="middle" transform={`rotate(-90 ${p0.x - 30} ${(p0.y + t0.y)/2})`}>{depth} {unit}</text>
        
        {/* Human Scale — 3D View (Optional) */}
        {showHuman && (
          <HumanScale x={ox - 100} y={oy + 10} scale={0.6} variant="3d" />
        )}
      </svg>
    </div>
  );
};
