import {
  GetPeersPayloadType,
  RemoveBasicAuthenticationPayloadType
} from '../../types';
import { createLogger } from '../../utils';
import { getEntryNodes } from './getEntryNodes';
import { getInfo } from './getInfo';
import { getMetrics } from './getMetrics';
import { getPeers } from './getPeers';
import { getVersion } from './getVersion';

const log = createLogger('node');

export class NodeAdapter {
  private apiEndpoint: string;
  private apiToken: string;
  private timeout: number | undefined;

  /**
   * Creates a new instance of the `NodeAdapter` class.
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

  public async getEntryNodes() {
    return getEntryNodes({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: this.timeout
    });
  }

  public async getInfo() {
    return getInfo({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: this.timeout
    });
  }

  public async getMetrics() {
    return getMetrics({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: this.timeout
    });
  }

  public async getPeers(
    payload: RemoveBasicAuthenticationPayloadType<GetPeersPayloadType>
  ) {
    return getPeers({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: this.timeout,
      quality: payload.quality
    });
  }

  public async getVersion() {
    return getVersion({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: this.timeout
    });
  }
}
