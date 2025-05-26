import { z } from 'zod';
import { BasePayload } from './general';

/**
 * General
 */

const SessionProtocols = z.enum(['udp', 'tcp']);
const SessionCapabilities = z.enum(['Retransmission', 'Segmentation']);

export const SessionPayload = z.object({
  ip: z.string(),
  port: z.number(),
  protocol: SessionProtocols,
  target: z.string(),
  path: z.object({
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
  path: z.object({
    Hops: z.number().optional(),
    IntermediatePath: z.array(z.string()).optional()
  }),
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
