import { Headers } from 'node-fetch';
import { Buffer } from 'buffer';

export const getHeaders = (apiKey: string): Headers => {
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Accept-Content', 'application/json');
  headers.set(
    'Authorization',
    `Basic ${Buffer.from(apiKey, 'utf-8').toString('base64')}`
  );
  return headers;
};

export default {};
