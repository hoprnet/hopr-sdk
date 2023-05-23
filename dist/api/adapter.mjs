import * as api from ".";
class ApiAdapter {
  constructor(url, apiKey) {
    this.url = url;
    this.apiKey = apiKey;
    this.account = new api.AccountAdapter(this.url, this.apiKey);
    this.aliases = new api.AliasesAdapter(this.url, this.apiKey);
    this.channels = new api.ChannelsAdapter(this.url, this.apiKey);
    this.node = new api.NodeAdapter(this.url, this.apiKey);
    this.peerInfo = new api.PeerInfoAdapter(this.url, this.apiKey);
    this.settings = new api.SettingsAdapter(this.url, this.apiKey);
    this.tickets = new api.TicketsAdapter(this.url, this.apiKey);
    this.tokens = new api.TokensAdapter(this.url, this.apiKey);
  }
}
export {
  ApiAdapter
};
