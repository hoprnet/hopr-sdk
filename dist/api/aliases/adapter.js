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
var adapter_exports = {};
__export(adapter_exports, {
  AliasesAdapter: () => AliasesAdapter
});
module.exports = __toCommonJS(adapter_exports);
var import_getAlias = require("./getAlias");
var import_getAliases = require("./getAliases");
var import_removeAlias = require("./removeAlias");
var import_setAlias = require("./setAlias");
class AliasesAdapter {
  /**
   * Creates a new instance of the `AliasesAdapter` class.
   * @param url - The URL of the API server.
   * @param apiKey - The API key to use for authentication.
   */
  constructor(url, apiKey) {
    this.url = url;
    this.apiKey = apiKey;
  }
  /**
   * Get all aliases you set previously and their corresponding peer IDs.
   *
   * @returns An object with alias names as keys and the peerId associated with the alias.
   */
  getAliases() {
    return (0, import_getAliases.getAliases)({ url: this.url, apiKey: this.apiKey });
  }
  /**
   * Instead of using HOPR address, we can assign HOPR address to a specific name called alias.
   * Give an address a more memorable alias and use it instead of Hopr address.
   * Aliases are kept locally and are not saved or shared on the network.
   *
   * @param payload - A object containing the peer ID and alias to link.
   * @returns A Promise that resolves to true if alias succesfully linked to peerId.
   */
  setAlias(payload) {
    return (0, import_setAlias.setAlias)({
      url: this.url,
      apiKey: this.apiKey,
      alias: payload.alias,
      peerId: payload.peerId
    });
  }
  /**
   * Get the PeerId (Hopr address) that have this alias assigned to it.
   *
   * @param payload - An object containing the alias to retrieve the peer ID for.
   * @returns A promise that resolves to the peer ID associated with the alias.
   */
  getAlias(payload) {
    return (0, import_getAlias.getAlias)({
      url: this.url,
      apiKey: this.apiKey,
      alias: payload.alias
    });
  }
  /**
   * Unassign an alias from a PeerId.
   *
   * @param payload - The payload containing the details of the alias to remove.
   * @returns A Promise that resolves to true if the alias was successfully removed.
   */
  removeAlias(payload) {
    return (0, import_removeAlias.removeAlias)({
      url: this.url,
      apiKey: this.apiKey,
      alias: payload.alias
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AliasesAdapter
});
