"use client";

import React from "react";
import { 
  History, 
  Map, 
  FileText, 
  CreditCard, 
  MessageSquare,
  CheckCircle2,
  Clock,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import { getActivityLogs } from "@/app/pro/actions";

export default function ActivityLog() {
  const [logs, setLogs] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadLogs() {
      const { data } = await getActivityLogs();
      if (data) setLogs(data);
      setLoading(false);
    }
    loadLogs();
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'site': return Map;
      case 'finance': return CreditCard;
      case 'design': return FileText;
      case 'milestone': return CheckCircle2;
      case 'comment': return MessageSquare;
      default: return History;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'site': return "text-sky-400";
      case 'finance': return "text-emerald-400";
      case 'design': return "text-brand-violet";
      case 'milestone': return "text-emerald-400";
      default: return "text-brand-muted";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-display font-bold text-white mb-2">Activity Log</h1>
        <p className="text-brand-muted">A sequential audit trail of your project's evolution.</p>
      </div>

      {/* Log Feed */}
      <div className="bg-[#14141F] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/5 bg-white/5 flex justify-between items-center">
          <span className="text-xs font-bold text-brand-muted uppercase tracking-widest">Global Activity Feed</span>
          <div className="flex gap-4">
            <select className="bg-transparent border-none text-[10px] font-bold text-brand-muted uppercase tracking-widest cursor-pointer focus:ring-0">
              <option>All Projects</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-white/5">
          {loading ? (
            <div className="p-20 text-center text-brand-muted uppercase tracking-widest text-xs font-bold">Retrieving Audit Trail...</div>
          ) : logs.length === 0 ? (
            <div className="p-20 text-center text-brand-muted uppercase tracking-widest text-xs font-bold">No Records Found</div>
          ) : logs.map((item: any, i: number) => {
            const Icon = getIcon(item.metadata?.type || 'other');
            const color = getColor(item.metadata?.type || 'other');
            
            return (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                key={item.id} 
                className="p-6 flex items-start gap-4 hover:bg-white/[0.02] transition-all group cursor-pointer"
              >
                <div className={`p-3 rounded-2xl bg-white/5 ${color} group-hover:scale-110 transition-transform shrink-0`}>
                  <Icon size={22} />
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-white font-bold group-hover:text-brand-violet transition-colors">{item.action}</h3>
                    <span className="text-[10px] text-brand-muted font-bold uppercase whitespace-nowrap">
                      {new Date(item.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-brand-muted">
                    <span className="font-semibold text-white/40">{item.profiles?.full_name || 'System'}</span>
                    <span className="w-1 h-1 bg-white/10 rounded-full" />
                    <span className="flex items-center gap-1">
                      <History size={12} /> {item.projects?.title || 'General'}
                    </span>
                  </div>
                </div>

                <div className="opacity-0 group-hover:opacity-100 transition-opacity self-center pr-2">
                  <ArrowRight size={20} className="text-brand-violet" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Load More */}
        <div className="p-6 text-center border-t border-white/5">
          <button className="text-xs font-bold text-brand-muted hover:text-white uppercase tracking-[0.2em] transition-all">
            Scroll for Historical Records
          </button>
        </div>
      </div>
    </div>
  );
}
