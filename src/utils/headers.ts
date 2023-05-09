import { Headers } from 'cross-fetch';

/**
 * Generates the headers needed for making API requests.
 *
 * @param apiKey - The API key to include in the headers.
 * @returns The headers for making API requests.
 */
export const getHeaders = (apiKey: string): Headers => {
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Accept-Content', 'application/json');
  headers.set('x-auth-token', `${apiKey}`);
  return headers;
};
