"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Map, 
  DollarSign, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Folder,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";

interface ProjectDetailsViewProps {
  project: any;
}

export default function ProjectDetailsView({ project }: ProjectDetailsViewProps) {
  return (
    <div className="space-y-10 pb-20">
      {/* Header with Breadcrumb */}
      <div className="flex flex-col gap-6">
        <Link 
          href="/app/projects" 
          className="flex items-center gap-2 text-brand-muted hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest group w-fit"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-display font-bold text-white mb-2">{project.title}</h1>
            <p className="text-brand-muted font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-violet" />
              Project ID: {project.id.slice(0, 8).toUpperCase()}
            </p>
          </div>
          <StatusBadge status={project.status} />
        </div>
      </div>

      {/* Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Stats */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-[#14141F] border border-white/5 rounded-3xl p-8 shadow-2xl overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity text-brand-violet">
                 <Map size={120} />
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-8 flex items-center gap-3">
                 <span className="w-1.5 h-6 bg-brand-violet rounded-full" />
                 Engagement Summary
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                 <StatCard 
                    label="Contract Value" 
                    value={`₹ ${(project.budget / 100000).toFixed(1)}L`} 
                    icon={DollarSign}
                    sub="Total Project Cost"
                 />
                 <StatCard 
                    label="Balance Due" 
                    value={`₹ ${(project.balance_due / 100000).toFixed(1)}L`} 
                    icon={Clock}
                    sub="Outstanding Amount"
                    highlight={project.balance_due > 0}
                 />
                 <StatCard 
                    label="Timeline Status" 
                    value={project.status === 'execution' ? 'On Schedule' : 'In Design'} 
                    icon={Calendar}
                    sub="Projected Handover in 4 mo"
                 />
                 <StatCard 
                    label="Files Ready" 
                    value="12 Assets" 
                    icon={Folder}
                    sub="Drawings & Contacts"
                 />
              </div>

              {/* Progress Slider */}
              <div className="mt-12 space-y-3 relative z-10">
                 <div className="flex justify-between items-end">
                    <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Construction Progress</p>
                    <p className="text-lg font-display font-bold text-white">{project.progress_percent}%</p>
                 </div>
                 <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress_percent}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-brand-gradient shadow-[0_0_20px_rgba(124,58,237,0.3)]"
                    />
                 </div>
              </div>
           </div>
        </div>

        {/* Client Profile / Side Card */}
        <div className="space-y-6">
           <div className="bg-brand-navy/10 border border-brand-navy/20 rounded-3xl p-8 relative overflow-hidden h-full">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-brand-violet/10 rounded-full blur-[60px] pointer-events-none" />
              <h3 className="text-lg font-display font-bold text-white mb-6 relative z-10">Associated Client</h3>
              <div className="flex items-center gap-4 mb-8 relative z-10">
                 <div className="w-16 h-16 rounded-2xl bg-brand-gradient flex items-center justify-center text-white font-bold text-xl shadow-xl">
                    {project.profiles?.full_name?.charAt(0) || 'C'}
                 </div>
                 <div>
                    <h4 className="text-white font-bold text-lg leading-tight">{project.profiles?.full_name || 'Agnaa Client'}</h4>
                    <p className="text-brand-muted text-xs font-medium">{project.profiles?.email}</p>
                 </div>
              </div>
              <div className="space-y-4 relative z-10">
                 <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-[9px] font-bold text-brand-muted uppercase tracking-[0.2em] mb-1">Project Site</p>
                    <p className="text-sm font-bold text-white leading-relaxed">Jubilee Hills, Road No. 36<br/>Hyderabad, TS</p>
                 </div>
                 <button className="w-full py-4 bg-white/5 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all border border-white/5">
                    Contact Studio Manager
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, sub, highlight }: any) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-brand-muted">
         <Icon size={14} />
         <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
      </div>
      <p className={`text-2xl font-display font-bold ${highlight ? 'text-red-400' : 'text-white'}`}>{value}</p>
      <p className="text-[10px] text-brand-muted font-bold tracking-tight">{sub}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const configs: any = {
    execution: { label: "In Construction", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    design: { label: "Design Phase", color: "text-brand-violet bg-brand-violet/10 border-brand-violet/20" },
    proposal: { label: "Proposal", color: "text-brand-navy bg-brand-navy/10 border-brand-navy/20" },
  };

  const config = configs[status] || configs.design;

  return (
    <span className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] border ${config.color}`}>
       {config.label}
    </span>
  );
}
