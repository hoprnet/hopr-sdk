import { getSettings } from "./getSettings";
import { setSetting } from "./setSetting";
class SettingsAdapter {
  constructor(url, apiKey) {
    this.url = url;
    this.apiKey = apiKey;
  }
  getSettings() {
    return getSettings({ url: this.url, apiKey: this.apiKey });
  }
  setSetting(payload) {
    return setSetting({
      url: this.url,
      apiKey: this.apiKey,
      setting: payload.setting,
      settingValue: payload.settingValue
    });
  }
}
export {
  SettingsAdapter
};
