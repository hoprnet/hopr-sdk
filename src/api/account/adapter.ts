import {
  RemoveBasicAuthenticationPayloadType,
  WithdrawPayloadType
} from '../../types';
import { createLogger } from '../../utils';
import { getAddresses } from './getAddresses';
import { getBalances } from './getBalances';
import { getHoprAddress } from './getHoprAddress';
import { getHoprBalance } from './getHoprBalance';
import { getNativeAddress } from './getNativeAddress';
import { getNativeBalance } from './getNativeBalance';
import { withdraw } from './withdraw';

const log = createLogger('account');

/**
 * A class that provides a wrapper around account-related API endpoints.
 */
export class AccountAdapter {
  private apiEndpoint: string;
  private apiToken: string;
  private timeout: number | undefined;
  /**
   * Creates a new instance of the `AccountAdapter` class.
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
   * Gets the HOPR and native addresses associated to the node.
   * @returns — A promise that resolves with an object containing the HOPR and native addresses.
   */
  public async getAddresses() {
    return getAddresses({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: this.timeout
    });
  }

  /**
   * Fetches the HOPR and native balances of the node.
   * @returns — A Promise that resolves with an object containing the HOPR and native balances.
   */
  public async getBalances() {
    return getBalances({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: this.timeout
    });
  }

  /**
   * Gets the HOPR address associated to the node.
   * @returns — A Promise that resolves to the HOPR address.
   */
  public async getHoprAddress() {
    return getHoprAddress({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: this.timeout
    });
  }

  /**
   * Gets the HOPR balance associated to the node.
   * @returns — A Promise that resolves to a string representing the HOPR balance.
   */
  public async getHoprBalance() {
    return getHoprBalance({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: this.timeout
    });
  }

  /**
   * Gets the native blockchain address associated to the node.
   * @returns — A Promise that resolves to the native address.
   */
  public async getNativeAddress() {
    return getNativeAddress({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: this.timeout
    });
  }

  /**
   * Gets the native blockchain balance associated to the node.
   * @returns — A Promise that resolves with a string representing the native balance.
   */
  public async getNativeBalance() {
    return getNativeBalance({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: this.timeout
    });
  }
  /**
   * Withdraw the given currency amount to the specified recipient address.
   * This operation may take more than 5 minutes to complete as it involves on-chain operations.
   * @param payload - The withdrawal request payload.
   * @returns — A Promise that resolves to the transaction receipt.
   */
  public async withdraw(
    payload: RemoveBasicAuthenticationPayloadType<WithdrawPayloadType>
  ) {
    return withdraw({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: this.timeout,
      ...payload
    });
  }
}
