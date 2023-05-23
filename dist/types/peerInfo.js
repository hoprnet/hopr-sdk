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
var peerInfo_exports = {};
__export(peerInfo_exports, {
  GetPeerInfoPayload: () => GetPeerInfoPayload,
  GetPeerInfoResponse: () => GetPeerInfoResponse
});
module.exports = __toCommonJS(peerInfo_exports);
var import_zod = require("zod");
var import_general = require("./general");
const GetPeerInfoPayload = import_general.BasicAuthenticationPayload.extend({
  peerId: (0, import_zod.string)()
});
const GetPeerInfoResponse = import_zod.z.object({
  announced: import_zod.z.string().array(),
  observed: import_zod.z.string().array()
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetPeerInfoPayload,
  GetPeerInfoResponse
});
