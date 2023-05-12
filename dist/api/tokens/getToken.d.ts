import { getTokenResponseType } from '../../types/tokens.js';
import 'zod';
import '../../types/general.js';

/**
 * Get the full token information for the token used in authentication.
 *
 * @param url - The URL of the API endpoint.
 * @param apiKey - The API key to be used for authentication.
 * @returns A Promise that resolves to an object with the token info.
 * @throws An error that occurred while processing the request.
 */
declare const getToken: (url: string, apiKey: string) => Promise<getTokenResponseType>;

export { getToken };
