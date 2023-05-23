import z from 'zod';
import { ZodToType } from './general.js';

declare const TokenCapability: z.ZodObject<{
    endpoint: z.ZodEnum<["accountWithdraw", "accountGetBalances", "accountGetAddresses", "aliasesGetAliases", "aliasesSetAlias", "aliasesGetAlias", "aliasesRemoveAlias", "channelsFundChannels", "channelsOpenChannel", "channelsGetChannels", "channelsRedeemTickets", "channelsGetTickets", "channelsGetChannel", "channelsCloseChannel", "messagesWebsocket", "messagesSign", "messagesSendMessage", "nodeGetVersion", "nodePing", "nodeGetPeers", "nodeGetMetrics", "nodeGetInfo", "nodeGetEntryNodes", "peerInfoGetPeerInfo", "settingsGetSettings", "settingsSetSetting", "ticketsGetStatistics", "ticketsRedeemTickets", "ticketsGetTickets", "tokensCreate", "tokensGetToken", "tokensDelete"]>;
    limits: z.ZodArray<z.ZodObject<{
        type: z.ZodString;
        conditions: z.ZodOptional<z.ZodObject<{
            max: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            max?: number | undefined;
        }, {
            max?: number | undefined;
        }>>;
        used: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        type: string;
        conditions?: {
            max?: number | undefined;
        } | undefined;
        used?: number | undefined;
    }, {
        type: string;
        conditions?: {
            max?: number | undefined;
        } | undefined;
        used?: number | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    endpoint: "accountWithdraw" | "accountGetBalances" | "accountGetAddresses" | "aliasesGetAliases" | "aliasesSetAlias" | "aliasesGetAlias" | "aliasesRemoveAlias" | "channelsFundChannels" | "channelsOpenChannel" | "channelsGetChannels" | "channelsRedeemTickets" | "channelsGetTickets" | "channelsGetChannel" | "channelsCloseChannel" | "messagesWebsocket" | "messagesSign" | "messagesSendMessage" | "nodeGetVersion" | "nodePing" | "nodeGetPeers" | "nodeGetMetrics" | "nodeGetInfo" | "nodeGetEntryNodes" | "peerInfoGetPeerInfo" | "settingsGetSettings" | "settingsSetSetting" | "ticketsGetStatistics" | "ticketsRedeemTickets" | "ticketsGetTickets" | "tokensCreate" | "tokensGetToken" | "tokensDelete";
    limits: {
        type: string;
        conditions?: {
            max?: number | undefined;
        } | undefined;
        used?: number | undefined;
    }[];
}, {
    endpoint: "accountWithdraw" | "accountGetBalances" | "accountGetAddresses" | "aliasesGetAliases" | "aliasesSetAlias" | "aliasesGetAlias" | "aliasesRemoveAlias" | "channelsFundChannels" | "channelsOpenChannel" | "channelsGetChannels" | "channelsRedeemTickets" | "channelsGetTickets" | "channelsGetChannel" | "channelsCloseChannel" | "messagesWebsocket" | "messagesSign" | "messagesSendMessage" | "nodeGetVersion" | "nodePing" | "nodeGetPeers" | "nodeGetMetrics" | "nodeGetInfo" | "nodeGetEntryNodes" | "peerInfoGetPeerInfo" | "settingsGetSettings" | "settingsSetSetting" | "ticketsGetStatistics" | "ticketsRedeemTickets" | "ticketsGetTickets" | "tokensCreate" | "tokensGetToken" | "tokensDelete";
    limits: {
        type: string;
        conditions?: {
            max?: number | undefined;
        } | undefined;
        used?: number | undefined;
    }[];
}>;
/**
 * createToken
 */
declare const CreateTokenPayload: z.ZodObject<{
    url: z.ZodString;
    apiKey: z.ZodString;
    capabilities: z.ZodArray<z.ZodObject<{
        endpoint: z.ZodEnum<["accountWithdraw", "accountGetBalances", "accountGetAddresses", "aliasesGetAliases", "aliasesSetAlias", "aliasesGetAlias", "aliasesRemoveAlias", "channelsFundChannels", "channelsOpenChannel", "channelsGetChannels", "channelsRedeemTickets", "channelsGetTickets", "channelsGetChannel", "channelsCloseChannel", "messagesWebsocket", "messagesSign", "messagesSendMessage", "nodeGetVersion", "nodePing", "nodeGetPeers", "nodeGetMetrics", "nodeGetInfo", "nodeGetEntryNodes", "peerInfoGetPeerInfo", "settingsGetSettings", "settingsSetSetting", "ticketsGetStatistics", "ticketsRedeemTickets", "ticketsGetTickets", "tokensCreate", "tokensGetToken", "tokensDelete"]>;
        limits: z.ZodArray<z.ZodObject<{
            type: z.ZodString;
            conditions: z.ZodOptional<z.ZodObject<{
                max: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                max?: number | undefined;
            }, {
                max?: number | undefined;
            }>>;
            used: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            type: string;
            conditions?: {
                max?: number | undefined;
            } | undefined;
            used?: number | undefined;
        }, {
            type: string;
            conditions?: {
                max?: number | undefined;
            } | undefined;
            used?: number | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        endpoint: "accountWithdraw" | "accountGetBalances" | "accountGetAddresses" | "aliasesGetAliases" | "aliasesSetAlias" | "aliasesGetAlias" | "aliasesRemoveAlias" | "channelsFundChannels" | "channelsOpenChannel" | "channelsGetChannels" | "channelsRedeemTickets" | "channelsGetTickets" | "channelsGetChannel" | "channelsCloseChannel" | "messagesWebsocket" | "messagesSign" | "messagesSendMessage" | "nodeGetVersion" | "nodePing" | "nodeGetPeers" | "nodeGetMetrics" | "nodeGetInfo" | "nodeGetEntryNodes" | "peerInfoGetPeerInfo" | "settingsGetSettings" | "settingsSetSetting" | "ticketsGetStatistics" | "ticketsRedeemTickets" | "ticketsGetTickets" | "tokensCreate" | "tokensGetToken" | "tokensDelete";
        limits: {
            type: string;
            conditions?: {
                max?: number | undefined;
            } | undefined;
            used?: number | undefined;
        }[];
    }, {
        endpoint: "accountWithdraw" | "accountGetBalances" | "accountGetAddresses" | "aliasesGetAliases" | "aliasesSetAlias" | "aliasesGetAlias" | "aliasesRemoveAlias" | "channelsFundChannels" | "channelsOpenChannel" | "channelsGetChannels" | "channelsRedeemTickets" | "channelsGetTickets" | "channelsGetChannel" | "channelsCloseChannel" | "messagesWebsocket" | "messagesSign" | "messagesSendMessage" | "nodeGetVersion" | "nodePing" | "nodeGetPeers" | "nodeGetMetrics" | "nodeGetInfo" | "nodeGetEntryNodes" | "peerInfoGetPeerInfo" | "settingsGetSettings" | "settingsSetSetting" | "ticketsGetStatistics" | "ticketsRedeemTickets" | "ticketsGetTickets" | "tokensCreate" | "tokensGetToken" | "tokensDelete";
        limits: {
            type: string;
            conditions?: {
                max?: number | undefined;
            } | undefined;
            used?: number | undefined;
        }[];
    }>, "many">;
    lifetime: z.ZodNumber;
    description: z.ZodString;
}, "strip", z.ZodTypeAny, {
    url: string;
    apiKey: string;
    capabilities: {
        endpoint: "accountWithdraw" | "accountGetBalances" | "accountGetAddresses" | "aliasesGetAliases" | "aliasesSetAlias" | "aliasesGetAlias" | "aliasesRemoveAlias" | "channelsFundChannels" | "channelsOpenChannel" | "channelsGetChannels" | "channelsRedeemTickets" | "channelsGetTickets" | "channelsGetChannel" | "channelsCloseChannel" | "messagesWebsocket" | "messagesSign" | "messagesSendMessage" | "nodeGetVersion" | "nodePing" | "nodeGetPeers" | "nodeGetMetrics" | "nodeGetInfo" | "nodeGetEntryNodes" | "peerInfoGetPeerInfo" | "settingsGetSettings" | "settingsSetSetting" | "ticketsGetStatistics" | "ticketsRedeemTickets" | "ticketsGetTickets" | "tokensCreate" | "tokensGetToken" | "tokensDelete";
        limits: {
            type: string;
            conditions?: {
                max?: number | undefined;
            } | undefined;
            used?: number | undefined;
        }[];
    }[];
    lifetime: number;
    description: string;
}, {
    url: string;
    apiKey: string;
    capabilities: {
        endpoint: "accountWithdraw" | "accountGetBalances" | "accountGetAddresses" | "aliasesGetAliases" | "aliasesSetAlias" | "aliasesGetAlias" | "aliasesRemoveAlias" | "channelsFundChannels" | "channelsOpenChannel" | "channelsGetChannels" | "channelsRedeemTickets" | "channelsGetTickets" | "channelsGetChannel" | "channelsCloseChannel" | "messagesWebsocket" | "messagesSign" | "messagesSendMessage" | "nodeGetVersion" | "nodePing" | "nodeGetPeers" | "nodeGetMetrics" | "nodeGetInfo" | "nodeGetEntryNodes" | "peerInfoGetPeerInfo" | "settingsGetSettings" | "settingsSetSetting" | "ticketsGetStatistics" | "ticketsRedeemTickets" | "ticketsGetTickets" | "tokensCreate" | "tokensGetToken" | "tokensDelete";
        limits: {
            type: string;
            conditions?: {
                max?: number | undefined;
            } | undefined;
            used?: number | undefined;
        }[];
    }[];
    lifetime: number;
    description: string;
}>;
type CreateTokenPayloadType = ZodToType<typeof CreateTokenPayload>;
declare const CreateTokenResponse: z.ZodObject<{
    token: z.ZodString;
}, "strip", z.ZodTypeAny, {
    token: string;
}, {
    token: string;
}>;
type CreateTokenResponseType = ZodToType<typeof CreateTokenResponse>;
/**
 * getToken
 */
declare const GetTokenResponse: z.ZodObject<{
    id: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    capabilities: z.ZodArray<z.ZodObject<{
        endpoint: z.ZodEnum<["accountWithdraw", "accountGetBalances", "accountGetAddresses", "aliasesGetAliases", "aliasesSetAlias", "aliasesGetAlias", "aliasesRemoveAlias", "channelsFundChannels", "channelsOpenChannel", "channelsGetChannels", "channelsRedeemTickets", "channelsGetTickets", "channelsGetChannel", "channelsCloseChannel", "messagesWebsocket", "messagesSign", "messagesSendMessage", "nodeGetVersion", "nodePing", "nodeGetPeers", "nodeGetMetrics", "nodeGetInfo", "nodeGetEntryNodes", "peerInfoGetPeerInfo", "settingsGetSettings", "settingsSetSetting", "ticketsGetStatistics", "ticketsRedeemTickets", "ticketsGetTickets", "tokensCreate", "tokensGetToken", "tokensDelete"]>;
        limits: z.ZodArray<z.ZodObject<{
            type: z.ZodString;
            conditions: z.ZodOptional<z.ZodObject<{
                max: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                max?: number | undefined;
            }, {
                max?: number | undefined;
            }>>;
            used: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            type: string;
            conditions?: {
                max?: number | undefined;
            } | undefined;
            used?: number | undefined;
        }, {
            type: string;
            conditions?: {
                max?: number | undefined;
            } | undefined;
            used?: number | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        endpoint: "accountWithdraw" | "accountGetBalances" | "accountGetAddresses" | "aliasesGetAliases" | "aliasesSetAlias" | "aliasesGetAlias" | "aliasesRemoveAlias" | "channelsFundChannels" | "channelsOpenChannel" | "channelsGetChannels" | "channelsRedeemTickets" | "channelsGetTickets" | "channelsGetChannel" | "channelsCloseChannel" | "messagesWebsocket" | "messagesSign" | "messagesSendMessage" | "nodeGetVersion" | "nodePing" | "nodeGetPeers" | "nodeGetMetrics" | "nodeGetInfo" | "nodeGetEntryNodes" | "peerInfoGetPeerInfo" | "settingsGetSettings" | "settingsSetSetting" | "ticketsGetStatistics" | "ticketsRedeemTickets" | "ticketsGetTickets" | "tokensCreate" | "tokensGetToken" | "tokensDelete";
        limits: {
            type: string;
            conditions?: {
                max?: number | undefined;
            } | undefined;
            used?: number | undefined;
        }[];
    }, {
        endpoint: "accountWithdraw" | "accountGetBalances" | "accountGetAddresses" | "aliasesGetAliases" | "aliasesSetAlias" | "aliasesGetAlias" | "aliasesRemoveAlias" | "channelsFundChannels" | "channelsOpenChannel" | "channelsGetChannels" | "channelsRedeemTickets" | "channelsGetTickets" | "channelsGetChannel" | "channelsCloseChannel" | "messagesWebsocket" | "messagesSign" | "messagesSendMessage" | "nodeGetVersion" | "nodePing" | "nodeGetPeers" | "nodeGetMetrics" | "nodeGetInfo" | "nodeGetEntryNodes" | "peerInfoGetPeerInfo" | "settingsGetSettings" | "settingsSetSetting" | "ticketsGetStatistics" | "ticketsRedeemTickets" | "ticketsGetTickets" | "tokensCreate" | "tokensGetToken" | "tokensDelete";
        limits: {
            type: string;
            conditions?: {
                max?: number | undefined;
            } | undefined;
            used?: number | undefined;
        }[];
    }>, "many">;
    valid_until: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    capabilities: {
        endpoint: "accountWithdraw" | "accountGetBalances" | "accountGetAddresses" | "aliasesGetAliases" | "aliasesSetAlias" | "aliasesGetAlias" | "aliasesRemoveAlias" | "channelsFundChannels" | "channelsOpenChannel" | "channelsGetChannels" | "channelsRedeemTickets" | "channelsGetTickets" | "channelsGetChannel" | "channelsCloseChannel" | "messagesWebsocket" | "messagesSign" | "messagesSendMessage" | "nodeGetVersion" | "nodePing" | "nodeGetPeers" | "nodeGetMetrics" | "nodeGetInfo" | "nodeGetEntryNodes" | "peerInfoGetPeerInfo" | "settingsGetSettings" | "settingsSetSetting" | "ticketsGetStatistics" | "ticketsRedeemTickets" | "ticketsGetTickets" | "tokensCreate" | "tokensGetToken" | "tokensDelete";
        limits: {
            type: string;
            conditions?: {
                max?: number | undefined;
            } | undefined;
            used?: number | undefined;
        }[];
    }[];
    id: string;
    description?: string | undefined;
    valid_until?: number | undefined;
}, {
    capabilities: {
        endpoint: "accountWithdraw" | "accountGetBalances" | "accountGetAddresses" | "aliasesGetAliases" | "aliasesSetAlias" | "aliasesGetAlias" | "aliasesRemoveAlias" | "channelsFundChannels" | "channelsOpenChannel" | "channelsGetChannels" | "channelsRedeemTickets" | "channelsGetTickets" | "channelsGetChannel" | "channelsCloseChannel" | "messagesWebsocket" | "messagesSign" | "messagesSendMessage" | "nodeGetVersion" | "nodePing" | "nodeGetPeers" | "nodeGetMetrics" | "nodeGetInfo" | "nodeGetEntryNodes" | "peerInfoGetPeerInfo" | "settingsGetSettings" | "settingsSetSetting" | "ticketsGetStatistics" | "ticketsRedeemTickets" | "ticketsGetTickets" | "tokensCreate" | "tokensGetToken" | "tokensDelete";
        limits: {
            type: string;
            conditions?: {
                max?: number | undefined;
            } | undefined;
            used?: number | undefined;
        }[];
    }[];
    id: string;
    description?: string | undefined;
    valid_until?: number | undefined;
}>;
type GetTokenResponseType = ZodToType<typeof GetTokenResponse>;
/**
 * deleteToken
 */
declare const DeleteTokenPayload: z.ZodObject<{
    url: z.ZodString;
    apiKey: z.ZodString;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    url: string;
    apiKey: string;
    id: string;
}, {
    url: string;
    apiKey: string;
    id: string;
}>;
type DeleteTokenPayloadType = ZodToType<typeof DeleteTokenPayload>;

export { CreateTokenPayload, CreateTokenPayloadType, CreateTokenResponse, CreateTokenResponseType, DeleteTokenPayload, DeleteTokenPayloadType, GetTokenResponse, GetTokenResponseType, TokenCapability };
