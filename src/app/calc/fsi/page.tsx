"use client";

import React, { useState } from 'react';
import { BaseCalculator } from '@/components/calculators/BaseCalculator';
import { calculateFSI, calculateMaxBuiltUpArea } from '@/lib/calculator-utils';
import { Building2 } from 'lucide-react';
import { Odometer } from '@/components/ui/Odometer';

export default function FSICalculator() {
  const [plotArea, setPlotArea] = useState('');
  const [mode, setMode] = useState<'calc-fsi' | 'calc-area'>('calc-fsi');
  const [builtUpArea, setBuiltUpArea] = useState('');
  const [fsiValue, setFsiValue] = useState('');
  
  const [isCalculated, setIsCalculated] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    const pArea = parseFloat(plotArea) || 0;
    
    if (mode === 'calc-fsi') {
      const bArea = parseFloat(builtUpArea) || 0;
      if (pArea > 0 && bArea > 0) {
        setResults({ mode, pArea, bArea, ...calculateFSI(pArea, bArea) });
        setIsCalculated(true);
      }
    } else {
      const fValue = parseFloat(fsiValue) || 0;
      if (pArea > 0 && fValue > 0) {
        setResults({ mode, pArea, fValue, ...calculateMaxBuiltUpArea(pArea, fValue) });
        setIsCalculated(true);
      }
    }
  };

  const handleReset = () => {
    setPlotArea('');
    setBuiltUpArea('');
    setFsiValue('');
    setIsCalculated(false);
    setResults(null);
  };

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 2 });

  return (
    <BaseCalculator
      title="FAR / FSI Calculator"
      description="Calculate the Floor Area Ratio (FAR) / Floor Space Index (FSI) or determine the maximum allowable built-up area for your plot."
      icon={<Building2 className="w-5 h-5" />}
      isCalculated={isCalculated}
      onCalculate={handleCalculate}
      onReset={handleReset}
      pdfFileName={`AGNAA_FSI_Report.pdf`}
      pdfTitle="FAR / FSI\nConfiguration"
      pdfProjectInfo={{ 'DOCUMENT TYPE': 'DEVELOPMENT POTENTIAL', 'SOURCE': 'AGNAA PRECISION ENGINE' }}
      visualizerType="FSI"
      visualizerData={{ 
        plotArea: results?.pArea || parseFloat(plotArea), 
        builtUpArea: results?.bArea || results?.maxBuiltUpArea, 
        fsi: results?.fsi || parseFloat(fsiValue) || 1.0,
        unit: 'FT' // Standardizing on FT for layout previews
      }}
      inputsContent={
        <div className="space-y-6">
          <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
            <button
              onClick={() => {setMode('calc-fsi'); setIsCalculated(false);}}
              className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${mode === 'calc-fsi' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Calculate FSI
            </button>
            <button
              onClick={() => {setMode('calc-area'); setIsCalculated(false);}}
              className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${mode === 'calc-area' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Max Built-up Area
            </button>
          </div>

          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Plot Area (SQFT or SQM)</label>
            <input type="number" value={plotArea} onChange={(e) => {setPlotArea(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 2400" />
            <p className="text-[10px] text-gray-400 mt-2">Ensure all area inputs use the same unit (SqFt or Sqm).</p>
          </div>

          {mode === 'calc-fsi' ? (
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Total Built-Up Area</label>
              <input type="number" value={builtUpArea} onChange={(e) => {setBuiltUpArea(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 3600" />
            </div>
          ) : (
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Permissible FSI / FAR</label>
              <input type="number" step="0.1" value={fsiValue} onChange={(e) => {setFsiValue(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 1.5" />
            </div>
          )}
        </div>
      }
      resultsContent={
        <div className="bg-gradient-to-br from-[#1C1C72] to-[#2A1B81] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden h-full min-h-[300px] flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#7B2DBF]/20 rounded-full blur-[40px] pointer-events-none"></div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A5B4FC] mb-6">
            {results?.mode === 'calc-fsi' ? 'Calculated Floor Space Index' : 'Maximum Permissible Area'}
          </h3>
          
          {results?.mode === 'calc-fsi' ? (
            <div>
              <div className="text-sm font-bold text-[#A5B4FC] mb-1">COMPUTED FSI (FAR)</div>
              <div className="text-6xl font-black text-[#7B2DBF] brightness-125 mb-4">
                <Odometer value={results?.fsi || 0} decimals={2} />
              </div>
              <p className="text-sm text-gray-300">You are building {fmt(results?.fsi || 0)} times the area of your plot.</p>
            </div>
          ) : (
            <div>
              <div className="text-sm font-bold text-[#A5B4FC] mb-1">MAX. BUILT-UP AREA</div>
              <div className="text-5xl font-black text-[#7B2DBF] brightness-125 mb-4">
                <Odometer value={results?.maxBuiltUpArea || 0} decimals={2} /> <span className="text-lg text-gray-300">UNITS</span>
              </div>
              <p className="text-sm text-gray-300">Based on a plot area of {fmt(results?.pArea || 0)} and an FSI of {fmt(results?.fValue || 0)}.</p>
            </div>
          )}
        </div>
      }
      pdfContentTable={
        <>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:11 }}>
            <thead>
              <tr style={{ background:'#1C1C72', color:'#fff' }}>
                <th style={{ padding:'12px', textAlign:'left', borderTopLeftRadius:6 }}>PARAMETER</th>
                <th style={{ padding:'12px', textAlign:'right', borderTopRightRadius:6 }}>VALUE</th>
              </tr>
            </thead>
            <tbody style={{ color:'#475569' }}>
              <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
                <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>PLOT AREA</td>
                <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.pArea || 0)}</td>
              </tr>
              {results?.mode === 'calc-fsi' ? (
                <>
                  <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
                    <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>TOTAL BUILT-UP AREA</td>
                    <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.bArea || 0)}</td>
                  </tr>
                  <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
                    <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>COMPUTED FSI / FAR</td>
                    <td style={{ padding:'12px', textAlign:'right', fontWeight:600, color:'#7B2DBF', fontSize:14 }}>{fmt(results?.fsi || 0)}</td>
                  </tr>
                </>
              ) : (
                <>
                  <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
                    <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>PERMISSIBLE FSI / FAR</td>
                    <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.fValue || 0)}</td>
                  </tr>
                  <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
                    <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>MAXIMUM BUILT-UP AREA</td>
                    <td style={{ padding:'12px', textAlign:'right', fontWeight:600, color:'#7B2DBF', fontSize:14 }}>{fmt(results?.maxBuiltUpArea || 0)}</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
          <div style={{ marginTop:20, fontSize:9, color:'#64748B', lineHeight:1.5 }}>
            <strong>Note:</strong> FSI (Floor Space Index) or FAR (Floor Area Ratio) is the ratio of a building's total floor area (zoning floor area) to the size of the piece of land upon which it is built. Local municipal regulations often govern maximum allowable FSI.
          </div>
        </>
      }
      pdfTotalValue={results?.mode === 'calc-fsi' ? fmt(results?.fsi || 0) : `${fmt(results?.maxBuiltUpArea || 0)} UNITS`}
      pdfTotalSubtitle={results?.mode === 'calc-fsi' ? 'COMPUTED FSI' : 'MAXIMUM BUILT-UP AREA'}
    />
  );
}
