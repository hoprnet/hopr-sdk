import { accountResponseType } from '../../types/account.js';
import 'zod';
import '../../types/general.js';

/**
 * Gets the HOPR and native addresses associated to the node.
 *
 * @param url - The URL of the API endpoint.
 * @param apiKey - The API key to be used for authentication.
 * @returns A promise that resolves with an object containing the HOPR and native addresses.
 * @throws An error that occurred while processing the request.
 */
declare const getAddresses: (url: string, apiKey: string) => Promise<accountResponseType>;

export { getAddresses };
