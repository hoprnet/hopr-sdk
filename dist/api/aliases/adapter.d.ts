import { SetAliasPayloadType, AliasPayloadType } from '../../types/aliases.js';
import { RemoveBasicAuthenticationPayloadType } from '../../types/general.js';
import 'zod';

/**
 * A class that provides a wrapper around aliases-related API endpoints.
 */
declare class AliasesAdapter {
    private url;
    private apiKey;
    /**
     * Creates a new instance of the `AliasesAdapter` class.
     * @param url - The URL of the API server.
     * @param apiKey - The API key to use for authentication.
     */
    constructor(url: string, apiKey: string);
    /**
     * Get all aliases you set previously and their corresponding peer IDs.
     *
     * @returns An object with alias names as keys and the peerId associated with the alias.
     */
    getAliases(): Promise<Record<string, string>>;
    /**
     * Instead of using HOPR address, we can assign HOPR address to a specific name called alias.
     * Give an address a more memorable alias and use it instead of Hopr address.
     * Aliases are kept locally and are not saved or shared on the network.
     *
     * @param payload - A object containing the peer ID and alias to link.
     * @returns A Promise that resolves to true if alias succesfully linked to peerId.
     */
    setAlias(payload: RemoveBasicAuthenticationPayloadType<SetAliasPayloadType>): Promise<boolean>;
    /**
     * Get the PeerId (Hopr address) that have this alias assigned to it.
     *
     * @param payload - An object containing the alias to retrieve the peer ID for.
     * @returns A promise that resolves to the peer ID associated with the alias.
     */
    getAlias(payload: RemoveBasicAuthenticationPayloadType<AliasPayloadType>): Promise<string>;
    /**
     * Unassign an alias from a PeerId.
     *
     * @param payload - The payload containing the details of the alias to remove.
     * @returns A Promise that resolves to true if the alias was successfully removed.
     */
    removeAlias(payload: RemoveBasicAuthenticationPayloadType<AliasPayloadType>): Promise<boolean>;
}

export { AliasesAdapter };
