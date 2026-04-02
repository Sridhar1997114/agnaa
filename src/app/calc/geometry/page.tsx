"use client";

import React, { useState } from 'react';
import { BaseCalculator } from '@/components/calculators/BaseCalculator';
import { calculateGeometry } from '@/lib/calculator-utils';
import { Square } from 'lucide-react';
import { Odometer } from '@/components/ui/Odometer';

export default function GeometryCalculator() {
  const [shape, setShape] = useState<'rect'|'circle'|'triangle'>('rect');
  const [dimA, setDimA] = useState('');
  const [dimB, setDimB] = useState('');
  const [isCalculated, setIsCalculated] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    const a = parseFloat(dimA) || 0;
    const b = parseFloat(dimB) || 0;
    
    if (a > 0) {
      setResults(calculateGeometry(shape, a, b));
      setIsCalculated(true);
    }
  };

  const handleReset = () => {
    setShape('rect');
    setDimA('');
    setDimB('');
    setIsCalculated(false);
    setResults(null);
  };

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 2 });

  return (
    <BaseCalculator
      title="Geometry Explorer"
      description="Calculate basic geometry area and perimeter profiles."
      icon={<Square className="w-5 h-5" />}
      isCalculated={isCalculated}
      onCalculate={handleCalculate}
      onReset={handleReset}
      pdfFileName={`AGNAA_Geometry_${fmt(results?.area || 0)}SQM.pdf`}
      pdfTitle={"Geometry\nExplorer"}
      pdfProjectInfo={{ 'DOCUMENT TYPE': 'PLANNING GUIDELINE', 'SOURCE': 'AGNAA PRECISION ENGINE' }}
      inputsContent={
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Shape Profile</label>
            <select value={shape} onChange={(e) => {setShape(e.target.value as any); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors">
              <option value="rect">Rectangle / Square</option>
              <option value="circle">Circle</option>
              <option value="triangle">Right Triangle</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">{shape === 'circle' ? 'Radius (M)' : shape === 'rect' ? 'Length (M)' : 'Base (M)'}</label>
            <input type="number" value={dimA} onChange={(e) => {setDimA(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" />
          </div>
          {shape !== 'circle' && (
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">{shape === 'rect' ? 'Width (M)' : 'Height (M)'}</label>
              <input type="number" value={dimB} onChange={(e) => {setDimB(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" />
            </div>
          )}
        </div>
      }
      resultsContent={
        <div className="bg-gradient-to-br from-[#1C1C72] to-[#2A1B81] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden h-full min-h-[300px] flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#7B2DBF]/20 rounded-full blur-[40px] pointer-events-none"></div>
          
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A5B4FC] mb-6">SHAPE PROFILE RESULT</h3>
          
          <div className="text-5xl font-black mb-1">
            <Odometer value={results?.area || 0} decimals={2} />
          </div>
          <div className="text-sm font-bold text-[#A5B4FC] mb-8">TOTAL AREA (SQM)</div>

          <div className="grid grid-cols-2 gap-y-6 gap-x-2">
            <div>
              <div className="text-2xl font-bold">
                <Odometer value={results?.perimeter || 0} decimals={2} />
              </div>
              <div className="text-[9px] font-bold text-[#A5B4FC] uppercase tracking-widest">Perimeter (M)</div>
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
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>SHAPE</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600, textTransform:'uppercase' }}>{shape}</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>TOTAL PERIMETER</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.perimeter || 0)} M</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>TOTAL AREA</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600, color:'#7B2DBF' }}>{fmt(results?.area || 0)} SQM</td>
            </tr>
          </tbody>
        </table>
      }
      pdfTotalValue={`${fmt(results?.area || 0)} SQM`}
      pdfTotalSubtitle="CALCULATED AREA"
    />
  );
}
