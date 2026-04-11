"use client";

import React, { useState } from 'react';
import Script from 'next/script';
import { Inter, Space_Grotesk } from 'next/font/google';
import QuotationForm from './QuotationForm';
import QuotationPreview from './QuotationPreview';
import { QuotationState } from './types';
import { AgnaaLogo } from '@/components/AgnaaLogo';
import { ChevronLeft, Info } from 'lucide-react';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });

export default function QuotationPage() {
  const [quotationData, setQuotationData] = useState<QuotationState | null>(null);

  return (
    <div className={`${inter.variable} ${space.variable} font-sans min-h-screen bg-white text-[#1C1C72] p-4 md:p-12 transition-colors duration-500`}>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js" />
      
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-12 animate-in fade-in slide-in-from-top duration-700">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-[#1C1C72]/10 rounded-full transition-all">
              <ChevronLeft size={24} className="text-[#1C1C72]" />
            </Link>
            <div>
              <h1 className="text-3xl font-space font-bold tracking-tight text-[#1C1C72]">AGNAA <span className="text-[#7B2DBF]">Quotation</span></h1>
              <p className="text-sm text-[#4B5563]">Internal Commercial Protocol for Agnaa Teams</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
             <div className="hidden md:block text-right">
                <p className="text-xs uppercase tracking-widest text-[#4B5563]">Operational Mode</p>
                <p className="text-sm font-bold text-[#059669]">Live Protocol Pricing</p>
             </div>
             <AgnaaLogo className="h-10 w-auto" />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="animate-in fade-in slide-in-from-left duration-700 delay-100">
            <div className="flex items-center gap-2 bg-[#F3F4F6] p-4 rounded-xl border border-[#E5E7EB] mb-6 group">
              <Info className="text-[#7B2DBF] group-hover:scale-110 transition-transform" size={20} />
              <p className="text-xs text-[#4B5563]">
                Pricing is derived from the Master Service Catalog. Multipliers for City, Complexity, and Urgency are applied automatically.
              </p>
            </div>
            
            <QuotationForm onUpdate={setQuotationData} />
          </div>

          <div className="animate-in fade-in slide-in-from-right duration-700 delay-200">
            {quotationData ? (
              <QuotationPreview data={quotationData} />
            ) : (
              <div className="h-full min-h-[400px] flex items-center justify-center border-2 border-dashed border-[#E5E7EB] rounded-2xl bg-[#F9FAFB]">
                <p className="text-[#9CA3AF] font-space text-center px-6">Select services and enter client details <br/> to initialize protocol preview</p>
              </div>
            )}
          </div>
        </div>

        <footer className="mt-20 pt-8 border-t border-[#F3F4F6] text-center text-[#9CA3AF] text-xs">
          <p>© {new Date().getFullYear()} AGNAA ARCHITECTS. PROPRIETARY SYSTEM.</p>
        </footer>
      </div>
    </div>
  );
}
