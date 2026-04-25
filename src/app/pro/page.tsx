"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  CheckCircle2, Clock, TrendingUp, ArrowUpRight, Boxes,
  Activity, Zap, Loader2
} from "lucide-react";
import { getAdminStats, getActivityLogs } from "./actions";

// ─── Microservice Data ──────────────────────────────────────────────────────
// Keeping this as a definition for the services we track
const MICROSERVICES_CONFIG = [
  {
    id: "arch-design",
    name: "Architecture Design",
    category: "Core",
    totalTasks: 40,
    completedTasks: 34,
    status: "active",
    color: "orange",
    description: "Concept drawings, CAD, 3D renders",
  },
  {
    id: "interior-design",
    name: "Interior Design",
    category: "Core",
    totalTasks: 35,
    completedTasks: 28,
    status: "active",
    color: "amber",
    description: "Space planning, materials, lighting",
  },
  {
    id: "construction-mgmt",
    name: "Construction Management",
    category: "Core",
    totalTasks: 50,
    completedTasks: 31,
    status: "active",
    color: "orange",
    description: "Site coordination, timelines, QC",
  },
  {
    id: "dpe-reports",
    name: "DPE Reports",
    category: "Core",
    totalTasks: 20,
    completedTasks: 18,
    status: "completed",
    color: "green",
    description: "Development potential evaluation",
  },
  {
    id: "ai-chatbot",
    name: "AI Chatbot (JARVIS)",
    category: "Platform",
    totalTasks: 30,
    completedTasks: 22,
    status: "active",
    color: "violet",
    description: "Conversational AI for client queries",
  },
  {
    id: "estimate-engine",
    name: "Estimate Engine",
    category: "Platform",
    totalTasks: 25,
    completedTasks: 20,
    status: "active",
    color: "blue",
    description: "Construction cost estimation calculator",
  },
  {
    id: "client-portal",
    name: "Client Portal",
    category: "Platform",
    totalTasks: 45,
    completedTasks: 30,
    status: "active",
    color: "violet",
    description: "Pro dashboard for Agnaa clients",
  },
  {
    id: "brand-studio",
    name: "Brand Studio",
    category: "Platform",
    totalTasks: 18,
    completedTasks: 18,
    status: "completed",
    color: "green",
    description: "Enthalpy Labs brand asset portal",
  },
  {
    id: "document-vault",
    name: "Document Vault",
    category: "Infrastructure",
    totalTasks: 15,
    completedTasks: 10,
    status: "in-progress",
    color: "amber",
    description: "Secure file storage and retrieval",
  },
  {
    id: "shop",
    name: "Shop & Products",
    category: "Infrastructure",
    totalTasks: 20,
    completedTasks: 8,
    status: "in-progress",
    color: "orange",
    description: "E-commerce for materials and merch",
  },
  {
    id: "admin-panel",
    name: "Admin Panel",
    category: "Infrastructure",
    totalTasks: 30,
    completedTasks: 20,
    status: "active",
    color: "blue",
    description: "Internal ops management interface",
  },
  {
    id: "cost-calc",
    name: "Cost Calculator Suite",
    category: "Platform",
    totalTasks: 22,
    completedTasks: 19,
    status: "active",
    color: "amber",
    description: "G+N floor estimator and cost tools",
  },
];

