import { z } from 'zod';
import { ZodToType } from './general.js';

/**
 * General
 */
declare const AliasPayload: z.ZodObject<{
    url: z.ZodString;
    apiKey: z.ZodString;
    alias: z.ZodString;
}, "strip", z.ZodTypeAny, {
    url: string;
    apiKey: string;
    alias: string;
}, {
    url: string;
    apiKey: string;
    alias: string;
}>;
type AliasPayloadType = ZodToType<typeof AliasPayload>;
/**
 * getAliases
 */
declare const GetAliasesResponse: z.ZodRecord<z.ZodString, z.ZodString>;
type GetAliasesResponseType = ZodToType<typeof GetAliasesResponse>;
/**
 * setAlias
 */
declare const SetAliasPayload: z.ZodObject<{
    url: z.ZodString;
    apiKey: z.ZodString;
    peerId: z.ZodString;
    alias: z.ZodString;
}, "strip", z.ZodTypeAny, {
    url: string;
    apiKey: string;
    alias: string;
    peerId: string;
}, {
    url: string;
    apiKey: string;
    alias: string;
    peerId: string;
}>;
type SetAliasPayloadType = ZodToType<typeof SetAliasPayload>;
/**
 * getAlias
 */
declare const GetAliasResponse: z.ZodObject<{
    peerId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    peerId: string;
}, {
    peerId: string;
}>;
type GetAliasResponseType = ZodToType<typeof GetAliasResponse>;

export { AliasPayload, AliasPayloadType, GetAliasResponse, GetAliasResponseType, GetAliasesResponse, GetAliasesResponseType, SetAliasPayload, SetAliasPayloadType };
