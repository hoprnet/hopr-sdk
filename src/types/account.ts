import { z } from 'zod';
import { BasicAuthenticationPayload, ZodToType } from './general';

/**
 * General
 */

export const AccountResponse = z.object({
  hopr: z.string(),
  native: z.string()
});

export type AccountResponseType = ZodToType<typeof AccountResponse>;

/**
 * withdraw
 */

export const WithdrawPayload = ExtendedBasicPayload.extend({
  currency: z.enum(['NATIVE', 'HOPR']),
  amount: z.string(),
  recipient: z.string()
});

export type WithdrawPayloadType = ZodToType<typeof WithdrawPayload>;

export const WithdrawResponse = z.object({
  receipt: z.string()
});
