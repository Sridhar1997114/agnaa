"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MapPin, Phone } from 'lucide-react';
import { AgnaaLogo } from './AgnaaLogo';

export const Footer = () => {
  const pathname = usePathname();
  const isPortal = pathname?.startsWith('/app') || pathname?.startsWith('/admin') || pathname?.startsWith('/login') || pathname?.startsWith('/shop');

  if (isPortal) return null;

  return (
    <footer className="bg-[#F5F5F7] border-t border-gray-200 pt-16 md:pt-20 pb-10 text-gray-500 font-medium">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 mb-16">
        <div className="col-span-1 sm:col-span-2 space-y-6">
          <div className="flex items-center mb-6">
            <Link href="/" aria-label="Go to homepage">
              <AgnaaLogo className="w-auto h-8 md:h-10 grayscale hover:grayscale-0 transition-all duration-500" />
            </Link>
          </div>
          <p className="max-w-md text-base md:text-lg font-bold text-[#1C1C72]">Design. Build. Soul. Architecture and execution that outlives generations.</p>
          <div className="flex flex-wrap gap-4 md:gap-6 pt-4 font-black text-xs uppercase tracking-widest">
            {['@agnaadesign', '@agnaasol', '@agnaaarchive'].map(ig => (
              <a key={ig} href="#" className="text-[#1C1C72] hover:text-[#7B2DBF] transition-all">{ig}</a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-[#1C1C72] font-black uppercase tracking-widest text-[10px] mb-6 opacity-50">Explore</h4>
          <ul className="space-y-4 font-bold text-sm">
            <li><Link href="/portfolio" className="hover:text-[#7B2DBF] transition-colors">Portfolio</Link></li>
            <li><Link href="/design-studio" className="hover:text-[#7B2DBF] transition-colors">Design Studio</Link></li>
            <li><Link href="/constructions" className="hover:text-[#7B2DBF] transition-colors">Constructions</Link></li>
            <li><Link href="/foundation" className="hover:text-[#7B2DBF] transition-colors">Foundation</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-[#1C1C72] font-black uppercase tracking-widest text-[10px] mb-6 opacity-50">Contact</h4>
          <ul className="space-y-5 font-bold text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="shrink-0 text-[#7B2DBF] mt-0.5"/> 
              <span className="leading-relaxed">469 TNGOS Colony, Financial District, Gachibowli, Hyderabad</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="shrink-0 text-[#7B2DBF]"/> 
              +91-8826214348
            </li>
            <li className="pt-2">
              <Link href="/calc" className="text-xs font-black uppercase tracking-widest text-[#1C1C72] border-b-2 border-[#1C1C72] pb-1 hover:text-[#7B2DBF] hover:border-[#7B2DBF] transition-all">
                Access Free Calc
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 text-sm border-t border-gray-300 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 font-bold text-gray-400">
        <p>© 2026 AGNAA Architects. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-[#7B2DBF] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#7B2DBF] transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};
