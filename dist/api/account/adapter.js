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
var adapter_exports = {};
__export(adapter_exports, {
  AccountAdapter: () => AccountAdapter
});
module.exports = __toCommonJS(adapter_exports);
var import_getAddresses = require("./getAddresses");
var import_getBalances = require("./getBalances");
var import_getHoprAddress = require("./getHoprAddress");
var import_getHoprBalance = require("./getHoprBalance");
var import_getNativeAddress = require("./getNativeAddress");
var import_getNativeBalance = require("./getNativeBalance");
var import_withdraw = require("./withdraw");
class AccountAdapter {
  /**
   * Creates a new instance of the `AccountAdapter` class.
   * @param url - The URL of the API server.
   * @param apiKey - The API key to use for authentication.
   */
  constructor(url, apiKey) {
    this.url = url;
    this.apiKey = apiKey;
  }
  /**
   * Gets the HOPR and native addresses associated to the node.
   * @returns — A promise that resolves with an object containing the HOPR and native addresses.
   */
  getAddresses() {
    return (0, import_getAddresses.getAddresses)({ url: this.url, apiKey: this.apiKey });
  }
  /**
   * Fetches the HOPR and native balances of the node.
   * @returns — A Promise that resolves with an object containing the HOPR and native balances.
   */
  getBalances() {
    return (0, import_getBalances.getBalances)({ url: this.url, apiKey: this.apiKey });
  }
  /**
   * Gets the HOPR address associated to the node.
   * @returns — A Promise that resolves to the HOPR address.
   */
  getHoprAddress() {
    return (0, import_getHoprAddress.getHoprAddress)({ url: this.url, apiKey: this.apiKey });
  }
  /**
   * Gets the HOPR balance associated to the node.
   * @returns — A Promise that resolves to a string representing the HOPR balance.
   */
  getHoprBalance() {
    return (0, import_getHoprBalance.getHoprBalance)({ url: this.url, apiKey: this.apiKey });
  }
  /**
   * Gets the native blockchain address associated to the node.
   * @returns — A Promise that resolves to the native address.
   */
  getNativeAddress() {
    return (0, import_getNativeAddress.getNativeAddress)({ url: this.url, apiKey: this.apiKey });
  }
  /**
   * Gets the native blockchain balance associated to the node.
   * @returns — A Promise that resolves with a string representing the native balance.
   */
  getNativeBalance() {
    return (0, import_getNativeBalance.getNativeBalance)({ url: this.url, apiKey: this.apiKey });
  }
  /**
   * Withdraw the given currency amount to the specified recipient address.
   * @param payload - The withdrawal request payload.
   * @returns — A Promise that resolves to the transaction receipt.
   */
  withdraw(payload) {
    return (0, import_withdraw.withdraw)({ url: this.url, apiKey: this.apiKey, ...payload });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AccountAdapter
});
