import {
  BasePayloadType,
  RemoveBasicAuthenticationPayloadType
} from '../../types';
import { createLogger } from '../../utils';
import { getTicketStatistics } from './getTicketStatistics';
import { getTickets } from './getTickets';
import { redeemTickets } from './redeemTickets';

const log = createLogger('tickets');

export class TicketsAdapter {
  private apiEndpoint: string;
  private apiToken: string;
  private timeout: number | undefined;

  /**
   * Creates a new instance of the `TicketsAdapter` class.
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

  public async getTicketStatistics(
    payload?: RemoveBasicAuthenticationPayloadType<BasePayloadType>
  ) {
    return getTicketStatistics({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: payload?.timeout ?? this.timeout
    });
  }

  public async getTickets(
    payload?: RemoveBasicAuthenticationPayloadType<BasePayloadType>
  ) {
    return getTickets({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: payload?.timeout ?? this.timeout
    });
  }

  /**
   * Redeems all the unredeemed HOPR tickets owned by the HOPR node.
   * This operation may take more than 5 minutes to complete as it involves on-chain operations.
   */
  public async redeemTickets(
    payload?: RemoveBasicAuthenticationPayloadType<BasePayloadType>
  ) {
    return redeemTickets({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: payload?.timeout ?? this.timeout
    });
  }
}
