import { MoodService } from './services/mood-service';
import type { MoodSubmission, MoodResponse } from '@/types/mood';

export async function submitMood(data: MoodSubmission): Promise<MoodResponse> {
  const service = MoodService.getInstance();
  return service.submitMood(data);
}