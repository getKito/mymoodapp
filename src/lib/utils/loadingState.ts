// Global loading state manager
let loadingTimeout: NodeJS.Timeout | null = null;

export const loadingState = {
  start() {
    if (loadingTimeout) {
      clearTimeout(loadingTimeout);
    }
  },
  
  stop() {
    if (loadingTimeout) {
      clearTimeout(loadingTimeout);
      loadingTimeout = null;
    }
  },
  
  clear() {
    if (loadingTimeout) {
      clearTimeout(loadingTimeout);
      loadingTimeout = null;
    }
  }
};