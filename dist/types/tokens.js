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
var tokens_exports = {};
__export(tokens_exports, {
  TokenCapability: () => TokenCapability,
  createPayload: () => createPayload,
  createResponse: () => createResponse,
  deletePayload: () => deletePayload,
  getTokenResponse: () => getTokenResponse
});
module.exports = __toCommonJS(tokens_exports);
var import_zod = __toESM(require("zod"));
const VALUES = [
  // Account
  "accountWithdraw",
  "accountGetBalances",
  "accountGetAddresses",
  // Aliases
  "aliasesGetAliases",
  "aliasesSetAlias",
  "aliasesGetAlias",
  "aliasesRemoveAlias",
  // Channels
  "channelsFundChannels",
  "channelsOpenChannel",
  "channelsGetChannels",
  "channelsRedeemTickets",
  "channelsGetTickets",
  "channelsGetChannel",
  "channelsCloseChannel",
  // Messages
  "messagesWebsocket",
  "messagesSign",
  "messagesSendMessage",
  // Node
  "nodeGetVersion",
  "nodePing",
  "nodeGetPeers",
  "nodeGetMetrics",
  "nodeGetInfo",
  "nodeGetEntryNodes",
  // PeerId
  "peerInfoGetPeerInfo",
  // Settings
  "settingsGetSettings",
  "settingsSetSetting",
  // Tickets
  "ticketsGetStatistics",
  "ticketsRedeemTickets",
  "ticketsGetTickets",
  // Tokens
  "tokensCreate",
  "tokensGetToken",
  "tokensDelete"
];
const TokenCapability = import_zod.default.object({
  endpoint: import_zod.default.enum(VALUES),
  limits: import_zod.default.array(
    import_zod.default.object({
      type: import_zod.default.string(),
      conditions: import_zod.default.object({ max: import_zod.default.number().optional() }).optional(),
      used: import_zod.default.number().optional()
    })
  )
});
const createPayload = import_zod.default.object({
  capabilities: import_zod.default.array(TokenCapability),
  lifetime: import_zod.default.number().nonnegative(),
  description: import_zod.default.string()
});
const createResponse = import_zod.default.object({
  token: import_zod.default.string()
});
const getTokenResponse = import_zod.default.object({
  id: import_zod.default.string(),
  description: import_zod.default.string().optional(),
  capabilities: import_zod.default.array(TokenCapability),
  valid_until: import_zod.default.number().optional()
});
const deletePayload = import_zod.default.object({ id: import_zod.default.string() });
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TokenCapability,
  createPayload,
  createResponse,
  deletePayload,
  getTokenResponse
});
