import { z } from "zod";
const accountResponse = z.object({
  hopr: z.string(),
  native: z.string()
});
const withdrawPayload = z.object({
  currency: z.enum(["NATIVE", "HOPR"]),
  amount: z.string(),
  recipient: z.string()
});
const withdrawResponse = z.object({
  receipt: z.string()
});
export {
  accountResponse,
  withdrawPayload,
  withdrawResponse
};
