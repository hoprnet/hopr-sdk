import z from 'zod';

/**
 * generateWsUrl
 */

export const GenerateWsUrlPayload = z.object({
  /**
   * The API endpoint for authentication.
   */
  apiEndpoint: z.string(),

  /**
   * The API token for authentication.
   */
  apiToken: z.string(),

  /**
   * optional path for the websocker
   */
  path: z.string().optional()
});

export type GenerateWsUrlType = z.infer<typeof GenerateWsUrlPayload>;
