import { string, z } from "zod";
const GetPeerInfoPayload = z.object({
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
