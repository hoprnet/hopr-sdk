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
 * setSession
 */

export const SetSessionPayloadCall = BasePayload.extend({
  capabilities: SessionCapabilities.array(),
  destination: z.string(),
  listenHost: z.string(),
  path: z.object({
    Hops: z.number()
  }),
  target: z.object({
    Plain: z.string()
  })
});

export const SetSessionPayload = SetSessionPayloadCall.extend({
  protocol: SessionProtocols
});

export type SetSessionPayloadCallType = z.infer<typeof SetSessionPayloadCall>;
export type SetSessionPayloadType = z.infer<typeof SetSessionPayload>;
export const SetSessionResponse = SessionPayload;
export type SetSessionResponseType = SessionPayloadType;

/**
 * getAlias
 */

// export const GetAliasResponse = z.object({ peerId: z.string() });

// export type GetAliasResponseType = z.infer<typeof GetAliasResponse>;

// export type SetSessionPayloadType = z.infer<typeof SetSessionPayload>;

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

// export const CloseSessionResponse = z.object({ peerId: z.string() });

// export type CloseSessionResponseType = z.infer<typeof GetAliasResponse>;
