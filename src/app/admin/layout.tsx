"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users,
  Map, 
  FileText, 
  Receipt,
  Wallet,
  Settings,
  ShieldCheck,
  ChevronRight,
  LogOut,
  FileCode
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SIDEBAR_LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/clients", label: "Clients", icon: Users },
  { href: "/admin/projects", label: "Projects", icon: Map },
  { href: "/admin/documents", label: "Documents", icon: FileText },
  { href: "/admin/invoices", label: "Invoices", icon: Receipt },
  { href: "/admin/payments", label: "Payments", icon: Wallet },
  { href: "/admin/templates", label: "Templates", icon: FileCode },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#0D0D14] text-white font-sans selection:bg-brand-violet/30">
      {/* Sidebar */}
      <aside 
        className={`fixed left-0 top-0 h-full z-50 transition-all duration-300 border-r border-white/5 bg-[#14141F] flex flex-col ${
          isCollapsed ? "w-20" : "w-72"
        }`}
      >
        {/* Logo Section */}
        <div className="p-6 flex items-center gap-4">
          <div className="w-10 h-10 bg-brand-gradient rounded-lg flex items-center justify-center shadow-lg shadow-brand-violet/20 flex-shrink-0">
            <ShieldCheck size={24} className="text-white" />
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden whitespace-nowrap">
              <h1 className="font-display font-bold text-lg tracking-wider text-white uppercase">Admin OS</h1>
              <p className="text-[10px] text-brand-muted uppercase tracking-[0.2em]">Internal Management</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 mt-6 space-y-1 overflow-y-auto no-scrollbar">
          {SIDEBAR_LINKS.map((link) => {
            const currentPath = pathname ?? "";
            const isActive = currentPath === link.href || (link.href !== "/admin" && currentPath.startsWith(link.href));
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
                    layoutId="active-nav-admin"
                    className="absolute left-0 w-1 h-6 bg-brand-violet rounded-r-full" 
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-white/5 space-y-1">
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
