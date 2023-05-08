import { z } from 'zod';
import { ZodToType } from './general';

export const ChannelsFundChannelsPayload = z.object({
  peerId: z.string(),
  outgoingAmount: z.string(),
  incomingAmount: z.string()
});

export type ChannelsFundChannelsPayloadType = ZodToType<
  typeof ChannelsFundChannelsPayload
>;

export const ChannelsFundChannelsResponse = z.object({
  receipt: z.string()
});

export type ChannelsFundChannelsResponseType = ZodToType<
  typeof ChannelsFundChannelsResponse
>;
