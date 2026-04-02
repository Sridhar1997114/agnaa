"use client";

import React, { useState } from 'react';
import { BaseCalculator } from '@/components/calculators/BaseCalculator';
import { calculateMarkup } from '@/lib/calculator-utils';
import { Calculator } from 'lucide-react';
import { Odometer } from '@/components/ui/Odometer';

export default function MarkupCalculator() {
  const [material, setMaterial] = useState('');
  const [labor, setLabor] = useState('');
  const [overhead, setOverhead] = useState('15');
  const [profit, setProfit] = useState('10');
  const [isCalculated, setIsCalculated] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    const m = parseFloat(material) || 0;
    const l = parseFloat(labor) || 0;
    const o = parseFloat(overhead) || 0;
    const p = parseFloat(profit) || 0;
    
    if (m >= 0 && l >= 0) {
      setResults(calculateMarkup(m, l, o, p));
      setIsCalculated(true);
    }
  };

  const handleReset = () => {
    setMaterial('');
    setLabor('');
    setOverhead('15');
    setProfit('10');
    setIsCalculated(false);
    setResults(null);
  };

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 0 });

  return (
    <BaseCalculator
      title="Markup & Profit Calculator"
      description="Calculate the final selling price considering material, labor, overheads, and target profit margin."
      icon={<Calculator className="w-5 h-5" />}
      isCalculated={isCalculated}
      onCalculate={handleCalculate}
      onReset={handleReset}
      pdfFileName={`AGNAA_Markup_${fmt(results?.sellingPrice || 0)}.pdf`}
      pdfTitle={"Markup & Profit\nCalculator"}
      pdfProjectInfo={{ 'DOCUMENT TYPE': 'PLANNING GUIDELINE', 'SOURCE': 'AGNAA PRECISION ENGINE' }}
      inputsContent={
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Material Cost (₹)</label>
            <input type="number" value={material} onChange={(e) => {setMaterial(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 50000" />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Labor Cost (₹)</label>
            <input type="number" value={labor} onChange={(e) => {setLabor(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 20000" />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Overhead (%)</label>
            <input type="number" value={overhead} onChange={(e) => {setOverhead(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 15" />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Profit (%)</label>
            <input type="number" value={profit} onChange={(e) => {setProfit(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 10" />
          </div>
        </div>
      }
      resultsContent={
        <div className="bg-gradient-to-br from-[#1C1C72] to-[#2A1B81] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden h-full min-h-[300px] flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#7B2DBF]/20 rounded-full blur-[40px] pointer-events-none"></div>
          
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A5B4FC] mb-6">FINAL SELLING PRICE</h3>
          
          <div className="text-5xl font-black mb-1">
            ₹<Odometer value={results?.sellingPrice || 0} decimals={0} />
          </div>
          <div className="text-sm font-bold text-[#A5B4FC] mb-8">TOTAL QUOTE VALUE</div>

          <div className="grid grid-cols-2 gap-y-6 gap-x-2">
            <div>
              <div className="text-2xl font-bold">
                ₹<Odometer value={results?.profit || 0} decimals={0} />
              </div>
              <div className="text-[9px] font-bold text-[#A5B4FC] uppercase tracking-widest">Calculated Profit</div>
            </div>
            <div>
              <div className="text-2xl font-bold">
                ₹<Odometer value={results?.overhead || 0} decimals={0} />
              </div>
              <div className="text-[9px] font-bold text-[#A5B4FC] uppercase tracking-widest">Est. Overheads</div>
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
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>BASE (MAT + LAB)</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>₹{fmt(results?.base || 0)}</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>OVERHEAD ({overhead}%)</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>₹{fmt(results?.overhead || 0)}</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>PROFIT ({profit}%)</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>₹{fmt(results?.profit || 0)}</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>FINAL SELLING PRICE</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600, color:'#7B2DBF' }}>₹{fmt(results?.sellingPrice || 0)}</td>
            </tr>
          </tbody>
        </table>
      }
      pdfTotalValue={`₹${fmt(results?.sellingPrice || 0)}`}
      pdfTotalSubtitle="QUOTE VALUE"
    />
  );
}
