import { supabase } from '../lib/supabase';

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
            let query = supabase
                .from('feedback')
                .select(`
          *,
          department:departments(id, name),
          responded_by_user:profiles!responded_by(id, full_name, email)
        `)
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
            if (filters.limit) {
                query = query.limit(filters.limit);
            }

            if (filters.offset) {
                query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
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
            const { data: totalCount } = await supabase
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
        if (subscription) {
            supabase.removeChannel(subscription);
        }
    },
};
