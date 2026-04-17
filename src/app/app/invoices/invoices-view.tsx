"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Receipt, 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Download,
  CreditCard,
  ArrowUpRight
} from "lucide-react";

interface InvoicesViewProps {
  initialInvoices: any[];
}

export default function InvoicesView({ initialInvoices }: InvoicesViewProps) {
  const [search, setSearch] = useState("");

  const filteredInvoices = initialInvoices.filter(inv => 
    inv.invoice_number?.toLowerCase().includes(search.toLowerCase()) ||
    inv.projects?.title?.toLowerCase().includes(search.toLowerCase())
  );

  const totalOutstanding = initialInvoices.reduce((sum, inv) => 
    inv.status !== 'paid' ? sum + (inv.amount || 0) : sum, 0
  );

  return (
    <div className="space-y-10 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Billing & Invoices</h1>
          <p className="text-brand-muted font-medium">Manage your project finances and download receipts.</p>
        </div>
      </div>

      {/* Finance Rollup Card */}
      <div className="bg-brand-navy/10 border border-brand-navy/20 rounded-3xl p-8 relative overflow-hidden group shadow-2xl">
         <div className="absolute -right-20 -top-20 w-80 h-80 bg-brand-violet/10 rounded-full blur-[100px] pointer-events-none" />
         <div className="flex flex-col md:flex-row justify-between items-center gap-10 relative z-10">
            <div className="flex items-center gap-6">
               <div className="w-16 h-16 bg-brand-gradient rounded-2xl flex items-center justify-center text-white shadow-xl shadow-brand-violet/20 flex-shrink-0">
                  <CreditCard size={32} />
               </div>
               <div>
                  <p className="text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em] mb-1">Outstanding Balance</p>
                  <p className="text-4xl font-display font-bold text-white">₹ {(totalOutstanding / 100000).toFixed(2)}L</p>
               </div>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
               <button className="flex-1 md:flex-none px-8 py-4 bg-white text-black rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-white/90 transition-all flex items-center justify-center gap-2 shadow-xl shadow-white/5">
                  Secure Checkout <ArrowUpRight size={16} />
               </button>
               <button className="flex-1 md:flex-none px-8 py-4 bg-white/5 border border-white/5 text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                  Payment History
               </button>
            </div>
         </div>
      </div>

      {/* Table Section */}
      <div className="bg-[#14141F] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
         <div className="p-4 border-b border-white/5 bg-white/[0.01]">
            <div className="relative group max-w-sm">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted group-focus-within:text-brand-violet transition-colors" size={16} />
               <input 
                 type="text" 
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 placeholder="Search by invoice number..."
                 className="w-full bg-white/5 border border-white/5 rounded-xl py-2.5 pl-11 pr-4 text-xs text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-brand-violet/30 transition-all font-medium"
               />
            </div>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="border-b border-white/5 bg-white/[0.02]">
                     <th className="px-6 py-5 text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em]">Invoice Detail</th>
                     <th className="px-6 py-5 text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em]">Project Reference</th>
                     <th className="px-6 py-5 text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em]">Amount</th>
                     <th className="px-6 py-5 text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em]">Status</th>
                     <th className="px-6 py-5 text-right text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em]">Download</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  <AnimatePresence mode="popLayout">
                    {filteredInvoices.map((inv, i) => (
                      <motion.tr 
                        key={inv.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ delay: i * 0.05 }}
                        className="hover:bg-white/[0.02] transition-colors group"
                      >
                         <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                               <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-brand-muted group-hover:text-brand-violet transition-colors">
                                  <Receipt size={18} />
                               </div>
                               <div>
                                  <h4 className="text-sm font-bold text-white group-hover:text-brand-violet transition-colors">{inv.invoice_number}</h4>
                                  <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Due {new Date(inv.created_at).toLocaleDateString()}</p>
                               </div>
                            </div>
                         </td>
                         <td className="px-6 py-4 text-xs font-bold text-white/80">{inv.projects?.title || 'N/A'}</td>
                         <td className="px-6 py-4 text-sm font-bold text-white">₹ {(inv.amount / 100000).toFixed(2)}L</td>
                         <td className="px-6 py-4">
                            <StatusBadge status={inv.status} />
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
    paid: { label: "Fully Paid", icon: CheckCircle2, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    pending: { label: "Payment Pending", icon: Clock, color: "text-brand-violet bg-brand-violet/10 border-brand-violet/20" },
    overdue: { label: "Overdue", icon: AlertCircle, color: "text-red-400 bg-red-500/10 border-red-500/20" },
  };

  const config = configs[status] || configs.pending;
  const Icon = config.icon;

  return (
    <span className={`px-3 py-1.5 rounded-xl text-[9px] font-bold uppercase tracking-widest border flex items-center gap-2 w-fit ${config.color}`}>
       <Icon size={12} /> {config.label}
    </span>
  );
}
