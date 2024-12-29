/**
 * Validates required environment variables
 */
export function validateEnvironment() {
  const webhookUrl = import.meta.env.VITE_MAKE_WEBHOOK_URL;
  
  if (!webhookUrl) {
    throw new Error('VITE_MAKE_WEBHOOK_URL is not configured');
  }
  
  try {
    new URL(webhookUrl);
  } catch {
    throw new Error('VITE_MAKE_WEBHOOK_URL is not a valid URL');
  }
  
  return {
    webhookUrl,
  };
}