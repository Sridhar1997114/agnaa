"use client";

import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function FAQPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'How fast is the delivery?',
      a: 'Delivery timelines vary by service and tier. Starter packages typically deliver within 3-5 business days, while Premium projects may take 7-14 days depending on complexity and revision rounds.'
    },
    {
      q: 'Can I pay after the design is done?',
      a: 'No. To maintain the speed and price-efficiency of the AGNAA Shop, all services are prepaid. This ensures both parties are committed to a fast and focused delivery.'
    },
    {
      q: 'What if I don\'t like the first concepts?',
      a: 'Every package includes a specified number of revision rounds. We use our structured brief to minimize misalignment, but revisions are there to polish the selected direction.'
    },
    {
      q: 'Can I upgrade my tier later?',
      a: 'Yes. If you start with a Starter pack and realize you need source files or more revisions, you can pay the difference to upgrade to a higher tier.'
    },
    {
      q: 'Do you offer custom services not listed here?',
      a: 'The Shop focuses on productized services. For large-scale architectural or complex branding projects, please contact AGNAA Design Studio directly at studio@agnaa.in.'
    },
    {
      q: 'How do we communicate during the project?',
      a: 'Initial communication is through the brief form. We then use WhatsApp or Email for progress updates and delivery. We avoid long un-structured meetings to keep costs low.'
    }
  ];

  return (
    <div className="pb-32">
      <section className="pt-24 pb-20 border-b border-brand-card text-center">
        <div className="container mx-auto px-6">
          <Link href="/shop" className="text-brand-muted hover:text-white transition-colors mb-12 font-bold text-xs uppercase tracking-widest inline-flex items-center gap-2">
            <ArrowLeft size={14} /> Back to Shop
          </Link>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-8">
            Common <span className="text-brand-violet">Questions</span>
          </h1>
          <p className="text-xl text-brand-muted max-w-2xl mx-auto font-bold leading-relaxed">
            Everything you need to know about the AGNAA Shop model and delivery.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="space-y-4">
            {faqs.map((item, idx) => (
              <div 
                key={idx} 
                className={`rounded-[2rem] border transition-all duration-300 ${activeFaq === idx ? 'border-brand-violet bg-brand-card/50 shadow-2xl shadow-brand-violet/10' : 'border-brand-card bg-brand-card/30'}`}
              >
                <button 
                  className="w-full p-8 text-left flex justify-between items-center group"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                >
                  <span className={`text-lg font-black tracking-tight transition-colors ${activeFaq === idx ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>
                    {item.q}
                  </span>
                  <ChevronDown 
                    size={20} 
                    className={`text-brand-muted transition-transform duration-500 ${activeFaq === idx ? 'rotate-180 text-brand-violet' : ''}`} 
                  />
                </button>
                {activeFaq === idx && (
                  <div className="px-8 pb-8 text-brand-muted text-[15px] leading-relaxed font-semibold animate-in fade-in slide-in-from-top-2">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-20 p-12 rounded-[2.5rem] bg-brand-violet/5 border border-brand-violet/20 text-center">
            <MessageCircle className="mx-auto mb-6 text-brand-violet" size={40} />
            <h3 className="text-2xl font-black text-white mb-4">Still have a question?</h3>
            <p className="text-brand-muted font-bold mb-8">We're here to help you choose the right service.</p>
            <a 
              href="https://wa.me/918826214348" 
              className="inline-flex items-center gap-3 bg-white text-brand-dark px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-brand-violet hover:text-white transition-all shadow-xl"
            >
              WhatsApp Support
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
