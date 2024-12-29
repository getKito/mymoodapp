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
          display_name: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          display_name: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          display_name?: string
          created_at?: string
          updated_at?: string
        }
      }
      mood_entries: {
        Row: {
          id: string
          user_id: string
          mood: string
          result_type: string
          guidance: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          mood: string
          result_type: string
          guidance: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          mood?: string
          result_type?: string
          guidance?: string
          created_at?: string
        }
      }
    }
  }
}