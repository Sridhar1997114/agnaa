"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  CreditCard, 
  Search, 
  Plus,
  Send,
  MoreHorizontal
} from "lucide-react";

const INVOICES = [
  { id: "INV-0012", client: "Sridhar V.", project: "Vikarabad Residential", amount: "₹ 15,00,000", status: "Paid", date: "Feb 15, 2024" },
  { id: "INV-0013", client: "Anita K.", project: "Granite Villa", amount: "₹ 5,00,000", status: "Overdue", date: "Mar 01, 2024" },
  { id: "INV-0014", client: "Sridhar V.", project: "Vikarabad Residential", amount: "₹ 20,00,000", status: "Pending", date: "Mar 20, 2024" },
];

export default function AdminFinance() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-display font-bold text-white mb-2">Financial Hub</h1>
          <p className="text-brand-muted">Generate invoices and track client payments.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-white/5 border border-white/10 hover:bg-white/10 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all">
             Generate Report
          </button>
          <button className="bg-emerald-500 hover:bg-emerald-400 text-[#0D0D14] px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all">
            <Plus size={18} /> New Invoice
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#14141F] border border-white/5">
          <p className="text-brand-muted text-xs uppercase tracking-widest font-bold mb-2">Total Outstanding</p>
          <p className="text-3xl font-display font-bold text-white">₹ 25,00,000</p>
        </div>
        <div className="p-6 rounded-2xl bg-[#14141F] border border-white/5">
          <p className="text-brand-muted text-xs uppercase tracking-widest font-bold mb-2">Overdue Payments</p>
          <p className="text-3xl font-display font-bold text-red-400">₹ 5,00,000</p>
        </div>
        <div className="p-6 rounded-2xl bg-[#14141F] border border-white/5">
          <p className="text-brand-muted text-xs uppercase tracking-widest font-bold mb-2">Collected (YTD)</p>
          <p className="text-3xl font-display font-bold text-emerald-400">₹ 82,45,000</p>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-[#14141F] border border-white/5 rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">Recent Invoices</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" size={16} />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-xs text-white focus:outline-none w-48"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-white min-w-[800px]">
            <thead className="bg-white/5 text-brand-muted uppercase tracking-wider text-[10px] font-bold">
              <tr>
                <th className="px-6 py-4">Invoice ID</th>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Sent Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {INVOICES.map((inv) => (
                <tr key={inv.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-bold text-white">{inv.id}</td>
                  <td className="px-6 py-4 text-brand-muted">
                    <p className="font-bold text-white">{inv.client}</p>
                    <p className="text-xs">{inv.project}</p>
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-white">{inv.amount}</td>
                  <td className="px-6 py-4 text-brand-muted text-xs font-bold uppercase tracking-widest">{inv.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      inv.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400' :
                      inv.status === 'Overdue' ? 'bg-red-500/10 text-red-400' :
                      'bg-brand-orange/10 text-brand-orange'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-brand-muted hover:text-white p-2 transition-colors">
                      <Send size={16} />
                    </button>
                    <button className="text-brand-muted hover:text-white p-2 transition-colors">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
