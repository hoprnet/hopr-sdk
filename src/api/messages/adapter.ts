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
  private url: string;
  private apiKey: string;
  private timeout: number | undefined;

  /**
   * Creates a new instance of the `MessagesAdapter` class.
   * @param url - The URL of the API server.
   * @param apiKey - The API key to use for authentication.
   * @param timeout - optional timeout for all functions
   */
  constructor({
    url,
    apiKey
  }: {
    url: string;
    apiKey: string;
    timeout?: number;
  }) {
    this.url = url;
    this.apiKey = apiKey;
    this.timeout = this.timeout;
  }

  public async sendMessage(
    payload: RemoveBasicAuthenticationPayloadType<SendMessagePayloadType>
  ) {
    try {
      return await sendMessage({
        apiKey: this.apiKey,
        url: this.url,
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
        apiKey: this.apiKey,
        url: this.url,
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
        apiKey: this.apiKey,
        url: this.url
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
