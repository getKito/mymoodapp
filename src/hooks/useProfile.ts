import { useState, useEffect } from 'react';
import { ProfileService } from '@/lib/api/services/profile-service';
import { MoodCache } from '@/lib/cache/moodCache';
import type { Profile } from '@/types/auth';

const CACHE_KEY = 'user_profile';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function useProfile(userId: string) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const cache = MoodCache.getInstance();

  useEffect(() => {
    let mounted = true;

    if (!userId) {
      setLoading(false);
      return;
    }

    const loadProfile = async () => {
      try {
        // Check cache first
        const cachedProfile = cache.get<Profile>(CACHE_KEY);
        if (cachedProfile) {
          if (mounted) {
            setProfile(cachedProfile);
            setLoading(false);
          }
          return;
        }

        const service = ProfileService.getInstance();
        const data = await service.getProfile(userId);
        if (mounted) {
          setProfile(data);
          // Cache the profile with shorter duration
          cache.set(CACHE_KEY, data, CACHE_DURATION);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Failed to load profile'));
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      mounted = false;
    };
  }, [userId]);

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      setLoading(true);
      const service = ProfileService.getInstance();
      const updated = await service.updateProfile(userId, updates);
      setProfile(updated);
      // Update cache with new data
      cache.set(CACHE_KEY, updated, CACHE_DURATION);
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update profile'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    profile,
    loading,
    error,
    updateProfile,
  };
}