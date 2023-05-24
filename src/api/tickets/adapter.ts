import { APIError, createLogger } from '../../utils';
import { getStatistics } from './getStatistics';
import { getTickets } from './getTickets';
import { redeemTickets } from './redeemTickets';

const log = createLogger('tickets');

export class TicketsAdapter {
  private url: string;
  private apiKey: string;
  private timeout: number | undefined;

  /**
   * Creates a new instance of the `TicketsAdapter` class.
   * @param url - The URL of the API server.
   * @param apiKey - The API key to use for authentication.
   * @param timeout - optional timeout for all functions
   */
  constructor({
    url,
    apiKey
  }: {
    url: string;
    apiKey: string;
    timeout?: number;
  }) {
    this.url = url;
    this.apiKey = apiKey;
    this.timeout = this.timeout;
  }

  public async getStatistics() {
    try {
      return await getStatistics({
        url: this.url,
        apiKey: this.apiKey,
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
        url: this.url,
        apiKey: this.apiKey,
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

  public async redeemTickets() {
    try {
      return await redeemTickets({
        url: this.url,
        apiKey: this.apiKey,
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
