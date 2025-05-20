export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          email: string
          credits: number
          plan: string
        }
        Insert: {
          id: string
          created_at?: string
          email: string
          credits?: number
          plan?: string
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          credits?: number
          plan?: string
        }
      }
      humanized_texts: {
        Row: {
          id: string
          created_at: string
          user_id: string
          original_text: string
          humanized_text: string
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          original_text: string
          humanized_text: string
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          original_text?: string
          humanized_text?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}