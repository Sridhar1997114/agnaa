-- Supabase Migration: Pro.Agnaa.in Refined Schema v1.0
-- Description: Adds Quotations, Invoices, Payments, and Change Orders with strict RLS.

-- 1. Quotations Table
CREATE TABLE IF NOT EXISTS public.quotations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  client_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'draft', -- 'draft', 'sent', 'approved', 'rejected', 'expired'
  valid_until DATE NOT NULL,
  file_url TEXT,
  version INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.quotations ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER handle_quotations_updated_at BEFORE UPDATE ON public.quotations
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 2. Invoices Table (Refining financial_records into a structured system)
CREATE TABLE IF NOT EXISTS public.invoices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  client_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  quotation_id UUID REFERENCES public.quotations(id) ON DELETE SET NULL,
  invoice_number TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'unpaid', -- 'unpaid', 'partial', 'paid', 'overdue'
  due_date DATE NOT NULL,
  paid_date DATE,
  file_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER handle_invoices_updated_at BEFORE UPDATE ON public.invoices
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 3. Payments Table
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_id UUID REFERENCES public.invoices(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  payment_date DATE DEFAULT CURRENT_DATE,
  payment_method TEXT, -- 'wire', 'upi', 'cash', 'card'
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- 4. Change Orders Table
CREATE TABLE IF NOT EXISTS public.change_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  extra_amount NUMERIC DEFAULT 0,
  extra_days INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.change_orders ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER handle_change_orders_updated_at BEFORE UPDATE ON public.change_orders
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- RLS POLICIES FOR NEW TABLES

-- Quotations
CREATE POLICY "Clients can view their own quotations" ON public.quotations
  FOR SELECT USING (auth.uid() = client_id);

CREATE POLICY "Admins can CRUD all quotations" ON public.quotations
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  );

-- Invoices
CREATE POLICY "Clients can view their own invoices" ON public.invoices
  FOR SELECT USING (auth.uid() = client_id);

CREATE POLICY "Admins can CRUD all invoices" ON public.invoices
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  );

-- Payments
CREATE POLICY "Clients can view their project payments" ON public.payments
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.invoices i WHERE i.id = public.payments.invoice_id AND i.client_id = auth.uid())
  );

CREATE POLICY "Admins can CRUD all payments" ON public.payments
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  );

-- Change Orders
CREATE POLICY "Clients can view their project change orders" ON public.change_orders
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.projects p WHERE p.id = public.change_orders.project_id AND p.client_id = auth.uid())
  );

CREATE POLICY "Admins can CRUD all change orders" ON public.change_orders
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  );
