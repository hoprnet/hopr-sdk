import { accountResponseType } from '../../types/account.js';
import 'zod';
import '../../types/general.js';

/**
 * Fetches the HOPR and native balances of the node.
 *
 * @param url - The URL of the API endpoint.
 * @param apiKey - The API key to be used for authentication.
 * @returns A Promise that resolves with an object containing the HOPR and native balances.
 * @throws An error that occurred while processing the request.
 */
declare const getBalances: (url: string, apiKey: string) => Promise<accountResponseType>;

export { getBalances };
