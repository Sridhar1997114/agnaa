"use client";

import React, { useState } from 'react';
import { Camera, Home, Building, Leaf, UploadCloud, FileText, Download } from 'lucide-react';
import { Button } from '@/components/Button';
import { Toast } from '@/components/Toast';

export default function DesignStudioPage() {
  const [sqft, setSqft] = useState(1500);
  const [type, setType] = useState('Residential');
  const [toast, setToast] = useState<string | null>(null);

  const rate = type === 'Residential' ? 2500 : 3500;
  const total = sqft * rate;
  const labor = total * 0.25;

  const handleDownload = () => {
    setToast('Design Estimate PDF Generated! (Simulated Download)');
  };

  return (
    <div className="bg-white min-h-screen text-[#1C1C72] pt-24">
      <section className="py-16 md:py-24 text-center px-4 bg-[#F5F5F7] border-b border-gray-200 relative overflow-hidden">
         <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-transparent via-[#7B2DBF]/20 to-transparent"></div>
        <h1 className="text-4xl md:text-8xl font-black mb-6 tracking-tighter text-[#1C1C72]">Design Studio</h1>
        <p className="text-lg md:text-xl text-gray-500 font-bold">Architecture • Interiors • Graphics | Gachibowli Precision</p>
      </section>

      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-black mb-12 md:mb-20 text-center tracking-tight text-[#1C1C72]">Design Excellence</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {t: 'Architectural Design', d: 'Concept to construction docs', i: Home},
              {t: 'Interior Design', d: 'Spaces that breathe life', i: Building},
              {t: '3D Renders', d: 'Visualize before you build', i: Camera},
              {t: 'Landscape Architecture', d: 'Harmonious exterior spaces', i: Leaf},
              {t: 'UI/UX Design', d: 'Digital spatial experiences', i: UploadCloud},
              {t: 'Consultancy', d: 'Expert blueprint analysis', i: FileText},
            ].map((s, idx) => (
              <div key={idx} className="bg-[#F5F5F7] p-8 md:p-10 rounded-3xl border border-gray-100 hover:shadow-[0_15px_40px_rgba(123,45,191,0.12)] hover:border-[#7B2DBF]/40 transition-all duration-500 group">
                <div className="mb-4 text-[#1C1C72] group-hover:text-[#7B2DBF] transition-colors">
                  <s.i size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-[#1C1C72] group-hover:text-[#7B2DBF] transition-colors">{s.t}</h3>
                <p className="text-gray-500 font-medium">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-[#F5F5F7] border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-16 shadow-[0_20px_60px_-15px_rgba(28,28,114,0.05)] border border-gray-200 hover:border-[#7B2DBF]/30 hover:shadow-[0_20px_60px_rgba(123,45,191,0.1)] transition-all duration-700 relative">
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-center tracking-tight text-[#1C1C72]">Precision Calculator</h2>
            <p className="text-center text-gray-500 font-bold mb-10 md:mb-16">Estimate Your Design Cost – Gachibowli 2026 Rates</p>
            
            <div className="space-y-12">
              <div>
                <div className="flex justify-between mb-4">
                  <label className="font-bold text-lg text-[#1C1C72]">Area (Sqft)</label>
                  <span className="text-[#7B2DBF] font-black text-xl">{sqft} sqft</span>
                </div>
                <input 
                  type="range" min="500" max="10000" step="100" 
                  value={sqft} onChange={(e) => setSqft(Number(e.target.value))}
                  className="w-full accent-[#7B2DBF] h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="font-bold text-lg block mb-4 text-[#1C1C72]">Project Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setType('Residential')}
                    className={`py-4 rounded-2xl border-2 font-bold transition-all ${type === 'Residential' ? 'bg-[#1C1C72] border-[#7B2DBF] text-white shadow-[0_0_15px_rgba(123,45,191,0.3)]' : 'bg-transparent border-gray-200 text-gray-500 hover:border-[#7B2DBF]/50 hover:text-[#7B2DBF]'}`}
                  >Residential (₹2,500/sqft)</button>
                  <button 
                    onClick={() => setType('Commercial')}
                    className={`py-4 rounded-2xl border-2 font-bold transition-all ${type === 'Commercial' ? 'bg-[#1C1C72] border-[#7B2DBF] text-white shadow-[0_0_15px_rgba(123,45,191,0.3)]' : 'bg-transparent border-gray-200 text-gray-500 hover:border-[#7B2DBF]/50 hover:text-[#7B2DBF]'}`}
                  >Commercial (₹3,500/sqft)</button>
                </div>
              </div>

              <div className="bg-[#F5F5F7] p-8 rounded-3xl border border-gray-200 space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <span className="text-xl font-bold text-gray-500">Estimated Total</span>
                  <span className="font-black text-4xl text-[#1C1C72]">₹{total.toLocaleString()}</span>
                </div>
                <div className="h-px bg-gray-200 w-full"></div>
                <div className="flex justify-between items-center text-gray-500 font-medium">
                  <span>Labor Component (25%)</span>
                  <span className="text-[#7B2DBF] font-bold">₹{labor.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button onClick={handleDownload} variant="outline" className="flex-1 py-4 text-lg bg-white">
                  <Download size={20}/> Download PDF
                </Button>
                <Button href="/start-project" variant="primary" className="flex-1 py-4 text-lg">Start Project</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {toast && <Toast message={toast} type="success" onClose={() => setToast(null)} />}
    </div>
  );
}
