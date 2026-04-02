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
  const s = 40; // scale factor
  const ox = 200;
  const oy = 180;

  const poly = (pts: {x: number, y: number}[]) => pts.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div className="w-full aspect-video bg-[#0F172A] rounded-2xl relative overflow-hidden border-2 border-[#1C1C72] shadow-2xl group">
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '15px 15px' }}></div>
      
      <div className="absolute top-4 left-4 z-10">
        <div className="text-[10px] font-black text-[#7B2DBF] tracking-[0.2em] uppercase mb-1">Volumetric Drafting // {shape}</div>
        <div className="text-white font-mono text-[10px] opacity-50 uppercase">Precision Geometry Engine</div>
      </div>

      <svg viewBox="0 0 400 250" className="w-full h-full p-8 transition-transform duration-700 group-hover:scale-[1.05]">
        {/* CYLINDER */}
        {shape === 'cylinder' && (
          <g>
            <ellipse cx={ox} cy={oy} rx={r * s} ry={r * s * 0.4} fill="#1E293B" stroke="#334155" strokeWidth="1" />
            <rect x={ox - r * s} y={oy - h * s} width={r * s * 2} height={h * s} fill="#1E293B" stroke="none" />
            <line x1={ox - r * s} y1={oy} x2={ox - r * s} y2={oy - h * s} stroke="#3B82F6" strokeWidth="1.5" />
            <line x1={ox + r * s} y1={oy} x2={ox + r * s} y2={oy - h * s} stroke="#3B82F6" strokeWidth="1.5" />
            <ellipse cx={ox} cy={oy - h * s} rx={r * s} ry={r * s * 0.4} fill="#0F172A" stroke="#3B82F6" strokeWidth="2" />
            
            {/* Dimensions */}
            <line x1={ox} y1={oy - h * s} x2={ox + r * s} y2={oy - h * s} stroke="#A5B4FC" strokeWidth="1" strokeDasharray="2,2" />
            <text x={ox + (r * s / 2)} y={oy - h * s - 5} fill="#A5B4FC" fontSize="8" fontWeight="bold" textAnchor="middle">R: {r}M</text>
            <line x1={ox + r * s + 15} y1={oy} x2={ox + r * s + 15} y2={oy - h * s} stroke="#A5B4FC" strokeWidth="1" />
            <text x={ox + r * s + 25} y={oy - (h * s / 2)} fill="#A5B4FC" fontSize="8" fontWeight="bold" transform={`rotate(-90 ${ox + r * s + 25} ${oy - (h * s / 2)})`}>H: {h}M</text>
          </g>
        )}

        {/* CONE */}
        {shape === 'cone' && (
          <g>
            <ellipse cx={ox} cy={oy} rx={r * s} ry={r * s * 0.4} fill="#1E293B" stroke="#334155" strokeWidth="1" />
            <path d={`M ${ox - r * s} ${oy} L ${ox} ${oy - h * s} L ${ox + r * s} ${oy} Z`} fill="#1E293B" stroke="#3B82F6" strokeWidth="2" />
            
            {/* Dimensions */}
            <line x1={ox} y1={oy} x2={ox + r * s} y2={oy} stroke="#A5B4FC" strokeWidth="1" strokeDasharray="2,2" />
            <text x={ox + (r * s / 2)} y={oy + 15} fill="#A5B4FC" fontSize="8" fontWeight="bold" textAnchor="middle">R: {r}M</text>
            <line x1={ox} y1={oy} x2={ox} y2={oy - h * s} stroke="#A5B4FC" strokeWidth="1" strokeDasharray="4,2" />
            <text x={ox - 10} y={oy - (h * s / 2)} fill="#A5B4FC" fontSize="8" fontWeight="bold" textAnchor="end">H: {h}M</text>
          </g>
        )}

        {/* TRAPEZOIDAL */}
        {shape === 'trapezoidal' && (
          <g>
            {/* Logic: Top width a, btm width b, length l, height h */}
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
                        <polygon points={poly([b0, b1, b2, b3])} fill="#020617" stroke="#1E293B" />
                        <polygon points={poly([b1, b2, t2, t1])} fill="#1E293B" stroke="#334155" />
                        <polygon points={poly([b0, b3, t3, t0])} fill="#0F172A" stroke="#334155" />
                        <polygon points={poly([t0, t1, t2, t3])} fill="none" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4,2" />
                        
                        {/* Dim Labels */}
                        <text x={(t0.x + t1.x)/2} y={t0.y - 10} fill="#3B82F6" fontSize="7" fontWeight="black" textAnchor="middle">TOP: {a}M</text>
                        <text x={(b0.x + b1.x)/2} y={b0.y + 15} fill="#A5B4FC" fontSize="7" fontWeight="bold" textAnchor="middle">BTM: {b}M</text>
                    </>
                );
            })()}
          </g>
        )}

        <HumanScale x={ox - 120} y={oy} scale={0.6} />
      </svg>
    </div>
  );
};
