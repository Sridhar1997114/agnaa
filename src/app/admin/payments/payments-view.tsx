"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Wallet, 
  Search, 
  Filter, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Download,
  CreditCard,
  ArrowUpRight
} from "lucide-react";

interface AdminPaymentsViewProps {
  initialData: any[];
}

export default function AdminPaymentsView({ initialData }: AdminPaymentsViewProps) {
  const [search, setSearch] = useState("");

  const filtered = initialData.filter(inv => 
    inv.invoice_number?.toLowerCase().includes(search.toLowerCase()) ||
    inv.projects?.title?.toLowerCase().includes(search.toLowerCase())
  );

  const totalCollected = initialData.reduce((sum, inv) => 
    inv.status === 'paid' ? sum + (inv.amount || 0) : sum, 0
  );

  return (
    <div className="space-y-10 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Global Payments</h1>
          <p className="text-brand-muted font-medium">Firm-wide transaction history and revenue auditing.</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-[#14141F] border border-white/5 p-6 rounded-3xl flex items-center gap-6 shadow-xl">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400">
               <DollarSign size={24} />
            </div>
            <div>
               <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1">Total Collected</p>
               <p className="text-xl font-display font-bold text-white">₹ {(totalCollected / 100000).toFixed(2)}L</p>
            </div>
         </div>
         <div className="bg-[#14141F] border border-white/5 p-6 rounded-3xl flex items-center gap-6 shadow-xl">
            <div className="w-12 h-12 bg-brand-violet/10 rounded-2xl flex items-center justify-center text-brand-violet">
               <CreditCard size={24} />
            </div>
            <div>
               <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1">Active Transactions</p>
               <p className="text-xl font-display font-bold text-white">{filtered.length} Items</p>
            </div>
         </div>
         <div className="bg-[#14141F] border border-white/5 p-6 rounded-3xl flex items-center gap-6 shadow-xl">
            <div className="w-12 h-12 bg-brand-navy/10 rounded-2xl flex items-center justify-center text-brand-navy">
               <Clock size={24} />
            </div>
            <div>
               <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1">Average Clearing</p>
               <p className="text-xl font-display font-bold text-white">2.4 Days</p>
            </div>
         </div>
      </div>

      {/* Table Section */}
      <div className="bg-[#14141F] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
         <div className="p-4 border-b border-white/5 bg-white/[0.01] flex justify-between items-center">
            <div className="relative group max-w-sm flex-1">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted group-focus-within:text-brand-violet transition-colors" size={16} />
               <input 
                 type="text" 
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 placeholder="Search by invoice or project..."
                 className="w-full bg-white/5 border border-white/5 rounded-xl py-2.5 pl-11 pr-4 text-xs text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-brand-violet/30 transition-all font-medium"
               />
            </div>
            <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-brand-muted hover:text-white transition-all text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
               <Filter size={14} /> Filter Dates
            </button>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="border-b border-white/5 bg-white/[0.02]">
                     <th className="px-6 py-5 text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em]">Transaction / ID</th>
                     <th className="px-6 py-5 text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em]">Project</th>
                     <th className="px-6 py-5 text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em]">Amount</th>
                     <th className="px-6 py-5 text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em]">Status</th>
                     <th className="px-6 py-5 text-right text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em]">Receipt</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  <AnimatePresence mode="popLayout">
                    {filtered.map((item, i) => (
                      <motion.tr 
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ delay: i * 0.05 }}
                        className="hover:bg-white/[0.02] transition-colors group"
                      >
                         <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                               <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-muted group-hover:text-emerald-400 transition-colors">
                                  <Wallet size={18} />
                               </div>
                               <div>
                                  <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors uppercase">TXN-{item.id.slice(-6).toUpperCase()}</h4>
                                  <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">{new Date(item.created_at).toLocaleDateString()}</p>
                               </div>
                            </div>
                         </td>
                         <td className="px-6 py-4 text-xs font-bold text-white/80">{item.projects?.title || 'N/A'}</td>
                         <td className="px-6 py-4 text-sm font-bold text-white">₹ {(item.amount / 100000).toFixed(2)}L</td>
                         <td className="px-6 py-4">
                            <StatusBadge status={item.status} />
                         </td>
                         <td className="px-6 py-4 text-right">
                            <button className="p-3 rounded-xl bg-white/5 border border-white/5 text-brand-muted hover:text-white transition-all group-hover:scale-110">
                               <Download size={18} />
                            </button>
                         </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const configs: any = {
    paid: { label: "Confirmed", icon: CheckCircle2, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    pending: { label: "Awaiting", icon: Clock, color: "text-brand-violet bg-brand-violet/10 border-brand-violet/20" },
    overdue: { label: "Failed", icon: AlertCircle, color: "text-red-400 bg-red-500/10 border-red-500/20" },
  };

  const config = configs[status] || configs.pending;
  const Icon = config.icon;

  return (
    <span className={`px-3 py-1.5 rounded-xl text-[9px] font-bold uppercase tracking-widest border flex items-center gap-2 w-fit ${config.color}`}>
       <Icon size={12} /> {config.label}
    </span>
  );
}
