import { RemoveBasicAuthenticationPayloadType } from '../../types/general.js';
import { GetPeerInfoPayloadType } from '../../types/peerInfo.js';
import 'zod';

declare class PeerInfoAdapter {
    private url;
    private apiKey;
    constructor(url: string, apiKey: string);
    getPeerInfo(payload: RemoveBasicAuthenticationPayloadType<GetPeerInfoPayloadType>): Promise<{
        announced: string[];
        observed: string[];
    }>;
}

export { PeerInfoAdapter };
