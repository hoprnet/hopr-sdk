import { APIError, createLogger } from '../../utils';
import { getStatistics } from './getStatistics';
import { getTickets } from './getTickets';
import { redeemTickets } from './redeemTickets';

const log = createLogger('tickets');

export class TicketsAdapter {
  constructor(private url: string, private apiKey: string) {}

  public async getStatistics() {
    try {
      return await getStatistics({ url: this.url, apiKey: this.apiKey });
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
      return await getTickets({ url: this.url, apiKey: this.apiKey });
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
      return await redeemTickets({ url: this.url, apiKey: this.apiKey });
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
