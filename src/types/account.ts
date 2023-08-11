import { z } from 'zod';
import { BasePayload } from './general';

/**
 * General
 */

export const AccountResponse = z.object({
  hopr: z.string(),
  native: z.string()
});

export type AccountResponseType = z.infer<typeof AccountResponse>;

/**
 * withdraw
 */

export const WithdrawPayload = BasePayload.extend({
  currency: z.enum(['NATIVE', 'HOPR']),
  amount: z.string(),
  recipient: z.string()
});

export type WithdrawPayloadType = z.infer<typeof WithdrawPayload>;

export const WithdrawResponse = z.object({
  receipt: z.string()
});
