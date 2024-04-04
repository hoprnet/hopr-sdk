import {
  GetConfigurationPayloadType,
  RemoveBasicAuthenticationPayloadType
} from '../../types';
import { createLogger } from '../../utils';
import { getConfiguration } from './getConfiguration';

const log = createLogger('configuration');

export class ConfigurationAdapter {
  private apiEndpoint: string;
  private apiToken: string;
  private timeout: number | undefined;

  /**
   * Creates a new instance of the `MessagesAdapter` class.
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

  public async getConfiguration(
    payload: RemoveBasicAuthenticationPayloadType<GetConfigurationPayloadType>
  ) {
    return getConfiguration({
      apiToken: this.apiToken,
      apiEndpoint: this.apiEndpoint,
      timeout: payload.timeout ?? this.timeout,
    });
  }

}
