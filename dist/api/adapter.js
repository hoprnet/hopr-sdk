"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var adapter_exports = {};
__export(adapter_exports, {
  ApiAdapter: () => ApiAdapter
});
module.exports = __toCommonJS(adapter_exports);
var api = __toESM(require("."));
class ApiAdapter {
  constructor(url, apiKey) {
    this.url = url;
    this.apiKey = apiKey;
    this.account = new api.AccountAdapter(this.url, this.apiKey);
    this.aliases = new api.AliasesAdapter(this.url, this.apiKey);
    this.channels = new api.ChannelsAdapter(this.url, this.apiKey);
    this.node = new api.NodeAdapter(this.url, this.apiKey);
    this.peerInfo = new api.PeerInfoAdapter(this.url, this.apiKey);
    this.settings = new api.SettingsAdapter(this.url, this.apiKey);
    this.tickets = new api.TicketsAdapter(this.url, this.apiKey);
    this.tokens = new api.TokensAdapter(this.url, this.apiKey);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ApiAdapter
});
