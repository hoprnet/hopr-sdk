import z from 'zod';
import { BasePayload } from './general';

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
  'nodeStreamWebsocket',
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
      conditions: z.object({ max: z.number().optional() }).optional()
    })
  )
});

/**
 * createToken
 */

export const CreateTokenPayload = BasePayload.extend({
  capabilities: z.array(TokenCapability),
  lifetime: z.number().nonnegative(),
  description: z.string()
});

export type CreateTokenPayloadType = z.infer<typeof CreateTokenPayload>;

export const CreateTokenResponse = z.object({
  token: z.string()
});

export type CreateTokenResponseType = z.infer<typeof CreateTokenResponse>;

/**
 * getToken
 */

export const GetTokenResponse = z.object({
  id: z.string(),
  description: z.string().optional(),
  capabilities: z.array(TokenCapability)
});

export type GetTokenResponseType = z.infer<typeof GetTokenResponse>;

/**
 * deleteToken
 */

export const DeleteTokenPayload = BasePayload.extend({
  id: z.string()
});

export type DeleteTokenPayloadType = z.infer<typeof DeleteTokenPayload>;
