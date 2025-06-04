import { OpenMultipleChannelsPayloadType } from '../types/flows';
import { openChannel } from '../api/channels';
import { getBalances } from '../api/account';
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
    amountBN * BigInt(payload.peerAddresses.length);

  const nodeHasEnoughHoprBalance =
    hoprBalanceBN >= sumOfHoprBalanceExpectedInFunds;

  // The NATIVE balance needed to open the channels is equivalent to the `<Gnosis minimum gas> * <The number of channels to open>`
  const sumOfNativeBalanceExpectedInFunds =
    MINIMUM_GNOSIS_GAS * BigInt(payload.peerAddresses.length);

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

  // Open channels for each node address and gather the promises
  const openChannelPromises = payload.peerAddresses.map(async (peerAddress) => {
    try {
      const { transactionReceipt, channelId } = await openChannel({
        apiEndpoint: payload.apiEndpoint,
        apiToken: payload.apiToken,
        timeout: payload.timeout,
        destination: peerAddress,
        amount: payload.amount
      });
      return { peerAddress, transactionReceipt, channelId };
    } catch (error) {
      return { peerAddress, transactionReceipt: null, channelId: '' }; // Set channelId as an empty string in case of an error
    }
  });

  // Use Promise.allSettled to wait for all the promises to settle
  const results = await Promise.allSettled(openChannelPromises);

  // Filter out the fulfilled results and return an object with receipts and channelId keyed by node address
  const transactionReceipts: {
    [destination: string]: { channelId: string; transactionReceipt: string };
  } = {};
  results.forEach((result) => {
    if (result.status === 'fulfilled' && result.value.transactionReceipt) {
      const { peerAddress, transactionReceipt, channelId } = result.value;
      transactionReceipts[peerAddress] = { channelId, transactionReceipt };
    }
  });

  return transactionReceipts;
};
