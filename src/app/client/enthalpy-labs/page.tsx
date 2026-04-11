"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AgnaaLogo } from '@/components/AgnaaLogo';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Activity, 
  LogOut,
  Sparkles,
  Zap,
  ShieldCheck,
  Globe,
  Layers,
  Search,
  Lock,
  Settings,
  CreditCard,
  Target,
  ArrowRight
} from 'lucide-react';

const CLIENT_DATA = {
  clientName: "Enthalpy Labs",
  projectTitle: "Agnaa Ongoing Works — Enthalpy Labs",
  stats: {
    deliverables: 172,
    stages: 16,
    startDate: "2026-04-08",
  },
  progress: {
    completed: 17,
    total: 172,
    percent: 10
  },
  summary: [
    { label: "Completed", val: "17", color: "text-green-400" },
    { label: "In Pipeline", val: "155", color: "text-[#F4B400]" },
    { label: "Total Value", val: "₹1.25L", color: "text-blue-400" },
    { label: "Days Active", val: "4", color: "text-gray-400" }
  ],
  stages: [
     {
      icon: <Sparkles className="w-5 h-5 text-purple-400" />,
      title: "Logo & Identity System",
      count: "7/12 done",
      items: [
        { name: "ΔH Tetrahedron logomark — sacred geometry fire symbol", desc: "Your ΔH = enthalpy heat icon. Unique worldwide.", status: "done" },
        { name: "Logo gradient version with fire facets", desc: "Amber fire → orange glow depth effect.", status: "done" },
        { name: "Full wordmark SVG — ENTHALPY bold + LABS grey", desc: "Hierarchy locked. Navy + grey system.", status: "done" },
        { name: "Inline logo — icon replaces 'A' in ENTHALPY", desc: "FedEx-arrow level cleverness. Iconic.", status: "done" },
        { name: "Standalone icon SVG (favicon-ready)", desc: "32px–512px perfect clarity.", status: "done" },
        { name: "Logo B&W monotone version", desc: "Stamp, watermark, legal docs.", status: "done" },
        { name: "Logo on white background PNG", desc: "Print, presentations, email use.", status: "todo" },
        { name: "Logo on dark background PNG", desc: "Website header, dark slides.", status: "todo" },
        { name: "Inverted white logo version", desc: "Dark print, embossing.", status: "todo" },
        { name: "Stacked mobile logo (icon above text)", desc: "App icon, square formats.", status: "todo" }
      ]
    },
    {
      icon: <Zap className="w-5 h-5 text-yellow-400" />,
      title: "Brand Color & Typography System",
      count: "5/10 done",
      items: [
        { name: "4-color palette locked — Navy, Amber, Grey, Off-White", desc: "Global industrial trust palette.", status: "done" },
        { name: "WCAG AA contrast verified (5.12:1)", desc: "Accessibility compliance certified.", status: "done" },
        { name: "Inter variable font system", desc: "Bold 700 / Regular 400 / Mono locked.", status: "done" },
        { name: "Color hex codes + Tailwind config", desc: "Developer-ready tokens.", status: "done" },
        { name: "CSS variables export", desc: "Website + email + print consistent.", status: "done" },
        { name: "Dark mode color variants", desc: "Website dark/light toggle ready.", status: "todo" },
        { name: "Color psychology rationale document", desc: "Amber=heat, Navy=authority, Grey=precision.", status: "todo" }
      ]
    },
    {
      icon: <Globe className="w-5 h-5 text-blue-400" />,
      title: "Website Structure & Core",
      count: "3/14 done",
      items: [
        { name: "Next.js 15 production build — zero errors", desc: "Enterprise-grade foundation.", status: "done" },
        { name: "Tailwind config locked to brand system", desc: "Pixel-perfect brand consistency.", status: "done" },
        { name: "Responsive design (375px to 1440px)", desc: "Perfect on all screens.", status: "done" },
        { name: "Custom domain setup (enthalpylabs.com)", desc: "Your professional address live.", status: "todo" },
        { name: "Vercel deployment + CDN", desc: "99.99% uptime guaranteed.", status: "todo" },
        { name: "SSL certificate (HTTPS green lock)", desc: "Security trust signal.", status: "todo" }
      ]
    },
    {
      icon: <Search className="w-5 h-5 text-orange-400" />,
      title: "SEO & Architecture",
      count: "1/11 done",
      items: [
        { name: "100 'best keyword' meta title system", desc: "Page 1 for 100 searches.", status: "done" },
        { name: "JSON-LD Organization schema", desc: "Google knowledge panel.", status: "todo" },
        { name: "LocalBusiness schema setup", desc: "Maps + local ranking.", status: "todo" },
        { name: "FAQ Schema (20 pages)", desc: "Featured snippet capture.", status: "todo" }
      ]
    },
    {
      icon: <Lock className="w-5 h-5 text-red-400" />,
      title: "Client Portal & Security",
      count: "1/8 done",
      items: [
        { name: "Client login portal (/client)", desc: "Secure access for Enthalpy Labs.", status: "done" },
        { name: "Study status dashboard", desc: "Sample received → In progress → Report ready.", status: "todo" },
        { name: "PDF report secure downloads", desc: "No email attachments needed.", status: "todo" },
        { name: "Supabase authentication integration", desc: "Enterprise-grade auth layer.", status: "todo" }
      ]
    }
  ],
  milestones: [
    { label: "Advance", val: "✅ Paid", tag: "Project started", status: "paid" },
    { label: "Design Approval", val: "⏳ Pending", tag: "On preview sign-off", status: "pending" },
    { label: "Final Handover", val: "⏳ Pending", tag: "On project delivery", status: "pending" }
  ]
};

