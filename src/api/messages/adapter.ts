import {
  RemoveBasicAuthenticationPayloadType,
  SendMessagePayloadType,
  SignPayloadType
} from '../../types';
import { APIError, createLogger } from '../../utils';
import { sendMessage } from './sendMessage';
import { sign } from './sign';
import { websocket } from './websocket';

const log = createLogger('messages');

export class MessagesAdapter {
  private apiEndpoint: string;
  private apiToken: string;
  private timeout: number | undefined;

  /**
   * Creates a new instance of the `MessagesAdapter` class.
   * @param apiEndpoint - The API endpoint of the API server.
   * @param apiToken - The API token to use for authentication.
   * @param timeout - optional timeout for all functions
   */
  constructor({
    apiEndpoint,
    apiToken,
    timeout
  }: {
    apiEndpoint: string;
    apiToken: string;
    timeout?: number;
  }) {
    this.apiEndpoint = apiEndpoint;
    this.apiToken = apiToken;
    this.timeout = timeout;
  }

  public async sendMessage(
    payload: RemoveBasicAuthenticationPayloadType<SendMessagePayloadType>
  ) {
    try {
      return await sendMessage({
        apiToken: this.apiToken,
        apiEndpoint: this.apiEndpoint,
        timeout: this.timeout,
        body: payload.body,
        recipient: payload.recipient,
        hops: payload.hops,
        path: payload.path
      });
    } catch (e) {
      if (e instanceof APIError) {
        const { message, error, status } = e;
        log.error({ status, error, message });
      } else {
        log.error(e);
      }
    }
  }

  public async sign(
    payload: RemoveBasicAuthenticationPayloadType<SignPayloadType>
  ) {
    try {
      return await sign({
        apiToken: this.apiToken,
        apiEndpoint: this.apiEndpoint,
        timeout: this.timeout,
        message: payload.message
      });
    } catch (e) {
      if (e instanceof APIError) {
        const { message, error, status } = e;
        log.error({ status, error, message });
      } else {
        log.error(e);
      }
    }
  }

  public async websocket() {
    try {
      return await websocket({
        apiToken: this.apiToken,
        apiEndpoint: this.apiEndpoint
      });
    } catch (e) {
      if (e instanceof APIError) {
        const { message, error, status } = e;
        log.error({ status, error, message });
      } else {
        log.error(e);
      }
    }
  }
}
