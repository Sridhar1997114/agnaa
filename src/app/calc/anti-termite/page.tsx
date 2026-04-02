"use client";

import React, { useState } from 'react';
import { BaseCalculator } from '@/components/calculators/BaseCalculator';
import { calculateAntiTermite } from '@/lib/calculator-utils';
import { Box } from 'lucide-react';
import { Odometer } from '@/components/ui/Odometer';

export default function AntiTermiteCalculator() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [perimeter, setPerimeter] = useState('');
  const [isCalculated, setIsCalculated] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const p = parseFloat(perimeter) || 0;
    
    if (l > 0 && w > 0 && p > 0) {
      setResults(calculateAntiTermite(l, w, p));
      setIsCalculated(true);
    }
  };

  const handleReset = () => {
    setLength('');
    setWidth('');
    setPerimeter('');
    setIsCalculated(false);
    setResults(null);
  };

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 2 });

  return (
    <BaseCalculator
      title="Anti-Termite Calculator"
      description="Estimate required Anti-Termite Treatment (ATT) chemical emulsion for foundations."
      icon={<Box className="w-5 h-5" />}
      isCalculated={isCalculated}
      onCalculate={handleCalculate}
      onReset={handleReset}
      pdfFileName={`AGNAA_ATT_${fmt(results?.totalChemicalLiters || 0)}Liters.pdf`}
      pdfTitle={"Anti-Termite\nCalculator"}
      pdfProjectInfo={{ 'DOCUMENT TYPE': 'PLANNING GUIDELINE', 'SOURCE': 'AGNAA PRECISION ENGINE' }}
      visualizerType="ANTI_TERMITE"
      visualizerData={{ length, width, perimeter, results }}
      inputsContent={
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Plan Length (M)</label>
            <input type="number" value={length} onChange={(e) => {setLength(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 10" />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Plan Width (M)</label>
            <input type="number" value={width} onChange={(e) => {setWidth(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 8" />
          </div>
          <div className="col-span-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Perimeter (M)</label>
            <input type="number" value={perimeter} onChange={(e) => {setPerimeter(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 36" />
          </div>
        </div>
      }
      resultsContent={
        <div className="bg-gradient-to-br from-[#1C1C72] to-[#2A1B81] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden h-full min-h-[300px] flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#7B2DBF]/20 rounded-full blur-[40px] pointer-events-none"></div>
          
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A5B4FC] mb-6">ATT ESTIMATE</h3>
          
          <div className="text-5xl font-black mb-1 flex items-baseline gap-1">
            <Odometer value={results?.totalChemicalLiters || 0} />
          </div>
          <div className="text-sm font-bold text-[#A5B4FC] mb-8">CHEMICAL EMULSION (LITERS)</div>

          <div className="grid grid-cols-2 gap-y-6 gap-x-2">
            <div>
              <div className="text-2xl font-bold flex items-baseline gap-1">
                <Odometer value={results?.planAreaSQM || 0} />
              </div>
              <div className="text-[9px] font-bold text-[#A5B4FC] uppercase tracking-widest">Plan Area (SQM)</div>
            </div>
          </div>
          <div className="mt-8 text-xs text-white/50 border-t border-white/10 pt-4">
            * Note: Based on standard IS code treating 5L/sqm for surface and 5L/m for perimeter wall. 
          </div>
        </div>
      }
      pdfContentTable={
        <table style={{ width:'100%', borderCollapse:'collapse', fontSize:11 }}>
          <thead>
            <tr style={{ background:'#1C1C72', color:'#fff' }}>
              <th style={{ padding:'12px', textAlign:'left', borderTopLeftRadius:6 }}>PARAMETER</th>
              <th style={{ padding:'12px', textAlign:'right', borderTopRightRadius:6 }}>VALUE</th>
            </tr>
          </thead>
          <tbody style={{ color:'#475569' }}>
            <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>PLAN DIMENSIONS</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{length} x {width} (M)</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>PERIMETER</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{perimeter} M</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>PLAN AREA</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.planAreaSQM || 0)} SQM</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>TOTAL CHEMICAL REQ.</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600, color:'#7B2DBF' }}>{fmt(results?.totalChemicalLiters || 0)} LITERS</td>
            </tr>
          </tbody>
        </table>
      }
      pdfTotalValue={`${fmt(results?.totalChemicalLiters || 0)} Liters`}
      pdfTotalSubtitle="ATT CHEMICAL REQUIRED"
    />
  );
}
