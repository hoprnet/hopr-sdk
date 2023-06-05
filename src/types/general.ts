import { z } from 'zod';

/**
 * Represents the minimum payload needed to interact with hoprd node.
 */
export const BasePayload = z.object({
  /**
   * The API endpoint for authentication.
   */
  apiEndpoint: z.string(),

  /**
   * The API token for authentication.
   */
  apiToken: z.string(),

  /**
   * optional timeout for the requests
   */
  timeout: z.number().optional()
});

/**
 * Represents the inferred TypeScript type from BasicAuthenticationPayload.
 */
export type BasePayloadType = z.infer<typeof BasePayload>;

/**
 * Removes the basic authentication properties from a payload type.
 * @typeparam T - The payload type from which to remove the properties.
 */
export type RemoveBasicAuthenticationPayloadType<T extends BasePayloadType> =
  Pick<T, Exclude<keyof T, 'apiEndpoint' | 'apiToken' | 'timeout'>>;
