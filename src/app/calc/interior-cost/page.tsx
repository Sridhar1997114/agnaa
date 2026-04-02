"use client";

import React, { useState } from 'react';
import { BaseCalculator } from '@/components/calculators/BaseCalculator';
import { calculateInteriorCost } from '@/lib/calculator-utils';
import { LayoutDashboard } from 'lucide-react';
import { Odometer } from '@/components/ui/Odometer';

export default function InteriorCostCalculator() {
  const [area, setArea] = useState('');
  const [tier, setTier] = useState<'budget' | 'medium' | 'premium'>('medium');
  const [isCalculated, setIsCalculated] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    const a = parseFloat(area) || 0;
    
    if (a > 0) {
      setResults(calculateInteriorCost(a, tier));
      setIsCalculated(true);
    }
  };

  const handleReset = () => {
    setArea('');
    setTier('medium');
    setIsCalculated(false);
    setResults(null);
  };

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 0 });

  return (
    <BaseCalculator
      title="Interior Fit-Out Estimate"
      description="Rough budget estimate for interior design and execution based on finish quality."
      icon={<LayoutDashboard className="w-5 h-5" />}
      isCalculated={isCalculated}
      onCalculate={handleCalculate}
      onReset={handleReset}
      pdfFileName={`AGNAA_Interior_Calc.pdf`}
      pdfTitle="Interior Fit-Out\nEstimate"
      pdfProjectInfo={{ 'DOCUMENT TYPE': 'PLANNING GUIDELINE', 'SOURCE': 'AGNAA PRECISION ENGINE' }}
      visualizerType="INTERIOR"
      visualizerData={{ 
        area: parseFloat(area) || 0,
        tier: tier,
        totalCost: results?.totalCost
      }}
      inputsContent={
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Carpet Area (SQFT)</label>
            <input type="number" value={area} onChange={(e) => {setArea(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 1000" />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Quality Level</label>
            <select value={tier} onChange={(e) => {setTier(e.target.value as any); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors">
                <option value="budget">Basic / Budget (₹800/sqft)</option>
                <option value="medium">Medium / Standard (₹1500/sqft)</option>
                <option value="premium">Premium / Luxury (₹2500/sqft)</option>
            </select>
          </div>
        </div>
      }
      resultsContent={
        <div className="bg-gradient-to-br from-[#1C1C72] to-[#2A1B81] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden h-full min-h-[300px] flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#7B2DBF]/20 rounded-full blur-[40px] pointer-events-none"></div>
          
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A5B4FC] mb-6">Estimated Cost</h3>
          
          <div className="text-4xl md:text-5xl font-black mb-1 flex items-baseline gap-1">
            <span>₹</span><Odometer value={results?.totalCost || 0} />
          </div>
          <div className="text-sm font-bold text-[#A5B4FC] mb-8">TOTAL INTERIOR BUDGET</div>

          <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs border-b border-white/10 pb-1">
                <span className="font-bold text-[#A5B4FC] uppercase tracking-widest">Woodwork (40%)</span>
                <span className="font-black flex items-baseline gap-1">
                  <span>₹</span><Odometer value={results?.woodwork || 0} />
                </span>
              </div>
              <div className="flex justify-between items-center text-xs border-b border-white/10 pb-1">
                <span className="font-bold text-[#A5B4FC] uppercase tracking-widest">Flooring & Tiling (20%)</span>
                <span className="font-black flex items-baseline gap-1">
                  <span>₹</span><Odometer value={results?.flooring || 0} />
                </span>
              </div>
              <div className="flex justify-between items-center text-xs border-b border-white/10 pb-1">
                <span className="font-bold text-[#A5B4FC] uppercase tracking-widest">Painting & False Ceiling (15%)</span>
                <span className="font-black flex items-baseline gap-1">
                  <span>₹</span><Odometer value={results?.painting || 0} />
                </span>
              </div>
               <div className="flex justify-between items-center text-xs border-b border-white/10 pb-1">
                <span className="font-bold text-[#A5B4FC] uppercase tracking-widest">Electricals (10%)</span>
                <span className="font-black flex items-baseline gap-1">
                  <span>₹</span><Odometer value={results?.electrical || 0} />
                </span>
              </div>
               <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#A5B4FC] uppercase tracking-widest">Misc / Plumbing (15%)</span>
                <span className="font-black flex items-baseline gap-1">
                  <span>₹</span><Odometer value={results?.miscellaneous || 0} />
                </span>
              </div>
          </div>
        </div>
      }
      pdfContentTable={
        <table style={{ width:'100%', borderCollapse:'collapse', fontSize:11 }}>
          <thead>
            <tr style={{ background:'#1C1C72', color:'#fff' }}>
              <th style={{ padding:'12px', textAlign:'left', borderTopLeftRadius:6 }}>CATEGORY</th>
              <th style={{ padding:'12px', textAlign:'right', borderTopRightRadius:6 }}>EST. COST (₹)</th>
            </tr>
          </thead>
          <tbody style={{ color:'#475569' }}>
            <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>WOODWORK & WARDROBES</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>₹{fmt(results?.woodwork || 0)}</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>FLOORING & TILING</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>₹{fmt(results?.flooring || 0)}</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>PAINTING & FALSE CEILING</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>₹{fmt(results?.painting || 0)}</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>ELECTRICAL & LIGHTING</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>₹{fmt(results?.electrical || 0)}</td>
            </tr>
             <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>PLUMBING & MISC</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>₹{fmt(results?.miscellaneous || 0)}</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>TOTAL INTERIOR COST</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600, color:'#7B2DBF' }}>₹{fmt(results?.totalCost || 0)}</td>
            </tr>
          </tbody>
        </table>
      }
      pdfTotalValue={`₹${fmt(results?.totalCost || 0)}`}
      pdfTotalSubtitle={`APPROX FOR ${tier.toUpperCase()} TIER`}
    />
  );
}
