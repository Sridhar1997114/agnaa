"use client";

import React, { useState } from 'react';
import { BaseCalculator } from '@/components/calculators/BaseCalculator';
import { calculateWaterTank } from '@/lib/calculator-utils';
import { Waves } from 'lucide-react';

export default function WaterTankCalculator() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [depth, setDepth] = useState('');
  
  const [isCalculated, setIsCalculated] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const d = parseFloat(depth) || 0;
    
    if (l > 0 && w > 0 && d > 0) {
      setResults({ l, w, d, ...calculateWaterTank(l, w, d) });
      setIsCalculated(true);
    }
  };

  const handleReset = () => {
    setLength('');
    setWidth('');
    setDepth('');
    setIsCalculated(false);
    setResults(null);
  };

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 1 });

  return (
    <BaseCalculator
      title="Water Tank Capacity Calculator"
      description="Calculate the volume and total water capacity in liters for rectangular water tanks."
      icon={<Waves className="w-5 h-5" />}
      isCalculated={isCalculated}
      onCalculate={handleCalculate}
      onReset={handleReset}
      pdfFileName="AGNAA_WaterTank_Report.pdf"
      pdfTitle="WATER TANK CAPACITY"
      pdfProjectInfo={{ 'DOCUMENT TYPE': 'CAPACITY ESTIMATION', 'SOURCE': 'AGNAA PRECISION ENGINE' }}
      inputsContent={
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Length (Ft)</label>
              <input type="number" value={length} onChange={(e) => {setLength(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 10" />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Width (Ft)</label>
              <input type="number" value={width} onChange={(e) => {setWidth(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 5" />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Depth / Height (Ft)</label>
            <input type="number" value={depth} onChange={(e) => {setDepth(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 6" />
          </div>
        </div>
      }
      resultsContent={
        <div className="bg-gradient-to-br from-[#1C1C72] to-[#2A1B81] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden h-full min-h-[300px] flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#7B2DBF]/20 rounded-full blur-[40px] pointer-events-none"></div>
          
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A5B4FC] mb-6">Tank Capacity</h3>
          
          <div className="space-y-4">
            <div>
              <div className="text-sm font-bold text-[#A5B4FC] mb-1">TOTAL CAPACITY</div>
              <div className="text-5xl font-black text-[#7B2DBF] brightness-125 mb-1">{fmt(results?.capacityLiters || 0)} <span className="text-lg text-gray-300">Liters</span></div>
            </div>
            <div>
              <div className="text-sm font-bold text-[#A5B4FC] mb-1">VOLUME</div>
              <div className="text-2xl font-black text-[#7B2DBF] brightness-125 mb-1">{fmt(results?.volumeCFT || 0)} <span className="text-sm text-gray-300">Cu.Ft.</span></div>
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
                <th style={{ padding:'12px', textAlign:'right', borderTopRightRadius:6 }}>SELECTION</th>
              </tr>
            </thead>
            <tbody style={{ color:'#475569' }}>
              <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
                <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>TANK LENGTH</td>
                <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.l || 0)} Ft</td>
              </tr>
              <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
                <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>TANK WIDTH</td>
                <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.w || 0)} Ft</td>
              </tr>
              <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
                <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>TANK DEPTH</td>
                <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.d || 0)} Ft</td>
              </tr>
              <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
                <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>INTERNAL VOLUME</td>
                <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.volumeCFT || 0)} CFT</td>
              </tr>
              <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
                <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>WATER CAPACITY</td>
                <td style={{ padding:'12px', textAlign:'right', fontWeight:800, color:'#7B2DBF', fontSize:14 }}>{fmt(results?.capacityLiters || 0)} Liters</td>
              </tr>
            </tbody>
          </table>
          <div style={{ marginTop:20, fontSize:9, color:'#64748B', lineHeight:1.5 }}>
            <strong>Note:</strong> Conversion factor used is 1 cubic foot = 28.3168 liters. Ensure to keep freeboard space for water overflows when analyzing max capacity.
          </div>
        </>
      }
      pdfTotalValue={`${fmt(results?.capacityLiters || 0)} Liters`}
      pdfTotalSubtitle="ESTIMATED CAPACITY"
    />
  );
}
