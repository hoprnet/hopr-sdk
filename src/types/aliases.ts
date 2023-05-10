import { z } from 'zod';
import { ZodToType } from './general';

/**
 * General
 */

export const aliasPayload = z.object({
  alias: z.string()
});

export type aliasPayloadType = ZodToType<typeof aliasPayload>;

/**
 * getAliases
 */

export const getAliasesResponse = z.record(z.string());

export type getAliasesResponseType = ZodToType<typeof getAliasesResponse>;

/**
 * setAlias
 */

export const setAliasPayload = z.object({
  peerId: z.string(),
  alias: z.string()
});

export type setAliasPayloadType = ZodToType<typeof setAliasPayload>;
