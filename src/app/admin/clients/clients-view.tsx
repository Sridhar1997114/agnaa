"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Zap, 
  ExternalLink, 
  Edit, 
  MoreVertical, 
  Mail,
  Phone
} from "lucide-react";

interface AdminClientsViewProps {
  initialClients: any[];
}

export default function AdminClientsView({ initialClients }: AdminClientsViewProps) {
  const [search, setSearch] = useState("");

  const filteredClients = initialClients.filter(c => 
    c.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Client Management</h1>
          <p className="text-brand-muted font-medium">Manage and monitor all platform users and their Sridhar-Scores.</p>
        </div>
        <button className="px-6 py-4 bg-brand-gradient text-white rounded-2xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-brand-violet/20 hover:scale-[1.02] transition-all flex items-center gap-2">
          <Plus size={18} /> Add New Client
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
              placeholder="Search by name, email, or client ID..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-brand-violet/30 transition-all font-medium"
            />
         </div>
         <div className="flex gap-2">
            <button className="px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-brand-muted hover:text-white transition-all flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
               <Filter size={16} /> Filters
            </button>
         </div>
      </div>

      {/* Clients Table */}
      <div className="bg-[#14141F] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="border-b border-white/5 bg-white/[0.02]">
                     <th className="px-6 py-5 text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em]">Client Detail</th>
                     <th className="px-6 py-5 text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em]">Projects</th>
                     <th className="px-6 py-5 text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em]">Sridhar-Score</th>
                     <th className="px-6 py-5 text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em]">Financial Health</th>
                     <th className="px-6 py-5 text-right text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em]">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  <AnimatePresence mode="popLayout">
                    {filteredClients.map((client, i) => {
                      const totalBudget = client.projects?.reduce((sum: number, p: any) => sum + (p.budget || 0), 0) || 0;
                      const totalDue = client.projects?.reduce((sum: number, p: any) => sum + (p.balance_due || 0), 0) || 0;
                      return (
                        <motion.tr 
                          key={client.id}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ delay: i * 0.05 }}
                          className="hover:bg-white/[0.02] transition-colors group"
                        >
                           <td className="px-6 py-4">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-full bg-brand-navy/20 border border-brand-navy/30 flex items-center justify-center text-brand-navy font-bold text-sm">
                                    {client.full_name?.charAt(0)}
                                 </div>
                                 <div>
                                    <h4 className="text-sm font-bold text-white group-hover:text-brand-violet transition-colors">{client.full_name}</h4>
                                    <div className="flex items-center gap-3 text-[10px] font-bold text-brand-muted uppercase tracking-tighter">
                                       <span className="flex items-center gap-1"><Mail size={10} /> {client.email}</span>
                                    </div>
                                 </div>
                              </div>
                           </td>
                           <td className="px-6 py-4 text-sm font-semibold text-white">{client.projects?.length || 0} Projects</td>
                           <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                 <span className={`text-sm font-bold flex items-center gap-1 ${client.sridhar_score > 90 ? 'text-emerald-400' : client.sridhar_score > 80 ? 'text-brand-violet' : 'text-brand-navy'}`}>
                                    <Zap size={12} fill="currentColor" /> {client.sridhar_score || 0}
                                 </span>
                                 <div className="h-1 w-16 bg-white/5 rounded-full overflow-hidden">
                                    <div className={`h-full ${client.sridhar_score > 90 ? 'bg-emerald-400' : 'bg-brand-violet'}`} style={{ width: `${client.sridhar_score || 0}%` }} />
                                 </div>
                              </div>
                           </td>
                           <td className="px-6 py-4">
                              <div className="space-y-1">
                                 <p className="text-[10px] font-bold text-white">₹ {(totalBudget / 100000).toFixed(1)}L Total</p>
                                 <p className={`text-[10px] font-bold ${totalDue > 0 ? 'text-red-400' : 'text-emerald-400'}`}>₹ {(totalDue / 100000).toFixed(1)}L Due</p>
                              </div>
                           </td>
                           <td className="px-6 py-4">
                              <div className="flex items-center justify-end gap-1">
                                 <button title="View Details" className="p-2 rounded-lg hover:bg-white/5 text-brand-muted hover:text-white transition-all"><ExternalLink size={16} /></button>
                                 <button title="Edit" className="p-2 rounded-lg hover:bg-white/5 text-brand-muted hover:text-white transition-all"><Edit size={16} /></button>
                                 <button title="Manage" className="p-2 rounded-lg hover:bg-white/5 text-brand-muted hover:text-white transition-all"><MoreVertical size={16} /></button>
                              </div>
                           </td>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
               </tbody>
            </table>
         </div>
         {/* Footer */}
         <div className="px-6 py-5 bg-white/[0.01] border-t border-white/5 flex justify-between items-center">
            <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Client Ledger Status: Operational</p>
         </div>
      </div>
    </div>
  );
}
