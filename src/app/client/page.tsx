"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AgnaaLogo } from '@/components/AgnaaLogo';
import { Button } from '@/components/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { Key, User, Info, Loader2 } from 'lucide-react';

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

    // Mock authentication for Enthalpy Labs
    // In a real app, this would be an API call to Firebase/DB
    setTimeout(() => {
      if (loginNumber === 'AGN080426-1001' && password === 'enthalpy@agnaa') {
        localStorage.setItem('client_session', JSON.stringify({
          client: 'Enthalpy Labs',
          id: 'AGN080426-1001',
          lastLogin: new Date().toISOString()
        }));
        router.push('/client/enthalpy-labs');
      } else {
        setError('Invalid login number or password. Please try again.');
        setLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0D0D14] flex flex-col items-center justify-center p-6 font-sans text-[#F0F0F6]">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#1C1C72]/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#7B2DBF]/10 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <AgnaaLogo className="h-16 w-auto mx-auto mb-6" />
          <h1 className="text-3xl font-bold tracking-tight mb-2">Client Portal</h1>
          <p className="text-gray-400">Enter your credentials to access your project status</p>
        </div>

        <div className="bg-[#14141F] border border-white/5 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2 ml-1">Login Number</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input 
                  type="text"
                  placeholder="e.g. AGN080426-1001"
                  className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-[#7B2DBF] focus:ring-1 focus:ring-[#7B2DBF] outline-none transition-all placeholder:text-gray-600"
                  value={loginNumber}
                  onChange={(e) => setLoginNumber(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2 ml-1">Password</label>
              <div className="relative">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input 
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-[#7B2DBF] focus:ring-1 focus:ring-[#7B2DBF] outline-none transition-all placeholder:text-gray-600"
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
                  className="text-red-400 text-sm font-medium text-center"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <Button 
              type="submit" 
              className="w-full py-4 rounded-2xl" 
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Grant Access"
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className="text-gray-500 hover:text-white text-sm flex items-center justify-center gap-2 mx-auto transition-colors"
            >
              <Info className="h-4 w-4" />
              {showDetails ? "Hide Login Details" : "Get Login Details"}
            </button>

            <AnimatePresence>
              {showDetails && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 p-4 bg-[#7B2DBF]/5 border border-[#7B2DBF]/20 rounded-2xl text-left"
                >
                  <p className="text-xs text-gray-400 mb-2 uppercase tracking-widest font-bold">Demo Credentials</p>
                  <div className="space-y-1">
                    <p className="text-sm">Login #: <span className="text-[#F4B400] font-mono">AGN080426-1001</span></p>
                    <p className="text-sm">Password: <span className="text-[#F4B400] font-mono">enthalpy@agnaa</span></p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <p className="mt-8 text-center text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} AGNAA Design Studio. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}
