import {
  BasePayloadType,
  IsNodeHealthyPayloadType,
  IsNodeReadyPayloadType,
  IsNodeStartedPayloadType,
  RemoveBasicAuthenticationPayloadType
} from '../../types';
import { isNodeHealthy } from './isNodeHealthy';
import { isNodeReady } from './isNodeReady';
import { isNodeStarted } from './isNodeStarted';
import { isNodeEligible } from './isNodeEligible';
import { getMetrics } from './getMetrics';

export class ChecksAdapter {
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

  public async isNodeHealthy(
    payload: RemoveBasicAuthenticationPayloadType<IsNodeHealthyPayloadType>
  ) {
    return isNodeHealthy({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: payload.timeout ?? this.timeout
    });
  }

  public async isNodeReady(
    payload: RemoveBasicAuthenticationPayloadType<IsNodeReadyPayloadType>
  ) {
    return isNodeReady({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: payload.timeout ?? this.timeout
    });
  }

  public async isNodeStarted(
    payload: RemoveBasicAuthenticationPayloadType<IsNodeStartedPayloadType>
  ) {
    return isNodeStarted({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: payload.timeout ?? this.timeout
    });
  }

  public async isNodeEligible(
    payload: RemoveBasicAuthenticationPayloadType<IsNodeStartedPayloadType>
  ) {
    return isNodeEligible({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: payload.timeout ?? this.timeout
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
}
