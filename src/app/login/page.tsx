import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight, Loader2 } from "lucide-react";
import { login } from "@/lib/actions/auth";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const result = await login(formData);
    
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }
  return (
    <div className="min-h-screen bg-[#0D0D14] flex items-center justify-center p-4 font-sans selection:bg-brand-violet/30">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-violet/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-navy/20 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md z-10"
      >
        {/* Logo area */}
        <div className="text-center mb-8">
          <div className="inline-flex w-16 h-16 bg-brand-gradient rounded-2xl items-center justify-center shadow-2xl shadow-brand-violet/20 mb-6">
             <span className="font-display font-bold text-3xl text-white">A</span>
          </div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight">AGNAA PORTAL</h1>
          <p className="text-brand-muted mt-2 text-sm uppercase tracking-[0.2em]">Secure Access Only</p>
        </div>

        {/* Login Card */}
        <div className="bg-[#14141F]/80 backdrop-blur-xl border border-white/5 p-8 rounded-3xl shadow-2xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-xs font-medium">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-brand-muted uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted group-focus-within:text-brand-violet transition-colors" size={18} />
                <input 
                  type="email" 
                  name="email"
                  required
                  placeholder="name@company.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-brand-violet/30 focus:border-brand-violet/50 transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-semibold text-brand-muted uppercase tracking-wider">Password</label>
                <button type="button" className="text-[10px] font-bold text-brand-violet uppercase tracking-widest hover:text-white transition-colors">Forgot?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted group-focus-within:text-brand-violet transition-colors" size={18} />
                <input 
                  type="password" 
                  name="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-brand-violet/30 focus:border-brand-violet/50 transition-all font-medium"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-brand-gradient text-white font-bold py-4 rounded-2xl shadow-lg shadow-brand-violet/20 hover:shadow-brand-violet/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : (
                <>
                  Sign In to Portal
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-xs text-brand-muted">
              Don't have an account? <span className="text-white font-semibold cursor-pointer hover:text-brand-violet transition-colors underline underline-offset-4 tracking-tight">Contact Sridhar</span>
            </p>
          </div>
        </div>

        {/* Brand Footer */}
        <div className="mt-8 flex justify-center gap-6 opacity-40">
           <span className="text-[10px] text-white uppercase tracking-widest font-medium">Design Studio</span>
           <span className="text-[10px] text-white uppercase tracking-widest font-medium">Constructions</span>
           <span className="text-[10px] text-white uppercase tracking-widest font-medium">Foundation</span>
        </div>
      </motion.div>
    </div>
  );
}
