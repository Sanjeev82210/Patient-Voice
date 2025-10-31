-- ============================================
-- PatientVoice Healthcare Feedback System
-- Supabase Database Schema
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLES
-- ============================================

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL CHECK (role IN ('administrator', 'doctor', 'quality_manager', 'staff', 'patient')),
  department TEXT,
  phone TEXT,
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Departments table
CREATE TABLE IF NOT EXISTS public.departments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  head_of_department UUID REFERENCES public.profiles(id),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Feedback submissions table
CREATE TABLE IF NOT EXISTS public.feedback (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  feedback_number TEXT UNIQUE NOT NULL, -- e.g., FB-2024-001
  
  -- Patient information
  patient_name TEXT,
  patient_email TEXT,
  patient_phone TEXT,
  patient_id TEXT,
  age_range TEXT,
  gender TEXT,
  is_anonymous BOOLEAN DEFAULT false,
  
  -- Visit information
  visit_type TEXT,
  visit_date DATE,
  visit_reason TEXT,
  department_id UUID REFERENCES public.departments(id),
  attending_physician TEXT,
  
  -- Ratings (1-5 scale)
  medical_care_rating INTEGER CHECK (medical_care_rating >= 1 AND medical_care_rating <= 5),
  staff_behavior_rating INTEGER CHECK (staff_behavior_rating >= 1 AND staff_behavior_rating <= 5),
  facility_cleanliness_rating INTEGER CHECK (facility_cleanliness_rating >= 1 AND facility_cleanliness_rating <= 5),
  wait_times_rating INTEGER CHECK (wait_times_rating >= 1 AND wait_times_rating <= 5),
  communication_rating INTEGER CHECK (communication_rating >= 1 AND communication_rating <= 5),
  overall_rating NUMERIC(2,1), -- Calculated average
  
  -- Comments
  medical_care_comment TEXT,
  staff_behavior_comment TEXT,
  facility_cleanliness_comment TEXT,
  wait_times_comment TEXT,
  communication_comment TEXT,
  overall_comment TEXT,
  
  -- Sentiment analysis
  sentiment TEXT CHECK (sentiment IN ('positive', 'neutral', 'negative')),
  sentiment_score NUMERIC(3,2), -- -1.00 to 1.00
  
  -- Status and priority
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_review', 'responded', 'escalated', 'resolved', 'archived')),
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  
  -- Response tracking
  response_required BOOLEAN DEFAULT false,
  response_deadline TIMESTAMP WITH TIME ZONE,
  responded_at TIMESTAMP WITH TIME ZONE,
  responded_by UUID REFERENCES public.profiles(id),
  response_text TEXT,
  
  -- Metadata
  submission_source TEXT DEFAULT 'web', -- web, mobile, kiosk, email
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Feedback responses/notes table
CREATE TABLE IF NOT EXISTS public.feedback_responses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  feedback_id UUID REFERENCES public.feedback(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  response_type TEXT CHECK (response_type IN ('internal_note', 'patient_response', 'escalation', 'resolution')),
  response_text TEXT NOT NULL,
  is_public BOOLEAN DEFAULT false, -- Whether shared with patient
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Feedback attachments table
CREATE TABLE IF NOT EXISTS public.feedback_attachments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  feedback_id UUID REFERENCES public.feedback(id) ON DELETE CASCADE NOT NULL,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER,
  uploaded_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Feedback tags table
CREATE TABLE IF NOT EXISTS public.feedback_tags (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  feedback_id UUID REFERENCES public.feedback(id) ON DELETE CASCADE NOT NULL,
  tag TEXT NOT NULL,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(feedback_id, tag)
);

-- Reports table
CREATE TABLE IF NOT EXISTS public.reports (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  report_name TEXT NOT NULL,
  report_type TEXT NOT NULL,
  config JSONB NOT NULL, -- Report configuration/filters
  created_by UUID REFERENCES public.profiles(id) NOT NULL,
  is_scheduled BOOLEAN DEFAULT false,
  schedule_config JSONB, -- Cron expression, recipients, etc.
  last_generated_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Audit log table
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL, -- feedback, user, department, etc.
  entity_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX idx_feedback_status ON public.feedback(status);
CREATE INDEX idx_feedback_priority ON public.feedback(priority);
CREATE INDEX idx_feedback_department ON public.feedback(department_id);
CREATE INDEX idx_feedback_created_at ON public.feedback(created_at DESC);
CREATE INDEX idx_feedback_sentiment ON public.feedback(sentiment);
CREATE INDEX idx_feedback_overall_rating ON public.feedback(overall_rating);
CREATE INDEX idx_feedback_responses_feedback_id ON public.feedback_responses(feedback_id);
CREATE INDEX idx_audit_logs_user_id ON public.audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON public.audit_logs(created_at DESC);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to generate feedback number
CREATE OR REPLACE FUNCTION generate_feedback_number()
RETURNS TRIGGER AS $$
DECLARE
  next_number INTEGER;
  year_part TEXT;
BEGIN
  year_part := to_char(now(), 'YYYY');
  
  SELECT COALESCE(MAX(CAST(SUBSTRING(feedback_number FROM 'FB-\d{4}-(\d+)') AS INTEGER)), 0) + 1
  INTO next_number
  FROM public.feedback
  WHERE feedback_number LIKE 'FB-' || year_part || '-%';
  
  NEW.feedback_number := 'FB-' || year_part || '-' || LPAD(next_number::TEXT, 3, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate overall rating
CREATE OR REPLACE FUNCTION calculate_overall_rating()
RETURNS TRIGGER AS $$
DECLARE
  total_ratings INTEGER := 0;
  sum_ratings NUMERIC := 0;
BEGIN
  IF NEW.medical_care_rating IS NOT NULL THEN
    sum_ratings := sum_ratings + NEW.medical_care_rating;
    total_ratings := total_ratings + 1;
  END IF;
  
  IF NEW.staff_behavior_rating IS NOT NULL THEN
    sum_ratings := sum_ratings + NEW.staff_behavior_rating;
    total_ratings := total_ratings + 1;
  END IF;
  
  IF NEW.facility_cleanliness_rating IS NOT NULL THEN
    sum_ratings := sum_ratings + NEW.facility_cleanliness_rating;
    total_ratings := total_ratings + 1;
  END IF;
  
  IF NEW.wait_times_rating IS NOT NULL THEN
    sum_ratings := sum_ratings + NEW.wait_times_rating;
    total_ratings := total_ratings + 1;
  END IF;
  
  IF NEW.communication_rating IS NOT NULL THEN
    sum_ratings := sum_ratings + NEW.communication_rating;
    total_ratings := total_ratings + 1;
  END IF;
  
  IF total_ratings > 0 THEN
    NEW.overall_rating := ROUND(sum_ratings / total_ratings, 1);
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- TRIGGERS
-- ============================================

-- Trigger for updated_at on profiles
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger for updated_at on departments
CREATE TRIGGER update_departments_updated_at BEFORE UPDATE ON public.departments
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger for updated_at on feedback
CREATE TRIGGER update_feedback_updated_at BEFORE UPDATE ON public.feedback
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger for feedback number generation
CREATE TRIGGER generate_feedback_number_trigger BEFORE INSERT ON public.feedback
FOR EACH ROW WHEN (NEW.feedback_number IS NULL)
EXECUTE FUNCTION generate_feedback_number();

-- Trigger for overall rating calculation
CREATE TRIGGER calculate_overall_rating_trigger BEFORE INSERT OR UPDATE ON public.feedback
FOR EACH ROW
EXECUTE FUNCTION calculate_overall_rating();

-- Trigger for updated_at on feedback_responses
CREATE TRIGGER update_feedback_responses_updated_at BEFORE UPDATE ON public.feedback_responses
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger for updated_at on reports
CREATE TRIGGER update_reports_updated_at BEFORE UPDATE ON public.reports
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'administrator'
    )
  );

-- Departments policies
CREATE POLICY "Anyone can view active departments" ON public.departments
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage departments" ON public.departments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'administrator'
    )
  );

