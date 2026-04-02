"use client";

import React, { useState, useEffect } from 'react';
import { BaseCalculator } from '@/components/calculators/BaseCalculator';
import { calculateSepticTank } from '@/lib/calculator-utils';
import { Box } from 'lucide-react';
import { BlueprintTank } from '@/components/visualizers/BlueprintTank';
import { Odometer } from '@/components/ui/Odometer';

export default function SepticTankCalculator() {
  const [users, setUsers] = useState('5');
  const [years, setYears] = useState('2');
  const [isCalculated, setIsCalculated] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    const u = parseFloat(users) || 0;
    const y = parseFloat(years) || 2;
    
    if (u > 0) {
      setResults(calculateSepticTank(u, y));
      setIsCalculated(true);
    }
  };

  useEffect(() => {
    handleCalculate();
  }, [users, years]);

  const handleReset = () => {
    setUsers('5');
    setYears('2');
    setIsCalculated(false);
    setResults(null);
  };

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 1 });

  return (
    <BaseCalculator
      title="Septic Tank Calculator"
      description="Calculate minimum recommended volume and dimensions for a domestic septic tank with live hydraulic drafting."
      icon={<Box className="w-5 h-5" />}
      isCalculated={isCalculated}
      onCalculate={handleCalculate}
      onReset={handleReset}
      pdfFileName={`AGNAA_Septic_Tank_${fmt(results?.totalVolumeLiters || 0)}L.pdf`}
      pdfTitle="Septic Tank Size\nCalculator"
      pdfProjectInfo={{ 'DOCUMENT TYPE': 'PLANNING GUIDELINE', 'SOURCE': 'AGNAA PRECISION ENGINE' }}
      visualizerType="TANK"
      visualizerData={{ 
        length: results?.recommendedLength || 1.5,
        width: results?.recommendedWidth || 0.75,
        depth: results?.recommendedDepth || 1.0
      }}
      inputsContent={
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Number of Users</label>
              <input type="number" value={users} onChange={(e) => setUsers(e.target.value)} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 5" />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Desludging Freq (Years)</label>
              <input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 2" />
            </div>
          </div>
        </div>
      }

      resultsContent={
        <div className="bg-gradient-to-br from-[#1C1C72] to-[#2A1B81] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden h-full min-h-[300px] flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#7B2DBF]/20 rounded-full blur-[40px] pointer-events-none"></div>
          
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A5B4FC] mb-6">Septic Tank Sizing</h3>
          
          <div className="text-5xl font-black mb-1">
            <Odometer value={results?.totalVolumeLiters || 0} decimals={0} />
          </div>
          <div className="text-sm font-bold text-[#A5B4FC] mb-8">TOTAL VOLUME (LITERS)</div>

          <div className="grid grid-cols-3 gap-y-6 gap-x-2">
            <div>
              <div className="text-xl font-bold">
                <Odometer value={results?.recommendedLength || 0} decimals={2} />
              </div>
              <div className="text-[9px] font-bold text-[#A5B4FC] uppercase tracking-widest">Rec. Length (M)</div>
            </div>
            <div>
              <div className="text-xl font-bold">
                <Odometer value={results?.recommendedWidth || 0} decimals={2} />
              </div>
              <div className="text-[9px] font-bold text-[#A5B4FC] uppercase tracking-widest">Rec. Width (M)</div>
            </div>
            <div>
              <div className="text-xl font-bold">
                <Odometer value={results?.recommendedDepth || 0} decimals={2} />
              </div>
              <div className="text-[9px] font-bold text-[#A5B4FC] uppercase tracking-widest">Liquid Depth (M)</div>
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
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>NUMBER OF USERS</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{users}</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>DESLUDGING YEARS</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{years}</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>RECOMMENDED DIMENSIONS (M)</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>L: {fmt(results?.recommendedLength || 0)}, W: {fmt(results?.recommendedWidth || 0)}, D: {fmt(results?.recommendedDepth || 0)}</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>TOTAL VOLUME (CUM)</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.totalVolumeCUM || 0)} CUM</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>TOTAL REQUIRED CAPACITY</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600, color:'#7B2DBF' }}>{fmt(results?.totalVolumeLiters || 0)} LITERS</td>
            </tr>
          </tbody>
        </table>
      }
      pdfTotalValue={`${fmt(results?.totalVolumeLiters || 0)} L`}
      pdfTotalSubtitle="MIN TANK CAPACITY"
    />
  );
}
