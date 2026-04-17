"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Map, 
  CreditCard, 
  Briefcase, 
  TrendingUp, 
  Activity, 
  ArrowUpRight, 
  Zap,
} from "lucide-react";
import { ActivityLog } from "@/lib/types/database";

interface AdminDashboardViewProps {
  stats: {
    clientCount: number;
    projectCount: number;
    totalRevenue: number;
    docCount: number;
  };
  logs: ActivityLog[];
}

export default function AdminDashboardView({ stats, logs }: AdminDashboardViewProps) {
  const metrics = [
    { label: "Active Clients", value: stats.clientCount.toString(), sub: "Total Registered", icon: Users, trend: "up", color: "violet" },
    { label: "Active Projects", value: stats.projectCount.toString(), sub: "Firm-wide load", icon: Map, trend: "up", color: "navy" },
    { label: "Revenue Total", value: `₹ ${(stats.totalRevenue / 100000).toFixed(1)}L`, sub: "Lifetime Billing", icon: CreditCard, trend: "up", color: "emerald" },
    { label: "Documents Vault", value: stats.docCount.toString(), sub: "Scanned & Stored", icon: Briefcase, trend: "up", color: "violet" },
  ];

  return (
    <div className="space-y-10 pb-20">
      {/* Top Header */}
      <div className="flex justify-between items-center bg-[#14141F]/40 p-8 rounded-3xl border border-white/5 backdrop-blur-xl shadow-2xl">
        <div>
          <h2 className="text-3xl font-display font-bold text-white mb-2">Platform Overview</h2>
          <p className="text-brand-muted font-medium">Real-time operational metrics for Agnaa OS.</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl font-bold text-[10px] uppercase tracking-widest flex items-center gap-2">
            <Activity size={14} /> System Healthy
          </span>
        </div>
      </div>

      {/* High Level Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#14141F] border border-white/5 p-6 rounded-3xl relative overflow-hidden group shadow-xl"
          >
            <div className={`absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity ${stat.color === 'violet' ? 'text-brand-violet' : stat.color === 'navy' ? 'text-brand-navy' : 'text-emerald-400'}`}>
              <stat.icon size={80} />
            </div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className={`p-2.5 rounded-xl border transition-all ${stat.color === 'violet' ? 'bg-brand-violet/10 border-brand-violet/20 text-brand-violet' : stat.color === 'navy' ? 'bg-brand-navy/10 border-brand-navy/20 text-brand-navy' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'}`}>
                <stat.icon size={22} />
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/5 font-bold text-[10px] text-emerald-400">
                 <TrendingUp size={12} /> Live
              </div>
            </div>
            <h3 className="text-brand-muted text-[10px] uppercase tracking-widest font-bold mb-1 relative z-10">{stat.label}</h3>
            <p className="text-3xl font-display font-bold text-white mb-1 relative z-10">{stat.value}</p>
            <p className="text-[10px] text-brand-muted font-bold tracking-tight relative z-10">{stat.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Operational Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
         {/* Recent Activity Stream */}
         <section className="bg-[#14141F] border border-white/5 rounded-3xl p-8 shadow-2xl flex flex-col h-full">
            <div className="flex justify-between items-center mb-8">
               <h3 className="text-xl font-display font-bold text-white flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-brand-violet rounded-full" />
                  Recent Activity Log
               </h3>
               <button className="text-brand-muted hover:text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 group">
                  Full Audit <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
               </button>
            </div>

            <div className="space-y-4 flex-1">
               {logs.length > 0 ? logs.map((log, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-all group/item cursor-pointer">
                     <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-brand-violet group-hover/item:scale-150 transition-transform" />
                        <div>
                           <h4 className="text-sm font-bold text-white mb-0.5 uppercase">{log.action}</h4>
                           <p className="text-xs text-brand-muted font-medium">{log.detail} {(log as any).profiles?.full_name && `by ${(log as any).profiles.full_name}`}</p>
                        </div>
                     </div>
                     <p className="text-[10px] text-brand-muted font-bold uppercase tracking-widest">{new Date(log.created_at).toLocaleDateString()}</p>
                  </div>
               )) : (
                 <p className="text-brand-muted text-center py-8">No activity logs yet.</p>
               )}
            </div>
         </section>

         {/* Sridhar Score Monitor */}
         <section className="bg-brand-navy/10 border border-brand-navy/20 rounded-3xl p-8 relative overflow-hidden flex flex-col h-full">
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-brand-violet/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="flex items-center gap-4 mb-8">
               <div className="w-14 h-14 bg-brand-gradient rounded-2xl flex items-center justify-center text-white shadow-xl">
                  <Zap size={30} fill="currentColor" />
               </div>
               <div>
                  <h3 className="text-xl font-display font-bold text-white">Sridhar-Score™ Engine</h3>
                  <p className="text-brand-muted text-sm font-medium">Automatic client reliability assessment.</p>
               </div>
            </div>
            
            <div className="bg-[#14141F] rounded-2xl p-6 border border-white/5 space-y-6">
               <div className="flex justify-between items-end">
                  <div>
                     <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1">Portfolio Trust Index</p>
                     <p className="text-4xl font-display font-bold text-brand-violet">82.4</p>
                  </div>
                  <div className="text-right">
                     <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">+2.1% Improvement</p>
                     <p className="text-xs text-brand-muted font-medium">vs last quarter</p>
                  </div>
               </div>
               <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full w-[82%] bg-brand-gradient" />
               </div>
               <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 rounded-xl bg-white/5 border border-white/5">
                     <p className="text-[10px] font-bold text-brand-muted uppercase mb-1">Payments</p>
                     <p className="text-sm font-bold text-emerald-400">94%</p>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-white/5 border border-white/5">
                     <p className="text-[10px] font-bold text-brand-muted uppercase mb-1">Feedback</p>
                     <p className="text-sm font-bold text-brand-violet">78%</p>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-white/5 border border-white/5">
                     <p className="text-[10px] font-bold text-brand-muted uppercase mb-1">Loyalty</p>
                     <p className="text-sm font-bold text-brand-navy">88%</p>
                  </div>
               </div>
            </div>
            <button className="mt-8 w-full py-4 bg-brand-navy text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-xl">
               Run Full Re-assessment
            </button>
         </section>
      </div>
    </div>
  );
}
