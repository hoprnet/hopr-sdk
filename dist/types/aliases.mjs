import { z } from "zod";
import { BasicAuthenticationPayload } from "./general";
const AliasPayload = BasicAuthenticationPayload.extend({
  alias: z.string()
});
const GetAliasesResponse = z.record(z.string());
const SetAliasPayload = BasicAuthenticationPayload.extend({
  peerId: z.string(),
  alias: z.string()
});
const GetAliasResponse = z.object({ peerId: z.string() });
export {
  AliasPayload,
  GetAliasResponse,
  GetAliasesResponse,
  SetAliasPayload
};
