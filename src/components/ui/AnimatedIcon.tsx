"use client";

import React from 'react';
import { motion } from 'framer-motion';

export type IconType = 
  | 'spatial' 
  | 'structural' 
  | 'masonry' 
  | 'mep' 
  | 'finance' 
  | 'geometry'
  | 'brick'
  | 'concrete'
  | 'steel'
  | 'foundation'
  | 'fsi'
  | 'paint'
  | 'tiles'
  | 'electrical'
  | 'hvac'
  | 'plumbing'
  | 'tank'
  | 'landscaping'
  | 'pool'
  | 'scaffolding'
  | 'shuttering'
  | 'excavation';

interface AnimatedIconProps {
  type: IconType;
  className?: string;
  isHovered?: boolean;
}

const iconPaths: Record<string, React.ReactNode> = {
  spatial: (
    <>
      <motion.rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" fill="none" strokeWidth="2" />
      <motion.path d="M3 9h18M9 3v18M15 3v18" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      <motion.circle 
        cx="12" cy="12" r="3" 
        stroke="#7B2DBF" strokeWidth="2" fill="none"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
    </>
  ),
  structural: (
    <>
      <motion.path d="M2 20h20M7 20V4h10v16M12 4v16" stroke="currentColor" strokeWidth="2" fill="none" />
      <motion.path 
        d="M7 8h10M7 12h10M7 16h10" 
        stroke="#7B2DBF" strokeWidth="2" 
        initial={{ pathLength: 0 }}
        whileHover={{ pathLength: 1 }}
      />
    </>
  ),
  masonry: (
    <>
      <motion.rect x="3" y="3" width="18" height="6" rx="1" stroke="currentColor" fill="none" strokeWidth="2" />
      <motion.rect x="3" y="11" width="8" height="6" rx="1" stroke="currentColor" fill="none" strokeWidth="2" />
      <motion.rect x="13" y="11" width="8" height="6" rx="1" stroke="currentColor" fill="none" strokeWidth="2" />
      <motion.path 
        d="M3 19h18" 
        stroke="#7B2DBF" strokeWidth="2"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 2 }}
      />
    </>
  ),
  mep: (
    <>
      <motion.path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />
      <motion.circle 
        cx="12" cy="12" r="5" 
        stroke="#7B2DBF" strokeWidth="2" fill="none"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
      />
      <motion.path d="M12 7v10M7 12h10" stroke="currentColor" strokeWidth="2" />
    </>
  ),
  finance: (
    <>
      <motion.path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="2" fill="none" />
      <motion.circle 
        cx="12" cy="12" r="9" 
        stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" 
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      />
    </>
  ),
  geometry: (
    <>
      <motion.path d="M12 2L2 22h20L12 2z" stroke="currentColor" strokeWidth="2" fill="none" />
      <motion.circle 
        cx="12" cy="14" r="4" 
        stroke="#7B2DBF" strokeWidth="2" fill="none"
        whileHover={{ scale: 1.2, strokeWidth: 3 }}
      />
    </>
  ),
  brick: (
    <>
      <motion.rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" fill="none" strokeWidth="2" />
      <motion.path d="M3 9h18M3 15h18M9 3v6M15 9v6M9 15v6" stroke="#7B2DBF" strokeWidth="1.5" />
    </>
  ),
  concrete: (
    <motion.path 
      d="M12 2L2 7v10l10 5 10-5V7L12 2z" 
      stroke="currentColor" strokeWidth="2" fill="none"
      animate={{ rotateY: [0, 360] }}
      transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
    />
  ),
  steel: (
    <>
      <motion.path d="M4 4h16M4 8h16M4 12h16M4 16h16M4 20h16" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      <motion.path d="M10 2v20M14 2v20" stroke="#7B2DBF" strokeWidth="3" />
    </>
  ),
  foundation: (
    <>
      <motion.path d="M2 20h20M4 20v-4h16v4M8 16V8h8v8" stroke="currentColor" strokeWidth="2" fill="none" />
      <motion.path d="M10 8V4h4v4" stroke="#7B2DBF" strokeWidth="2" />
    </>
  ),
  fsi: (
    <>
      <motion.path d="M3 21h18M5 21V3h14v18" stroke="currentColor" strokeWidth="2" fill="none" />
      <motion.path d="M9 7h6M9 11h6M9 15h6" stroke="#7B2DBF" strokeWidth="2" />
    </>
  ),
  paint: (
    <>
      <motion.path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" strokeWidth="2" fill="none" />
      <motion.circle cx="12" cy="12" r="3" fill="#7B2DBF" />
    </>
  ),
  tiles: (
    <>
      <motion.rect x="3" y="3" width="8" height="8" stroke="currentColor" strokeWidth="1.5" />
      <motion.rect x="13" y="3" width="8" height="8" stroke="currentColor" strokeWidth="1.5" />
      <motion.rect x="3" y="13" width="8" height="8" stroke="currentColor" strokeWidth="1.5" />
      <motion.rect x="13" y="13" width="8" height="8" stroke="currentColor" strokeWidth="1.5" />
      <motion.path d="M11 3v18M3 11h18" stroke="#7B2DBF" strokeWidth="1" />
    </>
  ),
  electrical: (
    <>
      <motion.path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#7B2DBF" strokeWidth="2" fill="none" />
    </>
  ),
  hvac: (
    <motion.circle 
      cx="12" cy="12" r="9" 
      stroke="currentColor" strokeWidth="2" 
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
    />
  ),
  tank: (
    <>
      <motion.path d="M4 11a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="2" />
      <motion.rect x="4" y="11" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
      <motion.path 
        d="M6 14h12M6 17h12" 
        stroke="#7B2DBF" strokeWidth="2" 
        animate={{ opacity: [0.2, 0.8, 0.2] }}
        transition={{ repeat: Infinity, duration: 3 }}
      />
    </>
  ),
  landscaping: (
    <>
      <motion.path d="M12 2L2 7v10l10 5 10-5V7L12 2z" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <motion.circle cx="12" cy="12" r="4" stroke="#22C55E" strokeWidth="2" />
    </>
  ),
  pool: (
    <>
      <motion.path d="M22 12c-4 0-4-4-8-4s-4 4-8 4-4-4-8-4M22 16c-4 0-4-4-8-4s-4 4-8 4-4-4-8-4" stroke="#3B82F6" strokeWidth="2" />
    </>
  ),
  scaffolding: (
    <>
      <motion.path d="M4 2v20M20 2v20M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" />
      <motion.path d="M4 6l16 6M4 12l16 6" stroke="#7B2DBF" strokeWidth="1" strokeDasharray="4 2" />
    </>
  ),
  shuttering: (
    <>
      <motion.rect x="4" y="4" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" />
      <motion.path d="M12 4v16M4 12h16" stroke="#7B2DBF" strokeWidth="1" />
    </>
  ),
  excavation: (
    <>
      <motion.path d="M2 20h20l-4-12H6L2 20z" stroke="currentColor" strokeWidth="2" fill="none" />
      <motion.path d="M6 8V4h12v4" stroke="#7B2DBF" strokeWidth="2" />
    </>
  )
};

export const AnimatedIcon: React.FC<AnimatedIconProps> = ({ type, className = "w-6 h-6", isHovered }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <motion.g
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 10 }}
        >
          {iconPaths[type] || iconPaths['spatial']}
        </motion.g>
      </svg>
    </div>
  );
};
