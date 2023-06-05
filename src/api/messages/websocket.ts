import WebSocket from 'isomorphic-ws';
import { BasePayloadType, GetWsUrlType } from '../../types';

const WS_PATH = '/api/v2/messages/websocket/';

/**
 * Creates a WebSocket instance with the specified IP and API token.
 *
 * @param apiEndpoint - The base URL to connect to.
 * @param apiToken - The API token to use for authentication.
 * @param path - The API path for websocket endpoing. By default: '/api/v2/messages/websocket/'
 * @returns A WebSocket instance.
 */
export const websocket = (payload: BasePayloadType): WebSocket => {
  const endpointUrl = getWsUrl({
    apiEndpoint: payload.apiEndpoint,
    apiToken: payload.apiToken,
    path: WS_PATH
  });
  return new WebSocket(endpointUrl);
};

/**
 *
 * @param apiEndpoint - The API endpoint to extract the ip and port
 * @param apiToken - The API token to use for authentication.
 * @param path - The API path for websocket endpoing. By default: '/api/v2/messages/websocket/'
 * @returns A string of the complete API endpoint.
 */
export const getWsUrl = (payload: GetWsUrlType): string => {
  const path = payload.path ? payload.path : WS_PATH;
  const url = new URL(path, payload.apiEndpoint);
  url.protocol = url.protocol === 'https:' ? 'wss' : 'ws';
  url.search = `?apiToken=${payload.apiToken}`;
  return url.toString();
};
