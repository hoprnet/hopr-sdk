import { z } from 'zod';
import { ZodToType } from './general.js';

/**
 * General
 */
declare const AccountResponse: z.ZodObject<{
    hopr: z.ZodString;
    native: z.ZodString;
}, "strip", z.ZodTypeAny, {
    hopr: string;
    native: string;
}, {
    hopr: string;
    native: string;
}>;
type AccountResponseType = ZodToType<typeof AccountResponse>;
/**
 * withdraw
 */
declare const WithdrawPayload: z.ZodObject<{
    url: z.ZodString;
    apiKey: z.ZodString;
    currency: z.ZodEnum<["NATIVE", "HOPR"]>;
    amount: z.ZodString;
    recipient: z.ZodString;
}, "strip", z.ZodTypeAny, {
    url: string;
    apiKey: string;
    amount: string;
    recipient: string;
    currency: "NATIVE" | "HOPR";
}, {
    url: string;
    apiKey: string;
    amount: string;
    recipient: string;
    currency: "NATIVE" | "HOPR";
}>;
type WithdrawPayloadType = ZodToType<typeof WithdrawPayload>;
declare const WithdrawResponse: z.ZodObject<{
    receipt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    receipt: string;
}, {
    receipt: string;
}>;

export { AccountResponse, AccountResponseType, WithdrawPayload, WithdrawPayloadType, WithdrawResponse };
