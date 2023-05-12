import { getSettings } from "./getSettings";
import { setSetting } from "./setSetting";
class SettingsWrapper {
  constructor(url, apiKey) {
    this.url = url;
    this.apiKey = apiKey;
  }
  getSettings() {
    return getSettings(this.url, this.apiKey);
  }
  setSetting(body) {
    return setSetting(this.url, this.apiKey, body);
  }
}
export {
  SettingsWrapper
};
