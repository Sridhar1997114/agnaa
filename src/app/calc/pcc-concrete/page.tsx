"use client";

import React, { useState } from 'react';
import { BaseCalculator } from '@/components/calculators/BaseCalculator';
import { calculatePCC } from '@/lib/calculator-utils';
import { Box } from 'lucide-react';
import { Odometer } from '@/components/ui/Odometer';

export default function PccCalculator() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [thickness, setThickness] = useState('');
  const [ratioCmt, setRatioCmt] = useState('1');
  const [ratioSnd, setRatioSnd] = useState('4');
  const [ratioAgg, setRatioAgg] = useState('8');
  const [isCalculated, setIsCalculated] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const t = parseFloat(thickness) || 0;
    const c = parseFloat(ratioCmt) || 1;
    const s = parseFloat(ratioSnd) || 4;
    const a = parseFloat(ratioAgg) || 8;
    
    if (l > 0 && w > 0 && t > 0) {
      setResults(calculatePCC(l, w, t, c, s, a));
      setIsCalculated(true);
    }
  };

  const handleReset = () => {
    setLength('');
    setWidth('');
    setThickness('');
    setRatioCmt('1');
    setRatioSnd('4');
    setRatioAgg('8');
    setIsCalculated(false);
    setResults(null);
  };

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 2 });

  return (
    <BaseCalculator
      title="PCC Concrete Calculator"
      description="Calculate concrete volume and material quantities for Plain Cement Concrete."
      icon={<Box className="w-5 h-5" />}
      isCalculated={isCalculated}
      onCalculate={handleCalculate}
      onReset={handleReset}
      pdfFileName={`AGNAA_PCC_Calc_${fmt(results?.wetVolume || 0)}CUM.pdf`}
      pdfTitle="PCC Concrete\nCalculator"
      pdfProjectInfo={{ 'DOCUMENT TYPE': 'PLANNING GUIDELINE', 'SOURCE': 'AGNAA PRECISION ENGINE' }}
      inputsContent={
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Length (M)</label>
            <input type="number" value={length} onChange={(e) => {setLength(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 5" />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Width (M)</label>
            <input type="number" value={width} onChange={(e) => {setWidth(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 4" />
          </div>
          <div className="col-span-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Thickness (M)</label>
            <input type="number" value={thickness} onChange={(e) => {setThickness(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 0.15" />
          </div>
          <div className="col-span-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Mix Ratio (Cement : Sand : Agg)</label>
            <div className="flex gap-2">
              <input type="number" value={ratioCmt} onChange={(e) => {setRatioCmt(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-center text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" />
              <input type="number" value={ratioSnd} onChange={(e) => {setRatioSnd(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-center text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" />
              <input type="number" value={ratioAgg} onChange={(e) => {setRatioAgg(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-center text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" />
            </div>
          </div>
        </div>
      }
      resultsContent={
        <div className="bg-gradient-to-br from-[#1C1C72] to-[#2A1B81] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden h-full min-h-[300px] flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#7B2DBF]/20 rounded-full blur-[40px] pointer-events-none"></div>
          
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A5B4FC] mb-6">PCC Materials</h3>
          
          <div className="text-5xl font-black mb-1 flex items-baseline gap-1">
            <Odometer value={results?.wetVolume || 0} decimals={2} />
          </div>
          <div className="text-sm font-bold text-[#A5B4FC] mb-8">WET VOLUME (CUBIC METERS)</div>

          <div className="grid grid-cols-3 gap-y-6 gap-x-2">
            <div>
              <div className="text-2xl font-bold flex items-baseline gap-1">
                <Odometer value={results?.cementBags || 0} decimals={1} />
              </div>
              <div className="text-[9px] font-bold text-[#A5B4FC] uppercase tracking-widest">Cement Bags</div>
            </div>
            <div>
              <div className="text-2xl font-bold flex items-baseline gap-1">
                <Odometer value={results?.sandVolume || 0} decimals={2} />
              </div>
              <div className="text-[9px] font-bold text-[#A5B4FC] uppercase tracking-widest">Sand (CUM)</div>
            </div>
            <div>
              <div className="text-2xl font-bold flex items-baseline gap-1">
                <Odometer value={results?.aggregateVolume || 0} decimals={2} />
              </div>
              <div className="text-[9px] font-bold text-[#A5B4FC] uppercase tracking-widest">Agg. (CUM)</div>
            </div>
          </div>
          <div className="mt-8 text-xs text-white/50 border-t border-white/10 pt-4">
            * Note: Assumes dry volume factor 1.54. Values are planning estimates only.
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
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>DIMENSIONS</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{length}x{width}x{thickness} M</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>MIX RATIO</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>1:{ratioSnd}:{ratioAgg}</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>CEMENT BAGS (~50kg)</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.cementBags || 0)} BAGS</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>SAND REQUIRED</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.sandVolume || 0)} CUM</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>AGGREGATE REQUIRED</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.aggregateVolume || 0)} CUM</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>TOTAL WET VOLUME</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600, color:'#7B2DBF' }}>{fmt(results?.wetVolume || 0)} CUM</td>
            </tr>
          </tbody>
        </table>
      }
      pdfTotalValue={`${fmt(results?.wetVolume || 0)} CUM`}
      pdfTotalSubtitle="PCC WET VOLUME"
      visualizerType="PCC"
      visualizerData={results ? {
        length: parseFloat(length) * 3.281,
        width: parseFloat(width) * 3.281,
        thickness: parseFloat(thickness) * 39.37,
        area: (parseFloat(length) || 0) * (parseFloat(width) || 0),
      } : undefined}
    />
  );
}
