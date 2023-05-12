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
var getMetrics_exports = {};
__export(getMetrics_exports, {
  getMetrics: () => getMetrics
});
module.exports = __toCommonJS(getMetrics_exports);
var import_cross_fetch = __toESM(require("cross-fetch"));
var import_types = require("../../types");
var import_utils = require("../../utils");
const getMetrics = async (url, apiKey) => {
  const headersForMetrics = (0, import_utils.getHeaders)(apiKey);
  headersForMetrics.set("Accept-Content", "text/plain");
  const rawResponse = await (0, import_cross_fetch.default)(`${url}/api/v2/node/metrics`, {
    method: "GET",
    headers: headersForMetrics
  });
  if (rawResponse.status === 200) {
    const textResponse = await rawResponse.text();
    return textResponse;
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
  getMetrics
});
