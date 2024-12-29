import { z } from 'zod';
import type { MoodResultType } from '@/types/mood';

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_SUBMISSIONS = 5;

export const moodSubmissionSchema = z.object({
  mood: z.string()
    .min(2, 'Mood must be at least 2 characters')
    .max(100, 'Mood cannot exceed 100 characters'),
  resultType: z.enum(['motivation', 'mindOfGod', 'sermon', 'prayer'] as const),
});

export type MoodSubmissionSchema = z.infer<typeof moodSubmissionSchema>;

class RateLimiter {
  private submissions: number[] = [];

  isAllowed(): boolean {
    const now = Date.now();
    this.submissions = this.submissions.filter(
      time => now - time < RATE_LIMIT_WINDOW
    );
    
    if (this.submissions.length >= MAX_SUBMISSIONS) {
      return false;
    }
    
    this.submissions.push(now);
    return true;
  }

  getTimeUntilNext(): number {
    if (this.submissions.length === 0) return 0;
    const oldestSubmission = this.submissions[0];
    return Math.max(0, RATE_LIMIT_WINDOW - (Date.now() - oldestSubmission));
  }
}

export const rateLimiter = new RateLimiter();