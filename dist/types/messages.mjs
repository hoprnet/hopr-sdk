import { z } from "zod";
import { BasicAuthenticationPayload } from "./general";
const SignPayload = BasicAuthenticationPayload.extend({
  message: z.string()
});
const SignResponse = z.object({
  signature: z.string()
});
const SendMessagePayload = BasicAuthenticationPayload.extend({
  body: z.string(),
  recipient: z.string(),
  path: z.array(z.string()).optional(),
  hops: z.number().optional()
});
export {
  SendMessagePayload,
  SignPayload,
  SignResponse
};
