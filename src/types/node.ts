import { z } from 'zod';
import { BasePayload } from './general';

/**
 * Get peers
 */

export const GetPeersPayload = BasePayload.extend({
  quality: z.number().optional()
});

export type GetPeersPayloadType = z.infer<typeof GetPeersPayload>;

export const Peer = z.object({
  peerId: z.string(),
  multiAddr: z.string(),
  heartbeats: z.object({
    sent: z.number(),
    success: z.number()
  }),
  lastSeen: z.number(),
  quality: z.number(),
  backoff: z.number(),
  isNew: z.boolean(),
  reportedVersion: z.string()
});
export const GetPeersResponse = z.object({
  connected: z.array(Peer),
  announced: z.array(Peer)
});

export type GetPeersResponseType = z.infer<typeof GetPeersResponse>;

/**
 * Get Info
 */

export const GetInfoResponse = z.object({
  network: z.string(),
  announcedAddress: z.string().array(),
  listeningAddress: z.string().array(),
  chain: z.string(),
  hoprToken: z.string(),
  hoprChannels: z.string(),
  hoprNetworkRegistryAddress: z.string().optional(),
  connectivityStatus: z.string(),
  isEligible: z.boolean(),
  channelClosurePeriod: z.number()
});

export type GetInfoResponseType = z.infer<typeof GetInfoResponse>;

/**
 * Get entry nodes
 */

const nodeSchema = z.object({
  multiaddrs: z.array(z.string()),
  isEligible: z.boolean()
});

export const GetEntryNodesResponse = z.record(nodeSchema);

export type GetEntryNodesResponseType = z.infer<typeof GetEntryNodesResponse>;

/**
 * Ping node
 */

export const PingNodePayload = BasePayload.extend({
  peerId: z.string()
});

export type PingNodePayloadType = z.infer<typeof PingNodePayload>;

export const PingNodeResponse = z.object({
  latency: z.number()
});

export type PingNodeResponseType = z.infer<typeof PingNodeResponse>;
