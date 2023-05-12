import * as api from ".";
class ApiWrapper {
  constructor(url, apiKey) {
    this.url = url;
    this.apiKey = apiKey;
    this.channels = new api.ChannelsWrapper(this.url, this.apiKey);
    this.node = new api.NodeWrapper(this.url, this.apiKey);
    this.peerInfo = new api.PeerInfoWrapper(this.url, this.apiKey);
    this.settings = new api.SettingsWrapper(this.url, this.apiKey);
    this.tickets = new api.TicketsWrapper(this.url, this.apiKey);
  }
}
export {
  ApiWrapper
};
