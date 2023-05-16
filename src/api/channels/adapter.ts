import {
  CloseChannelPayloadType,
  FundChannelsPayloadType,
  GetChannelPayloadType,
  OpenChannelsPayloadType,
  PeerIdPayloadType,
  RemoveBasicAuthenticationPayloadType
} from '../../types';
import { closeChannel } from './closeChannel';
import { fundChannels } from './fundChannels';
import { getChannel } from './getChannel';
import { getChannelTickets } from './getChannelTickets';
import { getChannels } from './getChannels';
import { openChannels } from './openChannels';
import { redeemChannelTickets } from './redeemChannelTickets';

export class ChannelsAdapter {
  constructor(private url: string, private apiKey: string) {}

  public closeChannel(
    payload: RemoveBasicAuthenticationPayloadType<CloseChannelPayloadType>
  ) {
    return closeChannel({
      apiKey: this.apiKey,
      url: this.url,
      direction: payload.direction,
      peerId: payload.peerId
    });
  }

  public fundChannels(
    payload: RemoveBasicAuthenticationPayloadType<FundChannelsPayloadType>
  ) {
    return fundChannels({
      apiKey: this.apiKey,
      url: this.url,
      incomingAmount: payload.incomingAmount,
      outgoingAmount: payload.outgoingAmount,
      peerId: payload.peerId
    });
  }

  public getChannels() {
    return getChannels({ url: this.url, apiKey: this.apiKey });
  }

  public getChannel(
    payload: RemoveBasicAuthenticationPayloadType<GetChannelPayloadType>
  ) {
    return getChannel({
      apiKey: this.apiKey,
      url: this.url,
      direction: payload.direction,
      peerId: payload.peerId
    });
  }

  public openChannels(
    payload: RemoveBasicAuthenticationPayloadType<OpenChannelsPayloadType>
  ) {
    return openChannels({
      apiKey: this.apiKey,
      url: this.url,
      amount: payload.amount,
      peerId: payload.peerId
    });
  }

  public getChannelTickets(
    payload: RemoveBasicAuthenticationPayloadType<PeerIdPayloadType>
  ) {
    return getChannelTickets({
      apiKey: this.apiKey,
      url: this.url,
      peerId: payload.peerId
    });
  }

  public redeemChannelTickets(
    payload: RemoveBasicAuthenticationPayloadType<PeerIdPayloadType>
  ) {
    return redeemChannelTickets({
      apiKey: this.apiKey,
      url: this.url,
      peerId: payload.peerId
    });
  }
}
