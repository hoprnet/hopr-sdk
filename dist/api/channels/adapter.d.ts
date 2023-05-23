import { RemoveBasicAuthenticationPayloadType } from '../../types/general.js';
import { CloseChannelPayloadType, FundChannelsPayloadType, GetChannelPayloadType, OpenChannelsPayloadType, PeerIdPayloadType } from '../../types/channels.js';
import 'zod';

declare class ChannelsAdapter {
    private url;
    private apiKey;
    constructor(url: string, apiKey: string);
    closeChannel(payload: RemoveBasicAuthenticationPayloadType<CloseChannelPayloadType>): Promise<{
        channelStatus: string;
        receipt?: string | undefined;
    }>;
    fundChannels(payload: RemoveBasicAuthenticationPayloadType<FundChannelsPayloadType>): Promise<{
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
    getChannel(payload: RemoveBasicAuthenticationPayloadType<GetChannelPayloadType>): Promise<{
        type: "incoming" | "outgoing";
        status: "WaitingForCommitment" | "Open" | "PendingToClose" | "Closed";
        peerId: string;
        channelId: string;
        balance: string;
    }>;
    openChannels(payload: RemoveBasicAuthenticationPayloadType<OpenChannelsPayloadType>): Promise<{
        receipt: string;
        channelId: string;
    }>;
    getChannelTickets(payload: RemoveBasicAuthenticationPayloadType<PeerIdPayloadType>): Promise<{
        amount: string;
        counterparty: string;
        challenge: string;
        epoch: string;
        index: string;
        winProb: string;
        channelEpoch: string;
        signature: string;
    }[]>;
    redeemChannelTickets(payload: RemoveBasicAuthenticationPayloadType<PeerIdPayloadType>): Promise<boolean>;
}

export { ChannelsAdapter };
