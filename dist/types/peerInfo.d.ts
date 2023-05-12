import { z } from 'zod';
import { ZodToType } from './general.js';

/**
 * Get peer info
 */
declare const GetPeerInfoPayload: z.ZodObject<{
    peerId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    peerId: string;
}, {
    peerId: string;
}>;
type GetPeerInfoPayloadType = ZodToType<typeof GetPeerInfoPayload>;
declare const GetPeerInfoResponse: z.ZodObject<{
    announced: z.ZodArray<z.ZodString, "many">;
    observed: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    announced: string[];
    observed: string[];
}, {
    announced: string[];
    observed: string[];
}>;
type GetPeerInfoResponseType = ZodToType<typeof GetPeerInfoResponse>;

export { GetPeerInfoPayload, GetPeerInfoPayloadType, GetPeerInfoResponse, GetPeerInfoResponseType };
