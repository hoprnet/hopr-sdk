import * as api from '.';

export class ApiAdapter {
  public account: api.AccountAdapter;
  public aliases: api.AliasesAdapter;
  public channels: api.ChannelsAdapter;
  public node: api.NodeAdapter;
  public peerInfo: api.PeerInfoAdapter;
  public settings: api.SettingsAdapter;
  public tickets: api.TicketsAdapter;
  public tokens: api.TokensAdapter;
  public messages: api.MessagesAdapter;
  constructor(private url: string, private apiKey: string) {
    this.account = new api.AccountAdapter(this.url, this.apiKey);
    this.aliases = new api.AliasesAdapter(this.url, this.apiKey);
    this.channels = new api.ChannelsAdapter(this.url, this.apiKey);
    this.node = new api.NodeAdapter(this.url, this.apiKey);
    this.peerInfo = new api.PeerInfoAdapter(this.url, this.apiKey);
    this.settings = new api.SettingsAdapter(this.url, this.apiKey);
    this.tickets = new api.TicketsAdapter(this.url, this.apiKey);
    this.tokens = new api.TokensAdapter(this.url, this.apiKey);
    this.messages = new api.MessagesAdapter(this.url, this.apiKey);
  }
}
