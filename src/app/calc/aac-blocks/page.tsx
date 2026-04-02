"use client";

import React, { useState } from 'react';
import { BaseCalculator } from '@/components/calculators/BaseCalculator';
import { calculateAACBlocks } from '@/lib/calculator-utils';
import { Grid } from 'lucide-react';
import { Odometer } from '@/components/ui/Odometer';

export default function AacBlocksCalculator() {
  const [length, setLength] = useState('');
  const [height, setHeight] = useState('');
  const [thickness, setThickness] = useState('0.2');
  const [isCalculated, setIsCalculated] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    const l = parseFloat(length) || 0;
    const h = parseFloat(height) || 0;
    const t = parseFloat(thickness) || 0;
    
    if (l > 0 && h > 0 && t > 0) {
      setResults(calculateAACBlocks(l, h, t));
      setIsCalculated(true);
    }
  };

  const handleReset = () => {
    setLength('');
    setHeight('');
    setThickness('0.2');
    setIsCalculated(false);
    setResults(null);
  };

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 2 });

  return (
    <BaseCalculator
      title="AAC Blocks Calculator"
      description="Estimate AAC blocks and mortar bags required for a masonry wall."
      icon={<Grid className="w-5 h-5" />}
      isCalculated={isCalculated}
      onCalculate={handleCalculate}
      onReset={handleReset}
      pdfFileName={`AGNAA_AAC_Blocks_${fmt(results?.blocksCount || 0)}nos.pdf`}
      pdfTitle={"AAC Blocks\nCalculator"}
      pdfProjectInfo={{ 'DOCUMENT TYPE': 'PLANNING GUIDELINE', 'SOURCE': 'AGNAA PRECISION ENGINE' }}
      visualizerType="WALL"
      visualizerData={{ 
        length: parseFloat(length) * 3.28 || 15, 
        height: parseFloat(height) * 3.28 || 10,
        thickness: parseFloat(thickness) * 39.37 || 9,
        label: 'AAC Block Wall'
      }}
      inputsContent={
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Wall Length (M)</label>
            <input type="number" value={length} onChange={(e) => {setLength(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 5" />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Wall Height (M)</label>
            <input type="number" value={height} onChange={(e) => {setHeight(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 3" />
          </div>
          <div className="col-span-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Wall Thickness (M)</label>
            <select value={thickness} onChange={(e) => {setThickness(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors">
              <option value="0.1">0.1 M (100mm)</option>
              <option value="0.15">0.15 M (150mm)</option>
              <option value="0.2">0.2 M (200mm)</option>
              <option value="0.23">0.23 M (230mm)</option>
            </select>
          </div>
        </div>
      }
      resultsContent={
        <div className="bg-gradient-to-br from-[#1C1C72] to-[#2A1B81] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden h-full min-h-[300px] flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#7B2DBF]/20 rounded-full blur-[40px] pointer-events-none"></div>
          
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A5B4FC] mb-6">AAC BLOCKS ESTIMATE</h3>
          
          <div className="text-5xl font-black mb-1 flex items-baseline gap-1">
            <Odometer value={results?.blocksCount || 0} />
          </div>
          <div className="text-sm font-bold text-[#A5B4FC] mb-8">TOTAL AAC BLOCKS (NOS)</div>

          <div className="grid grid-cols-2 gap-y-6 gap-x-2">
            <div>
              <div className="text-2xl font-bold flex items-baseline gap-1">
                <Odometer value={results?.wallVolCUM || 0} decimals={2} />
              </div>
              <div className="text-[9px] font-bold text-[#A5B4FC] uppercase tracking-widest">Wall Vol (CUM)</div>
            </div>
            <div>
              <div className="text-2xl font-bold flex items-baseline gap-1">
                <Odometer value={results?.mortarBags || 0} decimals={2} />
              </div>
              <div className="text-[9px] font-bold text-[#A5B4FC] uppercase tracking-widest">Mortar Bags (~40kg)</div>
            </div>
          </div>
          <div className="mt-8 text-xs text-white/50 border-t border-white/10 pt-4">
            * Note: Assumes standard block sizes. Block Vol: (0.6x0.2xThickness). Wastage not included.
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
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>WALL DIMENSIONS</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{length} x {height} x {thickness} (M)</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>WALL VOLUME</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.wallVolCUM || 0)} CUM</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>READY-MIX MORTAR BAGS</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.mortarBags || 0)} BAGS</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>TOTAL AAC BLOCKS</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600, color:'#7B2DBF' }}>{fmt(results?.blocksCount || 0)} NOS</td>
            </tr>
          </tbody>
        </table>
      }
      pdfTotalValue={`${fmt(results?.blocksCount || 0)} NOS`}
      pdfTotalSubtitle="ESTIMATED AAC BLOCKS"
    />
  );
}
