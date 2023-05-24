import { z } from 'zod';
import { BasePayload, ZodToType } from './general';

/**
 * Get peers
 */

export const GetPeersPayload = BasePayload.extend({
  quality: z.number().optional()
});

export type GetPeersPayloadType = ZodToType<typeof GetPeersPayload>;

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
  isNew: z.boolean()
});
export const GetPeersResponse = z.object({
  connected: z.array(Peer),
  announced: z.array(Peer)
});

export type GetPeersResponseType = ZodToType<typeof GetPeersResponse>;

/**
 * Get Info
 */

export const GetInfoResponse = z.object({
  environment: z.string(),
  announcedAddress: z.string().array(),
  listeningAddress: z.string().array(),
  network: z.string(),
  hoprToken: z.string(),
  hoprChannels: z.string(),
  hoprNetworkRegistryAddress: z.string().optional(),
  connectivityStatus: z.string(),
  isEligible: z.boolean(),
  channelClosurePeriod: z.number()
});

export type GetInfoResponseType = ZodToType<typeof GetInfoResponse>;

/**
 * Get entry nodes
 */

const nodeSchema = z.object({
  multiaddrs: z.array(z.string()),
  isEligible: z.boolean()
});

export const GetEntryNodesResponse = z.record(nodeSchema);

export type GetEntryNodesResponseType = ZodToType<typeof GetEntryNodesResponse>;

/**
 * Ping node
 */

export const PingNodePayload = BasePayload.extend({
  peerId: z.string()
});

export type PingNodePayloadType = ZodToType<typeof PingNodePayload>;

export const PingNodeResponse = z.object({
  latency: z.number()
});

export type PingNodeResponseType = ZodToType<typeof PingNodeResponse>;
