import { z } from 'zod';

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
