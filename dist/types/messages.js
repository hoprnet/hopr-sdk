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
var messages_exports = {};
__export(messages_exports, {
  SendMessagePayload: () => SendMessagePayload,
  SignPayload: () => SignPayload,
  SignResponse: () => SignResponse
});
module.exports = __toCommonJS(messages_exports);
var import_zod = require("zod");
var import_general = require("./general");
const SignPayload = import_general.BasicAuthenticationPayload.extend({
  message: import_zod.z.string()
});
const SignResponse = import_zod.z.object({
  signature: import_zod.z.string()
});
const SendMessagePayload = import_general.BasicAuthenticationPayload.extend({
  body: import_zod.z.string(),
  recipient: import_zod.z.string(),
  path: import_zod.z.array(import_zod.z.string()).optional(),
  hops: import_zod.z.number().optional()
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SendMessagePayload,
  SignPayload,
  SignResponse
});
