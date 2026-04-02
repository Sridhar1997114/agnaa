"use client";

import React, { useState } from 'react';
import { BaseCalculator } from '@/components/calculators/BaseCalculator';
import { calculateRCCSlab } from '@/lib/calculator-utils';
import { Box } from 'lucide-react';

export default function RCCSlabCalculator() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [thickness, setThickness] = useState('5'); // Standard 5 inch slab limit
  
  const [isCalculated, setIsCalculated] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const t = parseFloat(thickness) || 0;
    if (l > 0 && w > 0 && t > 0) {
      setResults({ ...calculateRCCSlab(l, w, t), l, w, t });
      setIsCalculated(true);
    }
  };

  const handleReset = () => {
    setLength('');
    setWidth('');
    setThickness('5');
    setIsCalculated(false);
    setResults(null);
  };

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 1 });

  return (
    <BaseCalculator
      title="RCC Slab Calculator"
      description="Calculate the exact quantity of cement, sand, aggregate, and steel required for your RCC slab based on standard M20 grade rules."
      icon={<Box className="w-5 h-5" />}
      isCalculated={isCalculated}
      onCalculate={handleCalculate}
      onReset={handleReset}
      pdfFileName={`AGNAA_RCC_Slab_Estimate.pdf`}
      pdfTitle="RCC Slab\nEstimate"
      pdfProjectInfo={{ 'DOCUMENT TYPE': 'MATERIAL QUANTITY ESTIMATE', 'MIX DESIGN': 'M20 GRADE (1:1.5:3)' }}
      inputsContent={
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Slab Length (FT)</label>
              <input type="number" value={length} onChange={(e) => {setLength(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 20" />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Slab Width (FT)</label>
              <input type="number" value={width} onChange={(e) => {setWidth(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 15" />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Thickness (INCHES)</label>
            <input type="number" step="0.5" value={thickness} onChange={(e) => {setThickness(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 5" />
          </div>
        </div>
      }
      resultsContent={
        <div className="bg-gradient-to-br from-[#1C1C72] to-[#2A1B81] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden h-full min-h-[300px] flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#7B2DBF]/20 rounded-full blur-[40px] pointer-events-none"></div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A5B4FC] mb-6">Material Breakdown</h3>
          
          <div className="grid grid-cols-2 gap-y-6 gap-x-4">
            <div>
              <div className="text-sm font-bold text-[#A5B4FC] mb-1">CEMENT</div>
              <div className="text-3xl font-black">{Math.ceil(results?.cementBags || 0)} <span className="text-sm text-gray-300">BAGS</span></div>
            </div>
            <div>
              <div className="text-sm font-bold text-[#A5B4FC] mb-1">STEEL (~1%)</div>
              <div className="text-3xl font-black">{fmt(results?.steelKg || 0)} <span className="text-sm text-gray-300">KG</span></div>
            </div>
            <div>
              <div className="text-sm font-bold text-[#A5B4FC] mb-1">SAND</div>
              <div className="text-3xl font-black">{fmt(results?.sandCFT || 0)} <span className="text-sm text-gray-300">CFT</span></div>
            </div>
            <div>
              <div className="text-sm font-bold text-[#A5B4FC] mb-1">AGGREGATE</div>
              <div className="text-3xl font-black">{fmt(results?.aggCFT || 0)} <span className="text-sm text-gray-300">CFT</span></div>
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
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>STEEL / REINFORCEMENT</td>
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
            <div><strong>Length:</strong> {results?.l} FT</div>
            <div><strong>Width:</strong> {results?.w} FT</div>
            <div><strong>Thickness:</strong> {results?.t} IN</div>
            <div><strong>Wet Volume:</strong> {fmt(results?.wetVolumeCFT || 0)} CFT</div>
          </div>
        </div>
      }
      pdfTotalValue={`${fmt(results?.wetVolumeCUM || 0)} Cu.m`}
      pdfTotalSubtitle="TOTAL WET CONCRETE VOLUME"
    />
  );
}
