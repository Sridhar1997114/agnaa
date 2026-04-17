import React from "react";
import { getProjects } from "@/app/pro/actions";
import AdminProjectsView from "./projects-view";

export default async function AdminProjectsPage() {
  const { data: projects } = await getProjects();

  return (
    <AdminProjectsView 
      initialProjects={projects || []}
    />
  );
}
