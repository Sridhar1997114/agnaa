"use client";

import React, { useState, useEffect } from 'react';
import { BaseCalculator } from '@/components/calculators/BaseCalculator';
import { calculateBrickwork } from '@/lib/calculator-utils';
import { Grid, Ruler } from 'lucide-react';
import { Odometer } from '@/components/ui/Odometer';


export default function BrickCalculator() {
  const [length, setLength] = useState('15');
  const [height, setHeight] = useState('10');
  const [thickness, setThickness] = useState('9'); // Default 9 inch wall
  const [preset, setPreset] = useState<'economy' | 'safe' | 'strong'>('safe');
  
  const [isCalculated, setIsCalculated] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    const l = parseFloat(length) || 0;
    const h = parseFloat(height) || 0;
    const t = parseFloat(thickness) || 0;
    if (l > 0 && h > 0 && t > 0) {
      setResults({ ...calculateBrickwork(l, h, t, preset), l, h, t });
      setIsCalculated(true);
    }
  };

  useEffect(() => {
    handleCalculate();
  }, [length, height, thickness, preset]);

  const handleReset = () => {
    setLength('15');
    setHeight('10');
    setThickness('9');
    setPreset('safe');
    setIsCalculated(false);
    setResults(null);
  };

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 1 });

  return (
    <BaseCalculator
      title="Brickwork Calculator"
      description="Estimate the exact number of bricks, cement bags, and sand required with interactive wall drafting."
      icon={<Grid className="w-5 h-5" />}
      isCalculated={isCalculated}
      onCalculate={handleCalculate}
      onReset={handleReset}
      presets={{
        current: preset,
        onChange: (p: any) => setPreset(p),
        options: [
          { id: 'economy', label: 'Economy', desc: '5% wastage, 1:6 mortar. Best for boundary walls.' },
          { id: 'safe', label: 'Safe (Std)', desc: '10% wastage, 1:5 mortar. Standard residential spec.' },
          { id: 'strong', label: 'Strong', desc: '15% wastage, 1:4 mortar. High-load structural spec.' }
        ]
      }}
      pdfFileName={`AGNAA_Brickwork_Estimate.pdf`}
      pdfTitle="Brickwork\nEstimate"
      pdfProjectInfo={{ 
        'DOCUMENT TYPE': 'MATERIAL ESTIMATE', 
        'MORTAR RATIO': results?.mortarRatioString || '1:5 STANDARD',
        'CONFIDENCE': preset.toUpperCase(),
        'WALL_LENGTH': results?.l,
        'WALL_HEIGHT': results?.h,
        'WALL_THICKNESS': results?.t
      }}
      visualizerType="WALL"
      visualizerData={{ length, height, thickness }}
      inputsContent={
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Wall Length (FT)</label>
              <input type="number" value={length} onChange={(e) => setLength(e.target.value)} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 15" />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Wall Height (FT)</label>
              <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 10" />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Wall Thickness (INCHES)</label>
            <select value={thickness} onChange={(e) => setThickness(e.target.value)} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors appearance-none">
              <option value="4.5">4.5 Inch (Half Brick Wall)</option>
              <option value="9">9 Inch (Full Brick Wall)</option>
            </select>
          </div>


        </div>
      }
      resultsContent={
        <div className="bg-gradient-to-br from-[#1C1C72] to-[#2A1B81] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden h-full min-h-[300px] flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#7B2DBF]/20 rounded-full blur-[40px] pointer-events-none"></div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A5B4FC] mb-6">Material Breakdown</h3>
          
          <div className="mb-8">
            <div className="text-sm font-bold text-[#A5B4FC] mb-1">TOTAL BRICKS</div>
            <div className="text-5xl font-black text-white"><Odometer value={results?.noOfBricks || 0} /> <span className="text-sm text-gray-400">PCS</span></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
            <div>
              <div className="text-sm font-bold text-[#A5B4FC] mb-1">CEMENT</div>
              <div className="text-3xl font-black"><Odometer value={Math.ceil(results?.cementBags || 0)} /> <span className="text-sm text-gray-300">BAGS</span></div>
            </div>
            <div>
              <div className="text-sm font-bold text-[#A5B4FC] mb-1">SAND</div>
              <div className="text-3xl font-black"><Odometer value={results?.sandCFT || 0} decimals={1} /> <span className="text-sm text-gray-300">CFT</span></div>
            </div>
          </div>
        </div>
      }
      pdfContentTable={
        <table style={{ width:'100%', borderCollapse:'collapse', fontSize:11 }}>
          <thead>
            <tr style={{ background:'#1C1C72', color:'#fff' }}>
              <th style={{ padding:'12px', textAlign:'left', borderTopLeftRadius:6 }}>MATERIAL</th>
              <th style={{ padding:'12px', textAlign:'right', borderTopRightRadius:6 }}>QUANTITY</th>
            </tr>
          </thead>
          <tbody style={{ color:'#475569' }}>
            <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>MODULAR BRICKS (PCS)</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600, color:'#7B2DBF', fontSize:14 }}>{fmt(results?.noOfBricks || 0)}</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>CEMENT (50kg Bags)</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{Math.ceil(results?.cementBags || 0)} BAGS</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>SAND / FINE AGGREGATE</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.sandCFT || 0)} CFT</td>
            </tr>
          </tbody>
        </table>
      }
      pdfSummaryBox={
        <div style={{ padding:15, background:'#F8FAFC', borderRadius:8, border:'1px solid #E2E8F0', marginTop:20 }}>
          <div style={{ fontSize:9, fontWeight:900, color:'#64748B', textTransform:'uppercase', marginBottom:8 }}>Dimension Summary</div>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:10 }}>
            <div><strong>Wall Length:</strong> {results?.l} FT</div>
            <div><strong>Wall Height:</strong> {results?.h} FT</div>
            <div><strong>Thickness:</strong> {results?.t} IN</div>
            <div><strong>Wall Volume:</strong> {fmt(results?.volumeCFT || 0)} CFT</div>
          </div>
        </div>
      }
      pdfTotalValue={`${fmt(results?.noOfBricks || 0)} PCS`}
      pdfTotalSubtitle="TOTAL BRICKS REQUIRED"
    />
  );
}
