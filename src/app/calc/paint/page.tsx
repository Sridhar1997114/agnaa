"use client";

import React, { useState } from 'react';
import { BaseCalculator } from '@/components/calculators/BaseCalculator';
import { calculatePaint } from '@/lib/calculator-utils';
import { Palette } from 'lucide-react';
import { Odometer } from '@/components/ui/Odometer';

export default function PaintCalculator() {
  const [carpetArea, setCarpetArea] = useState('');
  
  const [isCalculated, setIsCalculated] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    const a = parseFloat(carpetArea) || 0;
    
    if (a > 0) {
      setResults({ a, ...calculatePaint(a) });
      setIsCalculated(true);
    }
  };

  const handleReset = () => {
    setCarpetArea('');
    setIsCalculated(false);
    setResults(null);
  };

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 1 });

  return (
    <BaseCalculator
      title="Paint Calculator"
      description="Estimate the required quantities of paint, putty, and primer for a residential or commercial space based on carpet area."
      icon={<Palette className="w-5 h-5" />}
      isCalculated={isCalculated}
      onCalculate={handleCalculate}
      onReset={handleReset}
      pdfFileName="AGNAA_Paint_Report.pdf"
      pdfTitle="PAINT ESTIMATION"
      pdfProjectInfo={{ 'DOCUMENT TYPE': 'MATERIAL ESTIMATION', 'SOURCE': 'AGNAA PRECISION ENGINE' }}
      visualizerType="PAINT"
      visualizerData={{ area: results?.a, unit: 'FT' }}
      inputsContent={
        <div className="space-y-6">
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Total Carpet Area (SQFT)</label>
            <input type="number" value={carpetArea} onChange={(e) => {setCarpetArea(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 1000" />
            <p className="text-[10px] text-gray-400 mt-2">Surface area to be painted is generally estimated at 3.5 times the carpet area, which includes walls and ceilings.</p>
          </div>
        </div>
      }
      resultsContent={
        <div className="bg-gradient-to-br from-[#1C1C72] to-[#2A1B81] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden h-full min-h-[300px] flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#7B2DBF]/20 rounded-full blur-[40px] pointer-events-none"></div>
          
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A5B4FC] mb-6">Required Materials</h3>
          
          <div className="space-y-4">
            <div>
              <div className="text-sm font-bold text-[#A5B4FC] mb-1">PAINT (Total Liters)</div>
              <div className="text-4xl font-black text-[#7B2DBF] brightness-125 mb-1"><Odometer value={results?.paintLiters || 0} decimals={1} /> <span className="text-lg text-gray-300">Liters</span></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs font-bold text-[#A5B4FC] mb-1">PUTTY</div>
                <div className="text-2xl font-black text-white"><Odometer value={results?.puttyKg || 0} decimals={1} /> <span className="text-sm text-gray-300">Kg</span></div>
              </div>
              <div>
                <div className="text-xs font-bold text-[#A5B4FC] mb-1">PRIMER</div>
                <div className="text-2xl font-black text-white"><Odometer value={results?.primerLiters || 0} decimals={1} /> <span className="text-sm text-gray-300">Liters</span></div>
              </div>
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
                <th style={{ padding:'12px', textAlign:'right', borderTopRightRadius:6 }}>ESTIMATE</th>
              </tr>
            </thead>
            <tbody style={{ color:'#475569' }}>
              <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
                <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>CARPET AREA</td>
                <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.a || 0)} SQFT</td>
              </tr>
              <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
                <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>ESTIMATED PAINT AREA</td>
                <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.paintAreaSqft || 0)} SQFT</td>
              </tr>
              <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
                <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>TOTAL PAINT</td>
                <td style={{ padding:'12px', textAlign:'right', fontWeight:800, color:'#7B2DBF', fontSize:14 }}>{fmt(results?.paintLiters || 0)} Liters</td>
              </tr>
              <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
                <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>TOTAL PUTTY</td>
                <td style={{ padding:'12px', textAlign:'right', fontWeight:800, color:'#7B2DBF', fontSize:14 }}>{fmt(results?.puttyKg || 0)} Kg</td>
              </tr>
              <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
                <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>TOTAL PRIMER</td>
                <td style={{ padding:'12px', textAlign:'right', fontWeight:800, color:'#7B2DBF', fontSize:14 }}>{fmt(results?.primerLiters || 0)} Liters</td>
              </tr>
            </tbody>
          </table>
          <div style={{ marginTop:20, fontSize:9, color:'#64748B', lineHeight:1.5 }}>
            <strong>Note:</strong> Typical paint coverage assumes 80 sqft per liter for 2 coats. Putty covers roughly 15 sqft per kg. Primer covers roughly 120 sqft per liter. Actual quantities may vary based on surface condition and application method.
          </div>
        </>
      }
      pdfTotalValue={`${fmt(results?.paintLiters || 0)} Liters`}
      pdfTotalSubtitle="ESTIMATED PAINT QUANTITY"
    />
  );
}
