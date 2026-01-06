-- Add school_name column to student_signups table
-- Run this BEFORE running chat-rls-policies.sql

-- Add school_name column (nullable for existing students)
ALTER TABLE student_signups 
ADD COLUMN IF NOT EXISTS school_name TEXT;

-- Add curriculum column (useful for school tracking)
ALTER TABLE student_signups
ADD COLUMN IF NOT EXISTS curriculum TEXT DEFAULT 'CAPS';

-- Create index for faster school-based queries
CREATE INDEX IF NOT EXISTS idx_student_signups_school_name ON student_signups(school_name);

-- Verify column was added
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'student_signups' 
  AND column_name IN ('school_name', 'curriculum')
ORDER BY column_name;
