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
var account_exports = {};
__export(account_exports, {
  accountResponse: () => accountResponse,
  withdrawPayload: () => withdrawPayload,
  withdrawResponse: () => withdrawResponse
});
module.exports = __toCommonJS(account_exports);
var import_zod = require("zod");
const accountResponse = import_zod.z.object({
  hopr: import_zod.z.string(),
  native: import_zod.z.string()
});
const withdrawPayload = import_zod.z.object({
  currency: import_zod.z.enum(["NATIVE", "HOPR"]),
  amount: import_zod.z.string(),
  recipient: import_zod.z.string()
});
const withdrawResponse = import_zod.z.object({
  receipt: import_zod.z.string()
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  accountResponse,
  withdrawPayload,
  withdrawResponse
});
