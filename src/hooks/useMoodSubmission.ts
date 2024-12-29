import { useState } from 'react';
import { moodSubmissionSchema, rateLimiter } from '@/lib/validation/mood';
import { MoodService } from '@/lib/api/services/mood-service';
import type { MoodSubmission, MoodResponse } from '@/types/mood';

export function useMoodSubmission() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (data: MoodSubmission): Promise<MoodResponse | null> => {
    try {
      // Validate submission
      moodSubmissionSchema.parse(data);

      // Check rate limit
      if (!rateLimiter.isAllowed()) {
        const waitTime = Math.ceil(rateLimiter.getTimeUntilNext() / 1000);
        throw new Error(`Please wait ${waitTime} seconds before submitting again`);
      }

      setLoading(true);
      setError(null);

      const service = MoodService.getInstance();
      return await service.submitMood(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to submit mood';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    submit,
    loading,
    error,
  };
}