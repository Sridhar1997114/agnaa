"use client";

import React, { useState } from 'react';
import { BaseCalculator } from '@/components/calculators/BaseCalculator';
import { calculatePlaster } from '@/lib/calculator-utils';
import { PaintRoller } from 'lucide-react'; // use an appropriate icon

export default function PlasterCalculator() {
  const [area, setArea] = useState('');
  const [thickness, setThickness] = useState('12'); // typical 12mm
  const [ratioCement, setRatioCement] = useState('1');
  const [ratioSand, setRatioSand] = useState('4');
  
  const [isCalculated, setIsCalculated] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    const a = parseFloat(area) || 0;
    const t = parseFloat(thickness) || 0;
    const rc = parseFloat(ratioCement) || 0;
    const rs = parseFloat(ratioSand) || 0;
    
    if (a > 0 && t > 0 && rc > 0 && rs > 0) {
      setResults({ a, t, rc, rs, ...calculatePlaster(a, t, [rc, rs]) });
      setIsCalculated(true);
    }
  };

  const handleReset = () => {
    setArea('');
    setThickness('12');
    setRatioCement('1');
    setRatioSand('4');
    setIsCalculated(false);
    setResults(null);
  };

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 2 });

  return (
    <BaseCalculator
      title="Plastering Calculator"
      description="Calculate the quantity of cement and sand required for wall plastering."
      icon={<PaintRoller className="w-5 h-5" />}
      isCalculated={isCalculated}
      onCalculate={handleCalculate}
      onReset={handleReset}
      pdfFileName="AGNAA_Plastering_Report.pdf"
      pdfTitle="PLASTERING ESTIMATION"
      pdfProjectInfo={{ 'DOCUMENT TYPE': 'MATERIAL ESTIMATION', 'SOURCE': 'AGNAA PRECISION ENGINE' }}
      inputsContent={
        <div className="space-y-6">
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Plastering Area (SQFT)</label>
            <input type="number" value={area} onChange={(e) => {setArea(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 500" />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Thickness of Plaster (mm)</label>
            <input type="number" value={thickness} onChange={(e) => {setThickness(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 12 or 15" />
            <p className="text-[10px] text-gray-400 mt-2">12mm for internal walls, 15mm-20mm for external walls.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Mix Ratio (Cement)</label>
              <input type="number" value={ratioCement} onChange={(e) => {setRatioCement(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Mix Ratio (Sand)</label>
              <input type="number" value={ratioSand} onChange={(e) => {setRatioSand(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" />
            </div>
          </div>
          <p className="text-[10px] text-gray-400 mt-2">1:4 ratio is commonly used for internal plaster; 1:6 for external.</p>
        </div>
      }
      resultsContent={
        <div className="bg-gradient-to-br from-[#1C1C72] to-[#2A1B81] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden h-full min-h-[300px] flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#7B2DBF]/20 rounded-full blur-[40px] pointer-events-none"></div>
          
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A5B4FC] mb-6">Material Quantities</h3>
          
          <div className="space-y-4">
            <div>
              <div className="text-sm font-bold text-[#A5B4FC] mb-1">CEMENT</div>
              <div className="text-4xl font-black text-[#7B2DBF] brightness-125 mb-1">{fmt(results?.cementBags || 0)} <span className="text-lg text-gray-300">Bags</span></div>
            </div>
            <div>
              <div className="text-sm font-bold text-[#A5B4FC] mb-1">SAND</div>
              <div className="text-4xl font-black text-[#7B2DBF] brightness-125 mb-1">{fmt(results?.sandCFT || 0)} <span className="text-lg text-gray-300">Cu.Ft.</span></div>
            </div>
          </div>
        </div>
      }
      pdfContentTable={
        <>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:11 }}>
            <thead>
              <tr style={{ background:'#1C1C72', color:'#fff' }}>
                <th style={{ padding:'12px', textAlign:'left', borderTopLeftRadius:6 }}>PARAMETER</th>
                <th style={{ padding:'12px', textAlign:'right', borderTopRightRadius:6 }}>DIVISIONS</th>
              </tr>
            </thead>
            <tbody style={{ color:'#475569' }}>
              <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
                <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>AREA (SQFT)</td>
                <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.a || 0)}</td>
              </tr>
              <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
                <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>THICKNESS (MM)</td>
                <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.t || 0)}</td>
              </tr>
              <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
                <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>MIX RATIO</td>
                <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{results?.rc} : {results?.rs}</td>
              </tr>
              
              <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
                <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>CEMENT REQUIRED</td>
                <td style={{ padding:'12px', textAlign:'right', fontWeight:800, color:'#7B2DBF', fontSize:14 }}>{fmt(results?.cementBags || 0)} Bags</td>
              </tr>
              <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
                <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>SAND REQUIRED</td>
                <td style={{ padding:'12px', textAlign:'right', fontWeight:800, color:'#7B2DBF', fontSize:14 }}>{fmt(results?.sandCFT || 0)} Cu.Ft.</td>
              </tr>
            </tbody>
          </table>
          <div style={{ marginTop:20, fontSize:9, color:'#64748B', lineHeight:1.5 }}>
            <strong>Note:</strong> Cement weight per bag is taken as 50kg. Wastage factors (~30% dry volume factor) have been considered. Actual consumption may vary depending on surface undulations.
          </div>
        </>
      }
      pdfTotalValue={`${fmt(results?.cementBags || 0)} Bags / ${fmt(results?.sandCFT || 0)} CFT`}
      pdfTotalSubtitle="TOTAL CEMENT AND SAND"
    />
  );
}
