"use client";

import React from 'react';

interface BlueprintFootingProps {
  length: number; // in meters
  width: number;  // in meters
  depth: number;  // in meters
}

export const BlueprintFooting: React.FC<BlueprintFootingProps> = ({ length, width, depth }) => {
  // Simple 3D Isometric-ish Projection
  // Origin at 100, 150
  const ox = 150;
  const oy = 180;
  
  // Scaling (1 meter = 50px roughly)
  const s = 40;
  
  // Coordinates for a box
  // Base corners
  const p0 = { x: ox, y: oy }; // Front bottom
  const p1 = { x: ox + length * s, y: oy - (length * s * 0.3) }; // Right bottom
  const p2 = { x: ox + (length * s) - (width * s), y: oy - (length * s * 0.3) - (width * s * 0.3) }; // Back bottom
  const p3 = { x: ox - width * s, y: oy - (width * s * 0.3) }; // Left bottom

  // Top corners
  const dy = depth * s;
  const t0 = { x: p0.x, y: p0.y - dy };
  const t1 = { x: p1.x, y: p1.y - dy };
  const t2 = { x: p2.x, y: p2.y - dy };
  const t3 = { x: p3.x, y: p3.y - dy };

  // Column (centered on top)
  const colW = 0.3 * s; // 300mm column
  const cx = (t0.x + t1.x + t2.x + t3.x) / 4;
  const cy = (t0.y + t1.y + t2.y + t3.y) / 4;
  
  const c0 = { x: cx - colW, y: cy + colW * 0.3 };
  const c1 = { x: cx + colW, y: cy - colW * 0.3 };
  const c2 = { x: cx + colW - colW, y: cy - colW * 0.3 - colW * 0.3 };
  const c3 = { x: cx - colW - colW, y: cy + colW * 0.3 - colW * 0.3 };
  
  const ch = 2 * s; // Column height
  const ct0 = { x: c0.x, y: c0.y - ch };
  const ct1 = { x: c1.x, y: c1.y - ch };
  const ct2 = { x: c2.x, y: c2.y - ch };
  const ct3 = { x: c3.x, y: c3.y - ch };

  const poly = (pts: any[]) => pts.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div className="w-full aspect-video bg-[#0F172A] rounded-2xl relative overflow-hidden border-2 border-[#1C1C72] shadow-2xl">
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '15px 15px' }}></div>
      
      <div className="absolute top-4 left-4 z-10">
        <div className="text-[10px] font-black text-[#7B2DBF] tracking-[0.2em] uppercase mb-1">Footing Isometric View</div>
        <div className="text-white font-mono text-xs opacity-50">{length}m x {width}m x {depth}m</div>
      </div>

      <svg viewBox="0 0 400 250" className="w-full h-full p-4">
        {/* Footing Base Layers */}
        <polygon points={poly([p0, p1, p2, p3])} fill="#1E293B" stroke="#475569" strokeWidth="1" />
        
        {/* Footing Sides */}
        <polygon points={poly([p0, p1, t1, t0])} fill="#334155" stroke="#475569" strokeWidth="1" />
        <polygon points={poly([p1, p2, t2, t1])} fill="#1E293B" stroke="#475569" strokeWidth="1" />
        <polygon points={poly([t0, t1, t2, t3])} fill="#475569" stroke="#94A3B8" strokeWidth="1" />

        {/* Column */}
        <polygon points={poly([c0, c1, ct1, ct0])} fill="#7B2DBF" stroke="#1C1C72" strokeWidth="1" opacity="0.8" />
        <polygon points={poly([c1, c2, ct2, ct1])} fill="#1C1C72" stroke="#1C1C72" strokeWidth="1" opacity="0.9" />
        <polygon points={poly([ct0, ct1, ct2, ct3])} fill="#A5B4FC" stroke="#1C1C72" strokeWidth="1" />

        {/* Labels */}
        <line x1={p0.x} y1={p0.y + 10} x2={p1.x} y2={p1.y + 10} stroke="#7B2DBF" strokeWidth="1" />
        <text x={(p0.x + p1.x)/2} y={(p0.y + p1.y)/2 + 25} fill="#7B2DBF" fontSize="10" fontWeight="bold" textAnchor="middle">{length}m</text>
        
        <line x1={p0.x - 10} y1={p0.y} x2={t0.x - 10} y2={t0.y} stroke="#7B2DBF" strokeWidth="1" />
        <text x={p0.x - 25} y={(p0.y + t0.y)/2} fill="#7B2DBF" fontSize="10" fontWeight="bold" textAnchor="middle" transform={`rotate(-90 ${p0.x - 25} ${(p0.y + t0.y)/2})`}>{depth}m</text>
      </svg>
    </div>
  );
};
