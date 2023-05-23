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
  TicketsAdapter: () => TicketsAdapter
});
module.exports = __toCommonJS(adapter_exports);
var import_getStatistics = require("./getStatistics");
var import_getTickets = require("./getTickets");
var import_redeemTickets = require("./redeemTickets");
class TicketsAdapter {
  constructor(url, apiKey) {
    this.url = url;
    this.apiKey = apiKey;
  }
  getStatistics() {
    return (0, import_getStatistics.getStatistics)({ url: this.url, apiKey: this.apiKey });
  }
  getTickets() {
    return (0, import_getTickets.getTickets)({ url: this.url, apiKey: this.apiKey });
  }
  redeemTickets() {
    return (0, import_redeemTickets.redeemTickets)({ url: this.url, apiKey: this.apiKey });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TicketsAdapter
});
