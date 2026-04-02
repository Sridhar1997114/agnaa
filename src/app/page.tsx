"use client";

import React, { useState, useEffect } from 'react';
import { Camera, Hammer, TreePine, ArrowRight } from 'lucide-react';
import { Button } from '@/components/Button';
import Link from 'next/link';

export default function HomePage() {
  const [count, setCount] = useState({ fixes: 0, trees: 0, projects: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => ({
        fixes: prev.fixes < 127 ? prev.fixes + 1 : 127,
        trees: prev.trees < 50 ? prev.trees + 1 : 50,
        projects: prev.projects < 100 ? prev.projects + 1 : 100
      }));
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white min-h-screen text-[#1C1C72]">
      {/* HERO */}
      <section className="relative min-h-[80vh] md:h-screen flex items-center justify-center overflow-hidden py-20">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000" alt="Skyline" className="w-full h-full object-cover opacity-10 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/80 to-white" />
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-br from-[#1C1C72] via-[#1C1C72] to-[#7B2DBF] leading-[1.1] md:leading-none">
            Design. Build. Soul.
          </h1>
          <p className="text-lg md:text-2xl text-gray-400 mb-10 md:mb-12 max-w-2xl mx-auto font-bold tracking-wide px-4">
            Gachibowli Architect | {count.fixes} Fixes | {count.trees} Trees | {count.projects}+ Projects
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-6">
            <Button href="/portfolio" variant="outline" className="text-base md:text-lg px-8 md:px-10 py-4">View Portfolio</Button>
            <Button href="/start-project" variant="primary" className="text-base md:text-lg px-8 md:px-10 py-4 shadow-[0_10px_30px_rgba(28,28,114,0.15)]">Start Project</Button>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="py-10 md:py-16 bg-[#F5F5F7] border-y border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#7B2DBF]/10 to-transparent"></div>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
            <div className="py-6 sm:py-4">
              <div className="text-4xl md:text-6xl font-black text-[#1C1C72] mb-2 tracking-tighter">{count.fixes}</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-black">Justice Fixes</div>
            </div>
            <div className="py-6 sm:py-4">
              <div className="text-4xl md:text-6xl font-black text-[#1C1C72] mb-2 tracking-tighter">{count.trees}</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-black">Trees Planted</div>
            </div>
            <div className="py-6 sm:py-4">
              <div className="text-4xl md:text-6xl font-black text-[#1C1C72] mb-2 tracking-tighter">{count.projects}+</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-black">Projects Delivered</div>
            </div>
          </div>
        </div>
      </section>

      {/* ECOSYSTEM */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-black mb-16 md:mb-20 text-center tracking-tight text-[#1C1C72]">The AGNAA Ecosystem</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <Link href="/design-studio" className="group cursor-pointer bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgba(28,28,114,0.03)] hover:shadow-[0_15px_40px_rgba(123,45,191,0.15)] hover:border-[#7B2DBF]/50 transition-all duration-500 hover:-translate-y-2">
              <div className="bg-[#F5F5F7] w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 md:mb-8 text-[#1C1C72] group-hover:bg-gradient-to-br group-hover:from-[#1C1C72] group-hover:to-[#7B2DBF] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(123,45,191,0.4)] group-hover:scale-110 transition-all duration-500">
                <Camera className="w-6 h-6 md:w-7 md:h-7" strokeWidth={2.5} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-[#1C1C72] tracking-tight group-hover:text-[#7B2DBF] transition-colors">Design Studio</h3>
              <p className="text-sm md:text-base text-gray-400 mb-8 leading-relaxed font-medium mt-auto group-hover:text-gray-500 transition-colors">Ideas → Renders → Reality. Turning visionary concepts into actionable construction documents.</p>
              <span className="text-xs md:text-sm font-black uppercase tracking-widest text-[#1C1C72] flex items-center gap-2 group-hover:text-[#7B2DBF] transition-colors">Explore Studio <ArrowRight size={14}/></span>
            </Link>
            
            <Link href="/constructions" className="group cursor-pointer bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgba(28,28,114,0.03)] hover:shadow-[0_15px_40px_rgba(123,45,191,0.15)] hover:border-[#7B2DBF]/50 transition-all duration-500 hover:-translate-y-2">
              <div className="bg-[#F5F5F7] w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 md:mb-8 text-[#1C1C72] group-hover:bg-gradient-to-br group-hover:from-[#1C1C72] group-hover:to-[#7B2DBF] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(123,45,191,0.4)] group-hover:scale-110 transition-all duration-500">
                <Hammer className="w-6 h-6 md:w-7 md:h-7" strokeWidth={2.5} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-[#1C1C72] tracking-tight group-hover:text-[#7B2DBF] transition-colors">Constructions</h3>
              <p className="text-sm md:text-base text-gray-400 mb-8 leading-relaxed font-medium mt-auto group-hover:text-gray-500 transition-colors">Execution You Trust. Full project management, verified manpower, and elite materials.</p>
              <span className="text-xs md:text-sm font-black uppercase tracking-widest text-[#1C1C72] flex items-center gap-2 group-hover:text-[#7B2DBF] transition-colors">Build with Us <ArrowRight size={14}/></span>
            </Link>

            <Link href="/foundation" className="group cursor-pointer bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgba(28,28,114,0.03)] hover:shadow-[0_15px_40px_rgba(123,45,191,0.15)] hover:border-[#7B2DBF]/50 transition-all duration-500 hover:-translate-y-2">
              <div className="bg-[#F5F5F7] w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 md:mb-8 text-[#1C1C72] group-hover:bg-gradient-to-br group-hover:from-[#1C1C72] group-hover:to-[#7B2DBF] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(123,45,191,0.4)] group-hover:scale-110 transition-all duration-500">
                <TreePine className="w-6 h-6 md:w-7 md:h-7" strokeWidth={2.5} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-[#1C1C72] tracking-tight group-hover:text-[#7B2DBF] transition-colors">Foundation</h3>
              <p className="text-sm md:text-base text-gray-400 mb-8 leading-relaxed font-medium mt-auto group-hover:text-gray-500 transition-colors">Voice. Fix. Plant. Use AI to fix city infrastructure and rent trees for a greener tomorrow.</p>
              <span className="text-xs md:text-sm font-black uppercase tracking-widest text-[#1C1C72] flex items-center gap-2 group-hover:text-[#7B2DBF] transition-colors">Join Movement <ArrowRight size={14}/></span>
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 md:py-32 bg-[#F5F5F7] relative border-t border-gray-100">
        <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-transparent via-[#7B2DBF]/20 to-transparent"></div>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-6xl font-black mb-10 tracking-tight text-[#1C1C72] leading-tight">Ready for Your AGNAA Journey?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-6">
            <Button href="/start-project" variant="primary" className="text-base md:text-lg px-10 md:px-12 py-4 shadow-lg shadow-purple-500/20">Start Project</Button>
            <Button href="/foundation" variant="outline" className="text-base md:text-lg px-10 md:px-12 py-4">Rent a Tree</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
