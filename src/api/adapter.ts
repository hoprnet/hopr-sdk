import { AccountAdapter } from './account/adapter';
import { AliasesAdapter } from './aliases/adapter';
import { ChannelsAdapter } from './channels/adapter';
import { ChecksAdapter } from './checks/adapter';
import { ConfigurationAdapter } from './configuration/adapter';
import { NetworkAdapter } from './network/adapter';
import { NodeAdapter } from './node/adapter';
import { TicketsAdapter } from './tickets/adapter';
import { TokensAdapter } from './tokens/adapter';
import { MessagesAdapter } from './messages/adapter';
import { PeersAdapter } from './peers/adapter';
import { SessionsAdapter } from './sessions/adapter';

export class ApiAdapter {
  public account: AccountAdapter;
  public aliases: AliasesAdapter;
  public channels: ChannelsAdapter;
  public checks: ChecksAdapter;
  public configuration: ConfigurationAdapter;
  public network: NetworkAdapter;
  public node: NodeAdapter;
  public tickets: TicketsAdapter;
  public tokens: TokensAdapter;
  public messages: MessagesAdapter;
  public peers: PeersAdapter;
  public sessions: SessionsAdapter;

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
    this.checks = new ChecksAdapter({ apiEndpoint, apiToken, timeout });
    this.configuration = new ConfigurationAdapter({
      apiEndpoint,
      apiToken,
      timeout
    });
    this.network = new NetworkAdapter({ apiEndpoint, apiToken, timeout });
    this.node = new NodeAdapter({ apiEndpoint, apiToken, timeout });
    this.tickets = new TicketsAdapter({ apiEndpoint, apiToken, timeout });
    this.tokens = new TokensAdapter({ apiEndpoint, apiToken, timeout });
    this.messages = new MessagesAdapter({ apiEndpoint, apiToken, timeout });
    this.peers = new PeersAdapter({ apiEndpoint, apiToken, timeout });
    this.sessions = new SessionsAdapter({ apiEndpoint, apiToken, timeout });
  }
}
