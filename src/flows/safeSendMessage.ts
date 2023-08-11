import { SendMessagePayloadType } from '../types/messages';
import { sendMessage } from '../api/messages';
import { getOutgoingChannels } from './getOutgoingChannels';
import { createLogger } from '../utils';

const log = createLogger('flows', 'safeSendMessage');

/**
 * Safely send a message through the network. Checks if node has at least
 * one open outgoing channel
 * @param payload - The payload of the message.
 */
export const safeSendMessage = async (
  // receive same payload as sendMessage function
  payload: SendMessagePayloadType
) => {
  const outgoingChannels = await getOutgoingChannels({
    apiEndpoint: payload.apiEndpoint,
    apiToken: payload.apiToken,
    timeout: payload.timeout,
    status: 'Open'
  });

  // has at least one outgoing channel
  if (!outgoingChannels?.length) {
    log.debug('could not find one outgoing channel that is open');
    return;
  }

  return await sendMessage(payload);
};
