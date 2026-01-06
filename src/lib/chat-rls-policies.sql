-- RLS Policies for School Access to Student Chat Data
-- Run this in Supabase SQL Editor after fix-rls-policies.sql

-- Enable RLS on chat tables if not already enabled
ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Schools can view their students conversations" ON chat_conversations;
DROP POLICY IF EXISTS "Schools can view their students messages" ON chat_messages;

-- Allow schools to view conversations of their students
CREATE POLICY "Schools can view their students conversations"
  ON chat_conversations FOR SELECT
  TO authenticated
  USING (
    user_id IN (
      SELECT id FROM student_signups 
      WHERE school_name = (
        SELECT school_name FROM school_accounts 
        WHERE auth_user_id = auth.uid()
      )
    )
  );

-- Allow schools to view messages in their students' conversations
CREATE POLICY "Schools can view their students messages"
  ON chat_messages FOR SELECT
  TO authenticated
  USING (
    conversation_id IN (
      SELECT c.id FROM chat_conversations c
      JOIN student_signups s ON c.user_id = s.id
      JOIN school_accounts sa ON s.school_name = sa.school_name
      WHERE sa.auth_user_id = auth.uid()
    )
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_chat_conversations_user_id ON chat_conversations(user_id);
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
