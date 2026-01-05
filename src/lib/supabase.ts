import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export type Database = {
  public: {
    Tables: {
      school_leads: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          full_name: string
          email: string
          phone: string
          position: string
          school_name: string
          province: string
          school_type: string
          learner_count: number
          curriculum: string[]
          subjects: string[]
          current_solution: string | null
          challenges: string
          preferred_start_date: string | null
          gdpr_consent: boolean
          status: 'new' | 'contacted' | 'demo_scheduled' | 'converted' | 'rejected'
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          full_name: string
          email: string
          phone: string
          position: string
          school_name: string
          province: string
          school_type: string
          learner_count: number
          curriculum: string[]
          subjects: string[]
          current_solution?: string | null
          challenges: string
          preferred_start_date?: string | null
          gdpr_consent: boolean
          status?: 'new' | 'contacted' | 'demo_scheduled' | 'converted' | 'rejected'
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          full_name?: string
          email?: string
          phone?: string
          position?: string
          school_name?: string
          province?: string
          school_type?: string
          learner_count?: number
          curriculum?: string[]
          subjects?: string[]
          current_solution?: string | null
          challenges?: string
          preferred_start_date?: string | null
          gdpr_consent?: boolean
          status?: 'new' | 'contacted' | 'demo_scheduled' | 'converted' | 'rejected'
          notes?: string | null
        }
      }
      student_signups: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          full_name: string
          email: string
          phone: string
          date_of_birth: string
          grade: number
          parent_email: string | null
          subjects: string[]
          referral_source: string | null
          gdpr_consent: boolean
          trial_ends_at: string
          status: 'trial' | 'active' | 'inactive' | 'suspended'
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          full_name: string
          email: string
          phone: string
          date_of_birth: string
          grade: number
          parent_email?: string | null
          subjects: string[]
          referral_source?: string | null
          gdpr_consent: boolean
          trial_ends_at?: string
          status?: 'trial' | 'active' | 'inactive' | 'suspended'
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          full_name?: string
          email?: string
          phone?: string
          date_of_birth?: string
          grade?: number
          parent_email?: string | null
          subjects?: string[]
          referral_source?: string | null
          gdpr_consent?: boolean
          trial_ends_at?: string
          status?: 'trial' | 'active' | 'inactive' | 'suspended'
        }
      }
      chat_conversations: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          subject: string
          grade: number
          title: string | null
          message_count: number
          token_count: number
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id: string
          subject: string
          grade: number
          title?: string | null
          message_count?: number
          token_count?: number
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          subject?: string
          grade?: number
          title?: string | null
          message_count?: number
          token_count?: number
        }
      }
      chat_messages: {
        Row: {
          id: string
          created_at: string
          conversation_id: string
          role: 'user' | 'assistant'
          content: string
          tokens: number
        }
        Insert: {
          id?: string
          created_at?: string
          conversation_id: string
          role: 'user' | 'assistant'
          content: string
          tokens?: number
        }
        Update: {
          id?: string
          created_at?: string
          conversation_id?: string
          role?: 'user' | 'assistant'
          content?: string
          tokens?: number
        }
      }
      payment_proofs: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          amount: number
          payment_method: string
          reference_number: string | null
          proof_image_url: string
          status: 'pending' | 'approved' | 'rejected'
          reviewed_by: string | null
          reviewed_at: string | null
          rejection_reason: string | null
          subscription_start_date: string | null
          subscription_end_date: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id: string
          amount: number
          payment_method: string
          reference_number?: string | null
          proof_image_url: string
          status?: 'pending' | 'approved' | 'rejected'
          reviewed_by?: string | null
          reviewed_at?: string | null
          rejection_reason?: string | null
          subscription_start_date?: string | null
          subscription_end_date?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          amount?: number
          payment_method?: string
          reference_number?: string | null
          proof_image_url?: string
          status?: 'pending' | 'approved' | 'rejected'
          reviewed_by?: string | null
          reviewed_at?: string | null
          rejection_reason?: string | null
          subscription_start_date?: string | null
          subscription_end_date?: string | null
        }
      }
    }
  }
}
