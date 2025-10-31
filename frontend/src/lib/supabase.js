import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = () => {
    return !!(
        supabaseUrl &&
        supabaseAnonKey &&
        supabaseUrl !== 'YOUR_SUPABASE_URL_HERE' &&
        supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY_HERE' &&
        supabaseUrl !== 'your-project-url.supabase.co' &&
        supabaseAnonKey !== 'your-anon-key'
    );
};

// Create a single supabase client for interacting with your database
// Only create if credentials are configured, otherwise use null
export const supabase = isSupabaseConfigured()
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: true
        }
    })
    : null;
