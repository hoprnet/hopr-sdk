import { getStatistics } from "./getStatistics";
import { getTickets } from "./getTickets";
import { redeemTickets } from "./redeemTickets";
class TicketsAdapter {
  constructor(url, apiKey) {
    this.url = url;
    this.apiKey = apiKey;
  }
  getStatistics() {
    return getStatistics({ url: this.url, apiKey: this.apiKey });
  }
  getTickets() {
    return getTickets({ url: this.url, apiKey: this.apiKey });
  }
  redeemTickets() {
    return redeemTickets({ url: this.url, apiKey: this.apiKey });
  }
}
export {
  TicketsAdapter
};
