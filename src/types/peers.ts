import { string, z } from 'zod';
import { BasePayload } from './general';

/**
 * Get peer
 */

export const GetPeerPayload = BasePayload.extend({
  address: string()
});

export type GetPeerPayloadType = z.infer<typeof GetPeerPayload>;

const AnnouncementOrigin = z.enum(['chain', 'dht']);

const MultiaddressSource = z.object({
  multiaddress: z.string(),
  origin: AnnouncementOrigin
});

const PeerChannelInfo = z.object({
  id: z.string(),
  status: z.string(),
  balance: z.string()
});

const PeerQosInfo = z.object({
  probeRate: z.number(),
  lastUpdate: z.number(),
  score: z.number(),
  averageLatency: z.number().nullable().optional()
});

export const GetPeerResponse = z.object({
  announcedSources: z.array(MultiaddressSource),
  observed: z.string().array(),
  incomingChannel: PeerChannelInfo.nullable().optional(),
  outgoingChannel: PeerChannelInfo.nullable().optional(),
  qos: PeerQosInfo.nullable().optional()
});

export type GetPeerResponseType = z.infer<typeof GetPeerResponse>;

/**
 * Ping peer
 */

export const PingPeerPayload = BasePayload.extend({
  address: string()
});

export type PingPeerPayloadType = z.infer<typeof PingPeerPayload>;

export const PingPeerResponse = z.object({
  latency: z.number()
});

export type PingPeerResponseType = z.infer<typeof PingPeerResponse>;
