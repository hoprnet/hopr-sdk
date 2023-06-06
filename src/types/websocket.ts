import z from 'zod';

/**
 * createApiUrl
 */

export const CreateApiUrlPayload = z.object({
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

export type CreateApiUrlType = z.infer<typeof CreateApiUrlPayload>;
