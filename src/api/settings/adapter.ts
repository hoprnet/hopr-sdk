import {
  RemoveBasicAuthenticationPayloadType,
  SetSettingPayloadType
} from '../../types';
import { APIError, createLogger } from '../../utils';
import { getSettings } from './getSettings';
import { setSetting } from './setSetting';

const log = createLogger('settings');

export class SettingsAdapter {
  private url: string;
  private apiKey: string;
  private timeout: number | undefined;

  /**
   * Creates a new instance of the `SettingsAdapter` class.
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

  public async getSettings() {
    try {
      return await getSettings({
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

  public async setSetting(
    payload: RemoveBasicAuthenticationPayloadType<SetSettingPayloadType>
  ) {
    try {
      return await setSetting({
        url: this.url,
        apiKey: this.apiKey,
        timeout: this.timeout,
        setting: payload.setting,
        settingValue: payload.settingValue
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
