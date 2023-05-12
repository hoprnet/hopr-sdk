import { z } from "zod";
const GetStatisticsResponse = z.object({
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
const GetTicketsResponse = z.object({
  counterparty: z.string(),
  challenge: z.string(),
  epoch: z.string(),
  index: z.string(),
  amount: z.string(),
  winProb: z.string(),
  channelEpoch: z.string(),
  signature: z.string()
}).array();
export {
  GetStatisticsResponse,
  GetTicketsResponse
};
