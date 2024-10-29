import { z } from 'zod';
import { BasePayload } from './general';
import { Channel, GetChannelResponseType } from './channels';

/**
 * GetOutgoingChannels
 */
export const GetOutgoingChannelsPayload = BasePayload.extend({
  status: z
    .enum(['Open', 'WaitingForCommitment', 'PendingToClose', 'Closed'])
    .optional()
});

export type GetOutgoingChannelsPayloadType = z.infer<
  typeof GetOutgoingChannelsPayload
>;

/**
 * CashOut
 */
export const CashOutPayload = BasePayload.extend({
  address: z.string()
});

export type CashOutPayloadType = z.infer<typeof CashOutPayload>;

/**
 * OpenMultipleChannels
 */
export const OpenMultipleChannelsPayload = BasePayload.extend({
  peerAddresses: z.array(z.string()),
  amount: z.string()
});

export type OpenMultipleChannelsPayloadType = z.infer<
  typeof OpenMultipleChannelsPayload
>;
