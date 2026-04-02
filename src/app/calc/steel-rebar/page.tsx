"use client";

import React, { useState } from 'react';
import { BaseCalculator } from '@/components/calculators/BaseCalculator';
import { calculateSteelRebar } from '@/lib/calculator-utils';
import { Building2 } from 'lucide-react';
import { Odometer } from '@/components/ui/Odometer';

export default function SteelCalculator() {
  const [area, setArea] = useState('');
  const [type, setType] = useState<'slab' | 'beam' | 'column' | 'footing'>('slab');
  const [isCalculated, setIsCalculated] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    const a = parseFloat(area) || 0;
    
    if (a > 0) {
      setResults(calculateSteelRebar(a, type));
      setIsCalculated(true);
    }
  };

  const handleReset = () => {
    setArea('');
    setType('slab');
    setIsCalculated(false);
    setResults(null);
  };

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 1 });

  return (
    <BaseCalculator
      title="Steel Rebar Estimator"
      description="Thumb-rule estimation of steel weight for various structural elements."
      icon={<Building2 className="w-5 h-5" />}
      isCalculated={isCalculated}
      onCalculate={handleCalculate}
      onReset={handleReset}
      pdfFileName={`AGNAA_Steel_Calc_${fmt(results?.steelTons || 0)}Tons.pdf`}
      pdfTitle="Steel Rebar\nEstimator"
      pdfProjectInfo={{ 'DOCUMENT TYPE': 'PLANNING GUIDELINE', 'SOURCE': 'AGNAA PRECISION ENGINE' }}
      visualizerType="STEEL"
      visualizerData={{ area, type, results }}
      inputsContent={
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Plan Area (SQFT)</label>
            <input type="number" value={area} onChange={(e) => {setArea(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 1000" />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Element Type</label>
            <select value={type} onChange={(e) => {setType(e.target.value as any); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors">
                <option value="slab">Slab</option>
                <option value="beam">Beam</option>
                <option value="column">Column</option>
                <option value="footing">Footing</option>
            </select>
          </div>
        </div>
      }
      resultsContent={
        <div className="bg-gradient-to-br from-[#1C1C72] to-[#2A1B81] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden h-full min-h-[300px] flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#7B2DBF]/20 rounded-full blur-[40px] pointer-events-none"></div>
          
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A5B4FC] mb-6">Steel Weight</h3>
          
          <div className="text-5xl font-black mb-1 flex items-baseline gap-1">
            <Odometer value={results?.steelKg || results?.steelWeight || 0} />
          </div>
          <div className="text-sm font-bold text-[#A5B4FC] mb-8">TOTAL WEIGHT (KG)</div>

          <div className="grid grid-cols-2 gap-y-6 gap-x-4">
            <div>
              <div className="text-2xl font-bold flex items-baseline gap-1">
                 <Odometer value={results?.steelTons || 0} decimals={2} />
              </div>
              <div className="text-[9px] font-bold text-[#A5B4FC] uppercase tracking-widest">Weight in Tons</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{results?.thumbRuleKgSqft}</div>
              <div className="text-[9px] font-bold text-[#A5B4FC] uppercase tracking-widest">Thumb-rule (KG/SQFT)</div>
            </div>
          </div>
          <div className="mt-8 text-xs text-white/50 border-t border-white/10 pt-4">
            * Note: Steel quantities are thumb rule estimates. Final steel depends heavily on structural design and Bar Bending Schedule.
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
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>ELEMENT TYPE</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{type.toUpperCase()}</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>PLAN AREA</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{area} SQFT</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>ESTIMATED WEIGHT (TONS)</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.steelTons || 0)} TONS</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>ESTIMATED WEIGHT (KG)</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600, color:'#7B2DBF' }}>{fmt(results?.steelWeight || 0)} KG</td>
            </tr>
          </tbody>
        </table>
      }
      pdfTotalValue={`${fmt(results?.steelWeight || 0)} KG`}
      pdfTotalSubtitle="TOTAL ESTIMATED STEEL"
    />
  );
}
