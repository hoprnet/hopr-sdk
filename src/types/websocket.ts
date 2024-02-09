import z from 'zod';

/**
 * createWsUrl
 */

export const createWsUrlPayload = z.object({
  /**
   * The API endpoint for authentication.
   */
  apiEndpoint: z.string().url().or(z.custom<URL>()),

  /**
   * optional path for the websocker
   */
  path: z.string().optional()
});

export type createWsUrlType = z.infer<typeof createWsUrlPayload>;
