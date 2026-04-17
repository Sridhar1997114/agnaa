"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  ArrowUpRight, 
  Clock, 
  Calendar, 
  FileCheck,
  Zap,
  Bell,
  Map as MapIcon
} from "lucide-react";

import { getProjects } from "@/app/pro/actions";

export default function Dashboard() {
  const [projects, setProjects] = React.useState<any[]>([]);
  const [profile, setProfile] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadData() {
      const { data: projectsData } = await getProjects();
      if (projectsData) setProjects(projectsData);
      
      // Fetch profile (we might need a getProfile action)
      // For now, assume we can get it or use a default
      setLoading(false);
    }
    loadData();
  }, []);

  const totalProjects = projects.length;
  const avgPF = projects.length > 0 
    ? (projects.reduce((acc, p) => acc + (p.payment_factor || 1.025), 0) / projects.length).toFixed(3)
    : "1.025";
  const dayIndex = projects.length > 0 
    ? Math.max(...projects.map(p => p.booking_day || 0))
    : "0";
  return (
    <div className="space-y-10">
      {/* Top Header */}
      <div className="flex justify-between items-center bg-[#14141F]/40 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
        <div>
          <h2 className="text-3xl font-display font-bold text-white mb-2">Architectural Legacy</h2>
          <p className="text-brand-muted">Tracking your vision from sketch to structure.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2.5 rounded-full bg-white/5 border border-white/10 text-brand-muted hover:text-white transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-brand-violet rounded-full" />
          </button>
          <button className="bg-brand-gradient hover:opacity-90 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-lg shadow-brand-violet/20">
            <Plus size={20} /> Start New Project
          </button>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Active Projects", value: totalProjects.toString().padStart(2, '0'), sub: `${projects.filter(p => p.type === 'Architecture').length} Architectural, ${projects.filter(p => p.type === 'Interior').length} Interior`, icon: FileCheck },
          { label: "Day Index", value: dayIndex.toString(), sub: "Latest booking day", icon: Clock },
          { label: "Payment Factor", value: `${avgPF}x`, sub: "Average across portfolio", icon: Zap },
          { label: "Sridhar-Score", value: profile?.sridhar_score ? (profile.sridhar_score * 100).toFixed(0) : "88", sub: "Premium Client Status", icon: Zap },
        ].map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#14141F] border border-white/5 p-6 rounded-2xl group hover:border-brand-violet/30 transition-all hover:shadow-xl hover:shadow-brand-violet/5"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 rounded-lg bg-white/5 group-hover:bg-brand-violet/10 group-hover:text-brand-violet transition-all">
                <stat.icon size={22} />
              </div>
              <ArrowUpRight size={18} className="text-brand-muted opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h3 className="text-brand-muted text-xs uppercase tracking-widest font-semibold mb-1">{stat.label}</h3>
            <p className="text-3xl font-display font-bold text-white mb-1">{stat.value}</p>
            <p className="text-[10px] text-brand-muted font-medium">{stat.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Active Projects List */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
            <span className="w-1.5 h-6 bg-brand-violet rounded-full" />
            Active Portfolio
          </h3>
          <button className="text-brand-muted hover:text-white text-sm font-medium transition-colors">View All Projects</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {loading ? (
            <div className="lg:col-span-2 py-20 bg-white/5 border border-dashed border-white/10 rounded-2xl flex items-center justify-center text-brand-muted animate-pulse font-bold uppercase tracking-widest text-xs">
              Accessing Secure Records...
            </div>
          ) : projects.length === 0 ? (
            <div className="lg:col-span-2 py-20 bg-white/5 border border-dashed border-white/10 rounded-2xl flex items-center justify-center text-brand-muted font-bold uppercase tracking-widest text-xs">
              No Projects Found
            </div>
          ) : (
            projects.map((project: any, i: number) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="bg-[#14141F] border border-white/5 rounded-2xl overflow-hidden group hover:border-brand-violet/30 transition-all flex flex-col sm:flex-row shadow-2xl"
              >
                <div className="w-full sm:w-48 bg-slate-800 relative overflow-hidden">
                  <div className="absolute inset-0 bg-brand-gradient opacity-20" />
                  <div className="absolute inset-0 flex items-center justify-center p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                    <MapIcon size={64} className="text-white" />
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-[#0D0D14]/80 backdrop-blur-md text-[10px] font-bold text-brand-violet px-2.5 py-1 rounded-full uppercase tracking-widest border border-brand-violet/20">
                      {project.type}
                    </span>
                  </div>
                </div>

                <div className="flex-1 p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-bold text-white mb-0.5">{project.title}</h4>
                      <p className="text-xs text-brand-muted flex items-center gap-1">
                        <Calendar size={12} /> {project.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-brand-muted uppercase tracking-tighter">Status</p>
                      <p className="text-sm font-bold text-emerald-400">{project.status}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-end text-xs mb-1">
                      <span className="text-brand-muted font-medium">Progress</span>
                      <span className="text-white font-bold">{project.progress || 0}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress || 0}%` }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="h-full bg-brand-violet" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                      <p className="text-[10px] text-brand-muted uppercase mb-1">Next Milestone</p>
                      <p className="text-xs font-semibold text-white truncate">{project.next_milestone || "N/A"}</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                      <p className="text-[10px] text-brand-muted uppercase mb-1">Effective PF</p>
                      <p className="text-xs font-semibold text-white">1.05x</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <span className="text-[10px] text-brand-muted tracking-wide italic">Updated Just Now</span>
                    <button className="text-brand-violet hover:text-white text-xs font-bold uppercase tracking-widest flex items-center gap-1 transition-colors">
                      View Details <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
