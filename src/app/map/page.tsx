"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Compass, Search, Layers, ShieldCheck, Sparkles, ArrowRight, Download, Building2 } from 'lucide-react';
import { TerminalSearch } from '@/components/layout/TerminalSearch';
import geoData from '@/data/geo_architectural_database.json';

const HYDERABAD_ZONES = [
  { id: 'gachibowli', name: 'Gachibowli / Financial Dist', fsiMax: '2.50', roadAvg: '60 - 100 ft', zone: 'High-Density Commercial & Luxury Residential' },
  { id: 'kokapet', name: 'Kokapet Neopolis', fsiMax: 'Unlimited (Special SEZ/High-rise)', roadAvg: '100 - 150 ft', zone: 'Ultra-Luxury High-Rise & Villa Enclaves' },
  { id: 'jubilee', name: 'Jubilee Hills / Banjara Hills', fsiMax: '1.75 - 2.00', roadAvg: '40 - 60 ft', zone: 'Low-Density Premium Luxury Residences' },
  { id: 'tellapur', name: 'Tellapur & Kollur', fsiMax: '2.25', roadAvg: '60 - 80 ft', zone: 'Gated Villa Communities & Mixed Development' }
];

export default function AgnaaMapPage() {
  const [selectedZone, setSelectedZone] = useState(HYDERABAD_ZONES[0]);
  const [plotCoordinates, setPlotCoordinates] = useState('');
  const [leadForm, setLeadForm] = useState({ name: '', phone: '', location: 'Gachibowli' });
  const [submitted, setSubmitted] = useState(false);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const text = `Hi AGNAA GEO-Map Team, I want GHMC/HMDA Zoning Feasibility Report for my plot. Name: ${leadForm.name}, Phone: ${leadForm.phone}, Location: ${leadForm.location}, Plot Details: ${plotCoordinates}`;
    const waUrl = `https://wa.me/918826214348?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-inter selection:bg-[#7B2DBF] selection:text-white pb-32 relative overflow-hidden">
      
      {/* MAP GRID AMBIENT BACKGROUND */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#7B2DBF 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute -top-[20%] -right-[15%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-[#7B2DBF]/25 to-transparent blur-[160px] pointer-events-none" />

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
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md mb-6">
              <Compass size={14} className="text-[#A5B4FC]" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#A5B4FC]">MAP.AGNAA.IN • GEO-GIS ZONING ENGINE</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-[-0.04em] mb-4 leading-tight">
              Hyderabad Architectural <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-purple-500">GeoGIS Map</span>
            </h1>
            
            <p className="text-slate-400 text-sm sm:text-base font-medium max-w-2xl mx-auto">
              Real-time HMDA 2031 & GHMC zoning rules, road-width FSI calculators, plot coordinate feasibility & architectural theory database.
            </p>
          </motion.div>

          {/* MAIN MAP INTERACTIVE DASHBOARD */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            
            {/* LEFT: HYDERABAD ZONING INTELLIGENCE */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <MapPin className="text-[#7B2DBF]" size={24} />
                    <h2 className="text-2xl font-black tracking-tight">Select Zone / Region</h2>
                  </div>
                  <span className="px-3 py-1 bg-[#7B2DBF]/20 text-[#A5B4FC] rounded-full text-xs font-bold border border-[#7B2DBF]/30">
                    HMDA Master Plan 2031
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {HYDERABAD_ZONES.map(z => (
                    <button
                      key={z.id}
                      onClick={() => setSelectedZone(z)}
                      className={`p-5 rounded-2xl text-left transition-all border ${
                        selectedZone.id === z.id 
                          ? 'bg-gradient-to-br from-[#7B2DBF]/30 to-purple-900/40 border-[#7B2DBF] text-white shadow-lg shadow-[#7B2DBF]/20' 
                          : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'
                      }`}
                    >
                      <div className="text-xs font-black uppercase tracking-wider text-[#A5B4FC] mb-1">{z.zone}</div>
                      <div className="text-lg font-bold">{z.name}</div>
                      <div className="mt-3 flex items-center justify-between text-xs text-slate-400 font-medium">
                        <span>Max FSI: <strong className="text-white">{z.fsiMax}</strong></span>
                        <span>Road: <strong className="text-white">{z.roadAvg}</strong></span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* SELECTED ZONE DETAILS CARD */}
                <div className="bg-gradient-to-r from-purple-950/40 to-slate-900/60 p-6 rounded-2xl border border-purple-500/20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <Building2 size={20} className="text-[#A5B4FC]" /> {selectedZone.name} Building Norms
                    </h3>
                    <span className="text-xs font-black uppercase text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                      Verified GHMC 2026
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                      <div className="text-slate-400 font-semibold mb-1">Permissible Max Height</div>
                      <div className="text-base font-black text-white">Stilt + 5 to High-Rise</div>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                      <div className="text-slate-400 font-semibold mb-1">Mandatory Setbacks</div>
                      <div className="text-base font-black text-white">3.0m - 6.0m All Sides</div>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                      <div className="text-slate-400 font-semibold mb-1">Commercial Coverage</div>
                      <div className="text-base font-black text-white">Up to 60% Coverage</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* GEO ARCHITECTURAL LITERATURE ENTITIES */}
              <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-xl space-y-6">
                <div className="flex items-center gap-3">
                  <Layers className="text-[#A5B4FC]" size={24} />
                  <h2 className="text-2xl font-black tracking-tight">Geo-Architectural Knowledge Citation Graph</h2>
                </div>
                <div className="space-y-4">
                  {geoData.entities.slice(0, 3).map(ent => (
                    <div key={ent.id} className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all">
                      <div className="flex items-center justify-between text-xs font-bold text-[#A5B4FC] mb-1">
                        <span>{ent.concept} • {ent.author}</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300">{ent.category}</span>
                      </div>
                      <p className="text-xs text-slate-300 font-medium leading-relaxed mt-2">{ent.definition}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: HIGH-CONVERTING PLOT FEASIBILITY LEAD MAGNET */}
            <div className="bg-gradient-to-b from-[#7B2DBF]/20 via-purple-950/40 to-slate-950 border border-purple-500/30 rounded-[2.5rem] p-8 backdrop-blur-2xl flex flex-col justify-between shadow-2xl">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-black uppercase tracking-widest mb-4 border border-purple-500/30">
                  <Sparkles size={12} /> Instant Plot Feasibility
                </div>

                <h3 className="text-2xl font-black text-white mb-2 leading-tight">
                  Get Official Stamped GHMC Zoning Report
                </h3>
                
                <p className="text-slate-300 text-xs font-semibold leading-relaxed mb-6">
                  Enter your plot location or survey coordinates to receive your stamped GHMC/HMDA FSI envelope & height permission PDF on WhatsApp.
                </p>

                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Full Name</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="e.g. Vikram Reddy"
                      value={leadForm.name}
                      onChange={e => setLeadForm({...leadForm, name: e.target.value})}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm font-bold text-white outline-none focus:border-[#7B2DBF] transition-all placeholder:text-slate-500"
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
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm font-bold text-white outline-none focus:border-[#7B2DBF] transition-all placeholder:text-slate-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Plot Size & Location / Survey No.</label>
                    <textarea 
                      rows={3}
                      placeholder="e.g. 350 Sq.Yds, Sy. No. 42, Gachibowli 60ft road"
                      value={plotCoordinates}
                      onChange={e => setPlotCoordinates(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm font-bold text-white outline-none focus:border-[#7B2DBF] transition-all placeholder:text-slate-500 resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#7B2DBF] to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>Generate Map Feasibility PDF</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400">
                  <ShieldCheck size={14} className="text-emerald-400" />
                  <span>AGNAA Principal Architect Verified • Instant Dispatch</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
