import React from "react";
import { getDocuments } from "@/app/pro/actions";
import DocumentsView from "./documents-view";

export default async function DocumentsPage({ searchParams }: { searchParams: { project?: string } }) {
  const { project: projectId } = searchParams;
  const { data: documents } = await getDocuments(projectId);

  return (
    <DocumentsView 
      initialDocuments={documents || []} 
      projectId={projectId}
    />
  );
}
