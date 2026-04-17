"use client";

import React, { useState, useEffect } from "react";
import { 
  FileText, 
  Search, 
  Filter, 
  Grid, 
  List as ListIcon, 
  Download, 
  ExternalLink,
  MoreVertical,
  ChevronRight,
  FolderOpen
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { getVaultFiles } from "@/app/pro/actions";

const CATEGORIES = ["All", "Blueprints", "Contracts", "Permits", "Invoices", "Site Photos"];

export default function DocumentVault() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFiles() {
      const { data, error } = await getVaultFiles();
      if (data) {
        // Map DB fields to UI fields
        const formatted = data.map((f: any) => ({
          id: f.id,
          name: f.title,
          category: f.description?.includes("Blueprint") ? "Blueprints" : "Site Photos", // Simple heuristic
          size: "---", // size not in deliverables table
          date: new Date(f.created_at).toLocaleDateString(),
          url: f.file_url,
        }));
        setFiles(formatted);
      }
      setLoading(false);
    }
    loadFiles();
  }, []);

  const filteredFiles = files.filter(f => 
    (activeCategory === "All" || f.category === activeCategory) &&
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header with Breadcrumbs */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-display font-bold text-white mb-2">Document Vault</h1>
          <p className="text-brand-muted">Secure, centralized access to your architectural assets.</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" size={18} />
            <input 
              type="text" 
              placeholder="Search assets..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-violet/50 w-64 transition-all"
            />
          </div>
          <button className="bg-white/5 border border-white/10 p-2 rounded-xl text-brand-muted hover:text-white transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 p-1 bg-[#14141F] border border-white/5 rounded-2xl w-fit">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
              activeCategory === cat 
                ? "bg-brand-violet text-white shadow-lg shadow-brand-violet/20" 
                : "text-brand-muted hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Folder Grid Presentation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredFiles.map((file, i) => (
            <motion.div
              layout
              key={file.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.05 }}
              className="bg-[#14141F]/60 backdrop-blur-sm border border-white/5 rounded-2xl p-5 group hover:border-brand-violet/30 hover:bg-[#14141F] transition-all cursor-pointer shadow-xl"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-brand-violet/10 rounded-2xl text-brand-violet group-hover:scale-110 transition-transform">
                  <FileText size={28} />
                </div>
                <button className="text-brand-muted hover:text-white transition-colors">
                  <MoreVertical size={20} />
                </button>
              </div>
              
              <div className="space-y-1 mb-6">
                <h3 className="text-white font-bold truncate group-hover:text-brand-violet transition-colors tracking-tight">{file.name}</h3>
                <p className="text-[10px] text-brand-muted uppercase tracking-widest font-semibold flex items-center gap-1">
                  <FolderOpen size={10} /> {file.category}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="text-[10px] text-brand-muted uppercase font-bold tracking-tighter">
                  {file.date} • {file.size}
                </div>
                <div className="flex gap-3">
                  <Download size={16} className="text-brand-muted hover:text-white transition-colors" />
                  <ExternalLink size={16} className="text-brand-muted hover:text-white transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredFiles.length === 0 && (
        <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-brand-muted">
            <Search size={32} />
          </div>
          <div className="space-y-1">
            <p className="text-white font-bold">No assets found</p>
            <p className="text-sm text-brand-muted">Try adjusting your filters or search query.</p>
          </div>
        </div>
      )}
    </div>
  );
}
