import { z } from 'zod';
import { BasePayload } from './general';

/**
 * Get statistics
 */

export const GetTicketStatisticsResponse = z.object({
  neglectedValue: z.string(),
  redeemedValue: z.string().optional(),
  rejectedValue: z.string(),
  unredeemedValue: z.string(),
  winningCount: z.number()
});

/**
 * Redeem all tickets
 */

export const RedeemAllTicketsPayload = BasePayload.extend({
  address: z.string().nullable().optional()
});

export type RedeemAllTicketsPayloadType = z.infer<
  typeof RedeemAllTicketsPayload
>;

export type GetTicketStatisticsResponseType = z.infer<
  typeof GetTicketStatisticsResponse
>;
