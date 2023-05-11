import {
  CloseChannelPayloadType,
  FundChannelsPayloadType,
  GetChannelPayloadType,
  OpenChannelsPayloadType,
  PeerIdPayloadType
} from '../../types';
import { closeChannel } from './closeChannel';
import { fundChannels } from './fundChannels';
import { getChannel } from './getChannel';
import { getChannelTickets } from './getChannelTickets';
import { getChannels } from './getChannels';
import { openChannels } from './openChannels';
import { redeemChannelTickets } from './redeemChannelTickets';

export class ChannelsWrapper {
  constructor(private url: string, private apiKey: string) {}

  public closeChannel(body: CloseChannelPayloadType) {
    return closeChannel(this.url, this.apiKey, body);
  }

  public fundChannels(body: FundChannelsPayloadType) {
    return fundChannels(this.url, this.apiKey, body);
  }

  public getChannels() {
    return getChannels(this.url, this.apiKey);
  }

  public getChannel(body: GetChannelPayloadType) {
    return getChannel(this.url, this.apiKey, body);
  }

  public openChannels(body: OpenChannelsPayloadType) {
    return openChannels(this.url, this.apiKey, body);
  }

  public getChannelTickets(body: PeerIdPayloadType) {
    return getChannelTickets(this.url, this.apiKey, body);
  }

  public redeemChannelTickets(body: PeerIdPayloadType) {
    return redeemChannelTickets(this.url, this.apiKey, body);
  }
}
