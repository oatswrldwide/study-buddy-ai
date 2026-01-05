-- Authentication Schema Updates for StudyBuddy AI
-- Run this in your Supabase SQL Editor

-- 1. Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT admin_users_auth_user_id_key UNIQUE (auth_user_id),
  CONSTRAINT admin_users_email_key UNIQUE (email)
);

-- 2. Create school_accounts table
CREATE TABLE IF NOT EXISTS school_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  school_lead_id UUID REFERENCES school_leads(id) ON DELETE SET NULL,
  school_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  subscription_status TEXT DEFAULT 'active' CHECK (subscription_status IN ('trial', 'active', 'inactive', 'suspended')),
  subscription_start_date TIMESTAMP WITH TIME ZONE,
  subscription_end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT school_accounts_auth_user_id_key UNIQUE (auth_user_id)
);

-- 3. Add auth_user_id to student_signups table
ALTER TABLE student_signups 
ADD COLUMN IF NOT EXISTS auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Add unique constraint
ALTER TABLE student_signups 
ADD CONSTRAINT IF NOT EXISTS student_signups_auth_user_id_key UNIQUE (auth_user_id);

-- 4. Update chat_conversations to reference auth.users correctly
-- First check if we need to update the table
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'chat_conversations' 
    AND column_name = 'user_id'
  ) THEN
    -- Rename user_id to student_id if it references student_signups
    ALTER TABLE chat_conversations RENAME COLUMN user_id TO student_signup_id;
    
    -- Add new auth_user_id column
    ALTER TABLE chat_conversations 
    ADD COLUMN auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;

-- 5. Add updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to admin_users
DROP TRIGGER IF EXISTS update_admin_users_updated_at ON admin_users;
CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Apply to school_accounts
DROP TRIGGER IF EXISTS update_school_accounts_updated_at ON school_accounts;
CREATE TRIGGER update_school_accounts_updated_at
  BEFORE UPDATE ON school_accounts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 6. Row Level Security (RLS) Policies

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE school_accounts ENABLE ROW LEVEL SECURITY;

-- Admin users policies
DROP POLICY IF EXISTS "Admin users can view all admin records" ON admin_users;
CREATE POLICY "Admin users can view all admin records"
  ON admin_users FOR SELECT
  USING (
    auth.uid() IN (SELECT auth_user_id FROM admin_users)
  );

DROP POLICY IF EXISTS "Admin users can view their own record" ON admin_users;
CREATE POLICY "Admin users can view their own record"
  ON admin_users FOR SELECT
  USING (auth.uid() = auth_user_id);

-- School accounts policies
DROP POLICY IF EXISTS "Schools can view their own account" ON school_accounts;
CREATE POLICY "Schools can view their own account"
  ON school_accounts FOR SELECT
  USING (auth.uid() = auth_user_id);

DROP POLICY IF EXISTS "Schools can update their own account" ON school_accounts;
CREATE POLICY "Schools can update their own account"
  ON school_accounts FOR UPDATE
  USING (auth.uid() = auth_user_id);

DROP POLICY IF EXISTS "Admins can view all schools" ON school_accounts;
CREATE POLICY "Admins can view all schools"
  ON school_accounts FOR SELECT
  USING (
    auth.uid() IN (SELECT auth_user_id FROM admin_users)
  );

DROP POLICY IF EXISTS "Admins can update all schools" ON school_accounts;
CREATE POLICY "Admins can update all schools"
  ON school_accounts FOR UPDATE
  USING (
    auth.uid() IN (SELECT auth_user_id FROM admin_users)
  );

-- Update student_signups policies to use auth_user_id
DROP POLICY IF EXISTS "Students can view their own signup" ON student_signups;
CREATE POLICY "Students can view their own signup"
  ON student_signups FOR SELECT
  USING (auth.uid() = auth_user_id);

DROP POLICY IF EXISTS "Students can update their own signup" ON student_signups;
CREATE POLICY "Students can update their own signup"
  ON student_signups FOR UPDATE
  USING (auth.uid() = auth_user_id);

DROP POLICY IF EXISTS "Parents can view their children's signups" ON student_signups;
CREATE POLICY "Parents can view their children's signups"
  ON student_signups FOR SELECT
  USING (
    auth.jwt()->>'email' = parent_email
  );

-- Update chat_conversations policies
DROP POLICY IF EXISTS "Users can view their own conversations" ON chat_conversations;
CREATE POLICY "Users can view their own conversations"
  ON chat_conversations FOR SELECT
  USING (auth.uid() = auth_user_id);

DROP POLICY IF EXISTS "Users can create their own conversations" ON chat_conversations;
CREATE POLICY "Users can create their own conversations"
  ON chat_conversations FOR INSERT
  WITH CHECK (auth.uid() = auth_user_id);

DROP POLICY IF EXISTS "Users can update their own conversations" ON chat_conversations;
CREATE POLICY "Users can update their own conversations"
  ON chat_conversations FOR UPDATE
  USING (auth.uid() = auth_user_id);

-- Update chat_messages policies
DROP POLICY IF EXISTS "Users can view messages in their conversations" ON chat_messages;
CREATE POLICY "Users can view messages in their conversations"
  ON chat_messages FOR SELECT
  USING (
    conversation_id IN (
      SELECT id FROM chat_conversations WHERE auth_user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can insert messages in their conversations" ON chat_messages;
CREATE POLICY "Users can insert messages in their conversations"
  ON chat_messages FOR INSERT
  WITH CHECK (
    conversation_id IN (
      SELECT id FROM chat_conversations WHERE auth_user_id = auth.uid()
    )
  );

-- 7. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_admin_users_auth_user_id ON admin_users(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_school_accounts_auth_user_id ON school_accounts(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_student_signups_auth_user_id ON student_signups(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_student_signups_parent_email ON student_signups(parent_email);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_auth_user_id ON chat_conversations(auth_user_id);

-- 8. Create a sample admin user (CHANGE THIS PASSWORD!)
-- You'll need to create the auth.users entry first via Supabase dashboard, then link it here
-- Example:
-- INSERT INTO admin_users (auth_user_id, email, full_name, role)
-- VALUES (
--   'YOUR-AUTH-USER-UUID-HERE',
--   'admin@studybuddy.co.za',
--   'Admin User',
--   'admin'
-- );
