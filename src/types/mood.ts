import { Database } from './supabase';

export type MoodResultType = 'motivation' | 'mindOfGod' | 'sermon' | 'prayer';

export interface MoodSubmission {
  mood: string;
  resultType: MoodResultType;
  userId?: string;
  timestamp?: string;
}

export interface MoodResponse {
  guidance: string;
  timestamp: string;
  type: MoodResultType;
}

export type MoodEntry = Database['public']['Tables']['mood_entries']['Row'];

export interface MoodHistoryResponse {
  entries: MoodEntry[];
  hasMore: boolean;
  nextCursor?: string;
}