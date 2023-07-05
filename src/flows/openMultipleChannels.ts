import { OpenMultipleChannelsPayloadType } from '../types/flows';
import { openChannel } from '../api/channels';
import { getBalances, withdraw } from '../api/account';
import { createLogger } from '../utils';

const log = createLogger('flows', 'openMultipleChannels');

const ETH_TO_WEI = 1e18;

// minimum amount of balance needed to do a transaction on gnosis chain
const MINIMUM_GNOSIS_GAS = BigInt(0.01 * ETH_TO_WEI);

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
