"use client";

import React from 'react';

interface HumanScaleProps {
  x: number;
  y: number;
  scale?: number; // 1.0 is standard ~6ft height
  variant?: 'plan' | 'section' | '3d'; // Different silhouettes per drawing type
}

/**
 * Architectural human scale figure.
 * - Plan: bird's-eye circle + shoulders (top-down)
 * - Section: side-profile silhouette (elevation)
 * - 3D: front-facing stick figure (isometric/perspective)
 */
export const HumanScale: React.FC<HumanScaleProps> = ({ x, y, scale = 1.0, variant = 'section' }) => {
  const h = 60 * scale; // pixels for ~6ft
  const color = '#1C1C72'; // branding navy
  
  return (
    <g transform={`translate(${x}, ${y - h})`} className="select-none" opacity="0.15">
      {/* PLAN VIEW — bird's-eye silhouette */}
      {variant === 'plan' && (
        <>
          <circle cx="10" cy={h - 12} r="6" fill="none" stroke={color} strokeWidth="1.5" />
          <circle cx="10" cy={h - 12} r="2" fill={color} />
          {/* Shoulder line */}
          <line x1="2" y1={h - 6} x2="18" y2={h - 6} stroke={color} strokeWidth="1" />
          <text x="25" y={h - 8} fill={color} fontSize="6" fontWeight="bold" className="uppercase tracking-widest">PLAN</text>
        </>
      )}

      {/* SECTION VIEW — side-profile (elevation) */}
      {variant === 'section' && (
        <>
          <circle cx="10" cy="8" r="4" fill="none" stroke={color} strokeWidth="1.5" />
          <path d="M10 12 L10 35 M10 15 L3 26 M10 15 L17 26 M10 35 L5 55 M10 35 L15 55" 
                stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <text x="25" y="30" fill={color} fontSize="6" fontWeight="bold" className="uppercase tracking-widest">~6FT</text>
        </>
      )}

      {/* 3D VIEW — front-facing figure with depth cues */}
      {variant === '3d' && (
        <>
          <circle cx="10" cy="6" r="5" fill="none" stroke={color} strokeWidth="1" />
          {/* Body outline */}
          <path d="M5 12 L5 20 Q5 35 8 40 L5 55 M15 12 L15 20 Q15 35 12 40 L15 55 M5 12 L15 12 M3 18 L5 14 M17 18 L15 14" 
                stroke={color} strokeWidth="1" strokeLinecap="round" fill="none" />
          <text x="25" y="30" fill={color} fontSize="6" fontWeight="bold" className="uppercase tracking-widest">~6FT</text>
        </>
      )}
    </g>
  );
};
