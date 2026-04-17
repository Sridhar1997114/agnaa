import React from "react";
import { getDeliverables } from "@/app/pro/actions";
import DeliverablesView from "./deliverables-view";

export default async function DeliverablesPage({ searchParams }: { searchParams: { project?: string } }) {
  const { project: projectId } = searchParams;
  const { data: deliverables } = await getDeliverables(projectId);

  return <DeliverablesView deliverables={deliverables || []} />;
}
