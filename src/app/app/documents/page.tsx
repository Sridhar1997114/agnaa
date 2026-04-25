import React from "react";
import { getDocuments } from "@/app/pro/actions";
import DocumentsView from "./documents-view";

export default async function DocumentsPage({ searchParams }: { searchParams: Promise<{ project?: string }> }) {
  const { project: projectId } = await searchParams;
  const { data: documents } = await getDocuments(projectId);

  return <DocumentsView initialDocuments={documents || []} />;
}
