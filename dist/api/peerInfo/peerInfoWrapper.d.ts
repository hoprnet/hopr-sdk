import { GetPeerInfoPayloadType } from '../../types/peerInfo.js';
import 'zod';
import '../../types/general.js';

declare class PeerInfoWrapper {
    private url;
    private apiKey;
    constructor(url: string, apiKey: string);
    getPeerInfo(body: GetPeerInfoPayloadType): Promise<{
        announced: string[];
        observed: string[];
    }>;
}

export { PeerInfoWrapper };
