import {
  BasePayloadType,
  GetGraphPayloadType,
  GetPeersPayloadType,
  RemoveBasicAuthenticationPayloadType
} from '../../types';
import { createLogger } from '../../utils';
import { getEntryNodes } from './getEntryNodes';
import { getGraph } from './getGraph';
import { getInfo } from './getInfo';
import { getMetrics } from './getMetrics';
import { getPeers } from './getPeers';
import { getVersion } from './getVersion';
import { getVersions } from './getVersions';

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

  public async getEntryNodes(
    payload?: RemoveBasicAuthenticationPayloadType<BasePayloadType>
  ) {
    return getEntryNodes({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: payload?.timeout ?? this.timeout
    });
  }

  public async getGraph(
    payload?: RemoveBasicAuthenticationPayloadType<GetGraphPayloadType>
  ) {
    return getGraph({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: payload?.timeout ?? this.timeout,
      ignoreDisconnectedComponents: payload?.ignoreDisconnectedComponents,
      ignoreNonOpenedChannels: payload?.ignoreNonOpenedChannels,
      rawGraph: payload?.rawGraph
    });
  }

  public async getInfo(
    payload?: RemoveBasicAuthenticationPayloadType<BasePayloadType>
  ) {
    return getInfo({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: payload?.timeout ?? this.timeout
    });
  }

  public async getMetrics(
    payload?: RemoveBasicAuthenticationPayloadType<BasePayloadType>
  ) {
    return getMetrics({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: payload?.timeout ?? this.timeout
    });
  }

  public async getPeers(
    payload?: RemoveBasicAuthenticationPayloadType<GetPeersPayloadType>
  ) {
    return getPeers({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: payload?.timeout ?? this.timeout,
      quality: payload?.quality
    });
  }

  public async getVersion(
    payload?: RemoveBasicAuthenticationPayloadType<BasePayloadType>
  ) {
    return getVersion({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: payload?.timeout ?? this.timeout
    });
  }

  public async getVersions(
    payload?: RemoveBasicAuthenticationPayloadType<BasePayloadType>
  ) {
    return getVersions({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: payload?.timeout ?? this.timeout
    });
  }
}
