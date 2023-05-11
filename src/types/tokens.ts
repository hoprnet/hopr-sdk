import z from 'zod';
import { ZodToType } from './general';

/**
 * GENERAL
 */

// source: https://github.com/hoprnet/hoprnet/blob/7dad5fb60911c8e1a8b9c758caf8575681877227/packages/hoprd/src/api/token.ts#L17

const VALUES = [
  // Account
  'accountWithdraw',
  'accountGetBalances',
  'accountGetAddresses',
  // Aliases
  'aliasesGetAliases',
  'aliasesSetAlias',
  'aliasesGetAlias',
  'aliasesRemoveAlias',
  // Channels
  'channelsFundChannels',
  'channelsOpenChannel',
  'channelsGetChannels',
  'channelsRedeemTickets',
  'channelsGetTickets',
  'channelsGetChannel',
  'channelsCloseChannel',
  // Messages
  'messagesWebsocket',
  'messagesSign',
  'messagesSendMessage',
  // Node
  'nodeGetVersion',
  'nodePing',
  'nodeGetPeers',
  'nodeGetMetrics',
  'nodeGetInfo',
  'nodeGetEntryNodes',
  // PeerId
  'peerInfoGetPeerInfo',
  // Settings
  'settingsGetSettings',
  'settingsSetSetting',
  // Tickets
  'ticketsGetStatistics',
  'ticketsRedeemTickets',
  'ticketsGetTickets',
  // Tokens
  'tokensCreate',
  'tokensGetToken',
  'tokensDelete'
] as const;

export const TokenCapability = z.object({
  endpoint: z.enum(VALUES),
  limits: z.array(
    z.object({
      type: z.string(),
      conditions: z.object({ max: z.number().optional() }).optional(),
      used: z.number().optional()
    })
  )
});

/**
 * createToken
 */

export const createPayload = z.object({
  capabilities: z.array(TokenCapability),
  lifetime: z.number().nonnegative(),
  description: z.string()
});

export type createPayloadType = ZodToType<typeof createPayload>;

export const createResponse = z.object({
  token: z.string()
});

export type createResponseType = ZodToType<typeof createResponse>;

/**
 * getToken
 */

export const getTokenResponse = z.object({
  id: z.string(),
  description: z.string().optional(),
  capabilities: z.array(TokenCapability),
  valid_until: z.number().optional()
});

export type getTokenResponseType = ZodToType<typeof getTokenResponse>;

/**
 * deteleToken
 */

export const deletePayload = z.object({ id: z.string() });

export type deletePayloadType = ZodToType<typeof deletePayload>;
