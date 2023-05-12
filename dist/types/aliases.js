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
var aliases_exports = {};
__export(aliases_exports, {
  aliasPayload: () => aliasPayload,
  getAliasResponse: () => getAliasResponse,
  getAliasesResponse: () => getAliasesResponse,
  setAliasPayload: () => setAliasPayload
});
module.exports = __toCommonJS(aliases_exports);
var import_zod = require("zod");
const aliasPayload = import_zod.z.object({
  alias: import_zod.z.string()
});
const getAliasesResponse = import_zod.z.record(import_zod.z.string());
const setAliasPayload = import_zod.z.object({
  peerId: import_zod.z.string(),
  alias: import_zod.z.string()
});
const getAliasResponse = import_zod.z.object({ peerId: import_zod.z.string() });
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  aliasPayload,
  getAliasResponse,
  getAliasesResponse,
  setAliasPayload
});
