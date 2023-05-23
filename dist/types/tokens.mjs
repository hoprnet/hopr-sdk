import z from "zod";
import { BasicAuthenticationPayload } from "./general";
const VALUES = [
  // Account
  "accountWithdraw",
  "accountGetBalances",
  "accountGetAddresses",
  // Aliases
  "aliasesGetAliases",
  "aliasesSetAlias",
  "aliasesGetAlias",
  "aliasesRemoveAlias",
  // Channels
  "channelsFundChannels",
  "channelsOpenChannel",
  "channelsGetChannels",
  "channelsRedeemTickets",
  "channelsGetTickets",
  "channelsGetChannel",
  "channelsCloseChannel",
  // Messages
  "messagesWebsocket",
  "messagesSign",
  "messagesSendMessage",
  // Node
  "nodeGetVersion",
  "nodePing",
  "nodeGetPeers",
  "nodeGetMetrics",
  "nodeGetInfo",
  "nodeGetEntryNodes",
  // PeerId
  "peerInfoGetPeerInfo",
  // Settings
  "settingsGetSettings",
  "settingsSetSetting",
  // Tickets
  "ticketsGetStatistics",
  "ticketsRedeemTickets",
  "ticketsGetTickets",
  // Tokens
  "tokensCreate",
  "tokensGetToken",
  "tokensDelete"
];
const TokenCapability = z.object({
  endpoint: z.enum(VALUES),
  limits: z.array(
    z.object({
      type: z.string(),
      conditions: z.object({ max: z.number().optional() }).optional(),
      used: z.number().optional()
    })
  )
});
const CreateTokenPayload = BasicAuthenticationPayload.extend({
  capabilities: z.array(TokenCapability),
  lifetime: z.number().nonnegative(),
  description: z.string()
});
const CreateTokenResponse = z.object({
  token: z.string()
});
const GetTokenResponse = z.object({
  id: z.string(),
  description: z.string().optional(),
  capabilities: z.array(TokenCapability),
  valid_until: z.number().optional()
});
const DeleteTokenPayload = BasicAuthenticationPayload.extend({
  id: z.string()
});
export {
  CreateTokenPayload,
  CreateTokenResponse,
  DeleteTokenPayload,
  GetTokenResponse,
  TokenCapability
};
