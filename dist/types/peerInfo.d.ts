import { z } from 'zod';
import { ZodToType } from './general.js';

/**
 * Get peer info
 */
declare const GetPeerInfoPayload: z.ZodObject<{
    url: z.ZodString;
    apiKey: z.ZodString;
    peerId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    url: string;
    apiKey: string;
    peerId: string;
}, {
    url: string;
    apiKey: string;
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
