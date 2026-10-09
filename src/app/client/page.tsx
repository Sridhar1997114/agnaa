"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AgnaaLogo } from '@/components/AgnaaLogo';
import { motion, AnimatePresence } from 'framer-motion';
import { Key, User, Info, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';
import { clientLogin } from './actions';

export default function ClientLoginPage() {
  const [loginNumber, setLoginNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const cleanId = loginNumber.trim();
    const cleanPass = password.trim();

    // Direct access for Enthalpy Labs credentials
    const isEnthalpyId =
      cleanId.toUpperCase() === 'AGN080426-1001' ||
      cleanId.toUpperCase() === 'AGN080426-001' ||
      cleanId.toUpperCase() === 'AGN-001' ||
      cleanId.toLowerCase() === 'enthalpy' ||
      cleanId.toLowerCase() === 'admin@enthalpylabs.com';

    const isEnthalpyPass =
      cleanPass.toLowerCase() === 'enthalpy' ||
      cleanPass === 'enthalpy@agnaa' ||
      cleanPass === 'entlabs' ||
      cleanPass === 'EnthalpyLabs@2025!';

    if (isEnthalpyId && isEnthalpyPass) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('client_session', JSON.stringify({
          id: cleanId,
          clientName: 'Enthalpy Labs',
          loginTime: new Date().toISOString()
        }));
      }
      router.push('/client/enthalpy-labs');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('email', loginNumber);
      formData.append('password', password);

      const result = await clientLogin(formData);

      if (result?.error) {
        setError(result.error);
        setLoading(false);
      }
    } catch (err: any) {
      setError(err?.message || "Unable to sign in. Please verify your credentials.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 font-sans text-[#0F172A] selection:bg-[#7B2DBF]/15 selection:text-[#1C1C72]">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50/60 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-50/60 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <AgnaaLogo className="h-14 w-auto mx-auto mb-5" />
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-3">
            <ShieldCheck className="h-3 w-3 text-emerald-600" />
            Executive Client Vault
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Client Portal</h1>
          <p className="text-slate-500 text-sm">Enter your project credentials to track live deliverables</p>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 shadow-xl">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2 ml-1">
                Client ID / Email
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input 
                  type="text"
                  placeholder="e.g. AGN080426-1001"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-semibold text-slate-900 focus:bg-white focus:border-[#1C1C72] focus:ring-2 focus:ring-[#1C1C72]/10 outline-none transition-all placeholder:text-slate-400"
                  value={loginNumber}
                  onChange={(e) => setLoginNumber(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2 ml-1">
                Access Key / Password
              </label>
              <div className="relative">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input 
                  type="password"
                  placeholder="••••••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-semibold text-slate-900 focus:bg-white focus:border-[#1C1C72] focus:ring-2 focus:ring-[#1C1C72]/10 outline-none transition-all placeholder:text-slate-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.p 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-red-600 text-xs font-bold text-center bg-red-50 py-2 rounded-xl border border-red-200"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <button 
              type="submit" 
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#1C1C72] to-[#7B2DBF] hover:from-[#151559] hover:to-[#6823a3] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer" 
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className="text-slate-400 hover:text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 mx-auto transition-colors"
            >
              <Info className="h-3.5 w-3.5" />
              {showDetails ? "Hide Demo Credentials" : "Show Demo Credentials"}
            </button>

            <AnimatePresence>
              {showDetails && (
                <motion.div 
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mt-4 p-4 bg-amber-50/70 border border-amber-200 rounded-2xl text-left"
                >
                  <p className="text-[10px] text-amber-800 mb-2 uppercase tracking-widest font-black">Enthalpy Labs Credentials</p>
                  <div className="space-y-1 font-mono text-xs">
                    <p className="text-slate-700">Client ID: <span className="text-[#1C1C72] font-bold">AGN080426-1001</span> <span className="text-slate-400 font-sans">(or enthalpy)</span></p>
                    <p className="text-slate-700">Password: <span className="text-[#1C1C72] font-bold">enthalpy</span></p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <p className="mt-8 text-center text-slate-400 text-xs font-medium">
          &copy; {new Date().getFullYear()} AGNAA Design Studio &bull; Hyderabad
        </p>
      </motion.div>
    </div>
  );
}
