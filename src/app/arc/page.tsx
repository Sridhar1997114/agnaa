"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout, Box, Sparkles, Download, Layers, Grid, ArrowRight, Eye, ShieldCheck, Cpu } from 'lucide-react';
import { TerminalSearch } from '@/components/layout/TerminalSearch';

export default function AgnaaArcPage() {
  const [activeTab, setActiveTab] = useState<'2d' | '3d' | 'specs'>('2d');
  const [leadForm, setLeadForm] = useState({ name: '', phone: '', plotDimensions: '30x50' });

  const handleCustomPlanRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi AGNAA Arc Studio, I tried the Arc Canvas! I want a custom 2D/3D floor plan for dimensions: ${leadForm.plotDimensions}. Name: ${leadForm.name}, Phone: ${leadForm.phone}`;
    const waUrl = `https://wa.me/918826214348?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white font-inter selection:bg-[#7B2DBF] selection:text-white pb-32 relative overflow-hidden">
      
      {/* CAD GRID BACKGROUND */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-[#7B2DBF]/20 to-transparent blur-[140px] pointer-events-none" />

      <div className="fixed top-6 right-8 z-[60]">
        <TerminalSearch />
      </div>

      <div className="relative z-10 pt-28 pb-16 px-4 sm:px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          
          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md mb-6">
              <Layout size={14} className="text-[#7B2DBF]" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">ARC.AGNAA.IN • DESIGN STUDIO CANVAS</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-[-0.04em] mb-4 leading-tight">
              AGNAA <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-purple-500">Arc Editor</span> Workbench
            </h1>
            
            <p className="text-slate-400 text-sm sm:text-base font-medium max-w-2xl mx-auto">
              Interactive 2D & 3D floor plan layout builder for luxury villas, modern apartments, and commercial elevations.
            </p>
          </motion.div>

          {/* ARC CANVAS TOOLBAR & PREVIEW */}
          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-6 backdrop-blur-2xl mb-12 shadow-2xl overflow-hidden">
            
            {/* CANVAS CONTROL BAR */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
              <div className="flex items-center gap-2 bg-black/40 p-1.5 rounded-2xl border border-white/10">
                <button
                  onClick={() => setActiveTab('2d')}
                  className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                    activeTab === '2d' ? 'bg-[#7B2DBF] text-white shadow-lg shadow-[#7B2DBF]/40' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  2D Floor Plan Grid
                </button>
                <button
                  onClick={() => setActiveTab('3d')}
                  className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                    activeTab === '3d' ? 'bg-[#7B2DBF] text-white shadow-lg shadow-[#7B2DBF]/40' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  3D Render Preview
                </button>
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                    activeTab === 'specs' ? 'bg-[#7B2DBF] text-white shadow-lg shadow-[#7B2DBF]/40' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Material Specs
                </button>
              </div>

              <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
                <Cpu size={14} className="text-[#7B2DBF]" />
                <span>AGNAA Render Engine v4.2 • Precision Grid Scale 1:50</span>
              </div>
            </div>

            {/* CANVAS DISPLAY AREA */}
            <div className="relative min-h-[420px] bg-slate-950/80 rounded-2xl border border-white/10 flex items-center justify-center p-8 overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#7B2DBF_1px,transparent_1px)] [background-size:24px_24px]" />
              
              {activeTab === '2d' && (
                <div className="relative z-10 text-center space-y-6 max-w-xl">
                  <div className="w-24 h-24 mx-auto bg-purple-500/10 rounded-3xl border border-purple-500/30 flex items-center justify-center text-[#7B2DBF]">
                    <Grid size={44} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white mb-2">Interactive 2D Blueprint Workbench</h3>
                    <p className="text-slate-400 text-xs font-medium leading-relaxed">
                      Select plot dimensions (30x50, 40x60, 50x80) to load pre-calculated structural layouts optimized for GHMC setbacks and Vastu alignment.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === '3d' && (
                <div className="relative z-10 text-center space-y-6 max-w-xl">
                  <div className="w-24 h-24 mx-auto bg-indigo-500/10 rounded-3xl border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                    <Box size={44} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white mb-2">3D Architectural Visualization</h3>
                    <p className="text-slate-400 text-xs font-medium leading-relaxed">
                      Photorealistic ray-traced elevation renders for luxury G+2 and G+4 villas. Get full DWG & BIM files from AGNAA Design Studio.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="relative z-10 text-center space-y-6 max-w-xl">
                  <div className="w-24 h-24 mx-auto bg-[#7B2DBF]/10 rounded-3xl border border-[#7B2DBF]/30 flex items-center justify-center text-purple-300">
                    <Layers size={44} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white mb-2">Structural & Material Specification Sheets</h3>
                    <p className="text-slate-400 text-xs font-medium leading-relaxed">
                      Fe550D TMT Rebar grade, M25 Cement Concrete Mix, 150mm AAC Blocks, and Italian Marble flooring specifications.
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* ARC CANVAS LEAD MAGNET FORM */}
          <div className="bg-gradient-to-r from-purple-950/60 via-slate-900 to-indigo-950/60 border border-purple-500/30 rounded-[2.5rem] p-10 backdrop-blur-2xl">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-black uppercase tracking-widest mb-3 border border-purple-500/30">
                  <Sparkles size={12} /> Direct Studio CAD Output
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  Request Custom 2D/3D Architectural Blueprint (PDF + DWG)
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm font-medium mt-2">
                  Our principal architects will generate tailored 2D floor plans & 3D elevations based on your plot dimensions.
                </p>
              </div>

              <form onSubmit={handleCustomPlanRequest} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Full Name</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="e.g. Vikram Rao"
                    value={leadForm.name}
                    onChange={e => setLeadForm({...leadForm, name: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-sm font-bold text-white outline-none focus:border-[#7B2DBF] transition-all placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">WhatsApp Phone Number</label>
                  <input 
                    required 
                    type="tel" 
                    placeholder="+91 98765 43210"
                    value={leadForm.phone}
                    onChange={e => setLeadForm({...leadForm, phone: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-sm font-bold text-white outline-none focus:border-[#7B2DBF] transition-all placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Plot Dimensions</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="e.g. 40ft x 60ft"
                    value={leadForm.plotDimensions}
                    onChange={e => setLeadForm({...leadForm, plotDimensions: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-sm font-bold text-white outline-none focus:border-[#7B2DBF] transition-all placeholder:text-slate-500"
                  />
                </div>

                <div className="sm:col-span-3 pt-2">
                  <button 
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#7B2DBF] to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>Receive Custom 2D/3D Blueprint package on WhatsApp</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
