import { string, z } from 'zod';
import { BasePayload } from './general';

/**
 * Get peer
 */

export const GetPeerPayload = BasePayload.extend({
  peerId: string().optional(),
  destination: string().optional()
});

export type GetPeerPayloadType = z.infer<typeof GetPeerPayload>;

export const GetPeerResponse = z.object({
  announced: z.string().array(),
  observed: z.string().array()
});

export type GetPeerResponseType = z.infer<typeof GetPeerResponse>;

/**
 * Ping peer
 */

export const PingPeerPayload = BasePayload.extend({
  peerId: z.string().optional(),
  destination: string().optional()
});

export type PingPeerPayloadType = z.infer<typeof PingPeerPayload>;

export const PingPeerResponse = z.object({
  latency: z.number(),
  reportedVersion: z.string()
});

export type PingPeerResponseType = z.infer<typeof PingPeerResponse>;
