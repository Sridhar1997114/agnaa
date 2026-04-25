"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, Boxes, Search, Zap } from "lucide-react";

const MICROSERVICES = [
  { id: "arch-design",      name: "Architecture Design",      category: "Core",           totalTasks: 40, completedTasks: 34, status: "active",       color: "orange", description: "Concept drawings, CAD, 3D renders, presentation boards" },
  { id: "interior-design",  name: "Interior Design",          category: "Core",           totalTasks: 35, completedTasks: 28, status: "active",       color: "amber",  description: "Space planning, material selection, lighting design" },
  { id: "construction-mgmt",name: "Construction Management",  category: "Core",           totalTasks: 50, completedTasks: 31, status: "active",       color: "orange", description: "Site coordination, timelines, QC, vendor management" },
  { id: "dpe-reports",      name: "DPE Reports",              category: "Core",           totalTasks: 20, completedTasks: 18, status: "completed",    color: "green",  description: "Development Potential Evaluation reports and site analysis" },
  { id: "ai-chatbot",       name: "AI Chatbot (JARVIS)",      category: "Platform",       totalTasks: 30, completedTasks: 22, status: "active",       color: "violet", description: "Conversational AI for client queries and site calculations" },
  { id: "estimate-engine",  name: "Estimate Engine",          category: "Platform",       totalTasks: 25, completedTasks: 20, status: "active",       color: "blue",   description: "Construction cost estimation and BOQ calculator suite" },
  { id: "client-portal",    name: "Client Portal (Pro)",      category: "Platform",       totalTasks: 45, completedTasks: 30, status: "active",       color: "violet", description: "Secure project dashboard for premium Agnaa clients" },
  { id: "brand-studio",     name: "Brand Studio",             category: "Platform",       totalTasks: 18, completedTasks: 18, status: "completed",    color: "green",  description: "Enthalpy Labs brand asset portal and style guides" },
  { id: "cost-calc",        name: "Cost Calculator Suite",    category: "Platform",       totalTasks: 22, completedTasks: 19, status: "active",       color: "amber",  description: "G+N floor estimator, commercial calculator, quick tools" },
  { id: "document-vault",   name: "Document Vault",           category: "Infrastructure", totalTasks: 15, completedTasks: 10, status: "in-progress", color: "amber",  description: "Secure file storage, retrieval, and client document sharing" },
  { id: "shop",             name: "Shop & Products",          category: "Infrastructure", totalTasks: 20, completedTasks: 8,  status: "in-progress", color: "orange", description: "E-commerce for materials, subscriptions, and merchandise" },
  { id: "admin-panel",      name: "Admin Panel",              category: "Infrastructure", totalTasks: 30, completedTasks: 20, status: "active",       color: "blue",   description: "Internal management: clients, invoices, project lifecycle" },
];

