"use client";

import React, { useState } from 'react';
import { BaseCalculator } from '@/components/calculators/BaseCalculator';
import { calculateTiles } from '@/lib/calculator-utils';
import { LayoutGrid } from 'lucide-react';
import { Odometer } from '@/components/ui/Odometer';

export default function TilesCalculator() {
  const [area, setArea] = useState('');
  const [tileLength, setTileLength] = useState('');
  const [tileWidth, setTileWidth] = useState('');
  const [unit, setUnit] = useState<'mm' | 'inches'>('mm');
  
  const [isCalculated, setIsCalculated] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    const a = parseFloat(area) || 0;
    const l = parseFloat(tileLength) || 0;
    const w = parseFloat(tileWidth) || 0;
    
    if (a > 0 && l > 0 && w > 0) {
      let lSqft = l;
      let wSqft = w;
      if (unit === 'mm') {
        lSqft = l / 304.8;
        wSqft = w / 304.8;
      } else if (unit === 'inches') {
        lSqft = l / 12;
        wSqft = w / 12;
      }
      const tileSizeSqft = lSqft * wSqft;
      
      setResults({ a, l, w, unit, tileSizeSqft, ...calculateTiles(a, tileSizeSqft) });
      setIsCalculated(true);
    }
  };

  const handleReset = () => {
    setArea('');
    setTileLength('');
    setTileWidth('');
    setIsCalculated(false);
    setResults(null);
  };

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 2 });

  return (
    <BaseCalculator
      title="Floor/Wall Tile Calculator"
      description="Estimate the number of tiles required for a given floor or wall area."
      icon={<LayoutGrid className="w-5 h-5" />}
      isCalculated={isCalculated}
      onCalculate={handleCalculate}
      onReset={handleReset}
      pdfFileName="AGNAA_Tiles_Report.pdf"
      pdfTitle="TILE ESTIMATION"
      pdfProjectInfo={{ 'DOCUMENT TYPE': 'MATERIAL ESTIMATION', 'SOURCE': 'AGNAA PRECISION ENGINE' }}
      visualizerType="FLOOR"
      visualizerData={{ 
        area: results?.a || parseFloat(area), 
        length: Math.sqrt(results?.a || parseFloat(area) || 100) * 3.281, 
        width: Math.sqrt(results?.a || parseFloat(area) || 100) * 3.281,
        tileSize: results?.unit === 'mm' ? results?.l / 25.4 : results?.l, // roughly convert to inch for visualizer
        pattern: 'GRID'
      }}
      inputsContent={
        <div className="space-y-6">
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Total Surface Area (SQFT)</label>
            <input type="number" value={area} onChange={(e) => {setArea(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 1000" />
            <p className="text-[10px] text-gray-400 mt-2">Enter area to be tiled. Consider subtracting doors/windows if estimating for walls.</p>
          </div>
          
          <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
            <button
              onClick={() => {setUnit('mm'); setIsCalculated(false);}}
              className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${unit === 'mm' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Tile Size in mm
            </button>
            <button
              onClick={() => {setUnit('inches'); setIsCalculated(false);}}
              className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${unit === 'inches' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Tile Size in inches
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Tile Length ({unit})</label>
              <input type="number" value={tileLength} onChange={(e) => {setTileLength(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder={`e.g. ${unit === 'mm' ? '600' : '24'}`} />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Tile Width ({unit})</label>
              <input type="number" value={tileWidth} onChange={(e) => {setTileWidth(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder={`e.g. ${unit === 'mm' ? '600' : '24'}`} />
            </div>
          </div>
        </div>
      }
      resultsContent={
        <div className="bg-gradient-to-br from-[#1C1C72] to-[#2A1B81] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden h-full min-h-[300px] flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#7B2DBF]/20 rounded-full blur-[40px] pointer-events-none"></div>
          
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A5B4FC] mb-6">Calculated Tiles</h3>
          
          <div className="space-y-4">
            <div>
              <div className="text-sm font-bold text-[#A5B4FC] mb-1">NUMBER OF TILES</div>
              <div className="text-5xl font-black text-[#7B2DBF] brightness-125 mb-1">
                <Odometer value={results?.noOfTiles || 0} decimals={0} /> <span className="text-lg text-gray-300">Tiles</span>
              </div>
            </div>
            <div>
              <div className="text-sm font-bold text-[#A5B4FC] mb-1">AREA COVERED (inc. 5% Wastage)</div>
              <div className="text-2xl font-black text-[#7B2DBF] brightness-125 mb-1">
                <Odometer value={results?.tilesArea || 0} decimals={2} /> <span className="text-sm text-gray-300">SQFT</span>
              </div>
            </div>
          </div>
        </div>
      }
      pdfContentTable={
        <>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:11 }}>
            <thead>
              <tr style={{ background:'#1C1C72', color:'#fff' }}>
                <th style={{ padding:'12px', textAlign:'left', borderTopLeftRadius:6 }}>PARAMETER</th>
                <th style={{ padding:'12px', textAlign:'right', borderTopRightRadius:6 }}>VALUE</th>
              </tr>
            </thead>
            <tbody style={{ color:'#475569' }}>
              <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
                <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>SURFACE AREA</td>
                <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.a || 0)} SQFT</td>
              </tr>
              <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
                <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>TILE SIZE</td>
                <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{results?.l} x {results?.w} {results?.unit}</td>
              </tr>
              <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
                <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>AREA PER TILE</td>
                <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.tileSizeSqft || 0)} SQFT</td>
              </tr>
              <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
                <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>TOTAL TILES REQUIRED</td>
                <td style={{ padding:'12px', textAlign:'right', fontWeight:800, color:'#7B2DBF', fontSize:14 }}>{fmt(results?.noOfTiles || 0)} Tiles</td>
              </tr>
            </tbody>
          </table>
          <div style={{ marginTop:20, fontSize:9, color:'#64748B', lineHeight:1.5 }}>
            <strong>Note:</strong> A standard 5% wastage is included in the estimated number of tiles. For diagonal laying or complex patterns, consider adding 10-15% wastage manually.
          </div>
        </>
      }
      pdfTotalValue={`${fmt(results?.noOfTiles || 0)} Tiles`}
      pdfTotalSubtitle="TOTAL TILES REQUIRED"
    />
  );
}
