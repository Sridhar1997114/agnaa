"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/Button';
import { 
  Building2, Home, Paintbrush, Hammer, MapPin, 
  Ruler, Calendar, DollarSign, ArrowRight, ArrowLeft, 
  CheckCircle2, Sparkles, ShieldCheck, Phone, User
} from 'lucide-react';

const PROJECT_TYPES = [
  { id: 'villa', title: 'Luxury Villa / G+N Residence', desc: 'Custom architectural design, structural drawings & execution', icon: Home },
  { id: 'commercial', title: 'Commercial & Mixed-Use', desc: 'High-density retail, office spaces & apartment complexes', icon: Building2 },
  { id: 'interior', title: 'Turnkey Luxury Interior', desc: 'Complete interior design, custom carpentry & spatial styling', icon: Paintbrush },
  { id: 'renovation', title: 'Architectural Renovation', desc: 'Structural retrofit, facade redesign & space optimization', icon: Hammer }
];

const LOCATIONS = [
  'Gachibowli / Financial Dist',
  'Jubilee Hills / Banjara Hills',
  'Kokapet / Tellapur / Narsingi',
  'Kollur / Bachupally / Miyapur',
  'Other Hyderabad Region',
  'Outside Hyderabad'
];

const BUDGET_RANGES = [
  '₹25 Lakhs - ₹50 Lakhs',
  '₹50 Lakhs - ₹1 Crore',
  '₹1 Crore - ₹3 Crores',
  '₹3 Crores - ₹5 Crores+',
  'Custom / Open Budget'
];

const TIMELINES = [
  'Immediate (Within 1 Month)',
  'Planning Phase (1 - 3 Months)',
  'Future Project (3 - 6 Months)',
  'Exploring Feasibility'
];

