"use client";

import React, { useState, useEffect } from 'react';
import { BaseCalculator } from '@/components/calculators/BaseCalculator';
import { calculateFoundationFooting } from '@/lib/calculator-utils';
import { Box } from 'lucide-react';
import { Odometer } from '@/components/ui/Odometer';

export default function FoundationCalculator() {
  const [length, setLength] = useState('1.2');
  const [width, setWidth] = useState('1.2');
  const [depth, setDepth] = useState('0.4');
  const [count, setCount] = useState('8');
  const [preset, setPreset] = useState<'economy' | 'safe' | 'strong'>('safe');
  const [isCalculated, setIsCalculated] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const d = parseFloat(depth) || 0;
    const c = parseFloat(count) || 1;
    
    if (l > 0 && w > 0 && d > 0 && c > 0) {
      setResults(calculateFoundationFooting(l, w, d, c));
      setIsCalculated(true);
    }
  };

  useEffect(() => {
    handleCalculate();
  }, [length, width, depth, count, preset]);

  const handleReset = () => {
    setLength('1.2');
    setWidth('1.2');
    setDepth('0.4');
    setCount('8');
    setIsCalculated(false);
    setResults(null);
  };

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 2 });

  return (
    <BaseCalculator
      title="Foundation Concrete"
      description="Calculate concrete volume for isolated footings with interactive 3D-like isometric previews."
      icon={<Box className="w-5 h-5" />}
      isCalculated={isCalculated}
      onCalculate={handleCalculate}
      onReset={handleReset}
      pdfFileName={`AGNAA_Foundation_Calc_${fmt(results?.totalVolume || 0)}CUM.pdf`}
      pdfTitle="Foundation Footing\nCalculator"
      pdfProjectInfo={{ 'DOCUMENT TYPE': 'PLANNING GUIDELINE', 'SOURCE': 'AGNAA PRECISION ENGINE' }}
      visualizerType="FOOTING"
      visualizerData={{ length, width, depth }}
      inputsContent={
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Footing Length (M)</label>
              <input type="number" value={length} onChange={(e) => setLength(e.target.value)} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 1.2" />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Footing Width (M)</label>
              <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 1.2" />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Footing Depth (M)</label>
              <input type="number" value={depth} onChange={(e) => setDepth(e.target.value)} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 0.4" />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Count</label>
              <input type="number" value={count} onChange={(e) => setCount(e.target.value)} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 8" />
            </div>
          </div>
        </div>
      }
      presets={{
        current: preset as any,
        options: [
          { id: 'economy', label: 'Economy', desc: 'Optimized for lighter loads.' },
          { id: 'safe', label: 'Standard', desc: 'IS 456 compliant safety.' },
          { id: 'strong', label: 'Heavy Duty', desc: 'Maximum structural stability.' }
        ],
        onChange: (id) => setPreset(id as any)
      }}
      resultsContent={
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
            <div className="text-[8px] font-black uppercase tracking-widest text-[#7B2DBF] mb-1">Single Unit</div>
            <div className="text-2xl font-black text-[#1C1C72]">
              <Odometer value={results?.singleVolume || 0} decimals={2} /> <span className="text-xs">m³</span>
            </div>
          </div>
          <div className="bg-[#7B2DBF]/5 border border-[#7B2DBF]/20 rounded-2xl p-4 shadow-sm flex flex-col justify-center transition-all hover:bg-[#7B2DBF]/10">
            <div className="text-[8px] font-black uppercase tracking-widest text-[#7B2DBF] mb-1">Final Result</div>
            <div className="text-4xl font-black text-[#7B2DBF]">
              <Odometer value={results?.totalVolume || 0} decimals={2} /> <span className="text-sm">m³</span>
            </div>
            <div className="text-[10px] text-[#7B2DBF]/60 font-bold mt-1 uppercase tracking-tight">For {count} {preset.toUpperCase()} Footings</div>
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
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>FOOTING SIZE</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{length} x {width} x {depth} M</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>NO. OF FOOTINGS</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{count}</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>PRECISE SINGLE VOLUME</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.singleVolume || 0)} CUM</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>TOTAL CONCRETE VOLUME</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600, color:'#7B2DBF' }}>{fmt(results?.totalVolume || 0)} CUM</td>
            </tr>
          </tbody>
        </table>
      }
      pdfTotalValue={`${fmt(results?.totalVolume || 0)} CUM`}
      pdfTotalSubtitle="TOTAL FOOTING VOLUME"
    />
  );
}
