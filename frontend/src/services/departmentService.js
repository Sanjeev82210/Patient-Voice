import { supabase } from '../lib/supabase';

/**
 * Department Service
 * Handles department-related operations
 */

export const departmentService = {
    /**
     * Get all departments
     */
    async getDepartments(activeOnly = true) {
        try {
            let query = supabase
                .from('departments')
                .select('*')
                .order('name', { ascending: true });

            if (activeOnly) {
                query = query.eq('is_active', true);
            }

            const { data, error } = await query;

            if (error) throw error;

            return data;
        } catch (error) {
            console.error('Get departments error:', error);
            throw error;
        }
    },

    /**
     * Get department by ID
     */
    async getDepartmentById(id) {
        try {
            const { data, error } = await supabase
                .from('departments')
                .select(`
          *,
          head:profiles!head_of_department(id, full_name, email)
        `)
                .eq('id', id)
                .single();

            if (error) throw error;

            return data;
        } catch (error) {
            console.error('Get department by ID error:', error);
            throw error;
        }
    },

    /**
     * Create department
     */
    async createDepartment(departmentData) {
        try {
            const { data, error } = await supabase
                .from('departments')
                .insert([departmentData])
                .select()
                .single();

            if (error) throw error;

            return data;
        } catch (error) {
            console.error('Create department error:', error);
            throw error;
        }
    },

    /**
     * Update department
     */
    async updateDepartment(id, updates) {
        try {
            const { data, error } = await supabase
                .from('departments')
                .update(updates)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;

            return data;
        } catch (error) {
            console.error('Update department error:', error);
            throw error;
        }
    },

    /**
     * Delete department
     */
    async deleteDepartment(id) {
        try {
            const { error } = await supabase
                .from('departments')
                .delete()
                .eq('id', id);

            if (error) throw error;

            return true;
        } catch (error) {
            console.error('Delete department error:', error);
            throw error;
        }
    },
};
