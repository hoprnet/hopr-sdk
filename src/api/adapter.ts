import { AccountAdapter } from './account/adapter';
import { AliasesAdapter } from './aliases/adapter';
import { ChannelsAdapter } from './channels/adapter';
import { MessagesAdapter } from './messages/adapter';
import { NodeAdapter } from './node/adapter';
import { PeerInfoAdapter } from './peerInfo/adapter';
import { SettingsAdapter } from './settings/adapter';
import { TicketsAdapter } from './tickets/adapter';
import { TokensAdapter } from './tokens/adapter';
export class ApiAdapter {
  public account: AccountAdapter;
  public aliases: AliasesAdapter;
  public channels: ChannelsAdapter;
  public node: NodeAdapter;
  public peerInfo: PeerInfoAdapter;
  public settings: SettingsAdapter;
  public tickets: TicketsAdapter;
  public tokens: TokensAdapter;
  public messages: MessagesAdapter;

  constructor(private url: string, private apiKey: string) {
    this.account = new AccountAdapter(this.url, this.apiKey);
    this.aliases = new AliasesAdapter(this.url, this.apiKey);
    this.channels = new ChannelsAdapter(this.url, this.apiKey);
    this.node = new NodeAdapter(this.url, this.apiKey);
    this.peerInfo = new PeerInfoAdapter(this.url, this.apiKey);
    this.settings = new SettingsAdapter(this.url, this.apiKey);
    this.tickets = new TicketsAdapter(this.url, this.apiKey);
    this.tokens = new TokensAdapter(this.url, this.apiKey);
    this.messages = new MessagesAdapter(this.url, this.apiKey);
  }
}
