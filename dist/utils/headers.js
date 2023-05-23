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
var headers_exports = {};
__export(headers_exports, {
  default: () => headers_default,
  getHeaders: () => getHeaders
});
module.exports = __toCommonJS(headers_exports);
var import_cross_fetch = require("cross-fetch");
const getHeaders = (apiKey) => {
  const headers = new import_cross_fetch.Headers();
  headers.set("Content-Type", "application/json");
  headers.set("Accept-Content", "application/json");
  headers.set("x-auth-token", apiKey);
  return headers;
};
var headers_default = {};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getHeaders
});
