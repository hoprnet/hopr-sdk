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
var getHoprBalance_exports = {};
__export(getHoprBalance_exports, {
  getHoprBalance: () => getHoprBalance
});
module.exports = __toCommonJS(getHoprBalance_exports);
var import_getBalances = require("./getBalances");
const getHoprBalance = async (payload) => {
  try {
    const balances = await (0, import_getBalances.getBalances)({
      url: payload.url,
      apiKey: payload.apiKey
    });
    return balances.hopr;
  } catch (APIError) {
    throw APIError;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getHoprBalance
});
