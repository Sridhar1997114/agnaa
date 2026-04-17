"use client";

import React from "react";
import { History, Activity } from "lucide-react";

export default function AdminActivity() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-display font-bold text-white mb-2">Audit & Activity</h1>
          <p className="text-brand-muted">Global tracking of all system and user interactions.</p>
        </div>
      </div>

      <div className="bg-[#14141F] border border-white/5 rounded-3xl p-8">
         <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/5">
            <Activity size={24} className="text-brand-orange" />
            <h3 className="text-xl font-bold text-white">Live Operations Feed</h3>
         </div>
         
         <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-brand-orange before:via-white/10 before:to-transparent">
            {/* Log Item */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
               <div className="flex items-center justify-center w-6 h-6 rounded-full border-4 border-[#0D0D14] bg-brand-orange text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-lg z-10" />
               <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-white/5 bg-white/5">
                  <div className="flex items-center justify-between mb-1">
                     <h4 className="font-bold text-white text-sm">System Automated Sync</h4>
                     <span className="text-[10px] text-brand-muted uppercase font-bold tracking-widest">Just now</span>
                  </div>
                  <p className="text-xs text-brand-muted">Global indexing of deliverables triggered successfully.</p>
               </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
               <div className="flex items-center justify-center w-6 h-6 rounded-full border-4 border-[#0D0D14] bg-white/10 text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-lg z-10" />
               <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-white/5 bg-[#14141F]">
                  <div className="flex items-center justify-between mb-1">
                     <h4 className="font-bold text-white text-sm">Client Login: Anita K.</h4>
                     <span className="text-[10px] text-brand-muted uppercase font-bold tracking-widest">2h ago</span>
                  </div>
                  <p className="text-xs text-brand-muted">Accessed dashboard and downloaded Granite Villa Contract.</p>
               </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
               <div className="flex items-center justify-center w-6 h-6 rounded-full border-4 border-[#0D0D14] bg-white/10 text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-lg z-10" />
               <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-white/5 bg-[#14141F]">
                  <div className="flex items-center justify-between mb-1">
                     <h4 className="font-bold text-white text-sm">Invoice INV-0012 Settled</h4>
                     <span className="text-[10px] text-brand-muted uppercase font-bold tracking-widest">1 day ago</span>
                  </div>
                  <p className="text-xs text-brand-muted">Payment of ₹ 15,00,000 processed for Vikarabad Residential.</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