const COLOR_MAP: Record<string, { bar: string; badge: string; text: string; ring: string }> = {
  orange: { bar: "bg-gradient-to-r from-orange-500 to-amber-500", badge: "bg-orange-500/15 text-orange-300 border-orange-500/20", text: "text-orange-400", ring: "ring-orange-500/20" },
  amber:  { bar: "bg-gradient-to-r from-amber-400 to-yellow-400", badge: "bg-amber-500/15 text-amber-300 border-amber-500/20",   text: "text-amber-400",  ring: "ring-amber-500/20"  },
  violet: { bar: "bg-gradient-to-r from-violet-500 to-purple-500",badge: "bg-violet-500/15 text-violet-300 border-violet-500/20",text: "text-violet-400", ring: "ring-violet-500/20" },
  blue:   { bar: "bg-gradient-to-r from-blue-500 to-cyan-400",    badge: "bg-blue-500/15 text-blue-300 border-blue-500/20",      text: "text-blue-400",   ring: "ring-blue-500/15"   },
  green:  { bar: "bg-gradient-to-r from-emerald-500 to-green-400",badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",text: "text-emerald-400",ring:"ring-emerald-500/20"},
};

const STATUS_LABELS: Record<string, { label: string; dotColor: string }> = {
  active:        { label: "Active",      dotColor: "bg-orange-400" },
  completed:     { label: "Completed",   dotColor: "bg-emerald-400" },
  "in-progress": { label: "In Progress", dotColor: "bg-amber-400 animate-pulse" },
};

const CATEGORIES = ["All", "Core", "Platform", "Infrastructure"];

function pct(done: number, total: number) {
  return Math.round((done / total) * 100);
}

export default function MicroservicesPage() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = MICROSERVICES.filter((ms) => {
    const matchCat = filter === "All" || ms.category === filter;
    const matchQ   = ms.name.toLowerCase().includes(query.toLowerCase()) ||
                     ms.description.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  const totalTasks = MICROSERVICES.reduce((s, m) => s + m.totalTasks, 0);
  const doneTasks  = MICROSERVICES.reduce((s, m) => s + m.completedTasks, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-[11px] font-semibold text-orange-400/70 uppercase tracking-[0.2em] mb-2">
          Enthalpy Labs · Internal
        </p>
        <h1 className="text-3xl font-bold text-white tracking-tight">All Microservices</h1>
        <p className="text-white/35 text-sm mt-1">
          {doneTasks} of {totalTasks} tasks complete · {MICROSERVICES.length} services total
        </p>
      </div>

      {/* Filters + Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3.5 py-2 text-[12px] font-semibold rounded-xl border transition-all ${
                filter === cat
                  ? "bg-orange-500/15 border-orange-500/25 text-orange-300"
                  : "bg-white/4 border-white/8 text-white/40 hover:text-white/70 hover:bg-white/6"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-xs ml-auto">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services..."
            className="w-full bg-white/5 border border-white/8 rounded-xl pl-9 pr-4 py-2 text-[13px] text-white placeholder:text-white/20 focus:outline-none focus:border-orange-500/40 focus:ring-2 focus:ring-orange-500/10 transition-all"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((ms, i) => {
          const done = pct(ms.completedTasks, ms.totalTasks);
          const balance = ms.totalTasks - ms.completedTasks;
          const c = COLOR_MAP[ms.color];
          const st = STATUS_LABELS[ms.status];

          return (
            <motion.div
              key={ms.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className={`bg-white/4 border border-white/7 rounded-2xl p-6 hover:bg-white/6 hover:border-white/12 hover:ring-1 ${c.ring} transition-all group cursor-default`}
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-5">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-semibold text-white/25 uppercase tracking-widest">
                      {ms.category}
                    </span>
                  </div>
                  <h3 className="text-[15px] font-bold text-white leading-snug">{ms.name}</h3>
                  <p className="text-[11px] text-white/30 mt-1 line-clamp-2 leading-relaxed">{ms.description}</p>
                </div>
                <div className="ml-4 shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-[10px] font-bold ${c.badge}">
                  <div className={`w-1.5 h-1.5 rounded-full ${st.dotColor}`} />
                  <span className={`${c.text}`}>{st.label}</span>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[10px] text-white/30 font-semibold uppercase tracking-wider">Progress</span>
                  <span className={`text-xl font-bold ${c.text}`}>{done}%</span>
                </div>
                <div className="h-2 w-full bg-white/8 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${done}%` }}
                    transition={{ duration: 0.9, delay: 0.1 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                    className={`h-full rounded-full ${c.bar}`}
                  />
                </div>
              </div>

              {/* Done / Balance pills */}
              <div className="flex gap-3">
                <div className="flex-1 bg-emerald-500/8 border border-emerald-500/15 rounded-xl p-3 text-center">
                  <p className="text-[18px] font-bold text-emerald-400 leading-none">{ms.completedTasks}</p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <CheckCircle2 size={9} className="text-emerald-400/60" />
                    <p className="text-[9px] font-semibold text-emerald-400/60 uppercase tracking-wider">Done</p>
                  </div>
                </div>
                <div className="flex-1 bg-white/5 border border-white/8 rounded-xl p-3 text-center">
                  <p className="text-[18px] font-bold text-white/50 leading-none">{balance}</p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <Clock size={9} className="text-white/30" />
                    <p className="text-[9px] font-semibold text-white/30 uppercase tracking-wider">Left</p>
                  </div>
                </div>
                <div className="flex-1 bg-white/5 border border-white/8 rounded-xl p-3 text-center">
                  <p className="text-[18px] font-bold text-white/50 leading-none">{ms.totalTasks}</p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <Boxes size={9} className="text-white/30" />
                    <p className="text-[9px] font-semibold text-white/30 uppercase tracking-wider">Total</p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-white/20 text-sm font-medium">
          No services match your search.
        </div>
      )}
    </div>
  );
}
