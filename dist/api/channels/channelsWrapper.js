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
var channelsWrapper_exports = {};
__export(channelsWrapper_exports, {
  ChannelsWrapper: () => ChannelsWrapper
});
module.exports = __toCommonJS(channelsWrapper_exports);
var import_closeChannel = require("./closeChannel");
var import_fundChannels = require("./fundChannels");
var import_getChannel = require("./getChannel");
var import_getChannelTickets = require("./getChannelTickets");
var import_getChannels = require("./getChannels");
var import_openChannels = require("./openChannels");
var import_redeemChannelTickets = require("./redeemChannelTickets");
class ChannelsWrapper {
  constructor(url, apiKey) {
    this.url = url;
    this.apiKey = apiKey;
  }
  closeChannel(body) {
    return (0, import_closeChannel.closeChannel)(this.url, this.apiKey, body);
  }
  fundChannels(body) {
    return (0, import_fundChannels.fundChannels)(this.url, this.apiKey, body);
  }
  getChannels() {
    return (0, import_getChannels.getChannels)(this.url, this.apiKey);
  }
  getChannel(body) {
    return (0, import_getChannel.getChannel)(this.url, this.apiKey, body);
  }
  openChannels(body) {
    return (0, import_openChannels.openChannels)(this.url, this.apiKey, body);
  }
  getChannelTickets(body) {
    return (0, import_getChannelTickets.getChannelTickets)(this.url, this.apiKey, body);
  }
  redeemChannelTickets(body) {
    return (0, import_redeemChannelTickets.redeemChannelTickets)(this.url, this.apiKey, body);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ChannelsWrapper
});
