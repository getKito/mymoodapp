import { useState, useCallback } from 'react';

interface RetryConfig {
  maxAttempts?: number;
  delayMs?: number;
}

export function useRetry<T>(
  operation: () => Promise<T>,
  { maxAttempts = 3, delayMs = 1000 }: RetryConfig = {}
) {
  const [attempts, setAttempts] = useState(0);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    for (let i = 0; i < maxAttempts; i++) {
      try {
        const result = await operation();
        setLoading(false);
        return result;
      } catch (err) {
        if (i === maxAttempts - 1) {
          const error = err instanceof Error ? err : new Error('Operation failed');
          setError(error);
          setLoading(false);
          throw error;
        }
        setAttempts(i + 1);
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
  }, [operation, maxAttempts, delayMs]);

  return { execute, error, loading, attempts };
}