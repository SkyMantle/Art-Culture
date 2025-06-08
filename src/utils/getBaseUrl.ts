export function getBaseUrl(): string {
  if (typeof window === 'undefined') {
    return process.env.API_BASE_URL || '';
  }
  return window.location.origin;
}
