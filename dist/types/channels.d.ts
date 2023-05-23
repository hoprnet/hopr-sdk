import { z } from 'zod';
import { ZodToType } from './general.js';

/**
 * General types
 */
declare const PeerIdPayload: z.ZodObject<{
    url: z.ZodString;
    apiKey: z.ZodString;
    peerId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    url: string;
    apiKey: string;
    peerId: string;
}, {
    url: string;
    apiKey: string;
    peerId: string;
}>;
type PeerIdPayloadType = ZodToType<typeof PeerIdPayload>;
/**
 * Fund channel
 */
declare const FundChannelsPayload: z.ZodObject<{
    url: z.ZodString;
    apiKey: z.ZodString;
    peerId: z.ZodString;
    outgoingAmount: z.ZodString;
    incomingAmount: z.ZodString;
}, "strip", z.ZodTypeAny, {
    url: string;
    apiKey: string;
    peerId: string;
    outgoingAmount: string;
    incomingAmount: string;
}, {
    url: string;
    apiKey: string;
    peerId: string;
    outgoingAmount: string;
    incomingAmount: string;
}>;
type FundChannelsPayloadType = ZodToType<typeof FundChannelsPayload>;
declare const FundChannelsResponse: z.ZodObject<{
    receipt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    receipt: string;
}, {
    receipt: string;
}>;
type FundChannelsResponseType = ZodToType<typeof FundChannelsResponse>;
/** Open channel */
declare const OpenChannelsPayload: z.ZodObject<{
    url: z.ZodString;
    apiKey: z.ZodString;
    peerId: z.ZodString;
    amount: z.ZodString;
}, "strip", z.ZodTypeAny, {
    url: string;
    apiKey: string;
    peerId: string;
    amount: string;
}, {
    url: string;
    apiKey: string;
    peerId: string;
    amount: string;
}>;
type OpenChannelsPayloadType = ZodToType<typeof OpenChannelsPayload>;
declare const OpenChannelsResponse: z.ZodObject<{
    channelId: z.ZodString;
    receipt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    receipt: string;
    channelId: string;
}, {
    receipt: string;
    channelId: string;
}>;
type OpenChannelsResponseType = ZodToType<typeof OpenChannelsResponse>;
/** Get channels */
declare const Channel: z.ZodObject<{
    type: z.ZodEnum<["incoming", "outgoing"]>;
    channelId: z.ZodString;
    peerId: z.ZodString;
    status: z.ZodEnum<["WaitingForCommitment", "Open", "PendingToClose", "Closed"]>;
    balance: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "incoming" | "outgoing";
    status: "WaitingForCommitment" | "Open" | "PendingToClose" | "Closed";
    peerId: string;
    channelId: string;
    balance: string;
}, {
    type: "incoming" | "outgoing";
    status: "WaitingForCommitment" | "Open" | "PendingToClose" | "Closed";
    peerId: string;
    channelId: string;
    balance: string;
}>;
declare const GetChannelsResponse: z.ZodObject<{
    incoming: z.ZodArray<z.ZodObject<{
        type: z.ZodEnum<["incoming", "outgoing"]>;
        channelId: z.ZodString;
        peerId: z.ZodString;
        status: z.ZodEnum<["WaitingForCommitment", "Open", "PendingToClose", "Closed"]>;
        balance: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "incoming" | "outgoing";
        status: "WaitingForCommitment" | "Open" | "PendingToClose" | "Closed";
        peerId: string;
        channelId: string;
        balance: string;
    }, {
        type: "incoming" | "outgoing";
        status: "WaitingForCommitment" | "Open" | "PendingToClose" | "Closed";
        peerId: string;
        channelId: string;
        balance: string;
    }>, "many">;
    outgoing: z.ZodArray<z.ZodObject<{
        type: z.ZodEnum<["incoming", "outgoing"]>;
        channelId: z.ZodString;
        peerId: z.ZodString;
        status: z.ZodEnum<["WaitingForCommitment", "Open", "PendingToClose", "Closed"]>;
        balance: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "incoming" | "outgoing";
        status: "WaitingForCommitment" | "Open" | "PendingToClose" | "Closed";
        peerId: string;
        channelId: string;
        balance: string;
    }, {
        type: "incoming" | "outgoing";
        status: "WaitingForCommitment" | "Open" | "PendingToClose" | "Closed";
        peerId: string;
        channelId: string;
        balance: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    incoming: {
        type: "incoming" | "outgoing";
        status: "WaitingForCommitment" | "Open" | "PendingToClose" | "Closed";
        peerId: string;
        channelId: string;
        balance: string;
    }[];
    outgoing: {
        type: "incoming" | "outgoing";
        status: "WaitingForCommitment" | "Open" | "PendingToClose" | "Closed";
        peerId: string;
        channelId: string;
        balance: string;
    }[];
}, {
    incoming: {
        type: "incoming" | "outgoing";
        status: "WaitingForCommitment" | "Open" | "PendingToClose" | "Closed";
        peerId: string;
        channelId: string;
        balance: string;
    }[];
    outgoing: {
        type: "incoming" | "outgoing";
        status: "WaitingForCommitment" | "Open" | "PendingToClose" | "Closed";
        peerId: string;
        channelId: string;
        balance: string;
    }[];
}>;
type GetChannelsResponseType = ZodToType<typeof GetChannelsResponse>;
/** Get tickets */
declare const Ticket: z.ZodObject<{
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
}>;
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
/** Close channel */
declare const CloseChannelPayload: z.ZodObject<{
    url: z.ZodString;
    apiKey: z.ZodString;
    peerId: z.ZodString;
    direction: z.ZodEnum<["incoming", "outgoing"]>;
}, "strip", z.ZodTypeAny, {
    url: string;
    apiKey: string;
    peerId: string;
    direction: "incoming" | "outgoing";
}, {
    url: string;
    apiKey: string;
    peerId: string;
    direction: "incoming" | "outgoing";
}>;
type CloseChannelPayloadType = ZodToType<typeof CloseChannelPayload>;
declare const CloseChannelResponse: z.ZodObject<{
    receipt: z.ZodOptional<z.ZodString>;
    channelStatus: z.ZodString;
}, "strip", z.ZodTypeAny, {
    channelStatus: string;
    receipt?: string | undefined;
}, {
    channelStatus: string;
    receipt?: string | undefined;
}>;
type CloseChannelResponseType = ZodToType<typeof CloseChannelResponse>;
/** Get channel */
declare const GetChannelPayload: z.ZodObject<{
    url: z.ZodString;
    apiKey: z.ZodString;
    peerId: z.ZodString;
    direction: z.ZodEnum<["incoming", "outgoing"]>;
}, "strip", z.ZodTypeAny, {
    url: string;
    apiKey: string;
    peerId: string;
    direction: "incoming" | "outgoing";
}, {
    url: string;
    apiKey: string;
    peerId: string;
    direction: "incoming" | "outgoing";
}>;
type GetChannelPayloadType = ZodToType<typeof GetChannelPayload>;
declare const GetChannelResponse: z.ZodObject<{
    type: z.ZodEnum<["incoming", "outgoing"]>;
    channelId: z.ZodString;
    peerId: z.ZodString;
    status: z.ZodEnum<["WaitingForCommitment", "Open", "PendingToClose", "Closed"]>;
    balance: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "incoming" | "outgoing";
    status: "WaitingForCommitment" | "Open" | "PendingToClose" | "Closed";
    peerId: string;
    channelId: string;
    balance: string;
}, {
    type: "incoming" | "outgoing";
    status: "WaitingForCommitment" | "Open" | "PendingToClose" | "Closed";
    peerId: string;
    channelId: string;
    balance: string;
}>;
type GetChannelResponseType = ZodToType<typeof GetChannelResponse>;

export { Channel, CloseChannelPayload, CloseChannelPayloadType, CloseChannelResponse, CloseChannelResponseType, FundChannelsPayload, FundChannelsPayloadType, FundChannelsResponse, FundChannelsResponseType, GetChannelPayload, GetChannelPayloadType, GetChannelResponse, GetChannelResponseType, GetChannelsResponse, GetChannelsResponseType, GetTicketsResponse, GetTicketsResponseType, OpenChannelsPayload, OpenChannelsPayloadType, OpenChannelsResponse, OpenChannelsResponseType, PeerIdPayload, PeerIdPayloadType, Ticket };
