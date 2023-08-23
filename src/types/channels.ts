import { z } from 'zod';
import { BasePayload } from './general';

/** General types */

const ChannelStatus = z.enum(['Open', 'PendingToClose', 'Closed']);

const TopologyChannel = z.object({
  channelId: z.string(),
  sourcePeerId: z.string(),
  destinationPeerId: z.string(),
  sourceAddress: z.string(),
  destinationAddress: z.string(),
  balance: z.string(),
  status: ChannelStatus,
  ticketIndex: z.string(),
  channelEpoch: z.string(),
  closureTime: z.string()
});

export const Channel = z.object({
  type: z.enum(['incoming', 'outgoing']),
  id: z.string(),
  peerId: z.string(),
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

/** Open channel */

export const OpenChannelPayload = BasePayload.extend({
  peerAddress: z.string(),
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
  challenge: z.string(),
  index: z.string(),
  amount: z.string(),
  winProb: z.string(),
  channelEpoch: z.string(),
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

export const GetChannelResponse = z.array(TopologyChannel);

export type GetChannelResponseType = z.infer<typeof GetChannelResponse>;
