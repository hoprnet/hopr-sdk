import { boolean, z } from 'zod';

/**
 * Get statistics
 */

export const GetTicketStatisticsResponse = z.object({
  neglectedValue: z.string(),
  redeemedValue: z.string(),
  rejectedValue: z.string(),
  unredeemedValue: z.string(),
  winningCount: z.number()
});

export type GetTicketStatisticsResponseType = z.infer<
  typeof GetTicketStatisticsResponse
>;

/**
 * Reset statistics
 */

export const ResetTicketStatisticsResponse = z.boolean();

export type ResetTicketStatisticsResponseType = z.infer<
  typeof ResetTicketStatisticsResponse
>;
