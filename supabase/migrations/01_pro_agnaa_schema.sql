-- AGNAA OS DATABASE SCHEMA V1.0 --

-- 1. EXTENSIONS --
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS --
CREATE TYPE project_status AS ENUM ('proposal', 'design', 'execution', 'completed', 'on_hold');
CREATE TYPE invoice_status AS ENUM ('draft', 'sent', 'paid', 'overdue', 'cancelled');
CREATE TYPE user_role AS ENUM ('admin', 'client');

-- 3. TABLES --

-- Profile table linked to Auth.users
CREATE TABLE profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role user_role DEFAULT 'client',
    sridhar_score DECIMAL(5,2) DEFAULT 0.0,
    avatar_url TEXT,
    phone TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects table
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    status project_status DEFAULT 'proposal',
    budget_total DECIMAL(15,2) DEFAULT 0.0,
    progress_percent INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Invoices table
CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    invoice_number TEXT UNIQUE NOT NULL,
    amount_total DECIMAL(15,2) NOT NULL,
    balance_due DECIMAL(15,2) NOT NULL,
    status invoice_status DEFAULT 'draft',
    due_date DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payments table
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE,
    amount DECIMAL(15,2) NOT NULL,
    method TEXT,
    transaction_ref TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Documents table (Technical drawings, reports, etc.)
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category TEXT,
    file_path TEXT NOT NULL, -- Logical path in Supabase Storage
    is_public BOOLEAN DEFAULT true, -- If visible to client
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activity Log table
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    detail TEXT,
    category TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ROW LEVEL SECURITY (RLS) --

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can see their own
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
-- Admins see all
CREATE POLICY "Admins view all profiles" ON profiles FOR ALL USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

-- Projects: Clients see their own
CREATE POLICY "Clients view own projects" ON projects FOR SELECT USING (client_id = auth.uid());
-- Admins see all
CREATE POLICY "Admins view all projects" ON projects FOR ALL USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

-- Similar for other tables...
CREATE POLICY "Clients view own invoices" ON invoices FOR SELECT USING (
    EXISTS (SELECT 1 FROM projects WHERE projects.id = project_id AND projects.client_id = auth.uid())
);
CREATE POLICY "Admins manage all invoices" ON invoices FOR ALL USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

-- 5. TRIGGERS for updated_at --
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_modtime BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_projects_modtime BEFORE UPDATE ON projects FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_invoices_modtime BEFORE UPDATE ON invoices FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- 6. AUTOMATIC ACTIVITY LOGGING --
CREATE OR REPLACE FUNCTION log_project_status_change()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.status <> NEW.status THEN
        INSERT INTO activity_logs (profile_id, action, detail, category)
        VALUES (NEW.client_id, 'Project Status Update', 'Project ' || NEW.title || ' moved to ' || NEW.status, 'project');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_log_project_status BEFORE UPDATE ON projects FOR EACH ROW EXECUTE PROCEDURE log_project_status_change();
