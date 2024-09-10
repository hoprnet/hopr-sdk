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
