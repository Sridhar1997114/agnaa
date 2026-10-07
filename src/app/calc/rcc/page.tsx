"use client";

import React, { useState } from 'react';
import { BaseCalculator } from '@/components/calculators/BaseCalculator';
import { calculateRCCSlab } from '@/lib/calculator-utils';
import { Box } from 'lucide-react';
import { Odometer } from '@/components/ui/Odometer';

export default function RCCCalculator() {
  const [length, setLength] = useState('40');
  const [width, setWidth] = useState('30');
  const [thickness, setThickness] = useState('5');
  const [preset, setPreset] = useState<'economy' | 'safe' | 'strong'>('safe');
  
  const [isCalculated, setIsCalculated] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const t = parseFloat(thickness) || 5;

    if (l > 0 && w > 0) {
      const res = calculateRCCSlab(l, w, t, preset);
      setResults({ l, w, t, ...res });
      setIsCalculated(true);
    }
  };

  const handleReset = () => {
    setLength('40');
    setWidth('30');
    setThickness('5');
    setPreset('safe');
    setIsCalculated(false);
    setResults(null);
  };

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 1 });

  return (
    <BaseCalculator
      title="RCC Slab & Steel Estimator"
      description="Estimate concrete volume, cement bags, sand, aggregate, and TMT steel rebar weight for RCC slabs and structures."
      icon={<Box className="w-5 h-5" />}
      isCalculated={isCalculated}
      onCalculate={handleCalculate}
      onReset={handleReset}
      pdfFileName="AGNAA_RCC_Slab_Report.pdf"
      pdfTitle="RCC Slab & Steel\nQuantity Estimate"
      pdfProjectInfo={{ 'DOCUMENT TYPE': 'STRUCTURAL ESTIMATE', 'SOURCE': 'AGNAA PRECISION ENGINE' }}
      visualizerType="RCC"
      visualizerData={{ 
        lengthFt: results?.l || parseFloat(length) || 40,
        widthFt: results?.w || parseFloat(width) || 30,
        thicknessInches: results?.t || parseFloat(thickness) || 5,
      }}
      inputsContent={
        <div className="space-y-6">
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Slab Length (Feet)</label>
            <input type="number" value={length} onChange={(e) => {setLength(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 40" />
          </div>

          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Slab Width (Feet)</label>
            <input type="number" value={width} onChange={(e) => {setWidth(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 30" />
          </div>

          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Slab Thickness (Inches)</label>
            <input type="number" value={thickness} onChange={(e) => {setThickness(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 5" />
          </div>

          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Structural Standard</label>
            <div className="grid grid-cols-3 gap-2">
              {(['economy', 'safe', 'strong'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => { setPreset(p); setIsCalculated(false); }}
                  className={`py-2 text-[10px] font-black uppercase tracking-wider rounded-xl border transition-all ${preset === p ? 'bg-[#1C1C72] text-white border-[#7B2DBF]' : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-gray-300'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      }
      resultsContent={
        <div className="bg-gradient-to-br from-[#1C1C72] to-[#2A1B81] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden h-full min-h-[300px] flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#7B2DBF]/20 rounded-full blur-[40px] pointer-events-none"></div>
          
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A5B4FC] mb-4">ESTIMATED RCC CONCRETE VOLUME</h3>
            <div className="text-4xl font-black text-[#7B2DBF] brightness-125 mb-1">
              <Odometer value={results?.wetVolumeCFT || 0} decimals={1} /> <span className="text-lg text-gray-300">CU.FT</span>
            </div>
            <p className="text-xs text-gray-300 font-medium">Equal to {fmt(results?.wetVolumeCUM || 0)} Cu.M wet concrete volume.</p>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
            <div>
              <div className="text-[10px] font-black text-[#A5B4FC] uppercase tracking-widest">Cement Bags</div>
              <div className="text-2xl font-black text-white"><Odometer value={results?.cementBags || 0} decimals={0} /> bags</div>
            </div>
            <div>
              <div className="text-[10px] font-black text-[#A5B4FC] uppercase tracking-widest">TMT Steel</div>
              <div className="text-2xl font-black text-emerald-400"><Odometer value={results?.steelKg || 0} decimals={0} /> kg</div>
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
                <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>Slab Dimensions</td>
                <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{results?.l} ft x {results?.w} ft ({results?.t} in)</td>
              </tr>
              <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
                <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>Total Concrete Volume</td>
                <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.wetVolumeCFT || 0)} Cu.Ft ({fmt(results?.wetVolumeCUM || 0)} Cu.M)</td>
              </tr>
              <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
                <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>Cement Requirement</td>
                <td style={{ padding:'12px', textAlign:'right', fontWeight:600, color:'#7B2DBF' }}>{fmt(results?.cementBags || 0)} Bags (50kg)</td>
              </tr>
              <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
                <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>Sand Requirement</td>
                <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.sandCFT || 0)} Cu.Ft</td>
              </tr>
              <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
                <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>Aggregate (20mm) Requirement</td>
                <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.aggCFT || 0)} Cu.Ft</td>
              </tr>
              <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
                <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>TMT Steel Rebar Weight</td>
                <td style={{ padding:'12px', textAlign:'right', fontWeight:800, color:'#059669', fontSize:14 }}>{fmt(results?.steelKg || 0)} kg ({fmt((results?.steelKg || 0)/1000)} Tons)</td>
              </tr>
            </tbody>
          </table>
        </>
      }
      pdfTotalValue={`${fmt(results?.steelKg || 0)} KG STEEL / ${fmt(results?.cementBags || 0)} BAGS CEMENT`}
      pdfTotalSubtitle="STRUCTURAL MATERIAL ESTIMATE"
    />
  );
}
