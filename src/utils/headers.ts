import { Headers } from 'cross-fetch';

export const getHeaders = (apiKey: string): Headers => {
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Accept-Content', 'application/json');
  headers.set('x-auth-token', apiKey);
  return headers;
};

export default {};
