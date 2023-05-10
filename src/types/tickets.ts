import { z } from 'zod';
import { ZodToType } from './general';

/**
 * Get statistics
 */

export const GetStatisticsResponse = z.object({
  pending: z.number(),
  unredeemed: z.number(),
  unredeemedValue: z.string(),
  redeemed: z.number(),
  redeemedValue: z.string(),
  losingTickets: z.number(),
  winProportion: z.number(),
  neglected: z.number(),
  rejected: z.number(),
  rejectedValue: z.string()
});

export type GetStatisticsResponseType = ZodToType<typeof GetStatisticsResponse>;

/**
 * Get tickets
 */

export const GetTicketsResponse = z
  .object({
    counterparty: z.string(),
    challenge: z.string(),
    epoch: z.string(),
    index: z.string(),
    amount: z.string(),
    winProb: z.string(),
    channelEpoch: z.string(),
    signature: z.string()
  })
  .array();

export type GetTicketsResponseType = ZodToType<typeof GetTicketsResponse>;
