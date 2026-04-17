"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileCheck, Download, Calendar, Clock, CheckCircle2, XCircle, FileSearch, ShieldCheck } from "lucide-react";

interface Quotation {
  id: string;
  title: string;
  amount: number;
  status: string;
  version: number;
  expiry_date: string;
  created_at: string;
}

export default function QuotationsView({ quotations }: { quotations: Quotation[] }) {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Quotations</h1>
          <p className="text-brand-muted font-medium">Review and approve project proposals and cost estimates.</p>
        </div>
        <div className="px-5 py-3 rounded-2xl bg-[#14141F] border border-white/5 flex items-center gap-4 shadow-xl">
           <div className="w-10 h-10 rounded-xl bg-brand-violet/10 flex items-center justify-center text-brand-violet">
              <FileSearch size={20} />
           </div>
           <div>
              <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest leading-none mb-1">Active Proposals</p>
              <p className="text-xl font-display font-bold text-white leading-none">
                {quotations.filter(q => q.status === 'sent').length.toString().padStart(2, '0')} Waiting
              </p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
         {quotations.length === 0 ? (
           <div className="text-center py-20 bg-[#14141F] rounded-2xl border border-dashed border-white/10">
             <p className="text-brand-muted">No quotations found for your projects.</p>
           </div>
         ) : quotations.map((qt, i) => (
           <motion.div 
             key={qt.id}
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: i * 0.05 }}
             className="bg-[#14141F] border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/[0.04] transition-all group"
           >
              <div className="flex items-center gap-5">
                 <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${qt.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' : qt.status === 'rejected' ? 'bg-red-500/10 text-red-500' : 'bg-brand-violet/10 text-brand-violet'}`}>
                    <FileCheck size={22} />
                 </div>
                 <div>
                    <div className="flex items-center gap-3 mb-1">
                       <h4 className="text-md font-bold text-white">{qt.title}</h4>
                       <span className="text-[9px] font-bold text-brand-muted whitespace-nowrap bg-white/5 px-2 py-0.5 rounded border border-white/5 uppercase tracking-tighter self-center">v.{qt.version}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-brand-muted font-medium">
                       <span className="flex items-center gap-1.5"><Calendar size={12} /> {new Date(qt.created_at).toLocaleDateString()}</span>
                       <span className={`flex items-center gap-1.5 ${qt.status === 'sent' ? 'text-brand-violet animate-pulse' : ''}`}>
                          <Clock size={12} /> Expiry: {new Date(qt.expiry_date).toLocaleDateString()}
                       </span>
                    </div>
                 </div>
              </div>

              <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-2 text-right">
                 <p className="text-xl font-display font-bold text-white">₹ {qt.amount.toLocaleString()}</p>
                 <StatusBadge status={qt.status} />
              </div>

              <div className="flex items-center gap-3">
                 <button className="p-3 rounded-xl bg-white/5 border border-white/5 text-brand-muted hover:text-white hover:bg-white/10 transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                    <Download size={16} /> View Proposal
                 </button>
                 {qt.status === 'sent' && (
                    <button className="px-6 py-3 bg-brand-gradient text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-brand-violet/10 hover:scale-[1.02] transition-all">
                       Approve Now
                    </button>
                 )}
              </div>
           </motion.div>
         ))}
      </div>

      <div className="p-8 rounded-3xl bg-brand-violet/5 border border-brand-violet/10 flex flex-col md:flex-row items-center gap-8 shadow-2xl shadow-brand-violet/5 relative overflow-hidden group">
         <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-brand-violet/5 rounded-full blur-3xl group-hover:bg-brand-violet/10 transition-all pointer-events-none" />
         <div className="w-16 h-16 rounded-2xl bg-brand-violet/10 flex items-center justify-center text-brand-violet flex-shrink-0">
            <ShieldCheck size={32} />
         </div>
         <div className="flex-1 text-center md:text-left">
            <h4 className="text-xl font-display font-bold text-white mb-2 tracking-tight">Enterprise Compliance</h4>
            <p className="text-sm text-brand-muted leading-relaxed font-medium">All approved quotations are legally binding. Change orders initiated after approval will incur additional verification by the lead architect.</p>
         </div>
         <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl text-xs font-bold uppercase tracking-widest transition-all border border-white/10 whitespace-nowrap">
            Read Policy
         </button>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const configs: any = {
    approved: { label: "Approved", icon: CheckCircle2, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    sent: { label: "Waiting Review", icon: Clock, color: "text-brand-violet bg-brand-violet/10 border-brand-violet/20" },
    rejected: { label: "Declined", icon: XCircle, color: "text-red-400 bg-red-500/10 border-red-500/20" },
  };

  const config = configs[status] || configs.sent;
  const Icon = config.icon;

  return (
    <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider flex items-center gap-1.5 border ${config.color}`}>
       <Icon size={10} /> {config.label}
    </span>
  );
}
