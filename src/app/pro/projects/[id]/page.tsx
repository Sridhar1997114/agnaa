"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ChevronLeft, 
  Download, 
  ExternalLink, 
  FileText, 
  Clock, 
  CheckCircle2, 
  Circle,
  AlertCircle,
  Zap
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getProjectById, getVaultFiles } from "@/app/pro/actions";

const TIMELINE_STEPS = [
  { id: 1, title: "Discovery & Brief", status: "completed", date: "Jan 12, 2024" },
  { id: 2, title: "Concept Design", status: "completed", date: "Feb 05, 2024" },
  { id: 3, title: "Detailed Blueprints", status: "active", date: "In Progress" },
  { id: 4, title: "Structural Analysis", status: "pending", date: "TBD" },
  { id: 5, title: "Construction Start", status: "pending", date: "TBD" },
];

const DOCUMENTS = [
  { name: "Floor_Plan_v2.pdf", size: "4.2 MB", type: "Blueprint", date: "Mar 10" },
  { name: "Structural_Report.pdf", size: "1.8 MB", type: "Analysis", date: "Mar 11" },
  { name: "Agreement_Final.pdf", size: "0.5 MB", type: "Legal", date: "Jan 15" },
];

export default function ProjectDetail() {
  const params = useParams();
  const id = params?.id as string;
  const [project, setProject] = React.useState<any>(null);
  const [docs, setDocs] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadData() {
      if (!id) return;
      const [projRes, docsRes] = await Promise.all([
        getProjectById(id),
        getVaultFiles(id)
      ]);
      if (projRes.data) setProject(projRes.data);
      if (docsRes.data) setDocs(docsRes.data);
      setLoading(false);
    }
    loadData();
  }, [id]);

  if (loading) return <div className="p-20 text-center text-brand-muted uppercase tracking-widest text-xs font-bold animate-pulse">Decrypting Project DNA...</div>
  if (!project) return <div className="p-20 text-center text-brand-muted uppercase tracking-widest text-xs font-bold">Project Not Found</div>

  return (
    <div className="space-y-8 pb-20">
      {/* Breadcrumbs / Back */}
      <Link href="/pro" className="flex items-center gap-2 text-brand-muted hover:text-white transition-colors w-fit group">
        <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back to Legacy Dashboard</span>
      </Link>

      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden min-h-[300px] flex items-end p-8 bg-slate-900 border border-white/5 shadow-2xl">
        <div className="absolute inset-0 bg-brand-gradient opacity-30 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D14] via-transparent to-transparent" />
        
        <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-2">
            <span className="bg-brand-violet text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">{project.type}</span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">{project.title}</h1>
            <p className="text-brand-muted flex items-center gap-2">
              <Clock size={16} /> Estimated Handover: {project.estimated_completion ? new Date(project.estimated_completion).toLocaleDateString() : 'TBD'} • Phase: {project.status}
            </p>
          </div>
          <div className="flex gap-3">
            <button className="bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl border border-white/10 font-bold transition-all shadow-xl">
              Virtual Site Visit
            </button>
            <button className="bg-brand-gradient text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-brand-violet/20 hover:opacity-90 transition-all">
              Request Changes
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
        {/* Left: Timeline & Documents */}
        <div className="space-y-8">
          {/* Architectural Timeline */}
          <section className="bg-[#14141F] border border-white/5 rounded-2xl p-8">
            <h3 className="text-xl font-display font-bold text-white mb-8 flex items-center gap-3">
              <span className="w-1 h-6 bg-brand-violet rounded-full" />
              Project Cadence
            </h3>
            
            <div className="relative space-y-12 before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-brand-violet before:via-white/5 before:to-white/5">
              {TIMELINE_STEPS.map((step, index) => (
                <div key={step.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  {/* Marker */}
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-[#14141F] shadow-xl z-20 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    {step.status === 'completed' && <CheckCircle2 size={16} className="text-emerald-400" />}
                    {step.status === 'active' && (
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-brand-violet animate-ping opacity-75" />
                        <Circle size={16} className="text-brand-violet fill-brand-violet relative z-10" />
                      </div>
                    )}
                    {step.status === 'pending' && <Circle size={10} className="text-white/20" />}
                  </div>

                  {/* Content */}
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl bg-white/5 border border-white/5 group-hover:bg-white/[0.08] transition-all">
                    <div className="flex items-center justify-between mb-1">
                      <time className="font-display font-medium text-[10px] text-brand-violet uppercase tracking-widest">{step.date}</time>
                    </div>
                    <div className="text-white font-bold">{step.title}</div>
                    {step.status === 'active' && (
                      <p className="text-xs text-brand-muted mt-2 leading-relaxed">
                        Currently finalizing the structural load calculations for the cantilevered master suite.
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Document Vault Section */}
          <section className="bg-[#14141F] border border-white/5 rounded-2xl p-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-display font-bold text-white">Document Vault</h3>
              <button className="text-xs font-bold text-brand-violet uppercase tracking-widest border border-brand-violet/20 px-4 py-2 rounded-lg hover:bg-brand-violet/10 transition-colors">
                Download All (.zip)
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {docs.length === 0 ? (
                <div className="md:col-span-2 py-10 text-center text-brand-muted uppercase tracking-widest text-[10px] font-bold">No Documents in Vault</div>
              ) : docs.map((doc) => (
                <div key={doc.id} className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-4 group hover:bg-white/[0.08] transition-all cursor-pointer">
                  <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-brand-muted group-hover:text-brand-violet transition-colors">
                    <FileText size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white truncate">{doc.title}</h4>
                    <p className="text-[10px] text-brand-muted uppercase tracking-tighter">{doc.status} • Vault ID: {doc.id.slice(0, 8)}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-brand-muted hover:text-white transition-colors" onClick={() => window.open(doc.file_url, '_blank')}><ExternalLink size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right: Project Stats & Contacts */}
        <div className="space-y-8">
          {/* Quick Metrics */}
          <div className="bg-[#14141F] border border-white/5 rounded-2xl p-6 space-y-6 shadow-2xl">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest border-b border-white/5 pb-3">Project Health</h4>
            
            <div className="space-y-4">
              {[
                { label: "Approved Blueprints", value: "12/15", color: "text-emerald-400" },
                { label: "Site Photos", value: "142", color: "text-brand-violet" },
                { label: "Days Active", value: "68", color: "text-white" },
                { label: "Budget Utilization", value: "32%", color: "text-white" },
              ].map(m => (
                <div key={m.label} className="flex justify-between items-center text-sm font-medium">
                  <span className="text-brand-muted">{m.label}</span>
                  <span className={m.color}>{m.value}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-brand-violet/10 border border-brand-violet/20">
              <div className="flex items-center gap-2 text-brand-violet mb-2">
                <AlertCircle size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">Notice</span>
              </div>
              <p className="text-xs text-white/80 leading-relaxed">
                Site visit scheduled for tomorrow at 10:00 AM. Please confirm if you will be attending.
              </p>
            </div>
          </div>

          {/* Sridhar score specialized */}
          <div className="bg-brand-gradient p-6 rounded-2xl shadow-xl shadow-brand-violet/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
              <Zap size={80} fill="white" />
            </div>
            <div className="relative z-10 space-y-1">
              <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Client Affinity Score</p>
              <h4 className="text-4xl font-display font-bold text-white">92</h4>
              <p className="text-xs text-white/80 font-medium">Top 5% of collaborators this quarter. Unlock priority site visits.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