-- Feedback policies
CREATE POLICY "Users can view feedback in their department" ON public.feedback
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() 
      AND (
        role IN ('administrator', 'quality_manager')
        OR (role IN ('doctor', 'staff') AND department = (SELECT name FROM public.departments WHERE id = feedback.department_id))
      )
    )
  );

CREATE POLICY "Anyone can submit feedback" ON public.feedback
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Staff can update feedback" ON public.feedback
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('administrator', 'quality_manager', 'doctor', 'staff')
    )
  );

-- Feedback responses policies
CREATE POLICY "Users can view responses to feedback they can access" ON public.feedback_responses
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.feedback
      WHERE id = feedback_responses.feedback_id
    )
  );

CREATE POLICY "Authenticated users can create responses" ON public.feedback_responses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Reports policies
CREATE POLICY "Users can view their own reports" ON public.reports
  FOR SELECT USING (created_by = auth.uid());

CREATE POLICY "Users can create reports" ON public.reports
  FOR INSERT WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can update their own reports" ON public.reports
  FOR UPDATE USING (created_by = auth.uid());

-- Audit logs policies
CREATE POLICY "Admins can view all audit logs" ON public.audit_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'administrator'
    )
  );

-- ============================================
-- SEED DATA
-- ============================================

-- Insert sample departments
INSERT INTO public.departments (name, description, is_active) VALUES
  ('Cardiology', 'Heart and cardiovascular care', true),
  ('Emergency', 'Emergency medical services', true),
  ('Pediatrics', 'Children''s healthcare', true),
  ('Orthopedics', 'Bone and joint care', true),
  ('Radiology', 'Medical imaging services', true),
  ('Oncology', 'Cancer treatment and care', true)
ON CONFLICT (name) DO NOTHING;

-- Note: User profiles will be created automatically via Supabase Auth triggers
-- You'll need to set up an auth trigger to create profile entries when users sign up
