"use client";

import React, { useState } from 'react';
import { BaseCalculator } from '@/components/calculators/BaseCalculator';
import { calculateBuiltUpEfficiency } from '@/lib/calculator-utils';
import { Ruler } from 'lucide-react';
import { Odometer } from '@/components/ui/Odometer';

export default function BuiltUpEfficiencyCalculator() {
  const [carpetArea, setCarpetArea] = useState('');
  const [builtUpArea, setBuiltUpArea] = useState('');
  const [superBuiltUpArea, setSuperBuiltUpArea] = useState('');
  const [isCalculated, setIsCalculated] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    const c = parseFloat(carpetArea) || 0;
    const b = parseFloat(builtUpArea) || 0;
    const s = parseFloat(superBuiltUpArea) || 0;
    if (c > 0 && b > 0) {
      setResults(calculateBuiltUpEfficiency(c, b, s));
      setIsCalculated(true);
    }
  };

  const handleReset = () => {
    setCarpetArea('');
    setBuiltUpArea('');
    setSuperBuiltUpArea('');
    setIsCalculated(false);
    setResults(null);
  };

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 1 });

  return (
    <BaseCalculator
      title="Built-up Area Efficiency"
      description="Calculate efficiency of design: carpet vs. built-up vs. super built-up."
      icon={<Ruler className="w-5 h-5" />}
      isCalculated={isCalculated}
      onCalculate={handleCalculate}
      onReset={handleReset}
      pdfFileName={`AGNAA_Efficiency_${fmt(results?.carpetToBuiltUpPercent || 0)}pct.pdf`}
      pdfTitle="Built-up Efficiency\nCalculator"
      pdfProjectInfo={{ 'DOCUMENT TYPE': 'PLANNING GUIDELINE', 'SOURCE': 'AGNAA PRECISION ENGINE' }}
      inputsContent={
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Carpet Area (SQFT)</label>
            <input type="number" value={carpetArea} onChange={(e) => {setCarpetArea(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 1000" />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Built-up Area (SQFT)</label>
            <input type="number" value={builtUpArea} onChange={(e) => {setBuiltUpArea(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 1150" />
          </div>
          <div className="md:col-span-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Super Built-up Area (Opt.)</label>
            <input type="number" value={superBuiltUpArea} onChange={(e) => {setSuperBuiltUpArea(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 1350" />
          </div>
        </div>
      }
      resultsContent={
        <div className="bg-gradient-to-br from-[#1C1C72] to-[#2A1B81] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden h-full min-h-[300px] flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#7B2DBF]/20 rounded-full blur-[40px] pointer-events-none"></div>
          
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A5B4FC] mb-6">Efficiency Results</h3>
          
          <div className="text-5xl font-black mb-1 flex items-baseline gap-1">
            <Odometer value={results?.carpetToBuiltUpPercent || 0} /><span>%</span>
          </div>
          <div className="text-sm font-bold text-[#A5B4FC] mb-8">CARPET TO BUILT-UP EFFICIENCY</div>

          <div className="grid grid-cols-2 gap-y-6 gap-x-4">
            <div>
              <div className="text-2xl font-bold flex items-baseline gap-1">
                <Odometer value={results?.carpetToSuperPercent || 0} /><span>%</span>
              </div>
              <div className="text-[9px] font-bold text-[#A5B4FC] uppercase tracking-widest">Carpet to Super Eff.</div>
            </div>
            <div>
              <div className="text-2xl font-bold flex items-baseline gap-1">
                <Odometer value={(results?.loadingFactor || 0) * 100} /><span>%</span>
              </div>
              <div className="text-[9px] font-bold text-[#A5B4FC] uppercase tracking-widest">Loading Factor</div>
            </div>
          </div>

          <div className="mt-8 text-xs text-white/50 border-t border-white/10 pt-4">
            * Note: Residential Carpet vs Super Built-up efficiency is often around 60–75%.
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
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>CARPET AREA</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{carpetArea} SQFT</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>BUILT-UP AREA</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{builtUpArea} SQFT</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>SUPER BUILT-UP AREA</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{superBuiltUpArea || 'N/A'} SQFT</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>CARPET TO BUILT-UP EFFICIENCY</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600, color:'#7B2DBF' }}>{fmt(results?.carpetToBuiltUpPercent || 0)}%</td>
            </tr>
          </tbody>
        </table>
      }
      pdfTotalValue={`${fmt(results?.carpetToBuiltUpPercent || 0)} %`}
      pdfTotalSubtitle="CARPET TO BUILT-UP EFFICIENCY"
      visualizerType="BUILT_UP"
      visualizerData={results ? {
        carpetArea: parseFloat(carpetArea),
        superBuiltUpArea: parseFloat(superBuiltUpArea) || parseFloat(builtUpArea),
        efficiency: results.carpetToBuiltUpPercent,
      } : undefined}
    />
  );
}
