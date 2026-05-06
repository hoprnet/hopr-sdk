import {
  BasePayloadType,
  RemoveBasicAuthenticationPayloadType
} from '../../types';
import { createLogger } from '../../utils';
import { getInfo } from './getInfo';
import { getStatus } from './getStatus';
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

  public async getInfo(
    payload?: RemoveBasicAuthenticationPayloadType<BasePayloadType>
  ) {
    return getInfo({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: payload?.timeout ?? this.timeout
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

  public async getStatus(
    payload?: RemoveBasicAuthenticationPayloadType<BasePayloadType>
  ) {
    return getStatus({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: payload?.timeout ?? this.timeout
    });
  }

}

