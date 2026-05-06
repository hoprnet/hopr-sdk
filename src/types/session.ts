import { z } from 'zod';
import { BasePayload } from './general';

/**
 * General
 */

const SessionProtocols = z.enum(['udp', 'tcp']);
const SessionCapabilities = z.enum([
  'Retransmission',
  'Segmentation',
  'RetransmissionAckOnly',
  'NoDelay',
  'NoRateControl'
]);

const RoutingOptions = z.object({
  Hops: z.number().optional()
});

const SessionTargetSpec = z.union([
  z.object({ Plain: z.string() }),
  z.object({ Sealed: z.array(z.number()) }),
  z.object({ Service: z.number() })
]);

export const SessionPayload = z.object({
  activeClients: z.array(z.string()),
  destination: z.string(),
  forwardPath: RoutingOptions,
  hoprMtu: z.number(),
  ip: z.string(),
  maxClientSessions: z.number(),
  maxSurbUpstream: z.string().nullable().optional(),
  port: z.number(),
  protocol: SessionProtocols,
  responseBuffer: z.string().nullable().optional(),
  returnPath: RoutingOptions,
  sessionPool: z.number().nullable().optional(),
  surbLen: z.number(),
  target: z.string()
});

export type SessionPayloadType = z.infer<typeof SessionPayload>;

/**
 * getSessions
 */

export const GetSessionsPayload = BasePayload.extend({
  protocol: SessionProtocols
});

export type GetSessionsPayloadType = z.infer<typeof GetSessionsPayload>;

export const GetSessionsResponse = z.array(SessionPayload);

export type GetSessionsResponseType = z.infer<typeof GetSessionsResponse>;

/**
 * OpenSession
 */

export const OpenSessionPayloadCall = BasePayload.extend({
  capabilities: SessionCapabilities.array().nullable().optional(),
  destination: z.string(),
  listenHost: z.string().nullable().optional(),
  forwardPath: RoutingOptions,
  returnPath: RoutingOptions,
  maxClientSessions: z.number().nullable().optional(),
  maxSurbUpstream: z.string().nullable().optional(),
  responseBuffer: z.string().nullable().optional(),
  sessionPool: z.number().max(5).min(0).nullable().optional(),
  target: SessionTargetSpec
});

export const OpenSessionPayload = OpenSessionPayloadCall.extend({
  protocol: SessionProtocols
});

export type OpenSessionPayloadCallType = z.infer<typeof OpenSessionPayloadCall>;
export type OpenSessionPayloadType = z.infer<typeof OpenSessionPayload>;
export const OpenSessionResponse = SessionPayload;
export type OpenSessionResponseType = SessionPayloadType;

/**
 * Session config
 */

export const GetSessionConfigCallPayload = BasePayload.extend({
  sessionId: z.string()
});

const SessionConfig = z.object({
  maxSurbUpstream: z.string().optional(),
  responseBuffer: z.string().optional()
});

export const GetSessionConfigResponse = SessionConfig;

export type GetSessionConfigCallPayloadType = z.infer<
  typeof GetSessionConfigCallPayload
>;
export type GetSessionConfigPayloadResponseType = z.infer<
  typeof GetSessionConfigResponse
>;

export const UpdateSessionConfigCall = GetSessionConfigCallPayload.extend(
  SessionConfig.shape
);

export const UpdateSessionConfig = SessionConfig;

export type UpdateSessionConfigCallType = z.infer<
  typeof UpdateSessionConfigCall
>;
export type UpdateSessionConfigType = z.infer<typeof UpdateSessionConfig>;

/**
 * closeSession
 */

export const CloseSessionPayloadCall = BasePayload.extend({
  listeningIp: z.string(),
  port: z.number()
});

export const CloseSessionPayload = CloseSessionPayloadCall.extend({
  protocol: SessionProtocols
});

export type CloseSessionPayloadCallType = z.infer<
  typeof CloseSessionPayloadCall
>;
export type CloseSessionPayloadType = z.infer<typeof CloseSessionPayload>;
