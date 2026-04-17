"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  Upload, 
  Search, 
  Filter,
  MoreVertical,
  Plus,
  Trash2,
  FolderOpen
} from "lucide-react";

const DOCUMENTS = [
  { id: 1, name: "Site_Plan_Revision_C.pdf", client: "Vikarabad Residential", type: "Blueprints", size: "8.4 MB", date: "Apr 12, 2024" },
  { id: 2, name: "Client_Agreement.pdf", client: "Granite Villa", type: "Contracts", size: "1.2 MB", date: "Jan 15, 2024" },
  { id: 3, name: "Excavation_Permit_04.pdf", client: "Vikarabad Residential", type: "Permits", size: "0.5 MB", date: "Feb 22, 2024" },
];

export default function AdminVault() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-display font-bold text-white mb-2">Vault Management</h1>
          <p className="text-brand-muted">Upload and manage documents across all clients.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" size={18} />
            <input 
              type="text" 
              placeholder="Search documents..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#14141F] border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-orange/50 w-64 transition-all"
            />
          </div>
          <button className="bg-brand-orange hover:bg-brand-orange/90 text-[#0D0D14] px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all">
            <Upload size={18} /> Upload Document
          </button>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-[#14141F] border border-white/5 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-white min-w-[800px]">
            <thead className="bg-white/5 text-brand-muted uppercase tracking-wider text-[10px] font-bold">
              <tr>
                <th className="px-6 py-4">Document Name</th>
                <th className="px-6 py-4">Client / Project</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Size</th>
                <th className="px-6 py-4">Date Uploaded</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {DOCUMENTS.map((doc) => (
                <tr key={doc.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-medium flex items-center gap-3">
                    <div className="p-2 bg-brand-orange/10 text-brand-orange rounded-lg">
                      <FileText size={16} />
                    </div>
                    {doc.name}
                  </td>
                  <td className="px-6 py-4 text-brand-muted">{doc.client}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-white/5 text-white/80 rounded-full text-[10px] uppercase font-bold tracking-widest flex items-center gap-1 w-fit">
                      <FolderOpen size={10} /> {doc.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-brand-muted font-mono text-xs">{doc.size}</td>
                  <td className="px-6 py-4 text-brand-muted">{doc.date}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-brand-muted hover:text-red-400 p-2 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
