import WebSocket from 'isomorphic-ws';

/**
 * Creates a WebSocket instance with the specified IP and API token.
 *
 * @param url - The base URL to connect to.
 * @param apiToken - The API token to use for authentication.
 * @returns A WebSocket instance.
 */
export const websocket = (url: string, apiToken: string): WebSocket => {
  const endpointUrl = getWsUrl(url, '/api/v2/messages/websocket/', apiToken);
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
