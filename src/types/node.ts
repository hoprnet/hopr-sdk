import { z } from 'zod';
import { BasePayload } from './general';

/**
 * Get peers
 */

export const GetPeersPayload = BasePayload.extend({
  score: z.number().optional()
});

export type GetPeersPayloadType = z.infer<typeof GetPeersPayload>;

export const PeerConnected = z.object({
  address: z.string(),
  multiaddr: z.string().nullable(),
  averageLatency: z.number(),
  lastUpdate: z.number(),
  probeRate: z.number(),
  score: z.number()
});

export type PeerConnectedType = z.infer<typeof PeerConnected>;

export const PeerAnnounced = z.object({
  address: z.string(),
  multiaddrs: z.array(z.string().nullable())
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
  announcedAddress: z.string().array(),
  listeningAddress: z.string().array(),
  providerUrl: z.string(),
  hoprNetworkName: z.string(),
  hoprNodeSafe: z.string(),
  connectivityStatus: z.string(),
  chainStatus: z.string(),
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

export const GetEntryNodesResponse = z.record(z.string(), nodeSchema);

export type GetEntryNodesResponseType = z.infer<typeof GetEntryNodesResponse>;

/**
 * Get node status
 */

const ComponentStatusInfo = z.object({
  status: z.string(),
  detail: z.string().nullable().optional()
});

const ComponentStatusesResponse = z.object({
  chain: ComponentStatusInfo,
  network: ComponentStatusInfo,
  transport: ComponentStatusInfo
});

export const GetNodeStatusResponse = z.object({
  overall: z.string(),
  nodeState: z.string(),
  components: ComponentStatusesResponse
});

export type GetNodeStatusResponseType = z.infer<typeof GetNodeStatusResponse>;

/**
 * Get version
 */

export const GetVersionResponse = z.object({
  apiVersion: z.string().optional(),
  version: z.string()
});

export type GetVersionResponseType = z.infer<typeof GetVersionResponse>;
