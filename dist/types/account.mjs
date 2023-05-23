import { z } from "zod";
import { BasicAuthenticationPayload } from "./general";
const AccountResponse = z.object({
  hopr: z.string(),
  native: z.string()
});
const WithdrawPayload = BasicAuthenticationPayload.extend({
  currency: z.enum(["NATIVE", "HOPR"]),
  amount: z.string(),
  recipient: z.string()
});
const WithdrawResponse = z.object({
  receipt: z.string()
});
export {
  AccountResponse,
  WithdrawPayload,
  WithdrawResponse
};
