import {
  CloseSessionPayloadType,
  GetSessionsPayloadType,
  SetSessionResponseType,
  SetSessionPayloadType,
  GetSessionsResponseType,
  RemoveBasicAuthenticationPayloadType
} from '../../types';
import { createLogger } from '../../utils';
import { getSessions } from './getSessions';
import { setSession } from './setSession';
import { closeSession } from './closeSession';

const log = createLogger('session');

/**
 * A class that provides a wrapper around aliases-related API endpoints.
 */
export class SessionAdapter {
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
   * Set up a new session with specified capabilities and configuration.
   *
   * @returns A promise that resolves to the session configuration response.
   */
  public async setSession(
    payload: RemoveBasicAuthenticationPayloadType<SetSessionPayloadType>
  ): Promise<SetSessionResponseType> {
    return setSession({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: payload?.timeout ?? this.timeout,
      destination: payload.destination,
      capabilities: payload.capabilities,
      listenHost: payload.listenHost,
      path: payload.path,
      target: payload.target,
      protocol: payload.protocol
    });
  }

  /**
   * Get the PeerId (Hopr address) that have this alias assigned to it.
   *
   * @param payload - An object containing the alias to retrieve the peer ID for.
   * @returns A promise that resolves to the peer ID associated with the alias.
   */
  public async getSessions(
    payload: RemoveBasicAuthenticationPayloadType<GetSessionsPayloadType>
  ): Promise<GetSessionsResponseType> {
    return getSessions({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: payload.timeout ?? this.timeout,
      protocol: payload.protocol
    });
  }

  /**
   * Unassign an alias from a PeerId.
   *
   * @param payload - The payload containing the details of the alias to remove.
   * @returns A Promise that resolves to true if the alias was successfully removed.
   */
  public async closeSession(
    payload: RemoveBasicAuthenticationPayloadType<CloseSessionPayloadType>
  ): Promise<boolean> {
    return closeSession({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: payload.timeout ?? this.timeout,
      protocol: payload.protocol,
      listeningIp: payload.listeningIp,
      port: payload.port
    });
  }
}
