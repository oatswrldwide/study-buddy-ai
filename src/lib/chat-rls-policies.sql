-- RLS Policies for School Access to Student Chat Data
-- Run this AFTER add-school-name-to-students.sql

-- Enable RLS on chat tables if not already enabled
ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Schools can view their students conversations" ON chat_conversations;
DROP POLICY IF EXISTS "Schools can view their students messages" ON chat_messages;
DROP POLICY IF EXISTS "Students can view own conversations" ON chat_conversations;
DROP POLICY IF EXISTS "Students can view own messages" ON chat_messages;

-- Allow schools to view conversations of their students
CREATE POLICY "Schools can view their students conversations"
  ON chat_conversations FOR SELECT
  TO authenticated
  USING (
    student_signup_id IN (
      SELECT id FROM student_signups 
      WHERE school_name = (
        SELECT school_name FROM school_accounts 
        WHERE auth_user_id = auth.uid()
      )
    )
  );

-- Allow students to view their own conversations
CREATE POLICY "Students can view own conversations"
  ON chat_conversations FOR SELECT
  TO authenticated
  USING (
    auth_user_id = auth.uid() 
    OR auth.uid() IN (SELECT auth_user_id FROM student_signups WHERE id = student_signup_id)
  );

-- Allow schools to view messages in their students' conversations
CREATE POLICY "Schools can view their students messages"
  ON chat_messages FOR SELECT
  TO authenticated
  USING (
    conversation_id IN (
      SELECT c.id FROM chat_conversations c
      JOIN student_signups s ON c.student_signup_id = s.id
      JOIN school_accounts sa ON s.school_name = sa.school_name
      WHERE sa.auth_user_id = auth.uid()
    )
  );

-- Allow students to view their own messages
CREATE POLICY "Students can view own messages"
  ON chat_messages FOR SELECT
  TO authenticated
  USING (
    conversation_id IN (
      SELECT id FROM chat_conversations 
      WHERE auth_user_id = auth.uid()
    )
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_chat_conversations_student_signup_id ON chat_conversations(student_signup_id);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_auth_user_id ON chat_conversations(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_created_at ON chat_conversations(created_at);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_subject ON chat_conversations(subject);
CREATE INDEX IF NOT EXISTS idx_chat_messages_conversation_id ON chat_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_chat_messages_role ON chat_messages(role);

-- Verify policies are created
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE tablename IN ('chat_conversations', 'chat_messages')
ORDER BY tablename, policyname;
