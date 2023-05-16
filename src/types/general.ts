import { ZodType, z } from 'zod';

/**
 * Converts a ZodType to its inferred TypeScript type.
 */
export type ZodToType<T extends ZodType<any, any, any>> = z.infer<T>;

/**
 * Represents the payload needed to interact with hoprd node.
 */
export const BasicAuthenticationPayload = z.object({
  /**
   * The URL for authentication.
   */
  url: z.string(),

  /**
   * The API key for authentication.
   */
  apiKey: z.string()
});

/**
 * Represents the inferred TypeScript type from BasicAuthenticationPayload.
 */
export type BasicAuthenticationPayloadType = ZodToType<
  typeof BasicAuthenticationPayload
>;

/**
 * Removes the basic authentication properties from a payload type.
 * @typeparam T - The payload type from which to remove the properties.
 */
export type RemoveBasicAuthenticationPayloadType<
  T extends BasicAuthenticationPayloadType
> = Pick<T, Exclude<keyof T, 'url' | 'apiKey'>>;
