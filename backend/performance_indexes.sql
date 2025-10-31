-- Additional performance indexes for common query patterns
-- Run in Supabase SQL editor

-- Fast lookup by feedback_number
CREATE INDEX IF NOT EXISTS idx_feedback_feedback_number ON public.feedback(feedback_number);

-- Frequently filtered combinations (status + created_at)
CREATE INDEX IF NOT EXISTS idx_feedback_status_created_at ON public.feedback(status, created_at DESC);

-- Frequently filtered combinations (priority + created_at)
CREATE INDEX IF NOT EXISTS idx_feedback_priority_created_at ON public.feedback(priority, created_at DESC);

-- Sentiment over time
CREATE INDEX IF NOT EXISTS idx_feedback_sentiment_created_at ON public.feedback(sentiment, created_at DESC);

-- Department name used in some joins/policies
CREATE INDEX IF NOT EXISTS idx_departments_name ON public.departments(name);
