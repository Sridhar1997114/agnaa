"use client";

import { HumanScale } from './HumanScale';

interface BlueprintStairsProps {
  rise: number; // in mm or inches
  tread: number; // in mm or inches
  steps: number;
  showHuman?: boolean;
}

export const BlueprintStairs: React.FC<BlueprintStairsProps> = ({ rise, tread, steps, showHuman = true }) => {
  const scale = 150 / (steps * Math.max(rise, tread));
  const s = Math.min(scale, 15); // limit scale
  
  const startX = 50;
  const startY = 200;

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
        <div className="text-[10px] font-black text-[#7B2DBF] tracking-[0.2em] uppercase mb-1">Staircase Profile</div>
        <div className="text-white font-mono text-xs opacity-50">Rise: {rise}" | Tread: {tread}" | {steps} Steps</div>
      </div>

      <svg viewBox="0 0 400 250" className="w-full h-full p-8 transition-transform duration-700 group-hover:scale-[1.02]">
        {/* Concrete Fill */}
        <path 
          d={`M ${startX} ${startY} 
             ${[...Array(steps)].map((_, i) => 
               `L ${startX + i * tread * s} ${startY - (i + 1) * rise * s} 
                L ${startX + (i + 1) * tread * s} ${startY - (i + 1) * rise * s}`
             ).join(' ')} 
             L ${startX + steps * tread * s} ${startY} Z`}
          fill="#1E293B"
          stroke="#475569"
          strokeWidth="2"
        />

        {/* Human Scale (Optional) */}
        {showHuman && (
          <HumanScale x={startX - 30} y={startY} scale={0.65} variant="section" />
        )}

        {/* Step highlights */}
        {[...Array(steps)].map((_, i) => (
          <g key={i}>
            <line 
              x1={startX + i * tread * s} y1={startY - (i + 1) * rise * s} 
              x2={startX + (i + 1) * tread * s} y2={startY - (i + 1) * rise * s} 
              stroke="#7B2DBF" strokeWidth="2" 
            />
            <line 
              x1={startX + i * tread * s} y1={startY - i * rise * s} 
              x2={startX + i * tread * s} y2={startY - (i + 1) * rise * s} 
              stroke="#A5B4FC" strokeWidth="1" opacity="0.5"
            />
          </g>
        ))}

        {/* Dimension Labels on the first step */}
        <text x={startX + (tread * s) / 2} y={startY - (rise * s) - 5} fill="#7B2DBF" fontSize="8" fontWeight="bold" textAnchor="middle">
          TREAD {tread}
        </text>
        <text x={startX - 10} y={startY - (rise * s) / 2} fill="#A5B4FC" fontSize="8" fontWeight="bold" textAnchor="end" transform={`rotate(-90 ${startX - 10} ${startY - (rise * s) / 2})`}>
          RISE {rise}
        </text>

        {/* Total dimensions */}
        <g stroke="#475569" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.5">
          <line x1={startX} y1={startY + 20} x2={startX + steps * tread * s} y2={startY + 20} />
          <line x1={startX + steps * tread * s + 20} y1={startY} x2={startX + steps * tread * s + 20} y2={startY - steps * rise * s} />
        </g>
        <text x={startX + (steps * tread * s) / 2} y={startY + 35} fill="#94A3B8" fontSize="10" textAnchor="middle" fontWeight="black" className="uppercase tracking-widest">
          Total Length: {tread * steps}
        </text>
      </svg>
    </div>
  );
};
