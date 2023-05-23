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
var channels_exports = {};
__export(channels_exports, {
  Channel: () => Channel,
  CloseChannelPayload: () => CloseChannelPayload,
  CloseChannelResponse: () => CloseChannelResponse,
  FundChannelsPayload: () => FundChannelsPayload,
  FundChannelsResponse: () => FundChannelsResponse,
  GetChannelPayload: () => GetChannelPayload,
  GetChannelResponse: () => GetChannelResponse,
  GetChannelsResponse: () => GetChannelsResponse,
  GetTicketsResponse: () => GetTicketsResponse,
  OpenChannelsPayload: () => OpenChannelsPayload,
  OpenChannelsResponse: () => OpenChannelsResponse,
  PeerIdPayload: () => PeerIdPayload,
  Ticket: () => Ticket
});
module.exports = __toCommonJS(channels_exports);
var import_zod = require("zod");
var import_general = require("./general");
const PeerIdPayload = import_general.BasicAuthenticationPayload.extend({
  peerId: import_zod.z.string()
});
const FundChannelsPayload = import_general.BasicAuthenticationPayload.extend({
  peerId: import_zod.z.string(),
  outgoingAmount: import_zod.z.string(),
  incomingAmount: import_zod.z.string()
});
const FundChannelsResponse = import_zod.z.object({
  receipt: import_zod.z.string()
});
const OpenChannelsPayload = import_general.BasicAuthenticationPayload.extend({
  peerId: import_zod.z.string(),
  amount: import_zod.z.string()
});
const OpenChannelsResponse = import_zod.z.object({
  channelId: import_zod.z.string(),
  receipt: import_zod.z.string()
});
const Channel = import_zod.z.object({
  type: import_zod.z.enum(["incoming", "outgoing"]),
  channelId: import_zod.z.string(),
  peerId: import_zod.z.string(),
  status: import_zod.z.enum(["WaitingForCommitment", "Open", "PendingToClose", "Closed"]),
  balance: import_zod.z.string()
});
const GetChannelsResponse = import_zod.z.object({
  incoming: import_zod.z.array(Channel),
  outgoing: import_zod.z.array(Channel)
});
const Ticket = import_zod.z.object({
  counterparty: import_zod.z.string(),
  challenge: import_zod.z.string(),
  epoch: import_zod.z.string(),
  index: import_zod.z.string(),
  amount: import_zod.z.string(),
  winProb: import_zod.z.string(),
  channelEpoch: import_zod.z.string(),
  signature: import_zod.z.string()
});
const GetTicketsResponse = import_zod.z.array(Ticket);
const CloseChannelPayload = import_general.BasicAuthenticationPayload.extend({
  peerId: import_zod.z.string(),
  direction: import_zod.z.enum(["incoming", "outgoing"])
});
const CloseChannelResponse = import_zod.z.object({
  receipt: import_zod.z.string().optional(),
  channelStatus: import_zod.z.string()
});
const GetChannelPayload = import_general.BasicAuthenticationPayload.extend({
  peerId: import_zod.z.string(),
  direction: import_zod.z.enum(["incoming", "outgoing"])
});
const GetChannelResponse = Channel;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Channel,
  CloseChannelPayload,
  CloseChannelResponse,
  FundChannelsPayload,
  FundChannelsResponse,
  GetChannelPayload,
  GetChannelResponse,
  GetChannelsResponse,
  GetTicketsResponse,
  OpenChannelsPayload,
  OpenChannelsResponse,
  PeerIdPayload,
  Ticket
});
