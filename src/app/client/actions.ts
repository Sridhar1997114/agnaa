import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function clientLogin(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  // Verify if the user is a client
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single();

  if (!profile || profile.role !== 'client') {
    // If not a client, sign them out
    await supabase.auth.signOut();
    return { error: "Access denied. This portal is for clients only." };
  }

  revalidatePath("/", "layout");
  redirect("/client/dashboard");
}

export async function getClientData() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  // Fetch client profile
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError) return { error: profileError.message };

  // Fetch projects for this client
  const { data: projects, error: projectsError } = await supabase
    .from("projects")
    .select("*")
    .eq("client_id", user.id)
    .order("created_at", { ascending: false });

  if (projectsError) return { error: projectsError.message };

  // Fetch invoices for these projects
  const projectIds = projects.map(p => p.id);
  const { data: invoices } = await supabase
    .from("invoices")
    .select("*")
    .in("project_id", projectIds);

  return {
    profile,
    projects,
    invoices: invoices || []
  };
}

export async function clientLogout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/client");
}
