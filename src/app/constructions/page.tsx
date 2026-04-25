"use client";

import React, { useState } from 'react';
import { CheckCircle, Download } from 'lucide-react';
import { Button } from '@/components/Button';
import { Toast } from '@/components/Toast';
import Image from 'next/image';

export default function ConstructionsPage() {
  const [sqft, setSqft] = useState(2000);
  const [days, setDays] = useState(120);
  const [toast, setToast] = useState<string | null>(null);

  const masons = Math.ceil((sqft / 40) / (days / 30));
  const helpers = masons * 2;
  const masonCost = masons * 1000 * days;
  const helperCost = helpers * 600 * days;
  const totalLabor = masonCost + helperCost;

  return (
    <div className="bg-white min-h-screen text-[#1C1C72] pt-24">
      <section className="py-16 md:py-24 text-center px-4 bg-[#F5F5F7] border-b border-gray-200 relative overflow-hidden">
        <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-transparent via-[#7B2DBF]/20 to-transparent"></div>
        <h1 className="text-4xl md:text-8xl font-black mb-6 tracking-tighter text-[#1C1C72]">Constructions</h1>
        <p className="text-lg md:text-xl text-gray-500 font-bold">Full Management | Materials | Manpower | Gachibowli Precision</p>
      </section>

      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="space-y-8 md:space-y-12">
              <h2 className="text-3xl md:text-5xl font-black mb-8 md:mb-12 tracking-tight">Flawless Execution</h2>
              {[
                { t: 'Project Management', d: 'Site supervision to handover.' },
                { t: 'Elite Materials', d: 'Quality supply chain without markups.' },
                { t: 'Verified Manpower', d: 'AGNAA Pros: Top-tier skilled labor.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start group">
                  <div className="bg-[#F5F5F7] text-[#7B2DBF] p-4 rounded-2xl border border-gray-200 group-hover:border-[#7B2DBF]/50 group-hover:shadow-[0_0_15px_rgba(123,45,191,0.2)] transition-all"><CheckCircle size={28} strokeWidth={2.5}/></div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-[#1C1C72]">{item.t}</h3>
                    <p className="text-gray-500 text-lg font-medium">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex-1 relative group">
              <div className="absolute -inset-6 bg-[#7B2DBF]/10 blur-[80px] rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="relative aspect-square rounded-[3.5rem] overflow-hidden border border-gray-100 shadow-2xl transition-all duration-1000 group-hover:scale-[1.02] group-hover:shadow-[0_40px_80px_-20px_rgba(123,45,191,0.2)]">
                <Image 
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200" 
                  alt="Construction excellence" 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#1C1C72]/20 via-transparent to-transparent" />
              </div>
              <div className="mt-8 md:mt-0 md:absolute md:-bottom-8 md:-left-8 bg-white border border-gray-200 p-6 md:p-8 rounded-3xl shadow-xl group-hover:border-[#7B2DBF]/30 transition-all text-center md:text-left inline-block z-10">
                <div className="text-4xl md:text-5xl font-black text-[#7B2DBF] mb-1">100%</div>
                <div className="text-xs font-bold text-[#1C1C72] uppercase tracking-widest">Safety Record</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-[#F5F5F7] border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-5xl font-black mb-12 md:mb-16 text-center tracking-tight text-[#1C1C72]">Manpower Calculator</h2>
          <div className="bg-white p-6 md:p-16 rounded-[2rem] md:rounded-[3rem] border border-gray-200 shadow-[0_20px_60px_-15px_rgba(28,28,114,0.05)] hover:border-[#7B2DBF]/30 hover:shadow-[0_20px_60px_rgba(123,45,191,0.1)] transition-all duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
              <div className="space-y-12">
                <div>
                  <div className="flex justify-between mb-4">
                    <label className="font-bold text-lg text-[#1C1C72]">Project Area</label>
                    <span className="font-black text-xl text-[#7B2DBF]">{sqft} sqft</span>
                  </div>
                  <input type="range" min="500" max="50000" step="500" value={sqft} onChange={(e) => setSqft(Number(e.target.value))} className="w-full accent-[#7B2DBF] h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                </div>
                <div>
                  <div className="flex justify-between mb-4">
                    <label className="font-bold text-lg text-[#1C1C72]">Estimated Duration</label>
                    <span className="font-black text-xl text-[#7B2DBF]">{days} Days</span>
                  </div>
                  <input type="range" min="30" max="365" step="15" value={days} onChange={(e) => setDays(Number(e.target.value))} className="w-full accent-[#7B2DBF] h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                </div>
              </div>
              
              <div className="bg-[#F5F5F7] p-8 rounded-3xl border border-gray-200 flex flex-col justify-center">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-8 border-b border-gray-300 pb-4">Estimated Requirements</h3>
                <div className="space-y-6 text-lg font-medium">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Masons Needed:</span>
                    <span className="font-bold text-[#1C1C72] text-xl">{masons} <span className="text-sm text-gray-400 font-normal ml-2">(₹1k/day)</span></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Helpers Needed:</span>
                    <span className="font-bold text-[#1C1C72] text-xl">{helpers} <span className="text-sm text-gray-400 font-normal ml-2">(₹600/day)</span></span>
                  </div>
                  <div className="pt-6 border-t border-gray-300 flex justify-between items-center mt-auto">
                    <span className="text-gray-600 font-bold">Total Labor:</span>
                    <span className="font-black text-4xl text-[#1C1C72]">₹{(totalLabor / 100000).toFixed(2)}L</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => setToast('Manpower Plan Downloaded!')} variant="outline" className="py-4 px-10 text-lg bg-white"><Download size={20}/> Download Plan</Button>
              <Button href="/start-project" variant="primary" className="py-4 px-10 text-lg">Get Formal Quote</Button>
            </div>
          </div>
        </div>
      </section>
      {toast && <Toast message={toast} type="success" onClose={() => setToast(null)} />}
    </div>
  );
}
