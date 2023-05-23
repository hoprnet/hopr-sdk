import { BasicAuthenticationPayloadType } from '../../types/general.js';
import { GetTokenResponseType } from '../../types/tokens.js';
import 'zod';

/**
 * Get the full token information for the token used in authentication.
 *
 * @param url - The URL of the API endpoint.
 * @param apiKey - The API key to be used for authentication.
 * @returns A Promise that resolves to an object with the token info.
 * @throws An error that occurred while processing the request.
 */
declare const getToken: (payload: BasicAuthenticationPayloadType) => Promise<GetTokenResponseType>;

export { getToken };
