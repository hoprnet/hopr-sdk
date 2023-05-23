import { BasicAuthenticationPayloadType } from '../../types/general.js';
import 'zod';

/**
 * Get the native balance of the node.
 *
 * @param url - The URL of the API endpoint.
 * @param apiKey - The API key to be used for authentication.
 * @returns A Promise that resolves with a string representing the native balance.
 * @throws An error that occurred while processing the request.
 */
declare const getNativeBalance: (payload: BasicAuthenticationPayloadType) => Promise<string>;

export { getNativeBalance };
