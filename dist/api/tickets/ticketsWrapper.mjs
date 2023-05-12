import { getStatistics } from "./getStatistics";
import { getTickets } from "./getTickets";
import { redeemTickets } from "./redeemTickets";
class TicketsWrapper {
  constructor(url, apiKey) {
    this.url = url;
    this.apiKey = apiKey;
  }
  getStatistics() {
    return getStatistics(this.url, this.apiKey);
  }
  getTickets() {
    return getTickets(this.url, this.apiKey);
  }
  redeemTickets() {
    return redeemTickets(this.url, this.apiKey);
  }
}
export {
  TicketsWrapper
};
