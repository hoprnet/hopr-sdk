import {
  RemoveBasicAuthenticationPayloadType,
  WithdrawPayloadType
} from '../../types';
import { APIError, createLogger } from '../../utils';
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
  /**
   * Creates a new instance of the `AccountAdapter` class.
   * @param url - The URL of the API server.
   * @param apiKey - The API key to use for authentication.
   */
  constructor(private url: string, private apiKey: string) {}

  /**
   * Gets the HOPR and native addresses associated to the node.
   * @returns — A promise that resolves with an object containing the HOPR and native addresses.
   */
  public async getAddresses() {
    try {
      return await getAddresses({ url: this.url, apiKey: this.apiKey });
    } catch (e) {
      if (e instanceof APIError) {
        const { message, error, status, stack } = e;
        log.error({ status, error, message, stack });
      } else {
        log.error(e);
      }
    }
  }

  /**
   * Fetches the HOPR and native balances of the node.
   * @returns — A Promise that resolves with an object containing the HOPR and native balances.
   */
  public async getBalances() {
    try {
      return await getBalances({ url: this.url, apiKey: this.apiKey });
    } catch (e) {
      if (e instanceof APIError) {
        const { message, error, status, stack } = e;
        log.error({ status, error, message, stack });
      } else {
        log.error(e);
      }
    }
  }

  /**
   * Gets the HOPR address associated to the node.
   * @returns — A Promise that resolves to the HOPR address.
   */
  public async getHoprAddress() {
    try {
      return await getHoprAddress({ url: this.url, apiKey: this.apiKey });
    } catch (e) {
      if (e instanceof APIError) {
        const { message, error, status, stack } = e;
        log.error({ status, error, message, stack });
      } else {
        log.error(e);
      }
    }
  }

  /**
   * Gets the HOPR balance associated to the node.
   * @returns — A Promise that resolves to a string representing the HOPR balance.
   */
  public async getHoprBalance() {
    try {
      return await getHoprBalance({ url: this.url, apiKey: this.apiKey });
    } catch (e) {
      if (e instanceof APIError) {
        const { message, error, status, stack } = e;
        log.error({ status, error, message, stack });
      } else {
        log.error(e);
      }
    }
  }

  /**
   * Gets the native blockchain address associated to the node.
   * @returns — A Promise that resolves to the native address.
   */
  public async getNativeAddress() {
    try {
      return await getNativeAddress({ url: this.url, apiKey: this.apiKey });
    } catch (e) {
      if (e instanceof APIError) {
        const { message, error, status, stack } = e;
        log.error({ status, error, message, stack });
      } else {
        log.error(e);
      }
    }
  }

  /**
   * Gets the native blockchain balance associated to the node.
   * @returns — A Promise that resolves with a string representing the native balance.
   */
  public async getNativeBalance() {
    try {
      return await getNativeBalance({ url: this.url, apiKey: this.apiKey });
    } catch (e) {
      if (e instanceof APIError) {
        const { message, error, status, stack } = e;
        log.error({ status, error, message, stack });
      } else {
        log.error(e);
      }
    }
  }
  /**
   * Withdraw the given currency amount to the specified recipient address.
   * @param payload - The withdrawal request payload.
   * @returns — A Promise that resolves to the transaction receipt.
   */
  public async withdraw(
    payload: RemoveBasicAuthenticationPayloadType<WithdrawPayloadType>
  ) {
    try {
      return await withdraw({ url: this.url, apiKey: this.apiKey, ...payload });
    } catch (e) {
      if (e instanceof APIError) {
        const { message, error, status, stack } = e;
        log.error({ status, error, message, stack });
      } else {
        log.error(e);
      }
    }
  }
}
