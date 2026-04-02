"use client";

import React, { useState } from 'react';
import { BaseCalculator } from '@/components/calculators/BaseCalculator';
import { calculateFlooringPro } from '@/lib/calculator-utils';
import { Grid } from 'lucide-react';
import { Odometer } from '@/components/ui/Odometer';

export default function FlooringCostCalculator() {
  const [area, setArea] = useState('');
  const [matCost, setMatCost] = useState('');
  const [labCost, setLabCost] = useState('');
  const [wastage, setWastage] = useState('5');
  const [isCalculated, setIsCalculated] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    const a = parseFloat(area) || 0;
    const m = parseFloat(matCost) || 0;
    const l = parseFloat(labCost) || 0;
    const w = parseFloat(wastage) || 0;
    
    if (a > 0) {
      setResults(calculateFlooringPro(a, m, l, w));
      setIsCalculated(true);
    }
  };

  const handleReset = () => {
    setArea('');
    setMatCost('');
    setLabCost('');
    setWastage('5');
    setIsCalculated(false);
    setResults(null);
  };

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 2 });

  return (
    <BaseCalculator
      title="Pro Flooring Cost Calculator"
      description="Calculate comprehensive flooring costs including materials, layout wastage, and labor."
      icon={<Grid className="w-5 h-5" />}
      isCalculated={isCalculated}
      onCalculate={handleCalculate}
      onReset={handleReset}
      pdfFileName={`AGNAA_FlooringCost_${fmt(results?.totalArea || 0)}SQM.pdf`}
      pdfTitle={"Pro Flooring\nCost Estimator"}
      pdfProjectInfo={{ 'DOCUMENT TYPE': 'PLANNING GUIDELINE', 'SOURCE': 'AGNAA PRECISION ENGINE' }}
      inputsContent={
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Floor Area (SQM)</label>
            <input type="number" value={area} onChange={(e) => {setArea(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 50" />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Material Cost/SQM</label>
            <input type="number" value={matCost} onChange={(e) => {setMatCost(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 1200" />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Labor Cost/SQM</label>
            <input type="number" value={labCost} onChange={(e) => {setLabCost(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 300" />
          </div>
          <div className="col-span-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Wastage %</label>
            <select value={wastage} onChange={(e) => {setWastage(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors">
              <option value="5">5% (Standard Straight)</option>
              <option value="10">10% (Diagonal / Complex)</option>
              <option value="15">15% (Custom Patterns)</option>
            </select>
          </div>
        </div>
      }
      resultsContent={
        <div className="bg-gradient-to-br from-[#1C1C72] to-[#2A1B81] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden h-full min-h-[300px] flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#7B2DBF]/20 rounded-full blur-[40px] pointer-events-none"></div>
          
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A5B4FC] mb-6">ESTIMATED TOTAL COST</h3>
          
          <div className="text-5xl font-black mb-1 flex items-baseline gap-1">
            <span>₹</span><Odometer value={results?.total || 0} />
          </div>
          <div className="text-sm font-bold text-[#A5B4FC] mb-8">TOTAL PROJECT COST</div>

          <div className="grid grid-cols-2 gap-y-6 gap-x-2">
            <div>
              <div className="text-2xl font-bold flex items-baseline gap-1">
                <span>₹</span><Odometer value={results?.totalMat || 0} />
              </div>
              <div className="text-[9px] font-bold text-[#A5B4FC] uppercase tracking-widest">Material Cost</div>
            </div>
            <div>
              <div className="text-2xl font-bold flex items-baseline gap-1">
                <span>₹</span><Odometer value={results?.totalLab || 0} />
              </div>
              <div className="text-[9px] font-bold text-[#A5B4FC] uppercase tracking-widest">Labor Cost</div>
            </div>
            <div>
              <div className="text-2xl font-bold flex items-baseline gap-1">
                <Odometer value={results?.totalArea || 0} decimals={2} />
              </div>
              <div className="text-[9px] font-bold text-[#A5B4FC] uppercase tracking-widest">Gross Mat Area (SQM)</div>
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
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>NET FLOOR AREA</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{area} SQM</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>GROSS MAT AREA ({wastage}% WASTAGE)</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.totalArea || 0)} SQM</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>MATERIAL COST</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>₹{fmt(results?.totalMat || 0)}</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>LABOR COST</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>₹{fmt(results?.totalLab || 0)}</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>TOTAL ESTIMATE</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600, color:'#7B2DBF' }}>₹{fmt(results?.total || 0)}</td>
            </tr>
          </tbody>
        </table>
      }
      pdfTotalValue={`₹${fmt(results?.total || 0)}`}
      pdfTotalSubtitle="TOTAL PROJECT COST"
      visualizerType="FLOOR"
      visualizerData={results ? {
        area: parseFloat(area),
      } : undefined}
    />
  );
}
