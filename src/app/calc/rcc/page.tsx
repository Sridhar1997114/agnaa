"use client";

import React, { useState, useEffect } from 'react';
import { BaseCalculator } from '@/components/calculators/BaseCalculator';
import { calculateRCCSlab } from '@/lib/calculator-utils';
import { Box, Shield, ShieldCheck, ShieldAlert } from 'lucide-react';
import { BlueprintSlab } from '@/components/visualizers/BlueprintSlab';
import { Odometer } from '@/components/ui/Odometer';

export default function RCCSlabCalculator() {
  const [length, setLength] = useState('20');
  const [width, setWidth] = useState('15');
  const [thickness, setThickness] = useState('5');
  const [preset, setPreset] = useState<'economy' | 'safe' | 'strong'>('safe');
  
  const [isCalculated, setIsCalculated] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const t = parseFloat(thickness) || 0;
    if (l > 0 && w > 0 && t > 0) {
      setResults({ ...calculateRCCSlab(l, w, t, preset), l, w, t });
      setIsCalculated(true);
    }
  };

  // Auto-calculate on input change for better UX
  useEffect(() => {
    handleCalculate();
  }, [length, width, thickness, preset]);

  const handleReset = () => {
    setLength('20');
    setWidth('15');
    setThickness('5');
    setPreset('safe');
    setIsCalculated(false);
    setResults(null);
  };

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 1 });

  const presetOptions = [
    { id: 'economy', label: 'Economy', desc: 'Optimized for non-load bearing / light residential use.' },
    { id: 'safe', label: 'Safe', desc: 'Standard architectural compliance for multi-story builds.' },
    { id: 'strong', label: 'Industrial', desc: 'High-density reinforcement for heavy duty/commercial slabs.' }
  ];

  return (
    <BaseCalculator
      title="RCC Slab Calculator"
      description="Calculate cement, sand, aggregate, and steel with interactive blueprints and engineering safety presets."
      icon={<Box className="w-5 h-5" />}
      isCalculated={isCalculated}
      onCalculate={handleCalculate}
      onReset={handleReset}
      pdfFileName={`AGNAA_RCC_Slab_Estimate.pdf`}
      pdfTitle="RCC Slab\nEstimate"
      pdfProjectInfo={{ 
        'DOCUMENT TYPE': 'MATERIAL QUANTITY ESTIMATE', 
        'MIX DESIGN': 'M20 GRADE (1:1.5:3)',
        'SAFETY TIER': preset.toUpperCase()
      }}
      visualizerType="RCC"
      visualizerData={{ length, width, thickness, preset }}
      presets={{
        current: preset,
        onChange: (id) => setPreset(id as any),
        options: presetOptions
      }}
      inputsContent={
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Slab Length (FT)</label>
              <input type="number" value={length} onChange={(e) => setLength(e.target.value)} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 20" />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Slab Width (FT)</label>
              <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 15" />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Thickness (INCHES)</label>
            <input type="number" step="0.5" value={thickness} onChange={(e) => setThickness(e.target.value)} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 5" />
          </div>
        </div>
      }
      resultsContent={
        <div className="flex flex-col h-full gap-6">
          <div className="grid grid-cols-2 gap-4 h-full">
            <div className="bg-gradient-to-br from-[#1C1C72] to-[#2A1B81] rounded-2xl p-5 text-white shadow-xl relative overflow-hidden flex flex-col justify-center">
               <div className="absolute top-0 right-0 p-4 opacity-10"><Box size={60} /></div>
               <div className="text-[8px] font-black uppercase tracking-widest text-[#A5B4FC] mb-4">Material Quantities</div>
               <div className="space-y-4">
                  <div>
                    <div className="text-[10px] font-bold text-[#A5B4FC]/60 uppercase">Cement Requirement</div>
                    <div className="text-2xl font-black">
                      <Odometer value={Math.ceil(results?.cementBags || 0)} decimals={0} /> <span className="text-xs">BAGS</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-[#A5B4FC]/60 uppercase">Steel ({((results?.steelPct || 0) * 100).toFixed(1)}% Rebar)</div>
                    <div className="text-2xl font-black">
                      <Odometer value={results?.steelKg || 0} decimals={1} /> <span className="text-xs">KG</span>
                    </div>
                  </div>
                  <div className="flex gap-4 border-t border-white/10 pt-4">
                    <div>
                      <div className="text-[10px] font-bold text-[#A5B4FC]/60 uppercase">Sand</div>
                      <div className="text-lg font-black">{fmt(results?.sandCFT || 0)} <span className="text-[8px]">CFT</span></div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-[#A5B4FC]/60 uppercase">Aggregate</div>
                      <div className="text-lg font-black">{fmt(results?.aggCFT || 0)} <span className="text-[8px]">CFT</span></div>
                    </div>
                  </div>
               </div>
            </div>

            <div className="flex flex-col gap-4 h-full">
               <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex-1 flex flex-col justify-center">
                  <div className="text-[8px] font-black uppercase tracking-widest text-gray-400 mb-2">Total Volume</div>
                  <div className="text-3xl font-black text-[#1C1C72]">
                    <Odometer value={results?.wetVolumeCUM || 0} decimals={1} /> <span className="text-xs">m³</span>
                  </div>
                  <div className="text-[9px] text-[#7B2DBF] mt-1 font-black uppercase tracking-widest">Wet Concrete</div>
               </div>
                <div className="bg-[#7B2DBF]/5 border border-[#7B2DBF]/20 rounded-2xl p-4 shadow-sm flex-1 flex flex-col justify-center transition-all hover:bg-[#7B2DBF]/10">
                   <div className="text-[8px] font-black uppercase tracking-widest text-[#7B2DBF] mb-1">Status Report</div>
                   <div className="text-sm font-black text-[#7B2DBF] uppercase tracking-wider leading-none">
                     {preset === 'strong' ? 'Grade: Industrial' : preset === 'safe' ? 'Grade: Ultra' : 'Grade: Economic'}
                   </div>
                   <div className="text-[9px] text-[#7B2DBF]/60 mt-1 uppercase font-bold tracking-tighter">Verified for Precision</div>
                </div>
            </div>
          </div>
        </div>
      }
      pdfContentTable={
        <table style={{ width:'100%', borderCollapse:'collapse', fontSize:11 }}>
          <thead>
            <tr style={{ background:'#1C1C72', color:'#fff' }}>
              <th style={{ padding:'12px', textAlign:'left', borderTopLeftRadius:6 }}>MATERIAL</th>
              <th style={{ padding:'12px', textAlign:'right', borderTopRightRadius:6 }}>QUANTITY</th>
            </tr>
          </thead>
          <tbody style={{ color:'#475569' }}>
            <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>CEMENT (50kg Bags)</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{Math.ceil(results?.cementBags || 0)} BAGS</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>STEEL ({((results?.steelPct || 0) * 100).toFixed(1)}% REBAR)</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.steelKg || 0)} KG</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>SAND / FINE AGGREGATE</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.sandCFT || 0)} CFT</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>COARSE AGGREGATE</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.aggCFT || 0)} CFT</td>
            </tr>
          </tbody>
        </table>
      }
      pdfSummaryBox={
        <div style={{ padding:15, background:'#F8FAFC', borderRadius:8, border:'1px solid #E2E8F0', marginTop:20 }}>
          <div style={{ fontSize:9, fontWeight:900, color:'#64748B', textTransform:'uppercase', marginBottom:8 }}>Dimension Summary</div>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:10 }}>
            <div><strong>Dimensions:</strong> {results?.l} x {results?.w} FT</div>
            <div><strong>Thickness:</strong> {results?.t} IN</div>
            <div><strong>Safety:</strong> {preset.toUpperCase()}</div>
            <div><strong>Volume:</strong> {fmt(results?.wetVolumeCFT || 0)} CFT</div>
          </div>
        </div>
      }
      pdfTotalValue={`${fmt(results?.wetVolumeCUM || 0)} Cu.m`}
      pdfTotalSubtitle="TOTAL WET CONCRETE VOLUME"
    />
  );
}
