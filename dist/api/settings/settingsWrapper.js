"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var settingsWrapper_exports = {};
__export(settingsWrapper_exports, {
  SettingsWrapper: () => SettingsWrapper
});
module.exports = __toCommonJS(settingsWrapper_exports);
var import_getSettings = require("./getSettings");
var import_setSetting = require("./setSetting");
class SettingsWrapper {
  constructor(url, apiKey) {
    this.url = url;
    this.apiKey = apiKey;
  }
  getSettings() {
    return (0, import_getSettings.getSettings)(this.url, this.apiKey);
  }
  setSetting(body) {
    return (0, import_setSetting.setSetting)(this.url, this.apiKey, body);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SettingsWrapper
});
