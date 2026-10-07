"use client";

import React, { useState } from 'react';
import { BaseCalculator } from '@/components/calculators/BaseCalculator';
import { calculatePaint } from '@/lib/calculator-utils';
import { Grid } from 'lucide-react';
import { Odometer } from '@/components/ui/Odometer';

export default function PaintCalculator() {
  const [carpetArea, setCarpetArea] = useState('1500');
  
  const [isCalculated, setIsCalculated] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    const area = parseFloat(carpetArea) || 0;

    if (area > 0) {
      const res = calculatePaint(area);
      setResults({ area, ...res });
      setIsCalculated(true);
    }
  };

  const handleReset = () => {
    setCarpetArea('1500');
    setIsCalculated(false);
    setResults(null);
  };

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 1 });

  return (
    <BaseCalculator
      title="Paint & Wall Finish Estimator"
      description="Calculate primer liters, wall putty kg, and emulsion paint quantity based on home carpet area."
      icon={<Grid className="w-5 h-5" />}
      isCalculated={isCalculated}
      onCalculate={handleCalculate}
      onReset={handleReset}
      pdfFileName="AGNAA_Paint_Estimator_Report.pdf"
      pdfTitle="Paint & Wall Finish\nQuantity Estimate"
      pdfProjectInfo={{ 'DOCUMENT TYPE': 'INTERIOR FINISH ESTIMATE', 'SOURCE': 'AGNAA PRECISION ENGINE' }}
      visualizerType="PAINT"
      visualizerData={{ 
        paintAreaSqft: results?.paintAreaSqft || (parseFloat(carpetArea) * 3.5),
        paintLiters: results?.paintLiters || 0,
      }}
      inputsContent={
        <div className="space-y-6">
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Total Carpet Area (SQFT)</label>
            <input type="number" value={carpetArea} onChange={(e) => {setCarpetArea(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 1500" />
            <p className="text-[10px] text-gray-400 mt-2">Calculates 3.5x multiplier for walls and ceilings automatically.</p>
          </div>
        </div>
      }
      resultsContent={
        <div className="bg-gradient-to-br from-[#1C1C72] to-[#2A1B81] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden h-full min-h-[300px] flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#7B2DBF]/20 rounded-full blur-[40px] pointer-events-none"></div>
          
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A5B4FC] mb-4">REQUIRED EMULSION PAINT</h3>
            <div className="text-5xl font-black text-[#7B2DBF] brightness-125 mb-1">
              <Odometer value={results?.paintLiters || 0} decimals={1} /> <span className="text-lg text-gray-300">LITERS</span>
            </div>
            <p className="text-xs text-gray-300 font-medium">For total surface area of {fmt(results?.paintAreaSqft || 0)} Sq.Ft (2 Coats).</p>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
            <div>
              <div className="text-[10px] font-black text-[#A5B4FC] uppercase tracking-widest">Wall Putty</div>
              <div className="text-2xl font-black text-white"><Odometer value={results?.puttyKg || 0} decimals={0} /> kg</div>
            </div>
            <div>
              <div className="text-[10px] font-black text-[#A5B4FC] uppercase tracking-widest">Wall Primer</div>
              <div className="text-2xl font-black text-emerald-400"><Odometer value={results?.primerLiters || 0} decimals={1} /> liters</div>
            </div>
          </div>
        </div>
      }
      pdfContentTable={
        <>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:11 }}>
            <thead>
              <tr style={{ background:'#1C1C72', color:'#fff' }}>
                <th style={{ padding:'12px', textAlign:'left', borderTopLeftRadius:6 }}>MATERIAL / PARAMETER</th>
                <th style={{ padding:'12px', textAlign:'right', borderTopRightRadius:6 }}>ESTIMATED QUANTITY</th>
              </tr>
            </thead>
            <tbody style={{ color:'#475569' }}>
              <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
                <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>Total Wall & Ceiling Area</td>
                <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.paintAreaSqft || 0)} Sq.Ft</td>
              </tr>
              <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
                <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>Wall Putty Requirement</td>
                <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.puttyKg || 0)} Kg</td>
              </tr>
              <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
                <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>Primer Requirement</td>
                <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.primerLiters || 0)} Liters</td>
              </tr>
              <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
                <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>Emulsion Paint Requirement (2 Coats)</td>
                <td style={{ padding:'12px', textAlign:'right', fontWeight:800, color:'#7B2DBF', fontSize:14 }}>{fmt(results?.paintLiters || 0)} Liters</td>
              </tr>
            </tbody>
          </table>
        </>
      }
      pdfTotalValue={`${fmt(results?.paintLiters || 0)} LITERS PAINT / ${fmt(results?.puttyKg || 0)} KG PUTTY`}
      pdfTotalSubtitle="INTERIOR PAINT ESTIMATE"
    />
  );
}
