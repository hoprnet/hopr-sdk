import { z } from 'zod';
import { ZodToType } from './general.js';

/**
 * General
 */
declare const aliasPayload: z.ZodObject<{
    alias: z.ZodString;
}, "strip", z.ZodTypeAny, {
    alias: string;
}, {
    alias: string;
}>;
type aliasPayloadType = ZodToType<typeof aliasPayload>;
/**
 * getAliases
 */
declare const getAliasesResponse: z.ZodRecord<z.ZodString, z.ZodString>;
type getAliasesResponseType = ZodToType<typeof getAliasesResponse>;
/**
 * setAlias
 */
declare const setAliasPayload: z.ZodObject<{
    peerId: z.ZodString;
    alias: z.ZodString;
}, "strip", z.ZodTypeAny, {
    alias: string;
    peerId: string;
}, {
    alias: string;
    peerId: string;
}>;
type setAliasPayloadType = ZodToType<typeof setAliasPayload>;
/**
 * getAlias
 */
declare const getAliasResponse: z.ZodObject<{
    peerId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    peerId: string;
}, {
    peerId: string;
}>;
type getAliasResponseType = ZodToType<typeof getAliasResponse>;

export { aliasPayload, aliasPayloadType, getAliasResponse, getAliasResponseType, getAliasesResponse, getAliasesResponseType, setAliasPayload, setAliasPayloadType };
