"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Zap, 
  Layout, 
  Download, 
  ExternalLink,
  ChevronRight
} from "lucide-react";

interface DeliverablesViewProps {
  initialDeliverables: any[];
}

export default function DeliverablesView({ initialDeliverables }: DeliverablesViewProps) {
  return (
    <div className="space-y-10 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Project Deliverables</h1>
          <p className="text-brand-muted font-medium">Final handovers, architectural renders, and technical drawings.</p>
        </div>
      </div>

      {/* Featured Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {initialDeliverables.length > 0 ? initialDeliverables.map((item, i) => (
            <motion.div 
               key={i}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="group relative bg-[#14141F] border border-white/5 rounded-3xl overflow-hidden shadow-2xl hover:border-brand-violet/40 transition-all"
            >
               {/* Preview Image Placeholder */}
               <div className="h-48 bg-brand-navy/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14141F] to-transparent z-10" />
                  <div className="absolute inset-0 flex items-center justify-center text-brand-violet/20 group-hover:scale-110 transition-transform duration-700">
                     <Layout size={100} />
                  </div>
                  <div className="absolute top-4 right-4 z-20">
                     <span className="px-3 py-1.5 bg-brand-violet text-white text-[9px] font-bold uppercase tracking-widest rounded-xl shadow-lg ring-4 ring-[#14141F]">
                        Final Version
                     </span>
                  </div>
               </div>

               <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-violet transition-colors">{item.title}</h3>
                  <p className="text-xs text-brand-muted font-medium mb-8 leading-relaxed">
                     Official architectural item uploaded for your review and handover.
                  </p>

                  <div className="flex gap-3">
                     <button className="flex-1 py-3 bg-brand-violet text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2">
                        <Download size={14} /> Download
                     </button>
                     <button className="p-3 bg-white/5 border border-white/5 text-brand-muted hover:text-white rounded-2xl transition-all">
                        <ExternalLink size={16} />
                     </button>
                  </div>
               </div>
            </motion.div>
         )) : (
            <div className="lg:col-span-3 py-20 bg-[#14141F] border border-white/5 rounded-3xl text-center">
               <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-muted">
                  <Layout size={32} />
               </div>
               <p className="text-brand-muted font-bold uppercase tracking-[0.2em]">No deliverables uploaded yet</p>
               <p className="text-[10px] text-brand-muted/60 mt-2 font-medium">Your studio team will upload final assets here.</p>
            </div>
         )}
      </div>
    </div>
  );
}
