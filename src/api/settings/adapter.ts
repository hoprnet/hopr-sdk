import {
  RemoveBasicAuthenticationPayloadType,
  SetSettingPayloadType
} from '../../types';
import { getSettings } from './getSettings';
import { setSetting } from './setSetting';

export class SettingsAdapter {
  constructor(private url: string, private apiKey: string) {}

  public getSettings() {
    return getSettings({ url: this.url, apiKey: this.apiKey });
  }

  public setSetting(
    payload: RemoveBasicAuthenticationPayloadType<SetSettingPayloadType>
  ) {
    return setSetting({
      url: this.url,
      apiKey: this.apiKey,
      setting: payload.setting,
      settingValue: payload.settingValue
    });
  }
}
