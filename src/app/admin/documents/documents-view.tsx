"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  Search, 
  Filter, 
  Upload, 
  MoreVertical, 
  HardDrive, 
  Eye, 
  Download, 
  Trash2,
  Shield,
  EyeOff
} from "lucide-react";

interface AdminDocumentsViewProps {
  initialDocuments: any[];
}

export default function AdminDocumentsView({ initialDocuments }: AdminDocumentsViewProps) {
  const [search, setSearch] = useState("");

  const filteredDocs = initialDocuments.filter(doc => 
    doc.title?.toLowerCase().includes(search.toLowerCase()) ||
    doc.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Internal Document Hub</h1>
          <p className="text-brand-muted font-medium">Global management of all technical drawings, contracts, and project files.</p>
        </div>
        <div className="flex gap-3">
           <button className="px-6 py-4 bg-[#14141F] border border-white/5 text-brand-muted hover:text-white rounded-2xl text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2">
              <Shield size={18} className="text-brand-violet" /> Security Logs
           </button>
           <button className="px-6 py-4 bg-brand-gradient text-white rounded-2xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-brand-violet/20 hover:scale-[1.02] transition-all flex items-center gap-2">
              <Upload size={18} /> Upload New File
           </button>
        </div>
      </div>

      {/* Stats row for Admin docs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-[#14141F] border border-white/5 p-6 rounded-3xl flex items-center gap-6">
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-brand-violet">
               <HardDrive size={24} />
            </div>
            <div>
               <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1">Vault Status</p>
               <p className="text-xl font-display font-bold text-white">Cloud Encrypted</p>
            </div>
         </div>
         <div className="bg-[#14141F] border border-white/5 p-6 rounded-3xl flex items-center gap-6">
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-brand-navy">
               <FileText size={24} />
            </div>
            <div>
               <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1">Total Assets</p>
               <p className="text-xl font-display font-bold text-white">{initialDocuments.length} Items</p>
            </div>
         </div>
         <div className="bg-[#14141F] border border-white/5 p-6 rounded-3xl flex items-center gap-6">
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-emerald-400">
               <Eye size={24} />
            </div>
            <div>
               <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1">System Health</p>
               <p className="text-xl font-display font-bold text-white">99.9% Available</p>
            </div>
         </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between bg-[#14141F] p-4 rounded-2xl border border-white/5 shadow-xl">
         <div className="relative group flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted group-focus-within:text-brand-violet transition-colors" size={18} />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search documents by title or category..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-brand-violet/30 transition-all font-medium"
            />
         </div>
         <div className="flex gap-2">
            <button className="px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-brand-muted hover:text-white transition-all flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
               <Filter size={16} /> Filters
            </button>
         </div>
      </div>

      {/* Documents Table */}
      <div className="bg-[#14141F] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="border-b border-white/5 bg-white/[0.02]">
                     <th className="px-6 py-5 text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em]">Document Title</th>
                     <th className="px-6 py-5 text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em]">Category</th>
                     <th className="px-6 py-5 text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em]">Uploaded</th>
                     <th className="px-6 py-5 text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em]">Visibility</th>
                     <th className="px-6 py-5 text-right text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em]">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  <AnimatePresence mode="popLayout">
                    {filteredDocs.map((doc, i) => (
                      <motion.tr 
                        key={doc.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ delay: i * 0.05 }}
                        className="hover:bg-white/[0.02] transition-colors group"
                      >
                         <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                               <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-brand-muted group-hover:text-brand-violet transition-colors">
                                  <FileText size={18} />
                               </div>
                               <div>
                                  <h4 className="text-sm font-bold text-white group-hover:underline underline-offset-4 cursor-pointer transition-all">{doc.title}</h4>
                                  <p className="text-[10px] text-brand-muted font-medium">{doc.file_path.split('/').pop()}</p>
                               </div>
                            </div>
                         </td>
                         <td className="px-6 py-4">
                            <span className="text-[10px] font-bold text-brand-muted uppercase tracking-widest bg-white/5 px-2 py-1 rounded-md border border-white/5">
                               {doc.category || 'General'}
                            </span>
                         </td>
                         <td className="px-6 py-4 text-xs font-medium text-brand-muted">
                            {new Date(doc.created_at).toLocaleDateString()}
                         </td>
                         <td className="px-6 py-4">
                            <button className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[9px] font-bold uppercase tracking-widest transition-all ${doc.is_public ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                               {doc.is_public ? <Eye size={12} /> : <EyeOff size={12} />}
                               {doc.is_public ? 'Public' : 'Protected'}
                            </button>
                         </td>
                         <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-1">
                               <button title="Download" className="p-2 rounded-lg hover:bg-white/5 text-brand-muted hover:text-white transition-all"><Download size={16} /></button>
                               <button title="Delete" className="p-2 rounded-lg hover:bg-white/5 text-brand-muted hover:text-white transition-all"><Trash2 size={16} /></button>
                               <button title="More" className="p-2 rounded-lg hover:bg-white/5 text-brand-muted hover:text-white transition-all"><MoreVertical size={16} /></button>
                            </div>
                         </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}
