import WebSocket from 'isomorphic-ws';
import { BasicAuthenticationPayloadType } from '../../types/general.js';
import 'zod';

/**
 * Creates a WebSocket instance with the specified IP and API token.
 *
 * @param url - The base URL to connect to.
 * @param apiKey - The API token to use for authentication.
 * @returns A WebSocket instance.
 */
declare const websocket: (payload: BasicAuthenticationPayloadType) => WebSocket;
/**
 *
 * @param apiEndpoint - The url to extract the ip and port
 * @returns A string of the complete API endpoint.
 */
declare const getWsUrl: (apiEndpoint: string, path: string, apiToken: string) => string;

export { getWsUrl, websocket };
