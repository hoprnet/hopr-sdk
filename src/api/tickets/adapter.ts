import { getStatistics } from './getStatistics';
import { getTickets } from './getTickets';
import { redeemTickets } from './redeemTickets';

export class TicketsAdapter {
  constructor(private url: string, private apiKey: string) {}
  public getStatistics() {
    return getStatistics(this.url, this.apiKey);
  }

  public getTickets() {
    return getTickets(this.url, this.apiKey);
  }

  public redeemTickets() {
    return redeemTickets(this.url, this.apiKey);
  }
}
