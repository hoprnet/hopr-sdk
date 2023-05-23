import { ApiAdapter } from './api/adapter.js';
import './api/aliases/adapter.js';
import './types/aliases.js';
import 'zod';
import './types/general.js';
import './api/channels/adapter.js';
import './types/channels.js';
import './api/tokens/adapter.js';
import './types/tokens.js';
import './api/account/adapter.js';
import './types/account.js';
import './api/node/adapter.js';
import './types/node.js';
import './api/peerInfo/adapter.js';
import './types/peerInfo.js';
import './api/tickets/adapter.js';
import './api/settings/adapter.js';
import './types/settings.js';

declare class SDK {
    private url;
    private apiToken;
    api: ApiAdapter;
    constructor(url: string, apiToken: string);
}

export { SDK };
