"use client";

import React from 'react';

interface HumanScaleProps {
  x: number;
  y: number;
  scale?: number; // 1.0 is standard ~6ft height
}

export const HumanScale: React.FC<HumanScaleProps> = ({ x, y, scale = 1.0 }) => {
  const h = 60 * scale; // pixels for ~6ft
  
  return (
    <g transform={`translate(${x}, ${y - h})`} className="opacity-40 select-none">
      {/* Abstract human silhouette for scale */}
      <circle cx="10" cy="8" r="4" fill="#A5B4FC" />
      <path d="M10 12 L10 35 M10 15 L2 25 M10 15 L18 25 M10 35 L5 55 M10 35 L15 55" 
            stroke="#A5B4FC" strokeWidth="2" strokeLinecap="round" fill="none" />
      <text x="25" y="30" fill="#A5B4FC" fontSize="8" fontWeight="bold">HUMAN SCALE (~6FT)</text>
    </g>
  );
};
