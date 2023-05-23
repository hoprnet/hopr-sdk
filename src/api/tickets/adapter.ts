import { getStatistics } from './getStatistics';
import { getTickets } from './getTickets';
import { redeemTickets } from './redeemTickets';

export class TicketsAdapter {
  constructor(private url: string, private apiKey: string) {}
  public getStatistics() {
    return getStatistics({ url: this.url, apiKey: this.apiKey });
  }

  public getTickets() {
    return getTickets({ url: this.url, apiKey: this.apiKey });
  }

  public redeemTickets() {
    return redeemTickets({ url: this.url, apiKey: this.apiKey });
  }
}
