import {
  BasePayloadType,
  RemoveBasicAuthenticationPayloadType,
  SetSettingPayloadType
} from '../../types';
import { createLogger } from '../../utils';
import { getSettings } from './getSettings';
import { setSetting } from './setSetting';

const log = createLogger('settings');

export class SettingsAdapter {
  private apiEndpoint: string;
  private apiToken: string;
  private timeout: number | undefined;

  /**
   * Creates a new instance of the `SettingsAdapter` class.
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

  public async getSettings(
    payload: RemoveBasicAuthenticationPayloadType<BasePayloadType>
  ) {
    return getSettings({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: payload.timeout ?? this.timeout
    });
  }

  public async setSetting(
    payload: RemoveBasicAuthenticationPayloadType<SetSettingPayloadType>
  ) {
    return setSetting({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: payload.timeout ?? this.timeout,
      setting: payload.setting,
      settingValue: payload.settingValue
    });
  }
}
