import { ZodType, z } from 'zod';

/**
 * Converts a ZodType to its inferred TypeScript type.
 */
type ZodToType<T extends ZodType<any, any, any>> = z.infer<T>;
/**
 * Represents the payload needed to interact with hoprd node.
 */
declare const BasicAuthenticationPayload: z.ZodObject<{
    /**
     * The URL for authentication.
     */
    url: z.ZodString;
    /**
     * The API key for authentication.
     */
    apiKey: z.ZodString;
}, "strip", z.ZodTypeAny, {
    url: string;
    apiKey: string;
}, {
    url: string;
    apiKey: string;
}>;
/**
 * Represents the inferred TypeScript type from BasicAuthenticationPayload.
 */
type BasicAuthenticationPayloadType = ZodToType<typeof BasicAuthenticationPayload>;
/**
 * Removes the basic authentication properties from a payload type.
 * @typeparam T - The payload type from which to remove the properties.
 */
type RemoveBasicAuthenticationPayloadType<T extends BasicAuthenticationPayloadType> = Pick<T, Exclude<keyof T, 'url' | 'apiKey'>>;

export { BasicAuthenticationPayload, BasicAuthenticationPayloadType, RemoveBasicAuthenticationPayloadType, ZodToType };
