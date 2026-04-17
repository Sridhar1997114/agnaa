import React from 'react';
import { ArrowLeft, Clock, Zap, ShieldCheck, CreditCard, MessageSquare, Briefcase } from 'lucide-react';
import Link from 'next/link';

export default function HowItWorksPage() {
  const steps = [
    {
      icon: <Briefcase className="text-brand-violet" size={32} />,
      title: 'Choose Service & Tier',
      description: 'Select from our 8 premium design services. Choose the tier (Starter, Professional, or Premium) that best fits your scale and requirements.'
    },
    {
      icon: <MessageSquare className="text-brand-violet" size={32} />,
      title: 'Submit the Brief',
      description: 'Complete our structured brief form. Provide your business details, preferences, and any specific requirements. This helps us start with precision.'
    },
    {
      icon: <CreditCard className="text-brand-violet" size={32} />,
      title: 'Confirm Payment',
      description: 'Once submitted, we verify the brief and send you a payment link. All shop orders are prepaid to ensure fast and committed delivery.'
    },
    {
      icon: <Zap className="text-brand-violet" size={32} />,
      title: 'Receive & Refine',
      description: 'We deliver your first concepts within the specified timeframe. Depending on your tier, we refine the design based on your feedback.'
    },
    {
      icon: <ShieldCheck className="text-brand-violet" size={32} />,
      title: 'Final Handoff',
      description: 'Receive your high-resolution files, source documents, and usage guides. Your project is backed by AGNAA Studio\'s quality guarantee.'
    }
  ];

  return (
    <div className="pb-32">
      <section className="pt-24 pb-20 border-b border-brand-card">
        <div className="container mx-auto px-6">
          <Link href="/shop" className="text-brand-muted hover:text-white transition-colors mb-12 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
            <ArrowLeft size={14} /> Back to Shop
          </Link>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-8">
            The AGNAA <br /><span className="text-brand-violet">Shop Model</span>
          </h1>
          <p className="text-xl text-brand-muted max-w-2xl font-bold leading-relaxed">
            We've removed the overhead of traditional design quoting. Buy design like you buy premium gear: choose, pay, receive.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="space-y-12">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col md:flex-row gap-12 p-10 rounded-[2.5rem] bg-brand-card/30 border border-brand-card group hover:border-brand-violet transition-all duration-500">
                <div className="bg-brand-dark p-6 rounded-3xl group-hover:bg-brand-violet/10 transition-colors shrink-0 flex items-center justify-center w-24 h-24">
                  {step.icon}
                </div>
                <div>
                  <div className="text-brand-violet font-black text-xs uppercase tracking-[0.3em] mb-4">Step 0{idx + 1}</div>
                  <h3 className="text-2xl font-black text-white mb-6 tracking-tight">{step.title}</h3>
                  <p className="text-lg text-brand-muted leading-relaxed font-semibold">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Philosophy */}
      <section className="py-32 bg-brand-card/20 border-y border-brand-card">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-4xl font-black tracking-tighter text-white mb-10">Our Pricing Philosophy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="p-8 rounded-3xl bg-brand-dark border border-brand-card">
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-4">Transparent Value</h4>
              <p className="text-brand-muted text-sm leading-relaxed font-bold">You pay for expertise and execution, not meetings and overhead. Our 3-tier system makes it easy to choose the level of polish you actually need.</p>
            </div>
            <div className="p-8 rounded-3xl bg-brand-dark border border-brand-card">
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-4">Architectural Logic</h4>
              <p className="text-brand-muted text-sm leading-relaxed font-bold">We apply the same design rigour to a logo as we do to a building. Every package follows a grid-level structure for timeless results.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-32 pb-40 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-10">Ready to start?</h2>
          <Link href="/shop#services" className="inline-flex items-center gap-4 bg-brand-violet text-white px-12 py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:scale-105 transition-all shadow-2xl">
            Choose a Service
          </Link>
        </div>
      </section>
    </div>
  );
}
