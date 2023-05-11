import * as api from '.';

export class ApiWrapper {
  public account: api.AccountWrapper;
  public aliases: api.AliasesWrapper;
  public channels: api.ChannelsWrapper;
  public node: api.NodeWrapper;
  public peerInfo: api.PeerInfoWrapper;
  public settings: api.SettingsWrapper;
  public tickets: api.TicketsWrapper;
  public tokens: api.TokensWrapper;
  constructor(private url: string, private apiKey: string) {
    this.account = new api.AccountWrapper(this.url, this.apiKey);
    this.aliases = new api.AliasesWrapper(this.url, this.apiKey);
    this.channels = new api.ChannelsWrapper(this.url, this.apiKey);
    this.node = new api.NodeWrapper(this.url, this.apiKey);
    this.peerInfo = new api.PeerInfoWrapper(this.url, this.apiKey);
    this.settings = new api.SettingsWrapper(this.url, this.apiKey);
    this.tickets = new api.TicketsWrapper(this.url, this.apiKey);
    this.tokens = new api.TokensWrapper(this.url, this.apiKey);
  }
}
