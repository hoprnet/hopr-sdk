import { decode } from 'rlp';
import { createWsUrlType } from '../types';

const WS_PATH = '/api/v3/messages/websocket';

/**
 * Decodes the message received by a hoprd node
 *
 * @param msg - The message to decode
 * @returns a string representing the decoded message
 */
export const decodeMessage = (msg: string): string => {
  let uint8Array = new Uint8Array(JSON.parse(`[${msg}]`));
  let decodedArray = decode(uint8Array);
  if (decodedArray[0] instanceof Uint8Array) {
    return new TextDecoder().decode(decodedArray[0]);
  }
  throw Error(`Could not decode received message: ${msg}`);
};

/**
 *
 * @param apiEndpoint - The API endpoint to extract the ip and port
 * @param apiToken - The API token to use for authentication.
 * @param path - The API path for websocket endpoing. By default: '/api/v3/messages/websocket'
 * @returns A string of the complete API endpoint.
 */
export const createWsUrl = (payload: createWsUrlType): string => {
  const path = payload.path ? payload.path : WS_PATH;
  const url = new URL(path, payload.apiEndpoint);
  url.protocol = url.protocol === 'https:' ? 'wss' : 'ws';
  url.search = `?apiToken=${payload.apiToken}`;
  return url.toString();
};
