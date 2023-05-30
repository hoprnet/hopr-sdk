import { APIError, createLogger } from '../../utils';
import { getStatistics } from './getStatistics';
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

  public async getStatistics() {
    try {
      return await getStatistics({
        apiEndpoint: this.apiEndpoint,
        apiToken: this.apiToken,
        timeout: this.timeout
      });
    } catch (e) {
      if (e instanceof APIError) {
        const { message, error, status } = e;
        log.error({ status, error, message });
      } else {
        log.error(e);
      }
    }
  }

  public async getTickets() {
    try {
      return await getTickets({
        apiEndpoint: this.apiEndpoint,
        apiToken: this.apiToken,
        timeout: this.timeout
      });
    } catch (e) {
      if (e instanceof APIError) {
        const { message, error, status } = e;
        log.error({ status, error, message });
      } else {
        log.error(e);
      }
    }
  }

  /**
   * Redeems all the unredeemed HOPR tickets owned by the HOPR node.
   * This operation may take more than 5 minutes to complete as it involves on-chain operations.
   */
  public async redeemTickets() {
    try {
      return await redeemTickets({
        apiEndpoint: this.apiEndpoint,
        apiToken: this.apiToken,
        timeout: this.timeout
      });
    } catch (e) {
      if (e instanceof APIError) {
        const { message, error, status } = e;
        log.error({ status, error, message });
      } else {
        log.error(e);
      }
    }
  }
}
