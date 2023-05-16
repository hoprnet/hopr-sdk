import { ZodType, z } from 'zod';

export type ZodToType<T extends ZodType<any, any, any>> = z.infer<T>;

export const BasicAuthenticationPayload = z.object({
  url: z.string(),
  apiKey: z.string()
});

/**
 * Payload needed to interact with hoprd node
 */
export type BasicAuthenticationPayloadType = ZodToType<
  typeof BasicAuthenticationPayload
>;

/**
 * Removes basic authentication type from generic type
 */
export type RemoveBasicAuthenticationPayloadType<
  T extends BasicAuthenticationPayloadType
> = Pick<T, Exclude<keyof T, 'url' | 'apiKey'>>;
