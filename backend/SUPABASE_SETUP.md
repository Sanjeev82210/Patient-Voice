# Supabase Backend Setup Guide for PatientVoice

## Prerequisites
- Supabase account (sign up at https://supabase.com)
- Node.js and npm installed
- Your PatientVoice project code

## Step 1: Create Supabase Project

1. Go to https://supabase.com and sign in
2. Click "New Project"
3. Fill in the details:
   - **Project Name**: PatientVoice-Healthcare
   - **Database Password**: (Choose a strong password - save it securely!)
   - **Region**: Select closest to your users
   - **Pricing Plan**: Free tier is fine for development
4. Click "Create new project"
5. Wait 2-3 minutes for setup to complete

## Step 2: Get Your API Credentials

1. In your Supabase project dashboard, go to **Settings** (gear icon)
2. Click **API** in the sidebar
3. You'll see two important values:
   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   - **anon/public key**: `eyJhbGc...` (long string)
4. Keep this tab open - you'll need these values

## Step 3: Configure Environment Variables

1. In your project root, create a file named `.env`:
   ```bash
   # Copy .env.example to .env
   cp .env.example .env
   ```

2. Open `.env` and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   VITE_APP_NAME=PatientVoice
   VITE_APP_ENV=development
   ```

3. **Important**: Make sure `.env` is in your `.gitignore` (it already should be)

## Step 4: Run Database Schema

1. In Supabase dashboard, click **SQL Editor** in the sidebar
2. Click **New Query**
3. Open the file `supabase-schema.sql` from your project
4. Copy ALL the contents and paste into the SQL Editor
5. Click **Run** button (or press Ctrl+Enter)
6. Wait for success message - should see "Success. No rows returned"

This will create:
- 8 tables (profiles, departments, feedback, responses, attachments, tags, reports, audit_logs)
- Indexes for better performance
- Auto-updating triggers
- Row Level Security (RLS) policies
- Sample department data

## Step 5: Set Up Authentication

### Enable Email Auth:
1. Go to **Authentication** > **Providers** in Supabase
2. Make sure **Email** is enabled
3. Configure settings:
   - **Enable email confirmations**: ON (for production) or OFF (for testing)
   - **Enable email change confirmations**: ON
   - **Secure email change**: ON

### Create Admin User (Optional):
1. Go to **Authentication** > **Users**
2. Click **Add user** > **Create new user**
3. Fill in:
   - Email: admin@hospital.com
   - Password: (choose secure password)
   - Auto Confirm User: YES
4. Click **Create user**
5. Go to **Table Editor** > **profiles**
6. Find the user you just created
7. Edit and set:
   - `role`: administrator
   - `full_name`: Admin User
   - `is_active`: true

## Step 6: Configure Storage (Optional - for file attachments)

1. Go to **Storage** in Supabase dashboard
2. Click **Create a new bucket**
3. Bucket name: `feedback-attachments`
4. Public: NO (keep private)
5. Click **Create bucket**

### Set Storage Policies:
```sql
-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'feedback-attachments');

-- Allow users to view files they have access to
CREATE POLICY "Users can view feedback attachments"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'feedback-attachments');
```

## Step 7: Test the Connection

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Open your browser and check the console
3. No Supabase errors = success! ✅

## Step 8: Test Authentication

1. Go to http://localhost:3000/login
2. Try logging in with your test credentials
3. Check Supabase dashboard > **Authentication** > **Users** to verify

## Step 9: Seed Test Data (Optional)

Run this SQL in **SQL Editor** to create sample feedback:

```sql
-- Insert sample feedback
INSERT INTO public.feedback (
  patient_name,
  patient_email,
  department_id,
  visit_type,
  visit_date,
  medical_care_rating,
  staff_behavior_rating,
  facility_cleanliness_rating,
  wait_times_rating,
  communication_rating,
  overall_comment,
  sentiment,
  status,
  priority
) VALUES
(
  'John Doe',
  'john.doe@example.com',
  (SELECT id FROM departments WHERE name = 'Cardiology' LIMIT 1),
  'Outpatient',
  CURRENT_DATE - INTERVAL '2 days',
  5,
  5,
  4,
  4,
  5,
  'Excellent care! Dr. Martinez was very thorough and explained everything clearly.',
  'positive',
  'new',
  'normal'
),
(
  'Jane Smith',
  'jane.smith@example.com',
  (SELECT id FROM departments WHERE name = 'Emergency' LIMIT 1),
  'Emergency',
  CURRENT_DATE - INTERVAL '1 day',
  3,
  2,
  3,
  1,
  2,
  'Long wait times and staff seemed overwhelmed. Needs improvement.',
  'negative',
  'escalated',
  'high'
);
```

## Troubleshooting

### Issue: "Invalid API key" error
- **Solution**: Double-check your `.env` file has correct values
- Make sure to restart dev server after changing `.env`

### Issue: "Row Level Security" policy violation
- **Solution**: Check that RLS policies were created correctly
- Run the schema SQL again if needed

### Issue: Can't insert data
- **Solution**: Check Supabase logs (Database > Logs)
- Verify table structure in Table Editor

### Issue: Authentication not working
- **Solution**: 
  - Check Email provider is enabled
  - Verify `.env` has correct keys
  - Check browser console for errors

## Next Steps

1. **Update Login Page**: Integrate with `authService.js`
2. **Update Dashboard**: Fetch real data with `feedbackService.js`
3. **Update Forms**: Submit to Supabase instead of mock data
4. **Add Real-time**: Use Supabase subscriptions for live updates
5. **Deploy**: Set up production environment variables

## Useful Links

- **Supabase Docs**: https://supabase.com/docs
- **JavaScript Client**: https://supabase.com/docs/reference/javascript
- **Row Level Security**: https://supabase.com/docs/guides/auth/row-level-security
- **Realtime**: https://supabase.com/docs/guides/realtime

## Security Best Practices

1. ✅ Never commit `.env` file to Git
2. ✅ Use Row Level Security (RLS) on all tables
3. ✅ Validate data on client AND server
4. ✅ Use HTTPS in production
5. ✅ Regularly rotate API keys
6. ✅ Enable email verification for production
7. ✅ Set up proper CORS policies
8. ✅ Monitor usage in Supabase dashboard

## Support

- Supabase Discord: https://discord.supabase.com
- GitHub Issues: https://github.com/supabase/supabase/issues
- Stack Overflow: Tag with `supabase`

---

**Your Supabase backend is now ready!** 🎉

Next: Update the login page to use Supabase authentication.
