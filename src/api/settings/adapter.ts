import { SetSettingPayloadType } from '../../types';
import { getSettings } from './getSettings';
import { setSetting } from './setSetting';

export class SettingsAdapter {
  constructor(private url: string, private apiKey: string) {}

  public getSettings() {
    return getSettings(this.url, this.apiKey);
  }

  public setSetting(body: SetSettingPayloadType) {
    return setSetting(this.url, this.apiKey, body);
  }
}
