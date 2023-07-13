import {
  GetPeerPayloadType,
  GetPeersPayloadType,
  PingPeerPayloadType,
  RemoveBasicAuthenticationPayloadType
} from '../../types';
import { createLogger } from '../../utils';
import { getPeer } from './getPeer';
import { pingPeer } from './pingPeer';
const log = createLogger('node');

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

  public async getPeer(
    payload: RemoveBasicAuthenticationPayloadType<GetPeerPayloadType>
  ) {
    return getPeer({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: this.timeout,
      peerId: payload.peerId
    });
  }

  public async pingPeer(
    payload: RemoveBasicAuthenticationPayloadType<PingPeerPayloadType>
  ) {
    return pingPeer({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: this.timeout,
      peerId: payload.peerId
    });
  }
}
