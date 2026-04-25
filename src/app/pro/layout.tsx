"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Boxes,
  AlignLeft,
  ChevronRight,
  LogOut,
  Zap,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";
import { logout } from "@/app/pro/auth-actions";

const NAV_LINKS = [
  { href: "/pro", label: "Dashboard", icon: LayoutDashboard },
  { href: "/pro/microservices", label: "Microservices", icon: Boxes },
  { href: "/pro/activity", label: "Activity Log", icon: AlignLeft },
];

export default function ProLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#070710] text-white font-sans">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full z-50 flex flex-col border-r border-white/6 bg-[#0d0d1a]/95 backdrop-blur-2xl transition-all duration-300 ${
          collapsed ? "w-[72px]" : "w-[260px]"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 p-5 border-b border-white/6">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/25 shrink-0">
            <span className="font-bold text-sm text-white">EL</span>
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="font-bold text-[15px] text-white tracking-tight leading-none">Enthalpy Labs</p>
              <p className="text-[10px] text-white/30 uppercase tracking-[0.18em] mt-0.5 font-medium">Ops Portal</p>
            </div>
          )}
        </div>

        {/* Status Pill */}
        {!collapsed && (
          <div className="mx-4 mt-5 mb-3 px-4 py-3 rounded-xl bg-orange-500/8 border border-orange-500/15">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              <span className="text-[11px] font-semibold text-orange-300 uppercase tracking-wider">Live Operations</span>
            </div>
            <p className="text-[10px] text-white/30 mt-1 ml-4">All systems active</p>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 px-3 mt-2 space-y-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/pro" && pathname.startsWith(link.href));
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group relative ${
                  isActive
                    ? "bg-orange-500/12 text-white ring-1 ring-orange-500/20"
                    : "text-white/40 hover:text-white/80 hover:bg-white/5"
                }`}
              >
                <Icon
                  size={18}
                  className={`shrink-0 ${isActive ? "text-orange-400" : "group-hover:text-orange-400 transition-colors"}`}
                />
                {!collapsed && (
                  <span className="text-[13px] font-medium">{link.label}</span>
                )}
                {isActive && !collapsed && (
                  <motion.div
                    layoutId="active-indicator"
                    className="absolute left-0 w-0.5 h-5 bg-orange-400 rounded-r-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-white/6 space-y-1">
          {!collapsed && (
            <a
              href="https://agnaa.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/30 hover:text-white/70 hover:bg-white/5 transition-all text-[13px] font-medium"
            >
              <ExternalLink size={16} />
              agnaa.in
            </a>
          )}
          <button
            onClick={() => logout()}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-red-400/70 hover:text-red-300 hover:bg-red-500/8 transition-all"
          >
            <LogOut size={18} className="shrink-0" />
            {!collapsed && <span className="text-[13px] font-medium">Sign Out</span>}
          </button>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3.5 top-[72px] w-7 h-7 bg-[#0d0d1a] border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:border-orange-500/30 shadow-xl transition-all"
        >
          <ChevronRight
            size={13}
            className={`transition-transform duration-300 ${collapsed ? "" : "rotate-180"}`}
          />
        </button>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${collapsed ? "pl-[72px]" : "pl-[260px]"}`}>
        <div className="p-8 max-w-7xl mx-auto min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
}
