"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Settings, 
  Shield, 
  Globe, 
  Mail, 
  Bell, 
  Cloud, 
  Key, 
  Smartphone,
  CheckCircle2,
  Save,
  Palette
} from "lucide-react";

export default function AdminSettingsPage() {
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");

  const handleSave = () => {
    setSaveStatus("saving");
    setTimeout(() => setSaveStatus("saved"), 1500);
    setTimeout(() => setSaveStatus("idle"), 4000);
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Studio Configuration</h1>
          <p className="text-brand-muted font-medium">Manage firm-wide branding, security, and integration preferences.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saveStatus === "saving"}
          className={`px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest shadow-lg transition-all flex items-center gap-2 group ${
            saveStatus === "saved" 
              ? "bg-emerald-500 text-white" 
              : "bg-brand-gradient text-white hover:scale-[1.02] shadow-brand-violet/20"
          }`}
        >
          {saveStatus === "saving" ? (
             <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : saveStatus === "saved" ? (
             <CheckCircle2 size={18} />
          ) : (
             <Save size={18} />
          )}
          {saveStatus === "saving" ? "Persisting..." : saveStatus === "saved" ? "Changes Applied" : "Save Global Settings"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         {/* Navigation Sidebar */}
         <div className="lg:col-span-3 space-y-2">
            <SettingsSidebarItem icon={Globe} label="Studio Profile" active />
            <SettingsSidebarItem icon={Shield} label="Security & Auth" />
            <SettingsSidebarItem icon={Mail} label="Comms & Email" />
            <SettingsSidebarItem icon={Palette} label="Branding" />
            <SettingsSidebarItem icon={Smartphone} label="Mobile App" />
            <SettingsSidebarItem icon={Cloud} label="Integrations" />
         </div>

         {/* Settings Form */}
         <div className="lg:col-span-9 space-y-8">
            <section className="bg-[#14141F] border border-white/5 rounded-3xl p-8 shadow-2xl">
               <h3 className="text-lg font-display font-bold text-white mb-8 border-b border-white/5 pb-4">Studio Identity</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Formal Studio Name</label>
                     <input type="text" defaultValue="Agnaa Interio Private Limited" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-violet/40 transition-all font-medium" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Public Domain</label>
                     <input type="text" defaultValue="agnaa.in" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-violet/40 transition-all font-medium" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                     <label className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Headquarters Address</label>
                     <textarea rows={3} defaultValue="Studio 7, High-Tech City, Phase 2, Hyderabad, TS 500081" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-violet/40 transition-all font-medium resize-none" />
                  </div>
               </div>
            </section>

            <section className="bg-[#14141F] border border-white/5 rounded-3xl p-8 shadow-2xl">
               <h3 className="text-lg font-display font-bold text-white mb-8 border-b border-white/5 pb-4">Revenue & Tax Configuration</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Default GST Rate</label>
                     <div className="relative">
                        <input type="number" defaultValue="18" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-violet/40 transition-all font-medium" />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-muted text-sm">%</span>
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Corporate Currency</label>
                     <select className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-violet/40 transition-all font-medium appearance-none">
                        <option>INR (₹) - Indian Rupee</option>
                        <option>USD ($) - US Dollar</option>
                        <option>AED (د.إ) - UAE Dirham</option>
                     </select>
                  </div>
               </div>
            </section>

            <section className="bg-red-500/5 border border-red-500/20 rounded-3xl p-8 shadow-2xl">
               <h3 className="text-lg font-display font-bold text-red-400 mb-4 flex items-center gap-2">
                  <Key size={20} />
                  Strict Access Zone
               </h3>
               <p className="text-xs text-brand-muted mb-8 leading-relaxed">System-wide data purges and architectural model resets can only be triggered by the Root User through Multi-Factor Authentication.</p>
               <button className="px-6 py-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-red-500/20 transition-all">
                  Perform Full System Snapshot
               </button>
            </section>
         </div>
      </div>
    </div>
  );
}

function SettingsSidebarItem({ icon: Icon, label, active }: any) {
  return (
    <button className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all group ${active ? 'bg-brand-violet/10 text-white shadow-sm ring-1 ring-brand-violet/20' : 'text-brand-muted hover:bg-white/5 hover:text-white'}`}>
       <Icon size={18} className={active ? 'text-brand-violet' : 'group-hover:text-white transition-colors'} />
       <span className="text-sm font-bold tracking-tight">{label}</span>
    </button>
  );
}
