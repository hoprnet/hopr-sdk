import { string, z } from 'zod';
import { BasePayload } from './general';

/**
 * Get network price
 */

export const GetTicketPricePayload = BasePayload;

export type GetTicketPricePayloadType = z.infer<typeof GetTicketPricePayload>;

export const GetTicketPriceResponse = z.object({
  price: z.string()
});

export type GetTicketPriceResponseType = z.infer<typeof GetTicketPriceResponse>;

/**
 * Get minimum network probability
 */

export const GetMinimumNetworkProbabilityPayload = BasePayload;

export type GetMinimumNetworkProbabilityPayloadType = z.infer<
  typeof GetMinimumNetworkProbabilityPayload
>;

export const GetMinimumNetworkProbabilityResponse = z.object({
  probability: z.number()
});

export type GetMinimumNetworkProbabilityResponseType = z.infer<
  typeof GetMinimumNetworkProbabilityResponse
>;
