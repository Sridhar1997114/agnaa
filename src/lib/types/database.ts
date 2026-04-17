export type ProjectStatus = 'proposal' | 'design' | 'execution' | 'completed' | 'on_hold';
export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
export type UserRole = 'admin' | 'client';

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  sridhar_score: number;
  avatar_url?: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  client_id: string;
  title: string;
  slug: string;
  description?: string;
  status: ProjectStatus;
  budget_total: number;
  progress_percent: number;
  created_at: string;
  updated_at: string;
}

export interface Invoice {
  id: string;
  project_id: string;
  invoice_number: string;
  amount_total: number;
  balance_due: number;
  status: InvoiceStatus;
  due_date: string;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  invoice_id: string;
  amount: number;
  method?: string;
  transaction_ref?: string;
  created_at: string;
}

export interface Document {
  id: string;
  project_id: string;
  title: string;
  category?: string;
  file_path: string;
  is_public: boolean;
  created_at: string;
}

export interface ActivityLog {
  id: string;
  profile_id: string;
  action: string;
  detail?: string;
  category?: string;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Profile, 'id'>>;
      };
      projects: {
        Row: Project;
        Insert: Omit<Project, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Project, 'id'>>;
      };
      invoices: {
        Row: Invoice;
        Insert: Omit<Invoice, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Invoice, 'id'>>;
      };
      // ... more as needed
    }
  }
}
