"use client";

import React, { useState } from 'react';
import { BaseCalculator } from '@/components/calculators/BaseCalculator';
import { calculateConcreteShapes } from '@/lib/calculator-utils';
import { Box } from 'lucide-react';
import { Odometer } from '@/components/ui/Odometer';

export default function ConcreteShapesCalculator() {
  const [shape, setShape] = useState<'cylinder' | 'cone' | 'trapezoidal'>('cylinder');
  const [dimR, setDimR] = useState('');
  const [dimH, setDimH] = useState('');
  const [dimL, setDimL] = useState('');
  const [dimA, setDimA] = useState('');
  const [dimB, setDimB] = useState('');
  
  const [isCalculated, setIsCalculated] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    const r = parseFloat(dimR) || 0;
    const h = parseFloat(dimH) || 0;
    const l = parseFloat(dimL) || 0;
    const a = parseFloat(dimA) || 0;
    const b = parseFloat(dimB) || 0;
    
    // basic validation
    let valid = false;
    if (shape === 'cylinder' && r > 0 && h > 0) valid = true;
    if (shape === 'cone' && r > 0 && h > 0) valid = true;
    if (shape === 'trapezoidal' && a > 0 && b > 0 && h > 0 && l > 0) valid = true;

    if (valid) {
      setResults(calculateConcreteShapes(shape, {r, h, l, a, b}));
      setIsCalculated(true);
    } else {
      alert("Please fill all required dimensions with values greater than 0");
    }
  };

  const handleReset = () => {
    setShape('cylinder');
    setDimR('');
    setDimH('');
    setDimL('');
    setDimA('');
    setDimB('');
    setIsCalculated(false);
    setResults(null);
  };

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 3 });

  return (
    <BaseCalculator
      title="Concrete Volume by Shape"
      description="Generic volume engine for specialized column, pit, and structural shapes (cylinders, cones, trapezoidal trenches)."
      icon={<Box className="w-5 h-5" />}
      isCalculated={isCalculated}
      onCalculate={handleCalculate}
      onReset={handleReset}
      visualizerType="SHAPE"
      visualizerData={{
        shape,
        r: parseFloat(dimR),
        h: parseFloat(dimH),
        l: parseFloat(dimL),
        a: parseFloat(dimA),
        b: parseFloat(dimB)
      }}
      pdfFileName={`AGNAA_ShapeVol_${fmt(results?.volume || 0)}CUM.pdf`}
      pdfTitle={"Advanced Geometry\nVolume Engine"}
      pdfProjectInfo={{ 'DOCUMENT TYPE': 'PLANNING GUIDELINE', 'SOURCE': 'AGNAA PRECISION ENGINE' }}
      inputsContent={
        <div className="grid gap-4">
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Select Shape</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'cylinder', label: 'Cylinder' },
                { id: 'cone', label: 'Cone' },
                { id: 'trapezoidal', label: 'Trapezoidal Pris.' }
              ].map(el => (
                <button
                  key={el.id}
                  onClick={() => { setShape(el.id as any); setIsCalculated(false); }}
                  className={`w-full py-2 px-1 rounded-xl border text-[11px] md:text-sm font-bold transition-all ${
                    shape === el.id
                      ? 'border-[#7B2DBF] bg-[#7B2DBF]/10 text-[#7B2DBF]'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-[#7B2DBF]'
                  }`}
                >
                  {el.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-2">
            {(shape === 'cylinder' || shape === 'cone') && (
              <>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Radius (M)</label>
                  <input type="number" value={dimR} onChange={(e) => {setDimR(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 0.3" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Height/Depth (M)</label>
                  <input type="number" value={dimH} onChange={(e) => {setDimH(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 3" />
                </div>
              </>
            )}

            {shape === 'trapezoidal' && (
              <>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Top Width 'a' (M)</label>
                  <input type="number" value={dimA} onChange={(e) => {setDimA(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Btm Width 'b' (M)</label>
                  <input type="number" value={dimB} onChange={(e) => {setDimB(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Height/Depth 'h' (M)</label>
                  <input type="number" value={dimH} onChange={(e) => {setDimH(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Length 'L' (M)</label>
                  <input type="number" value={dimL} onChange={(e) => {setDimL(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" />
                </div>
              </>
            )}
          </div>
        </div>
      }
      resultsContent={
        <div className="bg-gradient-to-br from-[#1C1C72] to-[#2A1B81] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden h-full min-h-[300px] flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#7B2DBF]/20 rounded-full blur-[40px] pointer-events-none"></div>
          
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A5B4FC] mb-6">{shape.toUpperCase()} VOLUME ESTIMATE</h3>
          
          <div className="text-5xl font-black mb-1">
            <Odometer value={results?.volume || 0} decimals={3} />
          </div>
          <div className="text-sm font-bold text-[#A5B4FC] mb-8">TOTAL VOLUME (CUM)</div>
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
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>SHAPE CATEGORY</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600, textTransform:'capitalize' }}>{shape}</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>TOTAL VOLUME</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600, color:'#7B2DBF' }}>{fmt(results?.volume || 0)} CUM</td>
            </tr>
          </tbody>
        </table>
      }
      pdfTotalValue={`${fmt(results?.volume || 0)} CUM`}
      pdfTotalSubtitle="CALCULATED VOLUME"
    />
  );
}
