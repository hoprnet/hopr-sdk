import WebSocket from 'isomorphic-ws';
import { BasePayloadType } from '../../types';

/**
 * Creates a WebSocket instance with the specified IP and API token.
 *
 * @param apiEndpoint - The base URL to connect to.
 * @param apiToken - The API token to use for authentication.
 * @returns A WebSocket instance.
 */
export const websocket = (payload: BasePayloadType): WebSocket => {
  const endpointUrl = getWsUrl(
    payload.apiEndpoint,
    '/api/v2/messages/websocket/',
    payload.apiToken
  );
  return new WebSocket(endpointUrl);
};

/**
 *
 * @param apiEndpoint - The API endpoint to extract the ip and port
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
