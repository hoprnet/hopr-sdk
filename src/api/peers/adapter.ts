import {
  PingPeerPayloadType,
  GetPeerPayloadType,
  RemoveBasicAuthenticationPayloadType
} from '../../types';
import { pingPeer } from './pingPeer';
import { getPeer } from './getPeer';

export class PeersAdapter {
  private apiEndpoint: string;
  private apiToken: string;
  private timeout: number | undefined;

  /**
   * Creates a new instance of the `PeersAdapter` class.
   * @param apiEndpoint - The API endpoint of the API server.
   * @param apiToken - The API token to use for authentication.
   * @param timeout - optional timeout for all functions
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

  public async pingPeer(
    payload: RemoveBasicAuthenticationPayloadType<PingPeerPayloadType>
  ) {
    return pingPeer({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: payload.timeout ?? this.timeout,
      peerId: payload.peerId
    });
  }

  public async getPeer(
    payload: RemoveBasicAuthenticationPayloadType<GetPeerPayloadType>
  ) {
    return getPeer({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: payload.timeout ?? this.timeout,
      peerId: payload.peerId
    });
  }
}
