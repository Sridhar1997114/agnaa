import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, ShieldCheck, Clock, Zap, FileText } from 'lucide-react';
import { Button } from '@/components/Button';

export default function ShopHomePage() {
  const trustPoints = [
    { icon: <ShieldCheck size={20} />, text: 'Fixed scope' },
    { icon: <Zap size={20} />, text: 'Prepaid only' },
    { icon: <FileText size={20} />, text: 'Structured revisions' },
    { icon: <Clock size={20} />, text: 'Fast delivery' },
  ];

  const categories = [
    {
      title: 'Business + Digital Core',
      description: 'Growth-focused design for brands and founders.',
      services: [
        { name: 'Logo Starter Pack', price: '₹8,000+', href: '/shop/services/logo-starter-pack' },
        { name: 'Business Card + Stationery', price: '₹2,000+', href: '/shop/services/business-card' },
        { name: 'Social Media Template Pack', price: '₹4,000+', href: '/shop/services/social-templates' },
        { name: 'Company Profile / Brochure', price: '₹8,000+', href: '/shop/services/brochure' },
        { name: 'Presentation Deck Design', price: '₹8,000+', href: '/shop/services/presentation-deck' },
        { name: 'Landing Page Design', price: '₹16,000+', href: '/shop/services/landing-page' },
      ]
    },
    {
      title: 'Emotional + Event Edge',
      description: 'Beautifully crafted designs for life\'s big moments.',
      services: [
        { name: 'Wedding Invitation Design', price: '₹2,000+', href: '/shop/services/wedding-invite' },
        { name: 'Memorial Photo Restoration', price: '₹1,200+', href: '/shop/services/photo-restoration' },
      ]
    }
  ];

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-violet/10 blur-[120px] rounded-full -mr-64 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-navy/10 blur-[100px] rounded-full -ml-48 -mb-32"></div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-brand-card border border-brand-violet/20 mb-8 animate-in fade-in slide-in-from-top-2">
            <span className="flex h-2 w-2 rounded-full bg-brand-violet animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-violet">
              Phase 1 Launch • 8 Services Live
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 max-w-5xl mx-auto leading-[0.9] text-white animate-in fade-in delay-100">
            Design services that are <span className="text-brand-violet">easy to buy</span> and worth paying for.
          </h1>

          <p className="text-lg md:text-xl text-brand-muted max-w-3xl mx-auto mb-12 font-medium leading-relaxed animate-in fade-in delay-200">
            Curated fast-turn design for brands, founders, events, and meaningful family moments — delivered with structure, clarity, and premium finish.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20 animate-in fade-in delay-300">
            <Link 
              href="#services"
              className="group flex items-center gap-3 bg-brand-violet text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-2xl shadow-brand-violet/30 hover:shadow-brand-violet/50 transition-all hover:-translate-y-1"
            >
              Order a Service
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/shop/how-it-works"
              className="font-black uppercase tracking-widest text-sm text-white hover:text-brand-violet transition-colors flex items-center gap-2"
            >
              Explore Packages
            </Link>
          </div>

          {/* Trust Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-5xl mx-auto p-4 rounded-3xl bg-brand-card/30 backdrop-blur-sm border border-brand-card animate-in fade-in delay-400">
            {trustPoints.map((point, index) => (
              <div key={index} className="flex items-center gap-3 justify-center md:justify-start px-4 py-3">
                <div className="text-brand-violet bg-brand-violet/10 p-2 rounded-lg">
                  {point.icon}
                </div>
                <span className="text-[11px] font-black uppercase tracking-widest text-white">
                  {point.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="container mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-6 leading-none">
              The Service Stack
            </h2>
            <p className="text-brand-muted font-bold text-lg mb-0">
              Select a service to see tiers and project details.
            </p>
          </div>
          <div className="hidden md:block h-px flex-grow mx-12 bg-brand-card mb-4"></div>
        </div>

        <div className="grid grid-cols-1 gap-20">
          {categories.map((category) => (
            <div key={category.title}>
              <div className="mb-10">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-violet mb-4">
                  {category.title}
                </h3>
                <p className="text-2xl font-bold text-white tracking-tight">
                  {category.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.services.map((service) => (
                  <Link 
                    key={service.name} 
                    href={service.href}
                    className="group relative flex flex-col p-8 rounded-[2rem] bg-brand-card/50 border border-brand-card hover:border-brand-violet/50 transition-all duration-500 overflow-hidden"
                  >
                    {/* Hover effect background */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-violet/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="flex justify-between items-start mb-8">
                      <div className="p-3 bg-brand-dark rounded-2xl group-hover:bg-brand-violet transition-colors">
                        <ShoppingBag className="text-brand-muted group-hover:text-white transition-colors" size={24} />
                      </div>
                      <span className="text-xs font-black uppercase tracking-widest text-brand-muted bg-brand-dark px-3 py-1.5 rounded-full border border-brand-card">
                        Starts {service.price}
                      </span>
                    </div>

                    <h4 className="text-2xl font-bold text-white tracking-tight mb-4 group-hover:text-brand-violet transition-colors">
                      {service.name}
                    </h4>
                    
                    <div className="mt-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand-muted transition-all">
                      VIEW PACKAGES
                      <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Section */}
      <section className="bg-brand-card/30 py-32 border-y border-brand-card">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-8 leading-none">
                Why AGNAA Shop <br /><span className="text-brand-muted">feels different</span>
              </h2>
              <ul className="space-y-8">
                {[
                  'Clear packages, not vague quoting.',
                  'Fast turnaround without sloppy output.',
                  'Better presentation than cheap design sellers.',
                  'Stronger structure than typical freelancers.',
                  'Backed by AGNAA\'s studio-grade design discipline.'
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4 group">
                    <div className="w-6 h-6 rounded-full bg-brand-violet/20 flex items-center justify-center shrink-0 group-hover:bg-brand-violet transition-colors">
                      <Check size={14} className="text-brand-violet group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-lg font-bold text-white/90 group-hover:text-white transition-colors">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <div className="aspect-square bg-brand-card rounded-3xl border border-brand-violet/20 flex items-center justify-center p-8 text-center flex-col gap-4 group hover:scale-105 transition-transform">
                <div className="text-4xl font-black text-white">4:7:11</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-brand-muted">Pricing Logic</div>
              </div>
              <div className="aspect-square bg-brand-dark rounded-3xl border border-brand-card flex items-center justify-center p-8 text-center flex-col gap-4 group hover:scale-105 transition-transform mt-12">
                <div className="text-4xl font-black text-brand-violet">10/10</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-brand-muted">Model Promise</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 bg-brand-dark">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-6">
              The 4-Step Process
            </h2>
            <p className="text-brand-muted font-bold text-lg">
              Simple, fast, and controlled delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { num: '01', title: 'Choose your service', desc: 'Browse our curated stack' },
              { num: '02', title: 'Select your package', desc: 'Starter, Professional, or Premium' },
              { num: '03', title: 'Submit the brief', desc: 'Complete our structured form' },
              { num: '04', title: 'Receive polished delivery', desc: 'Faster than you expect' }
            ].map((step, idx) => (
              <div key={idx} className="relative p-8 rounded-3xl bg-brand-card/50 border border-brand-card group hover:border-brand-violet transition-colors">
                <div className="text-5xl font-black text-brand-violet opacity-20 mb-6 group-hover:opacity-100 transition-opacity">
                  {step.num}
                </div>
                <h4 className="text-xl font-black text-white mb-4 leading-tight">
                  {step.title}
                </h4>
                <p className="text-brand-muted text-sm font-bold">
                  {step.desc}
                </p>
                {idx < 3 && (
                  <ArrowRight className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 text-brand-card z-0" size={32} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-6 py-20 pb-40">
        <div className="bg-gradient-to-br from-brand-card to-brand-dark p-12 md:p-24 rounded-[3rem] border border-brand-card text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-brand-violet/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-8 max-w-3xl mx-auto leading-none">
            Start with one clear service. <br /><span className="text-brand-muted">Upgrade later only if needed.</span>
          </h2>
          <p className="text-lg md:text-xl text-brand-muted max-w-2xl mx-auto mb-12 font-bold leading-relaxed">
            The system is built to make buying design simple, fast, and controlled.
          </p>
          <Link 
            href="#services"
            className="inline-flex items-center gap-4 bg-white text-brand-dark px-12 py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-brand-violet hover:text-white transition-all shadow-2xl hover:scale-105"
          >
            ORDER NOW
          </Link>
        </div>
      </section>
    </div>
  );
}
