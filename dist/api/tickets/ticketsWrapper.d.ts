declare class TicketsWrapper {
    private url;
    private apiKey;
    constructor(url: string, apiKey: string);
    getStatistics(): Promise<{
        pending: number;
        unredeemed: number;
        unredeemedValue: string;
        redeemed: number;
        redeemedValue: string;
        losingTickets: number;
        winProportion: number;
        neglected: number;
        rejected: number;
        rejectedValue: string;
    }>;
    getTickets(): Promise<{
        amount: string;
        counterparty: string;
        challenge: string;
        epoch: string;
        index: string;
        winProb: string;
        channelEpoch: string;
        signature: string;
    }[]>;
    redeemTickets(): Promise<boolean>;
}

export { TicketsWrapper };
