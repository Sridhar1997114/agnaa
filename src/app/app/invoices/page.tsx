import React from "react";
import { getInvoices } from "@/app/pro/actions";
import InvoicesView from "./invoices-view";

export default async function InvoicesPage() {
  const { data: invoices, error } = await getInvoices();

  if (error) {
    console.error("Error fetching invoices:", error);
  }

  return <InvoicesView initialInvoices={invoices || []} />;
}
