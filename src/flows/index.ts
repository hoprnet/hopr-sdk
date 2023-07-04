import { createLogger } from '../utils';
import {
  CashOutPayloadType,
  GetOutgoingChannelsPayloadType,
  OpenMultipleChannelsPayloadType
} from '../types/flows';
import { closeChannel, getChannels, openChannel } from '../api/channels';
import { SendMessagePayloadType } from '../types/messages';
import { sendMessage } from '../api/messages';
import { BasePayloadType } from '../../dist';
import { getStatistics, redeemTickets } from '../api/tickets';
import { getBalances, withdraw } from '../api/account';

const log = createLogger('flows');

const ETH_TO_WEI = 1e18;

// minimum amount of balance needed to do a transaction on gnosis chain
const MINIMUM_GNOSIS_GAS = BigInt(0.01 * ETH_TO_WEI);

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
        direction: 'outgoing',
        peerId: channel.peerId
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

  // check if we have pending tickets
  if (statistics?.pending) {
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

/**
 * Withdraw all funds from the node.
 * Does not include funds locked in open channels and pending tickets.
 * This is a long running function and may take a more than 5 minutes to run
 * @param recipient - The address of the recipient.
 * @returns The transaction receipts for the cash out transactions.
 */
export const cashOut = async (payload: CashOutPayloadType) => {
  // get balance to proceed to withdraw that balance
  const balance = await getBalances({
    apiEndpoint: payload.apiEndpoint,
    apiToken: payload.apiToken,
    timeout: payload.timeout
  });
  const receipts: { native?: string; hopr?: string } = {};

  if (balance?.native && !!BigInt(balance?.native)) {
    const transferNativeFunds = await withdraw({
      apiEndpoint: payload.apiEndpoint,
      apiToken: payload.apiToken,
      timeout: payload.timeout,
      recipient: payload.recipient,
      amount: balance?.native,
      currency: 'NATIVE'
    });
    receipts.native = transferNativeFunds;
  }

  if (balance?.hopr && !!BigInt(balance?.hopr)) {
    const transferHoprFunds = await withdraw({
      apiEndpoint: payload.apiEndpoint,
      apiToken: payload.apiToken,
      timeout: payload.timeout,
      recipient: payload.recipient,
      amount: balance?.hopr,
      currency: 'HOPR'
    });
    receipts.hopr = transferHoprFunds;
  }

  return receipts;
};

export const openMultipleChannels = async (
  payload: OpenMultipleChannelsPayloadType
) => {
  const amountBN = BigInt(payload.amount);

  const balance = await getBalances({
    apiEndpoint: payload.apiEndpoint,
    apiToken: payload.apiToken,
    timeout: payload.timeout
  });

  // Convert the balances into BigInt constants
  const hoprBalanceBN = BigInt(balance.hopr);
  const nativeBalanceBN = BigInt(balance.native);

  // The HOPR balance needed to open the channels is equivalent to the `<Amount to fund each channel> * <The number of channels to open>`
  const sumOfHoprBalanceExpectedInFunds =
    amountBN * BigInt(payload.peerIds.length);

  const nodeHasEnoughHoprBalance =
    hoprBalanceBN >= sumOfHoprBalanceExpectedInFunds;

  // The NATIVE balance needed to open the channels is equivalent to the `<Gnosis minimum gas> * <The number of channels to open>`
  const sumOfNativeBalanceExpectedInFunds =
    MINIMUM_GNOSIS_GAS * BigInt(payload.peerIds.length);

  const nodeHasEnoughNativeBalance =
    nativeBalanceBN >= sumOfNativeBalanceExpectedInFunds;

  if (!nodeHasEnoughHoprBalance || !nodeHasEnoughNativeBalance) {
    log.debug(
      `Node does not have enough HOPR balance to fund channels it needs: ${String(
        sumOfHoprBalanceExpectedInFunds
      )}, and has: ${String(
        hoprBalanceBN
      )} or does not have enough NATIVE balance, to open Channels it needs: ${String(
        sumOfNativeBalanceExpectedInFunds
      )}, and has: ${String(nativeBalanceBN)}`
    );

    return;
  }

  // Open channels for each peerId and gather the promises
  const openChannelPromises = payload.peerIds.map(async (peerId) => {
    try {
      const { receipt, channelId } = await openChannel({
        apiEndpoint: payload.apiEndpoint,
        apiToken: payload.apiToken,
        timeout: payload.timeout,
        peerId,
        amount: payload.amount
      });
      return { peerId, receipt: receipt, channelId };
    } catch (error) {
      return { peerId, receipt: null, channelId: '' }; // Set channelId as an empty string in case of an error
    }
  });

  // Use Promise.allSettled to wait for all the promises to settle
  const results = await Promise.allSettled(openChannelPromises);

  // Filter out the fulfilled results and return an object with receipts and channelId keyed by peerId
  const receipts: {
    [peerId: string]: { channelId: string; receipt: string };
  } = {};
  results.forEach((result) => {
    if (result.status === 'fulfilled' && result.value.receipt) {
      const { peerId, receipt, channelId } = result.value;
      receipts[peerId] = { channelId, receipt };
    }
  });

  return receipts;
};
