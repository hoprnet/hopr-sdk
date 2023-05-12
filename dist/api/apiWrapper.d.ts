import { ChannelsWrapper } from './channels/channelsWrapper.js';
import { NodeWrapper } from './node/nodeWrapper.js';
import { PeerInfoWrapper } from './peerInfo/peerInfoWrapper.js';
import { TicketsWrapper } from './tickets/ticketsWrapper.js';
import { SettingsWrapper } from './settings/settingsWrapper.js';
import '../types/channels.js';
import 'zod';
import '../types/general.js';
import '../types/node.js';
import '../types/peerInfo.js';
import '../types/settings.js';

declare class ApiWrapper {
    private url;
    private apiKey;
    channels: ChannelsWrapper;
    node: NodeWrapper;
    peerInfo: PeerInfoWrapper;
    settings: SettingsWrapper;
    tickets: TicketsWrapper;
    constructor(url: string, apiKey: string);
}

export { ApiWrapper };
