import { z } from 'zod';
import { BasePayload } from './general';

/** General types */

const ChannelStatus = z.enum(['Open', 'PendingToClose', 'Closed']);

const ChannelDirection = z.enum(['outgoing', 'incoming']);

const TopologyChannel = z.object({
  channelId: z.string(),
  destination: z.string(),
  source: z.string(),
  balance: z.string(),
  status: z.string(),
  ticketIndex: z.number(),
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
 * Fund channel
 */

export const FundChannelsPayload = BasePayload.extend({
  address: z.string(),
  amount: z.string()
});

export type FundChannelsPayloadType = z.infer<typeof FundChannelsPayload>;

export const FundChannelsResponse = z.object({
  hash: z.string()
});

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

/** Close channel */

export const CloseChannelPayload = BasePayload.extend({
  address: z.string(),
  direction: ChannelDirection.optional()
});

export type CloseChannelPayloadType = z.infer<typeof CloseChannelPayload>;

export const CloseChannelResponse = z.object({
  receipt: z.string()
});

export type CloseChannelResponseType = z.infer<typeof CloseChannelResponse>;

/** Get channel */

export const GetChannelPayload = BasePayload.extend({
  address: z.string(),
  direction: ChannelDirection.optional()
});

export type GetChannelPayloadType = z.infer<typeof GetChannelPayload>;

export const GetChannelResponse = TopologyChannel;

export type GetChannelResponseType = z.infer<typeof GetChannelResponse>;

