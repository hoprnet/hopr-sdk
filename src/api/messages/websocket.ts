import WebSocket from 'isomorphic-ws';

/**
 * Creates a WebSocket instance with the specified URL and API token.
 *
 * @param url - The URL to connect to.
 * @param apiToken - The API token to use for authentication.
 * @returns A WebSocket instance.
 */
export const websocket = (url: string, apiToken: string): void => {
  const endpointUrl = `ws://${url}messages/websocket/?apiToken=${apiToken}`;
  return new WebSocket(endpointUrl);
};

/**
 * Adds event handlers for the WebSocket instance.
 *
 * @param ws - The WebSocket instance to add event handlers to.
 */
export const addWebSocketEventHandlers = (ws: WebSocket): void => {
  /**
   * Handles the open event for the WebSocket instance.
   */
  ws.onopen = () => {
    console.log('WebSocket connection opened');
  };

  /**
   * Handles the error event for the WebSocket instance.
   *
   * @param error - The error object.
   */
  ws.onerror = (error: Event) => {
    console.error('WebSocket error:', error);
  };

  /**
   * Handles the message event for the WebSocket instance.
   *
   * @param event - The message event object.
   */
  ws.onmessage = (event: MessageEvent) => {
    const message = event.data.toString();
    console.log('received body:', message);
  };
};
