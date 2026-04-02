"use client";

import React, { useState } from 'react';
import { BaseCalculator } from '@/components/calculators/BaseCalculator';
import { convertUnits } from '@/lib/calculator-utils';
import { Ruler } from 'lucide-react';

export default function UnitConversionCalculator() {
  const [value, setValue] = useState('');
  const [factor, setFactor] = useState('10.7639'); // default SQM to SQFT
  const [unitOut, setUnitOut] = useState('SQFT');
  const [isCalculated, setIsCalculated] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    const v = parseFloat(value) || 0;
    const f = parseFloat(factor) || 0;
    
    if (v !== 0) {
      setResults({ value: convertUnits(v, f), symbol: unitOut });
      setIsCalculated(true);
    }
  };

  const handleReset = () => {
    setValue('');
    setFactor('10.7639');
    setUnitOut('SQFT');
    setIsCalculated(false);
    setResults(null);
  };

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 4 });

  return (
    <BaseCalculator
      title="Unit Conversion"
      description="Quickly convert standard engineering and architectural units."
      icon={<Ruler className="w-5 h-5" />}
      isCalculated={isCalculated}
      onCalculate={handleCalculate}
      onReset={handleReset}
      pdfFileName={`AGNAA_Conversion.pdf`}
      pdfTitle={"Unit\nConversion"}
      pdfProjectInfo={{ 'DOCUMENT TYPE': 'PLANNING GUIDELINE', 'SOURCE': 'AGNAA PRECISION ENGINE' }}
      inputsContent={
        <div className="grid gap-4">
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Input Value</label>
            <input type="number" value={value} onChange={(e) => {setValue(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 1" />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Conversion Metric</label>
            <select value={factor + '|' + unitOut} onChange={(e) => {
                const [f, u] = e.target.value.split('|');
                setFactor(f);
                setUnitOut(u);
                setIsCalculated(false);
              }} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors">
              <option value="10.7639|SQFT">SQM to SQFT (1 : 10.7639)</option>
              <option value="0.092903|SQM">SQFT to SQM (1 : 0.0929)</option>
              <option value="3.28084|FT">Meters to Feet (1 : 3.28)</option>
              <option value="0.3048|M">Feet to Meters (1 : 0.3048)</option>
              <option value="35.3147|CUFT">CUM to CUFT (1 : 35.31)</option>
              <option value="0.0283168|CUM">CUFT to CUM (1 : 0.028)</option>
              <option value="2.20462|LBS">KG to LBS (1 : 2.20)</option>
            </select>
          </div>
        </div>
      }
      resultsContent={
        <div className="bg-gradient-to-br from-[#1C1C72] to-[#2A1B81] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden h-full min-h-[300px] flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#7B2DBF]/20 rounded-full blur-[40px] pointer-events-none"></div>
          
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A5B4FC] mb-6">CONVERSION RESULT</h3>
          
          <div className="text-5xl font-black mb-1">{fmt(results?.value || 0)}</div>
          <div className="text-sm font-bold text-[#A5B4FC] mb-8">{results?.symbol || unitOut}</div>
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
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>INPUT VALUE</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{value}</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>CONVERSION FACTOR</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{factor}</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>CONVERTED VALUE</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600, color:'#7B2DBF' }}>{fmt(results?.value || 0)} {results?.symbol}</td>
            </tr>
          </tbody>
        </table>
      }
      pdfTotalValue={`${fmt(results?.value || 0)}`}
      pdfTotalSubtitle={results?.symbol || ''}
    />
  );
}
