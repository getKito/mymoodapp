const CACHE_PREFIX = 'mood_app_';
const DEFAULT_EXPIRY = 1000 * 60 * 60; // 1 hour

interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

export class MoodCache {
  private static instance: MoodCache;

  private constructor() {}

  static getInstance(): MoodCache {
    if (!this.instance) {
      this.instance = new MoodCache();
    }
    return this.instance;
  }

  private getKey(key: string): string {
    return `${CACHE_PREFIX}${key}`;
  }

  set<T>(key: string, data: T, expiry: number = DEFAULT_EXPIRY): void {
    const item: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      expiry,
    };
    localStorage.setItem(this.getKey(key), JSON.stringify(item));
  }

  get<T>(key: string): T | null {
    const item = localStorage.getItem(this.getKey(key));
    if (!item) return null;

    try {
      const parsed = JSON.parse(item) as CacheItem<T>;
      if (Date.now() - parsed.timestamp > parsed.expiry) {
        this.remove(key);
        return null;
      }
      return parsed.data;
    } catch {
      this.remove(key);
      return null;
    }
  }

  remove(key: string): void {
    localStorage.removeItem(this.getKey(key));
  }

  clear(): void {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(CACHE_PREFIX)) {
        localStorage.removeItem(key);
      }
    }
  }
}