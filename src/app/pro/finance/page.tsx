"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CreditCard, 
  TrendingDown, 
  Info, 
  ArrowRight,
  Calculator,
  ShieldCheck,
  Receipt,
  Download
} from "lucide-react";
import { getInvoices, getProjects } from "@/app/pro/actions";

// Sridhar's Rules Constants
const P_BASE = 4500;
const P_HANDOVER = 7500;
const PF = 1.025; // Example Payment Factor

export default function FinancialPortal() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [day, setDay] = useState(412); 
  const [targetDay, setTargetDay] = useState(412);
  
  useEffect(() => {
    async function loadData() {
      const { data: invoicesData } = await getInvoices();
      const { data: projectsData } = await getProjects();
      if (invoicesData) setInvoices(invoicesData);
      if (projectsData) {
        setProjects(projectsData);
        if (projectsData.length > 0) {
          setDay(projectsData[0].booking_day || 412);
          setTargetDay(projectsData[0].booking_day || 412);
        }
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const activeProject = projects[0] || {};
  const P_BASE_VAL = activeProject.base_psf || P_BASE;
  const P_HANDOVER_VAL = activeProject.handover_psf || P_HANDOVER;
  const PF_VAL = activeProject.payment_factor || PF;

  const calculatePsf = (d: number) => {
    return P_BASE_VAL + ((d - 1) / 729) * (P_HANDOVER_VAL - P_BASE_VAL);
  };

  const currentPsf = calculatePsf(day) * PF_VAL;
  const targetPsf = calculatePsf(targetDay) * PF_VAL;
  const savings = currentPsf - targetPsf;
  const totalSavings = savings * (activeProject.area_sqft || 2500);

  const totalDisbursed = invoices.filter(i => i.status === 'paid').reduce((acc, i) => acc + Number(i.amount), 0);
  const nextDue = invoices.filter(i => i.status === 'unpaid').sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime())[0]?.amount || 0;

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-display font-bold text-white mb-2">Financial Engine</h1>
          <p className="text-brand-muted">Transparent pricing and automated value calculations.</p>
        </div>
        <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-4 shadow-xl">
          <div className="text-right">
            <p className="text-[10px] text-brand-muted uppercase tracking-widest font-bold">Total Disbursed</p>
            <p className="text-xl font-display font-bold text-white">₹ {totalDisbursed.toLocaleString()}</p>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div className="text-right">
            <p className="text-[10px] text-brand-muted uppercase tracking-widest font-bold">Next Due</p>
            <p className="text-xl font-display font-bold text-emerald-400">₹ {Number(nextDue).toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
        {/* Left: Interactive Calculator */}
        <div className="space-y-8">
          <section className="bg-[#14141F] border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Calculator size={120} className="text-white" />
            </div>
            
            <div className="flex items-center gap-2 text-brand-violet mb-6">
              <TrendingDown size={20} />
              <h3 className="text-lg font-display font-bold text-white">Dynamic Savings Calculator</h3>
            </div>

            <div className="space-y-12 relative z-10">
              {/* Day Slider */}
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <label className="text-sm font-medium text-brand-muted uppercase tracking-widest">Projection Day (1-730)</label>
                  <span className="text-3xl font-display font-bold text-brand-violet">Day {targetDay}</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="730" 
                  value={targetDay} 
                  onChange={(e) => setTargetDay(parseInt(e.target.value))}
                  className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer accent-brand-violet [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-violet [&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(123,45,191,0.5)]"
                />
                <div className="flex justify-between text-[10px] text-brand-muted font-bold uppercase tracking-tighter">
                  <span>Booking (Day 1)</span>
                  <span className="text-white/40">Current: {day}</span>
                  <span>Handover (Day 730)</span>
                </div>
              </div>

              {/* Math Results */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                  <p className="text-[10px] text-brand-muted uppercase">Effective PSF Rate</p>
                  <p className="text-xl font-bold text-white">₹ {targetPsf.toFixed(2)}</p>
                </div>
                <div className="p-5 rounded-2xl bg-brand-violet/10 border border-brand-violet/20 space-y-1">
                  <p className="text-[10px] text-white/50 uppercase">Rate Savings</p>
                  <p className="text-xl font-bold text-white">₹ {(currentPsf - targetPsf).toFixed(2)}</p>
                </div>
                <div className="p-5 rounded-2xl bg-emerald-400/10 border border-emerald-400/20 space-y-1">
                  <p className="text-[10px] text-emerald-400/60 uppercase">Total Advantage</p>
                  <p className="text-xl font-bold text-emerald-400">₹ {totalSavings.toLocaleString()}</p>
                </div>
              </div>

              {/* Formula Tooltip */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/50 border border-white/5 text-xs text-brand-muted leading-relaxed italic">
                <Info size={16} className="text-brand-violet shrink-0" />
                <p>
                  Rule #1: Effective Psf Rate = P(d) * PF. This calculation reflects the appreciation locked in by your early commitment and payment discipline.
                </p>
              </div>
            </div>
          </section>

          {/* Payment Schedule Table */}
          <section className="bg-[#14141F] border border-white/5 rounded-3xl p-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-display font-bold text-white">Payment Schedule</h3>
              <button className="flex items-center gap-2 text-xs font-bold text-brand-muted hover:text-white transition-colors">
                <Receipt size={14} /> View All Invoices
              </button>
            </div>

            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-10 text-brand-muted uppercase tracking-widest text-[10px] font-bold">Fetching Ledgers...</div>
              ) : invoices.length === 0 ? (
                <div className="text-center py-10 text-brand-muted uppercase tracking-widest text-[10px] font-bold">No Invoices on Record</div>
              ) : invoices.map((invoice, i) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-all">
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${invoice.status === 'paid' ? 'bg-emerald-400' : 'bg-brand-violet animate-pulse'}`} />
                    <div>
                      <h4 className="text-sm font-bold text-white">{invoice.title}</h4>
                      <p className="text-[10px] text-brand-muted uppercase font-bold">{new Date(invoice.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-white">₹ {Number(invoice.amount).toLocaleString()}</p>
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${invoice.status === 'paid' ? 'text-emerald-400' : 'text-brand-violet'}`}>{invoice.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Sidebar: Rules & Security */}
        <div className="space-y-8">
          {/* Sridhar's Rules Card */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-brand-violet/30 shadow-2xl space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-violet flex items-center justify-center border border-white/10">
                <ShieldCheck size={20} className="text-white" />
              </div>
              <h4 className="font-display font-bold text-white">Contract Integrity</h4>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-[10px] text-brand-muted uppercase font-bold tracking-widest">Base Rate Agreement</p>
                <p className="text-lg font-bold text-white tracking-tight">₹ {P_BASE_VAL}/sqft</p>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] text-brand-muted uppercase font-bold tracking-widest">Handover Rate Projection</p>
                <p className="text-lg font-bold text-white tracking-tight">₹ {P_HANDOVER_VAL}/sqft</p>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] text-brand-muted uppercase font-bold tracking-widest">Your Payment Factor</p>
                <p className="text-lg font-bold text-brand-violet tracking-tight">{PF_VAL}x (Preferred)</p>
              </div>
            </div>

            <button className="w-full bg-white/5 hover:bg-brand-violet hover:text-white border border-white/10 rounded-xl py-3 text-sm font-bold text-brand-muted transition-all flex items-center justify-center gap-2">
              <Download size={16} /> Download Signed Contract
            </button>
          </div>

          {/* Need Help CTA */}
          <div className="p-8 rounded-3xl bg-brand-gradient flex flex-col items-center text-center space-y-4 shadow-xl shadow-brand-violet/20">
            <h4 className="text-xl font-display font-bold text-white">Confused about the math?</h4>
            <p className="text-sm text-white/80 leading-relaxed">
              Sridhar's pricing rules are designed to reward visionary clients.
            </p>
            <button className="bg-white text-brand-violet font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform flex items-center gap-2">
              Talk to Sridhar <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
