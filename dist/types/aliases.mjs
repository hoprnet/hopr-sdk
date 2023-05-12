import { z } from "zod";
const aliasPayload = z.object({
  alias: z.string()
});
const getAliasesResponse = z.record(z.string());
const setAliasPayload = z.object({
  peerId: z.string(),
  alias: z.string()
});
const getAliasResponse = z.object({ peerId: z.string() });
export {
  aliasPayload,
  getAliasResponse,
  getAliasesResponse,
  setAliasPayload
};
