import { z } from 'zod';
import { ZodToType } from './general.js';

/**
 * sign
 */
declare const SignPayload: z.ZodObject<{
    url: z.ZodString;
    apiKey: z.ZodString;
    message: z.ZodString;
}, "strip", z.ZodTypeAny, {
    message: string;
    url: string;
    apiKey: string;
}, {
    message: string;
    url: string;
    apiKey: string;
}>;
type SignPayloadType = ZodToType<typeof SignPayload>;
declare const SignResponse: z.ZodObject<{
    signature: z.ZodString;
}, "strip", z.ZodTypeAny, {
    signature: string;
}, {
    signature: string;
}>;
/**
 * sendMessage
 */
declare const SendMessagePayload: z.ZodObject<{
    url: z.ZodString;
    apiKey: z.ZodString;
    body: z.ZodString;
    recipient: z.ZodString;
    path: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    hops: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    url: string;
    apiKey: string;
    recipient: string;
    body: string;
    path?: string[] | undefined;
    hops?: number | undefined;
}, {
    url: string;
    apiKey: string;
    recipient: string;
    body: string;
    path?: string[] | undefined;
    hops?: number | undefined;
}>;
type SendMessagePayloadType = ZodToType<typeof SendMessagePayload>;

export { SendMessagePayload, SendMessagePayloadType, SignPayload, SignPayloadType, SignResponse };
