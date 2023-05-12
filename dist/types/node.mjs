import { z } from "zod";
const GetPeersPayload = z.object({
  quality: z.number()
});
const Peer = z.object({
  peerId: z.string(),
  multiAddr: z.string(),
  heartbeats: z.object({
    sent: z.number(),
    success: z.number()
  }),
  lastSeen: z.number(),
  quality: z.number(),
  backoff: z.number(),
  isNew: z.boolean()
});
const GetPeersResponse = z.object({
  connected: z.array(Peer),
  announced: z.array(Peer)
});
const GetInfoResponse = z.object({
  environment: z.string(),
  announcedAddress: z.string().array(),
  listeningAddress: z.string().array(),
  network: z.string(),
  hoprToken: z.string(),
  hoprChannels: z.string(),
  hoprNetworkRegistryAddress: z.string().optional(),
  connectivityStatus: z.string(),
  isEligible: z.boolean(),
  channelClosurePeriod: z.number()
});
const nodeSchema = z.object({
  multiaddrs: z.array(z.string()),
  isEligible: z.boolean()
});
const GetEntryNodesResponse = z.record(nodeSchema);
const PingNodePayload = z.object({
  peerId: z.string()
});
const PingNodeResponse = z.object({
  latency: z.number()
});
export {
  GetEntryNodesResponse,
  GetInfoResponse,
  GetPeersPayload,
  GetPeersResponse,
  Peer,
  PingNodePayload,
  PingNodeResponse
};
