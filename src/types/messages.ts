import { z } from 'zod';
import { BasePayload } from './general';

/**
 * sign
 */

export const SignPayload = BasePayload.extend({
  message: z.string()
});

export type SignPayloadType = z.infer<typeof SignPayload>;

export const SignResponse = z.object({
  signature: z.string()
});

/**
 * sendMessage
 */

export const SendMessagePayload = BasePayload.extend({
  body: z.string(),
  recipient: z.string(),
  path: z.array(z.string()).optional(),
  hops: z.number().optional()
});

export type SendMessagePayloadType = z.infer<typeof SendMessagePayload>;
