import React from 'react';
import { PDFLayout } from './PDFLayout';

export const QuotationTemplate: React.FC = () => {
  return (
    <PDFLayout title="Project Quotation">
      {/* Header section */}
      <div className="flex justify-between items-start border-b border-gray-100 pb-12 mb-12">
        <div>
          <div className="text-2xl font-bold tracking-tighter mb-1">AGNAA</div>
          <div className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">Design Intelligence Studio</div>
        </div>
        <div className="text-right">
          <div className="text-xl font-light text-gray-300 uppercase tracking-widest mb-4">Quotation</div>
          <div className="text-[11px] text-gray-500 tabular-nums">
            <p>Date: April 17, 2026</p>
            <p>Ref: QTN-2026-001</p>
          </div>
        </div>
      </div>

      {/* Client & Studio Details */}
      <div className="grid grid-cols-2 gap-12 mb-16">
        <div>
          <h3 className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-4">Client</h3>
          <div className="text-sm">
            <p className="font-semibold mb-1 text-gray-900">Enthalpy Labs</p>
            <p className="text-gray-500 leading-relaxed">
              123 Innovation Drive<br />
              Bangalore, KA 560001<br />
              India
            </p>
          </div>
        </div>
        <div className="text-right">
          <h3 className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-4">From</h3>
          <div className="text-sm">
            <p className="font-semibold mb-1 text-gray-900">Agnaa Design Studio</p>
            <p className="text-gray-500 leading-relaxed">
              studio@agnaa.in<br />
              www.agnaa.in
            </p>
          </div>
        </div>
      </div>

      {/* Main Quote Content */}
      <div className="mb-20">
        <h3 className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-6">Scope of Work</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 text-[10px] uppercase tracking-wider text-gray-400">
              <th className="py-4 font-semibold">Description</th>
              <th className="py-4 font-semibold text-right w-24">QTY</th>
              <th className="py-4 font-semibold text-right w-32">Rate</th>
              <th className="py-4 font-semibold text-right w-32">Amount</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="border-b border-gray-50">
              <td className="py-6 pr-8">
                <p className="font-medium text-gray-900 mb-1">Architectural Visualization - Core</p>
                <p className="text-[11px] text-gray-400 leading-relaxed">High-fidelity 3D rendering and environmental modeling for the main atrium.</p>
              </td>
              <td className="py-6 text-right tabular-nums text-gray-600">01</td>
              <td className="py-6 text-right tabular-nums text-gray-600">₹ 85,000</td>
              <td className="py-6 text-right tabular-nums font-medium text-gray-900">₹ 85,000</td>
            </tr>
            <tr className="border-b border-gray-50">
              <td className="py-6 pr-8">
                <p className="font-medium text-gray-900 mb-1">Interactive Web Portal Integration</p>
                <p className="text-[11px] text-gray-400 leading-relaxed">Custom configurator deployment for client review cycles.</p>
              </td>
              <td className="py-6 text-right tabular-nums text-gray-600">01</td>
              <td className="py-6 text-right tabular-nums text-gray-600">₹ 45,000</td>
              <td className="py-6 text-right tabular-nums font-medium text-gray-900">₹ 45,000</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}></td>
              <td className="py-8 text-right text-[10px] uppercase tracking-widest text-gray-400 font-bold">Subtotal</td>
              <td className="py-8 text-right tabular-nums font-semibold text-gray-900">₹ 1,30,000</td>
            </tr>
            <tr className="border-t-2 border-black">
              <td colSpan={2}></td>
              <td className="py-6 text-right text-[10px] uppercase tracking-widest text-black font-bold">Total Estimate</td>
              <td className="py-6 text-right tabular-nums text-lg font-bold text-black">₹ 1,30,000</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Terms */}
      <div className="mt-auto grid grid-cols-2 gap-12 pt-12 border-t border-gray-100">
        <div>
          <h3 className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-4">Terms & Conditions</h3>
          <ul className="text-[10px] text-gray-400 space-y-2 list-disc pl-3">
            <li>Validity: This quotation is valid for 30 days.</li>
            <li>Payment: 50% advance for commencement.</li>
            <li>Revisions: Up to 2 rounds of major revisions included.</li>
          </ul>
        </div>
        <div className="flex flex-col items-end justify-end">
          <div className="w-48 h-px bg-gray-200 mb-4"></div>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Authorized Signatory</p>
        </div>
      </div>
    </PDFLayout>
  );
};
