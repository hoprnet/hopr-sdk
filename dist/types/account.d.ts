import { z } from 'zod';
import { ZodToType } from './general.js';

/**
 * General
 */
declare const accountResponse: z.ZodObject<{
    hopr: z.ZodString;
    native: z.ZodString;
}, "strip", z.ZodTypeAny, {
    hopr: string;
    native: string;
}, {
    hopr: string;
    native: string;
}>;
type accountResponseType = ZodToType<typeof accountResponse>;
/**
 * withdraw
 */
declare const withdrawPayload: z.ZodObject<{
    currency: z.ZodEnum<["NATIVE", "HOPR"]>;
    amount: z.ZodString;
    recipient: z.ZodString;
}, "strip", z.ZodTypeAny, {
    amount: string;
    currency: "NATIVE" | "HOPR";
    recipient: string;
}, {
    amount: string;
    currency: "NATIVE" | "HOPR";
    recipient: string;
}>;
type withdrawPayloadType = ZodToType<typeof withdrawPayload>;
declare const withdrawResponse: z.ZodObject<{
    receipt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    receipt: string;
}, {
    receipt: string;
}>;

export { accountResponse, accountResponseType, withdrawPayload, withdrawPayloadType, withdrawResponse };
