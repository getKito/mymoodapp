import { validateEnvironment } from '../config/environment';
import type { MoodSubmission, MoodResponse } from '@/types/mood';
import { RESULT_TYPE_PROMPTS } from '../config';

export class MoodService {
  private static instance: MoodService;
  private webhookUrl: string;

  private constructor() {
    const env = validateEnvironment();
    this.webhookUrl = env.webhookUrl;
  }

  static getInstance(): MoodService {
    if (!this.instance) {
      this.instance = new MoodService();
    }
    return this.instance;
  }

  private formatPrompt(mood: string, resultType: string): string {
    const promptTemplate = RESULT_TYPE_PROMPTS[resultType as keyof typeof RESULT_TYPE_PROMPTS];
    if (!promptTemplate) {
      throw new Error(`Invalid result type: ${resultType}`);
    }
    return promptTemplate.replace(/\{\{mood\}\}/g, mood);
  }

  async submitMood(data: MoodSubmission): Promise<MoodResponse> {
    try {
      // Format the prompt based on the mood and result type
      const prompt = this.formatPrompt(data.mood, data.resultType);

      const payload = {
        mood: data.mood,
        resultType: data.resultType,
        prompt,
        timestamp: new Date().toISOString(),
      };

      console.log('Submitting to webhook:', {
        url: this.webhookUrl,
        payload,
      });

      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();
      console.log('Webhook response:', {
        status: response.status,
        body: responseText,
      });

      if (!response.ok) {
        throw new Error(`Request failed (${response.status}): ${responseText}`);
      }

      let result;
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        throw new Error(`Invalid JSON response: ${responseText}`);
      }

      if (!result || typeof result.guidance !== 'string') {
        console.error('Invalid response structure:', result);
        throw new Error('Response missing guidance field');
      }

      return {
        guidance: result.guidance,
        timestamp: new Date().toISOString(),
        type: data.resultType,
      };
    } catch (error) {
      // Enhance error logging
      console.error('Mood submission failed:', {
        error: error instanceof Error ? {
          message: error.message,
          stack: error.stack,
        } : error,
        request: {
          mood: data.mood,
          type: data.resultType,
          url: this.webhookUrl,
        },
      });
      throw error;
    }
  }
}