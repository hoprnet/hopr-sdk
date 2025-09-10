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
  'NoRateControl',
]);

export const SessionPayload = z.object({
  ip: z.string(),
  port: z.number(),
  protocol: SessionProtocols,
  target: z.string(),
  destination: z.string(),
  hoprMtu: z.number(),
  surbLen: z.number(),
  activeClients: z.array(z.string()),
  forwardPath: z.object({
    Hops: z.number().optional(),
    IntermediatePath: z.array(z.string()).optional()
  }),
  returnPath: z.object({
    Hops: z.number().optional(),
    IntermediatePath: z.array(z.string()).optional()
  })
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
  capabilities: SessionCapabilities.array(),
  destination: z.string(),
  listenHost: z.string(),
  forwardPath: z.object({
    Hops: z.number().optional(),
    IntermediatePath: z.array(z.string()).optional()
  }),
  returnPath: z.object({
    Hops: z.number().optional(),
    IntermediatePath: z.array(z.string()).optional()
  }),
  maxClientSessions: z.number().nullable().optional(),
  maxSurbUpstream: z.string().optional(),
  responseBuffer: z.string().optional(),
  sessionPool: z.number().max(5).min(0).nullable().optional(),
  target: z.object({
    Plain: z.string()
  })
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

export const GetSessionConfigPayloadCall = BasePayload.extend({
  sessionId: z.string(),
});

const SessionConfig = z.object({
  maxSurbUpstream: z.string(),
  responseBuffer: z.string(),
});

export const GetSessionConfigPayload = SessionConfig;

export type GetSessionConfigPayloadCallType = z.infer<
  typeof GetSessionConfigPayloadCall
>;
export type GetSessionConfigPayloadType = z.infer<typeof GetSessionConfigPayload>;

export const UpdateSessionConfigPayloadCall = GetSessionConfigPayloadCall.extend(SessionConfig.shape);

export const UpdateSessionConfigPayload = SessionConfig;

export type UpdateSessionConfigPayloadCallType = z.infer<
  typeof UpdateSessionConfigPayloadCall
>;
export type UpdateSessionConfigPayloadType = z.infer<typeof UpdateSessionConfigPayload>;

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

// export const CloseSessionResponse = z.object({ listeningIp: z.string(), port: z.number() });

// export type CloseSessionResponseType = z.infer<typeof CloseSessionResponse>;
