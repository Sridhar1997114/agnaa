"use client";

import React, { useState } from 'react';
import { BaseCalculator } from '@/components/calculators/BaseCalculator';
import { calculateBuiltUpAreas } from '@/lib/calculator-utils';
import { Maximize } from 'lucide-react';

export default function BuiltUpAreaCalculator() {
  const [carpetArea, setCarpetArea] = useState('');
  const [isCalculated, setIsCalculated] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    const area = parseFloat(carpetArea) || 0;
    if (area > 0) {
      setResults(calculateBuiltUpAreas(area));
      setIsCalculated(true);
    }
  };

  const handleReset = () => {
    setCarpetArea('');
    setIsCalculated(false);
    setResults(null);
  };

  const fmt = (n: number) => Math.round(n).toLocaleString('en-IN');

  return (
    <BaseCalculator
      title="Area Conversion Calculator"
      description="Calculate Built-up and Super Built-up Area directly from your Carpet Area based on industry standard multipliers."
      icon={<Maximize className="w-5 h-5" />}
      isCalculated={isCalculated}
      onCalculate={handleCalculate}
      onReset={handleReset}
      pdfFileName={`AGNAA_Builtup_Area_${fmt(results?.carpetArea || 0)}sqft.pdf`}
      pdfTitle="Built-up Area\nCalculator"
      pdfProjectInfo={{ 'DOCUMENT TYPE': 'AREA CALCULATION', 'SOURCE': 'AGNAA PRECISION ENGINE' }}
      inputsContent={
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Carpet Area (SQFT)</label>
            <input type="number" value={carpetArea} onChange={(e) => {setCarpetArea(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 1000" />
            <p className="text-[10px] text-gray-400 mt-2 line-clamp-2">Carpet area is the net usable floor area of an apartment, excluding external walls, balcony, or utility areas.</p>
          </div>
        </div>
      }
      resultsContent={
        <div className="bg-gradient-to-br from-[#1C1C72] to-[#2A1B81] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden h-full min-h-[300px] flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#7B2DBF]/20 rounded-full blur-[40px] pointer-events-none"></div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A5B4FC] mb-6">Area Breakdown Results</h3>
          
          <div className="space-y-6">
            <div>
              <div className="text-sm font-bold text-[#A5B4FC] mb-1">CARPET AREA</div>
              <div className="text-3xl font-black">{fmt(results?.carpetArea || 0)} <span className="text-sm font-bold text-gray-400">SQFT</span></div>
            </div>
            
            <div className="border-t border-white/10 pt-4">
              <div className="text-sm font-bold text-[#A5B4FC] mb-1">BUILT-UP AREA <span className="text-[10px] text-gray-400 ml-2 font-normal">(+ ~12.5% for Walls)</span></div>
              <div className="text-4xl font-black">{fmt(results?.builtUpArea || 0)} <span className="text-sm font-bold text-gray-400">SQFT</span></div>
            </div>

            <div className="border-t border-white/10 pt-4">
              <div className="text-sm font-bold text-[#A5B4FC] mb-1">SUPER BUILT-UP AREA <span className="text-[10px] text-gray-400 ml-2 font-normal">(+ ~25% for Common Areas)</span></div>
              <div className="text-5xl font-black text-[#7B2DBF] -translate-x-[2px]">{fmt(results?.superBuiltUpArea || 0)} <span className="text-sm font-bold text-gray-400">SQFT</span></div>
            </div>
          </div>
        </div>
      }
      pdfContentTable={
        <>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:11 }}>
            <thead>
              <tr style={{ background:'#1C1C72', color:'#fff' }}>
                <th style={{ padding:'12px', textAlign:'left', borderTopLeftRadius:6 }}>PARAMETER</th>
                <th style={{ padding:'12px', textAlign:'right', borderTopRightRadius:6 }}>AREA (SQFT)</th>
              </tr>
            </thead>
            <tbody style={{ color:'#475569' }}>
              <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
                <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>CARPET AREA</td>
                <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.carpetArea || 0)}</td>
              </tr>
              <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
                <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>
                  BUILT-UP AREA
                  <div style={{ fontSize:8, color:'#94A3B8', marginTop:2 }}>Carpet Area + Walls + Balconies (~12.5%)</div>
                </td>
                <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.builtUpArea || 0)}</td>
              </tr>
              <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
                <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>
                  SUPER BUILT-UP AREA
                  <div style={{ fontSize:8, color:'#94A3B8', marginTop:2 }}>Built-up Area + Common Amenities (~25%)</div>
                </td>
                <td style={{ padding:'12px', textAlign:'right', fontWeight:600, color:'#7B2DBF' }}>{fmt(results?.superBuiltUpArea || 0)}</td>
              </tr>
            </tbody>
          </table>
        </>
      }
      pdfTotalValue={`${fmt(results?.superBuiltUpArea || 0)} SQFT`}
      pdfTotalSubtitle="TOTAL SUPER BUILT-UP AREA"
    />
  );
}
