import {
  RemoveBasicAuthenticationPayloadType,
  SendMessagePayloadType,
  SignPayloadType
} from '../../types';
import { sendMessage } from './sendMessage';
import { sign } from './sign';
import { websocket } from './websocket';

export class MessagesAdapter {
  constructor(private url: string, private apiKey: string) {}

  public sendMessage(
    payload: RemoveBasicAuthenticationPayloadType<SendMessagePayloadType>
  ) {
    return sendMessage({
      apiKey: this.apiKey,
      url: this.url,
      body: payload.body,
      recipient: payload.recipient,
      hops: payload.hops,
      path: payload.path
    });
  }

  public sign(payload: RemoveBasicAuthenticationPayloadType<SignPayloadType>) {
    return sign({
      apiKey: this.apiKey,
      url: this.url,
      message: payload.message
    });
  }

  public websocket() {
    return websocket({
      apiKey: this.apiKey,
      url: this.url
    });
  }
}
