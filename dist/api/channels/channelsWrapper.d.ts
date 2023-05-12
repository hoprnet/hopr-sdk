import { CloseChannelPayloadType, FundChannelsPayloadType, GetChannelPayloadType, OpenChannelsPayloadType, PeerIdPayloadType } from '../../types/channels.js';
import 'zod';
import '../../types/general.js';

declare class ChannelsWrapper {
    private url;
    private apiKey;
    constructor(url: string, apiKey: string);
    closeChannel(body: CloseChannelPayloadType): Promise<{
        channelStatus: string;
        receipt?: string | undefined;
    }>;
    fundChannels(body: FundChannelsPayloadType): Promise<{
        receipt: string;
    }>;
    getChannels(): Promise<{
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
    getChannel(body: GetChannelPayloadType): Promise<{
        type: "incoming" | "outgoing";
        status: "WaitingForCommitment" | "Open" | "PendingToClose" | "Closed";
        peerId: string;
        channelId: string;
        balance: string;
    }>;
    openChannels(body: OpenChannelsPayloadType): Promise<{
        receipt: string;
        channelId: string;
    }>;
    getChannelTickets(body: PeerIdPayloadType): Promise<{
        amount: string;
        counterparty: string;
        challenge: string;
        epoch: string;
        index: string;
        winProb: string;
        channelEpoch: string;
        signature: string;
    }[]>;
    redeemChannelTickets(body: PeerIdPayloadType): Promise<boolean>;
}

export { ChannelsWrapper };
