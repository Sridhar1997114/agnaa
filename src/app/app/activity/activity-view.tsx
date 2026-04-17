"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Zap, 
  History, 
  Search, 
  Filter, 
  ArrowUpRight 
} from "lucide-react";

interface ActivityViewProps {
  initialLogs: any[];
}

export default function ActivityView({ initialLogs }: ActivityViewProps) {
  return (
    <div className="space-y-10 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Project Activity Log</h1>
          <p className="text-brand-muted font-medium">A chronological audit trail of all project movements and studio interactions.</p>
        </div>
        <div className="flex items-center gap-3">
           <span className="px-4 py-2 bg-brand-violet/10 text-brand-violet border border-brand-violet/20 rounded-xl font-bold text-[10px] uppercase tracking-widest flex items-center gap-2">
             <Zap size={14} fill="currentColor" /> Real-time Audit
           </span>
        </div>
      </div>

      {/* Main Timeline Body */}
      <div className="max-w-4xl">
         <div className="space-y-8 relative">
            <div className="absolute left-[23px] top-6 bottom-6 w-[2px] bg-white/5" />
            
            {initialLogs.length > 0 ? initialLogs.map((log, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: i * 0.1 }}
                 className="flex items-start gap-8 relative z-10"
               >
                  <div className="flex flex-col items-center">
                     <div className="w-12 h-12 rounded-2xl bg-[#14141F] border border-white/10 flex items-center justify-center text-brand-violet shadow-xl group hover:border-brand-violet transition-colors">
                        <History size={20} className="group-hover:scale-110 transition-transform" />
                     </div>
                  </div>
                  <div className="flex-1 bg-[#14141F] border border-white/5 p-6 rounded-3xl group hover:border-brand-violet/30 transition-all shadow-xl">
                     <div className="flex justify-between items-start mb-2">
                        <div>
                           <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">{log.action}</h4>
                           <p className="text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em]">
                              {new Date(log.created_at).toLocaleDateString()} • {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                           </p>
                        </div>
                        <button className="p-2 rounded-lg bg-white/5 border border-white/5 text-brand-muted hover:text-white transition-all">
                           <ArrowUpRight size={14} />
                        </button>
                     </div>
                     <p className="text-sm text-brand-muted leading-relaxed font-medium">
                        {log.detail}
                     </p>
                  </div>
               </motion.div>
            )) : (
              <div className="bg-[#14141F] border border-white/5 rounded-3xl p-20 text-center">
                 <p className="text-brand-muted font-bold uppercase tracking-widest">No activity history detected.</p>
              </div>
            )}
         </div>
      </div>
    </div>
  );
}
