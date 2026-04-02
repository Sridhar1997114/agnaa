"use client";

import React from 'react';

interface BlueprintRoofingProps {
  slope?: number; // degrees
  length: number; // feet
  width: number;  // feet
  type: 'TILES' | 'SHEETS' | 'RCC';
}

export const BlueprintRoofing: React.FC<BlueprintRoofingProps> = ({ slope = 25, length, width, type }) => {
  const s = 10;
  const roofL = length * s;
  const roofW = width * s;
  
  const angleRad = (slope * Math.PI) / 180;
  const height = (roofL / 2) * Math.tan(angleRad);
  
  const ox = 200;
  const oy = 180;

  // Points for a pitched roof
  const reach = roofL / 2;
  const pLeft = { x: ox - reach, y: oy };
  const pRight = { x: ox + reach, y: oy };
  const pTop = { x: ox, y: oy - height };
  
  // Depth (Isometric)
  const depth = 40;
  const pLeftD = { x: pLeft.x + depth, y: pLeft.y - depth * 0.5 };
  const pRightD = { x: pRight.x + depth, y: pRight.y - depth * 0.5 };
  const pTopD = { x: pTop.x + depth, y: pTop.y - depth * 0.5 };

  const poly = (pts: any[]) => pts.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div className="w-full aspect-video bg-[#FDFDFF] rounded-2xl relative overflow-hidden border-2 border-[#1C1C72] shadow-2xl group font-sans">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#1C1C72 1px, transparent 1px), linear-gradient(90deg, #1C1C72 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      
      <div className="absolute top-6 left-6 z-10">
        <div className="text-[10px] font-black text-[#1C1C72] tracking-[0.3em] uppercase mb-1">Roofing System // Technical Section</div>
        <div className="text-[9px] font-bold text-[#7B2DBF] uppercase tracking-widest bg-[#7B2DBF]/10 px-2 py-0.5 rounded-full inline-block">
          {type} Configuration
        </div>
      </div>

      <svg viewBox="0 0 400 250" className="w-full h-full p-8 transition-transform duration-700 group-hover:scale-[1.02]">
        <defs>
          <pattern id="tilePattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform={`rotate(${slope})`}>
            <path d="M0 5 Q5 0 10 5" fill="none" stroke="#1C1C72" strokeWidth="0.5" opacity="0.3" />
          </pattern>
          <pattern id="sheetPattern" x="0" y="0" width="8" height="250" patternUnits="userSpaceOnUse" patternTransform={`rotate(${slope})`}>
            <line x1="0" y1="0" x2="0" y2="250" stroke="#1C1C72" strokeWidth="0.5" opacity="0.2" />
          </pattern>
        </defs>

        {/* Shadow */}
        <polygon points={poly([pLeft, pRight, pRightD, pTopD, pLeftD])} fill="#1C1C72" opacity="0.05" transform="translate(4,4)" />

        {/* Roof Faces */}
        <polygon points={poly([pLeft, pTop, pTopD, pLeftD])} fill="white" stroke="#1C1C72" strokeWidth="1.5" />
        <polygon points={poly([pRight, pTop, pTopD, pRightD])} fill="#F8FAFC" stroke="#1C1C72" strokeWidth="1.5" />
        
        {/* Fill Pattern based on type */}
        <polygon points={poly([pLeft, pTop, pTopD, pLeftD])} fill={type === 'TILES' ? 'url(#tilePattern)' : type === 'SHEETS' ? 'url(#sheetPattern)' : 'none'} opacity="0.6" />
        <polygon points={poly([pRight, pTop, pTopD, pRightD])} fill={type === 'TILES' ? 'url(#tilePattern)' : type === 'SHEETS' ? 'url(#sheetPattern)' : 'none'} opacity="0.6" />

        {/* Dimension Ticks & Lines */}
        <g stroke="#1C1C72" strokeWidth="0.5" opacity="0.4">
          {/* Base Width */}
          <path d={`M ${pLeft.x} ${pLeft.y + 20} L ${pRight.x} ${pRight.y + 20}`} />
          <path d={`M ${pLeft.x} ${pLeft.y + 15} L ${pLeft.x} ${pLeft.y + 25}`} />
          <path d={`M ${pRight.x} ${pRight.y + 15} L ${pRight.x} ${pRight.y + 25}`} />
          
          {/* Vertical Height */}
          <path d={`M ${ox + 20} ${oy} L ${ox + 20} ${pTop.y}`} strokeDasharray="2,2" />
          <path d={`M ${ox + 15} ${oy} L ${ox + 25} ${oy}`} />
          <path d={`M ${ox + 15} ${pTop.y} L ${ox + 25} ${pTop.y}`} />
        </g>

        {/* Annotations */}
        <text x={ox} y={oy + 35} fill="#1C1C72" fontSize="8" fontWeight="900" textAnchor="middle" className="tracking-tighter">SPAN: {length} FT</text>
        <text x={ox + 40} y={(oy + pTop.y) / 2} fill="#7B2DBF" fontSize="8" fontWeight="900" textAnchor="start">RISE: {Math.round(height/10)} FT</text>
        <text x={pTop.x} y={pTop.y - 15} fill="#1C1C72" fontSize="7" fontWeight="black" textAnchor="middle" className="uppercase tracking-[0.2em]">Ridge Line</text>
        
        {/* Pitch callout */}
        <path d={`M ${pLeft.x + 30} ${pLeft.y} A 30 30 0 0 1 ${pLeft.x + 30 * Math.cos(angleRad)} ${pLeft.y - 30 * Math.sin(angleRad)}`} fill="none" stroke="#7B2DBF" strokeWidth="1" />
        <text x={pLeft.x + 40} y={pLeft.y - 10} fill="#7B2DBF" fontSize="9" fontWeight="black">{slope}°</text>

        {/* Scale indicator */}
        <g transform="translate(340, 230)" opacity="0.2">
          <line x1="0" y1="0" x2="20" y2="0" stroke="#1C1C72" strokeWidth="2" />
          <text x="25" y="3" fontSize="6" fontWeight="bold" fill="#1C1C72">NTS</text>
        </g>
      </svg>
    </div>
  );
};
