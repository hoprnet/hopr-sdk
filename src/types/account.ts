import { z } from 'zod';
import { BasePayload } from './general';

/**
 * balances
 */

export const GetBalancesResponse = z.object({
  hopr: z.string(),
  native: z.string(),
  safeNative: z.string(),
  safeHopr: z.string(),
  safeHoprAllowance: z.string(),
  token: z.string().optional()
});

export type GetBalancesResponseType = z.infer<typeof GetBalancesResponse>;

/**
 * addresses
 */

export const GetAddressesResponse = z.object({
  native: z.string()
});

export type GetAddressesResponseType = z.infer<typeof GetAddressesResponse>;

/**
 * withdraw
 */

export const WithdrawPayload = BasePayload.extend({
  amount: z.string(),
  address: z.string()
});

export type WithdrawPayloadType = z.infer<typeof WithdrawPayload>;

export const WithdrawResponse = z.object({
  receipt: z.string()
});
