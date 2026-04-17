"use client";

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, ShoppingBag } from 'lucide-react';

interface BriefFormProps {
  serviceName: string;
  tier: string;
  price: number;
}

export const BriefForm = ({ serviceName, tier, price }: BriefFormProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    businessDescription: '',
    specificRequirements: '',
    preferredColors: '',
    referenceLinks: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className="bg-brand-card/50 border border-brand-violet/30 rounded-[2.5rem] p-12 text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="w-20 h-20 bg-brand-violet/20 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 size={40} className="text-brand-violet" />
        </div>
        <h2 className="text-3xl font-black tracking-tighter text-white mb-4">Brief Submitted!</h2>
        <p className="text-brand-muted font-bold text-lg mb-8 max-w-sm mx-auto">
          We've received your brief for {serviceName}. We'll review it and reach out via WhatsApp/Email to confirm the start.
        </p>
        <div className="p-6 bg-brand-dark rounded-2xl border border-brand-card mb-8">
          <div className="text-[10px] font-black uppercase tracking-widest text-brand-muted mb-2">Order Summary</div>
          <div className="text-xl font-bold text-white">{serviceName} — {tier}</div>
          <div className="text-brand-violet font-black mt-2">₹{price.toLocaleString('en-IN')}</div>
        </div>
        <button 
          onClick={() => window.location.href = '/shop'}
          className="text-white bg-brand-violet px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-brand-violet/90 transition-all"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-brand-card/30 border border-brand-card rounded-[2.5rem] p-8 md:p-12">
      <div className="flex items-center gap-4 mb-12 p-6 bg-brand-dark rounded-2xl border border-brand-card">
        <div className="p-3 bg-brand-violet/10 rounded-xl">
          <ShoppingBag className="text-brand-violet" size={24} />
        </div>
        <div>
          <div className="text-[10px] font-black uppercase tracking-widest text-brand-muted">Selected Package</div>
          <div className="text-lg font-bold text-white">{serviceName} ({tier})</div>
        </div>
        <div className="ml-auto text-right">
          <div className="text-[10px] font-black uppercase tracking-widest text-brand-muted">Price</div>
          <div className="text-lg font-black text-brand-violet">₹{price.toLocaleString('en-IN')}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-brand-muted ml-2">Full Name</label>
          <input 
            required
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="John Doe"
            className="w-full bg-brand-dark border border-brand-card rounded-2xl px-6 py-4 text-white placeholder:text-brand-card focus:outline-none focus:border-brand-violet transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-brand-muted ml-2">Email Address</label>
          <input 
            required
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="john@example.com"
            className="w-full bg-brand-dark border border-brand-card rounded-2xl px-6 py-4 text-white placeholder:text-brand-card focus:outline-none focus:border-brand-violet transition-colors"
          />
        </div>
      </div>

      <div className="space-y-2 mb-8">
        <label className="text-[10px] font-black uppercase tracking-widest text-brand-muted ml-2">WhatsApp Number</label>
        <input 
          required
          type="tel" 
          name="whatsapp"
          value={formData.whatsapp}
          onChange={handleInputChange}
          placeholder="+91 XXXXX XXXXX"
          className="w-full bg-brand-dark border border-brand-card rounded-2xl px-6 py-4 text-white placeholder:text-brand-card focus:outline-none focus:border-brand-violet transition-colors"
        />
      </div>

      <div className="space-y-2 mb-8">
        <label className="text-[10px] font-black uppercase tracking-widest text-brand-muted ml-2">Business / Project Description</label>
        <textarea 
          required
          name="businessDescription"
          value={formData.businessDescription}
          onChange={handleInputChange}
          rows={4}
          placeholder="Tell us about what you do..."
          className="w-full bg-brand-dark border border-brand-card rounded-2xl px-6 py-4 text-white placeholder:text-brand-card focus:outline-none focus:border-brand-violet transition-colors resize-none"
        />
      </div>

      <div className="space-y-2 mb-8">
        <label className="text-[10px] font-black uppercase tracking-widest text-brand-muted ml-2">Specific Requirements / Text Content</label>
        <textarea 
          name="specificRequirements"
          value={formData.specificRequirements}
          onChange={handleInputChange}
          rows={3}
          placeholder="Any specific text or requirements you want us to include?"
          className="w-full bg-brand-dark border border-brand-card rounded-2xl px-6 py-4 text-white placeholder:text-brand-card focus:outline-none focus:border-brand-violet transition-colors resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-brand-muted ml-2">Preferred Colors</label>
          <input 
            type="text" 
            name="preferredColors"
            value={formData.preferredColors}
            onChange={handleInputChange}
            placeholder="e.g. Navy and Gold"
            className="w-full bg-brand-dark border border-brand-card rounded-2xl px-6 py-4 text-white placeholder:text-brand-card focus:outline-none focus:border-brand-violet transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-brand-muted ml-2">Reference Links (Pinterest/Logo)</label>
          <input 
            type="text" 
            name="referenceLinks"
            value={formData.referenceLinks}
            onChange={handleInputChange}
            placeholder="Links to styles you like"
            className="w-full bg-brand-dark border border-brand-card rounded-2xl px-6 py-4 text-white placeholder:text-brand-card focus:outline-none focus:border-brand-violet transition-colors"
          />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10 text-brand-muted text-[10px] font-bold uppercase tracking-wide">
          <AlertCircle size={14} className="shrink-0 mt-0.5" />
          By submitting this brief, you agree that your order will only be processed after payment confirmation. Revisions are restricted based on your selected tier.
        </div>
        <button 
          type="submit"
          className="group flex items-center justify-center gap-3 bg-brand-violet text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-2xl shadow-brand-violet/30 hover:shadow-brand-violet/50 transition-all hover:-translate-y-1"
        >
          Proceed to Order
          <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </form>
  );
};
