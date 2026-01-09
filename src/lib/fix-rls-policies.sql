-- Complete RLS Policy Reset for StudyBuddy AI
-- This fixes authentication and role-based access control issues
-- Run this in Supabase SQL Editor to reset all RLS policies

-- ==============================================================================
-- STEP 1: Drop all existing RLS policies to start fresh
-- ==============================================================================

DROP POLICY IF EXISTS "Anyone can submit school lead" ON school_leads;
DROP POLICY IF EXISTS "Admins can view all school leads" ON school_leads;
DROP POLICY IF EXISTS "Admins can update school leads" ON school_leads;

DROP POLICY IF EXISTS "Anyone can signup as student" ON student_signups;
DROP POLICY IF EXISTS "Users can view own signup" ON student_signups;
DROP POLICY IF EXISTS "Admins can update student signups" ON student_signups;
DROP POLICY IF EXISTS "Students can view own profile" ON student_signups;
DROP POLICY IF EXISTS "Admins can view all students" ON student_signups;

DROP POLICY IF EXISTS "Users can create own conversations" ON chat_conversations;
DROP POLICY IF EXISTS "Users can view own conversations" ON chat_conversations;
DROP POLICY IF EXISTS "Users can update own conversations" ON chat_conversations;
DROP POLICY IF EXISTS "Schools can view their students conversations" ON chat_conversations;
DROP POLICY IF EXISTS "Students can view own conversations" ON chat_conversations;

DROP POLICY IF EXISTS "Users can create messages in own conversations" ON chat_messages;
DROP POLICY IF EXISTS "Users can view messages in own conversations" ON chat_messages;
DROP POLICY IF EXISTS "Schools can view their students messages" ON chat_messages;
DROP POLICY IF EXISTS "Students can view own messages" ON chat_messages;

DROP POLICY IF EXISTS "Users can submit own payment proofs" ON payment_proofs;
DROP POLICY IF EXISTS "Users can view own payment proofs" ON payment_proofs;
DROP POLICY IF EXISTS "Admins can update payment proofs" ON payment_proofs;

-- ==============================================================================
-- STEP 2: Ensure RLS is enabled on all tables
-- ==============================================================================

ALTER TABLE school_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_proofs ENABLE ROW LEVEL SECURITY;

-- ==============================================================================
-- STEP 3: Create new simplified RLS policies
-- ==============================================================================

-- ---------------------------------------------------------------------------
-- SCHOOL LEADS: Public insert, admin-only view/update
-- ---------------------------------------------------------------------------

CREATE POLICY "school_leads_public_insert"
  ON school_leads FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "school_leads_admin_select"
  ON school_leads FOR SELECT
  TO authenticated
  USING (
    auth.jwt() ->> 'user_role' = 'admin' 
    OR auth.jwt() ->> 'role' = 'admin'
  );

CREATE POLICY "school_leads_admin_update"
  ON school_leads FOR UPDATE
  TO authenticated
  USING (
    auth.jwt() ->> 'user_role' = 'admin' 
    OR auth.jwt() ->> 'role' = 'admin'
  );

-- ---------------------------------------------------------------------------
-- STUDENT SIGNUPS: Public insert, authenticated users see own data, admins see all
-- ---------------------------------------------------------------------------

CREATE POLICY "student_signups_public_insert"
  ON student_signups FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "student_signups_select_own"
  ON student_signups FOR SELECT
  TO authenticated
  USING (
    auth.uid() = id 
    OR auth.jwt() ->> 'user_role' = 'admin'
    OR auth.jwt() ->> 'role' = 'admin'
  );

CREATE POLICY "student_signups_admin_update"
  ON student_signups FOR UPDATE
  TO authenticated
  USING (
    auth.jwt() ->> 'user_role' = 'admin' 
    OR auth.jwt() ->> 'role' = 'admin'
  );

-- ---------------------------------------------------------------------------
-- CHAT CONVERSATIONS: Users manage their own, schools see their students, admins see all
-- ---------------------------------------------------------------------------

CREATE POLICY "chat_conversations_insert_own"
  ON chat_conversations FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id
  );

CREATE POLICY "chat_conversations_select"
  ON chat_conversations FOR SELECT
  TO authenticated
  USING (
    -- User's own conversations
    auth.uid() = user_id
    -- OR student's own conversations (if student_signup_id matches)
    OR auth.uid() IN (SELECT id FROM student_signups WHERE id = chat_conversations.student_signup_id)
    -- OR school viewing their students' conversations
    OR EXISTS (
      SELECT 1 FROM student_signups ss
      JOIN school_accounts sa ON ss.school_name = sa.school_name
      WHERE ss.id = chat_conversations.student_signup_id 
        AND sa.auth_user_id = auth.uid()
    )
    -- OR admin
    OR auth.jwt() ->> 'user_role' = 'admin'
    OR auth.jwt() ->> 'role' = 'admin'
  );

CREATE POLICY "chat_conversations_update_own"
  ON chat_conversations FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = user_id
    OR auth.uid() IN (SELECT id FROM student_signups WHERE id = chat_conversations.student_signup_id)
  );

-- ---------------------------------------------------------------------------
-- CHAT MESSAGES: Users see messages in their conversations
-- ---------------------------------------------------------------------------

CREATE POLICY "chat_messages_insert"
  ON chat_messages FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM chat_conversations
      WHERE id = conversation_id 
        AND (user_id = auth.uid() OR auth.uid() IN (SELECT id FROM student_signups WHERE id = student_signup_id))
    )
  );

CREATE POLICY "chat_messages_select"
  ON chat_messages FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM chat_conversations cc
      WHERE cc.id = conversation_id 
        AND (
          cc.user_id = auth.uid()
          -- Student's own messages
          OR auth.uid() IN (SELECT id FROM student_signups WHERE id = cc.student_signup_id)
          -- School viewing their students' messages
          OR EXISTS (
            SELECT 1 FROM student_signups ss
            JOIN school_accounts sa ON ss.school_name = sa.school_name
            WHERE ss.id = cc.student_signup_id 
              AND sa.auth_user_id = auth.uid()
          )
          -- Admin
          OR auth.jwt() ->> 'user_role' = 'admin'
          OR auth.jwt() ->> 'role' = 'admin'
        )
    )
  );

-- ---------------------------------------------------------------------------
-- PAYMENT PROOFS: Users manage their own, admins approve/reject
-- ---------------------------------------------------------------------------

CREATE POLICY "payment_proofs_insert_own"
  ON payment_proofs FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id
  );

CREATE POLICY "payment_proofs_select"
  ON payment_proofs FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id
    OR auth.jwt() ->> 'user_role' = 'admin'
    OR auth.jwt() ->> 'role' = 'admin'
  );

CREATE POLICY "payment_proofs_admin_update"
  ON payment_proofs FOR UPDATE
  TO authenticated
  USING (
    auth.jwt() ->> 'user_role' = 'admin' 
    OR auth.jwt() ->> 'role' = 'admin'
  );

-- ==============================================================================
-- STEP 4: Verify policies are created
-- ==============================================================================

SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies 
WHERE schemaname = 'public'
  AND tablename IN ('school_leads', 'student_signups', 'chat_conversations', 'chat_messages', 'payment_proofs')
ORDER BY tablename, policyname;

-- ==============================================================================
-- SUCCESS MESSAGE
-- ==============================================================================
-- If you see a list of policies above, the RLS setup is complete!
-- All tables now have proper row-level security with:
-- - Public access for signups/leads
-- - User access for their own data
-- - School access for their students' data
-- - Admin access for everything
-- ==============================================================================






