"use client";

import React from "react";
import { motion } from "framer-motion";
import { Map, ArrowRight, Clock, Box, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { getProjects } from "@/app/pro/actions";

export default function ClientProjectsList() {
  const [projects, setProjects] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await getProjects();
      if (data) setProjects(data);
      setLoading(false);
    }
    fetchProjects();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-display font-bold text-white mb-2">My Projects</h1>
        <p className="text-brand-muted">Track deliverables and milestones across your portfolio.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {loading ? (
          <div className="text-white">Loading projects...</div>
        ) : projects.map((project: any, i: number) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group"
          >
            <Link href={`/pro/projects/${project.id}`}>
              <div className="bg-[#14141F] border border-white/5 rounded-3xl p-6 hover:border-brand-violet/30 transition-all shadow-xl h-full flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-4 bg-white/5 rounded-2xl text-brand-violet group-hover:bg-brand-violet group-hover:text-white transition-colors">
                      <Map size={32} />
                    </div>
                    <span className="px-3 py-1 bg-white/5 text-white/80 rounded-full text-[10px] uppercase font-bold tracking-widest border border-white/10">
                      {project.status}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-1">{project.title}</h3>
                  <p className="text-sm text-brand-muted flex items-center gap-2 mb-6">
                    <Box size={14} /> {project.type}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between items-end text-xs mb-1">
                      <span className="text-brand-muted font-medium uppercase tracking-widest">Global Progress</span>
                      <span className="text-white font-bold">{project.progress || 0}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-brand-violet transition-all duration-1000" 
                        style={{ width: `${project.progress || 0}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2 text-xs text-brand-muted">
                    <Clock size={14} />
                    <span className="font-bold">E.T.A: {project.estimated_completion ? new Date(project.estimated_completion).toLocaleDateString() : 'TBD'}</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:bg-brand-violet transition-colors">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}

        {/* Empty State / Add New */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
        >
          <div className="bg-[#14141F]/40 border border-white/5 border-dashed rounded-3xl p-6 hover:bg-white/5 transition-all h-full min-h-[300px] flex flex-col items-center justify-center text-center cursor-pointer">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 text-brand-muted">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Commission New Project</h3>
            <p className="text-sm text-brand-muted max-w-[250px]">
              Expand your portfolio and secure your next architectural asset with Sridhar.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
