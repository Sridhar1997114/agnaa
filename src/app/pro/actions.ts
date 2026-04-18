"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { Project, Invoice, Document, ActivityLog } from "@/lib/types/database";

// --- Profile Actions ---

export async function getProfile() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { data, error } = await supabase
    .from("profiles")
    .select("*, projects(id, budget, balance_due)")
    .eq("id", user.id)
    .single();

  return { data: data as any, error };
}

// --- Project Actions ---

export async function getProjects() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  
  let query = supabase.from("projects").select("*, profiles!projects_client_id_fkey(full_name)");
  
  if (profile?.role !== 'admin') {
    query = query.eq("client_id", user.id);
  }

  const { data, error } = await query.order("created_at", { ascending: false });
  return { data: data as any[], error };
}

export async function getProjectById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*, profiles(*)")
    .eq("id", id)
    .single();

  return { data: data as any, error };
}

// --- Document Actions ---

export async function getDocuments(projectId?: string) {
  const supabase = await createClient();
  let query = supabase.from("documents").select("*");
  
  if (projectId) {
    query = query.eq("project_id", projectId);
  }

  const { data, error } = await query.order("created_at", { ascending: false });
  return { data: data as Document[], error };
}

export async function getDeliverables(projectId?: string) {
  const supabase = await createClient();
  let query = supabase.from("documents").select("*").eq("category", "deliverable");
  
  if (projectId) {
    query = query.eq("project_id", projectId);
  }

  const { data, error } = await query.order("created_at", { ascending: false });
  return { data: data as Document[], error };
}

export async function uploadDocument(formData: FormData, projectId: string) {
  const supabase = await createClient();
  const file = formData.get("file") as File;
  const fileName = file.name;
  const filePath = `projects/${projectId}/${Date.now()}_${fileName}`;

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("documents")
    .upload(filePath, file);

  if (uploadError) return { error: uploadError.message };

  const { error: dbError } = await supabase.from("documents").insert({
    project_id: projectId,
    title: fileName,
    category: 'upload',
    file_path: filePath,
    is_public: true
  });

  revalidatePath("/app/documents");
  return { data: uploadData, error: dbError?.message };
}

// --- Financial Actions ---

export async function getInvoices() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();

  let query = supabase.from("invoices").select("*, projects(title, client_id)");
  
  if (profile?.role !== 'admin') {
    query = query.eq("projects.client_id", user.id);
  }

  const { data, error } = await query.order("created_at", { ascending: false });
  return { data: data as any[], error };
}

// --- Activity Actions ---

export async function getActivityLogs() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const { data, error } = await supabase
    .from("activity_logs")
    .select("*, profiles(full_name)")
    .eq("profile_id", user.id)
    .order("created_at", { ascending: false });

  return { data: data as ActivityLog[], error };
}

// --- Quotation Actions ---

export async function getQuotations() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();

  let query = supabase.from("quotations").select("*, projects(title, client_id)");
  
  if (profile?.role !== 'admin') {
    query = query.eq("projects.client_id", user.id);
  }

  const { data, error } = await query.order("created_at", { ascending: false });
  return { data: data as any[], error };
}

// --- Admin Actions ---

export async function getAdminStats() {
  const supabase = await createClient();
  
  const { count: clientCount } = await supabase.from("profiles").select("*", { count: 'exact', head: true }).eq("role", "client");
  const { count: projectCount } = await supabase.from("projects").select("*", { count: 'exact', head: true });
  const { data: invoices } = await supabase.from("invoices").select("amount");
  const { count: docCount } = await supabase.from("documents").select("*", { count: 'exact', head: true });

  const totalRevenue = invoices?.reduce((sum: number, inv: any) => sum + (inv.amount || 0), 0) || 0;

  return {
    data: {
      clientCount: clientCount || 0,
      projectCount: projectCount || 0,
      totalRevenue,
      docCount: docCount || 0,
    }
  };
}

export async function getAllActivityLogs() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("activity_logs")
    .select("*, profiles(full_name)")
    .order("created_at", { ascending: false })
    .limit(10);

  return { data: data as ActivityLog[], error };
}

export async function getClients() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*, projects(id, budget, balance_due)")
    .eq("role", "client")
    .order("created_at", { ascending: false });


  export async function getVaultFiles() {
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return { data: [], error: "Not authenticated" };

      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .order("created_at", { ascending: false });

      return { data: data as any[], error };
  }
  
  return { data, error };
}
