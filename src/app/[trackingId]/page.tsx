"use client";

import React, { useState, useEffect } from 'react';
import { AgnaaLogo } from '@/components/AgnaaLogo';
import { ENTHALPY_HTML, ENTHALPY_STYLES } from './enthalpyContent';
// import { EnthalpyLogo } from '@/components/EnthalpyLogo'; // we will find or create this

export default function TrackingPage({ params }: { params: { trackingId: string } }) {
  const { trackingId } = params;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = loginId.trim().toUpperCase();
    const cleanTrackingId = trackingId.toUpperCase();

    if (cleanId === 'AGN-001' && password.trim() === 'entlabs') {
      setIsAuthenticated(true);
    } else if (cleanId === 'AGN080426-001' || cleanId === 'AGN080426-1001' || cleanTrackingId === 'AGN080426-001' || cleanTrackingId === 'AGN080426-1001') {
      // Auto-authenticate for these specific tracking IDs if any password is provided
      // or if they are the login id
      if (password.trim() === 'entlabs' || password.trim() === 'enthalpy@agnaa') {
        setIsAuthenticated(true);
      }
    } else if (loginId && password) {
      // Mock for standard demo
      setIsAuthenticated(true);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isClient) return null; // Hydration fix

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background gradient effects */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-violet/20 blur-[120px] rounded-full point-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-brand-navy/30 blur-[120px] rounded-full point-events-none"></div>
        
        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl relative z-10 animate-in fade-in slide-in-from-bottom-5">
          <div className="flex justify-center mb-8">
            <AgnaaLogo className="w-48 text-white" />
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-display text-white mb-2">Track Your Progress</h1>
            <p className="text-brand-muted text-sm tracking-wide">Enter your credentials to view updates</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs text-brand-muted uppercase tracking-wider font-semibold">Login ID</label>
              <input 
                type="text"
                placeholder="e.g. AGN-CLIENT-001"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-brand-violet transition-all"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs text-brand-muted uppercase tracking-wider font-semibold">Password</label>
              <input 
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-brand-violet transition-all"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-brand-gradient text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-brand-violet/25 hover:scale-[1.02] transition-all"
            >
              Secure Login
            </button>
          </form>
          
          <div className="mt-8 text-center text-xs text-brand-muted">
            Tracking Code: <span className="text-brand-violet font-mono">{trackingId}</span>
          </div>
        </div>
      </div>
    );
  }

  // --- ENTHALPY LABS SPECIFIC RENDER --- //
  const isEnthalpyId = loginId.trim() === 'AGN-001' || 
                       loginId.trim().toUpperCase() === 'AGN080426-001' || 
                       loginId.trim().toUpperCase() === 'AGN080426-1001' ||
                       trackingId.toUpperCase() === 'AGN080426-001' ||
                       trackingId.toUpperCase() === 'AGN080426-1001';

  if (isEnthalpyId) {
    // Inject the specific advance payment requested
    const customizedHtml = ENTHALPY_HTML.replace(
      'Advance Paid — Project Live', 
      'Advance Paid (₹25k / ₹1.25L) — Project Live'
    );

    return (
      <div className="min-h-screen relative print:bg-white bg-[#0D0D14]">
        <style dangerouslySetInnerHTML={{ __html: ENTHALPY_STYLES }} />
        <div dangerouslySetInnerHTML={{ __html: customizedHtml }} />
        
        <div className="flex justify-center pb-24 pt-8 print:hidden">
          <button 
            onClick={handlePrint}
            className="custom-invoice-btn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Download Digital Invoice
          </button>
        </div>
      </div>
    );
  }

  // --- STANDARD FALLBACK MOCK RENDER --- //
  return (
    <div className="min-h-screen bg-brand-light p-4 md:p-8 font-sans print:bg-white print:p-0">
      <div className="max-w-4xl mx-auto">
        {/* Actions Bar - Hidden on print */}
        <div className="flex justify-end mb-6 print:hidden">
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 bg-brand-navy text-white px-4 py-2 rounded-lg hover:bg-brand-violet transition-colors text-sm font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Download Invoice
          </button>
        </div>

        {/* Invoice / Proposal Document */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-black/5 print:shadow-none print:border-none print:p-0 relative overflow-hidden">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-8 md:mb-12 border-b border-black/5 pb-8 gap-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="bg-brand-dark p-3 rounded-lg inline-flex">
                  <AgnaaLogo className="w-20 md:w-24 text-white" />
                </div>
                <div className="text-xl md:text-2xl font-light text-brand-muted hidden sm:block">✕</div>
                {/* Placeholder Enthalpy Logo */}
                <div className="flex items-center gap-2">
                   <div className="w-8 h-8 md:w-10 md:h-10 bg-brand-violet/10 rounded-lg flex items-center justify-center text-brand-violet font-bold text-lg md:text-xl">E</div>
                   <span className="font-display font-semibold text-lg md:text-xl text-brand-navy">Enthalpy Labs</span>
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-navy mt-4">Work Progress & Invoice</h2>
            </div>
            
            <div className="text-left md:text-right space-y-1 text-xs md:text-sm text-brand-navy/70 w-full md:w-auto p-4 md:p-0 bg-brand-navy/5 md:bg-transparent rounded-lg md:rounded-none">
              <p className="font-mono font-medium text-brand-navy break-all">ID: {trackingId}</p>
              <p>Date: 08 April 2026</p>
              <p className="break-all">Client ID: {loginId}</p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Project Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mb-8">
              <div className="bg-brand-navy/5 p-4 rounded-xl border border-brand-navy/10">
                <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">Prepared For</h3>
                <p className="font-semibold text-brand-navy text-sm md:text-base">Enthalpy Labs Inc.</p>
                <p className="text-xs sm:text-sm text-brand-navy/70 mt-1">Research & Development Division<br/>Phase 1 Rollout</p>
              </div>
              <div className="bg-brand-navy/5 p-4 rounded-xl border border-brand-navy/10">
                <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">Project Status</h3>
                <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium border border-emerald-100 shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  Work Started
                </div>
              </div>
            </div>

            {/* Timeline / Invoice Items */}
            <div className="bg-white rounded-xl shadow-sm border border-black/5 overflow-hidden">
               <div className="p-4 md:p-6 bg-brand-navy/5 border-b border-black/5">
                 <h3 className="text-xs font-bold uppercase tracking-wider text-brand-navy">Timeline & Charges</h3>
               </div>
               
               <div className="overflow-x-auto">
                 <table className="w-full text-left min-w-[500px]">
                   <thead>
                     <tr className="text-[10px] sm:text-xs text-brand-muted uppercase tracking-wider bg-black/5">
                       <th className="py-3 px-4 sm:px-6 font-semibold border-b border-black/10">Date</th>
                       <th className="py-3 px-4 sm:px-6 font-semibold border-b border-black/10">Description</th>
                       <th className="py-3 px-4 sm:px-6 font-semibold text-right border-b border-black/10">Amount</th>
                     </tr>
                   </thead>
                   <tbody className="text-xs sm:text-sm">
                     <tr className="border-b border-black/5 last:border-0 hover:bg-brand-navy/5 transition-colors">
                       <td className="py-4 px-4 sm:px-6 font-mono text-brand-navy/70 whitespace-nowrap">08 Apr 2026</td>
                       <td className="py-4 px-4 sm:px-6 text-brand-navy">
                          <p className="font-semibold text-sm sm:text-base">Project Initiation & Planning</p>
                          <p className="text-brand-muted mt-1 leading-relaxed max-w-sm">Initial scoping, system architecture design, and database provisioning.</p>
                       </td>
                       <td className="py-4 px-4 sm:px-6 text-right font-medium text-brand-navy whitespace-nowrap">$2,500.00</td>
                     </tr>
                     <tr className="border-b border-black/5 last:border-0 hover:bg-brand-navy/5 transition-colors">
                       <td className="py-4 px-4 sm:px-6 font-mono text-brand-navy/70 whitespace-nowrap">10 Apr 2026</td>
                       <td className="py-4 px-4 sm:px-6 text-brand-navy">
                          <p className="font-semibold text-sm sm:text-base">Tracking Portal Development</p>
                          <p className="text-brand-muted mt-1 leading-relaxed max-w-sm">Design and implementation of the client tracking interface.</p>
                       </td>
                       <td className="py-4 px-4 sm:px-6 text-right font-medium text-brand-navy whitespace-nowrap">$1,200.00</td>
                     </tr>
                   </tbody>
                   <tfoot className="bg-brand-navy/5">
                     <tr className="text-brand-navy border-t-2 border-brand-navy/20">
                       <td colSpan={2} className="py-4 px-4 sm:px-6 font-bold text-right uppercase tracking-wider text-xs">Total Due</td>
                       <td className="py-4 px-4 sm:px-6 font-black text-lg sm:text-xl text-right text-brand-violet">$3,700.00</td>
                     </tr>
                   </tfoot>
                 </table>
               </div>
            </div>
            
            {/* Digital Stamp */}
            <div className="mt-16 pt-8 border-t border-black/5 flex justify-between items-end">
              <div className="text-xs text-brand-muted max-w-sm">
                <p>This is a digitally generated invoice and progress report. For any queries, please contact billing@agnaa.in</p>
              </div>
              <div className="text-right">
                <div className="font-display italic text-2xl text-brand-navy mb-1 opacity-70">Agnaa Digital</div>
                <p className="text-xs uppercase tracking-widest text-brand-violet font-semibold">Authorized Signatory</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
