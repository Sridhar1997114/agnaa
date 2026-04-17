import React from 'react';
import { PDFLayout } from './PDFLayout';

export const MOUTemplate: React.FC = () => {
  return (
    <PDFLayout title="Memorandum of Understanding">
      <div className="font-serif text-gray-900 leading-relaxed">
        {/* Header */}
        <div className="text-center border-b-2 border-black pb-8 mb-12">
          <h1 className="text-3xl font-black uppercase tracking-tighter">Memorandum of Understanding</h1>
          <p className="text-xs tracking-widest text-gray-500 mt-2 uppercase">Project Code: AG-EN-MOU-2026-04</p>
        </div>

        {/* Parties */}
        <div className="mb-12">
          <h2 className="text-sm font-black uppercase tracking-widest border-l-4 border-black pl-4 mb-6">Between</h2>
          <div className="grid grid-cols-2 gap-12">
            <div>
              <p className="font-bold text-lg mb-1">Agnaa Design Studio</p>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-4">The Consultant</p>
              <p className="text-sm">Represented by Architect Sridhar, having its principal office for creative direction in Hyderabad, India.</p>
            </div>
            <div>
              <p className="font-bold text-lg mb-1">Enthalpy Labs</p>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-4">The Project Beneficiary</p>
              <p className="text-sm">Having its primary testing and synthesis facility in Hyderabad, India.</p>
            </div>
          </div>
        </div>

        {/* Scope */}
        <div className="mb-12 bg-gray-50 p-8 rounded-xl border border-gray-100">
          <h2 className="text-sm font-black uppercase tracking-widest mb-6">01. Collective Intent</h2>
          <p className="text-sm mb-4">
            This MOU establishes a collaboration framework for the digital transformation and brand architecting of Enthalpy Labs. 
            Agnaa Design Studio shall serve as the lead agency for visual intelligence, UI/UX architecture, and automated document generation systems.
          </p>
          <ul className="text-xs space-y-2 list-disc pl-5 text-gray-600">
            <li>Phase 1: Brand Identity & Sacred Geometry (ΔH) logomark delivery.</li>
            <li>Phase 2: Enterprise PDF Engine for DSC/RC1/TGA reporting.</li>
            <li>Phase 3: Real-time Client Portal & Study Tracking deployment.</li>
          </ul>
        </div>

        {/* Clauses */}
        <div className="grid grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Confidentiality</h3>
            <p className="text-xs leading-relaxed">
              Both parties agree that all technical specifications, chemical formulas, structural CAD data, and process safety protocols shared during the collaboration remain strictly confidential.
            </p>
          </div>
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Intellectual Property</h3>
            <p className="text-xs leading-relaxed">
              Upon full project disbursement, all visual assets, domain architectures, and branding collateral shall transfer ownership to Enthalpy Labs (Project Beneficiary).
            </p>
          </div>
        </div>

        {/* Execution */}
        <div className="pt-20 border-t border-gray-100 grid grid-cols-2 gap-24">
          <div className="text-center">
            <div className="h-20 flex items-center justify-center italic text-gray-300">/ Digital Signature /</div>
            <div className="w-full h-px bg-gray-200 mt-4"></div>
            <p className="text-[10px] uppercase font-black mt-2">Agnaa Design Studio</p>
          </div>
          <div className="text-center">
            <div className="h-20 flex items-center justify-center text-gray-300">_______________________</div>
            <div className="w-full h-px bg-gray-200 mt-4"></div>
            <p className="text-[10px] uppercase font-black mt-2">Enthalpy Labs Authority</p>
          </div>
        </div>

        <div className="mt-16 text-center text-[9px] text-gray-400 uppercase tracking-[0.3em]">
          Valid for 6 calendar months from April 17, 2026
        </div>
      </div>
    </PDFLayout>
  );
};
