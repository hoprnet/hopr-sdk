import { z } from 'zod';

/**
 * Get statistics
 */

export const GetStatisticsResponse = z.object({
  unredeemed: z.number(),
  unredeemedValue: z.string(),
  redeemed: z.number(),
  redeemedValue: z.string(),
  losingTickets: z.number(),
  winProportion: z.number(),
  neglected: z.number(),
  neglectedValue: z.string(),
  rejected: z.number(),
  rejectedValue: z.string()
});

export type GetStatisticsResponseType = z.infer<typeof GetStatisticsResponse>;

/**
 * Get tickets
 */

export const GetTicketsResponse = z
  .object({
    channelId: z.string(),
    amount: z.string(),
    index: z.number(),
    indexOffset: z.number(),
    channelEpoch: z.number(),
    winProb: z.string(),
    signature: z.string()
  })
  .array();

export type GetTicketsResponseType = z.infer<typeof GetTicketsResponse>;
