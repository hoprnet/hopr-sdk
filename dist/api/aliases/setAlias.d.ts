import { setAliasPayloadType } from '../../types/aliases.js';
import 'zod';
import '../../types/general.js';

/**
 * Instead of using HOPR address, we can assign HOPR address to a specific name called alias.
 * Give an address a more memorable alias and use it instead of Hopr address.
 * Aliases are kept locally and are not saved or shared on the network.
 *
 * @param url - The base URL of the server.
 * @param apiKey - The API key to be used for authentication.
 * @param body - A object containing the peer ID and alias to link.
 * @returns A Promise that resolves to true if alias succesfully linked to peerId.
 * @throws An error that occurred while processing the request.
 */
declare const setAlias: (url: string, apiKey: string, body: setAliasPayloadType) => Promise<boolean>;

export { setAlias };
