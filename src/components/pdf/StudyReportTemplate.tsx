import React from 'react';
import { PDFLayout } from './PDFLayout';

export const StudyReportTemplate: React.FC = () => {
  return (
    <PDFLayout title="Technical Study Report">
      <div className="font-sans text-gray-900">
        {/* Branding Header */}
        <div className="flex justify-between items-center bg-[#0D0D14] p-12 -mx-12 -mt-12 text-white mb-16">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 flex items-center justify-center border-2 border-[#F4B400] text-[#F4B400] font-black text-xl">ΔH</div>
             <div>
                <h1 className="text-2xl font-black tracking-tighter uppercase">Enthalpy Labs</h1>
                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Process Safety & Calorimetry</p>
             </div>
          </div>
          <div className="text-right">
             <div className="text-[10px] font-black uppercase tracking-widest text-[#F4B400] mb-2">Authenticated Report</div>
             <p className="text-sm font-bold tabular-nums">REF: EL-SR-2026-0842</p>
          </div>
        </div>

        {/* Report Overview */}
        <div className="mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-2">Differential Scanning Calorimetry (DSC) Analysis</h2>
          <p className="text-sm text-gray-500 max-w-xl">Comprehensive thermal stability and decomposition analysis for Sample Code: RC1-MET-X2. Verified against standard METTLER TOLEDO DSC 3+ protocols.</p>
        </div>

        {/* Parameters Grid */}
        <div className="grid grid-cols-3 gap-6 mb-16 px-6 py-8 bg-gray-50 rounded-2xl border border-gray-100">
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Testing Range</h3>
            <p className="text-sm font-bold">40°C — 450°C</p>
          </div>
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Heating Rate</h3>
            <p className="text-sm font-bold">10 K/min</p>
          </div>
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Atmosphere</h3>
            <p className="text-sm font-bold">Nitrogen (N2)</p>
          </div>
        </div>

        {/* Findings Section */}
        <div className="space-y-12 mb-20">
          <div className="border-l-4 border-[#F4B400] pl-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Observation 01: Onset Temperature</h3>
            <p className="text-sm leading-relaxed mb-4">
              The primary exothermic decomposition event was observed at an onset temperature of <strong>214.5°C</strong>. 
              The energy release (ΔH) was integrated at <strong>842 J/g</strong>, indicating high thermal hazard potential if processed above 180°C.
            </p>
          </div>

          <div className="border-l-4 border-gray-200 pl-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Observation 02: Baseline Stability</h3>
            <p className="text-sm leading-relaxed">
              Baseline remains stable until 198°C. No pre-decomposition endothermic transitions (melting/glass transition) were detected within the specified pharmaceutical operational window.
            </p>
          </div>
        </div>

        {/* Visual Placeholder for Graph */}
        <div className="h-64 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center text-center p-12 mb-20">
           <div>
             <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">📈</div>
             <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Calorimetry Data Visualization Hook</p>
             <p className="text-[10px] text-gray-300 mt-2">DPI 300 SVG Integrated Overlay Pending</p>
           </div>
        </div>

        {/* Authentication */}
        <div className="flex justify-between items-end pt-12 border-t border-gray-100">
           <div>
              <p className="text-[10px] text-gray-400 mb-2">Generated via Agnaa Digital Engine</p>
              <p className="text-sm font-black text-gray-900">Enthalpy Labs Hyderabad Facility</p>
           </div>
           <div className="text-right">
              <div className="inline-block px-4 py-2 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-lg mb-4 shadow-xl">Verified Analysis</div>
              <p className="text-[10px] text-gray-400">© 2026 Enthalpy Labs. All Rights Reserved.</p>
           </div>
        </div>
      </div>
    </PDFLayout>
  );
};
