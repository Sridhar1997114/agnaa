"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Zap, ShieldCheck, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/pro");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D14] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-violet/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        <div className="bg-[#14141F]/80 backdrop-blur-2xl border border-white/5 rounded-3xl p-8 shadow-2xl">
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="w-16 h-16 bg-brand-gradient rounded-2xl flex items-center justify-center shadow-2xl shadow-brand-violet/20 mb-6">
              <Zap size={32} className="text-white fill-white" />
            </div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">AGNAA PRO</h1>
            <p className="text-brand-muted text-sm tracking-wide uppercase font-semibold">Authorized Personnel Only</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-brand-muted uppercase tracking-widest px-1">Email Identifier</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-muted group-focus-within:text-brand-violet transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-violet/50 focus:ring-4 focus:ring-brand-violet/5 transition-all"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-brand-muted uppercase tracking-widest px-1">Secure Key</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-12 flex items-center pointer-events-none hidden" />
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-muted group-focus-within:text-brand-violet transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-violet/50 focus:ring-4 focus:ring-brand-violet/5 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg flex items-center gap-2"
              >
                <ShieldCheck size={16} />
                {error}
              </motion.div>
            )}

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-brand-gradient hover:opacity-90 text-white font-bold py-4 rounded-xl shadow-xl shadow-brand-violet/20 flex items-center justify-center gap-2 group transition-all"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Enter Vault <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-xs text-brand-muted italic">
              Access is restricted by military-grade encryption and biometric verification. 
              Unauthorized access attempts are logged and reported.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
