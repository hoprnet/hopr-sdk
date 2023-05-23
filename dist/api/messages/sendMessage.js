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
var sendMessage_exports = {};
__export(sendMessage_exports, {
  sendMessage: () => sendMessage
});
module.exports = __toCommonJS(sendMessage_exports);
var import_cross_fetch = __toESM(require("cross-fetch"));
var import_utils = require("../../utils");
var import_types = require("../../types");
const sendMessage = async (payload) => {
  if (!payload.path && !payload.hops)
    throw new Error("No path or number of hops provided.");
  const body = {
    body: payload.body,
    recipient: payload.recipient,
    hops: payload.hops,
    path: payload.path
  };
  const rawResponse = await (0, import_cross_fetch.default)(`${payload.url}/api/v2/messages`, {
    method: "POST",
    headers: (0, import_utils.getHeaders)(payload.apiKey),
    body: JSON.stringify(body)
  });
  if (rawResponse.status === 202) {
    return await rawResponse.text();
  } else if (rawResponse.status > 499) {
    throw new import_utils.APIError({
      status: rawResponse.status.toString(),
      error: rawResponse.statusText
    });
  } else {
    const jsonResponse = await rawResponse.json();
    throw new import_utils.APIError(import_types.Error.parse(jsonResponse));
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  sendMessage
});
