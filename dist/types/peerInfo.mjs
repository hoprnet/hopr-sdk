import { string, z } from "zod";
import { BasicAuthenticationPayload } from "./general";
const GetPeerInfoPayload = BasicAuthenticationPayload.extend({
  peerId: string()
});
const GetPeerInfoResponse = z.object({
  announced: z.string().array(),
  observed: z.string().array()
});
export {
  GetPeerInfoPayload,
  GetPeerInfoResponse
};
