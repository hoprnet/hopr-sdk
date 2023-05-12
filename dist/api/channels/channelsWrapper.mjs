import { closeChannel } from "./closeChannel";
import { fundChannels } from "./fundChannels";
import { getChannel } from "./getChannel";
import { getChannelTickets } from "./getChannelTickets";
import { getChannels } from "./getChannels";
import { openChannels } from "./openChannels";
import { redeemChannelTickets } from "./redeemChannelTickets";
class ChannelsWrapper {
  constructor(url, apiKey) {
    this.url = url;
    this.apiKey = apiKey;
  }
  closeChannel(body) {
    return closeChannel(this.url, this.apiKey, body);
  }
  fundChannels(body) {
    return fundChannels(this.url, this.apiKey, body);
  }
  getChannels() {
    return getChannels(this.url, this.apiKey);
  }
  getChannel(body) {
    return getChannel(this.url, this.apiKey, body);
  }
  openChannels(body) {
    return openChannels(this.url, this.apiKey, body);
  }
  getChannelTickets(body) {
    return getChannelTickets(this.url, this.apiKey, body);
  }
  redeemChannelTickets(body) {
    return redeemChannelTickets(this.url, this.apiKey, body);
  }
}
export {
  ChannelsWrapper
};
