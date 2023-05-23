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
var node_exports = {};
__export(node_exports, {
  GetEntryNodesResponse: () => GetEntryNodesResponse,
  GetInfoResponse: () => GetInfoResponse,
  GetPeersPayload: () => GetPeersPayload,
  GetPeersResponse: () => GetPeersResponse,
  Peer: () => Peer,
  PingNodePayload: () => PingNodePayload,
  PingNodeResponse: () => PingNodeResponse
});
module.exports = __toCommonJS(node_exports);
var import_zod = require("zod");
var import_general = require("./general");
const GetPeersPayload = import_general.BasicAuthenticationPayload.extend({
  quality: import_zod.z.number().optional()
});
const Peer = import_zod.z.object({
  peerId: import_zod.z.string(),
  multiAddr: import_zod.z.string(),
  heartbeats: import_zod.z.object({
    sent: import_zod.z.number(),
    success: import_zod.z.number()
  }),
  lastSeen: import_zod.z.number(),
  quality: import_zod.z.number(),
  backoff: import_zod.z.number(),
  isNew: import_zod.z.boolean()
});
const GetPeersResponse = import_zod.z.object({
  connected: import_zod.z.array(Peer),
  announced: import_zod.z.array(Peer)
});
const GetInfoResponse = import_zod.z.object({
  environment: import_zod.z.string(),
  announcedAddress: import_zod.z.string().array(),
  listeningAddress: import_zod.z.string().array(),
  network: import_zod.z.string(),
  hoprToken: import_zod.z.string(),
  hoprChannels: import_zod.z.string(),
  hoprNetworkRegistryAddress: import_zod.z.string().optional(),
  connectivityStatus: import_zod.z.string(),
  isEligible: import_zod.z.boolean(),
  channelClosurePeriod: import_zod.z.number()
});
const nodeSchema = import_zod.z.object({
  multiaddrs: import_zod.z.array(import_zod.z.string()),
  isEligible: import_zod.z.boolean()
});
const GetEntryNodesResponse = import_zod.z.record(nodeSchema);
const PingNodePayload = import_general.BasicAuthenticationPayload.extend({
  peerId: import_zod.z.string()
});
const PingNodeResponse = import_zod.z.object({
  latency: import_zod.z.number()
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetEntryNodesResponse,
  GetInfoResponse,
  GetPeersPayload,
  GetPeersResponse,
  Peer,
  PingNodePayload,
  PingNodeResponse
});
