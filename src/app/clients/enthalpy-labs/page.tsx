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
  ArrowRight,
  Circle,
  Download,
  Eye,
  FileText,
  ExternalLink,
  X
} from 'lucide-react';
import { InvoiceTemplate } from '@/components/pdf/InvoiceTemplate';
import { QuotationTemplate } from '@/components/pdf/QuotationTemplate';
import { MOUTemplate } from '@/components/pdf/MOUTemplate';
import { StudyReportTemplate } from '@/components/pdf/StudyReportTemplate';
import { ReceiptTemplate } from '@/components/pdf/ReceiptTemplate';
import Head from 'next/head';

const CLIENT_DATA = {
  clientName: "Enthalpy Labs",
  projectTitle: "Agnaa Ongoing Works — Enthalpy Labs",
  stats: {
    deliverables: 172,
    stages: 16,
    startDate: "2026-04-08",
  },
  progress: {
    completed: 24,
    total: 172,
    percent: 14
  },
  summary: [
    { label: "Completed", val: "24", color: "text-green-400" },
    { label: "In Pipeline", val: "148", color: "text-[#F4B400]" },
    { label: "Total Value", val: "₹1.25L", color: "text-blue-400" },
    { label: "Days Running", val: "10", color: "text-gray-400" }
  ],
  stages: [
     {
      icon: <Sparkles className="w-5 h-5 text-purple-400" />,
      title: "Logo & Identity System",
      count: "10/10 done",
      items: [
        { name: "ΔH Tetrahedron logomark — sacred geometry fire symbol", desc: "Your ΔH = enthalpy heat icon. Unique worldwide.", status: "done" },
        { name: "Logo gradient version with fire facets", desc: "Amber fire → orange glow depth effect.", status: "done" },
        { name: "Full wordmark SVG — ENTHALPY bold + LABS grey", desc: "Hierarchy locked. Navy + grey system.", status: "done" },
        { name: "Inline logo — icon replaces 'A' in ENTHALPY", desc: "FedEx-arrow level cleverness. Iconic.", status: "done" },
        { name: "Standalone icon SVG (favicon-ready)", desc: "32px–512px perfect clarity.", status: "done" },
        { name: "Logo B&W monotone version", desc: "Stamp, watermark, legal docs.", status: "done" },
        { name: "Logo on white background PNG", desc: "Print, presentations, email use.", status: "done" },
        { name: "Logo on dark background PNG", desc: "Website header, dark slides.", status: "done" },
        { name: "Inverted white logo version", desc: "Dark print, embossing.", status: "done" },
        { name: "Stacked mobile logo (icon above text)", desc: "App icon, square formats.", status: "done" }
      ]
    },
    {
      icon: <Zap className="w-5 h-5 text-yellow-400" />,
      title: "Brand Color & Typography System",
      count: "7/7 done",
      items: [
        { name: "4-color palette locked — Navy, Amber, Grey, Off-White", desc: "Global industrial trust palette.", status: "done" },
        { name: "WCAG AA contrast verified (5.12:1)", desc: "Accessibility compliance certified.", status: "done" },
        { name: "Inter variable font system", desc: "Bold 700 / Regular 400 / Mono locked.", status: "done" },
        { name: "Color hex codes + Tailwind config", desc: "Developer-ready tokens.", status: "done" },
        { name: "CSS variables export", desc: "Website + email + print consistent.", status: "done" },
        { name: "Dark mode color variants", desc: "Website dark/light toggle ready.", status: "done" },
        { name: "Color psychology rationale document", desc: "Amber=heat, Navy=authority, Grey=precision.", status: "done" }
      ]
    },
    {
      icon: <Layers className="w-5 h-5 text-indigo-400" />,
      title: "Business Document Templates",
      count: "5/12 done",
      items: [
        { name: "Invoice template — Inter Bold + Navy header", desc: "Professional billing every client.", status: "done", template: "invoice" },
        { name: "Quotation format PDF template", desc: "Faster deal closing.", status: "done", template: "quotation" },
        { name: "MOU / Agreement format", desc: "Legal protection on every project.", status: "done", template: "mou" },
        { name: "Study report cover page template", desc: "DSC/RC1/TGA reports branded.", status: "done", template: "study-report" },
        { name: "Payment receipt template", desc: "Instant trust on payment.", status: "done", template: "receipt" },
        { name: "Client NDA template", desc: "Confidentiality protection.", status: "todo" },
        { name: "Company letterhead — print + digital", desc: "Govt correspondence ready.", status: "todo" },
        { name: "Business card design (front + back)", desc: "Amber back, Navy front.", status: "todo" },
        { name: "Email signature HTML", desc: "Every email = brand impression.", status: "todo" },
        { name: "Presentation template (10 slides)", desc: "Pitch decks, client proposals.", status: "todo" },
        { name: "Lab report watermark system", desc: "Secure proprietary reports.", status: "todo" },
        { name: "Certificate of analysis template", desc: "Official test result delivery.", status: "todo" }
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
        { "name": "Custom domain setup (enthalpylabs.com)", desc: "Your professional address live.", status: "todo" },
        { "name": "Vercel deployment + CDN", desc: "99.99% uptime guaranteed.", status: "todo" },
        { "name": "SSL certificate (HTTPS green lock)", desc: "Security trust signal.", status: "todo" }
      ]
    },
    {
      icon: <Search className="w-5 h-5 text-orange-400" />,
      title: "SEO Architecture",
      count: "1/11 done",
      items: [
        { name: "100 'best [keyword]' meta title system", desc: "Page 1 for 100 searches.", status: "done" },
        { name: "JSON-LD Organization schema", desc: "Google knowledge panel.", status: "todo" },
        { name: "JSON-LD LocalBusiness schema", desc: "Maps + local ranking.", status: "todo" },
        { name: "FAQ schema (20 pages)", desc: "Featured snippet capture.", status: "todo" }
      ]
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-red-400" />,
      title: "Client Portal & Security",
      count: "1/8 done",
      items: [
        { name: "Client login portal (/clients)", desc: "Secure access for Enthalpy Labs.", status: "done" },
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
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedSession = localStorage.getItem('client_session');
    if (!savedSession) {
      router.push('/clients');
    } else {
      setSession(JSON.parse(savedSession));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('client_session');
    router.push('/clients');
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Analytical Chemical Testing",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Enthalpy Labs",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana",
        "addressCountry": "IN"
      }
    },
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Lab Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Differential Scanning Calorimetry (DSC)"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Reaction Safety Assessment (RC1mx)"
          }
        }
      ]
    }
  };

  if (!session) return null;

  const daysActive = Math.ceil((new Date().getTime() - new Date(CLIENT_DATA.stats.startDate).getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-[#0D0D14] text-[#F0F0F6] pb-20 selection:bg-[#7B2DBF]/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
        {/* Study Tracker Section */}
        <div className="bg-[#14141F] rounded-[40px] p-8 md:p-12 border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-4 mb-10 pb-6 border-b border-white/5">
            <div className="p-3 rounded-2xl bg-[#F4B400]/10 border border-[#F4B400]/20">
              <Activity className="w-5 h-5 text-[#F4B400]" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white tracking-tight">Active Study Tracker</h3>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.25em] mt-1">Real-Time Lab Lifecycle</p>
            </div>
          </div>

          <div className="relative pt-12 pb-8 px-4">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-white/5 -translate-y-1/2 hidden md:block" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
              {[
                { step: "01", label: "Sample Received", status: "complete", date: "April 12" },
                { step: "02", label: "Protocol Dev", status: "complete", date: "April 14" },
                { step: "03", label: "Active Analysis", status: "active", date: "In Progress" },
                { step: "04", label: "Report Draft", status: "pending", date: "Estimated April 20" }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 mb-4 ${
                    item.status === 'complete' ? 'bg-[#10B981] border-[#10B981]/20 text-white' : 
                    item.status === 'active' ? 'bg-[#F4B400] border-[#F4B400]/20 text-[#0D0D14] animate-pulse' : 
                    'bg-[#1a1a26] border-white/5 text-gray-700'
                  }`}>
                    {item.status === 'complete' ? <CheckCircle2 size={20} /> : <span className="font-black">{item.step}</span>}
                  </div>
                  <h4 className={`font-bold text-sm mb-1 ${item.status === 'pending' ? 'text-gray-600' : 'text-white'}`}>{item.label}</h4>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">{item.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

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
                    {item.status === 'done' && (item as any).template && (
                      <div className="mt-4 flex gap-2">
                        <button 
                          onClick={() => setActiveTemplate((item as any).template)}
                          className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[9px] font-bold uppercase tracking-wider hover:bg-white/10 transition-all flex items-center gap-1.5"
                        >
                          <Eye size={10} /> Preview
                        </button>
                        <button className="px-3 py-1.5 bg-[#1C1C72]/40 border border-[#1C1C72]/40 rounded-lg text-[9px] font-bold uppercase tracking-wider hover:bg-[#1C1C72]/60 transition-all flex items-center gap-1.5">
                          <Download size={10} /> PDF
                        </button>
                      </div>
                    )}
                    {item.name === "PDF report secure downloads" && (
                      <button className="mt-4 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
                        <Lock size={12} /> Secure Portal Entry
                      </button>
                    )}
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

      {/* Document Preview Modal */}
      {activeTemplate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveTemplate(null)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative w-full max-w-5xl max-h-full bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col"
          >
            <div className="absolute top-6 right-6 z-10">
              <button 
                onClick={() => setActiveTemplate(null)}
                className="p-2 bg-black/5 hover:bg-black/10 rounded-full transition-colors text-black"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="overflow-auto p-4 md:p-12 bg-gray-100 flex justify-center">
              <div className="bg-white shadow-xl w-full max-w-[800px] min-h-[1100px] transform origin-top md:scale-100 scale-90">
                {activeTemplate === 'invoice' && <InvoiceTemplate />}
                {activeTemplate === 'quotation' && <QuotationTemplate />}
                {activeTemplate === 'mou' && <MOUTemplate />}
                {activeTemplate === 'study-report' && <StudyReportTemplate />}
                {activeTemplate === 'receipt' && <ReceiptTemplate />}
              </div>
            </div>
            
            <div className="p-6 bg-white border-t border-gray-100 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <FileText className="text-[#1C1C72]" />
                <div>
                  <div className="text-sm font-bold text-black uppercase tracking-wider">
                    {activeTemplate.replace('-', ' ')} Preview
                  </div>
                  <div className="text-[10px] text-gray-500 font-medium">Digital Version - Ready for Export</div>
                </div>
              </div>
              <button 
                onClick={() => window.print()}
                className="px-6 py-2.5 bg-[#1C1C72] text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#1C1C72]/90 transition-all flex items-center gap-2"
              >
                <Download size={14} /> Download PDF
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
