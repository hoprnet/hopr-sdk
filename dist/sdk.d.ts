import { ApiWrapper } from './api/apiWrapper.js';
import './api/channels/channelsWrapper.js';
import './types/channels.js';
import 'zod';
import './types/general.js';
import './api/node/nodeWrapper.js';
import './types/node.js';
import './api/peerInfo/peerInfoWrapper.js';
import './types/peerInfo.js';
import './api/tickets/ticketsWrapper.js';
import './api/settings/settingsWrapper.js';
import './types/settings.js';

declare class SDK {
    private url;
    private apiToken;
    api: ApiWrapper;
    constructor(url: string, apiToken: string);
}

export { SDK };
