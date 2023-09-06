import { AccountAdapter } from './account/adapter';
import { AliasesAdapter } from './aliases/adapter';
import { ChannelsAdapter } from './channels/adapter';
import { NodeAdapter } from './node/adapter';
import { SettingsAdapter } from './settings/adapter';
import { TicketsAdapter } from './tickets/adapter';
import { TokensAdapter } from './tokens/adapter';
import { MessagesAdapter } from './messages/adapter';
import { PeersAdapter } from './peers/adapter';
import { PeerInfoAdapter } from './peerInfo/adapter';
export class ApiAdapter {
  public account: AccountAdapter;
  public aliases: AliasesAdapter;
  public channels: ChannelsAdapter;
  public node: NodeAdapter;
  public settings: SettingsAdapter;
  public tickets: TicketsAdapter;
  public tokens: TokensAdapter;
  public messages: MessagesAdapter;
  public peers: PeersAdapter;
  public peerInfo: PeerInfoAdapter;

  constructor({
    apiEndpoint,
    apiToken,
    timeout
  }: {
    apiEndpoint: string;
    apiToken: string;
    timeout?: number;
  }) {
    this.account = new AccountAdapter({ apiEndpoint, apiToken, timeout });
    this.aliases = new AliasesAdapter({ apiEndpoint, apiToken, timeout });
    this.channels = new ChannelsAdapter({ apiEndpoint, apiToken, timeout });
    this.node = new NodeAdapter({ apiEndpoint, apiToken, timeout });
    this.settings = new SettingsAdapter({ apiEndpoint, apiToken, timeout });
    this.tickets = new TicketsAdapter({ apiEndpoint, apiToken, timeout });
    this.tokens = new TokensAdapter({ apiEndpoint, apiToken, timeout });
    this.messages = new MessagesAdapter({ apiEndpoint, apiToken, timeout });
    this.peers = new PeersAdapter({ apiEndpoint, apiToken, timeout });
    this.peerInfo = new PeerInfoAdapter({ apiEndpoint, apiToken, timeout });
  }
}
