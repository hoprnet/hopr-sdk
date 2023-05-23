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
var ticketsWrapper_exports = {};
__export(ticketsWrapper_exports, {
  TicketsWrapper: () => TicketsWrapper
});
module.exports = __toCommonJS(ticketsWrapper_exports);
var import_getStatistics = require("./getStatistics");
var import_getTickets = require("./getTickets");
var import_redeemTickets = require("./redeemTickets");
class TicketsWrapper {
  constructor(url, apiKey) {
    this.url = url;
    this.apiKey = apiKey;
  }
  getStatistics() {
    return (0, import_getStatistics.getStatistics)(this.url, this.apiKey);
  }
  getTickets() {
    return (0, import_getTickets.getTickets)(this.url, this.apiKey);
  }
  redeemTickets() {
    return (0, import_redeemTickets.redeemTickets)(this.url, this.apiKey);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TicketsWrapper
});