import { WithdrawPayloadType } from '../../types/account.js';
import 'zod';
import '../../types/general.js';

/**
 * Withdraw the given currency amount to the specified recipient address.
 *
 * @param url - The API endpoint URL.
 * @param apiKey - The API key used to authenticate the request.
 * @param body - The necessary data to withdraw from a node;
 * @returns A Promise that resolves to the transaction receipt.
 * @throws An error that occurred while processing the request.
 */
declare const withdraw: (payload: WithdrawPayloadType) => Promise<string>;

export { withdraw };
