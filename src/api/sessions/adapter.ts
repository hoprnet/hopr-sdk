import {
  CloseSessionPayloadType,
  GetSessionsPayloadType,
  OpenSessionResponseType,
  OpenSessionPayloadType,
  GetSessionsResponseType,
  RemoveBasicAuthenticationPayloadType
} from '../../types';
import { createLogger } from '../../utils';
import { getSessions } from './getSessions';
import { openSession } from './openSession';
import { closeSession } from './closeSession';

const log = createLogger('session');

/**
 * A class that provides a wrapper around session-related API endpoints.
 */
export class SessionsAdapter {
  private apiEndpoint: string;
  private apiToken: string;
  private timeout: number | undefined;

  /**
   * Creates a new instance of the `SessionsAdapter` class.
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
  public async OpenSession(
    payload: RemoveBasicAuthenticationPayloadType<OpenSessionPayloadType>
  ): Promise<OpenSessionResponseType> {
    return openSession({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: payload?.timeout ?? this.timeout,
      destination: payload.destination,
      capabilities: payload.capabilities,
      listenHost: payload.listenHost,
      forwardPath: payload.forwardPath,
      returnPath: payload.returnPath,
      responseBuffer: payload.responseBuffer,
      target: payload.target,
      protocol: payload.protocol
    });
  }

  /**
   * Get information about active sessions.
   *
   * @param payload - An object containing the protocol filter for sessions.
   * @returns A promise that resolves to the active sessions information.
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
