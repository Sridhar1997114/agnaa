"use client";

import React, { useState } from 'react';
import { BaseCalculator } from '@/components/calculators/BaseCalculator';
import { calculateAACBlocks } from '@/lib/calculator-utils';
import { Layers } from 'lucide-react';
import { Odometer } from '@/components/ui/Odometer';

export default function AACBlocksCalculator() {
  const [lengthFt, setLengthFt] = useState('50');
  const [heightFt, setHeightFt] = useState('10');
  const [thicknessInches, setThicknessInches] = useState('6');
  
  const [isCalculated, setIsCalculated] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    const lFeet = parseFloat(lengthFt) || 0;
    const hFeet = parseFloat(heightFt) || 0;
    const tInches = parseFloat(thicknessInches) || 6;

    if (lFeet > 0 && hFeet > 0) {
      const lM = lFeet * 0.3048;
      const hM = hFeet * 0.3048;
      const tM = tInches * 0.0254;

      const res = calculateAACBlocks(lM, hM, tM);
      setResults({ lFeet, hFeet, tInches, ...res });
      setIsCalculated(true);
    }
  };

  const handleReset = () => {
    setLengthFt('50');
    setHeightFt('10');
    setThicknessInches('6');
    setIsCalculated(false);
    setResults(null);
  };

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 1 });

  return (
    <BaseCalculator
      title="AAC Block & Mortar Calculator"
      description="Calculate AAC blocks count, thin-set joint adhesive bags, and wall masonry volume for thermal-insulated walls."
      icon={<Layers className="w-5 h-5" />}
      isCalculated={isCalculated}
      onCalculate={handleCalculate}
      onReset={handleReset}
      pdfFileName="AGNAA_AAC_Block_Report.pdf"
      pdfTitle="AAC Block & Mortar\nQuantity Estimate"
      pdfProjectInfo={{ 'DOCUMENT TYPE': 'MASONRY ESTIMATE', 'SOURCE': 'AGNAA PRECISION ENGINE' }}
      visualizerType="WALL"
      visualizerData={{ 
        lengthFt: results?.lFeet || parseFloat(lengthFt) || 50,
        heightFt: results?.hFeet || parseFloat(heightFt) || 10,
        thicknessInches: results?.tInches || parseFloat(thicknessInches) || 6,
      }}
      inputsContent={
        <div className="space-y-6">
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Total Wall Length (Feet)</label>
            <input type="number" value={lengthFt} onChange={(e) => {setLengthFt(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 50" />
          </div>

          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Wall Height (Feet)</label>
            <input type="number" value={heightFt} onChange={(e) => {setHeightFt(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 10" />
          </div>

          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Block Thickness</label>
            <div className="grid grid-cols-3 gap-2">
              {['4', '6', '8'].map((t) => (
                <button
                  key={t}
                  onClick={() => { setThicknessInches(t); setIsCalculated(false); }}
                  className={`py-2 text-[10px] font-black uppercase tracking-wider rounded-xl border transition-all ${thicknessInches === t ? 'bg-[#1C1C72] text-white border-[#7B2DBF]' : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-gray-300'}`}
                >
                  {t} Inches
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
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A5B4FC] mb-4">REQUIRED AAC BLOCKS</h3>
            <div className="text-5xl font-black text-[#7B2DBF] brightness-125 mb-1">
              <Odometer value={results?.blocksCount || 0} decimals={0} /> <span className="text-lg text-gray-300">BLOCKS</span>
            </div>
            <p className="text-xs text-gray-300 font-medium">For a total wall volume of {fmt(results?.wallVolCUM || 0)} Cu.M.</p>
          </div>

          <div className="border-t border-white/10 pt-4">
            <div className="text-[10px] font-black text-[#A5B4FC] uppercase tracking-widest">Thin-Bed Mortar Adhesive</div>
            <div className="text-2xl font-black text-white"><Odometer value={results?.mortarBags || 0} decimals={0} /> bags (40kg)</div>
          </div>
        </div>
      }
      pdfContentTable={
        <>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:11 }}>
            <thead>
              <tr style={{ background:'#1C1C72', color:'#fff' }}>
                <th style={{ padding:'12px', textAlign:'left', borderTopLeftRadius:6 }}>PARAMETER</th>
                <th style={{ padding:'12px', textAlign:'right', borderTopRightRadius:6 }}>ESTIMATED VALUE</th>
              </tr>
            </thead>
            <tbody style={{ color:'#475569' }}>
              <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
                <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>Wall Area & Dimensions</td>
                <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{results?.lFeet} ft x {results?.hFeet} ft ({results?.tInches} in block)</td>
              </tr>
              <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
                <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>AAC Masonry Volume</td>
                <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.wallVolCUM || 0)} Cu.M</td>
              </tr>
              <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
                <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>Total AAC Blocks Count</td>
                <td style={{ padding:'12px', textAlign:'right', fontWeight:800, color:'#7B2DBF', fontSize:14 }}>{fmt(results?.blocksCount || 0)} Blocks</td>
              </tr>
              <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
                <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>Thin-bed Joint Mortar Bags</td>
                <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.mortarBags || 0)} Bags (40kg each)</td>
              </tr>
            </tbody>
          </table>
        </>
      }
      pdfTotalValue={`${fmt(results?.blocksCount || 0)} BLOCKS / ${fmt(results?.mortarBags || 0)} MORTAR BAGS`}
      pdfTotalSubtitle="AAC BLOCK WALL ESTIMATE"
    />
  );
}
