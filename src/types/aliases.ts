import { z } from 'zod';
import { BasePayload } from './general';

/**
 * General
 */

export const AliasPayload = BasePayload.extend({
  alias: z.string()
});

export type AliasPayloadType = z.infer<typeof AliasPayload>;

/**
 * getAliases
 */

export const GetAliasesResponse = z.record(z.string());

export type GetAliasesResponseType = z.infer<typeof GetAliasesResponse>;

/**
 * setAlias
 */

export const SetAliasPayload = BasePayload.extend({
  peerId: z.string().optional(),
  destination: z.string().optional(),
  alias: z.string()
});

export type SetAliasPayloadType = z.infer<typeof SetAliasPayload>;

/**
 * getAlias
 */

export const GetAliasResponse = z.object({ peerId: z.string() });

export type GetAliasResponseType = z.infer<typeof GetAliasResponse>;

export const GetAddressFromAliasResponse = z.object({ address: z.string() });

export type GetAddressFromAliasResponseType = z.infer<
  typeof GetAddressFromAliasResponse
>;
