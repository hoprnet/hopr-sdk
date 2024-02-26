import { createWsUrlType } from '../types';

const WS_PATH = '/api/v3/messages/websocket/';

/**
 *
 * @param apiEndpoint - The API endpoint to extract the ip and port
 * @param apiToken - The API token to use for authentication.
 * @param path - The API path for websocket endpoing. By default: '/api/v3/messages/websocket/'
 * @returns A string of the complete API endpoint.
 */
export const createWsUrl = (payload: createWsUrlType): string => {
  const path = payload.path ? payload.path : WS_PATH;
  const url = new URL(path, payload.apiEndpoint);
  url.protocol = url.protocol === 'https:' ? 'wss' : 'ws';
  url.search = `?apiToken=${payload.apiToken}`;
  return url.toString();
};
