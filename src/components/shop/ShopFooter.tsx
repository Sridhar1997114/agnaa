"use client";

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Instagram, Twitter, Linkedin } from 'lucide-react';
import { AgnaaLogo } from '../AgnaaLogo';

export const ShopFooter = () => {
  return (
    <footer className="bg-brand-dark/50 border-t border-brand-card pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/shop" className="flex items-center gap-4 mb-6 group">
              <AgnaaLogo className="w-auto h-8 grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500" />
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold tracking-tight text-white leading-none">
                  AGNAA Shop
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-brand-muted font-bold mt-1">
                  by AGNAA Design Studio
                </span>
              </div>
            </Link>
            <p className="text-brand-muted max-w-sm leading-relaxed mb-8">
              Curated fast-turn design services for brands, founders, and meaningful family moments. Delivered with structure, clarity, and premium finish.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-brand-card rounded-lg text-brand-muted hover:text-white hover:bg-brand-violet transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 bg-brand-card rounded-lg text-brand-muted hover:text-white hover:bg-brand-violet transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 bg-brand-card rounded-lg text-brand-muted hover:text-white hover:bg-brand-violet transition-all">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Navigation</h4>
            <ul className="space-y-4">
              <li><Link href="/shop" className="text-brand-muted hover:text-white transition-colors text-sm font-medium">Home</Link></li>
              <li><Link href="/shop/how-it-works" className="text-brand-muted hover:text-white transition-colors text-sm font-medium">How It Works</Link></li>
              <li><Link href="/shop/faq" className="text-brand-muted hover:text-white transition-colors text-sm font-medium">FAQs</Link></li>
              <li><Link href="/shop/policies" className="text-brand-muted hover:text-white transition-colors text-sm font-medium">Policies</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-brand-muted text-sm leading-relaxed">
                <MapPin size={16} className="text-brand-violet shrink-0 mt-0.5" />
                469 TNGOS Colony, Gachibowli, Hyderabad
              </li>
              <li className="flex items-center gap-3 text-brand-muted text-sm">
                <Phone size={16} className="text-brand-violet shrink-0" />
                +91-8826214348
              </li>
              <li className="flex items-center gap-3 text-brand-muted text-sm">
                <Mail size={16} className="text-brand-violet shrink-0" />
                studio@agnaa.in
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-card pt-8 flex flex-col md:row justify-between items-center gap-4">
          <p className="text-brand-muted text-[10px] font-bold uppercase tracking-widest">
            © 2026 AGNAA Design Studio. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link href="/shop/policies" className="text-brand-muted hover:text-white text-[10px] font-bold uppercase tracking-widest">Privacy Policy</Link>
            <Link href="/shop/policies" className="text-brand-muted hover:text-white text-[10px] font-bold uppercase tracking-widest">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
