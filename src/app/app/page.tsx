import React from "react";
import { 
  getProjects, 
  getProfile, 
  getActivityLogs,
  getInvoices
} from "@/app/pro/actions";
import ClientDashboardView from "./client-dashboard-view";

export default async function ClientDashboardPage() {
  const [
    { data: projects },
    { data: profile },
    { data: logs },
    { data: invoices }
  ] = await Promise.all([
    getProjects(),
    getProfile(),
    getActivityLogs(),
    getInvoices()
  ]);

  // Transform data for the view
  const stats = {
    balanceDue: invoices?.reduce((sum, inv) => sum + (inv.balance_due || 0), 0) || 0,
    paidAmount: invoices?.reduce((sum, inv) => sum + ((inv.amount_total - inv.balance_due) || 0), 0) || 0,
    activeProjects: projects?.filter(p => p.status !== 'completed').length || 0,
    pendingActions: 3, // Logic could be added to count actual pending actions
  };

  return (
    <ClientDashboardView 
      projects={projects || []}
      profile={profile}
      logs={logs || []}
      stats={stats}
    />
  );
}
