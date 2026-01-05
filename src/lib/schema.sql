-- StudyBuddy Database Schema
-- Execute this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- School Leads Table
CREATE TABLE IF NOT EXISTS school_leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Contact Information
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  position TEXT NOT NULL,
  
  -- School Details
  school_name TEXT NOT NULL,
  province TEXT NOT NULL,
  school_type TEXT NOT NULL,
  learner_count INTEGER NOT NULL,
  curriculum TEXT[] NOT NULL DEFAULT '{}',
  
  -- Requirements
  subjects TEXT[] NOT NULL DEFAULT '{}',
  current_solution TEXT,
  challenges TEXT NOT NULL,
  preferred_start_date DATE,
  
  -- Compliance
  gdpr_consent BOOLEAN NOT NULL DEFAULT false,
  
  -- Lead Management
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'demo_scheduled', 'converted', 'rejected')),
  notes TEXT
);

-- Student Signups Table
CREATE TABLE IF NOT EXISTS student_signups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Personal Information
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  grade INTEGER NOT NULL CHECK (grade >= 8 AND grade <= 12),
  
  -- Parent/Guardian (for minors)
  parent_email TEXT,
  
  -- Academic Information
  subjects TEXT[] NOT NULL DEFAULT '{}',
  
  -- Marketing
  referral_source TEXT,
  
  -- Compliance
  gdpr_consent BOOLEAN NOT NULL DEFAULT false,
  
  -- Trial Management
  trial_ends_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '14 days'),
  status TEXT DEFAULT 'trial' CHECK (status IN ('trial', 'active', 'inactive', 'suspended'))
);

-- Chat Conversations Table
CREATE TABLE IF NOT EXISTS chat_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- User Reference
  user_id UUID NOT NULL REFERENCES student_signups(id) ON DELETE CASCADE,
  
  -- Conversation Metadata
  subject TEXT NOT NULL,
  grade INTEGER NOT NULL,
  title TEXT,
  
  -- Usage Tracking
  message_count INTEGER DEFAULT 0,
  token_count INTEGER DEFAULT 0
);

-- Chat Messages Table
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Conversation Reference
  conversation_id UUID NOT NULL REFERENCES chat_conversations(id) ON DELETE CASCADE,
  
  -- Message Content
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  
  -- Token Tracking
  tokens INTEGER DEFAULT 0
);

-- Payment Proofs Table
CREATE TABLE IF NOT EXISTS payment_proofs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- User Reference
  user_id UUID NOT NULL REFERENCES student_signups(id) ON DELETE CASCADE,
  
  -- Payment Information
  amount DECIMAL(10, 2) NOT NULL,
  payment_method TEXT NOT NULL,
  reference_number TEXT,
  
  -- Proof Upload
  proof_image_url TEXT NOT NULL,
  
  -- Admin Approval
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewed_by TEXT,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  rejection_reason TEXT,
  
  -- Subscription Period
  subscription_start_date DATE,
  subscription_end_date DATE
);

-- Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_school_leads_email ON school_leads(email);
CREATE INDEX IF NOT EXISTS idx_school_leads_status ON school_leads(status);
CREATE INDEX IF NOT EXISTS idx_school_leads_created_at ON school_leads(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_student_signups_email ON student_signups(email);
CREATE INDEX IF NOT EXISTS idx_student_signups_status ON student_signups(status);
CREATE INDEX IF NOT EXISTS idx_student_signups_created_at ON student_signups(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_chat_conversations_user_id ON chat_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_updated_at ON chat_conversations(updated_at DESC);

CREATE INDEX IF NOT EXISTS idx_chat_messages_conversation_id ON chat_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at ASC);

CREATE INDEX IF NOT EXISTS idx_payment_proofs_user_id ON payment_proofs(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_proofs_status ON payment_proofs(status);
CREATE INDEX IF NOT EXISTS idx_payment_proofs_created_at ON payment_proofs(created_at DESC);

-- Row Level Security (RLS) Policies

-- Enable RLS
ALTER TABLE school_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_proofs ENABLE ROW LEVEL SECURITY;

-- School Leads Policies
CREATE POLICY "Anyone can submit school lead"
  ON school_leads FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view all school leads"
  ON school_leads FOR SELECT
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins can update school leads"
  ON school_leads FOR UPDATE
  USING (auth.jwt() ->> 'role' = 'admin');

-- Student Signups Policies
CREATE POLICY "Anyone can signup as student"
  ON student_signups FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view own signup"
  ON student_signups FOR SELECT
  USING (auth.uid() = id OR auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins can update student signups"
  ON student_signups FOR UPDATE
  USING (auth.jwt() ->> 'role' = 'admin');

-- Chat Conversations Policies
CREATE POLICY "Users can create own conversations"
  ON chat_conversations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own conversations"
  ON chat_conversations FOR SELECT
  USING (auth.uid() = user_id OR auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Users can update own conversations"
  ON chat_conversations FOR UPDATE
  USING (auth.uid() = user_id);

-- Chat Messages Policies
CREATE POLICY "Users can create messages in own conversations"
  ON chat_messages FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM chat_conversations
      WHERE id = conversation_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view messages in own conversations"
  ON chat_messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM chat_conversations
      WHERE id = conversation_id AND (user_id = auth.uid() OR auth.jwt() ->> 'role' = 'admin')
    )
  );

-- Payment Proofs Policies
CREATE POLICY "Users can submit own payment proofs"
  ON payment_proofs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own payment proofs"
  ON payment_proofs FOR SELECT
  USING (auth.uid() = user_id OR auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins can update payment proofs"
  ON payment_proofs FOR UPDATE
  USING (auth.jwt() ->> 'role' = 'admin');

-- Updated At Trigger Function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply Updated At Triggers
CREATE TRIGGER update_school_leads_updated_at
  BEFORE UPDATE ON school_leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_student_signups_updated_at
  BEFORE UPDATE ON student_signups
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_chat_conversations_updated_at
  BEFORE UPDATE ON chat_conversations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payment_proofs_updated_at
  BEFORE UPDATE ON payment_proofs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
