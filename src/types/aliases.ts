import { z } from 'zod';
import { BasicAuthenticationPayload, ZodToType } from './general';

/**
 * General
 */

export const AliasPayload = ExtendedBasicPayload.extend({
  alias: z.string()
});

export type AliasPayloadType = ZodToType<typeof AliasPayload>;

/**
 * getAliases
 */

export const GetAliasesResponse = z.record(z.string());

export type GetAliasesResponseType = ZodToType<typeof GetAliasesResponse>;

/**
 * setAlias
 */

export const SetAliasPayload = ExtendedBasicPayload.extend({
  peerId: z.string(),
  alias: z.string()
});

export type SetAliasPayloadType = ZodToType<typeof SetAliasPayload>;

/**
 * getAlias
 */

export const GetAliasResponse = z.object({ peerId: z.string() });

export type GetAliasResponseType = ZodToType<typeof GetAliasResponse>;
