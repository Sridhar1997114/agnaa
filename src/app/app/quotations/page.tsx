import React from "react";
import { getQuotations } from "@/app/pro/actions";
import QuotationsView from "./quotations-view";

export default async function QuotationsPage() {
  const { data: quotations, error } = await getQuotations();

  if (error) {
    // In a real app, you'd handle this better
    console.error("Error fetching quotations:", error);
  }

  return <QuotationsView quotations={quotations || []} />;
}
