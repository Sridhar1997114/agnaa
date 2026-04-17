import React from "react";
import { getInvoices } from "@/app/pro/actions";
import AdminPaymentsView from "./payments-view";

export default async function AdminPaymentsPage() {
  const { data: invoices } = await getInvoices();
  // For now, since we don't have a separate payments table, 
  // we'll derive some payment data or just show paid invoices.

  return (
    <AdminPaymentsView 
      initialData={invoices || []}
    />
  );
}
