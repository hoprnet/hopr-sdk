import { z } from 'zod';
import { BasicAuthenticationPayload, ZodToType } from './general';

/**
 * sign
 */

export const SignPayload = ExtendedBasicPayload.extend({
  message: z.string()
});

export type SignPayloadType = ZodToType<typeof SignPayload>;

export const SignResponse = z.object({
  signature: z.string()
});

/**
 * sendMessage
 */

export const SendMessagePayload = ExtendedBasicPayload.extend({
  body: z.string(),
  recipient: z.string(),
  path: z.array(z.string()).optional(),
  hops: z.number().optional()
});

export type SendMessagePayloadType = ZodToType<typeof SendMessagePayload>;
