"use client";

import React from 'react';
import { Download, Share2, Printer, ShieldCheck } from 'lucide-react';
import { InvoiceState } from './types';
import { BRAND } from '@/lib/pricing-data';
import { AgnaaLogo } from '@/components/AgnaaLogo';

interface Props {
  data: InvoiceState;
}

export default function InvoicePreview({ data }: Props) {
  const downloadPDF = () => {
    const element = document.getElementById('invoice-content');
    if (typeof window !== 'undefined' && window.html2pdf) {
      window.html2pdf()
        .set({
          margin: 10,
          filename: `${data.invoiceNumber}_AGNAA_PROTOCOL.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 3, backgroundColor: '#FFFFFF' },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        })
        .from(element)
        .save();
    }
  };

  return (
    <div className="sticky top-8 space-y-4 animate-in fade-in slide-in-from-right duration-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-space font-bold text-[#1C1C72]">Protocol Preview</h3>
        <div className="flex gap-2">
          <button 
            onClick={downloadPDF}
            className="flex items-center gap-2 px-4 py-2 bg-[#1C1C72] hover:bg-[#2A1B81] rounded-xl text-white transition-all transform hover:scale-105 shadow-lg shadow-[#1C1C72]/20"
          >
            <Download size={18} />
            <span className="text-sm font-bold">Export PDF</span>
          </button>
        </div>
      </div>

      <div 
        id="invoice-content"
        className="bg-white text-[#1C1C72] p-16 rounded-xl shadow-2xl border border-gray-100 w-full min-h-[842px] relative overflow-hidden"
        style={{ fontFamily: 'var(--font-inter)' }}
      >
        {/* Subtle Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none rotate-[-45deg] w-full flex justify-center">
          <AgnaaLogo className="w-[600px] h-auto" />
        </div>

        {/* Header */}
        <div className="flex justify-between items-start border-b-2 border-[#1C1C72]/10 pb-10 mb-12 relative z-10">
          <div>
            <AgnaaLogo className="h-12 w-auto mb-2 text-[#1C1C72]" />
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#7B2DBF] mt-1 ml-1">Architects • Engineers • Impact</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-widest font-bold text-[#9CA3AF] mb-1">Protocol Ident</p>
            <p className="text-3xl font-space font-bold text-[#1C1C72]">{data.invoiceNumber}</p>
            <p className="text-sm font-bold text-[#6B7280]">{data.date}</p>
          </div>
        </div>

        {/* Client & Origin */}
        <div className="grid grid-cols-2 gap-16 mb-16 relative z-10">
          <div>
            <h4 className="text-[10px] uppercase tracking-widest text-[#7B2DBF] mb-4 font-black">Subject Information</h4>
            <div className="space-y-2">
              <p className="font-bold text-2xl text-[#1C1C72] leading-tight">{data.client.name || 'PENDING NAME'}</p>
              <div className="space-y-0.5 mt-2">
                <p className="text-sm font-bold text-[#4B5563]">{data.client.company}</p>
                <p className="text-sm text-[#6B7280]">{data.client.projectLocation}</p>
                <p className="text-sm text-[#6B7280]">{data.client.email}</p>
              </div>
            </div>
          </div>
          <div className="text-right border-l-2 border-gray-50 pl-16">
            <h4 className="text-[10px] uppercase tracking-widest text-[#7B2DBF] mb-4 font-black">Protocol Origin</h4>
            <div className="space-y-1 text-sm">
              <p className="text-[#1C1C72] font-black">Agnaa Commercial Protocol</p>
              <p className="text-[#6B7280]">Tech Hub, Gachibowli</p>
              <p className="text-[#6B7280]">Hyderabad, TS 500032</p>
              <p className="text-[#6B7280]">GSTIN: 36AGNAA1234F1Z0</p>
            </div>
          </div>
        </div>

        {/* Line Items */}
        <div className="mb-16 relative z-10">
          <table className="w-full">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-widest text-[#9CA3AF] border-b-2 border-gray-50">
                <th className="py-5 font-bold">Component Breakdown</th>
                <th className="py-5 font-bold text-right">Base INR</th>
                <th className="py-5 font-bold text-right">Factor</th>
                <th className="py-5 font-bold text-right">Total INR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.items.map(item => (
                <tr key={item.id} className="text-sm">
                  <td className="py-6 pr-6">
                    <p className="font-black text-[#1C1C72] text-base">{item.name}</p>
                    <p className="text-[10px] text-[#7B2DBF] font-bold uppercase mt-1 tracking-wider">{item.category} • {item.tier} Logic</p>
                  </td>
                  <td className="py-6 text-right tabular-nums text-[#6B7280]">₹{item.basePrice.toLocaleString('en-IN')}</td>
                  <td className="py-6 text-right tabular-nums font-bold text-[#7B2DBF]">{item.multiplier.toFixed(2)}x</td>
                  <td className="py-6 text-right tabular-nums font-black text-[#1C1C72] text-base">₹{item.total.toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-16 relative z-10">
          <div className="w-80 space-y-4">
            <div className="flex justify-between text-sm py-2 border-b border-gray-50">
              <span className="font-bold text-[#6B7280]">Protocol Subtotal</span>
              <span className="tabular-nums font-black">₹{data.subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-sm py-2 border-b border-gray-50">
              <span className="font-bold text-[#6B7280]">Governing Tax (GST 18%)</span>
              <span className="tabular-nums font-black">₹{data.tax.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-2xl pt-4">
              <span className="font-space font-black text-[#1C1C72]">Total Value</span>
              <span className="font-space font-black text-[#7B2DBF]">₹{data.total.toLocaleString('en-IN')}</span>
            </div>
            
            <div className="bg-[#F3F4F6] p-6 rounded-2xl border border-gray-100 mt-8 group transition-all hover:bg-[#1C1C72] hover:text-white">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                <span className="text-[#7B2DBF] group-hover:text-white/80">Mandatory Advance (30%)</span>
                <span className="text-[#059669] group-hover:text-green-400">PRIORITY</span>
              </div>
              <p className="text-3xl font-space font-black">₹{data.advanceAmount.toLocaleString('en-IN')}</p>
              <p className="text-[10px] mt-2 font-bold opacity-60">Required to initiate resources and design activation.</p>
            </div>
          </div>
        </div>

        {/* Footer / Operating Principles */}
        <div className="border-t-2 border-gray-50 pt-10 text-[10px] text-[#9CA3AF] leading-relaxed relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="text-[#059669]" size={14} />
            <p className="font-black text-[#1C1C72] uppercase tracking-widest">Operating Principles</p>
          </div>
          <div className="grid grid-cols-2 gap-8 text-justify font-medium">
            <p>1. This protocol establishes the commercial scope and commitment for the specified microservices. Activation and slot reservation require the 30% advance clearance.</p>
            <p>2. Multipliers are derived from market conditions (City T1/T2/T3), project complexity, and urgency parameters as per Agnaa’s commercial index.</p>
          </div>
          <p className="mt-8 text-center font-bold uppercase tracking-[0.2em] opacity-40">Proprietary Document • Agnaa Architects</p>
        </div>
      </div>
    </div>
  );
}
