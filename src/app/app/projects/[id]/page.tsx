import React from "react";
import { getProjectById } from "@/app/pro/actions";
import ProjectDetailsView from "./project-details-view";
import { notFound } from "next/navigation";

export default async function ProjectDetailsPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const { data: project, error } = await getProjectById(id);

  if (error || !project) {
    console.error("Error fetching project:", error);
    return notFound();
  }

  return <ProjectDetailsView project={project} />;
}
