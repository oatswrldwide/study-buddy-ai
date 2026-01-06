-- Database function to increment conversation message count
-- Run this in Supabase SQL Editor

CREATE OR REPLACE FUNCTION increment_conversation_count(conversation_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE chat_conversations
  SET message_count = message_count + 1,
      updated_at = NOW()
  WHERE id = conversation_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
