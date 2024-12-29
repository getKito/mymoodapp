import { RESULT_TYPE_PROMPTS } from './config';
import type { MoodSubmission, MoodResponse } from '@/types/mood';

const MAKE_WEBHOOK_URL = import.meta.env.VITE_MAKE_WEBHOOK_URL;

interface ErrorResponse {
  error: true;
  message: string;
}

export class APIClient {
  private static instance: APIClient;
  private constructor() {}

  static getInstance(): APIClient {
    if (!this.instance) {
      this.instance = new APIClient();
    }
    return this.instance;
  }

  async submitMood(data: MoodSubmission): Promise<MoodResponse> {
    if (!MAKE_WEBHOOK_URL) {
      throw new Error('Make.com webhook URL is not configured');
    }

    try {
      const response = await fetch(MAKE_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      let result;
      try {
        result = await response.json();
      } catch (e) {
        throw new Error('Invalid JSON response from server');
      }
      
      // Check for error response
      if ((result as ErrorResponse).error) {
        throw new Error((result as ErrorResponse).message || 'Unknown error occurred');
      }

      // Validate response has required fields
      if (!result || typeof result.guidance !== 'string') {
        throw new Error('Invalid response format: missing guidance field');
      }

      return {
        guidance: result.guidance,
        timestamp: new Date().toISOString(),
        type: data.resultType,
      };
    } catch (error) {
      // Ensure we always throw an Error object with a message
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred');
    }
  }

  getPromptForType(type: string): string | undefined {
    return RESULT_TYPE_PROMPTS[type as keyof typeof RESULT_TYPE_PROMPTS];
  }
}