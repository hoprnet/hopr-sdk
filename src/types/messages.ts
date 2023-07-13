import { z } from 'zod';
import { BasePayload } from './general';

/**
 * General
 */

export const ReceivedMessage = z.object({
  tag: z.number().nonnegative(),
  body: z.string(),
  receivedAt: z.number().nonnegative()
});

/**
 * Send Message
 */

export const SendMessagePayload = BasePayload.extend({
  tag: z.number().nonnegative(),
  body: z.string(),
  recipient: z.string(),
  path: z.array(z.string()).optional(),
  hops: z.number().min(1).max(3).optional()
});

export type SendMessagePayloadType = z.infer<typeof SendMessagePayload>;

/** Get Messages */

export const GetMessagesPayload = BasePayload.extend({
  tag: z.number().optional()
});

export type GetMessagesPayloadType = z.infer<typeof GetMessagesPayload>;

export const GetMessagesResponse = z.object({
  messages: z.array(ReceivedMessage)
});

export type GetMessagesResponseType = z.infer<typeof GetMessagesResponse>;

/** Delete Messages */

export const DeleteMessagesPayload = BasePayload.extend({
  tag: z.number().optional()
});

export type DeleteMessagesPayloadType = z.infer<typeof DeleteMessagesPayload>;

/** Get Messages Size */

export const GetMessagesSizePayload = BasePayload.extend({
  tag: z.number().optional()
});

export type GetMessagesSizePayloadType = z.infer<typeof GetMessagesSizePayload>;

export const GetMessagesSizeResponse = z.object({
  size: z.number().nonnegative()
});

export type GetMessagesSizeResponseType = z.infer<
  typeof GetMessagesSizeResponse
>;

/** Pop message */

export const PopMessageResponse = ReceivedMessage;

export type PopMessageResponseType = z.infer<typeof PopMessageResponse>;

/** Pop all messages */

export const PopAllMessagesPayload = BasePayload.extend({
  tag: z.number().optional()
});

export type PopAllMessagesPayloadType = z.infer<typeof PopAllMessagesPayload>;

export const PopAllMessagesResponse = z.object({
  messages: z.array(ReceivedMessage)
});

export type PopAllMessagesResponseType = z.infer<typeof PopAllMessagesResponse>;
