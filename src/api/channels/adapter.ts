import {
  CloseChannelPayloadType,
  FundChannelsPayloadType,
  GetChannelPayloadType,
  OpenChannelsPayloadType,
  PeerIdPayloadType,
  RemoveBasicAuthenticationPayloadType
} from '../../types';
import { APIError, createLogger } from '../../utils';
import { closeChannel } from './closeChannel';
import { fundChannels } from './fundChannels';
import { getChannel } from './getChannel';
import { getChannelTickets } from './getChannelTickets';
import { getChannels } from './getChannels';
import { openChannels } from './openChannels';
import { redeemChannelTickets } from './redeemChannelTickets';

const log = createLogger('channels');

export class ChannelsAdapter {
  private url: string;
  private apiKey: string;
  private timeout: number | undefined;

  /**
   * Creates a new instance of the `ChannelsAdapter` class.
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

  public async closeChannel(
    payload: RemoveBasicAuthenticationPayloadType<CloseChannelPayloadType>
  ) {
    try {
      return await closeChannel({
        apiKey: this.apiKey,
        url: this.url,
        timeout: this.timeout,
        direction: payload.direction,
        peerId: payload.peerId
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

  public async fundChannels(
    payload: RemoveBasicAuthenticationPayloadType<FundChannelsPayloadType>
  ) {
    try {
      return await fundChannels({
        apiKey: this.apiKey,
        url: this.url,
        timeout: this.timeout,
        incomingAmount: payload.incomingAmount,
        outgoingAmount: payload.outgoingAmount,
        peerId: payload.peerId
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

  public async getChannels() {
    try {
      return await getChannels({
        url: this.url,
        apiKey: this.apiKey,
        timeout: this.timeout
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

  public async getChannel(
    payload: RemoveBasicAuthenticationPayloadType<GetChannelPayloadType>
  ) {
    try {
      return await getChannel({
        apiKey: this.apiKey,
        url: this.url,
        timeout: this.timeout,
        direction: payload.direction,
        peerId: payload.peerId
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

  public async openChannels(
    payload: RemoveBasicAuthenticationPayloadType<OpenChannelsPayloadType>
  ) {
    try {
      return await openChannels({
        apiKey: this.apiKey,
        url: this.url,
        timeout: this.timeout,
        amount: payload.amount,
        peerId: payload.peerId
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

  public async getChannelTickets(
    payload: RemoveBasicAuthenticationPayloadType<PeerIdPayloadType>
  ) {
    try {
      return await getChannelTickets({
        apiKey: this.apiKey,
        url: this.url,
        timeout: this.timeout,
        peerId: payload.peerId
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

  public async redeemChannelTickets(
    payload: RemoveBasicAuthenticationPayloadType<PeerIdPayloadType>
  ) {
    try {
      return await redeemChannelTickets({
        apiKey: this.apiKey,
        url: this.url,
        timeout: this.timeout,
        peerId: payload.peerId
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
