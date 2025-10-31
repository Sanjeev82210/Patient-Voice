-- ============================================
-- Fix RLS Policies - Remove Infinite Recursion
-- ============================================

-- Drop all existing policies that cause recursion
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can manage departments" ON public.departments;
DROP POLICY IF EXISTS "Users can view feedback in their department" ON public.feedback;
DROP POLICY IF EXISTS "Staff can update feedback" ON public.feedback;
DROP POLICY IF EXISTS "Users can view responses to feedback they can access" ON public.feedback_responses;
DROP POLICY IF EXISTS "Admins can view all audit logs" ON public.audit_logs;

-- ============================================
-- SIMPLIFIED RLS POLICIES (No Recursion)
-- ============================================

-- Profiles: Allow authenticated users to view all profiles
-- (In production, you'd store role in JWT claims and check those instead)
CREATE POLICY "Authenticated users can view profiles" ON public.profiles
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert profiles" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Departments: Allow authenticated users to manage
CREATE POLICY "Authenticated users can manage departments" ON public.departments
  FOR ALL USING (auth.role() = 'authenticated');

-- Feedback: Allow authenticated users to view and manage
CREATE POLICY "Authenticated users can view feedback" ON public.feedback
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update feedback" ON public.feedback
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Feedback responses: Allow authenticated users
CREATE POLICY "Authenticated users can view responses" ON public.feedback_responses
  FOR SELECT USING (auth.role() = 'authenticated');

-- Audit logs: Allow authenticated users to view
CREATE POLICY "Authenticated users can view audit logs" ON public.audit_logs
  FOR SELECT USING (auth.role() = 'authenticated');
