import { z } from 'zod';
import { BasePayload } from './general';

/**
 * General types
 */

export const PeerIdPayload = BasePayload.extend({
  peerId: z.string()
});

export type PeerIdPayloadType = z.infer<typeof PeerIdPayload>;

/**
 * Fund channel
 */

export const FundChannelsPayload = BasePayload.extend({
  peerId: z.string(),
  outgoingAmount: z.string(),
  incomingAmount: z.string()
});

export type FundChannelsPayloadType = z.infer<typeof FundChannelsPayload>;

export const FundChannelsResponse = z.object({
  receipt: z.string()
});

export type FundChannelsResponseType = z.infer<typeof FundChannelsResponse>;

/** Open channel */

export const OpenChannelPayload = BasePayload.extend({
  peerId: z.string(),
  amount: z.string()
});

export type OpenChannelPayloadType = z.infer<typeof OpenChannelPayload>;

export const OpenChannelResponse = z.object({
  channelId: z.string(),
  receipt: z.string()
});

export type OpenChannelResponseType = z.infer<typeof OpenChannelResponse>;

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

export type GetChannelsResponseType = z.infer<typeof GetChannelsResponse>;

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

export type GetChannelTicketsResponseType = z.infer<
  typeof GetChannelTicketsResponse
>;

/** Close channel */

export const CloseChannelPayload = BasePayload.extend({
  peerId: z.string(),
  direction: z.enum(['incoming', 'outgoing'])
});

export type CloseChannelPayloadType = z.infer<typeof CloseChannelPayload>;

export const CloseChannelResponse = z.object({
  receipt: z.string().optional(),
  channelStatus: z.string()
});

export type CloseChannelResponseType = z.infer<typeof CloseChannelResponse>;

/** Get channel */

export const GetChannelPayload = BasePayload.extend({
  peerId: z.string(),
  direction: z.enum(['incoming', 'outgoing'])
});

export type GetChannelPayloadType = z.infer<typeof GetChannelPayload>;

export const GetChannelResponse = Channel;

export type GetChannelResponseType = z.infer<typeof GetChannelResponse>;

/** Get channels with full topology */

const TopologyChannel = z.object({
  channelId: z.string(),
  sourcePeerId: z.string(),
  destinationPeerId: z.string(),
  sourceAddress: z.string(),
  destinationAddress: z.string(),
  balance: z.string(),
  status: z.enum(['WaitingForCommitment', 'Open', 'PendingToClose', 'Closed']),
  commitment: z.string(),
  ticketEpoch: z.string(),
  ticketIndex: z.string(),
  channelEpoch: z.string(),
  closureTime: z.string()
});

export const GetChannelsWithFullTopologyResponse = z.object({
  all: z.array(TopologyChannel)
});

export type GetChannelsWithFullTopologyResponseType = z.infer<
  typeof GetChannelsWithFullTopologyResponse
>;
