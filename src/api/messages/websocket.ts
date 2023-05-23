import WebSocket from 'isomorphic-ws';
import { BasicAuthenticationPayloadType } from '../../types';

/**
 * Creates a WebSocket instance with the specified IP and API token.
 *
 * @param url - The base URL to connect to.
 * @param apiKey - The API token to use for authentication.
 * @returns A WebSocket instance.
 */
export const websocket = (
  payload: BasicAuthenticationPayloadType
): WebSocket => {
  const endpointUrl = getWsUrl(
    payload.url,
    '/api/v2/messages/websocket/',
    payload.apiKey
  );
  return new WebSocket(endpointUrl);
};

/**
 *
 * @param apiEndpoint - The url to extract the ip and port
 * @returns A string of the complete API endpoint.
 */
export const getWsUrl = (
  apiEndpoint: string,
  path: string,
  apiToken: string
): string => {
  const url = new URL(path, apiEndpoint);
  url.protocol = url.protocol === 'https:' ? 'wss' : 'ws';
  url.search = `?apiToken=${apiToken}`;
  return url.toString();
};
