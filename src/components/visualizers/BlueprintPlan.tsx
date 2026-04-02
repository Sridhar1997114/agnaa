"use client";

import React from 'react';

interface BlueprintPlanProps {
  length: number;
  width: number;
  unit: string;
  label?: string;
  setbacks?: { top: number; bottom: number; left: number; right: number };
}

export const BlueprintPlan: React.FC<BlueprintPlanProps> = ({ length, width, unit, label = "Plot Plan", setbacks }) => {
  const isSquare = length > 0 && width > 0;
  const ratio = width / length;
  
  // Calculate SVG dimensions maintaining aspect ratio
  let svgW = 300;
  let svgH = 300 * (ratio || 1);
  
  if (svgH > 200) {
    svgH = 200;
    svgW = 200 / (ratio || 1);
  }

  const padding = 40;
  const rectW = svgW - padding * 2;
  const rectH = svgH - padding * 2;

  return (
    <div className="w-full bg-[#FCFDFF] rounded-2xl relative overflow-hidden border border-gray-200 shadow-inner p-6 flex flex-col items-center justify-center min-h-[300px]">
      <div className="absolute top-4 left-4">
        <div className="text-[10px] font-black text-gray-400 tracking-[0.2em] uppercase">{label}</div>
        <div className="text-[#1C1C72] font-black text-xl">{length} x {width} <span className="text-xs opacity-50">{unit}</span></div>
      </div>

      <svg width={svgW} height={svgH} viewBox={`0 0 ${svgW} ${svgH}`} className="mt-8">
        {/* Outer Boundary */}
        <rect 
          x={padding} 
          y={padding} 
          width={rectW} 
          height={rectH} 
          fill="none" 
          stroke="#1C1C72" 
          strokeWidth="3" 
          strokeDasharray="4 2"
        />

        {/* Setback Area (If provided) */}
        {setbacks && (
          <rect 
            x={padding + (setbacks.left / length * rectW)}
            y={padding + (setbacks.top / width * rectH)}
            width={rectW - ((setbacks.left + setbacks.right) / length * rectW)}
            height={rectH - ((setbacks.top + setbacks.bottom) / width * rectH)}
            fill="#7B2DBF"
            fillOpacity="0.1"
            stroke="#7B2DBF"
            strokeWidth="2"
          />
        )}

        {/* Dimension Arrows - Length */}
        <g stroke="#1C1C72" strokeWidth="1">
          <line x1={padding} y1={padding - 15} x2={svgW - padding} y2={padding - 15} />
          <line x1={padding} y1={padding - 20} x2={padding} y2={padding - 10} />
          <line x1={svgW - padding} y1={padding - 20} x2={svgW - padding} y2={padding - 10} />
        </g>
        <text x={svgW / 2} y={padding - 25} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1C1C72">{length}{unit}</text>

        {/* Dimension Arrows - Width */}
        <g stroke="#1C1C72" strokeWidth="1">
          <line x1={padding - 15} y1={padding} x2={padding - 15} y2={svgH - padding} />
          <line x1={padding - 20} y1={padding} x2={padding - 10} y2={padding} />
          <line x1={padding - 20} y1={svgH - padding} x2={padding - 10} y2={svgH - padding} />
        </g>
        <text x={padding - 25} y={svgH / 2} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1C1C72" transform={`rotate(-90 ${padding - 25} ${svgH / 2})`}>{width}{unit}</text>

        {/* Human Scale Icon (Simplified) */}
        <circle cx={svgW - padding - 20} cy={svgH - padding - 20} r="3" fill="#94A3B8" />
        <line x1={svgW - padding - 20} y1={svgH - padding - 17} x2={svgW - padding - 20} y2={svgH - padding - 10} stroke="#94A3B8" strokeWidth="1" />
      </svg>

      <div className="mt-6 flex gap-4">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-[#7B2DBF]/20 border border-[#7B2DBF] rounded-sm"></div>
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">BUILDABLE AREA</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 border border-[#1C1C72] border-dashed rounded-sm"></div>
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">PROPERTY LINE</span>
        </div>
      </div>
    </div>
  );
};
