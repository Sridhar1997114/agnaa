import React from "react";
import { 
  getAdminStats, 
  getAllActivityLogs 
} from "@/app/pro/actions";
import AdminDashboardView from "./admin-dashboard-view";

export default async function AdminDashboardPage() {
  const [
    { data: stats },
    { data: logs }
  ] = await Promise.all([
    getAdminStats(),
    getAllActivityLogs()
  ]);

  return (
    <AdminDashboardView 
      stats={stats || { clientCount: 0, projectCount: 0, totalRevenue: 0, docCount: 0 }}
      logs={logs || []}
    />
  );
}
