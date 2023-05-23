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
  ChannelsAdapter: () => ChannelsAdapter
});
module.exports = __toCommonJS(adapter_exports);
var import_closeChannel = require("./closeChannel");
var import_fundChannels = require("./fundChannels");
var import_getChannel = require("./getChannel");
var import_getChannelTickets = require("./getChannelTickets");
var import_getChannels = require("./getChannels");
var import_openChannels = require("./openChannels");
var import_redeemChannelTickets = require("./redeemChannelTickets");
class ChannelsAdapter {
  constructor(url, apiKey) {
    this.url = url;
    this.apiKey = apiKey;
  }
  closeChannel(payload) {
    return (0, import_closeChannel.closeChannel)({
      apiKey: this.apiKey,
      url: this.url,
      direction: payload.direction,
      peerId: payload.peerId
    });
  }
  fundChannels(payload) {
    return (0, import_fundChannels.fundChannels)({
      apiKey: this.apiKey,
      url: this.url,
      incomingAmount: payload.incomingAmount,
      outgoingAmount: payload.outgoingAmount,
      peerId: payload.peerId
    });
  }
  getChannels() {
    return (0, import_getChannels.getChannels)({ url: this.url, apiKey: this.apiKey });
  }
  getChannel(payload) {
    return (0, import_getChannel.getChannel)({
      apiKey: this.apiKey,
      url: this.url,
      direction: payload.direction,
      peerId: payload.peerId
    });
  }
  openChannels(payload) {
    return (0, import_openChannels.openChannels)({
      apiKey: this.apiKey,
      url: this.url,
      amount: payload.amount,
      peerId: payload.peerId
    });
  }
  getChannelTickets(payload) {
    return (0, import_getChannelTickets.getChannelTickets)({
      apiKey: this.apiKey,
      url: this.url,
      peerId: payload.peerId
    });
  }
  redeemChannelTickets(payload) {
    return (0, import_redeemChannelTickets.redeemChannelTickets)({
      apiKey: this.apiKey,
      url: this.url,
      peerId: payload.peerId
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ChannelsAdapter
});
