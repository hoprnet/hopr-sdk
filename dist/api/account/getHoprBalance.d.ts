import { BasicAuthenticationPayloadType } from '../../types/general.js';
import 'zod';

/**
 * Get the HOPR balance of the node.
 *
 * @param url - The URL of the API endpoint.
 * @param apiKey - The API key to be used for authentication.
 * @returns A Promise that resolves to a string representing the HOPR balance.
 * @throws An error that occurred while processing the request.
 */
declare const getHoprBalance: (payload: BasicAuthenticationPayloadType) => Promise<string>;

export { getHoprBalance };
