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
var websocket_exports = {};
__export(websocket_exports, {
  getWsUrl: () => getWsUrl,
  websocket: () => websocket
});
module.exports = __toCommonJS(websocket_exports);
var import_isomorphic_ws = __toESM(require("isomorphic-ws"));
const websocket = (payload) => {
  const endpointUrl = getWsUrl(
    payload.url,
    "/api/v2/messages/websocket/",
    payload.apiKey
  );
  return new import_isomorphic_ws.default(endpointUrl);
};
const getWsUrl = (apiEndpoint, path, apiToken) => {
  const url = new URL(path, apiEndpoint);
  url.protocol = url.protocol === "https:" ? "wss" : "ws";
  url.search = `?apiToken=${apiToken}`;
  return url.toString();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getWsUrl,
  websocket
});
