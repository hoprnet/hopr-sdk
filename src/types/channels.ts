import { z } from 'zod';
import { ZodToType } from './general';

/**
 * Fund channel
 */

export const FundChannelsPayload = z.object({
  peerId: z.string(),
  outgoingAmount: z.string(),
  incomingAmount: z.string()
});

export type FundChannelsPayloadType = ZodToType<typeof FundChannelsPayload>;

export const FundChannelsResponse = z.object({
  receipt: z.string()
});

export type FundChannelsResponseType = ZodToType<typeof FundChannelsResponse>;

/** Open channel */

export const OpenChannelsPayload = z.object({
  peerId: z.string(),
  amount: z.string()
});

export type OpenChannelsPayloadType = ZodToType<typeof OpenChannelsPayload>;

export const OpenChannelsResponse = z.object({
  channelId: z.string(),
  receipt: z.string()
});

export type OpenChannelsResponseType = ZodToType<typeof OpenChannelsResponse>;

/** Get channels */

export const Channel = z.object({
  type: z.enum(['incoming', 'outgoing']),
  channelId: z.string(),
  peerId: z.string(),
  status: z.enum(['WaitingForCommitment', 'Open', 'PendingToClose', 'Closed']),
  balance: z.string()
});

export const GetChannelsResponse = z.object({
  incoming: z.array(Channel),
  outgoing: z.array(Channel)
});

export type GetChannelsResponseType = ZodToType<typeof GetChannelsResponse>;

/** Redeem tickets */

export const RedeemTicketsPayload = z.object({
  peerId: z.string()
});

export type RedeemTicketsPayloadType = ZodToType<typeof RedeemTicketsPayload>;