const COLOR_MAP: Record<string, { bar: string; glow: string; badge: string; text: string }> = {
  orange:  { bar: "bg-gradient-to-r from-orange-500 to-amber-500",    glow: "shadow-orange-500/20", badge: "bg-orange-500/15 text-orange-300 border-orange-500/20", text: "text-orange-400" },
  amber:   { bar: "bg-gradient-to-r from-amber-400 to-yellow-400",    glow: "shadow-amber-500/20",  badge: "bg-amber-500/15 text-amber-300 border-amber-500/20",   text: "text-amber-400"  },
  violet:  { bar: "bg-gradient-to-r from-violet-500 to-purple-500",   glow: "shadow-violet-500/20", badge: "bg-violet-500/15 text-violet-300 border-violet-500/20", text: "text-violet-400" },
  blue:    { bar: "bg-gradient-to-r from-blue-500 to-cyan-400",       glow: "shadow-blue-500/20",   badge: "bg-blue-500/15 text-blue-300 border-blue-500/20",       text: "text-blue-400"   },
  green:   { bar: "bg-gradient-to-r from-emerald-500 to-green-400",   glow: "shadow-emerald-500/20",badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",text: "text-emerald-400"},
};

const STATUS_LABELS: Record<string, { label: string; icon: React.ReactNode }> = {
  active:      { label: "Active", icon: <Zap size={10} className="fill-current" /> },
  completed:   { label: "Done",   icon: <CheckCircle2 size={10} /> },
  "in-progress": { label: "In Progress", icon: <Clock size={10} /> },
};

function pct(done: number, total: number) {
  return Math.round((done / total) * 100);
}

// ─── Summary Stats ───────────────────────────────────────────────────────────
interface SummaryBarProps {
  stats: any;
  config: any[];
}

function SummaryBar({ stats, config }: SummaryBarProps) {
  const totalTasks = config.reduce((s, m) => s + m.totalTasks, 0);
  const doneTasks  = config.reduce((s, m) => s + m.completedTasks, 0);
  const overallPct = pct(doneTasks, totalTasks);
  const completed  = config.filter(m => m.status === "completed").length;
  const active     = config.filter(m => m.status === "active").length;

  const STATS = [
    { label: "Active Projects", value: stats?.projectCount || 0,   sub: "live in database",        icon: Boxes,       colorClass: "text-white" },
    { label: "Total Revenue",   value: `₹${(stats?.totalRevenue || 0).toLocaleString()}`, sub: `from all invoices`, icon: CheckCircle2, colorClass: "text-emerald-400" },
    { label: "Total Clients",   value: stats?.clientCount || 0,    sub: "registered accounts",      icon: Clock,        colorClass: "text-orange-400" },
    { label: "Active Services", value: active,       sub: `${completed} completed`,   icon: Activity,     colorClass: "text-violet-400" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {STATS.map((s, i) => {
        const Icon = s.icon;
        return (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white/4 border border-white/7 rounded-2xl p-5 group hover:bg-white/6 hover:border-white/10 transition-all"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="p-2 rounded-lg bg-white/5">
                <Icon size={16} className={s.colorClass} />
              </div>
            </div>
            <p className="text-2xl font-bold text-white mb-0.5">{s.value}</p>
            <p className="text-[10px] font-semibold text-white/35 uppercase tracking-widest">{s.label}</p>
            <p className="text-[10px] text-white/25 mt-0.5">{s.sub}</p>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Dashboard Page ─────────────────────────────────────────────────────────
export default function ProDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [statsRes, activityRes] = await Promise.all([
          getAdminStats(),
          getActivityLogs(),
        ]);
        
        if (statsRes.data) setStats(statsRes.data);
        if (activityRes.data) setActivities(activityRes.data);
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const totalTasks = MICROSERVICES_CONFIG.reduce((s, m) => s + m.totalTasks, 0);
  const doneTasks  = MICROSERVICES_CONFIG.reduce((s, m) => s + m.completedTasks, 0);
  const overallPct = pct(doneTasks, totalTasks);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
        <p className="text-white/40 text-sm font-medium animate-pulse">Initializing operations...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold text-orange-400/70 uppercase tracking-[0.2em] mb-2">
            Enthalpy Labs · Internal
          </p>
          <h1 className="text-3xl font-bold text-white tracking-tight">Operations Overview</h1>
          <p className="text-white/35 text-sm mt-1">
            Real-time progress across {MICROSERVICES_CONFIG.length} microservices
          </p>
        </div>
        <Link
          href="/pro/microservices"
          className="flex items-center gap-2 px-4 py-2.5 bg-orange-500/12 border border-orange-500/20 text-orange-300 text-sm font-semibold rounded-xl hover:bg-orange-500/20 transition-all"
        >
          All Services <ArrowUpRight size={15} />
        </Link>
      </div>

      {/* Summary Stats */}
      <SummaryBar stats={stats} config={MICROSERVICES_CONFIG} />

      {/* Overall Progress Bar */}
      <div className="bg-white/4 border border-white/7 rounded-2xl p-6">
        <div className="flex items-end justify-between mb-4">
          <div>
            <p className="text-sm font-semibold text-white">Overall Completion</p>
            <p className="text-[11px] text-white/35 mt-0.5">
              {doneTasks} of {totalTasks} tasks finished
            </p>
          </div>
          <span className="text-3xl font-bold text-white">{overallPct}%</span>
        </div>
        <div className="h-3 w-full bg-white/6 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${overallPct}%` }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full"
          />
        </div>
        <div className="flex justify-between text-[10px] text-white/25 mt-2 font-medium uppercase tracking-wider">
          <span>Start</span>
          <span>Target: 100%</span>
        </div>
      </div>

      {/* Microservice Grid — top 6 quickview */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <TrendingUp size={16} className="text-orange-400" />
            Service Progress
          </h2>
          <Link
            href="/pro/microservices"
            className="text-[11px] font-semibold text-white/30 hover:text-orange-300 transition-colors uppercase tracking-wider"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {MICROSERVICES_CONFIG.slice(0, 9).map((ms, i) => {
            const done = pct(ms.completedTasks, ms.totalTasks);
            const c = COLOR_MAP[ms.color];
            const st = STATUS_LABELS[ms.status];

            return (
              <motion.div
                key={ms.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white/4 border border-white/7 rounded-2xl p-5 hover:bg-white/6 hover:border-white/10 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-semibold text-white/30 uppercase tracking-widest mb-1">
                      {ms.category}
                    </p>
                    <h3 className="text-sm font-bold text-white leading-snug truncate">{ms.name}</h3>
                  </div>
                  <span className={`shrink-0 ml-3 flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold border ${c.badge}`}>
                    {st.icon} {st.label}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-[10px] mb-1.5">
                    <span className="text-white/30 font-medium">Progress</span>
                    <span className={`font-bold ${c.text}`}>{done}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/8 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${done}%` }}
                      transition={{ duration: 1, delay: 0.2 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      className={`h-full rounded-full ${c.bar}`}
                    />
                  </div>
                </div>

                {/* Task counts */}
                <div className="flex gap-3 text-[10px] font-semibold">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 size={10} />
                    <span>{ms.completedTasks} done</span>
                  </div>
                  <div className="h-3 w-px bg-white/10" />
                  <div className="flex items-center gap-1.5 text-white/30">
                    <Clock size={10} />
                    <span>{ms.totalTasks - ms.completedTasks} left</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
