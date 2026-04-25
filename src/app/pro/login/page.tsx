"use client";

import React, { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { loginWithCredentials } from "@/app/pro/auth-actions";
import { Shield, Mail, Lock, ArrowRight, Loader2, AlertCircle, Zap } from "lucide-react";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await loginWithCredentials(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#070710] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] bg-orange-500/8 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[45%] h-[45%] bg-amber-400/6 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-orange-600/4 blur-[180px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[420px] z-10"
      >
        <div className="bg-[#0e0e1a]/90 backdrop-blur-3xl border border-white/8 rounded-3xl p-8 shadow-2xl shadow-black/60">
          
          {/* Logo + Brand */}
          <div className="flex flex-col items-center mb-10 text-center space-y-5">
            {/* EL Logomark */}
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 flex items-center justify-center shadow-2xl shadow-orange-500/30">
                <span className="font-bold text-2xl text-white tracking-tight">EL</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#0e0e1a] border border-white/10 flex items-center justify-center">
                <Zap size={10} className="text-orange-400 fill-orange-400" />
              </div>
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-white tracking-tight">Enthalpy Labs</h1>
              <p className="text-[11px] text-white/30 uppercase tracking-[0.25em] font-semibold">
                Internal Operations Portal
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-white/40 uppercase tracking-widest px-1">
                Email
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30 group-focus-within:text-orange-400 transition-colors duration-200">
                  <Mail size={16} />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  defaultValue="admin@enthalpylabs.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/8 transition-all duration-200"
                  placeholder="admin@enthalpylabs.com"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-white/40 uppercase tracking-widest px-1">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30 group-focus-within:text-orange-400 transition-colors duration-200">
                  <Lock size={16} />
                </div>
                <input
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/8 transition-all duration-200"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3.5 rounded-xl flex items-center gap-2.5"
              >
                <AlertCircle size={15} className="shrink-0" />
                {error}
              </motion.div>
            )}

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              disabled={isPending}
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-bold py-4 rounded-xl shadow-xl shadow-orange-500/25 flex items-center justify-center gap-2.5 group transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {isPending ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  <Shield size={16} />
                  Access Dashboard
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </motion.button>
          </form>

          {/* Footer note */}
          <p className="text-center text-[10px] text-white/20 mt-8 leading-relaxed">
            Restricted to Enthalpy Labs team members.
            <br />All access is monitored and logged.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
