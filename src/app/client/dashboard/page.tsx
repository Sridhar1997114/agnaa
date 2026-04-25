"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AgnaaLogo } from '@/components/AgnaaLogo';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  Activity, 
  LogOut,
  Sparkles,
  Zap,
  Globe,
  Search,
  Lock,
  Loader2,
  AlertCircle,
  FileText,
  Clock,
  TrendingUp
} from 'lucide-react';
import { getClientData, clientLogout } from '../actions';
import { Profile, Project, Invoice } from '@/lib/types/database';

export default function ClientDashboard() {
  const [data, setData] = useState<{ profile: Profile; projects: Project[]; invoices: Invoice[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const result = await getClientData();
      if ('error' in result) {
        setError(result.error as string);
        if (result.error === "Not authenticated") {
          router.push('/client');
        }
      } else {
        setData(result as any);
      }
      setLoading(false);
    }
    fetchData();
  }, [router]);

  const handleLogout = async () => {
    await clientLogout();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0D14] flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 text-[#7B2DBF] animate-spin mb-4" />
        <p className="text-gray-400 animate-pulse">Initializing Secure Portal...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#0D0D14] flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle className="h-16 w-16 text-red-500 mb-6" />
        <h2 className="text-2xl font-bold mb-2">Portal Access Error</h2>
        <p className="text-gray-400 mb-8 max-w-md">{error || "Unable to load dashboard data."}</p>
        <button 
          onClick={() => router.push('/client')}
          className="px-8 py-3 bg-[#7B2DBF] rounded-2xl font-bold hover:bg-[#6A25A5] transition-all"
        >
          Return to Login
        </button>
      </div>
    );
  }

  const { profile, projects, invoices } = data;
  const activeProject = projects[0]; // For now, show the latest project

  if (!activeProject) {
    return (
      <div className="min-h-screen bg-[#0D0D14] text-[#F0F0F6]">
        <header className="p-12 max-w-5xl mx-auto flex justify-between items-center">
          <AgnaaLogo className="h-10 w-auto" />
          <button onClick={handleLogout} className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
            <LogOut size={18} /> Logout
          </button>
        </header>
        <div className="flex flex-col items-center justify-center py-20 text-center px-6">
          <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-8">
            <Activity className="h-10 w-10 text-gray-600" />
          </div>
          <h1 className="text-3xl font-black mb-4">Welcome, {profile.full_name}</h1>
          <p className="text-gray-400 max-w-md">No active projects found in your portal yet. Once your project starts, you'll see real-time updates here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D14] text-[#F0F0F6] pb-20 selection:bg-[#7B2DBF]/30">
      <header className="relative py-12 px-6 overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute top-[-50%] left-[-20%] w-[100%] h-[100%] bg-[#1C1C72]/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-50%] right-[-20%] w-[100%] h-[100%] bg-[#7B2DBF]/5 blur-[150px] rounded-full" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-6">
              <AgnaaLogo className="h-10 w-auto" />
              <div className="hidden sm:block h-6 w-px bg-white/10" />
              <div className="hidden sm:flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">
                <span className="text-[#7B2DBF]">Client</span> Portal
              </div>
            </div>
            
            <button 
              onClick={handleLogout}
              className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-2 group"
            >
              <LogOut className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
              Logout
            </button>
          </div>

          <div className="grid md:grid-cols-[1fr,auto] gap-12 items-end">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 text-[10px] font-bold text-[#10B981] uppercase tracking-widest mb-6">
                <Activity className="h-3 w-3 animate-pulse" />
                Live Project Tracking
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 capitalize">
                {profile.full_name} <span className="text-gray-600 font-medium whitespace-nowrap">Portal</span>
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
                {activeProject.title} — Current Phase: <span className="text-white font-bold uppercase">{activeProject.status}</span>
              </p>
            </div>
            
            <div className="flex gap-8 bg-[#14141F] p-8 rounded-3xl border border-white/5 shadow-2xl">
              <div className="text-center">
                <div className="text-4xl font-black text-[#7B2DBF] mb-1">{activeProject.progress_percent}%</div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Progress</div>
              </div>
              <div className="w-px bg-white/5" />
              <div className="text-center">
                <div className="text-4xl font-black text-[#7B2DBF] mb-1">{invoices.length}</div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Invoices</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Section */}
      <section className="px-6 mb-20">
        <div className="max-w-5xl mx-auto bg-[#14141F] rounded-[40px] p-8 md:p-12 border border-white/5 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-24 bg-[#1C1C72]/10 blur-[100px] rounded-full group-hover:bg-[#1C1C72]/20 transition-all duration-1000" />
          
          <div className="flex justify-between items-end mb-8 relative z-10">
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Overall Completion</p>
              <h2 className="text-3xl md:text-4xl font-black text-white capitalize">
                {activeProject.status} <span className="text-gray-600">Phase</span>
              </h2>
            </div>
            <div className="text-5xl font-black text-[#1C1C72] opacity-50 group-hover:opacity-100 transition-opacity">
              {activeProject.progress_percent}%
            </div>
          </div>

          <div className="h-4 bg-black/40 rounded-full overflow-hidden mb-12 relative z-10 border border-white/5">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${activeProject.progress_percent}%` }}
              transition={{ duration: 2, ease: "circOut" }}
              className="h-full bg-gradient-to-r from-[#1C1C72] to-[#7B2DBF] rounded-full shadow-[0_0_20px_rgba(123,45,191,0.5)]"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4 relative z-10">
            <div className="bg-black/20 rounded-2xl p-6 border border-white/5 backdrop-blur-sm transition-transform hover:scale-105">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5 text-[#7B2DBF]" />
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Timeline</div>
              </div>
              <div className="text-xl font-bold">Standard Delivery</div>
            </div>
            <div className="bg-black/20 rounded-2xl p-6 border border-white/5 backdrop-blur-sm transition-transform hover:scale-105">
               <div className="flex items-center gap-3 mb-2">
                <FileText className="w-5 h-5 text-[#10B981]" />
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Documents</div>
              </div>
              <div className="text-xl font-bold">{invoices.length} Available</div>
            </div>
            <div className="bg-black/20 rounded-2xl p-6 border border-white/5 backdrop-blur-sm transition-transform hover:scale-105">
               <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Efficiency</div>
              </div>
              <div className="text-xl font-bold">High (Sridhar Score)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid of Main Services */}
       <section className="px-6 max-w-5xl mx-auto">
        <h3 className="text-2xl font-black mb-10 pb-6 border-b border-white/5 flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <Zap className="w-5 h-5 text-[#7B2DBF]" />
          </div>
          Project Lifecycle
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { id: 'proposal', label: 'Proposal', icon: <FileText size={20} />, done: activeProject.status !== 'proposal' },
            { id: 'design', label: 'Design', icon: <Sparkles size={20} />, done: !['proposal', 'design'].includes(activeProject.status) },
            { id: 'execution', label: 'Execution', icon: <Zap size={20} />, done: activeProject.status === 'completed' },
            { id: 'completed', label: 'Completed', icon: <CheckCircle2 size={20} />, done: activeProject.status === 'completed' }
          ].map((step, idx) => (
            <div 
              key={step.id} 
              className={`p-8 rounded-[32px] border transition-all ${step.done ? 'bg-[#10B981]/5 border-[#10B981]/20' : activeProject.status === step.id ? 'bg-[#7B2DBF]/5 border-[#7B2DBF]/30 ring-1 ring-[#7B2DBF]/50' : 'bg-[#14141F] border-white/5 opacity-50'}`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${step.done ? 'bg-[#10B981] text-[#0D0D14]' : activeProject.status === step.id ? 'bg-[#7B2DBF] text-white' : 'bg-white/5 text-gray-600'}`}>
                {step.done ? <CheckCircle2 size={24} strokeWidth={3} /> : step.icon}
              </div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Step {idx + 1}</p>
              <h4 className="text-xl font-black">{step.label}</h4>
            </div>
          ))}
        </div>

        <footer className="text-center py-20 text-[10px] font-bold text-gray-600 uppercase tracking-[0.5em] opacity-50">
          Crafted by AGNAA Design Studio &bull; 2026
        </footer>
      </section>
    </div>
  );
}
