import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { MoodCache } from '@/lib/cache/moodCache';

const PREFETCH_CACHE_KEY = 'prefetched_data';
const PREFETCH_DURATION = 30 * 1000; // 30 seconds

export function usePrefetch(userId: string | undefined) {
  useEffect(() => {
    if (!userId) return;

    const cache = MoodCache.getInstance();
    const prefetchData = async () => {
      try {
        // Check if we recently prefetched
        const cached = cache.get(PREFETCH_CACHE_KEY);
        if (cached) return;

        // Prefetch profile and recent entries in parallel
        await Promise.all([
          supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single(),
          supabase
            .from('mood_entries')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .limit(3)
        ]);

        // Mark as prefetched
        cache.set(PREFETCH_CACHE_KEY, true, PREFETCH_DURATION);
      } catch (error) {
        console.error('Prefetch error:', error);
      }
    };

    prefetchData();
  }, [userId]);
}