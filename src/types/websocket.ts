import z from 'zod';

/**
 * getWsUrl
 */

  export const GetWsUrlPayload = z.object({
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
  

  export type GetWsUrlType = z.infer<typeof GetWsUrlPayload>;