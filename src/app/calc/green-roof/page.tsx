"use client";

import React, { useState } from 'react';
import { BaseCalculator } from '@/components/calculators/BaseCalculator';
import { calculateGreenRoof } from '@/lib/calculator-utils';
import { Box } from 'lucide-react';
import { Odometer } from '@/components/ui/Odometer';

export default function GreenRoofCalculator() {
  const [area, setArea] = useState('');
  const [depth, setDepth] = useState('0.15');
  const [density, setDensity] = useState('1600');
  const [isCalculated, setIsCalculated] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    const a = parseFloat(area) || 0;
    const d = parseFloat(depth) || 0;
    const w = parseFloat(density) || 0;
    
    if (a > 0 && d > 0 && w > 0) {
      setResults(calculateGreenRoof(a, d, w));
      setIsCalculated(true);
    }
  };

  const handleReset = () => {
    setArea('');
    setDepth('0.15');
    setDensity('1600');
    setIsCalculated(false);
    setResults(null);
  };

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 1 });

  return (
    <BaseCalculator
      title="Green Roof Load Estimator"
      description="Estimate the saturated weight of a green roof/terrace garden to check structural loads."
      icon={<Box className="w-5 h-5" />}
      isCalculated={isCalculated}
      onCalculate={handleCalculate}
      onReset={handleReset}
      pdfFileName={`AGNAA_GreenRoof_${fmt(results?.weightKG || 0)}KG.pdf`}
      pdfTitle={"Green Roof\nLoad Estimator"}
      pdfProjectInfo={{ 'DOCUMENT TYPE': 'PLANNING GUIDELINE', 'SOURCE': 'AGNAA PRECISION ENGINE' }}
      inputsContent={
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Planter Area (SQM)</label>
            <input type="number" value={area} onChange={(e) => {setArea(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 50" />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Soil/Media Depth (M)</label>
            <input type="number" value={depth} onChange={(e) => {setDepth(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 0.15" />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Wet Density (KG/CUM)</label>
            <input type="number" value={density} onChange={(e) => {setDensity(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 1600" />
          </div>
        </div>
      }
      resultsContent={
        <div className="bg-gradient-to-br from-[#1C1C72] to-[#2A1B81] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden h-full min-h-[300px] flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#7B2DBF]/20 rounded-full blur-[40px] pointer-events-none"></div>
          
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A5B4FC] mb-6">SATURATED WEIGHT (MAX LOAD)</h3>
          
          <div className="text-5xl font-black mb-1">
            <Odometer value={results?.weightKG || 0} decimals={0} />
          </div>
          <div className="text-sm font-bold text-[#A5B4FC] mb-8">TOTAL WEIGHT (KG)</div>

          <div className="grid grid-cols-2 gap-y-6 gap-x-2">
            <div>
              <div className="text-2xl font-bold">
                <Odometer value={results?.weightPerSQM || 0} decimals={1} />
              </div>
              <div className="text-[9px] font-bold text-[#A5B4FC] uppercase tracking-widest">Load (KG/SQM)</div>
            </div>
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
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>PLANTER AREA</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{area} SQM</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>SOIL VOLUME</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.volume || 0)} CUM</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>SATURATED LOAD (per SQM)</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.weightPerSQM || 0)} KG/SQM</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>TOTAL ESTIMATED WEIGHT</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600, color:'#7B2DBF' }}>{fmt(results?.weightKG || 0)} KG</td>
            </tr>
          </tbody>
        </table>
      }
      pdfTotalValue={`${fmt(results?.weightKG || 0)} KG`}
      pdfTotalSubtitle="TOTAL WEIGHT"
    />
  );
}
