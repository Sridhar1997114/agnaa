"use client";

import React from 'react';
import { Check, Zap, Star } from 'lucide-react';

export type PricingTier = 'Starter' | 'Professional' | 'Premium';

interface PricingCardProps {
  tier: PricingTier;
  price: number;
  description: string;
  features: string[];
  isHighlighted?: boolean;
  onSelect?: () => void;
}

export const PricingCard = ({
  tier,
  price,
  description,
  features,
  isHighlighted = false,
  onSelect
}: PricingCardProps) => {
  const isProfessional = tier === 'Professional';
  const isPremium = tier === 'Premium';

  return (
    <div 
      className={`relative flex flex-col p-8 rounded-[2rem] transition-all duration-500 border ${
        isHighlighted 
          ? 'bg-brand-card border-brand-violet shadow-2xl shadow-brand-violet/10 scale-105 z-10' 
          : 'bg-brand-card/50 border-brand-card hover:border-brand-muted/30 rotate-0'
      }`}
    >
      {/* Badges */}
      {isProfessional && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-violet text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
          Recommended
        </div>
      )}
      {isPremium && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-brand-dark px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
          Priority
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h3 className="text-brand-muted font-bold uppercase tracking-[0.2em] text-[10px] mb-2">
          {tier}
        </h3>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-white tracking-tighter">₹</span>
          <span className="text-5xl font-black text-white tracking-tighter">
            {price.toLocaleString('en-IN')}
          </span>
        </div>
        <p className="text-brand-muted text-sm mt-4 font-medium leading-relaxed min-h-[40px]">
          {description}
        </p>
      </div>

      {/* Subline Microcopy */}
      {isProfessional && (
        <div className="mb-8 p-3 rounded-xl bg-brand-violet/10 border border-brand-violet/20">
          <p className="text-[11px] font-bold text-brand-violet uppercase tracking-wide flex items-center gap-2">
            <Star size={12} fill="currentColor" />
            Most chosen by serious clients
          </p>
        </div>
      )}
      {isPremium && (
        <div className="mb-8 p-3 rounded-xl bg-white/5 border border-white/10">
          <p className="text-[11px] font-bold text-white uppercase tracking-wide flex items-center gap-2">
            <Zap size={12} fill="currentColor" />
            Deeper polish & faster handling
          </p>
        </div>
      )}

      {/* Features */}
      <ul className="space-y-4 mb-10 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3 group">
            <div className={`mt-1 p-0.5 rounded-full ${isHighlighted ? 'text-brand-violet' : 'text-brand-muted'} group-hover:scale-110 transition-transform`}>
              <Check size={14} strokeWidth={3} />
            </div>
            <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* Button */}
      <button 
        onClick={onSelect}
        className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
          isHighlighted 
            ? 'bg-brand-violet text-white shadow-lg shadow-brand-violet/30 hover:shadow-brand-violet/50 hover:-translate-y-1' 
            : 'bg-white text-brand-dark hover:bg-brand-violet hover:text-white hover:shadow-lg hover:shadow-brand-violet/20 hover:-translate-y-1'
        }`}
      >
        Select {tier}
      </button>

      {/* Footer footer lines */}
      <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest text-center mt-6 opacity-60">
        {tier === 'Starter' && 'Best for simple needs'}
        {tier === 'Professional' && 'Smartest balance of value'}
        {tier === 'Premium' && 'Best for maximum impact'}
      </p>
    </div>
  );
};
