"use client";

import React, { useState, useEffect } from 'react';
import { BaseCalculator } from '@/components/calculators/BaseCalculator';
import { calculateROI } from '@/lib/calculator-utils';
import { IndianRupee } from 'lucide-react';
import { AnalyticsChart } from '@/components/visualizers/AnalyticsChart';
import { Odometer } from '@/components/ui/Odometer';

export default function ROICalculator() {
  const [investment, setInvestment] = useState('5000000');
  const [rent, setRent] = useState('25000');
  const [expenses, setExpenses] = useState('30000');
  const [isCalculated, setIsCalculated] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    const i = parseFloat(investment) || 0;
    const r = parseFloat(rent) || 0;
    const e = parseFloat(expenses) || 0;
    
    if (i > 0) {
      setResults(calculateROI(i, r, e));
      setIsCalculated(true);
    }
  };

  useEffect(() => {
    handleCalculate();
  }, [investment, rent, expenses]);

  const handleReset = () => {
    setInvestment('5000000');
    setRent('25000');
    setExpenses('30000');
    setIsCalculated(false);
    setResults(null);
  };

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 1 });
  const fmtC = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 0 });

  return (
    <BaseCalculator
      title="Rental Yield / ROI Calculator"
      description="Calculate net income, ROI, and payback period with visual investment breakdown."
      icon={<IndianRupee className="w-5 h-5" />}
      isCalculated={isCalculated}
      onCalculate={handleCalculate}
      onReset={handleReset}
      pdfFileName={`AGNAA_ROI_${fmt(results?.roi || 0)}pct.pdf`}
      pdfTitle={"ROI & Rental Yield\nCalculator"}
      pdfProjectInfo={{ 'DOCUMENT TYPE': 'PLANNING GUIDELINE', 'SOURCE': 'AGNAA PRECISION ENGINE' }}
      inputsContent={
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Total Property Investment (₹)</label>
              <input type="number" value={investment} onChange={(e) => setInvestment(e.target.value)} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 5000000" />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Monthly Rent (₹)</label>
              <input type="number" value={rent} onChange={(e) => setRent(e.target.value)} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 25000" />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Annual Expenses (₹)</label>
              <input type="number" value={expenses} onChange={(e) => setExpenses(e.target.value)} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 30000" />
            </div>
          </div>

          <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-gray-100">
             <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Investment Health</div>
             <AnalyticsChart 
                title="Revenue vs Expense"
                data={[
                   { label: 'Net Profit', value: (parseFloat(rent) * 12) - (parseFloat(expenses) || 0), color: '#7B2DBF' },
                   { label: 'Expenses', value: parseFloat(expenses) || 0, color: '#A5B4FC' }
                ]}
             />
          </div>
        </div>
      }
      resultsContent={
        <div className="bg-gradient-to-br from-[#1C1C72] to-[#2A1B81] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden h-full min-h-[300px] flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#7B2DBF]/20 rounded-full blur-[40px] pointer-events-none"></div>
          
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A5B4FC] mb-6">INVESTMENT ANALYSIS</h3>
          
          <div className="text-5xl font-black mb-1 flex items-baseline gap-1">
            <Odometer value={results?.roi || 0} decimals={1} />
            <span className="text-2xl font-black">%</span>
          </div>
          <div className="text-sm font-bold text-[#A5B4FC] mb-8">ANNUAL RETURN ON INVESTMENT</div>

          <div className="grid grid-cols-2 gap-y-6 gap-x-2">
            <div>
              <div className="text-2xl font-bold flex items-baseline gap-1">
                <span className="text-lg">₹</span>
                <Odometer value={results?.netIncome || 0} />
              </div>
              <div className="text-[9px] font-bold text-[#A5B4FC] uppercase tracking-widest">Net Annual Income</div>
            </div>
            <div>
              <div className="text-2xl font-bold flex items-baseline gap-1">
                <Odometer value={results?.paybackYears || 0} decimals={1} />
                <span className="text-sm font-bold">Yrs</span>
              </div>
              <div className="text-[9px] font-bold text-[#A5B4FC] uppercase tracking-widest">Payback Period</div>
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
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>CAPITAL INVESTMENT</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>₹{fmtC(parseFloat(investment) || 0)}</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>YEARLY NET INCOME</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>₹{fmtC(results?.netIncome || 0)}</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>PAYBACK PERIOD</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.paybackYears || 0)} Years</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>RETURN ON INVESTMENT</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600, color:'#7B2DBF' }}>{fmt(results?.roi || 0)}%</td>
            </tr>
          </tbody>
        </table>
      }
      pdfTotalValue={`${fmt(results?.roi || 0)}%`}
      pdfTotalSubtitle="ESTIMATED ROI"
    />
  );
}
