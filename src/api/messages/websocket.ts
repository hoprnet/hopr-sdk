import WebSocket from 'isomorphic-ws';
import { createWsUrlType, BasePayloadType } from '../../types';

const WS_PATH = '/api/v3/messages/websocket/';

/**
 * Creates a WebSocket instance with the specified IP and API token.
 *
 * @param apiEndpoint - The base URL to connect to.
 * @param apiToken - The API token to use for authentication.
 * @param path - The API path for websocket endpoint. By default: '/api/v3/messages/websocket/'
 * @returns A WebSocket instance.
 */
export const websocket = (payload: BasePayloadType): WebSocket => {
  const endpointUrl = createWsUrl({
    apiEndpoint: payload.apiEndpoint,
    apiToken: payload.apiToken
  });
  return new WebSocket(endpointUrl);
};

function createWsUrl(payload: createWsUrlType): string {
  const path = payload.path ? payload.path : WS_PATH;
  const url = new URL(path, payload.apiEndpoint);
  url.protocol = url.protocol === 'https:' ? 'wss' : 'ws';
  url.search = `?apiToken=${payload.apiToken}`;
  return url.toString();
}
