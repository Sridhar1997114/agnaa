"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Receipt, 
  Search, 
  Filter, 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Download,
  MoreVertical,
  ExternalLink
} from "lucide-react";

interface AdminInvoicesViewProps {
  initialInvoices: any[];
}

export default function AdminInvoicesView({ initialInvoices }: AdminInvoicesViewProps) {
  const [search, setSearch] = useState("");

  const filteredInvoices = initialInvoices.filter(inv => 
    inv.invoice_number?.toLowerCase().includes(search.toLowerCase()) ||
    inv.projects?.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Invoice Control</h1>
          <p className="text-brand-muted font-medium">Firm-wide billing oversight and collection management.</p>
        </div>
        <button className="px-6 py-4 bg-brand-gradient text-white rounded-2xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-brand-violet/20 hover:scale-[1.02] transition-all flex items-center gap-2">
          <Plus size={18} /> Generate New Invoice
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between bg-[#14141F] p-4 rounded-2xl border border-white/5 shadow-xl">
         <div className="relative group flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted group-focus-within:text-brand-violet transition-colors" size={18} />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by invoice # or project title..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-brand-violet/30 transition-all font-medium"
            />
         </div>
         <div className="flex gap-2">
            <button className="px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-brand-muted hover:text-white transition-all flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
               <Filter size={16} /> Filters
            </button>
         </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-[#14141F] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="border-b border-white/5 bg-white/[0.02]">
                     <th className="px-6 py-5 text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em]">Invoice Detail</th>
                     <th className="px-6 py-5 text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em]">Project</th>
                     <th className="px-6 py-5 text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em]">Amount</th>
                     <th className="px-6 py-5 text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em]">Status</th>
                     <th className="px-6 py-5 text-right text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em]">Actions</th>
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
                               <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-muted group-hover:text-brand-violet transition-colors">
                                  <Receipt size={20} />
                               </div>
                               <div>
                                  <h4 className="text-sm font-bold text-white group-hover:text-brand-violet transition-colors">{inv.invoice_number}</h4>
                                  <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Issued {new Date(inv.created_at).toLocaleDateString()}</p>
                               </div>
                            </div>
                         </td>
                         <td className="px-6 py-4 text-xs font-bold text-white/80">{inv.projects?.title || 'N/A'}</td>
                         <td className="px-6 py-4 text-sm font-bold text-white">₹ {(inv.amount / 100000).toFixed(1)}L</td>
                         <td className="px-6 py-4">
                            <StatusBadge status={inv.status} />
                         </td>
                         <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-1">
                               <button title="Download PDF" className="p-2 rounded-lg hover:bg-white/5 text-brand-muted hover:text-white transition-all"><Download size={16} /></button>
                               <button title="View Project" className="p-2 rounded-lg hover:bg-white/5 text-brand-muted hover:text-white transition-all"><ExternalLink size={16} /></button>
                               <button title="More" className="p-2 rounded-lg hover:bg-white/5 text-brand-muted hover:text-white transition-all"><MoreVertical size={16} /></button>
                            </div>
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
