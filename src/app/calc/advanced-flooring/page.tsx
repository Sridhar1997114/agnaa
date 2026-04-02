"use client";

import React, { useState } from 'react';
import { BaseCalculator } from '@/components/calculators/BaseCalculator';
import { calculateAdvancedFlooring } from '@/lib/calculator-utils';
import { Grid } from 'lucide-react';
import { Odometer } from '@/components/ui/Odometer';

export default function AdvancedFlooringCalculator() {
  const [roomLength, setRoomLength] = useState('');
  const [roomWidth, setRoomWidth] = useState('');
  const [unitLength, setUnitLength] = useState('');
  const [unitWidth, setUnitWidth] = useState('');
  const [pattern, setPattern] = useState<'straight' | 'diagonal'>('straight');
  const [rate, setRate] = useState('');
  const [isCalculated, setIsCalculated] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    const rl = parseFloat(roomLength) || 0;
    const rw = parseFloat(roomWidth) || 0;
    const ul = parseFloat(unitLength) || 0;
    const uw = parseFloat(unitWidth) || 0;
    const r = parseFloat(rate) || 0;
    
    if (rl > 0 && rw > 0 && ul > 0 && uw > 0) {
      setResults(calculateAdvancedFlooring(rl, rw, ul, uw, pattern, r));
      setIsCalculated(true);
    }
  };

  const handleReset = () => {
    setRoomLength('');
    setRoomWidth('');
    setUnitLength('');
    setUnitWidth('');
    setPattern('straight');
    setRate('');
    setIsCalculated(false);
    setResults(null);
  };

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 1 });

  return (
    <BaseCalculator
      title="Advanced Flooring Calculator"
      description="Estimate quantity and cost for floor finishes (tiles / laminate / stone) with realistic wastage."
      icon={<Grid className="w-5 h-5" />}
      isCalculated={isCalculated}
      onCalculate={handleCalculate}
      onReset={handleReset}
      pdfFileName={`AGNAA_Flooring_Calc_${fmt(results?.piecesWithWastage || 0)}pcs.pdf`}
      pdfTitle="Advanced Flooring\nCalculator"
      pdfProjectInfo={{ 'DOCUMENT TYPE': 'PLANNING GUIDELINE', 'SOURCE': 'AGNAA PRECISION ENGINE' }}
      visualizerType="FLOOR"
      visualizerData={{ 
        length: parseFloat(roomLength) || 12, 
        width: parseFloat(roomWidth) || 10,
        pattern: pattern === 'diagonal' ? 'DIAGONAL' : 'GRID',
        tileSize: (parseFloat(unitLength) || 2) * 12 
      }}



      inputsContent={
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Room Length (FT)</label>
            <input type="number" value={roomLength} onChange={(e) => {setRoomLength(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 12" />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Room Width (FT)</label>
            <input type="number" value={roomWidth} onChange={(e) => {setRoomWidth(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 10" />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Tile/Stone Length (FT)</label>
            <input type="number" value={unitLength} onChange={(e) => {setUnitLength(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 2" />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Tile/Stone Width (FT)</label>
            <input type="number" value={unitWidth} onChange={(e) => {setUnitWidth(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 2" />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Pattern</label>
            <select value={pattern} onChange={(e) => {setPattern(e.target.value as any); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors">
                <option value="straight">Straight Layout</option>
                <option value="diagonal">Diagonal/Herringbone</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Cost Per SQFT (₹)</label>
            <input type="number" value={rate} onChange={(e) => {setRate(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 55" />
          </div>
        </div>
      }
      resultsContent={
        <div className="bg-gradient-to-br from-[#1C1C72] to-[#2A1B81] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden h-full min-h-[300px] flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#7B2DBF]/20 rounded-full blur-[40px] pointer-events-none"></div>
          
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A5B4FC] mb-6">Flooring Requirements</h3>
          
          <div className="text-5xl font-black mb-1 flex items-baseline gap-1">
            <Odometer value={results?.piecesWithWastage || 0} />
          </div>
          <div className="text-sm font-bold text-[#A5B4FC] mb-8">TOTAL PIECES (INCL. WSTG)</div>

          <div className="grid grid-cols-2 gap-y-6 gap-x-4">
            <div>
              <div className="text-2xl font-bold flex items-baseline gap-1">
                <Odometer value={results?.floorArea || 0} decimals={1} />
              </div>
              <div className="text-[9px] font-bold text-[#A5B4FC] uppercase tracking-widest">Floor Area (SQFT)</div>
            </div>
            <div>
              <div className="text-2xl font-bold flex items-baseline gap-1">
                <span>₹</span><Odometer value={results?.materialCost || 0} />
              </div>
              <div className="text-[9px] font-bold text-[#A5B4FC] uppercase tracking-widest">Est. Mat. Cost</div>
            </div>
          </div>

          <div className="mt-8 text-xs text-white/50 border-t border-white/10 pt-4">
            * Note: Wastage modeled at {results ? results.wastageFactor * 100 : 0}%. Actual wastage depends on room dimensions and skill level.
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
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>ROOM DIMENSIONS</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{roomLength} x {roomWidth} FT</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>TILE DIMENSIONS</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{unitLength} x {unitWidth} FT</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>PATTERN / WASTAGE</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{pattern.toUpperCase()}</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>BASE PIECES REQUIRED</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.piecesBase || 0)} PCS</td>
            </tr>
             <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>ESTIMATED COST (₹)</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>₹{fmt(results?.materialCost || 0)}</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>TOTAL PIECES (WITH WASTAGE)</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600, color:'#7B2DBF' }}>{fmt(results?.piecesWithWastage || 0)} PCS</td>
            </tr>
          </tbody>
        </table>
      }
      pdfTotalValue={`${fmt(results?.piecesWithWastage || 0)} PCS`}
      pdfTotalSubtitle="TOTAL PIECES REQUIRED"
    />
  );
}
