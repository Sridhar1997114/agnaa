"use client";

import React, { useState, useEffect } from 'react';
import { BaseCalculator } from '@/components/calculators/BaseCalculator';
import { calculateSetbackEnvelope } from '@/lib/calculator-utils';
import { Map } from 'lucide-react';
import { BlueprintPlan } from '@/components/visualizers/BlueprintPlan';

export default function SetbackEnvelopeCalculator() {
  const [plotLength, setPlotLength] = useState('60');
  const [plotWidth, setPlotWidth] = useState('40');
  const [front, setFront] = useState('10');
  const [rear, setRear] = useState('5');
  const [left, setLeft] = useState('3');
  const [right, setRight] = useState('3');
  const [isCalculated, setIsCalculated] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    const l = parseFloat(plotLength) || 0;
    const w = parseFloat(plotWidth) || 0;
    const f = parseFloat(front) || 0;
    const re = parseFloat(rear) || 0;
    const le = parseFloat(left) || 0;
    const ri = parseFloat(right) || 0;
    if (l > 0 && w > 0) {
      setResults(calculateSetbackEnvelope(l, w, f, re, le, ri));
      setIsCalculated(true);
    }
  };

  useEffect(() => {
    handleCalculate();
  }, [plotLength, plotWidth, front, rear, left, right]);

  const handleReset = () => {
    setPlotLength('60');
    setPlotWidth('40');
    setFront('10');
    setRear('5');
    setLeft('3');
    setRight('3');
    setIsCalculated(false);
    setResults(null);
  };

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 2 });

  return (
    <BaseCalculator
      title="Setback / Envelope Calculator"
      description="Compute net buildable rectangle with live architectural setbacks and plot boundary visualizations."
      icon={<Map className="w-5 h-5" />}
      isCalculated={isCalculated}
      onCalculate={handleCalculate}
      onReset={handleReset}
      pdfFileName={`AGNAA_Setback_Envelope_${fmt(results?.buildableArea || 0)}sqft.pdf`}
      pdfTitle="Setback / Envelope\nCalculator"
      pdfProjectInfo={{ 'DOCUMENT TYPE': 'PLANNING GUIDELINE', 'SOURCE': 'AGNAA PRECISION ENGINE' }}
      inputsContent={
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Plot Length (FT)</label>
              <input type="number" value={plotLength} onChange={(e) => setPlotLength(e.target.value)} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 60" />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Plot Width (FT)</label>
              <input type="number" value={plotWidth} onChange={(e) => setPlotWidth(e.target.value)} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 40" />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Front Setback</label>
              <input type="number" value={front} onChange={(e) => setFront(e.target.value)} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 10" />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Rear Setback</label>
              <input type="number" value={rear} onChange={(e) => setRear(e.target.value)} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 5" />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Left Setback</label>
              <input type="number" value={left} onChange={(e) => setLeft(e.target.value)} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 3" />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Right Setback</label>
              <input type="number" value={right} onChange={(e) => setRight(e.target.value)} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 3" />
            </div>
          </div>

          <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-gray-100">
             <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Live Envelope Draft</div>
             <BlueprintPlan 
               length={parseFloat(plotLength) || 0}
               width={parseFloat(plotWidth) || 0}
               unit="ft"
               label="Building Envelope"
               setbacks={{
                 top: parseFloat(front) || 0,
                 bottom: parseFloat(rear) || 0,
                 left: parseFloat(left) || 0,
                 right: parseFloat(right) || 0
               }}
             />
          </div>
        </div>
      }
      resultsContent={
        <div className="bg-gradient-to-br from-[#1C1C72] to-[#2A1B81] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden h-full min-h-[300px] flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#7B2DBF]/20 rounded-full blur-[40px] pointer-events-none"></div>
          
          {results?.error ? (
            <div className="text-red-300 font-bold text-center">
              ⚠ {results.error}
            </div>
          ) : (
             <>
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A5B4FC] mb-6">Net Buildable Area</h3>
                
                <div className="text-5xl font-black mb-1">{fmt(results?.buildableArea || 0)}</div>
                <div className="text-sm font-bold text-[#A5B4FC] mb-8">SQUARE FEET</div>

                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                  <div>
                    <div className="text-2xl font-bold">{fmt(results?.buildableLength || 0)}</div>
                    <div className="text-[9px] font-bold text-[#A5B4FC] uppercase tracking-widest">Net Length (FT)</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{fmt(results?.buildableWidth || 0)}</div>
                    <div className="text-[9px] font-bold text-[#A5B4FC] uppercase tracking-widest">Net Width (FT)</div>
                  </div>
                </div>
             </>
          )}

          <div className="mt-8 text-xs text-white/50 border-t border-white/10 pt-4">
            * Note: These are planning-level estimates. Final areas depend on exact site measurements.
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
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>PLOT LENGTH</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{plotLength} FT</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>PLOT WIDTH</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{plotWidth} FT</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>FRONT / REAR SETBACKS</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{front} / {rear} FT</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>LEFT / RIGHT SETBACKS</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{left} / {right} FT</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>NET BUILDABLE AREA</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600, color:'#7B2DBF' }}>{fmt(results?.buildableArea || 0)} SQFT</td>
            </tr>
          </tbody>
        </table>
      }
      pdfTotalValue={`${fmt(results?.buildableArea || 0)}`}
      pdfTotalSubtitle="NET BUILDABLE AREA (SQFT)"
    />
  );
}
