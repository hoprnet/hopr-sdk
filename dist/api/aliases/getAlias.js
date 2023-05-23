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
var getAlias_exports = {};
__export(getAlias_exports, {
  getAlias: () => getAlias
});
module.exports = __toCommonJS(getAlias_exports);
var import_cross_fetch = __toESM(require("cross-fetch"));
var import_utils = require("../../utils");
var import_types = require("../../types");
const getAlias = async (url, apiKey, body) => {
  const rawResponse = await (0, import_cross_fetch.default)(`${url}/api/v2/aliases/${body.alias}`, {
    method: "GET",
    headers: (0, import_utils.getHeaders)(apiKey)
  });
  const jsonResponse = await rawResponse.json();
  const parsedRes = import_types.getAliasResponse.safeParse(jsonResponse);
  if (rawResponse.status === 200 && parsedRes.success) {
    return parsedRes.data.peerId;
  } else if (rawResponse.status > 499) {
    throw new import_utils.APIError({
      status: rawResponse.status.toString(),
      error: rawResponse.statusText
    });
  } else {
    throw new import_utils.APIError(import_types.Error.parse(jsonResponse));
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getAlias
});