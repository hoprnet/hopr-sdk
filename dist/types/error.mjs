import { z } from "zod";
const Error = z.object({
  status: z.string().optional(),
  error: z.string().optional()
});
export {
  Error
};
