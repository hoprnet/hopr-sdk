import { z } from "zod";
const BasicAuthenticationPayload = z.object({
  /**
   * The URL for authentication.
   */
  url: z.string(),
  /**
   * The API key for authentication.
   */
  apiKey: z.string()
});
export {
  BasicAuthenticationPayload
};
