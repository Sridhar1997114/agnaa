import React from 'react';
import { PDFLayout } from './PDFLayout';

export const ReceiptTemplate: React.FC = () => {
  return (
    <PDFLayout title="Payment Receipt">
      <div className="font-sans">
        <div className="flex justify-between items-start mb-16">
          <div>
            <div className="text-3xl font-black tracking-tighter text-[#1C1C72] mb-1">AGNAA</div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Design Studio Pvt Ltd</p>
          </div>
          <div className="text-right">
            <div className="bg-[#1C1C72] text-white px-4 py-1 text-[10px] font-black uppercase tracking-widest rounded mb-4 inline-block">Official Receipt</div>
            <p className="text-sm font-bold text-gray-900 tabular-nums"># RCP-2026-EN-01</p>
          </div>
        </div>

        <div className="bg-gray-50 p-12 rounded-[32px] border border-gray-100 text-center mb-16">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Amount Received</p>
          <div className="text-5xl font-black text-[#1C1C72] mb-4 tracking-tight tabular-nums">₹ 25,000.00</div>
          <p className="text-sm font-medium text-gray-500 italic font-serif">"Rupees Twenty Five Thousand Only"</p>
        </div>

        <div className="grid grid-cols-2 gap-12 mb-20 px-6">
          <div className="space-y-8">
            <div>
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">From Client</h3>
              <p className="font-bold text-gray-900">Enthalpy Labs</p>
              <p className="text-xs text-gray-500 leading-relaxed">Phase II, Peenya Industrial Area<br/>Bangalore, KA</p>
            </div>
            <div>
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Transaction Detail</h3>
              <p className="text-sm font-medium">NEFT / Bank Transfer</p>
              <p className="text-xs text-gray-500">Ref: HDFC0002123...421</p>
            </div>
          </div>
          <div className="space-y-8">
             <div>
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Payment Category</h3>
              <p className="font-bold text-gray-900 underline decoration-purple-500 decoration-4 underline-offset-4">Project Advance</p>
              <p className="text-xs text-gray-500 mt-2">Agnaa Ongoing Works — Enthalpy Labs</p>
            </div>
            <div>
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Date Received</h3>
              <p className="text-sm font-bold">April 08, 2026</p>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-100 flex justify-between items-center">
          <div className="text-[11px] text-gray-400 max-w-xs leading-relaxed">
            This receipt is generated automatically upon payment confirmation. 
            All payments are subject to the terms in MOU AG-EN-MOU-2026-04.
          </div>
          <div className="text-right">
             <div className="text-2xl font-display text-[#1C1C72] italic opacity-30 mb-1">Agnaa Accounts</div>
             <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400">Electronic Verification Valid</p>
          </div>
        </div>
      </div>
    </PDFLayout>
  );
};
