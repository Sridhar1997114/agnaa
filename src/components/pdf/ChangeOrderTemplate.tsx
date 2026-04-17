import React from 'react';
import { PDFLayout } from './PDFLayout';

export const ChangeOrderTemplate: React.FC = () => {
  return (
    <PDFLayout title="Change Order Authorization">
      {/* Header section */}
      <div className="flex justify-between items-start border-b-4 border-yellow-500 pb-12 mb-12">
        <div>
          <div className="text-2xl font-bold tracking-tighter mb-1 font-sans">AGNAA</div>
          <div className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">Project Engineering Command</div>
        </div>
        <div className="text-right">
          <div className="text-xl font-black text-black uppercase tracking-widest mb-4">Change Order</div>
          <div className="text-[11px] text-gray-500 tabular-nums">
            <p>Date: April 17, 2026</p>
            <p>CO #: AG-CO-007</p>
            <p className="font-bold text-black mt-1">Impact: High</p>
          </div>
        </div>
      </div>

      {/* Project Ref */}
      <div className="mb-12 p-6 bg-gray-50 rounded-lg flex justify-between items-center">
        <div>
          <h3 className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Project Name</h3>
          <p className="text-lg font-bold text-gray-900">Enthalpy Labs - Phase 2 Expansion</p>
        </div>
        <div className="text-right px-8 border-l border-gray-200">
          <h3 className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Original Ref</h3>
          <p className="text-sm font-medium">AG-PROJ-8821</p>
        </div>
      </div>

      {/* Change Description */}
      <div className="grid grid-cols-1 gap-12 mb-16">
        <div>
          <h3 className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-4">Scope Variation Description</h3>
          <div className="text-sm text-gray-700 leading-relaxed border-l-2 border-gray-100 pl-6">
            <p className="mb-4">Transition from static structural analysis to real-time dynamic environmental simulation based on the newly provided geotechnical data for the Peenya site.</p>
            <p>Includes adjustment of structural meshes and integration of dynamic wind-load parameters into the final visualization portal.</p>
          </div>
        </div>
      </div>

      {/* Financial Impact */}
      <div className="mb-20 font-sans">
        <h3 className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-6">Financial & Timeline Adjustment</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-[10px] uppercase tracking-wider text-gray-500">
              <th className="py-3 font-bold">Adjustment Type</th>
              <th className="py-3 text-right font-bold">Original Value</th>
              <th className="py-3 text-right font-bold">Adjustment</th>
              <th className="py-3 text-right font-bold">New Final Value</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="border-b border-gray-50">
              <td className="py-6 font-medium text-gray-900 underline decoration-yellow-400 underline-offset-4">Contract Sum</td>
              <td className="py-6 text-right tabular-nums text-gray-500">₹ 8,50,000</td>
              <td className="py-6 text-right tabular-nums text-green-600 font-bold">+ ₹ 45,000</td>
              <td className="py-6 text-right tabular-nums font-black text-gray-900">₹ 8,95,000</td>
            </tr>
            <tr className="border-b border-gray-50">
              <td className="py-6 font-medium text-gray-900 underline decoration-yellow-400 underline-offset-4">Project Timeline</td>
              <td className="py-6 text-right tabular-nums text-gray-500">45 Days</td>
              <td className="py-6 text-right tabular-nums text-red-600 font-bold">+ 05 Days</td>
              <td className="py-6 text-right tabular-nums font-black text-gray-900">50 Days</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Approval Section */}
      <div className="mt-auto pt-16 border-t border-gray-100 grid grid-cols-2 gap-24">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-12">Client Approval</p>
          <div className="w-full h-px bg-gray-200"></div>
          <p className="text-[10px] text-gray-300 mt-2 font-medium">SIGNATURE: _______________________</p>
          <p className="text-[10px] text-gray-400 mt-1 uppercase">Date</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-12">Studio Authorization</p>
          <div className="w-full h-px bg-gray-200"></div>
          <p className="text-[11px] text-black mt-2 font-bold uppercase tracking-tighter">Verified & Signed (AG/ADMIN/04)</p>
          <p className="text-[10px] text-gray-400 mt-1 uppercase italic font-serif">P. Krishnamurthy</p>
        </div>
      </div>
      
      <div className="mt-16 text-center">
        <p className="text-[9px] text-gray-300 uppercase tracking-[0.2em]">Formal Modification to Agreement AG-PSA-2026-X1</p>
      </div>
    </PDFLayout>
  );
};
