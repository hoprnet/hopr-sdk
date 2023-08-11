import { GetOutgoingChannelsPayloadType } from '../types/flows';

import { getChannels } from '../api/channels';

/**
 * Gets the outgoing channels with optional status filter.
 * @param status - Optional status filter.
 * @returns An array of outgoing channels matching the status filter.
 */
export const getOutgoingChannels = async (
  payload: GetOutgoingChannelsPayloadType
) => {
  const channels = await getChannels({
    apiEndpoint: payload.apiEndpoint,
    apiToken: payload.apiToken,
    timeout: payload.timeout
  });

  // filter outgoing channels by status
  const outgoingChannels = payload.status
    ? channels?.outgoing.filter((ch) => ch.status === payload.status)
    : channels?.outgoing;

  return outgoingChannels;
};
