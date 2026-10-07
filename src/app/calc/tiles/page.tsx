"use client";

import React, { useState } from 'react';
import { BaseCalculator } from '@/components/calculators/BaseCalculator';
import { calculateTiles } from '@/lib/calculator-utils';
import { Layout } from 'lucide-react';
import { Odometer } from '@/components/ui/Odometer';

export default function TilesCalculator() {
  const [areaSqft, setAreaSqft] = useState('1200');
  const [tileSizeSqft, setTileSizeSqft] = useState('8'); // default 2x4 ft (8 sqft)
  
  const [isCalculated, setIsCalculated] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    const area = parseFloat(areaSqft) || 0;
    const tSize = parseFloat(tileSizeSqft) || 8;

    if (area > 0) {
      const res = calculateTiles(area, tSize);
      const boxesCount = Math.ceil(res.noOfTiles / 2); // Assuming 2 tiles per box standard for 2x4 / 4x4
      setResults({ area, tSize, boxesCount, ...res });
      setIsCalculated(true);
    }
  };

  const handleReset = () => {
    setAreaSqft('1200');
    setTileSizeSqft('8');
    setIsCalculated(false);
    setResults(null);
  };

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 1 });

  return (
    <BaseCalculator
      title="Tile & Flooring Quantity Calculator"
      description="Estimate floor tiles count, wastage buffer, and box counts for luxury porcelain, vitrified, or marble flooring."
      icon={<Layout className="w-5 h-5" />}
      isCalculated={isCalculated}
      onCalculate={handleCalculate}
      onReset={handleReset}
      pdfFileName="AGNAA_Flooring_Tile_Report.pdf"
      pdfTitle="Flooring Tile & Material\nQuantity Estimate"
      pdfProjectInfo={{ 'DOCUMENT TYPE': 'FLOORING ESTIMATE', 'SOURCE': 'AGNAA PRECISION ENGINE' }}
      visualizerType="FLOOR"
      visualizerData={{ 
        floorArea: results?.area || parseFloat(areaSqft) || 1200,
        noOfTiles: results?.noOfTiles || 0,
      }}
      inputsContent={
        <div className="space-y-6">
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Room Floor Area (SQFT)</label>
            <input type="number" value={areaSqft} onChange={(e) => {setAreaSqft(e.target.value); setIsCalculated(false);}} className="bg-white w-full rounded-xl px-3 py-2 text-base font-black text-[#1C1C72] outline-none border border-gray-200 focus:border-[#7B2DBF] transition-colors" placeholder="e.g. 1200" />
          </div>

          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Tile Dimension Format</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: '2 x 2 Ft (4 Sqft)', val: '4' },
                { label: '2 x 4 Ft (8 Sqft)', val: '8' },
                { label: '4 x 4 Ft (16 Sqft)', val: '16' },
                { label: '4 x 8 Ft Slabs (32 Sqft)', val: '32' },
              ].map((t) => (
                <button
                  key={t.val}
                  onClick={() => { setTileSizeSqft(t.val); setIsCalculated(false); }}
                  className={`py-2 px-3 text-[10px] font-black uppercase tracking-wider rounded-xl border text-left transition-all ${tileSizeSqft === t.val ? 'bg-[#1C1C72] text-white border-[#7B2DBF]' : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-gray-300'}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      }
      resultsContent={
        <div className="bg-gradient-to-br from-[#1C1C72] to-[#2A1B81] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden h-full min-h-[300px] flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#7B2DBF]/20 rounded-full blur-[40px] pointer-events-none"></div>
          
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A5B4FC] mb-4">REQUIRED TILES COUNT</h3>
            <div className="text-5xl font-black text-[#7B2DBF] brightness-125 mb-1">
              <Odometer value={results?.noOfTiles || 0} decimals={0} /> <span className="text-lg text-gray-300">TILES</span>
            </div>
            <p className="text-xs text-gray-300 font-medium">Includes 5% tile cutting and perimeter wastage buffer.</p>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
            <div>
              <div className="text-[10px] font-black text-[#A5B4FC] uppercase tracking-widest">Total Box Count</div>
              <div className="text-2xl font-black text-white"><Odometer value={results?.boxesCount || 0} decimals={0} /> boxes</div>
            </div>
            <div>
              <div className="text-[10px] font-black text-[#A5B4FC] uppercase tracking-widest">Total Tile Area</div>
              <div className="text-2xl font-black text-emerald-400"><Odometer value={results?.tilesArea || 0} decimals={0} /> sqft</div>
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
                <th style={{ padding:'12px', textAlign:'right', borderTopRightRadius:6 }}>ESTIMATED QUANTITY</th>
              </tr>
            </thead>
            <tbody style={{ color:'#475569' }}>
              <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
                <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>Floor Area</td>
                <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.area || 0)} Sq.Ft</td>
              </tr>
              <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
                <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>Total Area (+5% Wastage)</td>
                <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.tilesArea || 0)} Sq.Ft</td>
              </tr>
              <tr style={{ borderBottom:'1px solid #F1F5F9' }}>
                <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>Required Tiles Count</td>
                <td style={{ padding:'12px', textAlign:'right', fontWeight:800, color:'#7B2DBF', fontSize:14 }}>{fmt(results?.noOfTiles || 0)} Tiles</td>
              </tr>
              <tr style={{ borderBottom:'1px solid #F1F5F9', background:'#FCFDFF' }}>
                <td style={{ padding:'12px', fontWeight:800, color:'#1C1C72' }}>Estimated Box Count</td>
                <td style={{ padding:'12px', textAlign:'right', fontWeight:600 }}>{fmt(results?.boxesCount || 0)} Boxes</td>
              </tr>
            </tbody>
          </table>
        </>
      }
      pdfTotalValue={`${fmt(results?.noOfTiles || 0)} TILES / ${fmt(results?.boxesCount || 0)} BOXES`}
      pdfTotalSubtitle="FLOORING TILE ESTIMATE"
    />
  );
}
