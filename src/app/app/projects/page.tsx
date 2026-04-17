"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Map, ChevronRight, LayoutGrid, List } from "lucide-react";
import Link from "next/link";

const PROJECTS = [
  { id: "1", title: "Vikarabad Residential", type: "Architecture", location: "Vikarabad, TS", progress: 65, status: "Execution" },
  { id: "2", title: "Granite Villa Renovation", type: "Interior Design", location: "Jubilee Hills", progress: 25, status: "Design" },
  { id: "3", title: "Lakeview Condo", type: "Architecture", location: "Gachibowli", progress: 0, status: "Lead" },
];

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">My Projects</h1>
          <p className="text-brand-muted">Manage and track all your ongoing projects with Agnaa.</p>
        </div>
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
           <button 
             onClick={() => setViewMode("grid")}
             className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-brand-violet text-white shadow-lg shadow-brand-violet/20" : "text-brand-muted hover:text-white"}`}
           >
             <LayoutGrid size={18} />
           </button>
           <button 
             onClick={() => setViewMode("list")}
             className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-brand-violet text-white shadow-lg shadow-brand-violet/20" : "text-brand-muted hover:text-white"}`}
           >
             <List size={18} />
           </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
         <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {["All Projects", "Execution", "Design", "Completed"].map((filter, i) => (
              <button 
                key={filter}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border whitespace-nowrap ${i === 0 ? "bg-brand-violet/10 border-brand-violet/30 text-brand-violet" : "bg-white/5 border-white/5 text-brand-muted hover:border-white/20 hover:text-white"}`}
              >
                {filter}
              </button>
            ))}
         </div>
         <div className="relative group min-w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted group-focus-within:text-brand-violet transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search projects by name..."
              className="w-full bg-[#14141F] border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-brand-violet/30 transition-all text-sm font-medium"
            />
         </div>
      </div>

      {/* Projects List */}
      <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
        {PROJECTS.map((project) => (
          <Link key={project.id} href={`/app/projects/${project.id}`}>
            <motion.div 
               whileHover={{ y: -4 }}
               className={`bg-[#14141F] border border-white/5 rounded-3xl p-6 hover:bg-white/[0.04] transition-all group cursor-pointer shadow-xl ${viewMode === "list" ? "flex flex-col md:flex-row md:items-center justify-between gap-6" : ""}`}
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-brand-muted group-hover:text-brand-violet transition-colors">
                  <Map size={24} />
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-lg font-bold text-white mb-0.5 truncate">{project.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-brand-muted font-medium">
                    <span>{project.type}</span>
                    <span>•</span>
                    <span className="truncate">{project.location}</span>
                  </div>
                </div>
              </div>

              <div className={`mt-6 md:mt-0 flex-1 max-w-xs space-y-2 ${viewMode === "list" ? "max-w-[200px]" : "mt-6 max-w-full"}`}>
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-brand-muted">
                  <span>Status: <span className="text-white">{project.status}</span></span>
                  <span>{project.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-brand-gradient" style={{ width: `${project.progress}%` }} />
                </div>
              </div>

              <div className={`${viewMode === "list" ? "" : "mt-6 pt-6 border-t border-white/5"} flex items-center justify-between`}>
                 <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-[#14141F] bg-slate-700 flex items-center justify-center text-[10px] font-bold text-white">TM</div>
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-[#14141F] bg-brand-violet/20 flex items-center justify-center text-[10px] font-bold text-brand-violet">+2</div>
                 </div>
                 <ChevronRight size={20} className="text-brand-muted group-hover:text-white transition-colors group-hover:translate-x-1" />
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
