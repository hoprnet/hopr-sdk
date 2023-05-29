import { z } from 'zod';
import { BasePayload, ZodToType } from './general';

/**
 * General types
 */

export const PeerIdPayload = BasePayload.extend({
  peerId: z.string()
});

export type PeerIdPayloadType = ZodToType<typeof PeerIdPayload>;

/**
 * Fund channel
 */

export const FundChannelsPayload = BasePayload.extend({
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

export const OpenChannelPayload = BasePayload.extend({
  peerId: z.string(),
  amount: z.string()
});

export type OpenChannelPayloadType = ZodToType<typeof OpenChannelPayload>;

export const OpenChannelResponse = z.object({
  channelId: z.string(),
  receipt: z.string()
});

export type OpenChannelResponseType = ZodToType<typeof OpenChannelResponse>;

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

/** Get tickets */

export const Ticket = z.object({
  counterparty: z.string(),
  challenge: z.string(),
  epoch: z.string(),
  index: z.string(),
  amount: z.string(),
  winProb: z.string(),
  channelEpoch: z.string(),
  signature: z.string()
});

export const GetChannelTicketsResponse = z.array(Ticket);

export type GetChannelTicketsResponseType = ZodToType<
  typeof GetChannelTicketsResponse
>;

/** Close channel */

export const CloseChannelPayload = BasePayload.extend({
  peerId: z.string(),
  direction: z.enum(['incoming', 'outgoing'])
});

export type CloseChannelPayloadType = ZodToType<typeof CloseChannelPayload>;

export const CloseChannelResponse = z.object({
  receipt: z.string().optional(),
  channelStatus: z.string()
});

export type CloseChannelResponseType = ZodToType<typeof CloseChannelResponse>;

/** Get channel */

export const GetChannelPayload = BasePayload.extend({
  peerId: z.string(),
  direction: z.enum(['incoming', 'outgoing'])
});

export type GetChannelPayloadType = ZodToType<typeof GetChannelPayload>;

export const GetChannelResponse = Channel;

export type GetChannelResponseType = ZodToType<typeof GetChannelResponse>;
