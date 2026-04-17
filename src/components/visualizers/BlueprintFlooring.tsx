"use client";

import React from 'react';

interface BlueprintFlooringProps {
  length: number;
  width: number;
  pattern: 'GRID' | 'DIAGONAL' | 'STAGGERED' | 'HERRINGBONE';
  tileSize: number; // inches
  unit?: 'FT' | 'M';
  showHuman?: boolean;
}

export const BlueprintFlooring: React.FC<BlueprintFlooringProps> = ({ length, width, pattern, tileSize, unit = 'FT', showHuman = true }) => {
  const s = 10;
  const canvasW = Math.min(300, length * s);
  const canvasH = Math.min(200, width * s);
  
  const ox = (400 - canvasW) / 2;
  const oy = (250 - canvasH) / 2;

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
        <div className="text-[10px] font-black text-[#1C1C72] tracking-[0.3em] uppercase mb-1">Flooring Layout // Pattern Study</div>
        <div className="text-[9px] font-bold text-[#7B2DBF] uppercase tracking-widest bg-[#7B2DBF]/10 px-2 py-0.5 rounded-full inline-block">
          {pattern} @ {tileSize}"
        </div>
      </div>

      <svg viewBox="0 0 400 250" className="w-full h-full p-8 transition-transform duration-700 group-hover:scale-[1.02]">
        <defs>
          <pattern id="gridTile" x="0" y="0" width={tileSize} height={tileSize} patternUnits="userSpaceOnUse" patternTransform="scale(0.5)">
            <rect width={tileSize} height={tileSize} fill="none" stroke="#1C1C72" strokeWidth="0.5" opacity="0.3" />
            <circle cx="0" cy="0" r="0.5" fill="#1C1C72" opacity="0.2" />
          </pattern>
          <pattern id="diagonalTile" x="0" y="0" width={tileSize} height={tileSize} patternUnits="userSpaceOnUse" patternTransform="rotate(45) scale(0.5)">
            <rect width={tileSize} height={tileSize} fill="none" stroke="#1C1C72" strokeWidth="0.5" opacity="0.3" />
          </pattern>
          <pattern id="staggeredTile" x="0" y="0" width={tileSize * 2} height={tileSize} patternUnits="userSpaceOnUse" patternTransform="scale(0.5)">
            <rect width={tileSize} height={tileSize} fill="none" stroke="#1C1C72" strokeWidth="0.5" opacity="0.3" />
            <rect x={tileSize} y={tileSize / 2} width={tileSize} height={tileSize} fill="none" stroke="#1C1C72" strokeWidth="0.5" opacity="0.3" />
          </pattern>
        </defs>

        {/* Room Area */}
        <rect x={ox} y={oy} width={canvasW} height={canvasH} fill="white" stroke="#1C1C72" strokeWidth="2" />
        
        {/* Pattern Fill */}
        <rect x={ox} y={oy} width={canvasW} height={canvasH} 
              fill={pattern === 'GRID' ? 'url(#gridTile)' : pattern === 'DIAGONAL' ? 'url(#diagonalTile)' : 'url(#staggeredTile)'} />

        {/* Dimensioning */}
        <g stroke="#1C1C72" strokeWidth="0.5" opacity="0.5">
          {/* Width */}
          <path d={`M ${ox} ${oy - 15} L ${ox + canvasW} ${oy - 15}`} />
          <path d={`M ${ox} ${oy - 20} L ${ox} ${oy - 10}`} />
          <path d={`M ${ox + canvasW} ${oy - 20} L ${ox + canvasW} ${oy - 10}`} />
          
          {/* Height */}
          <path d={`M ${ox + canvasW + 15} ${oy} L ${ox + canvasW + 15} ${oy + canvasH}`} />
          <path d={`M ${ox + canvasW + 10} ${oy} L ${ox + canvasW + 20} ${oy}`} />
          <path d={`M ${ox + canvasW + 10} ${oy + canvasH} L ${ox + canvasW + 20} ${oy + canvasH}`} />
        </g>

        {/* Numerical Labels */}
        <text x={ox + canvasW / 2} y={oy - 25} fill="#1C1C72" fontSize="7" fontWeight="bold" textAnchor="middle">{length} {unit}</text>
        <text x={ox + canvasW + 35} y={oy + canvasH / 2} fill="#1C1C72" fontSize="7" fontWeight="bold" textAnchor="middle" transform={`rotate(90 ${ox + canvasW + 35} ${oy + canvasH / 2})`}>{width} {unit}</text>

        {/* Aesthetic Corner Details */}
        <g opacity="0.2">
          <path d={`M ${ox} ${oy + 20} L ${ox} ${oy} L ${ox + 20} ${oy}`} fill="none" stroke="#1C1C72" strokeWidth="2" />
          <path d={`M ${ox + canvasW - 20} ${oy + canvasH} L ${ox + canvasW} ${oy + canvasH} L ${ox + canvasW} ${oy + canvasH - 20}`} fill="none" stroke="#1C1C72" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
};
