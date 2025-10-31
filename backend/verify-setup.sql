-- Verify database setup
SELECT 'Tables Created' as check_type, COUNT(*) as count
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('profiles', 'departments', 'feedback', 'feedback_responses', 'feedback_attachments', 'feedback_tags', 'reports', 'audit_logs')

UNION ALL

SELECT 'Departments', COUNT(*) FROM public.departments

UNION ALL

SELECT 'User Profiles', COUNT(*) FROM public.profiles;
