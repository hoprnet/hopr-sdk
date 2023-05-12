import { z } from 'zod';
import { ZodToType } from './general.js';

/**
 * Get statistics
 */
declare const GetStatisticsResponse: z.ZodObject<{
    pending: z.ZodNumber;
    unredeemed: z.ZodNumber;
    unredeemedValue: z.ZodString;
    redeemed: z.ZodNumber;
    redeemedValue: z.ZodString;
    losingTickets: z.ZodNumber;
    winProportion: z.ZodNumber;
    neglected: z.ZodNumber;
    rejected: z.ZodNumber;
    rejectedValue: z.ZodString;
}, "strip", z.ZodTypeAny, {
    pending: number;
    unredeemed: number;
    unredeemedValue: string;
    redeemed: number;
    redeemedValue: string;
    losingTickets: number;
    winProportion: number;
    neglected: number;
    rejected: number;
    rejectedValue: string;
}, {
    pending: number;
    unredeemed: number;
    unredeemedValue: string;
    redeemed: number;
    redeemedValue: string;
    losingTickets: number;
    winProportion: number;
    neglected: number;
    rejected: number;
    rejectedValue: string;
}>;
type GetStatisticsResponseType = ZodToType<typeof GetStatisticsResponse>;
/**
 * Get tickets
 */
declare const GetTicketsResponse: z.ZodArray<z.ZodObject<{
    counterparty: z.ZodString;
    challenge: z.ZodString;
    epoch: z.ZodString;
    index: z.ZodString;
    amount: z.ZodString;
    winProb: z.ZodString;
    channelEpoch: z.ZodString;
    signature: z.ZodString;
}, "strip", z.ZodTypeAny, {
    amount: string;
    counterparty: string;
    challenge: string;
    epoch: string;
    index: string;
    winProb: string;
    channelEpoch: string;
    signature: string;
}, {
    amount: string;
    counterparty: string;
    challenge: string;
    epoch: string;
    index: string;
    winProb: string;
    channelEpoch: string;
    signature: string;
}>, "many">;
type GetTicketsResponseType = ZodToType<typeof GetTicketsResponse>;

export { GetStatisticsResponse, GetStatisticsResponseType, GetTicketsResponse, GetTicketsResponseType };
