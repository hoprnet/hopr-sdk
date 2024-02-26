import WebSocket from 'isomorphic-ws';
import { DeferredPromise, createLogger } from './';
import { createWsUrl } from '../utils';

const log = createLogger('websocket');
const HEARTBEAT_ERROR_MSG = 'heartbeat was not received';

/**
 * Options that can be provided when creating a WebSocketHelper.
 */
type WebSocketHelperOptions = {
  apiEndpoint: string;
  apiToken: string;
  path?: string;
  maxTimeWithoutPing?: number;
  attemptToReconnect?: boolean;
  reconnectDelay?: number;
  maxReconnectAttempts?: number;
  onOpen?: () => void;
  onClose?: () => void;
  onMessage?: (data: string) => void;
};

/**
 * Helper class for managing a WebSocket connection.
 */
class WebsocketHelper {
  private apiEndpoint: string;
  private apiToken: string;
  private path: string | undefined; // the optional path for the WebSocket connection.
  private connectionIsClosing: boolean = false; // whether the connection is in the process of closing
  private reconnectAttempts: number = 0; // current reconnect attempts, gets reset
  private socket: WebSocket; // the socket, gets re-initialized on reconnection
  private pingTimeout: NodeJS.Timeout | undefined;
  private reconnectTimeout: NodeJS.Timeout | undefined;
  private maxTimeWithoutPing: number; // maximum ms that we allow to the connection to live without ping
  private attemptToReconnect: boolean; // whether we should attempt to reconnect
  private reconnectDelay: number; // how many ms to wait before attempting to reconnect
  private maxReconnectAttempts: number; // maximum number of reconnect attempts
  // resolved when a connection is open
  // rejects once it has failed connecting (including reconnect attempts)
  private waitUntilSocketOpenP: DeferredPromise<WebSocket>;

  constructor(private options: WebSocketHelperOptions) {
    this.waitUntilSocketOpenP = new DeferredPromise<WebSocket>();
    this.maxTimeWithoutPing = options?.maxTimeWithoutPing ?? 60e3;
    this.attemptToReconnect = options?.attemptToReconnect ?? true;
    this.reconnectDelay = options?.reconnectDelay ?? 100;
    this.maxReconnectAttempts = options?.maxReconnectAttempts ?? 3;
    this.apiEndpoint = options.apiEndpoint;
    this.apiToken = options.apiToken;
    this.path = options?.path;
    this.socket = new WebSocket(
      createWsUrl({
        apiEndpoint: this.apiEndpoint,
        apiToken: this.apiToken,
        path: this.path
      })
    );
    this.setUpEventHandlers();
  }

  /**
   * Resolves if we have successfully opened a connection.
   * Reject if we didn't.
   * @returns the websocket instance
   */

  public async waitUntilSocketOpen(): Promise<WebSocket> {
    // if its already open
    if (this.socket.readyState === this.socket.OPEN) {
      this.waitUntilSocketOpenP.resolve(this.socket);
    }

    return this.waitUntilSocketOpenP.promise;
  }

  /**
   * Closes connection to the websocket server.
   */
  private closeInternal() {
    this.connectionIsClosing = true;
    clearTimeout(this.pingTimeout);
    clearTimeout(this.reconnectTimeout);
    this.socket.close();
    this.options?.onClose?.();
  }

  /**
   * We want to close the connection,
   * and not reconnect again.
   */
  public close() {
    log.debug('Closing WS');
    this.attemptToReconnect = false;
    this.closeInternal();
  }

  /**
   * Closes connection to the websocket server.
   * @param error
   */
  private closeWithError(errorMessage: string): void {
    log.error(errorMessage);
    this.closeInternal();
    this.waitUntilSocketOpenP.reject(errorMessage);
  }

  private isRunningOnBrowser() {
    // browser does not have `.on` function
    return !this.socket['on'];
  }

  /**
   * Updates the heartbeat timeout.
   */
  private heartbeat() {
    clearTimeout(this.pingTimeout);
    this.pingTimeout = setTimeout(() => {
      log.error('did not receive heartbeat');
      // can be undefined in browsers
      if (!this.isRunningOnBrowser()) {
        this.socket.emit('error', new Error(HEARTBEAT_ERROR_MSG));
      }
    }, this.maxTimeWithoutPing);
  }

  /**
   * Sets up event handlers for the WebSocket connection.
   */
  private setUpEventHandlers(): void {
    this.socket.onmessage = (event) => {
      this.handleMessage(event);
    };

    this.socket.onerror = async (error) => {
      await this.handleError(error);
    };

    this.socket.onopen = () => {
      if (!this.isRunningOnBrowser()) {
        this.heartbeat();
      }
      this.reconnectAttempts = 0;
      this.waitUntilSocketOpenP.resolve(this.socket);
      this.options?.onOpen?.();
    };

    this.socket.onclose = () => {
      this.connectionIsClosing = false;
    };

    // can be undefined in browsers
    if (!this.isRunningOnBrowser()) {
      this.socket.on('ping', () => {
        // restart heartbeat
        this.heartbeat();
      });
    }
  }

  /**
   * Handles an incoming message from the WebSocket server.
   * @param event - The message event.
   */
  private handleMessage(event: WebSocket.MessageEvent): void {
    const body = event.data.toString();
    this.options?.onMessage?.(body);
  }

  /**
   * Determines whether a reconnection attempt should be made after an error.
   * @param error - The error that occurred.
   * @returns True if a reconnection attempt should be made; false otherwise.
   */
  private shouldAttemptReconnect(error: WebSocket.ErrorEvent): boolean {
    return (
      error.message === HEARTBEAT_ERROR_MSG ||
      (this.attemptToReconnect &&
        this.reconnectAttempts < this.maxReconnectAttempts)
    );
  }

  private async handleError(error: WebSocket.ErrorEvent): Promise<void> {
    log.error('WebSocket error:', error.message);

    // Close existing WebSocket
    if (this.connectionIsClosing) {
      log.debug('WebSocket connection is still closing');
      return;
    }

    this.closeInternal();

    // If error is not a heartbeat issue and either we do not want to reconnect
    // or we have reached maximum reconnect attempts, throw the error.
    if (!this.shouldAttemptReconnect(error)) {
      this.closeWithError(`WebSocket failed to connect: ${error.message}`);
      return;
    }

    this.reconnectAttempts += 1;

    log.error(
      'WebSocket connection failed, retrying in %s ms..',
      this.reconnectDelay,
      error.message
    );

    // Wait a bit before reconnection attempt
    await this.wait(this.reconnectDelay);

    // Reconnect: open new WebSocket
    this.socket = new WebSocket(
      createWsUrl({ apiEndpoint: this.apiEndpoint, apiToken: this.apiToken })
    );

    // Set up event handlers again
    this.setUpEventHandlers();

    log.debug('WebSocket reconnected');
  }

  private wait(delay: number): Promise<void> {
    return new Promise((resolve) => {
      this.reconnectTimeout = setTimeout(resolve, delay);
    });
  }
}

export default WebsocketHelper;
