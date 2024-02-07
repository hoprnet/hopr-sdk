import { closeChannel } from '../api/channels';
import { BasePayloadType } from '../types/general';
import { getStatistics, redeemTickets } from '../api/tickets';
import { getOutgoingChannels } from './getOutgoingChannels';

/**
 * Closes all open outgoing channels and redeems any pending tickets.
 * This is a long running function and may take a more than 5 minutes to run
 */
export const closeEverything = async (payload: BasePayloadType) => {
  const outgoingChannels = await getOutgoingChannels({
    apiEndpoint: payload.apiEndpoint,
    apiToken: payload.apiToken,
    timeout: payload.timeout,
    status: 'Open'
  });
  const closedChannels = [];
  // close outgoing open channels
  if (outgoingChannels?.length) {
    for (const channel of outgoingChannels) {
      const closedChannel = await closeChannel({
        apiEndpoint: payload.apiEndpoint,
        apiToken: payload.apiToken,
        timeout: payload.timeout,
        channelId: channel.id
      });
      if (closedChannel) {
        closedChannels.push(closedChannel);
      }
    }
  }

  const statistics = await getStatistics({
    apiEndpoint: payload.apiEndpoint,
    apiToken: payload.apiToken,
    timeout: payload.timeout
  });
  let ticketsHaveBeenRedeemed = false;

  // check if we have unredeemed tickets
  if (statistics?.unredeemed) {
    // redeem tickets
    ticketsHaveBeenRedeemed =
      (await redeemTickets({
        apiEndpoint: payload.apiEndpoint,
        apiToken: payload.apiToken,
        timeout: payload.timeout
      })) ?? false;
  }

  return {
    closedChannels,
    redeemedTickets: ticketsHaveBeenRedeemed
  };
};
