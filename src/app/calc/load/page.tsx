"use client";

import React, { useState } from 'react';
import { BaseCalculator } from '@/components/calculators/BaseCalculator';
import { calculateLoad } from '@/lib/calculator-utils';
import { Building2 } from 'lucide-react';
import { Odometer } from '@/components/ui/Odometer';

export default function LoadCalculator() {
  const [area, setArea] = useState('');
  const [deadLoad, setDeadLoad] = useState('4.0');
  const [liveLoad, setLiveLoad] = useState('2.0');
  const [isCalculated, setIsCalculated] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    const a = parseFloat(area) || 0;
    const d = parseFloat(deadLoad) || 0;
    const l = parseFloat(liveLoad) || 0;
    
    if (a > 0) {
      setResults(calculateLoad(a, d, l));
      setIsCalculated(true);
    }
  };

  const handleReset = () => {
    setArea('');
    setDeadLoad('4.0');
    setLiveLoad('2.0');
    setIsCalculated(false);
    setResults(null);
  };

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 2 });

  return (
    <BaseCalculator
      title="Slab Load Estimator"
      description="Estimate basic DL and LL for slabs in KN."
      icon={<Building2 className="w-5 h-5" />}
      isCalculated={isCalculated}
      onCalculate={handleCalculate}
      onReset={handleReset}
      pdfFileName={`AGNAA_Loads_${fmt(results?.total || 0)}KN.pdf`}
      pdfTitle={"Slab Load\nEstimator"}
      pdfProjectInfo={{ 'DOCUMENT TYPE': 'PLANNING GUIDELINE', 'SOURCE': 'AGNAA PRECISION ENGINE' }}
      inputsContent={
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Slab Area (SQM)</label>
            <input type="number" value={area} onChange={(e) => {setArea(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 100" />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Dead Load (KN/M²)</label>
            <input type="number" value={deadLoad} onChange={(e) => {setDeadLoad(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Live Load (KN/M²)</label>
            <input type="number" value={liveLoad} onChange={(e) => {setLiveLoad(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" />
          </div>
        </div>
      }
      resultsContent={
        <div className="bg-gradient-to-br from-[#1C1C72] to-[#2A1B81] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden h-full min-h-[300px] flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#7B2DBF]/20 rounded-full blur-[40px] pointer-events-none"></div>
          
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A5B4FC] mb-6">LOAD ESTIMATE</h3>
          
          <div className="text-5xl font-black mb-1">
            <Odometer value={results?.total || 0} decimals={2} />
          </div>
          <div className="text-sm font-bold text-[#A5B4FC] mb-8">TOTAL LOAD (KN)</div>

          <div className="grid grid-cols-2 gap-y-6 gap-x-2">
            <div>
              <div className="text-2xl font-bold">
                <Odometer value={results?.totalDead || 0} decimals={2} />
              </div>
              <div className="text-[9px] font-bold text-[#A5B4FC] uppercase tracking-widest">Total DL (KN)</div>
            </div>
            <div>
              <div className="text-2xl font-bold">
                <Odometer value={results?.totalLive || 0} decimals={2} />
              </div>
              <div className="text-[9px] font-bold text-[#A5B4FC] uppercase tracking-widest">Total LL (KN)</div>
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
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>SLAB AREA</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{area} SQM</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>TOTAL DEAD LOAD</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.totalDead || 0)} KN</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>TOTAL LIVE LOAD</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.totalLive || 0)} KN</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>COMBINED TOTAL LOAD</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600, color:'#7B2DBF' }}>{fmt(results?.total || 0)} KN</td>
            </tr>
          </tbody>
        </table>
      }
      pdfTotalValue={`${fmt(results?.total || 0)} KN`}
      pdfTotalSubtitle="TOTAL LOAD"
    />
  );
}
