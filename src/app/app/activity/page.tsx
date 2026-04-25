import React from "react";
import { getActivityLogs } from "@/app/pro/actions";
import ActivityView from "./activity-view";

export default async function ActivityPage() {
  const { data: logs } = await getActivityLogs();

  return (
    <ActivityView 
      initialLogs={logs || []} 
    />
  );
}
