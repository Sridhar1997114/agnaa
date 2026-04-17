-- Seed Data for pro.agnaa.in
-- Run this in the Supabase SQL Editor to populate the portal for testing

-- 1. Create a mock admin and client profile (assuming IDs match auth.users)
-- Replace with real Auth UIDs if testing locally based on created auth users
INSERT INTO public.profiles (id, full_name, email, role, sridhar_score, status)
VALUES 
  ('a1b2c3d4-e5f6-4321-8765-abcdef123456', 'Sridhar Architect', 'sridhar@agnaa.in', 'admin', 1.0, 'active'),
  ('f1e2d3c4-b5a6-4321-8765-123456abcdef', 'Premium Client', 'client@example.com', 'client', 0.88, 'active'),
  ('12345678-1234-1234-1234-123456789012', 'Another Client', 'client2@example.com', 'client', 0.75, 'active')
ON CONFLICT (id) DO UPDATE SET 
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  sridhar_score = EXCLUDED.sridhar_score,
  status = EXCLUDED.status;

-- 2. Create projects
INSERT INTO public.projects (id, client_id, title, type, location, area_sqft, base_psf, handover_psf, booking_day, payment_factor, status, start_date)
VALUES 
  ('p1000000-0000-0000-0000-000000000001', 'f1e2d3c4-b5a6-4321-8765-123456abcdef', 'Vikarabad Residential', 'Architecture', 'Vikarabad, Telangana', 2500, 4500, 7500, 412, 1.025, 'execution', '2023-11-01'),
  ('p1000000-0000-0000-0000-000000000002', 'f1e2d3c4-b5a6-4321-8765-123456abcdef', 'Granite Villa Renovation', 'Interior Design', 'Jubilee Hills', 1200, 5500, 8500, 45, 1.01, 'design', '2024-01-15'),
  ('p1000000-0000-0000-0000-000000000003', '12345678-1234-1234-1234-123456789012', 'Lakeview Condo', 'Architecture', 'Gachibowli', 1800, 4000, 6000, 150, 1.0, 'lead', NULL)
ON CONFLICT (id) DO NOTHING;

-- 3. Create deliverables
INSERT INTO public.deliverables (project_id, title, status, description, file_url)
VALUES 
  ('p1000000-0000-0000-0000-000000000001', 'Ground Floor Plan - Final', 'approved', 'Architectural layout for the primary living space.', 'https://pro.agnaa.in/mock/ground_floor.pdf'),
  ('p1000000-0000-0000-0000-000000000001', 'Elevation Drawings', 'pending', 'Front and side elevation drawings.', NULL),
  ('p1000000-0000-0000-0000-000000000002', 'Material Moodboard', 'declined', 'Initial moodboard concept for the master bedroom.', 'https://pro.agnaa.in/mock/moodboard_v1.pdf');

-- 4. Create financial records
INSERT INTO public.financial_records (project_id, item_name, amount, status, due_date, paid_date, receipt_url)
VALUES 
  ('p1000000-0000-0000-0000-000000000001', 'Design Finalization Fee', 1500000, 'paid', '2024-02-15', '2024-02-10', 'https://pro.agnaa.in/mock/receipt_1.pdf'),
  ('p1000000-0000-0000-0000-000000000001', 'Execution Milestone 1', 2500000, 'unpaid', '2024-05-01', NULL, NULL),
  ('p1000000-0000-0000-0000-000000000002', 'Retainer Fee', 50000, 'paid', '2024-01-20', '2024-01-20', 'https://pro.agnaa.in/mock/receipt_2.pdf'),
  ('p1000000-0000-0000-0000-000000000002', 'Concept Approval Payment', 300000, 'overdue', '2024-03-01', NULL, NULL);

-- 5. Activity Logs
INSERT INTO public.activity_log (user_id, project_id, action, metadata)
VALUES 
  ('a1b2c3d4-e5f6-4321-8765-abcdef123456', 'p1000000-0000-0000-0000-000000000001', 'Uploaded Ground Floor Plan - Final', '{"file_type": "pdf", "size": "4mb"}'),
  ('f1e2d3c4-b5a6-4321-8765-123456abcdef', 'p1000000-0000-0000-0000-000000000001', 'Approved Deliverable', '{"deliverable_title": "Ground Floor Plan - Final"}'),
  ('f1e2d3c4-b5a6-4321-8765-123456abcdef', 'p1000000-0000-0000-0000-000000000002', 'Declined Deliverable', '{"deliverable_title": "Material Moodboard", "reason": "Colors too dark"}');
