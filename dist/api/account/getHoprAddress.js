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
var getHoprAddress_exports = {};
__export(getHoprAddress_exports, {
  getHoprAddress: () => getHoprAddress
});
module.exports = __toCommonJS(getHoprAddress_exports);
var import_getAddresses = require("./getAddresses");
const getHoprAddress = async (payload) => {
  try {
    const addresses = await (0, import_getAddresses.getAddresses)({
      url: payload.url,
      apiKey: payload.apiKey
    });
    return addresses.hopr;
  } catch (APIError2) {
    throw APIError2;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getHoprAddress
});
