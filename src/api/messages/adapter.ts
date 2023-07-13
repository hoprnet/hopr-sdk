import {
  DeleteMessagesPayloadType,
  GetMessagesPayloadType,
  GetMessagesSizePayloadType,
  PopAllMessagesPayloadType,
  RemoveBasicAuthenticationPayloadType,
  SendMessagePayloadType
} from '../../types';
import { createLogger } from '../../utils';
import { deleteMessages } from './deleteMessages';
import { getMessages } from './getMessages';
import { getMessagesSize } from './getMessagesSize';
import { popAllMessages } from './popAllMessages';
import { popMessage } from './popMessage';
import { sendMessage } from './sendMessage';
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
    return sendMessage({
      apiToken: this.apiToken,
      apiEndpoint: this.apiEndpoint,
      timeout: this.timeout,
      body: payload.body,
      recipient: payload.recipient,
      hops: payload.hops,
      path: payload.path,
      tag: payload.tag
    });
  }

  public async websocket() {
    return websocket({
      apiToken: this.apiToken,
      apiEndpoint: this.apiEndpoint
    });
  }

  public async deleteMessages(
    payload: RemoveBasicAuthenticationPayloadType<DeleteMessagesPayloadType>
  ) {
    return deleteMessages({
      apiToken: this.apiToken,
      apiEndpoint: this.apiEndpoint,
      timeout: this.timeout,
      tag: payload.tag
    });
  }

  public async getMessages(
    payload: RemoveBasicAuthenticationPayloadType<GetMessagesPayloadType>
  ) {
    return getMessages({
      apiToken: this.apiToken,
      apiEndpoint: this.apiEndpoint,
      timeout: this.timeout,
      tag: payload.tag
    });
  }

  public async getMessagesSize(
    payload: RemoveBasicAuthenticationPayloadType<GetMessagesSizePayloadType>
  ) {
    return getMessagesSize({
      apiToken: this.apiToken,
      apiEndpoint: this.apiEndpoint,
      timeout: this.timeout,
      tag: payload.tag
    });
  }

  public async popMessage() {
    return popMessage({
      apiToken: this.apiToken,
      apiEndpoint: this.apiEndpoint,
      timeout: this.timeout
    });
  }

  public async popAllMessages(
    payload: RemoveBasicAuthenticationPayloadType<PopAllMessagesPayloadType>
  ) {
    return popAllMessages({
      apiToken: this.apiToken,
      apiEndpoint: this.apiEndpoint,
      timeout: this.timeout,
      tag: payload.tag
    });
  }
}
