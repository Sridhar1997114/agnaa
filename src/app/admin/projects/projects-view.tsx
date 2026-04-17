"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Map, 
  Search, 
  Filter, 
  Plus, 
  DollarSign,
  AlertCircle,
  TrendingUp,
  ArrowUpRight
} from "lucide-react";
import Link from "next/link";

interface AdminProjectsViewProps {
  initialProjects: any[];
}

export default function AdminProjectsView({ initialProjects }: AdminProjectsViewProps) {
  const [search, setSearch] = useState("");

  const filteredProjects = initialProjects.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.profiles?.full_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Project Control</h1>
          <p className="text-brand-muted font-medium">Internal oversight for every construction and design project.</p>
        </div>
        <button className="px-6 py-4 bg-brand-gradient text-white rounded-2xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-brand-violet/20 hover:scale-[1.02] transition-all flex items-center gap-2">
          <Plus size={18} /> Initiate New Project
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
              placeholder="Filter by project title, client or ID..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-brand-violet/30 transition-all font-medium"
            />
         </div>
         <div className="flex gap-2">
            <div className="flex bg-white/5 rounded-xl border border-white/5 p-1">
               <button className="px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest bg-brand-violet text-white shadow-lg">Active</button>
               <button className="px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest text-brand-muted hover:text-white">Archived</button>
            </div>
            <button className="px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-brand-muted hover:text-white transition-all flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
               <Filter size={16} /> Advanced
            </button>
         </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project, i) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="bg-[#14141F] border border-white/5 rounded-3xl p-6 hover:border-brand-violet/30 transition-all group shadow-2xl relative overflow-hidden"
          >
             <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                   <div className="w-14 h-14 bg-brand-navy/10 border border-brand-navy/20 rounded-2xl flex items-center justify-center text-brand-navy transition-colors group-hover:bg-brand-violet group-hover:text-white">
                      <Map size={24} />
                   </div>
                   <div>
                      <div className="flex items-center gap-2 mb-0.5">
                         <h4 className="text-lg font-bold text-white group-hover:text-brand-violet transition-colors">{project.title}</h4>
                      </div>
                      <p className="text-xs text-brand-muted font-medium flex items-center gap-1.5">
                         Client: <span className="text-white/80">{project.profiles?.full_name || 'N/A'}</span>
                      </p>
                   </div>
                </div>
                <StatusBadge status={project.status} />
             </div>

             <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                      <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                         <DollarSign size={10} /> Total Budget
                      </p>
                      <p className="text-lg font-display font-bold text-white leading-none">₹ {(project.budget / 100000).toFixed(1)}L</p>
                   </div>
                   <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                      <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                         <AlertCircle size={10} /> Status
                      </p>
                      <p className="text-lg font-display font-bold text-white leading-none capitalize">{project.status}</p>
                   </div>
                </div>

                <div className="space-y-2">
                   <div className="flex justify-between items-end">
                      <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Progress Overview</p>
                      <p className="text-[10px] font-bold text-white">{project.progress_percent}% completed</p>
                   </div>
                   <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <div className="h-full bg-brand-gradient" style={{ width: `${project.progress_percent}%` }} />
                   </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                   <div className="flex -space-x-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-[#14141F] bg-slate-800 flex items-center justify-center text-[10px] font-bold text-white/50">LD</div>
                      ))}
                   </div>
                   <div className="flex gap-2">
                      <Link href={`/app/projects/${project.id}`} className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-[10px] font-bold uppercase tracking-widest text-brand-muted hover:text-white transition-all border border-white/5">View Details</Link>
                      <button className="px-4 py-2 rounded-xl bg-brand-violet text-white text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-brand-violet/20">Manage</button>
                   </div>
                </div>
             </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const configs: any = {
    execution: { label: "Execution", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    design: { label: "In Design", color: "text-brand-violet bg-brand-violet/10 border-brand-violet/20" },
    proposal: { label: "Proposal", color: "text-brand-navy bg-brand-navy/10 border-brand-navy/20" },
  };

  const config = configs[status] || configs.design;

  return (
    <span className={`px-3 py-1.5 rounded-xl text-[9px] font-bold uppercase tracking-widest border ${config.color}`}>
       {config.label}
    </span>
  );
}
