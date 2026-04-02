"use client";

import React, { useState, useEffect } from 'react';
import { BaseCalculator } from '@/components/calculators/BaseCalculator';
import { calculateCompoundWall } from '@/lib/calculator-utils';
import { Grid } from 'lucide-react';
import { Odometer } from '@/components/ui/Odometer';


export default function CompoundWallCalculator() {
  const [length, setLength] = useState('50');
  const [height, setHeight] = useState('2.1');
  const [thickness, setThickness] = useState<150 | 230>(230);
  const [isCalculated, setIsCalculated] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    const l = parseFloat(length) || 0;
    const h = parseFloat(height) || 0;
    
    if (l > 0 && h > 0) {
      setResults(calculateCompoundWall(l, h, thickness));
      setIsCalculated(true);
    }
  };

  useEffect(() => {
    handleCalculate();
  }, [length, height, thickness]);

  const handleReset = () => {
    setLength('50');
    setHeight('2.1');
    setThickness(230);
    setIsCalculated(false);
    setResults(null);
  };

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 1 });

  return (
    <BaseCalculator
      title="Boundary Wall Calculator"
      description="Estimate bricks, plaster area, and foundation concrete with live architectural drafting."
      icon={<Grid className="w-5 h-5" />}
      isCalculated={isCalculated}
      onCalculate={handleCalculate}
      onReset={handleReset}
      pdfFileName={`AGNAA_Boundary_Calc.pdf`}
      pdfTitle="Boundary Wall\nCalculator"
      pdfProjectInfo={{ 'DOCUMENT TYPE': 'PLANNING GUIDELINE', 'SOURCE': 'AGNAA PRECISION ENGINE' }}
      visualizerType="WALL"
      visualizerData={{ 
        length: (parseFloat(length) || 0) * 3.28, // Convert M to FT for visualizer
        height: (parseFloat(height) || 0) * 3.28,
        thickness: thickness === 230 ? 9 : 6
      }}

      inputsContent={
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Total Length (M)</label>
              <input type="number" value={length} onChange={(e) => setLength(e.target.value)} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 50" />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Wall Height (M)</label>
              <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 2" />
            </div>
            <div className="col-span-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Wall Thickness</label>
              <select value={thickness} onChange={(e) => setThickness(parseInt(e.target.value) as any)} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors appearance-none">
                  <option value={230}>9 inch (230mm) standard</option>
                  <option value={150}>6 inch (150mm) minimum block</option>
              </select>
            </div>
          </div>
        </div>
      }

      resultsContent={
        <div className="bg-gradient-to-br from-[#1C1C72] to-[#2A1B81] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden h-full min-h-[300px] flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#7B2DBF]/20 rounded-full blur-[40px] pointer-events-none"></div>
          
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A5B4FC] mb-6">Boundary Materials</h3>
          
          <div className="text-5xl font-black mb-1"><Odometer value={results?.noOfBricks || 0} /></div>
          <div className="text-sm font-bold text-[#A5B4FC] mb-8">BRICKS / BLOCKS</div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
            <div>
              <div className="text-2xl font-bold"><Odometer value={results?.plasterAreaSQM || 0} decimals={1} /></div>
              <div className="text-[9px] font-bold text-[#A5B4FC] uppercase tracking-widest">Plaster Area (SQM)</div>
            </div>
            <div>
              <div className="text-2xl font-bold"><Odometer value={results?.concreteVolCUM || 0} decimals={2} /></div>
              <div className="text-[9px] font-bold text-[#A5B4FC] uppercase tracking-widest">Grade Beam (CUM)</div>
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
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>WALL DIMENSIONS</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{length}M L x {height}M H</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>THICKNESS</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{thickness} MM</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>PLASTER AREA</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.plasterAreaSQM || 0)} SQM</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>GRADE BEAM CONCRETE</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.concreteVolCUM || 0)} CUM</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>EST. NO OF BRICKS</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600, color:'#7B2DBF' }}>{fmt(results?.noOfBricks || 0)}</td>
            </tr>
          </tbody>
        </table>
      }
      pdfTotalValue={`${fmt(results?.noOfBricks || 0)}`}
      pdfTotalSubtitle="ESTIMATED BRICKS"
    />
  );
}
