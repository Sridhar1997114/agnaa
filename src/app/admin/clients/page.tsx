import React from "react";
import { getClients } from "@/app/pro/actions";
import AdminClientsView from "./clients-view";

export default async function AdminClientsPage() {
  const { data: clients } = await getClients();

  return (
    <AdminClientsView 
      initialClients={clients || []}
    />
  );
}
