import { z } from 'zod';
import { BasePayload } from './general';

/**
 * balances
 */

export const GetBalancesResponse = z.object({
  hopr: z.string(),
  native: z.string(),
  safeNative: z.string(),
  safeHopr: z.string()
});

export type GetBalancesResponseType = z.infer<typeof GetBalancesResponse>;

/**
 * addresses
 */

export const GetAddressesResponse = z.object({
  hopr: z.string(),
  native: z.string()
});

export type GetAddressesResponseType = z.infer<typeof GetAddressesResponse>;

/**
 * withdraw
 */

export const WithdrawPayload = BasePayload.extend({
  currency: z.enum(['NATIVE', 'HOPR']),
  amount: z.string(),
  ethereumAddress: z.string()
});

export type WithdrawPayloadType = z.infer<typeof WithdrawPayload>;

export const WithdrawResponse = z.object({
  receipt: z.string()
});
