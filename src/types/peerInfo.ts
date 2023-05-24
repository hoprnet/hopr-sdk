import { string, z } from 'zod';
import { BasicAuthenticationPayload, ZodToType } from './general';

/**
 * Get peer info
 */

export const GetPeerInfoPayload = BasicAuthenticationPayload.extend({
  peerId: string()
});

export type GetPeerInfoPayloadType = ZodToType<typeof GetPeerInfoPayload>;

export const GetPeerInfoResponse = z.object({
  announced: z.string().array(),
  observed: z.string().array()
});

export type GetPeerInfoResponseType = ZodToType<typeof GetPeerInfoResponse>;
