import React from "react";
import { getDocuments } from "@/app/pro/actions";
import AdminDocumentsView from "./documents-view";

export default async function AdminDocumentsPage() {
  const { data: documents } = await getDocuments();

  return (
    <AdminDocumentsView 
      initialDocuments={documents || []}
    />
  );
}