export default function StartProjectPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectType: 'Luxury Villa / G+N Residence',
    location: 'Gachibowli / Financial Dist',
    plotSize: '',
    budget: '₹1 Crore - ₹3 Crores',
    timeline: 'Planning Phase (1 - 3 Months)',
    name: '',
    phone: '',
    email: '',
    details: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    const text = `*NEW AGNAA PROJECT FEASIBILITY INQUIRY*\n` +
      `-----------------------------------\n` +
      `👤 *Name:* ${formData.name}\n` +
      `📞 *Phone:* ${formData.phone}\n` +
      `🏗️ *Type:* ${formData.projectType}\n` +
      `📍 *Location:* ${formData.location}\n` +
      `📏 *Plot Size:* ${formData.plotSize || 'Not specified'}\n` +
      `💰 *Budget:* ${formData.budget}\n` +
      `⏱️ *Timeline:* ${formData.timeline}\n` +
      `📝 *Details:* ${formData.details || 'N/A'}\n` +
      `-----------------------------------\n` +
      `Please assign Principal Architect for proposal review.`;

    const waUrl = `https://wa.me/918826214348?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-[#0F172A] pt-24 pb-32 flex flex-col items-center justify-center relative overflow-hidden font-inter">
      
      {/* AMBIENT BACKGROUND */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#1C1C72 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <div className="absolute -top-[15%] -right-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-[#7B2DBF]/15 via-purple-500/5 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 -left-[10%] w-[45%] h-[45%] rounded-full bg-gradient-to-br from-indigo-500/10 to-transparent blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 py-12 max-w-4xl">
        
        {/* HEADER */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-4">
            <Sparkles size={14} className="text-[#7B2DBF]" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#1C1C72]">OFFICIAL DESIGN STUDIO INQUIRY</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#1C1C72] tracking-tight mb-3">
            Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1C1C72] via-[#7B2DBF] to-[#1C1C72]">Architectural Journey</span>
          </h1>

          <p className="text-slate-500 text-sm sm:text-base font-semibold max-w-lg mx-auto">
            Answer 4 quick questions to receive a tailored feasibility analysis & proposal within 2 hours.
          </p>
        </div>

        {/* PROGRESS BAR */}
        <div className="mb-10 max-w-xl mx-auto">
          <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-400 mb-3 px-1">
            <span className={step >= 1 ? 'text-[#7B2DBF]' : ''}>1. Type</span>
            <span className={step >= 2 ? 'text-[#7B2DBF]' : ''}>2. Location</span>
            <span className={step >= 3 ? 'text-[#7B2DBF]' : ''}>3. Budget</span>
            <span className={step >= 4 ? 'text-[#7B2DBF]' : ''}>4. Proposal</span>
          </div>
          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-[#1C1C72] to-[#7B2DBF]"
              initial={{ width: '25%' }}
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        {/* WIZARD CONTAINER */}
        <div className="bg-white/90 backdrop-blur-2xl p-6 sm:p-10 md:p-12 rounded-[2.5rem] border border-slate-200/90 shadow-xl shadow-[#1C1C72]/5 relative overflow-hidden">
          
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              
              {/* STEP 1: PROJECT TYPE */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="text-center sm:text-left mb-6">
                    <h2 className="text-2xl font-black text-[#1C1C72] tracking-tight">What type of project are you building?</h2>
                    <p className="text-xs text-slate-400 font-semibold mt-1">Select the option that best fits your vision</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {PROJECT_TYPES.map(pt => {
                      const Icon = pt.icon;
                      const isSelected = formData.projectType === pt.title;
                      return (
                        <div
                          key={pt.id}
                          onClick={() => setFormData({...formData, projectType: pt.title})}
                          className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex items-start gap-4 ${
                            isSelected 
                              ? 'bg-[#1C1C72]/5 border-[#7B2DBF] shadow-lg shadow-[#7B2DBF]/10 scale-[1.01]' 
                              : 'bg-white border-slate-200/80 hover:border-slate-300'
                          }`}
                        >
                          <div className={`p-3 rounded-xl ${isSelected ? 'bg-[#7B2DBF] text-white' : 'bg-slate-100 text-[#1C1C72]'}`}>
                            <Icon size={24} />
                          </div>
                          <div>
                            <div className="font-bold text-[#1C1C72] text-sm">{pt.title}</div>
                            <div className="text-xs text-slate-400 font-medium leading-relaxed mt-1">{pt.desc}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-8 py-4 rounded-xl bg-[#1C1C72] hover:bg-[#7B2DBF] text-white font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg cursor-pointer"
                    >
                      <span>Next: Location & Plot</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: LOCATION & PLOT SIZE */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="text-center sm:text-left mb-6">
                    <h2 className="text-2xl font-black text-[#1C1C72] tracking-tight">Where is your plot located?</h2>
                    <p className="text-xs text-slate-400 font-semibold mt-1">Helps us evaluate GHMC & HMDA setback permissions</p>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Select Location</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {LOCATIONS.map(loc => (
                        <button
                          type="button"
                          key={loc}
                          onClick={() => setFormData({...formData, location: loc})}
                          className={`p-4 rounded-xl text-left font-bold text-xs transition-all border ${
                            formData.location === loc 
                              ? 'bg-[#1C1C72] text-white border-[#1C1C72] shadow-md' 
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          📍 {loc}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Plot Size / Dimensions (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. 350 Sq.Yds (40ft x 80ft)"
                      value={formData.plotSize}
                      onChange={e => setFormData({...formData, plotSize: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 font-bold text-sm text-[#1C1C72] outline-none focus:border-[#7B2DBF] transition-all"
                    />
                  </div>

                  <div className="pt-6 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-6 py-4 rounded-xl border border-slate-200 text-slate-500 font-bold text-xs uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <ArrowLeft size={16} /> Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-8 py-4 rounded-xl bg-[#1C1C72] hover:bg-[#7B2DBF] text-white font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg cursor-pointer"
                    >
                      <span>Next: Budget & Timeline</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: BUDGET & TIMELINE */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="text-center sm:text-left mb-6">
                    <h2 className="text-2xl font-black text-[#1C1C72] tracking-tight">Est. Budget & Target Timeline</h2>
                    <p className="text-xs text-slate-400 font-semibold mt-1">Helps us align material specifications & project team</p>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Estimated Budget Range</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {BUDGET_RANGES.map(b => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setFormData({...formData, budget: b})}
                          className={`p-4 rounded-xl text-left font-bold text-xs transition-all border ${
                            formData.budget === b 
                              ? 'bg-[#7B2DBF] text-white border-[#7B2DBF] shadow-md' 
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          💰 {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Target Project Timeline</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {TIMELINES.map(t => (
                        <button
                          type="button"
                          key={t}
                          onClick={() => setFormData({...formData, timeline: t})}
                          className={`p-4 rounded-xl text-left font-bold text-xs transition-all border ${
                            formData.timeline === t 
                              ? 'bg-[#1C1C72] text-white border-[#1C1C72] shadow-md' 
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          ⏱️ {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-6 py-4 rounded-xl border border-slate-200 text-slate-500 font-bold text-xs uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <ArrowLeft size={16} /> Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-8 py-4 rounded-xl bg-[#1C1C72] hover:bg-[#7B2DBF] text-white font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg cursor-pointer"
                    >
                      <span>Next: Contact Info</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: CONTACT & PROPOSAL UNLOCK */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="text-center sm:text-left mb-6">
                    <h2 className="text-2xl font-black text-[#1C1C72] tracking-tight">Unlock Your Proposal & Feasibility Report</h2>
                    <p className="text-xs text-slate-400 font-semibold mt-1">Our Principal Architect will review and reply within 2 hours</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Full Name *</label>
                      <div className="relative flex items-center">
                        <User className="absolute left-4 w-4 h-4 text-slate-400" />
                        <input
                          required
                          type="text"
                          placeholder="e.g. Vikram Sharma"
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-4 font-bold text-sm text-[#1C1C72] outline-none focus:border-[#7B2DBF] transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">WhatsApp Phone Number *</label>
                      <div className="relative flex items-center">
                        <Phone className="absolute left-4 w-4 h-4 text-slate-400" />
                        <input
                          required
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={e => setFormData({...formData, phone: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-4 font-bold text-sm text-[#1C1C72] outline-none focus:border-[#7B2DBF] transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Additional Vision / Requirements (Optional)</label>
                    <textarea
                      rows={3}
                      placeholder="Special requirements e.g. Home elevator, Vastu compliance, Courtyard design..."
                      value={formData.details}
                      onChange={e => setFormData({...formData, details: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 font-bold text-sm text-[#1C1C72] outline-none focus:border-[#7B2DBF] transition-all resize-none"
                    />
                  </div>

                  {/* SUMMARY BOX */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1 text-slate-600">
                    <div className="font-bold text-[#1C1C72]">Summary of Your Request:</div>
                    <div>• <strong>Type:</strong> {formData.projectType}</div>
                    <div>• <strong>Location:</strong> {formData.location}</div>
                    <div>• <strong>Budget:</strong> {formData.budget}</div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-6 py-4 rounded-xl border border-slate-200 text-slate-500 font-bold text-xs uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <ArrowLeft size={16} /> Back
                    </button>

                    <button
                      type="submit"
                      className="px-8 py-5 rounded-xl bg-gradient-to-r from-[#1C1C72] via-[#2A1B81] to-[#7B2DBF] hover:opacity-95 text-white font-black text-sm uppercase tracking-wider transition-all flex items-center gap-3 shadow-xl shadow-purple-500/20 cursor-pointer"
                    >
                      <span>Submit Inquiry to Studio</span>
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </form>

        </div>

        {/* TRUST FOOTER BADGES */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-xs font-bold text-slate-400 text-center">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-500" />
            <span>Guaranteed Direct Principal Architect Review</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-500" />
            <span>100% Confidential • Privacy Assured</span>
          </div>
        </div>

      </div>
    </div>
  );
}
