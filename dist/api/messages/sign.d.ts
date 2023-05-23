import { SignPayloadType } from '../../types/messages.js';
import 'zod';
import '../../types/general.js';

/**
 * Signs a message given using the node’s private key. Prefixes messsage with “HOPR Signed Message: ” before signing.
 *
 * @param url - The base URL for the API.
 * @param apiKey - The API key to use for authentication.
 * @param message - The message to sign.
 * @returns A Promise that resolves to a string representing the signature.
 * @throws An error that occurred while processing the request.
 */
declare const sign: (payload: SignPayloadType) => Promise<string>;

export { sign };
