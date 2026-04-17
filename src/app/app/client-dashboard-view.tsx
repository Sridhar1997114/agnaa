"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Zap, 
  ChevronRight, 
  Map, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  CreditCard,
  ArrowUpRight,
  FileText
} from "lucide-react";
import Link from "next/link";
import { Project, Profile, ActivityLog } from "@/lib/types/database";

interface ClientDashboardViewProps {
  projects: Project[];
  profile: Profile;
  logs: ActivityLog[];
  stats: any;
}

export default function ClientDashboardView({ projects, profile, logs, stats }: ClientDashboardViewProps) {
  return (
    <div className="space-y-10 pb-12">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-display font-bold text-white mb-2">Projects Overview</h1>
          <p className="text-brand-muted font-medium">Welcome back, {profile?.full_name || 'Client'}.</p>
        </div>
        <div className="flex items-center gap-4 bg-[#14141F] p-2 rounded-2xl border border-white/5 shadow-2xl">
          <div className="px-5 py-3 rounded-xl bg-brand-violet/10 border border-brand-violet/20">
             <div className="flex justify-between items-center gap-8 mb-1">
                <span className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Sridhar-Score</span>
                <span className="text-xs font-bold text-brand-violet flex items-center gap-1"><Zap size={12} fill="currentColor" /> {profile?.sridhar_score || 0}/100</span>
             </div>
             <div className="h-1.5 w-40 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${profile?.sridhar_score || 0}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-brand-gradient" 
                />
             </div>
          </div>
        </div>
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard 
          label="Financial Summary" 
          title={`₹ ${(stats.balanceDue / 100000).toFixed(2)}L`} 
          sub="Balance Due" 
          icon={CreditCard} 
          trend={`₹ ${(stats.paidAmount / 100000).toFixed(2)}L Paid`}
          color="violet"
        />
        <MetricCard 
          label="Active Projects" 
          title={stats.activeProjects.toString().padStart(2, '0')} 
          sub="Current Active" 
          icon={Map} 
          trend="Syncing Real-time"
          color="navy"
        />
        <MetricCard 
          label="Action Required" 
          title={stats.pendingActions.toString().padStart(2, '0')} 
          sub="Pending Items" 
          icon={AlertCircle} 
          trend="Invoices & Feedback"
          color="red"
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Project Status */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-end">
            <h3 className="text-xl font-display font-bold text-white flex items-center gap-3">
              <span className="w-1.5 h-6 bg-brand-violet rounded-full" />
              Active Projects
            </h3>
            <Link href="/app/projects" className="text-brand-muted hover:text-white text-sm font-semibold transition-colors flex items-center gap-1 group">
              View All <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="space-y-4">
            {projects.length > 0 ? projects.slice(0, 3).map((project) => (
              <ProjectRow 
                key={project.id}
                id={project.id}
                title={project.title} 
                type="Architecture" // Should come from a category field if added
                location="Hyderabad" // Should come from a location field
                progress={project.progress_percent}
                status={project.status}
              />
            )) : (
              <div className="bg-[#14141F] border border-white/5 p-12 rounded-3xl text-center">
                <p className="text-brand-muted">No active projects found.</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Activity */}
        <div className="space-y-6">
          <h3 className="text-xl font-display font-bold text-white flex items-center gap-3">
            <span className="w-1.5 h-6 bg-brand-navy rounded-full" />
            Recent Activity
          </h3>
          <div className="bg-[#14141F] border border-white/5 rounded-3xl p-6 space-y-6">
             {logs.length > 0 ? logs.slice(0, 4).map((log) => (
               <ActivityItem 
                 key={log.id}
                 action={log.action} 
                 detail={log.detail}
                 time={new Date(log.created_at).toLocaleDateString()}
                 icon={log.category === 'finance' ? CreditCard : FileText}
                 iconColor={log.category === 'finance' ? "text-brand-violet" : "text-brand-navy"}
               />
             )) : (
               <p className="text-brand-muted text-center text-sm py-4">No recent activity.</p>
             )}
             <Link href="/app/activity" className="block text-center w-full py-3 rounded-xl border border-white/5 text-brand-muted text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-all mt-4">
               View Full History
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, title, sub, icon: Icon, trend, color }: any) {
  const colorMap: any = {
    violet: "bg-brand-violet/10 text-brand-violet border-brand-violet/20",
    navy: "bg-brand-navy/10 text-brand-navy border-brand-navy/20",
    red: "bg-red-500/10 text-red-500 border-red-500/20"
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-[#14141F] border border-white/5 p-6 rounded-3xl relative overflow-hidden group shadow-xl"
    >
      <div className="absolute top-0 right-0 p-6 opacity-5 rotate-12 group-hover:rotate-0 transition-transform">
        <Icon size={80} />
      </div>
      <div className="flex justify-between items-start mb-6">
        <div className={`p-3 rounded-2xl ${colorMap[color]} transition-all border`}>
          <Icon size={24} />
        </div>
        <ArrowUpRight size={20} className="text-brand-muted group-hover:text-white transition-colors" />
      </div>
      <div>
        <p className="text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em] mb-1">{label}</p>
        <h4 className="text-3xl font-display font-bold text-white mb-1 tracking-tight">{title}</h4>
        <div className="flex items-center gap-2">
           <p className="text-xs text-brand-muted font-medium">{sub}</p>
           <div className="w-1 h-1 rounded-full bg-brand-muted/30" />
           <p className="text-xs font-bold text-white/80">{trend}</p>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectRow({ id, title, type, location, progress, status }: any) {
  return (
    <Link href={`/app/projects/${id}`}>
      <div className="bg-[#14141F] border border-white/5 p-6 rounded-3xl hover:bg-white/[0.04] transition-all group cursor-pointer shadow-lg mb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-brand-muted group-hover:text-brand-violet transition-colors">
              <Map size={24} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-0.5">{title}</h4>
              <div className="flex items-center gap-2 text-xs text-brand-muted">
                <span>{type}</span>
                <span>•</span>
                <span>{location}</span>
              </div>
            </div>
          </div>
          <div className="flex-1 max-w-xs space-y-2">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-brand-muted">
              <span>Status: <span className="text-white uppercase">{status}</span></span>
              <span>{progress}%</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
              <div className="h-full bg-brand-gradient" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 bg-brand-violet/10 text-brand-violet text-[10px] font-bold rounded-lg uppercase tracking-wider border border-brand-violet/20 group-hover:bg-brand-gradient group-hover:text-white transition-all">
              Open Details
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function ActivityItem({ action, detail, time, icon: Icon, iconColor }: any) {
  return (
    <div className="flex gap-4 group">
      <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center ${iconColor} border border-white/10`}>
        <Icon size={14} />
      </div>
      <div>
        <h5 className="text-sm font-bold text-white mb-0.5 group-hover:text-brand-violet transition-colors">{action}</h5>
        <p className="text-xs text-brand-muted leading-snug mb-1">{detail}</p>
        <span className="text-[10px] font-bold text-brand-muted/60 uppercase tracking-widest">{time}</span>
      </div>
    </div>
  );
}
