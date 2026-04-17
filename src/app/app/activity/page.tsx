import React from "react";
import { getActivityLogs, getProfile } from "@/app/pro/actions";
import ActivityView from "./activity-view";

export default async function ActivityPage() {
  const [
    { data: logs },
    { data: profile }
  ] = await Promise.all([
    getActivityLogs(),
    getProfile()
  ]);

  return (
    <ActivityView 
      initialLogs={logs || []} 
      profile={profile}
    />
  );
}
