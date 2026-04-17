"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  MoreVertical,
  HardDrive,
  CheckCircle2
} from "lucide-react";

interface DocumentsViewProps {
  initialDocuments: any[];
}

export default function DocumentsView({ initialDocuments }: DocumentsViewProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const filteredDocs = initialDocuments.filter(doc => {
    const matchesSearch = doc.title?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || doc.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">The Document Vault</h1>
          <p className="text-brand-muted font-medium">Access your architectural plans, site reports, and contracts securely.</p>
        </div>
        <div className="flex bg-[#14141F] rounded-2xl p-1 border border-white/5 shadow-xl">
           <button 
             onClick={() => setCategory("all")}
             className={`px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${category === 'all' ? 'bg-brand-violet text-white shadow-lg' : 'text-brand-muted hover:text-white'}`}
           >
             All Files
           </button>
           <button 
             onClick={() => setCategory("deliverable")}
             className={`px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${category === 'deliverable' ? 'bg-brand-violet text-white shadow-lg' : 'text-brand-muted hover:text-white'}`}
           >
             Deliverables
           </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         <StatsInline icon={HardDrive} label="Total Assets" value={`${initialDocuments.length} files`} />
         <StatsInline icon={CheckCircle2} label="Latest Version" value="v4.2.0 Active" />
         <StatsInline icon={FileText} label="Vault Security" value="SSL Encrypted" />
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between bg-[#14141F] p-4 rounded-2xl border border-white/5 shadow-xl">
         <div className="relative group flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted group-focus-within:text-brand-violet transition-colors" size={18} />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter drawings by title or category..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-brand-violet/30 transition-all font-medium"
            />
         </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredDocs.map((doc, i) => (
            <motion.div 
              key={doc.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.05 }}
              className="bg-[#14141F] border border-white/5 rounded-3xl p-6 hover:border-brand-violet/30 transition-all group shadow-xl relative overflow-hidden"
            >
               <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-brand-muted group-hover:text-brand-violet transition-colors">
                     <FileText size={22} />
                  </div>
                  <div className="flex gap-1">
                     <button title="Quick View" className="p-2 rounded-lg hover:bg-white/5 text-brand-muted hover:text-white transition-all"><Eye size={16} /></button>
                     <button title="Options" className="p-2 rounded-lg hover:bg-white/5 text-brand-muted hover:text-white transition-all"><MoreVertical size={16} /></button>
                  </div>
               </div>
               
               <h4 className="text-white font-bold mb-1 truncate text-lg group-hover:text-brand-violet transition-colors">{doc.title}</h4>
               <p className="text-[10px] text-brand-muted font-bold uppercase tracking-widest mb-6">
                  {doc.category || 'General Document'} • {new Date(doc.created_at).toLocaleDateString()}
               </p>

               <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex flex-col">
                     <span className="text-[9px] font-bold text-brand-muted uppercase tracking-tighter">Size</span>
                     <span className="text-xs font-bold text-white/80">4.8 MB</span>
                  </div>
                  <button className="px-5 py-2.5 rounded-xl bg-brand-violet text-white text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-brand-violet/20 flex items-center gap-2">
                     <Download size={14} /> Download
                  </button>
               </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function StatsInline({ icon: Icon, label, value }: any) {
  return (
    <div className="bg-[#14141F] border border-white/5 p-5 rounded-2xl flex items-center gap-4">
       <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-brand-violet/60">
          <Icon size={18} />
       </div>
       <div>
          <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-0.5">{label}</p>
          <p className="text-sm font-bold text-white">{value}</p>
       </div>
    </div>
  );
}
