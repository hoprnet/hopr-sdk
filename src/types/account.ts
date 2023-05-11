import { z } from 'zod';
import { ZodToType } from './general';

/**
 * General
 */

export const accountResponse = z.object({
  hopr: z.string(),
  native: z.string()
});

export type accountResponseType = ZodToType<typeof accountResponse>;

/**
 * withdraw
 */

export const withdrawPayload = z.object({
  currency: z.enum(['NATIVE', 'HOPR']),
  amount: z.string(),
  recipient: z.string()
});

export type withdrawPayloadType = ZodToType<typeof withdrawPayload>;
