"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Map, 
  FileText, 
  CreditCard, 
  History,
  ChevronRight,
  LogOut,
  User,
  Zap,
  FileCheck,
  Receipt,
  Wallet,
  Package
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SIDEBAR_LINKS = [
  { href: "/app", label: "Dashboard", icon: LayoutDashboard },
  { href: "/app/projects", label: "My Projects", icon: Map },
  { href: "/app/documents", label: "Documents", icon: FileText },
  { href: "/app/invoices", label: "Invoices", icon: Receipt },
  { href: "/app/quotations", label: "Quotations", icon: FileCheck },
  { href: "/app/payments", label: "Payments", icon: Wallet },
  { href: "/app/deliverables", label: "Deliverables", icon: Package },
  { href: "/app/activity", label: "Activity", icon: History },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#0D0D14] text-white font-sans selection:bg-brand-violet/30">
      {/* Sidebar */}
      <aside 
        className={`fixed left-0 top-0 h-full z-50 transition-all duration-300 border-r border-white/5 bg-[#14141F]/80 backdrop-blur-xl flex flex-col ${
          isCollapsed ? "w-20" : "w-72"
        }`}
      >
        {/* Logo Section */}
        <div className="p-6 flex items-center gap-4">
          <div className="w-10 h-10 bg-brand-gradient rounded-lg flex items-center justify-center shadow-lg shadow-brand-violet/20 flex-shrink-0">
            <span className="font-display font-bold text-xl">A</span>
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden whitespace-nowrap">
              <h1 className="font-display font-bold text-lg tracking-wider text-white">AGNAA</h1>
              <p className="text-[10px] text-brand-muted uppercase tracking-[0.2em]">Client Portal</p>
            </div>
          )}
        </div>

        {/* Client Profile Card */}
        <div className={`mx-4 mb-6 p-4 rounded-xl bg-white/5 border border-white/5 transition-all overflow-hidden ${
          isCollapsed ? "opacity-0 invisible h-0 mb-0" : "opacity-100 visible"
        }`}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border border-white/10 ring-2 ring-brand-violet/20">
              <User size={20} className="text-white/60" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs text-brand-muted">Welcome back,</p>
              <p className="text-sm font-semibold truncate w-32">Client Name</p>
            </div>
          </div>
          
          {/* Sridhar-Score Indicator */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px] items-center">
              <span className="text-brand-muted font-medium uppercase tracking-tight">Sridhar-Score</span>
              <span className="text-brand-violet font-bold flex items-center gap-0.5"><Zap size={10} fill="currentColor" /> 88/100</span>
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "88%" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-brand-gradient" 
              />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto no-scrollbar">
          {SIDEBAR_LINKS.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/app" && pathname.startsWith(link.href));
            const Icon = link.icon;
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all group relative ${
                  isActive 
                    ? "bg-brand-violet/10 text-white shadow-sm ring-1 ring-brand-violet/20" 
                    : "text-brand-muted hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={20} className={isActive ? "text-brand-violet" : "group-hover:text-brand-violet transition-colors"} />
                {!isCollapsed && <span className="text-sm font-medium tracking-wide">{link.label}</span>}
                {isActive && !isCollapsed && (
                  <motion.div 
                    layoutId="active-nav"
                    className="absolute left-0 w-1 h-6 bg-brand-violet rounded-r-full" 
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-white/5 space-y-1">
          <Link href="/app/profile" className="flex items-center gap-3 w-full p-3 rounded-lg text-brand-muted hover:text-white hover:bg-white/5 transition-colors">
            <User size={20} />
            {!isCollapsed && <span className="text-sm font-medium">Profile</span>}
          </Link>
          <button className="flex items-center gap-3 w-full p-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-400/5 transition-colors">
            <LogOut size={20} />
            {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>

        {/* Collapse Toggle */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-10 w-6 h-6 bg-[#14141F] border border-white/10 rounded-full flex items-center justify-center text-brand-muted hover:text-white shadow-xl z-[60]"
        >
          <ChevronRight size={14} className={`transition-transform duration-300 ${isCollapsed ? "" : "rotate-180"}`} />
        </button>
      </aside>

      {/* Main Content Area */}
      <main className={`flex-1 transition-all duration-300 ${isCollapsed ? "pl-20" : "pl-72"}`}>
        <div className="p-8 max-w-7xl mx-auto min-h-screen">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
