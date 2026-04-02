"use client";

import React, { useState } from 'react';
import { BaseCalculator } from '@/components/calculators/BaseCalculator';
import { calculateGNFloorArea } from '@/lib/calculator-utils';
import { Building2 } from 'lucide-react';
import { Odometer } from '@/components/ui/Odometer';

export default function GNFloorEstimator() {
  const [plotArea, setPlotArea] = useState('');
  const [fsi, setFsi] = useState('');
  const [floors, setFloors] = useState('');
  const [maxPlate, setMaxPlate] = useState('');
  const [isCalculated, setIsCalculated] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    const pArea = parseFloat(plotArea) || 0;
    const fsiVal = parseFloat(fsi) || 0;
    const fls = parseFloat(floors) || 0;
    const maxP = parseFloat(maxPlate) || 0;
    if (pArea > 0 && fsiVal > 0 && fls > 0) {
      setResults(calculateGNFloorArea(pArea, fsiVal, fls, maxP));
      setIsCalculated(true);
    }
  };

  const handleReset = () => {
    setPlotArea('');
    setFsi('');
    setFloors('');
    setMaxPlate('');
    setIsCalculated(false);
    setResults(null);
  };

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 2 });

  return (
    <BaseCalculator
      title="G+N Floor Estimator"
      description="Distribute total permissible built-up area across floors to get per-floor areas."
      icon={<Building2 className="w-5 h-5" />}
      isCalculated={isCalculated}
      onCalculate={handleCalculate}
      onReset={handleReset}
      pdfFileName={`AGNAA_GN_Estimator_${fmt(results?.totalBuildableArea || 0)}sqft.pdf`}
      pdfTitle="G+N Floor\nEstimator"
      pdfProjectInfo={{ 'DOCUMENT TYPE': 'PLANNING GUIDELINE', 'SOURCE': 'AGNAA PRECISION ENGINE' }}
      inputsContent={
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Plot Area (SQFT)</label>
            <input type="number" value={plotArea} onChange={(e) => {setPlotArea(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 2400" />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Permissible FSI</label>
            <input type="number" step="0.1" value={fsi} onChange={(e) => {setFsi(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 1.5" />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Planned Floors</label>
            <input type="number" value={floors} onChange={(e) => {setFloors(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 3 (for G+2)" />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Max Floor Plate (Opt.)</label>
            <input type="number" value={maxPlate} onChange={(e) => {setMaxPlate(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 1000" />
          </div>
        </div>
      }
      resultsContent={
        <div className="bg-gradient-to-br from-[#1C1C72] to-[#2A1B81] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden h-full min-h-[300px] flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#7B2DBF]/20 rounded-full blur-[40px] pointer-events-none"></div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A5B4FC] mb-6">Area Distribution</h3>
          
          <div className="text-5xl font-black mb-1 flex items-baseline gap-1">
            <Odometer value={results?.perFloorArea || 0} decimals={2} />
          </div>
          <div className="text-sm font-bold text-[#A5B4FC] mb-8">PER FLOOR AREA (SQFT)</div>

          <div className="grid grid-cols-2 gap-y-6 gap-x-4">
            <div>
              <div className="text-2xl font-bold flex items-baseline gap-1">
                <Odometer value={results?.totalBuildableArea || 0} decimals={2} />
              </div>
              <div className="text-[9px] font-bold text-[#A5B4FC] uppercase tracking-widest">Total Buildable (SQFT)</div>
            </div>
            <div>
              <div className="text-2xl font-bold flex items-baseline gap-1">
                <Odometer value={results?.totalFloorsPossible || 0} decimals={1} />
              </div>
              <div className="text-[9px] font-bold text-[#A5B4FC] uppercase tracking-widest">Max Floor Count Limit</div>
            </div>
          </div>
          <div className="mt-8 text-xs text-white/50 border-t border-white/10 pt-4">
            * Note: These are planning-level estimates. Final floor areas depend on setbacks, shafts, and local bye-laws.
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
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>PLOT AREA</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{plotArea} SQFT</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>FSI</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fsi}</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>PLANNED FLOORS</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{floors}</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>MAX FLOOR PLATE</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{maxPlate || 'N/A'} SQFT</td>
            </tr>
            <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
              <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>TOTAL BUILDABLE AREA</td>
              <td style={{ padding:'12px', textAlign:'right', fontWeight:600, color:'#7B2DBF' }}>{fmt(results?.totalBuildableArea || 0)} SQFT</td>
            </tr>
          </tbody>
        </table>
      }
      pdfTotalValue={`${fmt(results?.perFloorArea || 0)} SQFT`}
      pdfTotalSubtitle="ESTIMATED PER FLOOR AREA"
      visualizerType="G_N_FLOOR"
      visualizerData={results ? {
        floors: parseFloat(floors),
        areaPerFloor: results.perFloorArea,
        totalBuiltUpArea: results.totalBuildableArea,
      } : undefined}
    />
  );
}