export default function EnthalpyLabsStatusPage() {
  const [session, setSession] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const savedSession = localStorage.getItem('client_session');
    if (!savedSession) {
      router.push('/client');
    } else {
      setSession(JSON.parse(savedSession));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('client_session');
    router.push('/client');
  };

  if (!session) return null;

  const daysActive = Math.ceil((new Date().getTime() - new Date(CLIENT_DATA.stats.startDate).getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-[#0D0D14] text-[#F0F0F6] pb-20 selection:bg-[#7B2DBF]/30">
      <header className="relative py-12 px-6 overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute top-[-50%] left-[-20%] w-[100%] h-[100%] bg-[#1C1C72]/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-50%] right-[-20%] w-[100%] h-[100%] bg-[#7B2DBF]/5 blur-[150px] rounded-full" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-6">
              <AgnaaLogo className="h-10 w-auto" />
              <div className="hidden sm:block h-6 w-px bg-white/10" />
              <div className="hidden sm:flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">
                <span className="text-[#F4B400]">Client</span> Portal
              </div>
            </div>
            
            <button 
              onClick={handleLogout}
              className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-2 group"
            >
              <LogOut className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
              Logout
            </button>
          </div>

          <div className="grid md:grid-cols-[1fr,auto] gap-12 items-end">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 text-[10px] font-bold text-[#10B981] uppercase tracking-widest mb-6">
                <Activity className="h-3 w-3 animate-pulse" />
                Live Status - Real-Time Tracking
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
                Enthalpy Labs <span className="text-gray-600 font-medium whitespace-nowrap">Dashboard</span>
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
                A real-time overview of your branding and digital transformation project. Every pixel tracked, every milestone accounted for.
              </p>
            </div>
            
            <div className="flex gap-8 bg-[#14141F] p-8 rounded-3xl border border-white/5 shadow-2xl">
              <div className="text-center">
                <div className="text-4xl font-black text-[#F4B400] mb-1">{CLIENT_DATA.stats.deliverables}</div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Tasks</div>
              </div>
              <div className="w-px bg-white/5" />
              <div className="text-center">
                <div className="text-4xl font-black text-[#F4B400] mb-1">{CLIENT_DATA.stats.stages}</div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Stages</div>
              </div>
              <div className="w-px bg-white/5" />
              <div className="text-center">
                <div className="text-4xl font-black text-[#F4B400] mb-1">{daysActive}</div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Days</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Section */}
      <section className="px-6 mb-20">
        <div className="max-w-5xl mx-auto bg-[#14141F] rounded-[40px] p-8 md:p-12 border border-white/5 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-24 bg-[#1C1C72]/10 blur-[100px] rounded-full group-hover:bg-[#1C1C72]/20 transition-all duration-1000" />
          
          <div className="flex justify-between items-end mb-8 relative z-10">
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Overall Completion</p>
              <h2 className="text-3xl md:text-4xl font-black text-white">
                {CLIENT_DATA.progress.completed} <span className="text-gray-600">/ {CLIENT_DATA.progress.total}</span>
              </h2>
            </div>
            <div className="text-5xl font-black text-[#1C1C72] opacity-50 group-hover:opacity-100 transition-opacity">
              {CLIENT_DATA.progress.percent}%
            </div>
          </div>

          <div className="h-4 bg-black/40 rounded-full overflow-hidden mb-12 relative z-10 border border-white/5">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${CLIENT_DATA.progress.percent}%` }}
              transition={{ duration: 2, ease: "circOut" }}
              className="h-full bg-gradient-to-r from-[#1C1C72] to-[#7B2DBF] rounded-full shadow-[0_0_20px_rgba(123,45,191,0.5)]"
            />
          </div>

          <div className="grid md:grid-cols-4 gap-4 relative z-10">
            {CLIENT_DATA.summary.map((item, i) => (
              <div key={i} className="bg-black/20 rounded-2xl p-6 border border-white/5 backdrop-blur-sm transition-transform hover:scale-105">
                <div className={`text-2xl font-black mb-1 ${item.color}`}>{item.val}</div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grid of Stages */}
      <section className="px-6 max-w-5xl mx-auto space-y-24">
        {CLIENT_DATA.stages.map((stage, i) => (
          <div key={i}>
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-white/5">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                {stage.icon}
              </div>
              <div>
                <h3 className="text-2xl font-black text-white tracking-tight">{stage.title}</h3>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.25em] mt-1">{stage.count}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stage.items.map((item, j) => (
                <div key={j} className={`p-6 rounded-3xl border transition-all duration-300 flex items-start gap-6 ${item.status === 'done' ? 'bg-[#10B981]/5 border-[#10B981]/20 group hover:bg-[#10B981]/10' : 'bg-[#14141F] border-white/5 hover:border-white/20'}`}>
                  <div className={`mt-1 h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 ${item.status === 'done' ? 'bg-[#10B981] text-[#0D0D14]' : 'bg-white/5 text-gray-700'}`}>
                    {item.status === 'done' ? <CheckCircle2 size={14} strokeWidth={3} /> : <Circle size={14} />}
                  </div>
                  <div>
                    <h4 className={`font-bold mb-1 leading-tight ${item.status === 'done' ? 'text-white' : 'text-gray-300'}`}>
                      {item.name}
                    </h4>
                    <p className={`text-xs ${item.status === 'done' ? 'text-[#10B981]/70' : 'text-gray-500'}`}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Payment Footer */}
        <div className="pt-24 mt-24 border-t border-white/5">
           <div className="bg-[#14141F] rounded-[50px] p-10 md:p-16 border border-white/10 shadow-3xl text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1C1C72]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              <div className="relative z-10">
                <h3 className="text-3xl font-black mb-4">Project Milestones</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-16 px-4">Secure transparent tracking of project payments and major milestones.</p>
                
                <div className="grid md:grid-cols-3 gap-1 bg-white/5 rounded-3xl overflow-hidden border border-white/5">
                  {CLIENT_DATA.milestones.map((m, i) => (
                    <div key={i} className={`p-10 ${m.status === 'paid' ? 'bg-black/40' : 'bg-[#1a1a26]'}`}>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6">{m.label}</p>
                      <div className={`text-2xl font-black mb-2 ${m.status === 'paid' ? 'text-[#F4B400]' : 'text-white/20'}`}>{m.val}</div>
                      <div className={`text-xs font-bold ${m.status === 'paid' ? 'text-green-400' : 'text-gray-600'}`}>{m.tag}</div>
                    </div>
                  ))}
                </div>
              </div>
           </div>
        </div>

        <footer className="text-center py-20 text-[10px] font-bold text-gray-600 uppercase tracking-[0.5em] opacity-50">
          Crafted by AGNAA Design Studio &bull; Hyderabad &bull; 2026
        </footer>
      </section>
    </div>
  );
}
