"use client";

import { HumanScale } from './HumanScale';

interface BlueprintTankProps {
  length: number;
  width: number;
  depth: number;
  label?: string;
  isCircular?: boolean;
  showHuman?: boolean;
}

export const BlueprintTank: React.FC<BlueprintTankProps> = ({ length, width, depth, label = "Septic Tank", isCircular = false, showHuman = true }) => {
  // SVG drawing logic for a 3D rectangular or circular tank
  const ox = 150;
  const oy = 180;
  const s = 1.5; // multiplier
  
  // Scale factor based on max dimension
  const maxDim = Math.max(length, width, depth);
  const scale = 80 / (maxDim || 1);
  
  const l = length * scale;
  const w = width * scale;
  const d = depth * scale;

  const poly = (pts: any[]) => pts.map(p => `${p.x},${p.y}`).join(' ');

  // Corners
  const p0 = { x: ox, y: oy };
  const p1 = { x: ox + l, y: oy - l * 0.3 };
  const p2 = { x: ox + l - w, y: oy - l * 0.3 - w * 0.3 };
  const p3 = { x: ox - w, y: oy - w * 0.3 };

  // Top corners
  const t0 = { x: p0.x, y: p0.y - d };
  const t1 = { x: p1.x, y: p1.y - d };
  const t2 = { x: p2.x, y: p2.y - d };
  const t3 = { x: p3.x, y: p3.y - d };

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
      
      <div className="absolute top-4 left-4 z-10">
        <div className="text-[10px] font-black text-[#7B2DBF] tracking-[0.2em] uppercase mb-1">{label} Draft</div>
        <div className="text-white font-mono text-xs opacity-50">{length} x {width} x {depth} Units</div>
      </div>

      <svg viewBox="0 0 400 250" className="w-full h-full p-4 transition-transform duration-700 group-hover:scale-[1.02]">
        {/* Human Scale (Optional) */}
        {showHuman && (
          <HumanScale x={ox - 100} y={oy} scale={0.6} variant="3d" />
        )}

        {/* Tank Body (Inside) */}
        {!isCircular ? (
          <>
            <polygon points={poly([p0, p1, p2, p3])} fill="#020617" stroke="#1E293B" strokeWidth="1" />
            <polygon points={poly([p1, p2, t2, t1])} fill="#1E293B" stroke="#334155" strokeWidth="1" />
            <polygon points={poly([p0, p3, t3, t0])} fill="#0F172A" stroke="#334155" strokeWidth="1" />
            
            {/* Water Level (Halfway) */}
            <polygon 
              points={poly([
                {x: (p0.x+t0.x)/2, y: (p0.y+t0.y)/2},
                {x: (p1.x+t1.x)/2, y: (p1.y+t1.y) / 2},
                {x: (p2.x+t2.x)/2, y: (p2.y+t2.y) / 2},
                {x: (p3.x+t3.x)/2, y: (p3.y+t3.y) / 2}
              ])} 
              fill="#7B2DBF" opacity="0.3" 
            />

            {/* Top Slab Outline */}
            <polygon points={poly([t0, t1, t2, t3])} fill="none" stroke="#7B2DBF" strokeWidth="2" strokeDasharray="4 2" />
          </>
        ) : (
          <ellipse cx={ox} cy={oy - d/2} rx={l/2} ry={w/2} fill="#1E293B" stroke="#7B2DBF" strokeWidth="2" />
        )}

        {/* Dimension Lines */}
        <line x1={p0.x} y1={p0.y + 10} x2={p1.x} y2={p1.y + 10} stroke="#7B2DBF" strokeWidth="1" />
        <text x={(p0.x+p1.x)/2} y={(p0.y+p1.y)/2 + 25} fill="#7B2DBF" fontSize="9" fontWeight="bold" textAnchor="middle">{length}</text>

        <line x1={p0.x - 10} y1={p0.y} x2={p0.x - 10} y2={t0.y} stroke="#7B2DBF" strokeWidth="1" />
        <text x={p0.x - 22} y={(p0.y+t0.y)/2} fill="#7B2DBF" fontSize="9" fontWeight="bold" textAnchor="middle" transform={`rotate(-90 ${p0.x - 22} ${(p0.y+t0.y)/2})`}>{depth}</text>
      </svg>
    </div>
  );
};
