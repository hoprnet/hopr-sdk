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
var nodeWrapper_exports = {};
__export(nodeWrapper_exports, {
  NodeWrapper: () => NodeWrapper
});
module.exports = __toCommonJS(nodeWrapper_exports);
var import_getEntryNodes = require("./getEntryNodes");
var import_getInfo = require("./getInfo");
var import_getMetrics = require("./getMetrics");
var import_getPeers = require("./getPeers");
var import_getVersion = require("./getVersion");
var import_pingNode = require("./pingNode");
class NodeWrapper {
  constructor(url, apiKey) {
    this.url = url;
    this.apiKey = apiKey;
  }
  getEntryNodes() {
    return (0, import_getEntryNodes.getEntryNodes)(this.url, this.apiKey);
  }
  getInfo() {
    return (0, import_getInfo.getInfo)(this.url, this.apiKey);
  }
  getMetrics() {
    return (0, import_getMetrics.getMetrics)(this.url, this.apiKey);
  }
  getPeers(body) {
    return (0, import_getPeers.getPeers)(this.url, this.apiKey, body);
  }
  getVersion() {
    return (0, import_getVersion.getVersion)(this.url, this.apiKey);
  }
  pingNode(body) {
    return (0, import_pingNode.pingNode)(this.url, this.apiKey, body);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NodeWrapper
});
