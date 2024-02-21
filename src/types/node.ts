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
  peerAddress: z.string(),
  multiaddr: z.string().nullable(),
  heartbeats: z.object({
    sent: z.number(),
    success: z.number()
  }),
  lastSeen: z.number(),
  lastSeenLatency: z.number(),
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
  hoprNetworkRegistry: z.string().optional(),
  hoprNodeSafeRegistry: z.string().optional(),
  hoprManagementModule: z.string(),
  hoprNodeSafe: z.string(),
  connectivityStatus: z.enum(['Unknown', 'Red', 'Orange', 'Yellow', 'Green']),
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
