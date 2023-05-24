import { AccountAdapter } from './account/adapter';
import { AliasesAdapter } from './aliases/adapter';
import { ChannelsAdapter } from './channels/adapter';
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

  constructor({
    url,
    apiKey,
    timeout
  }: {
    url: string;
    apiKey: string;
    timeout?: number;
  }) {
    this.account = new AccountAdapter({ url, apiKey, timeout });
    this.aliases = new AliasesAdapter({ url, apiKey, timeout });
    this.channels = new ChannelsAdapter({ url, apiKey, timeout });
    this.node = new NodeAdapter({ url, apiKey, timeout });
    this.peerInfo = new PeerInfoAdapter({ url, apiKey, timeout });
    this.settings = new SettingsAdapter({ url, apiKey, timeout });
    this.tickets = new TicketsAdapter({ url, apiKey, timeout });
    this.tokens = new TokensAdapter({ url, apiKey, timeout });
  }
}
