import { RemoveBasicAuthenticationPayloadType } from '../../types/general.js';
import { WithdrawPayloadType } from '../../types/account.js';
import 'zod';

/**
 * A class that provides a wrapper around account-related API endpoints.
 */
declare class AccountAdapter {
    private url;
    private apiKey;
    /**
     * Creates a new instance of the `AccountAdapter` class.
     * @param url - The URL of the API server.
     * @param apiKey - The API key to use for authentication.
     */
    constructor(url: string, apiKey: string);
    /**
     * Gets the HOPR and native addresses associated to the node.
     * @returns — A promise that resolves with an object containing the HOPR and native addresses.
     */
    getAddresses(): Promise<{
        hopr: string;
        native: string;
    }>;
    /**
     * Fetches the HOPR and native balances of the node.
     * @returns — A Promise that resolves with an object containing the HOPR and native balances.
     */
    getBalances(): Promise<{
        hopr: string;
        native: string;
    }>;
    /**
     * Gets the HOPR address associated to the node.
     * @returns — A Promise that resolves to the HOPR address.
     */
    getHoprAddress(): Promise<string>;
    /**
     * Gets the HOPR balance associated to the node.
     * @returns — A Promise that resolves to a string representing the HOPR balance.
     */
    getHoprBalance(): Promise<string>;
    /**
     * Gets the native blockchain address associated to the node.
     * @returns — A Promise that resolves to the native address.
     */
    getNativeAddress(): Promise<string>;
    /**
     * Gets the native blockchain balance associated to the node.
     * @returns — A Promise that resolves with a string representing the native balance.
     */
    getNativeBalance(): Promise<string>;
    /**
     * Withdraw the given currency amount to the specified recipient address.
     * @param payload - The withdrawal request payload.
     * @returns — A Promise that resolves to the transaction receipt.
     */
    withdraw(payload: RemoveBasicAuthenticationPayloadType<WithdrawPayloadType>): Promise<string>;
}

export { AccountAdapter };
