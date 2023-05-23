import { AliasPayloadType } from '../../types/aliases.js';
import 'zod';
import '../../types/general.js';

/**
 * Unassign an alias from a PeerId.
 *
 * @param url - The base URL of the server.
 * @param apiKey - The API key used to authenticate the request.
 * @param body - The payload containing the details of the alias to remove.
 * @returns A Promise that resolves to true if the alias was successfully removed.
 * @throws An error that occurred while processing the request.
 */
declare const removeAlias: (payload: AliasPayloadType) => Promise<boolean>;

export { removeAlias };
