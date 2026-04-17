"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  Zap, 
  Layout, 
  Percent, 
  Layers, 
  Save, 
  RotateCcw,
  TrendingUp,
  ShieldCheck,
  Check,
  Edit2
} from "lucide-react";

export default function AdminTemplatesPage() {
  const [selectedTab, setSelectedTab] = useState<"pdfs" | "score" | "rules">("score");

  return (
    <div className="space-y-10 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Internal Operating Logic</h1>
          <p className="text-brand-muted font-medium">Fine-tune the algorithms, PDF templates, and automation rules that power the Agnaa OS.</p>
        </div>
        <div className="flex gap-3">
           <button className="px-6 py-4 bg-[#14141F] border border-white/5 text-brand-muted hover:text-white rounded-2xl text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2">
              <RotateCcw size={18} /> Reset Defaults
           </button>
           <button className="px-6 py-4 bg-brand-gradient text-white rounded-2xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-brand-violet/20 hover:scale-[1.02] transition-all flex items-center gap-2">
              <Save size={18} /> Deploy Changes
           </button>
        </div>
      </div>

      {/* Control Tabs */}
      <div className="flex gap-4 border-b border-white/5 pb-0.5 whitespace-nowrap overflow-x-auto no-scrollbar">
         {[
           { id: "score", label: "Sridhar-Score™ Calibration", icon: Zap },
           { id: "pdfs", label: "A4 PDF Templates", icon: FileText },
           { id: "rules", label: "Automation Rules", icon: Layers },
         ].map(tab => (
           <button 
             key={tab.id}
             onClick={() => setSelectedTab(tab.id as any)}
             className={`pb-4 px-6 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-3 transition-all relative ${selectedTab === tab.id ? 'text-brand-violet' : 'text-brand-muted hover:text-white'}`}
           >
              <tab.icon size={16} />
              {tab.label}
              {selectedTab === tab.id && (
                <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-brand-violet shadow-[0_-4px_12px_rgba(112,0,255,0.4)]" />
              )}
           </button>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         <div className="lg:col-span-2 space-y-10">
            {selectedTab === 'score' && (
               <section className="bg-[#14141F] border border-white/5 rounded-3xl p-8 space-y-8 shadow-2xl">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-brand-violet/10 rounded-xl flex items-center justify-center text-brand-violet">
                        <Percent size={24} />
                     </div>
                     <div>
                        <h3 className="text-xl font-display font-bold text-white leading-none mb-1">Weightage Matrix</h3>
                        <p className="text-brand-muted text-sm font-medium">Define how different client interactions affect their final reliability score.</p>
                     </div>
                  </div>

                  <div className="space-y-6">
                     <ScoreFactor label="Payment Promptness" description="Impact of on-time invoice settlements" weight={40} />
                     <ScoreFactor label="Engagement Frequency" description="Logins and document interaction rates" weight={25} />
                     <ScoreFactor label="Response Latency" description="Time taken to approve quotations/designs" weight={20} />
                     <ScoreFactor label="Longevity/Loyalty" description="Relationship duration and repeat business" weight={15} />
                  </div>

                  <div className="p-6 rounded-2xl bg-brand-violet/5 border border-brand-violet/10 flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <TrendingUp size={20} className="text-brand-violet" />
                        <div>
                           <p className="text-sm font-bold text-white">Current Model: V2.4 Standard</p>
                           <p className="text-[10px] text-brand-muted font-bold uppercase">Last trained: 4 days ago</p>
                        </div>
                     </div>
                     <span className="px-3 py-1 bg-brand-violet text-white text-[9px] font-bold rounded-full uppercase tracking-widest">Active Model</span>
                  </div>
               </section>
            )}

            {selectedTab === 'pdfs' && (
               <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <TemplateCard title="Quotation V3" description="Premium formal proposal with detailed itemization." status="live" />
                  <TemplateCard title="Tax Invoice V2" description="Tax-compliant commercial invoice with GST." status="live" />
                  <TemplateCard title="Delivery Note V1" description="Proof of deliverable hand-off for sign-off." status="draft" />
                  <TemplateCard title="Change Order V1" description="Dynamic cost adjustment document for variations." status="draft" />
               </section>
            )}

            {selectedTab === 'rules' && (
               <section className="bg-[#14141F] border border-white/5 rounded-3xl p-8 space-y-6 shadow-2xl">
                  <h3 className="text-lg font-display font-bold text-white flex items-center gap-3">
                     <ShieldCheck size={20} className="text-brand-navy" />
                     Gating & Access Policy
                  </h3>
                  <div className="space-y-4">
                     <RuleToggle label="Lock High-Res Files" description="Automatically hide DWG/Source files until final balance is ₹ 0." checked={true} />
                     <RuleToggle label="Auto-Late-Fees" description="Apply 2% monthly interest on invoices overdue by 15 days." checked={false} />
                     <RuleToggle label="Client Activity Alerts" description="Notify Admins via email for every client login." checked={true} />
                     <RuleToggle label="Automatic Feedback Request" description="Trigger NPS survey after project 'Completion' status." checked={true} />
                  </div>
               </section>
            )}
         </div>

         {/* Right Sidebar */}
         <div className="space-y-8">
            <div className="bg-[#14141F] border border-white/5 p-6 rounded-3xl shadow-xl">
               <h4 className="text-md font-bold text-white mb-6">Algorithm Insight</h4>
               <div className="space-y-6">
                  <div className="flex justify-between items-center">
                     <span className="text-xs text-brand-muted font-medium">Computation Complexity</span>
                     <span className="text-xs font-bold text-white">Low</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-xs text-brand-muted font-medium">Data Integrity Hash</span>
                     <span className="text-xs font-bold text-emerald-400">Verified</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-xs text-brand-muted font-medium">Trigger Precision</span>
                     <span className="text-xs font-bold text-brand-violet">99.2%</span>
                  </div>
               </div>
            </div>

            <div className="p-8 rounded-3xl bg-brand-gradient text-white shadow-2xl shadow-brand-violet/20 relative overflow-hidden group">
               <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
               <Zap size={40} fill="white" className="mb-6 opacity-30 group-hover:opacity-100 transition-opacity" />
               <h4 className="text-xl font-display font-bold mb-2">Simulate Re-calibration</h4>
               <p className="text-xs font-medium text-white/80 leading-relaxed mb-6">Run a hypothetical recalibration of all Sridhar-Scores based on the current weightage matrix before deploying.</p>
               <button className="w-full py-4 bg-white text-brand-violet text-[10px] font-bold uppercase tracking-widest rounded-xl hover:scale-105 transition-all shadow-xl font-display">
                  Run Simulation Mode
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}

function ScoreFactor({ label, description, weight }: any) {
  return (
    <div className="space-y-3 group">
      <div className="flex justify-between items-end">
         <div>
            <h4 className="text-sm font-bold text-white transition-colors group-hover:text-brand-violet">{label}</h4>
            <p className="text-[10px] text-brand-muted font-medium italic">{description}</p>
         </div>
         <span className="text-xs font-bold text-brand-violet bg-brand-violet/10 px-2 py-1 rounded-lg">{weight}%</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
         <motion.div 
           initial={{ width: 0 }}
           animate={{ width: `${weight}%` }}
           className="h-full bg-brand-violet shadow-[0_0_12px_rgba(112,0,255,0.4)]" 
         />
      </div>
    </div>
  );
}

function TemplateCard({ title, description, status }: any) {
  return (
    <div className="bg-[#14141F] border border-white/5 p-6 rounded-3xl hover:border-brand-violet transition-all group shadow-xl">
       <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-brand-muted group-hover:text-white transition-colors">
             <Layout size={20} />
          </div>
          <span className={`px-3 py-1 text-[8px] font-bold rounded-md uppercase tracking-widest flex items-center gap-1.5 ${status === 'live' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-brand-violet/10 text-brand-violet border border-brand-violet/20'}`}>
             {status === 'live' ? <Check size={10} /> : <div className="w-1.5 h-1.5 rounded-full bg-brand-violet animate-pulse" />} {status}
          </span>
       </div>
       <h4 className="text-md font-bold text-white mb-2">{title}</h4>
       <p className="text-xs text-brand-muted leading-relaxed font-medium mb-6">{description}</p>
       <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-[9px] font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 border border-white/5 text-white">
          <Edit2 size={14} /> Customize Editor
       </button>
    </div>
  );
}

function RuleToggle({ label, description, checked }: any) {
  const [val, setVal] = useState(checked);
  return (
    <div className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.01] border border-white/5 hover:bg-white/[0.04] transition-all cursor-pointer" onClick={() => setVal(!val)}>
       <div className="pr-10">
          <h4 className="text-sm font-bold text-white mb-1">{label}</h4>
          <p className="text-[10px] text-brand-muted font-medium">{description}</p>
       </div>
       <div className={`w-12 h-6 rounded-full p-1 transition-all flex ${val ? 'bg-brand-violet justify-end' : 'bg-white/10 justify-start'}`}>
          <div className="w-4 h-4 bg-white rounded-full shadow-lg" />
       </div>
    </div>
  );
}
