import { APIError } from './error';

export const fetchWithTimeout = (
  url: URL | RequestInfo,
  options: RequestInit | undefined,
  ms: number = 30000
) => {
  const controller = new AbortController();
  const promise = fetch(url, { ...options, signal: controller.signal }).catch(
    () => {
      throw new APIError({
        error: 'TIMEOUT',
        status: '504'
      });
    }
  );
  // abort promise if it cas not been completed after ms
  const timeout = setTimeout(() => controller.abort(), ms);
  return promise.finally(() => clearTimeout(timeout));
};
