import { withdrawPayloadType } from '../../types';
import { getAddresses } from './getAddresses';
import { getBalances } from './getBalances';
import { getHoprAddress } from './getHoprAddress';
import { getHoprBalance } from './getHoprBalance';
import { getNativeAddress } from './getNativeAddress';
import { getNativeBalance } from './getNativeBalance';
import { withdraw } from './withdraw';

/**
 * A class that provides a wrapper around account-related API endpoints.
 */
export class AccountWrapper {
  /**
   * Creates a new instance of the `AccountWrapper` class.
   * @param url - The URL of the API server.
   * @param apiKey - The API key to use for authentication.
   */
  constructor(private url: string, private apiKey: string) {}

  /**
   * Gets the HOPR and native addresses associated to the node.
   * @returns — A promise that resolves with an object containing the HOPR and native addresses.
   */
  public getAddresses() {
    return getAddresses(this.url, this.apiKey);
  }

  /**
   * Fetches the HOPR and native balances of the node.
   * @returns — A Promise that resolves with an object containing the HOPR and native balances.
   */
  public getBalances() {
    return getBalances(this.url, this.apiKey);
  }

  /**
   * Gets the HOPR address associated to the node.
   * @returns — A Promise that resolves to the HOPR address.
   */
  public getHoprAddress() {
    return getHoprAddress(this.url, this.apiKey);
  }

  /**
   * Gets the HOPR balance associated to the node.
   * @returns — A Promise that resolves to a string representing the HOPR balance.
   */
  public getHoprBalance() {
    return getHoprBalance(this.url, this.apiKey);
  }

  /**
   * Gets the native blockchain address associated to the node.
   * @returns — A Promise that resolves to the native address.
   */
  public getNativeAddress() {
    return getNativeAddress(this.url, this.apiKey);
  }

  /**
   * Gets the native blockchain balance associated to the node.
   * @returns — A Promise that resolves with a string representing the native balance.
   */
  public getNativeBalance() {
    return getNativeBalance(this.url, this.apiKey);
  }
  /**
   * Withdraw the given currency amount to the specified recipient address.
   * @param body - The withdrawal request payload.
   * @returns — A Promise that resolves to the transaction receipt.
   */
  public withdraw(body: withdrawPayloadType) {
    return withdraw(this.url, this.apiKey, body);
  }
}
