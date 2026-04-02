"use client";

import React, { useState } from 'react';
import { BaseCalculator } from '@/components/calculators/BaseCalculator';
import { calculateShuttering } from '@/lib/calculator-utils';
import { Building2 } from 'lucide-react';

export default function ShutteringCalculator() {
  const [concreteVol, setConcreteVol] = useState('');
  const [elementType, setElementType] = useState<'slab' | 'beam' | 'column' | 'footing'>('slab');
  const [isCalculated, setIsCalculated] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    const c = parseFloat(concreteVol) || 0;
    
    if (c > 0) {
      setResults(calculateShuttering(c, elementType));
      setIsCalculated(true);
    }
  };

  const handleReset = () => {
    setConcreteVol('');
    setElementType('slab');
    setIsCalculated(false);
    setResults(null);
  };

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 2 });

  return (
    <BaseCalculator
      title="Shuttering Calculator"
      description="Estimate shuttering (formwork) area and plywood sheets required based on concrete volume."
      icon={<Building2 className="w-5 h-5" />}
      isCalculated={isCalculated}
      onCalculate={handleCalculate}
      onReset={handleReset}
      pdfFileName={`AGNAA_Shuttering_${fmt(results?.shutteringAreaSQM || 0)}SQM.pdf`}
      pdfTitle={"Shuttering Formwork\nCalculator"}
      pdfProjectInfo={{ 'DOCUMENT TYPE': 'PLANNING GUIDELINE', 'SOURCE': 'AGNAA PRECISION ENGINE' }}
      inputsContent={
        <div className="grid gap-4">
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Concrete Volume (CUM)</label>
            <input type="number" value={concreteVol} onChange={(e) => {setConcreteVol(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 10" />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Element Type</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'slab', label: 'RCC Slab' },
                { id: 'beam', label: 'Beam' },
                { id: 'column', label: 'Column' },
                { id: 'footing', label: 'Footing' }
              ].map(el => (
                <button
                  key={el.id}
                  onClick={() => { setElementType(el.id as any); setIsCalculated(false); }}
                  className={`w-full py-2 px-3 rounded-xl border text-sm font-bold transition-all ${
                    elementType === el.id
                      ? 'border-[#7B2DBF] bg-[#7B2DBF]/10 text-[#7B2DBF]'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-[#7B2DBF]'
                  }`}
                >
                  {el.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      }
      resultsContent={
        <div className="bg-gradient-to-br from-[#1C1C72] to-[#2A1B81] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden h-full min-h-[300px] flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#7B2DBF]/20 rounded-full blur-[40px] pointer-events-none"></div>
          
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A5B4FC] mb-6">SHUTTERING ESTIMATE</h3>
          
          <div className="text-5xl font-black mb-1">{fmt(results?.shutteringAreaSQM || 0)}</div>
          <div className="text-sm font-bold text-[#A5B4FC] mb-8">SHUTTERING AREA (SQM)</div>

          <div className="grid grid-cols-2 gap-y-6 gap-x-2">
            <div>
              <div className="text-2xl font-bold">{fmt(results?.plySheets || 0)}</div>
              <div className="text-[9px] font-bold text-[#A5B4FC] uppercase tracking-widest">Ply Sheets (8x4 ft)</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{fmt(results?.factor || 0)}x</div>
              <div className="text-[9px] font-bold text-[#A5B4FC] uppercase tracking-widest">Multiplier Factor</div>
            </div>
          </div>
          <div className="mt-8 text-xs text-white/50 border-t border-white/10 pt-4">
            * Note: Thumb rules used depending on structural element. Plywood size 2.44m x 1.22m (2.97 SQM).
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
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>CONCRETE VOLUME</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{concreteVol} CUM</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>ELEMENT TYPE</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600, textTransform:'capitalize' }}>{elementType}</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>THUMB RULE FACTOR</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>x{fmt(results?.factor || 0)}</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>ESTIMATED PLY SHEETS (8'x4')</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.plySheets || 0)} NOS</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>TOTAL SHUTTERING AREA</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600, color:'#7B2DBF' }}>{fmt(results?.shutteringAreaSQM || 0)} SQM</td>
            </tr>
          </tbody>
        </table>
      }
      pdfTotalValue={`${fmt(results?.shutteringAreaSQM || 0)} SQM`}
      pdfTotalSubtitle="TOTAL SHUTTERING AREA"
      visualizerType="SHUTTERING"
      visualizerData={results ? {
        area: results.shutteringAreaSQM,
      } : undefined}
    />
  );
}
