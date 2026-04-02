"use client";

import React from 'react';

interface AnalyticsChartProps {
  data: { label: string; value: number; color: string }[];
  title?: string;
  type?: 'donut' | 'bar';
}

export const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ data, title, type = 'donut' }) => {
  const total = data.reduce((acc, item) => acc + item.value, 0);
  let currentAngle = 0;

  return (
    <div className="w-full bg-[#0F172A] rounded-2xl p-6 border-2 border-[#1C1C72] shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '15px 15px' }}></div>
      
      {title && <div className="text-[10px] font-black text-[#A5B4FC] tracking-[0.2em] uppercase mb-6">{title}</div>}

      <div className="flex items-center justify-between gap-8">
        <div className="relative w-32 h-32 flex-shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
            {data.map((item, i) => {
              const angle = (item.value / (total || 1)) * 360;
              const x1 = 50 + 40 * Math.cos((currentAngle * Math.PI) / 180);
              const y1 = 50 + 40 * Math.sin((currentAngle * Math.PI) / 180);
              const x2 = 50 + 40 * Math.cos(((currentAngle + angle) * Math.PI) / 180);
              const y2 = 50 + 40 * Math.sin(((currentAngle + angle) * Math.PI) / 180);
              
              const largeArcFlag = angle > 180 ? 1 : 0;
              const pathData = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
              
              const path = (
                <path 
                  key={i}
                  d={pathData}
                  fill={item.color}
                  className="transition-all duration-500 hover:opacity-80 cursor-pointer"
                />
              );
              currentAngle += angle;
              return path;
            })}
            <circle cx="50" cy="50" r="25" fill="#0F172A" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
             <div className="text-[10px] font-bold text-gray-400">TOTAL</div>
             <div className="text-xs font-black text-white">{total > 100000 ? (total/100000).toFixed(1) + 'L' : total}</div>
          </div>
        </div>

        <div className="flex-1 space-y-3">
          {data.map((item, i) => (
            <div key={i} className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                <div className="font-bold text-gray-300 uppercase tracking-tighter">{item.label}</div>
              </div>
              <div className="font-black text-white">{((item.value / (total || 1)) * 100).toFixed(0)}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
