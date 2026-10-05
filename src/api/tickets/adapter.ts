import {
  GetTicketStatisticsPayloadType,
  RedeemAllTicketsPayloadType,
  RemoveBasicAuthenticationPayloadType
} from '../../types';
import { createLogger } from '../../utils';
import { getTicketStatistics } from './getTicketStatistics';
import { redeemAllTickets } from './redeemAllTickets';

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

  /**
   * Gets ticket statistics, optionally scoped to the incoming channel from a counterparty address.
   */
  public async getTicketStatistics(
    payload?: RemoveBasicAuthenticationPayloadType<GetTicketStatisticsPayloadType>
  ) {
    return getTicketStatistics({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: payload?.timeout ?? this.timeout,
      address: payload?.address
    });
  }

  /**
   * Redeems all the unredeemed HOPR tickets owned by the HOPR node.
   * Optionally scoped to a specific counterparty address.
   * This operation may take more than 5 minutes to complete as it involves on-chain operations.
   */
  public async redeemAllTickets(
    payload?: RemoveBasicAuthenticationPayloadType<RedeemAllTicketsPayloadType>
  ) {
    return redeemAllTickets({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: payload?.timeout ?? this.timeout,
      address: payload?.address
    });
  }
}
