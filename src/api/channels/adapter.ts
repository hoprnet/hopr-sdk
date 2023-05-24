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
  constructor(private url: string, private apiKey: string) {}

  public async closeChannel(
    payload: RemoveBasicAuthenticationPayloadType<CloseChannelPayloadType>
  ) {
    try {
      return await closeChannel({
        apiKey: this.apiKey,
        url: this.url,
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
      return await getChannels({ url: this.url, apiKey: this.apiKey });
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
