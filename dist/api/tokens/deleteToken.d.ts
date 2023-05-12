import { deletePayloadType } from '../../types/tokens.js';
import 'zod';
import '../../types/general.js';

/**
 * Deletes a token. Can only be done before the lifetime expired.
 * After the lifetime expired the token is automatically deleted.
 *
 * @param url - The URL of the API endpoint.
 * @param apiKey - The API key to be used for authentication.
 * @returns A Promise that resolves to true if successful.
 * @throws An error that occurred while processing the request.
 */
declare const deleteToken: (url: string, apiKey: string, body: deletePayloadType) => Promise<boolean>;

export { deleteToken };
