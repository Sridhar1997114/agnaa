"use client";

import React, { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import { ArrowLeft, CheckCircle2, MessageSquare, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { PricingCard, PricingTier } from '@/components/shop/PricingCard';
import { shopServices } from '@/data/shop-services';
import { Button } from '@/components/Button';

export default function ServicePage() {
  const params = useParams();
  const serviceId = params?.serviceId as string;
  const service = serviceId ? shopServices[serviceId] : null;

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  if (!service) {
    notFound();
  }

  return (
    <div className="pb-32">
      {/* Service Hero */}
      <section className="pt-12 pb-20 border-b border-brand-card">
        <div className="container mx-auto px-6">
          <Link 
            href="/shop" 
            className="inline-flex items-center gap-2 text-brand-muted hover:text-white transition-colors mb-12 font-bold text-xs uppercase tracking-widest"
          >
            <ArrowLeft size={14} /> Back to Shop
          </Link>
          
          <div className="max-w-4xl">
            <div className="inline-block px-4 py-1.5 rounded-full bg-brand-violet/10 border border-brand-violet/20 text-brand-violet text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              {service.category}
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6 leading-none">
              {service.title}
            </h1>
            <p className="text-xl md:text-2xl text-brand-muted font-bold tracking-tight mb-8">
              {service.tagline}
            </p>
            <p className="text-lg text-brand-muted/80 max-w-2xl leading-relaxed">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-24 bg-brand-dark/50" id="pricing">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black tracking-tighter text-white mb-4">Choose your package</h2>
            <p className="text-brand-muted font-bold uppercase tracking-widest text-[10px]">Simple upfront pricing. No hidden fees.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <PricingCard 
              tier="Starter"
              price={service.starter.price}
              description={service.starter.description}
              features={service.starter.features}
              onSelect={() => window.location.href = `/shop/brief/${service.id}?tier=Starter`}
            />
            <PricingCard 
              tier="Professional"
              price={service.professional.price}
              description={service.professional.description}
              features={service.professional.features}
              isHighlighted={true}
              onSelect={() => window.location.href = `/shop/brief/${service.id}?tier=Professional`}
            />
            <PricingCard 
              tier="Premium"
              price={service.premium.price}
              description={service.premium.description}
              features={service.premium.features}
              onSelect={() => window.location.href = `/shop/brief/${service.id}?tier=Premium`}
            />
          </div>
        </div>
      </section>

      {/* Process & Details */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Delivery Process */}
            <div>
              <h3 className="text-2xl font-black tracking-tighter text-white mb-10 flex items-center gap-3">
                <CheckCircle2 className="text-brand-violet" />
                The Delivery Flow
              </h3>
              <div className="space-y-6">
                {service.process.map((step, idx) => (
                  <div key={idx} className="flex gap-6 items-start group">
                    <div className="text-sm font-black text-brand-violet py-2 w-8 shrink-0">
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <div className="pb-6 border-b border-brand-card flex-grow group-last:border-0">
                      <p className="text-lg font-bold text-white group-hover:text-brand-violet transition-colors">
                        {step}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div>
              <h3 className="text-2xl font-black tracking-tighter text-white mb-10 flex items-center gap-3">
                <MessageSquare className="text-brand-violet" />
                Service FAQs
              </h3>
              <div className="space-y-4">
                {service.faq.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="rounded-2xl border border-brand-card bg-brand-card/30 overflow-hidden"
                  >
                    <button 
                      className="w-full p-6 text-left flex justify-between items-center transition-colors hover:bg-white/5"
                      onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    >
                      <span className="font-bold text-white pr-8">{item.q}</span>
                      <ChevronDown 
                        size={18} 
                        className={`text-brand-muted transition-transform duration-300 ${activeFaq === idx ? 'rotate-180 text-brand-violet' : ''}`} 
                      />
                    </button>
                    {activeFaq === idx && (
                      <div className="px-6 pb-6 text-brand-muted text-sm leading-relaxed animate-in fade-in slide-in-from-top-1">
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Bottom CTA for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 w-full p-6 bg-brand-dark/90 backdrop-blur-xl border-t border-brand-card z-40">
        <Link 
          href="#pricing"
          className="w-full bg-brand-violet text-white py-4 rounded-xl font-black flex items-center justify-center gap-3"
        >
          View Packages & Pricing
        </Link>
      </div>
    </div>
  );
}
