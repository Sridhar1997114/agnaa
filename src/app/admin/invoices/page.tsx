import React from "react";
import { getInvoices } from "@/app/pro/actions";
import AdminInvoicesView from "./invoices-view";

export default async function AdminInvoicesPage() {
  const { data: invoices } = await getInvoices();

  return (
    <AdminInvoicesView 
      initialInvoices={invoices || []}
    />
  );
}
