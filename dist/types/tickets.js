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
var tickets_exports = {};
__export(tickets_exports, {
  GetStatisticsResponse: () => GetStatisticsResponse,
  GetTicketsResponse: () => GetTicketsResponse
});
module.exports = __toCommonJS(tickets_exports);
var import_zod = require("zod");
const GetStatisticsResponse = import_zod.z.object({
  pending: import_zod.z.number(),
  unredeemed: import_zod.z.number(),
  unredeemedValue: import_zod.z.string(),
  redeemed: import_zod.z.number(),
  redeemedValue: import_zod.z.string(),
  losingTickets: import_zod.z.number(),
  winProportion: import_zod.z.number(),
  neglected: import_zod.z.number(),
  rejected: import_zod.z.number(),
  rejectedValue: import_zod.z.string()
});
const GetTicketsResponse = import_zod.z.object({
  counterparty: import_zod.z.string(),
  challenge: import_zod.z.string(),
  epoch: import_zod.z.string(),
  index: import_zod.z.string(),
  amount: import_zod.z.string(),
  winProb: import_zod.z.string(),
  channelEpoch: import_zod.z.string(),
  signature: import_zod.z.string()
}).array();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetStatisticsResponse,
  GetTicketsResponse
});
