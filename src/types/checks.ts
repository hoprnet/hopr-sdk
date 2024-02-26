import { z } from 'zod';
import { BasePayload } from './general';

/**
 * Check whether the node is healthy
 */

export const IsNodeHealthyPayload = BasePayload;

export type IsNodeHealthyPayloadType = z.infer<typeof IsNodeHealthyPayload>;

export const IsNodeHealthyResponse = z.boolean();

export type IsNodeHealthyResponseType = z.infer<typeof IsNodeHealthyResponse>;

/**
 * Check whether the node is ready to accept connections.
 */

export const IsNodeReadyPayload = BasePayload;

export type IsNodeReadyPayloadType = z.infer<typeof IsNodeReadyPayload>;

export const IsNodeReadyResponse = z.boolean();

export type IsNodeReadyResponseType = z.infer<typeof IsNodeReadyResponse>;

/**
 * Check whether the node is ready to accept connections.
 */

export const IsNodeStartedPayload = BasePayload;

export type IsNodeStartedPayloadType = z.infer<typeof IsNodeStartedPayload>;

export const IsNodeStartedResponse = z.boolean();

export type IsNodeStartedResponseType = z.infer<typeof IsNodeStartedResponse>;
