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
var sdk_exports = {};
__export(sdk_exports, {
  SDK: () => SDK
});
module.exports = __toCommonJS(sdk_exports);
var import_api = require("./api");
class SDK {
  constructor(url, apiToken) {
    this.url = url;
    this.apiToken = apiToken;
    this.api = new import_api.ApiAdapter(this.url, this.apiToken);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SDK
});
