import fetch from 'cross-fetch';
import { APIError } from './error';

export const fetchWithTimeout = (
  apiEndpoint: URL | RequestInfo,
  options: RequestInit | undefined,
  ms: number = 30000
) => {
  const controller = new AbortController();
  const promise = fetch(apiEndpoint, {
    ...options,
    signal: controller.signal
  });

  // abort promise if it cas not been completed after ms
  const timeout = setTimeout(() => controller.abort(), ms);
  return promise.finally(() => clearTimeout(timeout));
};
