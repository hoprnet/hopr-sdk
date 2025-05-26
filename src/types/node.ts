import { z } from 'zod';
import { BasePayload } from './general';

/**
 * Get peers
 */

export const GetPeersPayload = BasePayload.extend({
  quality: z.number().optional()
});

export type GetPeersPayloadType = z.infer<typeof GetPeersPayload>;

export const PeerConnected = z.object({
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

export const PeerAnnounced = z.object({
  peerAddress: z.string(),
  multiaddr: z.string().nullable()
});

export const GetPeersResponse = z.object({
  connected: z.array(PeerConnected),
  announced: z.array(PeerAnnounced)
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
  indexerBlock: z.number().optional(), //from HORPd 2.1.3
  indexerChecksum: z.string().optional(), //from HORPd 2.1.3
  indexBlockPrevChecksum: z.number().optional(), //from HORPd 2.1.5
  indexerLastLogBlock: z.number().optional(), //from HORPd 2.2.0
  indexerLastLogChecksum: z.string().optional(), //from HORPd 2.2.0
  provider: z.string().optional(), //from HORPd 2.2.0
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

/**
 * Get version
 */

export const GetVersionResponse = z.object({
  apiVersion: z.string().optional(),
  version: z.string()
});

export type GetVersionResponseType = z.infer<typeof GetVersionResponse>;

/**
 * Get graph
 */

export const GetGraphPayload = BasePayload.extend({
  ignoreDisconnectedComponents: z.boolean().optional(),
  ignoreNonOpenedChannels: z.boolean().optional(),
  rawGraph: z.boolean().optional()
});

export type GetGraphPayloadType = z.infer<typeof GetGraphPayload>;

export const GetGraphResponse = z.string();

export type GetGraphResponseType = z.infer<typeof GetGraphResponse>;
