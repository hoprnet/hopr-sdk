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
var settings_exports = {};
__export(settings_exports, {
  GetSettingsResponse: () => GetSettingsResponse,
  SetSettingPayload: () => SetSettingPayload
});
module.exports = __toCommonJS(settings_exports);
var import_zod = require("zod");
var import_general = require("./general");
const GetSettingsResponse = import_zod.z.object({
  includeRecipient: import_zod.z.boolean(),
  strategy: import_zod.z.string()
});
const SetSettingPayload = import_general.BasicAuthenticationPayload.extend({
  setting: import_zod.z.string(),
  settingValue: import_zod.z.any()
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetSettingsResponse,
  SetSettingPayload
});
