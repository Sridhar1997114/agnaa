"use client";

import React, { useState } from 'react';
import { BaseCalculator } from '@/components/calculators/BaseCalculator';
import { calculateElectrical } from '@/lib/calculator-utils';
import { Home } from 'lucide-react';
import { Odometer } from '@/components/ui/Odometer';

export default function ElectricalCalculator() {
  const [area, setArea] = useState('');
  const [rooms, setRooms] = useState('');
  const [isCalculated, setIsCalculated] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    const a = parseFloat(area) || 0;
    const r = parseFloat(rooms) || 0;
    
    if (a > 0 && r > 0) {
      setResults(calculateElectrical(a, r));
      setIsCalculated(true);
    }
  };

  const handleReset = () => {
    setArea('');
    setRooms('');
    setIsCalculated(false);
    setResults(null);
  };

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 1 });

  return (
    <BaseCalculator
      title="Electrical Load & Points"
      description="Estimate basic power load (KW) and number of electrical points needed based on carpet area."
      icon={<Home className="w-5 h-5" />}
      isCalculated={isCalculated}
      onCalculate={handleCalculate}
      onReset={handleReset}
      pdfFileName={`AGNAA_Electrical_Calc.pdf`}
      pdfTitle="Electrical Load\nCalculator"
      pdfProjectInfo={{ 'DOCUMENT TYPE': 'PLANNING GUIDELINE', 'SOURCE': 'AGNAA PRECISION ENGINE' }}
      visualizerType="ELECTRICAL"
      visualizerData={{ 
        area: results?.area, 
        totalPoints: (results?.lightPoints || 0) + (results?.fanPoints || 0) + (results?.switchPoints || 0)
      }}
      inputsContent={
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 md:col-span-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Carpet Area (SQFT)</label>
            <input type="number" value={area} onChange={(e) => {setArea(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 1500" />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Number of Rooms/Baths</label>
            <input type="number" value={rooms} onChange={(e) => {setRooms(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 8" />
          </div>
        </div>
      }
      resultsContent={
        <div className="bg-gradient-to-br from-[#1C1C72] to-[#2A1B81] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden h-full min-h-[300px] flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#7B2DBF]/20 rounded-full blur-[40px] pointer-events-none"></div>
          
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A5B4FC] mb-6">Electrical Estimates</h3>
          
          <div className="text-5xl font-black mb-1 flex items-baseline gap-1">
            <Odometer value={results?.totalLoadKW || 0} decimals={1} /><span>KW</span>
          </div>
          <div className="text-sm font-bold text-[#A5B4FC] mb-8">ESTIMATED CONNECTED LOAD</div>

          <div className="grid grid-cols-3 gap-y-6 gap-x-2">
            <div>
              <div className="text-xl font-bold flex items-baseline gap-1">
                <Odometer value={results?.lightPoints || 0} />
              </div>
              <div className="text-[9px] font-bold text-[#A5B4FC] uppercase tracking-widest">Light Pts</div>
            </div>
            <div>
              <div className="text-xl font-bold flex items-baseline gap-1">
                <Odometer value={results?.fanPoints || 0} />
              </div>
              <div className="text-[9px] font-bold text-[#A5B4FC] uppercase tracking-widest">Fan Pts</div>
            </div>
            <div>
              <div className="text-xl font-bold flex items-baseline gap-1">
                <Odometer value={results?.switchPoints || 0} />
              </div>
              <div className="text-[9px] font-bold text-[#A5B4FC] uppercase tracking-widest">Socket/Switch Pts</div>
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
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>CARPET AREA</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{area} SQFT</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>ROOM COUNT</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{rooms}</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>ESTIMATED LIGHT/FAN POINTS</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>L: {fmt(results?.lightPoints || 0)}, F: {fmt(results?.fanPoints || 0)}</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>SWITCH/SOCKET POINTS</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.switchPoints || 0)}</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>TOTAL ESTIMATED LOAD</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600, color:'#7B2DBF' }}>{fmt(results?.totalLoadKW || 0)} KW</td>
            </tr>
          </tbody>
        </table>
      }
      pdfTotalValue={`${fmt(results?.totalLoadKW || 0)} KW`}
      pdfTotalSubtitle="MIN. CONNECTED LOAD"
    />
  );
}
