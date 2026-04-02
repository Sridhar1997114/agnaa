"use client";

import React, { useState } from 'react';
import { BaseCalculator } from '@/components/calculators/BaseCalculator';
import { calculatePlotAreaRectangular } from '@/lib/calculator-utils';
import { Square } from 'lucide-react';

export default function PlotAreaCalculator() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [isCalculated, setIsCalculated] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    if (l > 0 && w > 0) {
      setResults(calculatePlotAreaRectangular(l, w));
      setIsCalculated(true);
    }
  };

  const handleReset = () => {
    setLength('');
    setWidth('');
    setIsCalculated(false);
    setResults(null);
  };

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 2 });

  return (
    <BaseCalculator
      title="Plot Area Calculator"
      description="Quickly determine the total area of your plot in various standard units (SqFt, SqYards, Acres, Guntas)."
      icon={<Square className="w-5 h-5" />}
      isCalculated={isCalculated}
      onCalculate={handleCalculate}
      onReset={handleReset}
      pdfFileName={`AGNAA_Plot_Area_${fmt(results?.sqft || 0)}sqft.pdf`}
      pdfTitle="Plot Area\nCalculator"
      pdfProjectInfo={{ 'DOCUMENT TYPE': 'AREA CALCULATION', 'SOURCE': 'AGNAA PRECISION ENGINE' }}
      inputsContent={
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Length (FT)</label>
            <input type="number" value={length} onChange={(e) => {setLength(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 40" />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Width (FT)</label>
            <input type="number" value={width} onChange={(e) => {setWidth(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 60" />
          </div>
        </div>
      }
      resultsContent={
        <div className="bg-gradient-to-br from-[#1C1C72] to-[#2A1B81] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden h-full min-h-[300px] flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#7B2DBF]/20 rounded-full blur-[40px] pointer-events-none"></div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A5B4FC] mb-6">Calculated Area Results</h3>
          
          <div className="text-5xl font-black mb-1">{fmt(results?.sqft || 0)}</div>
          <div className="text-sm font-bold text-[#A5B4FC] mb-8">SQUARE FEET</div>

          <div className="grid grid-cols-2 gap-y-6 gap-x-4">
            <div>
              <div className="text-2xl font-bold">{fmt(results?.sqyards || 0)}</div>
              <div className="text-[9px] font-bold text-[#A5B4FC] uppercase tracking-widest">Square Yards</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{fmt(results?.sqm || 0)}</div>
              <div className="text-[9px] font-bold text-[#A5B4FC] uppercase tracking-widest">Square Meters</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{fmt(results?.guntas || 0)}</div>
              <div className="text-[9px] font-bold text-[#A5B4FC] uppercase tracking-widest">Guntas</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{fmt(results?.acres || 0)}</div>
              <div className="text-[9px] font-bold text-[#A5B4FC] uppercase tracking-widest">Acres</div>
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
                <th style={{ padding:'12px', textAlign:'right', borderTopRightRadius:6 }}>VALUE</th>
              </tr>
            </thead>
            <tbody style={{ color:'#475569' }}>
              <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
                <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>PLOT LENGTH</td>
                <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{length} FT</td>
              </tr>
              <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
                <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>PLOT WIDTH</td>
                <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{width} FT</td>
              </tr>
              <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
                <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>AREA (SQUARE YARDS)</td>
                <td style={{ padding:'12px', textAlign:'right', fontWeight:600, color:'#7B2DBF' }}>{fmt(results?.sqyards || 0)} SQYD</td>
              </tr>
              <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
                <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>AREA (SQUARE METERS)</td>
                <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.sqm || 0)} SQM</td>
              </tr>
              <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
                <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>AREA (GUNTAS)</td>
                <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.guntas || 0)} GUNTAS</td>
              </tr>
              <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
                <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>AREA (ACRES)</td>
                <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.acres || 0)} ACRES</td>
              </tr>
            </tbody>
          </table>
        </>
      }
      pdfTotalValue={`${fmt(results?.sqft || 0)} SQFT`}
      pdfTotalSubtitle="TOTAL PRECISE AREA"
    />
  );
}
