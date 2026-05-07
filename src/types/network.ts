import { string, z } from 'zod';
import { BasePayload } from './general';

/**
 * Get announced peers
 */

export const GetAnnouncedResponse = z.array(
  z.object({
    address: z.string(),
    multiaddrs: z.array(z.string()),
    origin: z.enum(['chain', 'dht'])
  })
);

export type GetAnnouncedResponseType = z.infer<typeof GetAnnouncedResponse>;

/**
 * Get connected peers
 */

export const GetConnectedResponse = z.array(
  z.object({
    address: z.string(),
    probeRate: z.number(),
    lastUpdate: z.number(),
    score: z.number(),
    averageLatency: z.number().nullable().optional()
  })
);

export type GetConnectedResponseType = z.infer<typeof GetConnectedResponse>;

/**
 * Get network graph
 */

export const GetNetworkGraphResponse = z.string();

export type GetNetworkGraphResponseType = z.infer<
  typeof GetNetworkGraphResponse
>;

export const GetNetworkGraphPayload = BasePayload.extend({
  reachableOnly: z.boolean().optional()
});

export type GetNetworkGraphPayloadType = z.infer<typeof GetNetworkGraphPayload>;

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
