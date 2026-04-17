'use client';

import React, { useState } from 'react';
import { QuotationTemplate } from '@/components/pdf/QuotationTemplate';
import { InvoiceTemplate } from '@/components/pdf/InvoiceTemplate';
import { DeliveryNoteTemplate } from '@/components/pdf/DeliveryNoteTemplate';
import { ChangeOrderTemplate } from '@/components/pdf/ChangeOrderTemplate';

type TemplateType = 'quotation' | 'invoice' | 'delivery' | 'change-order';

export default function PDFPreviewPage() {
  const [activeTemplate, setActiveTemplate] = useState<TemplateType>('quotation');

  const renderTemplate = () => {
    switch (activeTemplate) {
      case 'quotation': return <QuotationTemplate />;
      case 'invoice': return <InvoiceTemplate />;
      case 'delivery': return <DeliveryNoteTemplate />;
      case 'change-order': return <ChangeOrderTemplate />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 pb-20">
      {/* Selection Header */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10 px-8 py-4 no-print">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-white font-bold tracking-tight">AGNAA PDF Engine</h2>
            <p className="text-white/40 text-[10px] uppercase tracking-widest">Digital Asset Preview System</p>
          </div>
          
          <div className="flex bg-white/5 p-1 rounded-full border border-white/10">
            {(['quotation', 'invoice', 'delivery', 'change-order'] as TemplateType[]).map((type) => (
              <button
                key={type}
                onClick={() => setActiveTemplate(type)}
                className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${
                  activeTemplate === type 
                    ? 'bg-white text-black shadow-lg scale-105' 
                    : 'text-white/40 hover:text-white'
                }`}
              >
                {type.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Template Render Area */}
      <div className="pt-8">
        {renderTemplate()}
      </div>
      
      {/* Brand Watermark */}
      <div className="mt-12 text-center no-print opacity-20 hover:opacity-100 transition-opacity">
        <div className="text-white text-2xl font-black italic tracking-tighter">AGNAA</div>
        <p className="text-white/50 text-[10px] uppercase tracking-[0.3em] mt-2">Design Intelligence Systems</p>
      </div>
    </div>
  );
}
