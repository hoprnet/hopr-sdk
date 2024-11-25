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
  tag: z.number().min(Math.pow(2, 10)).max(Math.pow(2, 16)),
  body: z.string(),
  destination: z.string().optional(),
  peerId: z.string().optional(),
  path: z.array(z.string()).min(1).max(3).optional(),
  hops: z.number().min(1).max(3).optional(),
});

export type SendMessagePayloadType = z.infer<typeof SendMessagePayload>;

export const SendMessageResponse = z.object({
  timestamp: z.number()
});

export type SendMessageResponseType = z.infer<typeof SendMessageResponse>;

/** Delete Messages */

export const DeleteMessagesPayload = BasePayload.extend({
  tag: z.number().nonnegative().optional()
});

export type DeleteMessagesPayloadType = z.infer<typeof DeleteMessagesPayload>;

/** Get Messages Size */

export const GetMessagesSizePayload = BasePayload.extend({
  tag: z.number().nonnegative()
});

export type GetMessagesSizePayloadType = z.infer<typeof GetMessagesSizePayload>;

export const GetMessagesSizeResponse = z.object({
  size: z.number().nonnegative()
});

export type GetMessagesSizeResponseType = z.infer<
  typeof GetMessagesSizeResponse
>;

/** Pop message */

export const PopMessagePayload = BasePayload.extend({
  tag: z.number().nonnegative().optional().nullable()
});

export type PopMessagePayloadType = z.infer<typeof PopMessagePayload>;

export const PopMessageResponse = ReceivedMessage;

export type PopMessageResponseType = z.infer<typeof PopMessageResponse>;

/** Pop all messages */

export const PopAllMessagesPayload = BasePayload.extend({
  tag: z.number().nonnegative().optional().nullable()
});

export type PopAllMessagesPayloadType = z.infer<typeof PopAllMessagesPayload>;

export const PopAllMessagesResponse = z.object({
  messages: z.array(ReceivedMessage)
});

export type PopAllMessagesResponseType = z.infer<typeof PopAllMessagesResponse>;

/** Peek message */

export const PeekMessagePayload = BasePayload.extend({
  tag: z.number().nonnegative().optional().nullable()
});

export type PeekMessagePayloadType = z.infer<typeof PeekMessagePayload>;

export const PeekMessageResponse = ReceivedMessage;

export type PeekMessageResponseType = z.infer<typeof PeekMessageResponse>;

/** Peek all messages */

export const PeekAllMessagesPayload = BasePayload.extend({
  tag: z.number().nonnegative().optional().nullable()
});

export type PeekAllMessagesPayloadType = z.infer<typeof PeekAllMessagesPayload>;

export const PeekAllMessagesResponse = z.object({
  messages: z.array(ReceivedMessage)
});

export type PeekAllMessagesResponseType = z.infer<
  typeof PeekAllMessagesResponse
>;
