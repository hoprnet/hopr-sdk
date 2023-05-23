import { closeChannel } from "./closeChannel";
import { fundChannels } from "./fundChannels";
import { getChannel } from "./getChannel";
import { getChannelTickets } from "./getChannelTickets";
import { getChannels } from "./getChannels";
import { openChannels } from "./openChannels";
import { redeemChannelTickets } from "./redeemChannelTickets";
class ChannelsAdapter {
  constructor(url, apiKey) {
    this.url = url;
    this.apiKey = apiKey;
  }
  closeChannel(payload) {
    return closeChannel({
      apiKey: this.apiKey,
      url: this.url,
      direction: payload.direction,
      peerId: payload.peerId
    });
  }
  fundChannels(payload) {
    return fundChannels({
      apiKey: this.apiKey,
      url: this.url,
      incomingAmount: payload.incomingAmount,
      outgoingAmount: payload.outgoingAmount,
      peerId: payload.peerId
    });
  }
  getChannels() {
    return getChannels({ url: this.url, apiKey: this.apiKey });
  }
  getChannel(payload) {
    return getChannel({
      apiKey: this.apiKey,
      url: this.url,
      direction: payload.direction,
      peerId: payload.peerId
    });
  }
  openChannels(payload) {
    return openChannels({
      apiKey: this.apiKey,
      url: this.url,
      amount: payload.amount,
      peerId: payload.peerId
    });
  }
  getChannelTickets(payload) {
    return getChannelTickets({
      apiKey: this.apiKey,
      url: this.url,
      peerId: payload.peerId
    });
  }
  redeemChannelTickets(payload) {
    return redeemChannelTickets({
      apiKey: this.apiKey,
      url: this.url,
      peerId: payload.peerId
    });
  }
}
export {
  ChannelsAdapter
};
