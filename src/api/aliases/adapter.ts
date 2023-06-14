import {
  AliasPayloadType,
  RemoveBasicAuthenticationPayloadType,
  SetAliasPayloadType
} from '../../types';
import { createLogger } from '../../utils';
import { getAlias } from './getAlias';
import { getAliases } from './getAliases';
import { removeAlias } from './removeAlias';
import { setAlias } from './setAlias';

const log = createLogger('aliases');

/**
 * A class that provides a wrapper around aliases-related API endpoints.
 */
export class AliasesAdapter {
  private apiEndpoint: string;
  private apiToken: string;
  private timeout: number | undefined;

  /**
   * Creates a new instance of the `AliasesAdapter` class.
   * @param apiEndpoint - The API endpoint of the API server.
   * @param apiToken - The API token to use for authentication.
   */
  constructor({
    apiEndpoint,
    apiToken,
    timeout
  }: {
    apiEndpoint: string;
    apiToken: string;
    timeout?: number;
  }) {
    this.apiEndpoint = apiEndpoint;
    this.apiToken = apiToken;
    this.timeout = timeout;
  }

  /**
   * Get all aliases you set previously and their corresponding peer IDs.
   *
   * @returns An object with alias names as keys and the peerId associated with the alias.
   */
  public async getAliases(): Promise<Record<string, string> | undefined> {
    return getAliases({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: this.timeout
    });
  }

  /**
   * Instead of using HOPR address, we can assign HOPR address to a specific name called alias.
   * Give an address a more memorable alias and use it instead of Hopr address.
   * Aliases are kept locally and are not saved or shared on the network.
   *
   * @param payload - A object containing the peer ID and alias to link.
   * @returns A Promise that resolves to true if alias succesfully linked to peerId.
   */
  public async setAlias(
    payload: RemoveBasicAuthenticationPayloadType<SetAliasPayloadType>
  ): Promise<boolean | undefined> {
    return setAlias({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: this.timeout,
      alias: payload.alias,
      peerId: payload.peerId
    });
  }

  /**
   * Get the PeerId (Hopr address) that have this alias assigned to it.
   *
   * @param payload - An object containing the alias to retrieve the peer ID for.
   * @returns A promise that resolves to the peer ID associated with the alias.
   */
  public async getAlias(
    payload: RemoveBasicAuthenticationPayloadType<AliasPayloadType>
  ): Promise<string | undefined> {
    return getAlias({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: this.timeout,
      alias: payload.alias
    });
  }

  /**
   * Unassign an alias from a PeerId.
   *
   * @param payload - The payload containing the details of the alias to remove.
   * @returns A Promise that resolves to true if the alias was successfully removed.
   */
  public async removeAlias(
    payload: RemoveBasicAuthenticationPayloadType<AliasPayloadType>
  ): Promise<boolean | undefined> {
    return removeAlias({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: this.timeout,
      alias: payload.alias
    });
  }
}
