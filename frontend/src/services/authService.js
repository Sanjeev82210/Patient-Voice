import { supabase } from '../lib/supabase';

/**
 * Authentication Service
 * Handles user authentication with Supabase
 */

export const authService = {
    /**
     * Sign in with email and password
     */
    async signIn(email, password) {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            // Get user profile
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', data.user.id)
                .single();

            if (profileError) throw profileError;

            return {
                user: data.user,
                session: data.session,
                profile,
            };
        } catch (error) {
            console.error('Sign in error:', error);
            throw error;
        }
    },

    /**
     * Sign up new user
     */
    async signUp(email, password, userData = {}) {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: userData, // Will be available in metadata
                },
            });

            if (error) throw error;

            // Create profile
            if (data.user) {
                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert([
                        {
                            id: data.user.id,
                            email: data.user.email,
                            full_name: userData.full_name || '',
                            role: userData.role || 'staff',
                            department: userData.department || null,
                            phone: userData.phone || null,
                        },
                    ]);

                if (profileError) throw profileError;
            }

            return data;
        } catch (error) {
            console.error('Sign up error:', error);
            throw error;
        }
    },

    /**
     * Sign out
     */
    async signOut() {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;

            // Clear local storage
            localStorage.removeItem('userSession');
        } catch (error) {
            console.error('Sign out error:', error);
            throw error;
        }
    },

    /**
     * Get current session
     */
    async getSession() {
        try {
            const { data, error } = await supabase.auth.getSession();
            if (error) throw error;
            return data.session;
        } catch (error) {
            console.error('Get session error:', error);
            return null;
        }
    },

    /**
     * Get current user
     */
    async getCurrentUser() {
        try {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error) throw error;

            if (user) {
                // Get profile
                const { data: profile, error: profileError } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (profileError) throw profileError;

                return { user, profile };
            }

            return null;
        } catch (error) {
            console.error('Get current user error:', error);
            return null;
        }
    },

    /**
     * Reset password
     */
    async resetPassword(email) {
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`,
            });

            if (error) throw error;
        } catch (error) {
            console.error('Reset password error:', error);
            throw error;
        }
    },

    /**
     * Update password
     */
    async updatePassword(newPassword) {
        try {
            const { error } = await supabase.auth.updateUser({
                password: newPassword,
            });

            if (error) throw error;
        } catch (error) {
            console.error('Update password error:', error);
            throw error;
        }
    },

    /**
     * Listen to auth state changes
     */
    onAuthStateChange(callback) {
        return supabase.auth.onAuthStateChange(callback);
    },
};
