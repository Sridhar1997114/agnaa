-- Supabase Migration: Initial Portal Schema
-- Description: Core tables for pro.agnaa.in client portal

-- 0. Helper Functions for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 1. Profiles (for clients and team members)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  email TEXT UNIQUE,
  avatar_url TEXT,
  role TEXT DEFAULT 'client', -- 'admin' or 'client'
  sridhar_score DECIMAL(3, 2) DEFAULT 0.0, -- 0.0 to 1.0 (or mapped to 0-100)
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER handle_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 2. Projects
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type TEXT, -- 'Architecture', 'Construction', 'Interior', 'Ecosystem'
  location TEXT,
  area_sqft NUMERIC,
  base_psf NUMERIC,
  handover_psf NUMERIC,
  booking_day INTEGER, -- 1 to 730
  payment_factor NUMERIC,
  status TEXT DEFAULT 'in-progress', -- 'lead', 'design', 'execution', 'handover'
  start_date DATE,
  estimated_completion DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER handle_projects_updated_at BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 3. Deliverables
CREATE TABLE IF NOT EXISTS public.deliverables (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'declined'
  file_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER handle_deliverables_updated_at BEFORE UPDATE ON public.deliverables
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 4. Financial Records
CREATE TABLE IF NOT EXISTS public.financial_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  item_name TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  due_date DATE,
  paid_date DATE,
  status TEXT DEFAULT 'unpaid', -- 'unpaid', 'partial', 'paid', 'overdue'
  receipt_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER handle_financial_records_updated_at BEFORE UPDATE ON public.financial_records
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 5. Activity Log
CREATE TABLE IF NOT EXISTS public.activity_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deliverables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

-- Governance Policies (Comprehensive)

-- Profiles Policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  );

CREATE POLICY "Admins can update all profiles" ON public.profiles
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  );

-- Projects Policies
CREATE POLICY "Clients can view their own projects" ON public.projects
  FOR SELECT USING (auth.uid() = client_id);

CREATE POLICY "Admins can CRUD all projects" ON public.projects
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  );

-- Deliverables Policies
CREATE POLICY "Clients can view their project deliverables" ON public.deliverables
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.projects p WHERE p.id = public.deliverables.project_id AND p.client_id = auth.uid())
  );

CREATE POLICY "Admins can CRUD all deliverables" ON public.deliverables
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  );

-- Financial Records Policies
CREATE POLICY "Clients can view their project financial records" ON public.financial_records
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.projects p WHERE p.id = public.financial_records.project_id AND p.client_id = auth.uid())
  );

CREATE POLICY "Admins can CRUD all financial records" ON public.financial_records
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  );

-- Activity Log Policies
CREATE POLICY "Users can insert activity logs for their actions" ON public.activity_log
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Clients can view their project activity" ON public.activity_log
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.projects p WHERE p.id = public.activity_log.project_id AND p.client_id = auth.uid())
  );

CREATE POLICY "Admins can view all activity logs" ON public.activity_log
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  );
