"use client";

import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Printer, Save, FileText, CheckCircle2, AlertTriangle } from 'lucide-react';

const P_BASE_D1 = 4125;
const P_BASE_D730 = 5500;
const TOTAL_DAYS = 730;

// Formatters
const fLakhs = (val: number) => `₹${(val / 100000).toFixed(2)} L`;
const fRupees = (val: number) => `₹${Math.round(val).toLocaleString('en-IN')}`;

type Installment = {
  id: number;
  day: number;
  pct: number;
};

export default function DynamicPricingEngine() {
  const [day, setDay] = useState(1);
  const [unitType, setUnitType] = useState("2.5 BHK");
  const [area, setArea] = useState(1250);
  const [upfrontPct, setUpfrontPct] = useState(10); // Start at 10%
  const [installments, setInstallments] = useState<Installment[]>([]);
  const [savedText, setSavedText] = useState("💾 Save Plan for Later");
  const [showModal, setShowModal] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem('vikarabad_plan');
    if (saved) {
      try {
        const state = JSON.parse(saved);
        setDay(state.day || 1);
        setUnitType(state.unitType || "2.5 BHK");
        setArea(state.area || 1250);
        setUpfrontPct(state.upfrontPct || 10);
        setInstallments(state.installments || []);
      } catch (e) {
        console.error("Error loading saved plan", e);
      }
    }
  }, []);

  const getBasePsf = (d: number) => P_BASE_D1 + ((d - 1) / (TOTAL_DAYS - 1)) * (P_BASE_D730 - P_BASE_D1);
  
  const getPaymentFactor = (pct: number) => {
    if (pct >= 100) return 1.000;
    if (pct >= 75) return 1.010;
    if (pct >= 50) return 1.020;
    if (pct >= 30) return 1.030;
    return 1.050; // default for >= 10%
  };

  // Pricing math
  const basePsf = getBasePsf(day);
  const baseCost = basePsf * area;
  const pf = getPaymentFactor(upfrontPct);
  const finalPsf = basePsf * pf;
  const finalCost = finalPsf * area;
  const marketFinal = P_BASE_D730 * area;
  const savings = marketFinal - finalCost;

  let totalAllocated = 0;
  const upfrontAmt = finalCost * (upfrontPct / 100);
  totalAllocated += upfrontAmt;
  
  let remainingForInst = finalCost - upfrontAmt;
  installments.forEach(inst => {
    const amt = remainingForInst * (inst.pct / 100);
    totalAllocated += amt;
  });

  const unallocated = finalCost - totalAllocated;
  const isBalanced = Math.abs(unallocated) < 1; // 1 rupee tolerance

  // Actions
  const handleAddInstallment = () => {
    if (upfrontPct === 100) {
      alert("You are paying 100% upfront. No installments needed.");
      return;
    }
    const currentPct = installments.reduce((sum, i) => sum + i.pct, 0);
    const needed = Math.max(0, 100 - currentPct);
    
    setInstallments([
      ...installments,
      {
        id: Date.now(),
        day: Math.min(730, day + 30),
        pct: needed
      }
    ]);
  };

  const removeInstallment = (id: number) => {
    setInstallments(installments.filter(i => i.id !== id));
  };

  const handleUpdateInstallment = (id: number, field: keyof Installment, value: number) => {
    setInstallments(installments.map(inst => {
      if (inst.id === id) {
        return { ...inst, [field]: value };
      }
      return inst;
    }));
  };

  const handleUpfrontChange = (val: number) => {
    setUpfrontPct(val);
    if (installments.length === 1 && val < 100) {
      // Auto adjust single installment
      setInstallments([{ ...installments[0], pct: 100 }]);
    } else if (val === 100) {
      setInstallments([]);
    }
  };

  const handleSave = () => {
    localStorage.setItem('vikarabad_plan', JSON.stringify({
      day, unitType, area, upfrontPct, installments
    }));
    setSavedText("✅ Saved Successfully!");
    setTimeout(() => setSavedText("💾 Save Plan for Later"), 2000);
  };

  if (!isClient) return null; // Prevent hydration errors

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-slate-800 pb-24 font-sans">
      {/* Urgency Banner */}
      {day === 1 ? (
        <div className="bg-emerald-600 text-white text-center py-3 px-4 font-semibold text-sm sticky top-0 z-50 shadow-md">
          🎉 Day 1 Pre-launch Pricing Active! Maximum savings unlocked.
        </div>
      ) : (
        <div className="bg-red-600 text-white text-center py-3 px-4 font-semibold text-sm sticky top-0 z-50 shadow-md">
          ⚠️ You missed {day - 1} days of Pre-launch. Base price increased by {fLakhs((basePsf - P_BASE_D1) * area)}!
        </div>
      )}

      {/* Header */}
      <header className="bg-[#1B2B5E] text-white py-8 px-6 text-center border-b-4 border-[#C9A84C]">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide text-[#C9A84C]">
          AGNAA DESIGN STUDIO
        </h1>
        <p className="text-base text-white/90 mt-2">Vikarabad Residential • Dynamic Pricing & Payment Engine</p>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 -mt-8 pt-4 md:pt-0 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 relative z-10">
        
        {/* Left Column */}
        <div className="space-y-6">
          
          {/* Section 1: Timeline */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-[#1B2B5E] mb-5 flex items-center justify-between">
              1. Select Booking Day
            </h2>
            <div className="text-center mb-6">
              <p className="text-slate-500 font-medium">Current Market Base Price</p>
              <h2 className="text-4xl font-extrabold text-[#1B2B5E] leading-tight">
                {fRupees(basePsf)} <span className="text-base font-normal text-slate-500">/ sq.ft.</span>
              </h2>
            </div>

            <div className="relative py-8">
              <input 
                type="range" 
                min="1" 
                max="730" 
                value={day} 
                onChange={(e) => setDay(parseInt(e.target.value))}
                className="w-full absolute top-1/2 -translate-y-1/2 z-10 opacity-0 cursor-pointer h-8"
              />
              <div className="h-2 bg-slate-200 rounded-full relative overflow-hidden pointer-events-none">
                <div 
                  className="absolute top-0 left-0 h-full bg-[#1B2B5E] pointer-events-none"
                  style={{ width: `${((day - 1) / (TOTAL_DAYS - 1)) * 100}%` }}
                />
              </div>
              {/* Custom Thumb Visual */}
              <div 
                className="w-7 h-7 rounded-full bg-[#1B2B5E] border-4 border-[#C9A84C] absolute top-1/2 -translate-y-1/2 -ml-3.5 shadow-md pointer-events-none transition-transform"
                style={{ left: `${((day - 1) / (TOTAL_DAYS - 1)) * 100}%` }}
              />

              <div className="flex justify-between mt-4 relative">
                {[{d: 1, l: "Launch"}, {d: 120, l: "Found."}, {d: 240, l: "Basement"}, {d: 360, l: "Slabs"}, {d: 480, l: "Brickwork"}, {d: 600, l: "Finishing"}, {d: 730, l: "Handover"}].map((m, i) => (
                  <div key={m.d} className={`text-center text-xs font-semibold text-slate-500 w-[60px] ${i > 0 && i < 6 ? 'hidden sm:block' : ''}`} style={i > 0 && i < 6 ? { position: 'absolute', left: `${((m.d - 1) / 729) * 100}%`, transform: 'translateX(-50%)'} : {}}>
                    Day {m.d}<br/>{m.l}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-center font-bold text-[#1B2B5E] mt-2">
              Booking on: Day {day}
            </div>
          </div>

          {/* Section 2: Unit Type */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-[#1B2B5E] mb-5">
              2. Select Unit Type
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { type: "2.5 BHK", sqft: 1250, badge: "20 Units" },
                { type: "3 BHK", sqft: 1500, badge: "10 Units" }
              ].map(u => (
                <div 
                  key={u.type}
                  onClick={() => { setUnitType(u.type); setArea(u.sqft); }}
                  className={`border-2 rounded-xl p-5 text-center cursor-pointer transition-all relative ${
                    unitType === u.type 
                      ? 'border-[#C9A84C] bg-[#C9A84C]/5 ring-1 ring-[#C9A84C]' 
                      : 'border-slate-200 hover:border-[#2A4086] hover:shadow-md'
                  }`}
                >
                  <div className="absolute -top-3 -right-3 bg-[#1B2B5E] text-[#C9A84C] text-xs font-bold py-1 px-3 rounded-full">
                    {u.badge}
                  </div>
                  <h3 className="text-xl font-bold text-[#1B2B5E]">{u.type}</h3>
                  <p className="text-slate-500 font-medium text-sm mt-1">{u.sqft.toLocaleString('en-IN')} sq.ft.</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Payment Plan Builder */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-[#1B2B5E] mb-5 flex items-center justify-between flex-wrap gap-2">
              <span>3. Build Payment Plan</span>
              <span className="text-sm font-normal bg-slate-100 py-1 px-2 rounded-md">
                PF: <span className="font-bold">{pf.toFixed(3)}</span>x
              </span>
            </h2>

            <div className="space-y-3">
              {/* Upfront Row */}
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-4 items-end p-4 bg-[#C9A84C]/10 border border-[#C9A84C] rounded-lg">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 flex justify-between">
                    <span>Upfront % (Day <span>{day}</span>)</span>
                  </label>
                  <input 
                    type="range" min="10" max="100" step="5" 
                    value={upfrontPct} 
                    onChange={(e) => handleUpfrontChange(parseInt(e.target.value))}
                    className="w-full accent-[#1B2B5E]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
                    <span>Amount</span>
                    <span className="text-[#1B2B5E] font-bold">{fLakhs(upfrontAmt)}</span>
                  </label>
                  <div className="font-bold text-[#1B2B5E] pt-1">{upfrontPct}%</div>
                </div>
                <button disabled className="bg-slate-200 text-slate-400 w-11 h-11 rounded-md flex items-center justify-center cursor-not-allowed">
                  🔒
                </button>
              </div>

              {/* Dynamic Rows */}
              {installments.map((inst, idx) => {
                const instAmt = remainingForInst * (inst.pct / 100);
                return (
                  <div key={inst.id} className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-4 items-end p-4 bg-[#F4F5F7] border border-slate-200 rounded-lg">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-600 flex justify-between">
                        <span>Date Slider</span>
                        <span>Day {inst.day}</span>
                      </label>
                      <input 
                        type="range" min={day} max="730" 
                        value={inst.day < day ? day : inst.day} 
                        onChange={(e) => handleUpdateInstallment(inst.id, 'day', parseInt(e.target.value))}
                        className="w-full accent-[#1B2B5E]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-600 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
                        <span>Balance %</span>
                        <span className="text-[#1B2B5E] font-bold">{fLakhs(instAmt)}</span>
                      </label>
                      <input 
                        type="range" min="0" max="100" 
                        value={inst.pct} 
                        onChange={(e) => handleUpdateInstallment(inst.id, 'pct', parseInt(e.target.value))}
                        className="w-full accent-[#1B2B5E]"
                      />
                    </div>
                    <button 
                      onClick={() => removeInstallment(inst.id)}
                      className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white w-11 h-11 rounded-md flex items-center justify-center transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                );
              })}
            </div>

            <button 
              onClick={handleAddInstallment}
              disabled={upfrontPct === 100}
              className={`w-full p-3 mt-4 border-2 border-dashed border-slate-300 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors ${
                upfrontPct === 100 ? 'text-slate-400 cursor-not-allowed bg-slate-50' : 'text-[#1B2B5E] bg-white hover:bg-slate-50 hover:border-[#1B2B5E]'
              }`}
            >
              <Plus size={20} /> Add Installment
            </button>

            <div className={`mt-6 p-4 rounded-lg text-center font-bold transition-all ${
              isBalanced 
                ? 'bg-emerald-100 text-emerald-700 border border-emerald-500/30' 
                : 'bg-red-50 text-red-600 border border-red-500/30'
            }`}>
              {isBalanced ? (
                <div className="flex items-center justify-center gap-2"><CheckCircle2 size={20} /> 100% Funds Allocated</div>
              ) : (
                <div className="flex items-center justify-center gap-2"><AlertTriangle size={20} /> Unallocated Balance: {fLakhs(unallocated)}</div>
              )}
            </div>
          </div>

        </div>

        {/* Right Column: Results */}
        <div>
          <div className="bg-white rounded-xl shadow-sm p-6 lg:sticky lg:top-24">
            <h2 className="text-xl font-bold text-[#1B2B5E] mb-5">Live Summary</h2>
            
            <div className="flex justify-between mb-3 text-[0.95rem]">
              <span className="text-slate-500">Base Cost (on Day {day})</span>
              <span className="font-bold text-slate-800">{fLakhs(baseCost)}</span>
            </div>
            
            <div className="flex justify-between mb-3 text-[0.95rem] text-[#C9A84C] font-semibold">
              <span>Payment Factor Multiplier</span>
              <span>x {pf.toFixed(3)}</span>
            </div>
            
            <div className="h-px bg-slate-200 my-6"></div>
            
            <div className="text-slate-500 text-sm font-medium">Effective Total Price</div>
            <div className="text-3xl md:text-4xl text-[#1B2B5E] font-extrabold mb-4 mt-1">
              {fLakhs(finalCost)}
            </div>
            
            <div className="bg-emerald-100 text-emerald-700 border border-emerald-200 w-full rounded-lg py-2.5 px-4 font-bold text-center mb-6 text-sm flex items-center justify-center gap-2">
              <CheckCircle2 size={18} /> You Save: {fLakhs(savings)} vs Day 730
            </div>

            <div className="flex justify-between mb-4 text-[0.95rem]">
              <span className="text-slate-500">Total Upfront Paid</span>
              <span className="font-bold text-[#1B2B5E]">{fLakhs(upfrontAmt)} ({upfrontPct}%)</span>
            </div>

            <div className="h-px bg-slate-200 my-6"></div>

            <button 
              disabled={!isBalanced}
              onClick={() => setShowModal(true)}
              className="w-full bg-[#1B2B5E] hover:bg-[#2A4086] text-[#C9A84C] disabled:opacity-50 disabled:cursor-not-allowed p-4 rounded-lg font-bold uppercase tracking-wide flex justify-center items-center gap-2 transition-all shadow-sm hover:-translate-y-0.5 hover:shadow-md mb-3"
            >
              <FileText size={20} /> Generate Agreement
            </button>
            
            <button 
              onClick={handleSave}
              className="w-full bg-white hover:bg-slate-50 border border-slate-300 hover:border-[#1B2B5E] text-[#1B2B5E] p-3 rounded-lg font-semibold flex justify-center items-center gap-2 transition-all"
            >
              {savedText}
            </button>
          </div>
        </div>
      </div>

      {/* Modal / Print View */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4 transition-opacity">
          <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative p-6 md:p-10 shadow-2xl print:shadow-none print:p-0 print:block print:max-h-full print:w-full print:max-w-none">
            
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-5 text-slate-400 hover:text-slate-700 print:hidden text-2xl leading-none"
            >
              &times;
            </button>

            <div className="text-center border-b-2 border-[#1B2B5E] pb-4 mb-8">
              <h2 className="text-[#1B2B5E] font-extrabold text-2xl tracking-wide">AGNAA DESIGN STUDIO</h2>
              <p className="text-[#C9A84C] font-bold mt-1">Custom Payment Agreement</p>
              <p className="text-slate-500 text-sm mt-1">Vikarabad Residential Project</p>
            </div>

            <table className="w-full border-collapse mb-8 text-sm md:text-base">
              <tbody>
                <tr>
                  <th className="py-3 px-4 border-b border-slate-200 text-slate-500 text-left w-1/2">Unit Type & Area</th>
                  <td className="py-3 px-4 border-b border-slate-200 text-[#1B2B5E] font-bold text-right">
                    {unitType} ({area.toLocaleString('en-IN')} sq.ft.)
                  </td>
                </tr>
                <tr>
                  <th className="py-3 px-4 border-b border-slate-200 text-slate-500 text-left">Booking Date</th>
                  <td className="py-3 px-4 border-b border-slate-200 text-[#1B2B5E] font-bold text-right">Day {day} of 730</td>
                </tr>
                <tr>
                  <th className="py-3 px-4 border-b border-slate-200 text-slate-500 text-left">Effective Rate (per sq.ft.)</th>
                  <td className="py-3 px-4 border-b border-slate-200 text-[#1B2B5E] font-bold text-right">{fRupees(finalPsf)}</td>
                </tr>
                <tr>
                  <th className="py-3 px-4 border-b border-slate-200 text-slate-500 text-left">Market Value (Day 730)</th>
                  <td className="py-3 px-4 border-b border-slate-200 text-slate-400 font-bold text-right line-through">
                    {fLakhs(marketFinal)}
                  </td>
                </tr>
                <tr>
                  <th className="py-3 px-4 border-b border-slate-200 text-slate-500 text-left text-lg">Agreed Total Price</th>
                  <td className="py-3 px-4 border-b border-slate-200 text-emerald-600 font-bold text-right text-lg">
                    {fLakhs(finalCost)}
                  </td>
                </tr>
              </tbody>
            </table>

            <h3 className="text-lg font-bold text-[#1B2B5E] mb-4">Payment Schedule</h3>
            <table className="w-full border-collapse text-sm md:text-base">
              <thead>
                <tr className="bg-slate-50 border-b-2 border-[#1B2B5E]">
                  <th className="py-3 px-4 text-left font-semibold text-slate-800 w-[30%]">Installment</th>
                  <th className="py-3 px-4 text-left font-semibold text-slate-800 w-[35%]">Timeline Date</th>
                  <th className="py-3 px-4 text-right font-semibold text-slate-800 w-[35%]">Amount Payable</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200">
                  <td className="py-3 px-4 text-slate-600">Booking Advance ({upfrontPct}%)</td>
                  <td className="py-3 px-4 text-slate-600">Day {day}</td>
                  <td className="py-3 px-4 text-[#1B2B5E] font-bold text-right">{fLakhs(upfrontAmt)}</td>
                </tr>
                
                {[...installments].sort((a,b) => a.day - b.day).map((inst, i) => {
                  const amt = remainingForInst * (inst.pct / 100);
                  return (
                    <tr key={inst.id} className="border-b border-slate-200">
                      <td className="py-3 px-4 text-slate-600">Installment {i + 1} ({inst.pct}%)</td>
                      <td className="py-3 px-4 text-slate-600">Day {inst.day}</td>
                      <td className="py-3 px-4 text-[#1B2B5E] font-bold text-right">{fLakhs(amt)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            <div className="mt-10 text-center print:hidden">
              <button 
                onClick={() => window.print()}
                className="bg-[#1B2B5E] hover:bg-[#2A4086] text-[#C9A84C] py-3 px-10 rounded-lg font-bold flex items-center justify-center gap-2 transition-all mx-auto shadow-sm hover:-translate-y-0.5 hover:shadow-md"
              >
                <Printer size={20} /> Print to PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
