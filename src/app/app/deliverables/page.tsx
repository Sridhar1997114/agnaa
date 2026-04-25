import React from "react";
import { getDeliverables } from "@/app/pro/actions";
import DeliverablesView from "./deliverables-view";

export default async function DeliverablesPage({ searchParams }: { searchParams: Promise<{ project?: string }> }) {
  const { project: projectId } = await searchParams;
  const { data: deliverables } = await getDeliverables(projectId);

  return <DeliverablesView initialDeliverables={deliverables || []} />;
}
