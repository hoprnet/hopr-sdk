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
  constructor(private url: string, private apiKey: string) {}

  public async sendMessage(
    payload: RemoveBasicAuthenticationPayloadType<SendMessagePayloadType>
  ) {
    try {
      return await sendMessage({
        apiKey: this.apiKey,
        url: this.url,
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
