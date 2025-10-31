-- RLS hardening recommendations (review carefully before applying)
-- This replaces overly permissive policies from fix-rls-policies.sql with scoped ones.

-- Example: Restrict feedback_responses SELECT to only responses related to feedback user can access
DROP POLICY IF EXISTS "Authenticated users can view responses" ON public.feedback_responses;
CREATE POLICY "Scoped responses view" ON public.feedback_responses
  FOR SELECT USING (
    EXISTS (
      SELECT 1
      FROM public.feedback f
      WHERE f.id = feedback_responses.feedback_id
      -- TODO: adjust condition to your role model; example for admin/quality managers
      AND (
        EXISTS (
          SELECT 1 FROM public.profiles p
          WHERE p.id = auth.uid() AND p.role IN ('administrator','quality_manager')
        )
        OR EXISTS (
          SELECT 1 FROM public.profiles p
          JOIN public.departments d ON d.name = p.department
          WHERE p.id = auth.uid() AND f.department_id = d.id
        )
      )
    )
  );

-- Example: Ensure only creators can UPDATE their own reports
DROP POLICY IF EXISTS "Users can update their own reports" ON public.reports;
CREATE POLICY "Users update own reports" ON public.reports
  FOR UPDATE USING (created_by = auth.uid());
