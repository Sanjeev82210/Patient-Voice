import { supabase, isSupabaseConfigured } from '../lib/supabase';

/**
 * Feedback Service
 * Handles all feedback-related operations
 */

export const feedbackService = {
    /**
     * Submit new feedback
     */
    async submitFeedback(feedbackData) {
        try {
            if (!isSupabaseConfigured()) throw new Error('Supabase is not configured.');
            const { data, error } = await supabase
                .from('feedback')
                .insert([feedbackData])
                .select()
                .single();

            if (error) throw error;

            return data;
        } catch (error) {
            console.error('Submit feedback error:', error);
            throw error;
        }
    },

    /**
     * Get all feedback with filters
     */
    async getFeedback(filters = {}) {
        try {
            if (!isSupabaseConfigured()) return { data: [], count: 0 };
            let query = supabase
                .from('feedback')
                .select(`
          *,
          department:departments(id, name),
          responded_by_user:profiles!responded_by(id, full_name, email)
        `, { count: 'exact' })
                .order('created_at', { ascending: false });

            // Apply filters
            if (filters.status) {
                query = query.eq('status', filters.status);
            }

            if (filters.priority) {
                query = query.eq('priority', filters.priority);
            }

            if (filters.department_id) {
                query = query.eq('department_id', filters.department_id);
            }

            if (filters.sentiment) {
                query = query.eq('sentiment', filters.sentiment);
            }

            if (filters.dateFrom) {
                query = query.gte('created_at', filters.dateFrom);
            }

            if (filters.dateTo) {
                query = query.lte('created_at', filters.dateTo);
            }

            if (filters.search) {
                query = query.or(`patient_name.ilike.%${filters.search}%,overall_comment.ilike.%${filters.search}%,feedback_number.ilike.%${filters.search}%`);
            }

            // Pagination
            const limit = typeof filters.limit === 'number' ? filters.limit : undefined;
            const offset = typeof filters.offset === 'number' ? filters.offset : undefined;
            if (typeof limit === 'number' && typeof offset === 'number') {
                query = query.range(offset, offset + limit - 1);
            } else if (typeof limit === 'number') {
                query = query.limit(limit);
            }

            const { data, error, count } = await query;

            if (error) throw error;

            return { data, count };
        } catch (error) {
            console.error('Get feedback error:', error);
            throw error;
        }
    },

    /**
     * Get single feedback by ID
     */
    async getFeedbackById(id) {
        try {
            if (!isSupabaseConfigured()) return null;
            const { data, error } = await supabase
                .from('feedback')
                .select(`
          *,
          department:departments(id, name),
          responded_by_user:profiles!responded_by(id, full_name, email),
          responses:feedback_responses(
            *,
            user:profiles(id, full_name, email, role)
          ),
          attachments:feedback_attachments(*),
          tags:feedback_tags(*)
        `)
                .eq('id', id)
                .single();

            if (error) throw error;

            return data;
        } catch (error) {
            console.error('Get feedback by ID error:', error);
            throw error;
        }
    },

    /**
     * Update feedback
     */
    async updateFeedback(id, updates) {
        try {
            if (!isSupabaseConfigured()) throw new Error('Supabase is not configured.');
            const { data, error } = await supabase
                .from('feedback')
                .update(updates)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;

            return data;
        } catch (error) {
            console.error('Update feedback error:', error);
            throw error;
        }
    },

    /**
     * Delete feedback
     */
    async deleteFeedback(id) {
        try {
            if (!isSupabaseConfigured()) throw new Error('Supabase is not configured.');
            const { error } = await supabase
                .from('feedback')
                .delete()
                .eq('id', id);

            if (error) throw error;

            return true;
        } catch (error) {
            console.error('Delete feedback error:', error);
            throw error;
        }
    },

    /**
     * Add response to feedback
     */
    async addResponse(feedbackId, responseData) {
        try {
            if (!isSupabaseConfigured()) throw new Error('Supabase is not configured.');
            const { data, error } = await supabase
                .from('feedback_responses')
                .insert([{
                    feedback_id: feedbackId,
                    ...responseData,
                }])
                .select()
                .single();

            if (error) throw error;

            return data;
        } catch (error) {
            console.error('Add response error:', error);
            throw error;
        }
    },

    /**
     * Get feedback statistics
     */
    async getStatistics(filters = {}) {
        try {
            // Overall stats
            const { count: totalCount } = await supabase
                .from('feedback')
                .select('id', { count: 'exact', head: true });

            // Average rating
            const { data: avgRating } = await supabase
                .from('feedback')
                .select('overall_rating');

            const average = avgRating?.length
                ? (avgRating.reduce((sum, f) => sum + (f.overall_rating || 0), 0) / avgRating.length).toFixed(1)
                : 0;

            // Sentiment breakdown
            const { data: sentiments } = await supabase
                .from('feedback')
                .select('sentiment');

            const sentimentCounts = {
                positive: sentiments?.filter(s => s.sentiment === 'positive').length || 0,
                neutral: sentiments?.filter(s => s.sentiment === 'neutral').length || 0,
                negative: sentiments?.filter(s => s.sentiment === 'negative').length || 0,
            };

            // Status breakdown
            const { data: statuses } = await supabase
                .from('feedback')
                .select('status');

            const statusCounts = statuses?.reduce((acc, s) => {
                acc[s.status] = (acc[s.status] || 0) + 1;
                return acc;
            }, {});

            return {
                total: totalCount || 0,
                averageRating: average,
                sentiments: sentimentCounts,
                statuses: statusCounts,
            };
        } catch (error) {
            console.error('Get statistics error:', error);
            throw error;
        }
    },

    /**
     * Get trending feedback (real-time)
     */
    subscribeToDashboard(callback) {
        if (!isSupabaseConfigured()) return null;
        const subscription = supabase
            .channel('feedback_changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'feedback',
                },
                (payload) => {
                    callback(payload);
                }
            )
            .subscribe();

        return subscription;
    },

    /**
     * Unsubscribe from real-time updates
     */
    unsubscribe(subscription) {
        if (subscription && isSupabaseConfigured()) {
            supabase.removeChannel(subscription);
        }
    },
};
