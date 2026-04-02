"use client";

import React, { useState, useEffect } from 'react';
import { BaseCalculator } from '@/components/calculators/BaseCalculator';
import { calculateStaircase } from '@/lib/calculator-utils';
import { Ruler } from 'lucide-react';
import { Odometer } from '@/components/ui/Odometer';


export default function StaircaseCalculator() {
  const [floorHeight, setFloorHeight] = useState('3000');
  const [maxRiser, setMaxRiser] = useState('150');
  const [treadDepth, setTreadDepth] = useState('300');
  const [isCalculated, setIsCalculated] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    const fh = parseFloat(floorHeight) || 0;
    const mr = parseFloat(maxRiser) || 150;
    const td = parseFloat(treadDepth) || 300;
    
    if (fh > 0 && mr > 0 && td > 0) {
      setResults(calculateStaircase(fh, mr, td));
      setIsCalculated(true);
    }
  };

  useEffect(() => {
    handleCalculate();
  }, [floorHeight, maxRiser, treadDepth]);

  const handleReset = () => {
    setFloorHeight('3000');
    setMaxRiser('150');
    setTreadDepth('300');
    setIsCalculated(false);
    setResults(null);
  };

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 1 });

  return (
    <BaseCalculator
      title="Staircase Calculator"
      description="Compute ideal number of risers and treads for ergonomic stair design with interactive side-profile drafting."
      icon={<Ruler className="w-5 h-5" />}
      isCalculated={isCalculated}
      onCalculate={handleCalculate}
      onReset={handleReset}
      pdfFileName={`AGNAA_Staircase_Calc.pdf`}
      pdfTitle="Staircase \nCalculator"
      pdfProjectInfo={{ 'DOCUMENT TYPE': 'PLANNING GUIDELINE', 'SOURCE': 'AGNAA PRECISION ENGINE' }}
      visualizerType="STAIRCASE"
      visualizerData={{ 
        totalRise: (results?.totalRise || 0) / 25.4,
        totalRun: (results?.totalGoing || 0) / 25.4,
        riserCount: results?.numberOfRisers || 18,
        treadWidth: (parseFloat(treadDepth) || 300) / 25.4,
        riserHeight: (results?.actualRiserHeight || 150) / 25.4
      }}

      inputsContent={
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Floor-to-Floor Height (MM)</label>
              <input type="number" value={floorHeight} onChange={(e) => setFloorHeight(e.target.value)} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 3000" />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Max Riser Setup (MM)</label>
              <input type="number" value={maxRiser} onChange={(e) => setMaxRiser(e.target.value)} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 150" />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Tread Depth (MM)</label>
              <input type="number" value={treadDepth} onChange={(e) => setTreadDepth(e.target.value)} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 300" />
            </div>
          </div>


        </div>
      }
      resultsContent={
        <div className="bg-gradient-to-br from-[#1C1C72] to-[#2A1B81] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden h-full min-h-[300px] flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#7B2DBF]/20 rounded-full blur-[40px] pointer-events-none"></div>
          
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A5B4FC] mb-6">Staircase Design</h3>
          
          <div className="text-5xl font-black mb-1">
            <Odometer value={results?.numberOfRisers || 0} decimals={0} />
          </div>
          <div className="text-sm font-bold text-[#A5B4FC] mb-8">NUMBER OF RISERS</div>

          <div className="grid grid-cols-2 gap-y-6 gap-x-4">
            <div>
              <div className="text-2xl font-bold">
                <Odometer value={results?.actualRiserHeight || 0} decimals={1} />
              </div>
              <div className="text-[9px] font-bold text-[#A5B4FC] uppercase tracking-widest">Actual Riser Ht (mm)</div>
            </div>
            <div>
              <div className="text-2xl font-bold">
                <Odometer value={results?.numberOfTreads || 0} decimals={0} />
              </div>
              <div className="text-[9px] font-bold text-[#A5B4FC] uppercase tracking-widest">Number of Treads</div>
            </div>
          </div>
          <div className="mt-8 text-xs text-white/50 border-t border-white/10 pt-4 flex gap-4">
            <span>Total Going: {fmt(results?.totalGoing || 0)} mm</span>
            <span>Comfort: {fmt(results?.comfortValue || 0)} mm (Ideal: 550-700)</span>
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
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>FLOOR HEIGHT</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{floorHeight} MM</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>MAX PERMITTED RISER</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{maxRiser} MM</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>TREAD DEPTH</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{treadDepth} MM</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>ACTUAL RISER COUNT</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.numberOfRisers || 0)}</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>TREAD COUNT</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.numberOfTreads || 0)}</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>ACTUAL EXACT RISER HEIGHT</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600, color:'#7B2DBF' }}>{fmt(results?.actualRiserHeight || 0)} MM</td>
            </tr>
          </tbody>
        </table>
      }
      pdfTotalValue={`${fmt(results?.actualRiserHeight || 0)} MM`}
      pdfTotalSubtitle="PRECISE RISER HEIGHT"
    />
  );
}
