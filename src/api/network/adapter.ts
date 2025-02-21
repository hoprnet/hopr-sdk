import {
  GetMinimumNetworkProbabilityPayloadType,
  GetTicketPricePayloadType,
  RemoveBasicAuthenticationPayloadType,
} from '../../types';
import { getTicketPrice } from './getTicketPrice';
import { getMinimumTicketProbability } from './getMinimumTicketProbability';

export class NetworkAdapter {
  private apiEndpoint: string;
  private apiToken: string;
  private timeout: number | undefined;

  /**
   * Creates a new instance of the `NetworkAdapter` class.
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

  public async getTicketPrice(
    payload: RemoveBasicAuthenticationPayloadType<GetTicketPricePayloadType>
  ) {
    return getTicketPrice({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: payload.timeout ?? this.timeout
    });
  }

  public async getMinimumTicketProbability(
    payload: RemoveBasicAuthenticationPayloadType<GetMinimumNetworkProbabilityPayloadType>
  ) {
    return getMinimumTicketProbability({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: payload.timeout ?? this.timeout
    });
  }
}
