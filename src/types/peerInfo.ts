import { string, z } from 'zod';
import { BasePayload } from './general';

/**
 * Get peer info
 */

export const GetPeerInfoPayload = BasePayload.extend({
  peerId: string()
});

export type GetPeerInfoPayloadType = z.infer<typeof GetPeerInfoPayload>;

export const GetPeerInfoResponse = z.object({
  announced: z.string().array(),
  observed: z.string().array()
});

export type GetPeerInfoResponseType = z.infer<typeof GetPeerInfoResponse>;
