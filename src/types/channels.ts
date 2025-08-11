import { z } from 'zod';
import { BasePayload } from './general';

/** General types */

const ChannelStatus = z.enum(['Open', 'PendingToClose', 'Closed']);

const TopologyChannel = z.object({
  channelId: z.string(),
  destination: z.string(),
  source: z.string(),
  balance: z.string(),
  status: ChannelStatus,
  ticketIndex: z.string(),
  channelEpoch: z.number(),
  closureTime: z.number()
});

export const Channel = z.object({
  id: z.string(),
  peerAddress: z.string(),
  status: ChannelStatus,
  balance: z.string()
});

/**
 * Redeem channel tickets
 */

export const RedeemChannelTicketsPayload = BasePayload.extend({
  channelId: z.string()
});

export type RedeemChannelTicketsPayloadType = z.infer<
  typeof RedeemChannelTicketsPayload
>;

/**
 * Aggregate channel tickets
 */

export const AggregateChannelTicketsPayload = BasePayload.extend({
  channelId: z.string()
});

export type AggregateChannelTicketsPayloadType = z.infer<
  typeof RedeemChannelTicketsPayload
>;

/**
 * Fund channel
 */

export const FundChannelsPayload = BasePayload.extend({
  channelId: z.string(),
  amount: z.string()
});

export type FundChannelsPayloadType = z.infer<typeof FundChannelsPayload>;

export const FundChannelsResponse = z.string();

export type FundChannelsResponseType = z.infer<typeof FundChannelsResponse>;

/** Open channel */

export const OpenChannelPayload = BasePayload.extend({
  destination: z.string(),
  amount: z.string()
});

export type OpenChannelPayloadType = z.infer<typeof OpenChannelPayload>;

export const OpenChannelResponse = z.object({
  channelId: z.string(),
  transactionReceipt: z.string()
});

export type OpenChannelResponseType = z.infer<typeof OpenChannelResponse>;

/** Get channels */

export const GetChannelsPayload = BasePayload.extend({
  includingClosed: z.boolean().optional(),
  fullTopology: z.boolean().optional()
});

export type GetChannelsPayloadType = z.infer<typeof GetChannelsPayload>;

export const GetChannelsResponse = z.object({
  incoming: z.array(Channel),
  outgoing: z.array(Channel),
  all: z.array(TopologyChannel)
});

export type GetChannelsResponseType = z.infer<typeof GetChannelsResponse>;

/** Get channel tickets */

export const GetChannelTicketsPayload = BasePayload.extend({
  channelId: z.string()
});

export type GetChannelTicketsPayloadType = z.infer<
  typeof GetChannelTicketsPayload
>;

export const Ticket = z.object({
  channelId: z.string(),
  amount: z.string(),
  index: z.number(),
  indexOffset: z.number(),
  channelEpoch: z.number(),
  winProb: z.string(),
  signature: z.string()
});

export const GetChannelTicketsResponse = z.array(Ticket);

export type GetChannelTicketsResponseType = z.infer<
  typeof GetChannelTicketsResponse
>;

/** Close channel */

export const CloseChannelPayload = BasePayload.extend({
  channelId: z.string()
});

export type CloseChannelPayloadType = z.infer<typeof CloseChannelPayload>;

export const CloseChannelResponse = z.object({
  receipt: z.string(),
  channelStatus: ChannelStatus
});

export type CloseChannelResponseType = z.infer<typeof CloseChannelResponse>;

/** Get channel */

export const GetChannelPayload = BasePayload.extend({
  channelId: z.string()
});

export type GetChannelPayloadType = z.infer<typeof GetChannelPayload>;

export const GetChannelResponse = TopologyChannel;

export type GetChannelResponseType = z.infer<typeof GetChannelResponse>;

/** Get channels corrupted */

export const GetChannelsCorruptedResponse = z.array(z.string());

export type GetChannelsCorruptedResponseType = z.infer<
  typeof GetChannelsCorruptedResponse
>;
