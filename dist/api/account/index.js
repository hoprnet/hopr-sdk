"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var account_exports = {};
module.exports = __toCommonJS(account_exports);
__reExport(account_exports, require("./getAddresses"), module.exports);
__reExport(account_exports, require("./getHoprAddress"), module.exports);
__reExport(account_exports, require("./getNativeAddress"), module.exports);
__reExport(account_exports, require("./getBalances"), module.exports);
__reExport(account_exports, require("./getHoprAddress"), module.exports);
__reExport(account_exports, require("./getNativeBalance"), module.exports);
__reExport(account_exports, require("./withdraw"), module.exports);
__reExport(account_exports, require("./adapter"), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ...require("./getAddresses"),
  ...require("./getHoprAddress"),
  ...require("./getNativeAddress"),
  ...require("./getBalances"),
  ...require("./getHoprAddress"),
  ...require("./getNativeBalance"),
  ...require("./withdraw"),
  ...require("./adapter")
});
