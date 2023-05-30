import { Headers } from 'cross-fetch';

/**
 * Generates the headers needed for making API requests.
 *
 * @param apiToken - The API token to include in the headers.
 * @returns The headers for making API requests.
 */
export const getHeaders = (apiToken: string): Headers => {
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Accept-Content', 'application/json');
  headers.set('x-auth-token', apiToken);
  return headers;
};

export default {};
