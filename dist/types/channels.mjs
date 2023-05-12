import { z } from "zod";
const PeerIdPayload = z.object({
  peerId: z.string()
});
const FundChannelsPayload = z.object({
  peerId: z.string(),
  outgoingAmount: z.string(),
  incomingAmount: z.string()
});
const FundChannelsResponse = z.object({
  receipt: z.string()
});
const OpenChannelsPayload = z.object({
  peerId: z.string(),
  amount: z.string()
});
const OpenChannelsResponse = z.object({
  channelId: z.string(),
  receipt: z.string()
});
const Channel = z.object({
  type: z.enum(["incoming", "outgoing"]),
  channelId: z.string(),
  peerId: z.string(),
  status: z.enum(["WaitingForCommitment", "Open", "PendingToClose", "Closed"]),
  balance: z.string()
});
const GetChannelsResponse = z.object({
  incoming: z.array(Channel),
  outgoing: z.array(Channel)
});
const Ticket = z.object({
  counterparty: z.string(),
  challenge: z.string(),
  epoch: z.string(),
  index: z.string(),
  amount: z.string(),
  winProb: z.string(),
  channelEpoch: z.string(),
  signature: z.string()
});
const GetTicketsResponse = z.array(Ticket);
const CloseChannelPayload = z.object({
  peerId: z.string(),
  direction: z.enum(["incoming", "outgoing"])
});
const CloseChannelResponse = z.object({
  receipt: z.string().optional(),
  channelStatus: z.string()
});
const GetChannelPayload = z.object({
  peerId: z.string(),
  direction: z.enum(["incoming", "outgoing"])
});
const GetChannelResponse = Channel;
export {
  Channel,
  CloseChannelPayload,
  CloseChannelResponse,
  FundChannelsPayload,
  FundChannelsResponse,
  GetChannelPayload,
  GetChannelResponse,
  GetChannelsResponse,
  GetTicketsResponse,
  OpenChannelsPayload,
  OpenChannelsResponse,
  PeerIdPayload,
  Ticket
};
