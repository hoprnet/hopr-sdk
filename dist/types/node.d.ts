import { z } from 'zod';
import { ZodToType } from './general.js';

/**
 * Get peers
 */
declare const GetPeersPayload: z.ZodObject<{
    quality: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    quality: number;
}, {
    quality: number;
}>;
type GetPeersPayloadType = ZodToType<typeof GetPeersPayload>;
declare const Peer: z.ZodObject<{
    peerId: z.ZodString;
    multiAddr: z.ZodString;
    heartbeats: z.ZodObject<{
        sent: z.ZodNumber;
        success: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        sent: number;
        success: number;
    }, {
        sent: number;
        success: number;
    }>;
    lastSeen: z.ZodNumber;
    quality: z.ZodNumber;
    backoff: z.ZodNumber;
    isNew: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
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
}, {
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
}>;
declare const GetPeersResponse: z.ZodObject<{
    connected: z.ZodArray<z.ZodObject<{
        peerId: z.ZodString;
        multiAddr: z.ZodString;
        heartbeats: z.ZodObject<{
            sent: z.ZodNumber;
            success: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            sent: number;
            success: number;
        }, {
            sent: number;
            success: number;
        }>;
        lastSeen: z.ZodNumber;
        quality: z.ZodNumber;
        backoff: z.ZodNumber;
        isNew: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
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
    }, {
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
    }>, "many">;
    announced: z.ZodArray<z.ZodObject<{
        peerId: z.ZodString;
        multiAddr: z.ZodString;
        heartbeats: z.ZodObject<{
            sent: z.ZodNumber;
            success: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            sent: number;
            success: number;
        }, {
            sent: number;
            success: number;
        }>;
        lastSeen: z.ZodNumber;
        quality: z.ZodNumber;
        backoff: z.ZodNumber;
        isNew: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
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
    }, {
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
    }>, "many">;
}, "strip", z.ZodTypeAny, {
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
}, {
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
type GetPeersResponseType = ZodToType<typeof GetPeersResponse>;
/**
 * Get Info
 */
declare const GetInfoResponse: z.ZodObject<{
    environment: z.ZodString;
    announcedAddress: z.ZodArray<z.ZodString, "many">;
    listeningAddress: z.ZodArray<z.ZodString, "many">;
    network: z.ZodString;
    hoprToken: z.ZodString;
    hoprChannels: z.ZodString;
    hoprNetworkRegistryAddress: z.ZodOptional<z.ZodString>;
    connectivityStatus: z.ZodString;
    isEligible: z.ZodBoolean;
    channelClosurePeriod: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
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
}, {
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
type GetInfoResponseType = ZodToType<typeof GetInfoResponse>;
declare const GetEntryNodesResponse: z.ZodRecord<z.ZodString, z.ZodObject<{
    multiaddrs: z.ZodArray<z.ZodString, "many">;
    isEligible: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    isEligible: boolean;
    multiaddrs: string[];
}, {
    isEligible: boolean;
    multiaddrs: string[];
}>>;
type GetEntryNodesResponseType = ZodToType<typeof GetEntryNodesResponse>;
/**
 * Ping node
 */
declare const PingNodePayload: z.ZodObject<{
    peerId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    peerId: string;
}, {
    peerId: string;
}>;
type PingNodePayloadType = ZodToType<typeof PingNodePayload>;
declare const PingNodeResponse: z.ZodObject<{
    latency: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    latency: number;
}, {
    latency: number;
}>;
type PingNodeResponseType = ZodToType<typeof PingNodeResponse>;

export { GetEntryNodesResponse, GetEntryNodesResponseType, GetInfoResponse, GetInfoResponseType, GetPeersPayload, GetPeersPayloadType, GetPeersResponse, GetPeersResponseType, Peer, PingNodePayload, PingNodePayloadType, PingNodeResponse, PingNodeResponseType };
