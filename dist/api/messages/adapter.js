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
  MessagesAdapter: () => MessagesAdapter
});
module.exports = __toCommonJS(adapter_exports);
var import_sendMessage = require("./sendMessage");
var import_sign = require("./sign");
var import_websocket = require("./websocket");
class MessagesAdapter {
  constructor(url, apiKey) {
    this.url = url;
    this.apiKey = apiKey;
  }
  sendMessage(payload) {
    return (0, import_sendMessage.sendMessage)({
      apiKey: this.apiKey,
      url: this.url,
      body: payload.body,
      recipient: payload.recipient,
      hops: payload.hops,
      path: payload.path
    });
  }
  sign(payload) {
    return (0, import_sign.sign)({
      apiKey: this.apiKey,
      url: this.url,
      message: payload.message
    });
  }
  websocket() {
    return (0, import_websocket.websocket)({
      apiKey: this.apiKey,
      url: this.url
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MessagesAdapter
});
