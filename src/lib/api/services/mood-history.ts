import { supabase } from '@/lib/supabase';
import type { MoodHistoryResponse, MoodEntry } from '@/types/mood';

const ENTRIES_PER_PAGE = 10;

export class MoodHistoryService {
  private static instance: MoodHistoryService;

  private constructor() {}

  static getInstance(): MoodHistoryService {
    if (!this.instance) {
      this.instance = new MoodHistoryService();
    }
    return this.instance;
  }

  async getMoodHistory(userId: string, cursor?: string): Promise<MoodHistoryResponse> {
    let query = supabase
      .from('mood_entries')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(ENTRIES_PER_PAGE + 1);

    if (cursor) {
      query = query.lt('created_at', cursor);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    const hasMore = data.length > ENTRIES_PER_PAGE;
    const entries = data.slice(0, ENTRIES_PER_PAGE) as MoodEntry[];
    const nextCursor = hasMore ? entries[entries.length - 1].created_at : undefined;

    return {
      entries,
      hasMore,
      nextCursor,
    };
  }

  async saveMoodEntry(entry: Omit<MoodEntry, 'id' | 'created_at'>): Promise<MoodEntry> {
    const { data, error } = await supabase
      .from('mood_entries')
      .insert(entry)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  }
}