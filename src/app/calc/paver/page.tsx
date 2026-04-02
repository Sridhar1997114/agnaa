"use client";

import React, { useState } from 'react';
import { BaseCalculator } from '@/components/calculators/BaseCalculator';
import { calculatePaver } from '@/lib/calculator-utils';
import { Grid } from 'lucide-react';
import { Odometer } from '@/components/ui/Odometer';

export default function PaverCalculator() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [paverL, setPaverL] = useState('0.2');
  const [paverW, setPaverW] = useState('0.1');
  const [isCalculated, setIsCalculated] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const pl = parseFloat(paverL) || 0;
    const pw = parseFloat(paverW) || 0;
    
    if (l > 0 && w > 0 && pl > 0 && pw > 0) {
      setResults(calculatePaver(l, w, pl, pw));
      setIsCalculated(true);
    }
  };

  const handleReset = () => {
    setLength('');
    setWidth('');
    setPaverL('0.2');
    setPaverW('0.1');
    setIsCalculated(false);
    setResults(null);
  };

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 2 });

  return (
    <BaseCalculator
      title="Paver & Driveway Calculator"
      description="Estimate the number of paving blocks needed for driveways or pathways."
      icon={<Grid className="w-5 h-5" />}
      isCalculated={isCalculated}
      onCalculate={handleCalculate}
      onReset={handleReset}
      pdfFileName={`AGNAA_Paver_${fmt(results?.count || 0)}Nos.pdf`}
      pdfTitle={"Paver & Driveway\nCalculator"}
      pdfProjectInfo={{ 'DOCUMENT TYPE': 'PLANNING GUIDELINE', 'SOURCE': 'AGNAA PRECISION ENGINE' }}
      visualizerType="FLOOR"
      visualizerData={{ 
        length: (parseFloat(length) || 10) * 3.281, 
        width: (parseFloat(width) || 4) * 3.281,
        pattern: 'GRID',
        tileSize: (parseFloat(paverL) || 0.2) * 39.37 // Convert M to Inch for visualizer
      }}
      inputsContent={
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Driveway Length (M)</label>
            <input type="number" value={length} onChange={(e) => {setLength(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 10" />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Driveway Width (M)</label>
            <input type="number" value={width} onChange={(e) => {setWidth(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 4" />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Paver Length (M)</label>
            <input type="number" value={paverL} onChange={(e) => {setPaverL(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 0.2" />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Paver Width (M)</label>
            <input type="number" value={paverW} onChange={(e) => {setPaverW(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 0.1" />
          </div>
        </div>
      }
      resultsContent={
        <div className="bg-gradient-to-br from-[#1C1C72] to-[#2A1B81] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden h-full min-h-[300px] flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#7B2DBF]/20 rounded-full blur-[40px] pointer-events-none"></div>
          
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A5B4FC] mb-6">PAVER ESTIMATE</h3>
          
          <div className="text-5xl font-black mb-1 flex items-baseline gap-1">
            <Odometer value={results?.count || 0} />
          </div>
          <div className="text-sm font-bold text-[#A5B4FC] mb-8">TOTAL PAVERS (NOS)</div>

          <div className="grid grid-cols-2 gap-y-6 gap-x-2">
            <div>
              <div className="text-2xl font-bold flex items-baseline gap-1">
                <Odometer value={results?.area || 0} decimals={2} />
              </div>
              <div className="text-[9px] font-bold text-[#A5B4FC] uppercase tracking-widest">Total Area (SQM)</div>
            </div>
            <div>
              <div className="text-2xl font-bold flex items-baseline gap-1">
                <Odometer value={results?.edgeLength || 0} decimals={2} />
              </div>
              <div className="text-[9px] font-bold text-[#A5B4FC] uppercase tracking-widest">Edge Length (RM)</div>
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
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>DRIVEWAY DIMENSIONS</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{length} x {width} M</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>PAVER DIMENSIONS</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{paverL} x {paverW} M</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>TOTAL AREA</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.area || 0)} SQM</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>ESTIMATED PAVERS (+5% WASH)</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600, color:'#7B2DBF' }}>{fmt(results?.count || 0)} NOS</td>
            </tr>
          </tbody>
        </table>
      }
      pdfTotalValue={`${fmt(results?.count || 0)} NOS`}
      pdfTotalSubtitle="TOTAL PAVERS"
    />
  );
}
