import React from 'react';

export const AgnaaLogo = ({ className = "w-auto h-10" }: { className?: string }) => (
  <svg viewBox="0 0 4000 4000" className={className} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="AGNAA Logo">
    <title>AGNAA Logo</title>
    <defs>
      <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#7B2DBF" />
        <stop offset="100%" stopColor="#1C1C72" />
      </linearGradient>
    </defs>
    <g fill="url(#logo-gradient)">
      {/* LEFT COLUMN WITH CUTOUT */}
      <path fillRule="evenodd" d="M104.5,3397.1 L104.5,1340.9 L703.1,1108.1 L703.1,3397.1 L503.5,3397.1 L503.5,2200 L304,2200 L304,3397.1 Z M304,2000.4 L503.5,2000.4 L503.5,1399.8 L304,1477.3 Z" />
      {/* SECOND COLUMN */}
      <path fillRule="evenodd" d="M902.6,3197.6 L902.6,3397.1 L1501.1,3397.1 L1501.1,797.7 L902.6,1030.5 L902.6,2200 L1301.6,2200 L1301.6,3197.6 Z M1102.1,1167 L1301.6,1089.4 L1301.6,2000.4 L1102.1,2000.4 Z" />
      {/* CENTER TRI STRUCTURE */}
      <polygon fillRule="evenodd" points="1700.7,3397.1 1900.2,3397.1 1900.2,856.7 1999.9,817.8 2099.7,856.7 2099.7,3397.1 2299.2,3397.1 2299.2,720.1 1999.9,603.8 1700.7,720.1" />
      {/* RIGHT BLOCK */}
      <path fillRule="evenodd" d="M2498.9,1011.8 L2897.9,1167 L2897.9,2000.4 L2498.9,2000.4 L2498.9,3397.1 L3097.4,3397.1 L3097.4,1030.5 L2498.9,797.7 Z M2698.4,2200 L2897.9,2200 L2897.9,3197.6 L2698.4,3197.6 Z" />
      {/* RIGHT COLUMN WITH CUTOUT */}
      <path fillRule="evenodd" d="M3296.9,1108.1 L3895.5,1340.9 L3895.5,3397.1 L3696,3397.1 L3696,2200 L3496.5,2200 L3496.5,3397.1 L3296.9,3397.1 Z M3496.5,1399.8 L3696,1477.3 L3696,2000.4 L3496.5,2000.4 Z" />
    </g>
  </svg>
);
