import { AliasesAdapter } from './aliases/adapter.js';
import { ChannelsAdapter } from './channels/adapter.js';
import { TokensAdapter } from './tokens/adapter.js';
import { AccountAdapter } from './account/adapter.js';
import { NodeAdapter } from './node/adapter.js';
import { PeerInfoAdapter } from './peerInfo/adapter.js';
import { TicketsAdapter } from './tickets/adapter.js';
import { SettingsAdapter } from './settings/adapter.js';
import '../types/aliases.js';
import 'zod';
import '../types/general.js';
import '../types/channels.js';
import '../types/tokens.js';
import '../types/account.js';
import '../types/node.js';
import '../types/peerInfo.js';
import '../types/settings.js';

declare class ApiAdapter {
    private url;
    private apiKey;
    account: AccountAdapter;
    aliases: AliasesAdapter;
    channels: ChannelsAdapter;
    node: NodeAdapter;
    peerInfo: PeerInfoAdapter;
    settings: SettingsAdapter;
    tickets: TicketsAdapter;
    tokens: TokensAdapter;
    constructor(url: string, apiKey: string);
}

export { ApiAdapter };
