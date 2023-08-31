import { z } from 'zod';
import { BasePayload } from './general';

/**
 * General
 */

export const HoprAndNativeResponse = z.object({
  hopr: z.string(),
  native: z.string()
});

/**
 * balances
 */

export const GetBalancesResponse = HoprAndNativeResponse;

export type GetBalancesResponseType = z.infer<typeof GetBalancesResponse>;

/**
 * addresses
 */

export const GetAddressesResponse = HoprAndNativeResponse;

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
