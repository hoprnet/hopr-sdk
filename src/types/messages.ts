import { z } from 'zod';
import { ZodToType } from './general';

/**
 * sign
 */

export const signPayload = z.object({
  message: z.string()
});

export type signPayloadType = ZodToType<typeof signPayload>;

export const signResponse = z.object({
  signature: z.string()
});

/**
 * sendMessage
 */

export const sendMessagePayload = z.object({
  body: z.string(),
  recipient: z.string(),
  path: z.array(z.string()).optional(),
  hops: z.number().optional()
});

export type sendMessagePayloadType = ZodToType<typeof sendMessagePayload>;
