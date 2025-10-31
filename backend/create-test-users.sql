-- Create admin profile after user is created in auth
INSERT INTO public.profiles (id, email, full_name, role, department, is_active)
SELECT 
  id, 
  email,
  'Dr. Sarah Johnson',
  'administrator',
  'Administration',
  true
FROM auth.users 
WHERE email = 'admin@hospital.com'
ON CONFLICT (id) DO UPDATE 
SET role = 'administrator', 
    full_name = 'Dr. Sarah Johnson',
    department = 'Administration';

-- Create quality manager profile
INSERT INTO public.profiles (id, email, full_name, role, department, is_active)
SELECT 
  id, 
  email,
  'Quality Manager',
  'quality_manager',
  'Quality Department',
  true
FROM auth.users 
WHERE email = 'quality@hospital.com'
ON CONFLICT (id) DO NOTHING;
