import { useState, useEffect } from 'react';
import { MoodHistoryService } from '@/lib/api/services/mood-history';
import type { MoodEntry, MoodHistoryResponse } from '@/types/mood';

export function useMoodHistory(userId: string) {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [nextCursor, setNextCursor] = useState<string>();

  const loadEntries = async (cursor?: string) => {
    try {
      setLoading(true);
      const service = MoodHistoryService.getInstance();
      const response = await service.getMoodHistory(userId, cursor);
      
      if (cursor) {
        setEntries(prev => [...prev, ...response.entries]);
      } else {
        setEntries(response.entries);
      }
      
      setHasMore(response.hasMore);
      setNextCursor(response.nextCursor);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load mood history'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEntries();
  }, [userId]);

  const loadMore = () => {
    if (hasMore && !loading && nextCursor) {
      loadEntries(nextCursor);
    }
  };

  return {
    entries,
    loading,
    error,
    hasMore,
    loadMore,
  };
}