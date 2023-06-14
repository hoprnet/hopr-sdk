import {
  GetPeerInfoPayloadType,
  RemoveBasicAuthenticationPayloadType
} from '../../types';
import { createLogger } from '../../utils';
import { getPeerInfo } from './getPeerInfo';

const log = createLogger('peerInfo');

export class PeerInfoAdapter {
  private apiEndpoint: string;
  private apiToken: string;
  private timeout: number | undefined;

  /**
   * Creates a new instance of the `PeerInfoAdapter` class.
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

  public async getPeerInfo(
    payload: RemoveBasicAuthenticationPayloadType<GetPeerInfoPayloadType>
  ) {
    return getPeerInfo({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: this.timeout,
      peerId: payload.peerId
    });
  }
}
