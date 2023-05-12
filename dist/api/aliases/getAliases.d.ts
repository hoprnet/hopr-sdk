import { getAliasesResponseType } from '../../types/aliases.js';
import 'zod';
import '../../types/general.js';

/**
 * Get all aliases you set previously and their corresponding peer IDs.
 *
 * @param url - The base URL of the server.
 * @param apiKey - The API key to use for authentication.
 * @returns An object with alias names as keys and the peerId associated with the alias.
 * @throws An error that occurred while processing the request.
 */
declare const getAliases: (url: string, apiKey: string) => Promise<getAliasesResponseType>;

export { getAliases };
