"use client";

import React, { useState } from 'react';
import { BaseCalculator } from '@/components/calculators/BaseCalculator';
import { calculateRoofing } from '@/lib/calculator-utils';
import { Home } from 'lucide-react';
import { Odometer } from '@/components/ui/Odometer';

export default function RoofingCalculator() {
  const [area, setArea] = useState('');
  const [isPitched, setIsPitched] = useState(false);
  const [pitch, setPitch] = useState('30');
  const [isCalculated, setIsCalculated] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    const a = parseFloat(area) || 0;
    const p = parseFloat(pitch) || 0;
    
    if (a > 0) {
      setResults(calculateRoofing(a, isPitched, p));
      setIsCalculated(true);
    }
  };

  const handleReset = () => {
    setArea('');
    setIsPitched(false);
    setPitch('30');
    setIsCalculated(false);
    setResults(null);
  };

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 1 });

  return (
    <BaseCalculator
      title="Roofing Materials Calculator"
      description="Estimate the number of roofing sheets required for a flat or pitched roof."
      icon={<Home className="w-5 h-5" />}
      isCalculated={isCalculated}
      onCalculate={handleCalculate}
      onReset={handleReset}
      pdfFileName={`AGNAA_Roofing_Calc_${fmt(results?.noOfSheets || 0)}Sheets.pdf`}
      pdfTitle="Roofing Materials\nCalculator"
      pdfProjectInfo={{ 'DOCUMENT TYPE': 'PLANNING GUIDELINE', 'SOURCE': 'AGNAA PRECISION ENGINE' }}
      visualizerType="ROOF"
      visualizerData={{ 
        length: Math.sqrt(parseFloat(area) || 1000), 
        width: Math.sqrt(parseFloat(area) || 1000),
        slope: parseFloat(pitch) || 0,
        roofType: 'SHEETS'
      }}

      inputsContent={
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 md:col-span-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Plan Roof Area (SQFT)</label>
            <input type="number" value={area} onChange={(e) => {setArea(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 1000" />
          </div>
          <div className="col-span-2 md:col-span-1 flex flex-col justify-center mt-4 md:mt-0">
             <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input type="checkbox" checked={isPitched} onChange={(e) => {setIsPitched(e.target.checked); setIsCalculated(false);}} className="sr-only" />
                <div className={`block w-10 h-6 rounded-full transition-colors ${isPitched ? 'bg-[#7B2DBF]' : 'bg-gray-300'}`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isPitched ? 'translate-x-4' : ''}`}></div>
              </div>
              <span className="text-sm font-black text-[#1C1C72] uppercase tracking-widest">Pitched Roof?</span>
            </label>
          </div>
          {isPitched && (
            <div className="col-span-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Roof Pitch (Degrees)</label>
              <input type="number" value={pitch} onChange={(e) => {setPitch(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 30" />
            </div>
          )}
        </div>
      }
      resultsContent={
        <div className="bg-gradient-to-br from-[#1C1C72] to-[#2A1B81] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden h-full min-h-[300px] flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#7B2DBF]/20 rounded-full blur-[40px] pointer-events-none"></div>
          
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A5B4FC] mb-6">Roofing Estimate</h3>
          
          <div className="mb-8">
            <div className="text-sm font-bold text-[#A5B4FC] mb-1">NO. OF STANDARD SHEETS (10x3.5 FT)</div>
            <div className="text-6xl font-black text-[#7B2DBF] brightness-125 flex items-baseline gap-2">
              <Odometer value={results?.noOfSheets || 0} />
              <span className="text-lg text-gray-400">Sheets</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-y-6 gap-x-4 border-t border-white/10 pt-6">
            <div>
              <div className="text-sm font-bold text-[#A5B4FC] mb-1 uppercase tracking-wider">Actual Area</div>
              <div className="text-2xl font-black flex items-baseline gap-1">
                <Odometer value={results?.actualArea || 0} />
                <span className="text-xs text-gray-400">SQFT</span>
              </div>
            </div>
            <div>
              <div className="text-sm font-bold text-[#A5B4FC] mb-1 uppercase tracking-wider">Ridge Cap</div>
              <div className="text-2xl font-black flex items-baseline gap-1">
                <Odometer value={results?.ridgeLengthFT || 0} />
                <span className="text-xs text-gray-400">FT</span>
              </div>
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
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>PLAN AREA</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{area} SQFT</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>ROOF TYPE</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{isPitched ? `PITCHED (${pitch} DEG)` : 'FLAT'}</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>ACTUAL SLANTED AREA</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.actualArea || 0)} SQFT</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>ROOFING SHEETS</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600, color:'#7B2DBF' }}>{fmt(results?.noOfSheets || 0)} SHEETS</td>
            </tr>
          </tbody>
        </table>
      }
      pdfTotalValue={`${fmt(results?.noOfSheets || 0)} SHEETS`}
      pdfTotalSubtitle="ESTIMATED SHEETS"
    />
  );
}
