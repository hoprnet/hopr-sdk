import WebSocket from 'isomorphic-ws';
import { BasePayloadType } from '../../types';
import { createWsUrl } from '../../utils';

/**
 * Creates a WebSocket instance with the specified IP and API token.
 *
 * @param apiEndpoint - The base URL to connect to.
 * @param apiToken - The API token to use for authentication.
 * @param path - The API path for websocket endpoing. By default: '/api/v2/messages/websocket/'
 * @returns A WebSocket instance.
 */
export const websocket = (payload: BasePayloadType): WebSocket => {
  const endpointUrl = createWsUrl({
    apiEndpoint: payload.apiEndpoint,
    apiToken: payload.apiToken
  });
  return new WebSocket(endpointUrl);
};
