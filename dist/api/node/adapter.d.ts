import { RemoveBasicAuthenticationPayloadType } from '../../types/general.js';
import { GetPeersPayloadType, PingNodePayloadType } from '../../types/node.js';
import 'zod';

declare class NodeAdapter {
    private url;
    private apiKey;
    constructor(url: string, apiKey: string);
    getEntryNodes(): Promise<Record<string, {
        isEligible: boolean;
        multiaddrs: string[];
    }>>;
    getInfo(): Promise<{
        environment: string;
        announcedAddress: string[];
        listeningAddress: string[];
        network: string;
        hoprToken: string;
        hoprChannels: string;
        connectivityStatus: string;
        isEligible: boolean;
        channelClosurePeriod: number;
        hoprNetworkRegistryAddress?: string | undefined;
    }>;
    getMetrics(): Promise<string>;
    getPeers(payload: RemoveBasicAuthenticationPayloadType<GetPeersPayloadType>): Promise<{
        connected: {
            peerId: string;
            quality: number;
            multiAddr: string;
            heartbeats: {
                sent: number;
                success: number;
            };
            lastSeen: number;
            backoff: number;
            isNew: boolean;
        }[];
        announced: {
            peerId: string;
            quality: number;
            multiAddr: string;
            heartbeats: {
                sent: number;
                success: number;
            };
            lastSeen: number;
            backoff: number;
            isNew: boolean;
        }[];
    }>;
    getVersion(): Promise<string>;
    pingNode(payload: RemoveBasicAuthenticationPayloadType<PingNodePayloadType>): Promise<{
        latency: number;
    }>;
}

export { NodeAdapter };
