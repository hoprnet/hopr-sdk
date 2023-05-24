import {
  RemoveBasicAuthenticationPayloadType,
  SetSettingPayloadType
} from '../../types';
import { APIError, createLogger } from '../../utils';
import { getSettings } from './getSettings';
import { setSetting } from './setSetting';

const log = createLogger('settings');

export class SettingsAdapter {
  constructor(private url: string, private apiKey: string) {}

  public async getSettings() {
    try {
      return await getSettings({ url: this.url, apiKey: this.apiKey });
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
