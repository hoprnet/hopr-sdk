import { getAddresses } from "./getAddresses";
import { getBalances } from "./getBalances";
import { getHoprAddress } from "./getHoprAddress";
import { getHoprBalance } from "./getHoprBalance";
import { getNativeAddress } from "./getNativeAddress";
import { getNativeBalance } from "./getNativeBalance";
import { withdraw } from "./withdraw";
class AccountAdapter {
  /**
   * Creates a new instance of the `AccountAdapter` class.
   * @param url - The URL of the API server.
   * @param apiKey - The API key to use for authentication.
   */
  constructor(url, apiKey) {
    this.url = url;
    this.apiKey = apiKey;
  }
  /**
   * Gets the HOPR and native addresses associated to the node.
   * @returns — A promise that resolves with an object containing the HOPR and native addresses.
   */
  getAddresses() {
    return getAddresses({ url: this.url, apiKey: this.apiKey });
  }
  /**
   * Fetches the HOPR and native balances of the node.
   * @returns — A Promise that resolves with an object containing the HOPR and native balances.
   */
  getBalances() {
    return getBalances({ url: this.url, apiKey: this.apiKey });
  }
  /**
   * Gets the HOPR address associated to the node.
   * @returns — A Promise that resolves to the HOPR address.
   */
  getHoprAddress() {
    return getHoprAddress({ url: this.url, apiKey: this.apiKey });
  }
  /**
   * Gets the HOPR balance associated to the node.
   * @returns — A Promise that resolves to a string representing the HOPR balance.
   */
  getHoprBalance() {
    return getHoprBalance({ url: this.url, apiKey: this.apiKey });
  }
  /**
   * Gets the native blockchain address associated to the node.
   * @returns — A Promise that resolves to the native address.
   */
  getNativeAddress() {
    return getNativeAddress({ url: this.url, apiKey: this.apiKey });
  }
  /**
   * Gets the native blockchain balance associated to the node.
   * @returns — A Promise that resolves with a string representing the native balance.
   */
  getNativeBalance() {
    return getNativeBalance({ url: this.url, apiKey: this.apiKey });
  }
  /**
   * Withdraw the given currency amount to the specified recipient address.
   * @param payload - The withdrawal request payload.
   * @returns — A Promise that resolves to the transaction receipt.
   */
  withdraw(payload) {
    return withdraw({ url: this.url, apiKey: this.apiKey, ...payload });
  }
}
export {
  AccountAdapter
};
