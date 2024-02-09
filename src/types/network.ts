import { string, z } from 'zod';
import { BasePayload } from './general';

/**
 * Get network price
 */

export const GetNetworkPricePayload = BasePayload;

export type GetNetworkPricePayloadType = z.infer<typeof GetNetworkPricePayload>;

export const GetNetworkPriceResponse = z.object({
  price: z.string()
});

export type GetNetworkPriceResponseType = z.infer<
  typeof GetNetworkPriceResponse
>;
