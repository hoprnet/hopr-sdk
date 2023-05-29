import { ZodType, z } from 'zod';

/**
 * Converts a ZodType to its inferred TypeScript type.
 */
export type ZodToType<T extends ZodType<any, any, any>> = z.infer<T>;

/**
 * Represents the minimum payload needed to interact with hoprd node.
 */
export const BasePayload = z.object({
  /**
   * The URL for authentication.
   */
  url: z.string(),

  /**
   * The API key for authentication.
   */
  apiKey: z.string(),

  /**
   * optional timeout for the requests
   */
  timeout: z.number().optional()
});

/**
 * Represents the inferred TypeScript type from BasicAuthenticationPayload.
 */
export type BasePayloadType = ZodToType<typeof BasePayload>;

/**
 * Removes the basic authentication properties from a payload type.
 * @typeparam T - The payload type from which to remove the properties.
 */
export type RemoveBasicAuthenticationPayloadType<T extends BasePayloadType> =
  Pick<T, Exclude<keyof T, 'url' | 'apiKey' | 'timeout'>>;
