import { aliasPayloadType } from '../../types/aliases.js';
import 'zod';
import '../../types/general.js';

/**
 * Get the PeerId (Hopr address) that have this alias assigned to it.
 *
 * @param url - The base URL of the server.
 * @param apiKey - The API key to use for authentication.
 * @param body - An object containing the alias to retrieve the peer ID for.
 * @returns A promise that resolves to the peer ID associated with the alias.
 * @throws An error that occurred while processing the request.
 */
declare const getAlias: (url: string, apiKey: string, body: aliasPayloadType) => Promise<string>;

export { getAlias };
