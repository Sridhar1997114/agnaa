import React from 'react';
import { PDFLayout } from './PDFLayout';

export const InvoiceTemplate: React.FC = () => {
  return (
    <PDFLayout title="Tax Invoice">
      {/* Header section */}
      <div className="flex justify-between items-start border-b border-gray-100 pb-12 mb-12">
        <div>
          <div className="text-2xl font-bold tracking-tighter mb-1">AGNAA</div>
          <div className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">Design Intelligence Studio</div>
        </div>
        <div className="text-right">
          <div className="text-xl font-light text-gray-300 uppercase tracking-widest mb-4 italic">Invoice</div>
          <div className="text-[11px] text-gray-500 tabular-nums">
            <p>Date: April 17, 2026</p>
            <p>Inv #: AG-INV-2026-042</p>
            <p className="text-black font-semibold mt-1">Due: May 01, 2026</p>
          </div>
        </div>
      </div>

      {/* Billing Details */}
      <div className="grid grid-cols-2 gap-12 mb-16">
        <div>
          <h3 className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-4 text-black">Billed To</h3>
          <div className="text-sm">
            <p className="font-semibold mb-1 text-gray-900">Enthalpy Labs</p>
            <p className="text-gray-500 leading-relaxed">
              123 Innovation Drive<br />
              Bangalore, KA 560001<br />
              GSTIN: 29AAAAA0000A1Z5
            </p>
          </div>
        </div>
        <div className="text-right">
          <h3 className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-4">Pay To</h3>
          <div className="text-sm">
            <p className="font-semibold mb-1 text-gray-900">Agnaa Design Studio</p>
            <p className="text-gray-500 leading-relaxed">
              HDFC Bank | A/C 502000...<br />
              IFSC: HDFC0001234
            </p>
          </div>
        </div>
      </div>

      {/* Invoice Items */}
      <div className="mb-20">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-black text-[10px] uppercase tracking-wider text-black font-bold">
              <th className="py-3">Item Description</th>
              <th className="py-3 text-right">HSN/SAC</th>
              <th className="py-3 text-right">Rate</th>
              <th className="py-3 text-right w-32">Total</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="border-b border-gray-100">
              <td className="py-6">
                <p className="font-semibold text-gray-900 mb-1">Architectural Visualization Service</p>
                <p className="text-xs text-gray-400">Project: RC1mx Facility Mockup</p>
              </td>
              <td className="py-6 text-right tabular-nums text-gray-500">998339</td>
              <td className="py-6 text-right tabular-nums text-gray-700">₹ 85,000.00</td>
              <td className="py-6 text-right tabular-nums font-semibold text-gray-900">₹ 85,000.00</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-6">
                <p className="font-semibold text-gray-900 mb-1">Software Integration Fee</p>
                <p className="text-xs text-gray-400">Milestone 1: Dashboard Setup</p>
              </td>
              <td className="py-6 text-right tabular-nums text-gray-500">998313</td>
              <td className="py-6 text-right tabular-nums text-gray-700">₹ 15,000.00</td>
              <td className="py-6 text-right tabular-nums font-semibold text-gray-900">₹ 15,000.00</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}></td>
              <td className="py-6 text-right text-[10px] uppercase tracking-wider text-gray-400 font-bold">Subtotal</td>
              <td className="py-6 text-right tabular-nums font-medium text-gray-900">₹ 1,00,000.00</td>
            </tr>
            <tr>
              <td colSpan={2}></td>
              <td className="py-1 text-right text-[10px] uppercase tracking-wider text-gray-400 font-bold">CGST (9%)</td>
              <td className="py-1 text-right tabular-nums text-gray-600">₹ 9,000.00</td>
            </tr>
            <tr>
              <td colSpan={2}></td>
              <td className="py-1 text-right text-[10px] uppercase tracking-wider text-gray-400 font-bold whitespace-nowrap">SGST (9%)</td>
              <td className="py-1 text-right tabular-nums text-gray-600">₹ 9,000.00</td>
            </tr>
            <tr className="border-t-2 border-black">
              <td colSpan={2}></td>
              <td className="py-6 text-right text-[12px] uppercase tracking-widest text-black font-black">Grand Total</td>
              <td className="py-6 text-right tabular-nums text-xl font-black text-black">₹ 1,18,000.00</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Footer / Notes */}
      <div className="mt-auto pt-12 border-t border-gray-100 flex justify-between items-end">
        <div>
          <h3 className="text-[10px] uppercase tracking-widest text-black font-bold mb-2">Notes</h3>
          <p className="text-[10px] text-gray-400 max-w-xs leading-relaxed">
            Please include the invoice number in your bank transfer reference. 
            All disputes are subject to the jurisdiction of Bangalore courts.
          </p>
        </div>
        <div className="text-right">
          <div className="mb-4">
             <div className="inline-block px-3 py-1 bg-black text-white text-[9px] font-bold uppercase tracking-widest rounded">Paid via Razorpay</div>
          </div>
          <p className="text-[10px] text-gray-300">Generated on pro.agnaa.in</p>
        </div>
      </div>
    </PDFLayout>
  );
};
