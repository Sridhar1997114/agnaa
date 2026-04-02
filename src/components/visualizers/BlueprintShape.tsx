"use client";

import React from 'react';
import { HumanScale } from './HumanScale';

interface BlueprintShapeProps {
  shape: 'cylinder' | 'cone' | 'trapezoidal';
  data: {
    r?: number;
    h?: number;
    l?: number;
    a?: number;
    b?: number;
  };
}

export const BlueprintShape: React.FC<BlueprintShapeProps> = ({ shape, data }) => {
  const { r = 0.5, h = 2, l = 5, a = 1, b = 0.5 } = data;
  const s = 40;
  const ox = 200;
  const oy = 180;

  const poly = (pts: {x: number, y: number}[]) => pts.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div className="w-full aspect-video bg-[#FDFDFF] rounded-2xl relative overflow-hidden border border-gray-200 shadow-lg group font-sans">
      {/* Thin branding blue grid (dot pattern for volumetric) */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#1C1C72 0.5px, transparent 0.5px)', backgroundSize: '15px 15px' }}></div>
      
      {/* Title */}
      <div className="absolute top-6 left-6 z-10">
        <div className="text-[10px] font-black text-[#7B2DBF] tracking-[0.3em] uppercase mb-1">Volumetric Drafting // {shape}</div>
        <div className="text-[9px] font-bold text-[#1C1C72]/40 uppercase tracking-widest">Precision Geometry Engine</div>
      </div>

      <svg viewBox="0 0 400 250" className="w-full h-full p-8 transition-transform duration-700 group-hover:scale-[1.05]">
        {/* CYLINDER */}
        {shape === 'cylinder' && (
          <g>
            <ellipse cx={ox} cy={oy} rx={r * s} ry={r * s * 0.4} fill="white" stroke="#1C1C72" strokeWidth="0.8" opacity="0.5" />
            <rect x={ox - r * s} y={oy - h * s} width={r * s * 2} height={h * s} fill="white" stroke="none" />
            <line x1={ox - r * s} y1={oy} x2={ox - r * s} y2={oy - h * s} stroke="#1C1C72" strokeWidth="1.2" />
            <line x1={ox + r * s} y1={oy} x2={ox + r * s} y2={oy - h * s} stroke="#1C1C72" strokeWidth="1.2" />
            <ellipse cx={ox} cy={oy - h * s} rx={r * s} ry={r * s * 0.4} fill="white" stroke="#1C1C72" strokeWidth="1.5" />
            
            {/* Dimensions */}
            <line x1={ox} y1={oy - h * s} x2={ox + r * s} y2={oy - h * s} stroke="#1C1C72" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.4" />
            <text x={ox + (r * s / 2)} y={oy - h * s - 5} fill="#1C1C72" fontSize="7" fontWeight="900" textAnchor="middle">R: {r}M</text>
            <line x1={ox + r * s + 15} y1={oy} x2={ox + r * s + 15} y2={oy - h * s} stroke="#1C1C72" strokeWidth="0.5" opacity="0.4" />
            <text x={ox + r * s + 25} y={oy - (h * s / 2)} fill="#1C1C72" fontSize="7" fontWeight="900" transform={`rotate(-90 ${ox + r * s + 25} ${oy - (h * s / 2)})`}>H: {h}M</text>
          </g>
        )}

        {/* CONE */}
        {shape === 'cone' && (
          <g>
            <ellipse cx={ox} cy={oy} rx={r * s} ry={r * s * 0.4} fill="white" stroke="#1C1C72" strokeWidth="0.8" opacity="0.5" />
            <path d={`M ${ox - r * s} ${oy} L ${ox} ${oy - h * s} L ${ox + r * s} ${oy} Z`} fill="white" stroke="#1C1C72" strokeWidth="1.5" />
            
            <line x1={ox} y1={oy} x2={ox + r * s} y2={oy} stroke="#1C1C72" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.4" />
            <text x={ox + (r * s / 2)} y={oy + 15} fill="#1C1C72" fontSize="7" fontWeight="900" textAnchor="middle">R: {r}M</text>
            <line x1={ox} y1={oy} x2={ox} y2={oy - h * s} stroke="#1C1C72" strokeWidth="0.5" strokeDasharray="4,2" opacity="0.4" />
            <text x={ox - 10} y={oy - (h * s / 2)} fill="#1C1C72" fontSize="7" fontWeight="900" textAnchor="end">H: {h}M</text>
          </g>
        )}

        {/* TRAPEZOIDAL */}
        {shape === 'trapezoidal' && (
          <g>
            {(() => {
                const b0 = { x: ox - (b * s / 2), y: oy };
                const b1 = { x: ox + (b * s / 2), y: oy };
                const b2 = { x: ox + (b * s / 2) + (l * s * 0.3), y: oy - (l * s * 0.2) };
                const b3 = { x: ox - (b * s / 2) + (l * s * 0.3), y: oy - (l * s * 0.2) };

                const t0 = { x: ox - (a * s / 2), y: oy - h * s };
                const t1 = { x: ox + (a * s / 2), y: oy - h * s };
                const t2 = { x: ox + (a * s / 2) + (l * s * 0.3), y: oy - h * s - (l * s * 0.2) };
                const t3 = { x: ox - (a * s / 2) + (l * s * 0.3), y: oy - h * s - (l * s * 0.2) };

                return (
                    <>
                        <polygon points={poly([b0, b1, b2, b3])} fill="white" stroke="#1C1C72" strokeWidth="0.5" opacity="0.3" />
                        <polygon points={poly([b1, b2, t2, t1])} fill="#F8FAFC" stroke="#1C1C72" strokeWidth="0.8" />
                        <polygon points={poly([b0, b3, t3, t0])} fill="#F1F5F9" stroke="#1C1C72" strokeWidth="0.8" />
                        <polygon points={poly([t0, t1, t2, t3])} fill="white" stroke="#1C1C72" strokeWidth="1.2" strokeDasharray="4,2" />
                        
                        <text x={(t0.x + t1.x)/2} y={t0.y - 10} fill="#7B2DBF" fontSize="7" fontWeight="900" textAnchor="middle">TOP: {a}M</text>
                        <text x={(b0.x + b1.x)/2} y={b0.y + 15} fill="#1C1C72" fontSize="7" fontWeight="900" textAnchor="middle" opacity="0.5">BTM: {b}M</text>
                    </>
                );
            })()}
          </g>
        )}

        <HumanScale x={ox - 120} y={oy} scale={0.6} variant="3d" />
      </svg>
    </div>
  );
};
