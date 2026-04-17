import React from 'react';
import { PDFLayout } from './PDFLayout';

export const DeliveryNoteTemplate: React.FC = () => {
  return (
    <PDFLayout title="Delivery Note">
      {/* Header section */}
      <div className="flex justify-between items-start border-b border-gray-100 pb-12 mb-12">
        <div>
          <div className="text-2xl font-bold tracking-tighter mb-1 font-sans">AGNAA</div>
          <div className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">Logistics & Deliverables</div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-black uppercase tracking-widest mb-4">Delivery Note</div>
          <div className="text-[11px] text-gray-500 tabular-nums">
            <p>Date: April 17, 2026</p>
            <p>DN #: AG-DLV-042</p>
            <p>PO Ref: PO-EN-992</p>
          </div>
        </div>
      </div>

      {/* Recipient Details */}
      <div className="grid grid-cols-2 gap-12 mb-16 font-sans">
        <div>
          <h3 className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-4">Ship To</h3>
          <div className="text-sm">
            <p className="font-semibold mb-1 text-gray-900">Enthalpy Labs - Facility A</p>
            <p className="text-gray-500 leading-relaxed">
              Industrial Area Phase II<br />
              Peenya, Bangalore 560058<br />
              Contact: Project Lead (+91 98XXX XXXXX)
            </p>
          </div>
        </div>
        <div className="text-right">
          <h3 className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-4">Dispatcher</h3>
          <div className="text-sm">
            <p className="font-semibold mb-1 text-gray-900">Agnaa Design Studio</p>
            <p className="text-gray-500">Design Production Unit</p>
          </div>
        </div>
      </div>

      {/* Delivery Items */}
      <div className="mb-20 font-sans">
        <h3 className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-6">Manifest Content</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-[10px] uppercase tracking-wider text-gray-500">
              <th className="py-3 px-4 font-bold">Item Description</th>
              <th className="py-3 px-4 font-bold text-center w-32">Status</th>
              <th className="py-3 px-4 font-bold text-right w-32">Quantity</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="border-b border-gray-50">
              <td className="py-6 px-4">
                <p className="font-medium text-gray-900 mb-1">High-Resolution Physical Prints</p>
                <p className="text-[11px] text-gray-400">A1 Dimensional Drawings (Set of 5)</p>
              </td>
              <td className="py-6 px-4 text-center">
                <span className="inline-block px-2 py-1 bg-green-50 text-green-600 text-[10px] font-bold uppercase rounded">Final</span>
              </td>
              <td className="py-6 px-4 text-right tabular-nums text-gray-900 font-medium">01 Unit</td>
            </tr>
            <tr className="border-b border-gray-50">
              <td className="py-6 px-4">
                <p className="font-medium text-gray-900 mb-1">Encrypted Asset Drive</p>
                <p className="text-[11px] text-gray-400">USB-C Flash Drive with CAD/BIM data</p>
              </td>
              <td className="py-6 px-4 text-center">
                <span className="inline-block px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase rounded">Secured</span>
              </td>
              <td className="py-6 px-4 text-right tabular-nums text-gray-900 font-medium">01 Unit</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Confirmation Section */}
      <div className="mt-auto grid grid-cols-2 gap-12 pt-20 border-t border-gray-100">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-16">Received By (Signature & Date)</p>
          <div className="w-64 h-px bg-gray-200"></div>
          <p className="text-[10px] text-gray-300 mt-2">Print Name & Stamp</p>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-16">Studio Dispatcher</p>
          <div className="w-48 h-px bg-gray-200"></div>
          <p className="text-[10px] text-gray-300 mt-2 italic font-serif">A. Verma</p>
        </div>
      </div>
      
      <div className="mt-12 p-4 bg-gray-50 rounded text-center">
        <p className="text-[10px] text-gray-400 uppercase tracking-widest">Verify this delivery at pro.agnaa.in/verify/DLV-042</p>
      </div>
    </PDFLayout>
  );
};
