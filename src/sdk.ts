import { ethers } from 'ethers';
import { ApiAdapter } from './api/adapter';
import { GetChannelResponseType } from './types';
import { createLogger } from './utils';

const log = createLogger('HoprSdk');

// const ETH_TO_WEI = 10e18;

// minimum amount of balance needed to do a transaction on gnosis chain
// const MINIMUM_GNOSIS_GAS = BigInt(0.01 * ETH_TO_WEI);
// const MINIMUM_GNOSIS_GAS = ethers.utils.parseUnits('1', 'wei').mul(0.01);
// console.log(MINIMUM_GNOSIS_GAS.toString())
const MINIMUM_GNOSIS_GAS = ethers.utils.parseUnits('0.01', 18);

/**
 * Main SDK class that exposes all functionality of the HOPR SDK.
 */
export class HoprSDK {
  public api: ApiAdapter;

  /**
   * Creates a new instance of the HOPR SDK.
   * @param url - The URL for the HOPR node API.
   * @param apiToken - The API token for the HOPR node.
   */
  constructor({
    apiEndpoint,
    apiToken,
    timeout
  }: {
    apiEndpoint: string;
    apiToken: string;
    timeout?: number;
  }) {
    this.api = new ApiAdapter({ apiEndpoint, apiToken, timeout });
  }

  /**
   * Gets the outgoing channels with optional status filter.
   * @param status - Optional status filter.
   * @returns An array of outgoing channels matching the status filter.
   */
  private async getOutgoingChannels(status?: GetChannelResponseType['status']) {
    const channels = await this.api.channels.getChannels();

    // filter outgoing channels by status
    const outgoingChannels = status
      ? channels?.outgoing.filter((ch) => ch.status === status)
      : channels?.outgoing;

    return outgoingChannels;
  }

  /**
   * Safely send a message through the network. Checks if node has at least
   * one open outgoing channel
   * @param payload - The payload of the message.
   */
  public async safeSendMessage(
    // receive same payload as sendMessage function
    payload: Parameters<ApiAdapter['messages']['sendMessage']>[0]
  ) {
    const outgoingChannels = await this.getOutgoingChannels('Open');

    // has at least one outgoing channel
    if (!outgoingChannels?.length) {
      log.debug('could not find one outgoing channel that is open');
      return;
    }

    return await this.api.messages.sendMessage(payload);
  }

  /**
   * Closes all open outgoing channels and redeems any pending tickets.
   * This is a long running function and may take a more than 5 minutes to run
   */
  public async closeEverything() {
    const outgoingChannels = await this.getOutgoingChannels('Open');
    const closedChannels = [];
    // close outgoing open channels
    if (outgoingChannels?.length) {
      for (const channel of outgoingChannels) {
        const closedChannel = await this.api.channels.closeChannel({
          direction: 'outgoing',
          peerId: channel.peerId
        });
        if (closedChannel) {
          closedChannels.push(closedChannel);
        }
      }
    }

    const statistics = await this.api.tickets.getStatistics();
    let ticketsHaveBeenRedeemed = false;

    // check if we have pending tickets
    if (statistics?.pending) {
      // redeem tickets
      ticketsHaveBeenRedeemed =
        (await this.api.tickets.redeemTickets()) ?? false;
    }

    return {
      closedChannels,
      redeemedTickets: ticketsHaveBeenRedeemed
    };
  }

  /**
   * Withdraw all funds from the node.
   * Does not include funds locked in open channels and pending tickets.
   * This is a long running function and may take a more than 5 minutes to run
   * @param recipient - The address of the recipient.
   * @returns The transaction receipts for the cash out transactions.
   */
  public async cashOut({ recipient }: { recipient: string }) {
    // get balance to proceed to withdraw that balance
    const balance = await this.api.account.getBalances();
    const receipts: { native?: string; hopr?: string } = {};

    if (balance?.native && !!BigInt(balance?.native)) {
      const transferNativeFunds = await this.api.account.withdraw({
        recipient,
        amount: balance?.native,
        currency: 'NATIVE'
      });
      receipts.native = transferNativeFunds;
    }

    if (balance?.hopr && !!BigInt(balance?.hopr)) {
      const transferHoprFunds = await this.api.account.withdraw({
        recipient,
        amount: balance?.hopr,
        currency: 'HOPR'
      });
      receipts.hopr = transferHoprFunds;
    }

    return receipts;
  }

  public async openMultipleChannels({
    peerIds,
    amount
  }: {
    peerIds: string[];
    amount: string;
  }) {
    // check if node has enough funds
    const balance = await this.api.account.getBalances();
    console.log(
      `Balance: HOPR: ${ethers.utils.formatEther(
        balance.hopr
      )} | NATIVE: ${ethers.utils.formatEther(balance.native)}`
    );
    const sumOfHoprBalanceExpectedInFunds = ethers.utils
      .parseEther(amount)
      .mul(peerIds.length);
    console.log(
      'hopr balance needed:',
      ethers.utils.formatEther(sumOfHoprBalanceExpectedInFunds)
    );

    const nodeHasEnoughHoprBalance = ethers.utils
      .parseEther(balance.hopr)
      .gte(sumOfHoprBalanceExpectedInFunds);
    console.log('node has enough hopr balance:', nodeHasEnoughHoprBalance);

    const sumOfNativeBalanceExpectedInFunds = MINIMUM_GNOSIS_GAS.mul(
      peerIds.length
    );
    console.log(
      'native balance needed:',
      ethers.utils.formatEther(sumOfNativeBalanceExpectedInFunds)
    );

    const nodeHasEnoughNativeBalance = ethers.utils
      .parseEther(balance.native)
      .gte(MINIMUM_GNOSIS_GAS.mul(peerIds.length));
    console.log('node has enough native balance:', nodeHasEnoughNativeBalance);

    if (!nodeHasEnoughHoprBalance || !nodeHasEnoughNativeBalance) {
      log.debug(
        `node does not have enough balance to fund channels it needs: ${ethers.utils.formatEther(
          sumOfHoprBalanceExpectedInFunds.toString()
        )}, and has:${ethers.utils.formatEther(balance.native)}`
      );

      console.log(
        `Node does not have enough HOPR balance to fund channels it needs: ${ethers.utils.formatEther(
          sumOfHoprBalanceExpectedInFunds.toString()
        )}, and has:${ethers.utils.formatEther(
          balance.hopr
        )} or does not have enough NATIVE balance, to open Channels it needs: ${ethers.utils.formatEther(
          sumOfNativeBalanceExpectedInFunds.toString()
        )}, and has:${ethers.utils.formatEther(balance.native)}`
      );
      return;
    }

    // Open channels for each peerId and gather the promises
    const openChannelPromises = peerIds.map(async (peerId) => {
      try {
        const {receipt, channelId} = await this.api.channels.openChannel({ peerId, amount });
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
  }
}

const sdk = new HoprSDK({
  apiEndpoint: 'http://5.75.152.180:3001',
  apiToken: 'Lu1s-3dm4nu3l!',
  timeout: 60e3 * 7
});
const peersIds = [
  '16Uiu2HAmDr5LAGejtLAQuikF9RRkxVr8JWMCMUsZPXHGjt95179y',
  '16Uiu2HAmHFt6LU7f2V5UFU2F4dLdxiKdoePyftVKnRVFb7gBWeJL'
];
const amount = '0.01';
const parsedOutgoing = parseFloat(amount ?? '0') >= 0 ? amount ?? '0' : '0';
const weiValue = ethers.utils.parseEther(parsedOutgoing).toString();
sdk
  .openMultipleChannels({ peerIds: peersIds, amount: weiValue })
  .then(console.log)
  .catch((e) => console.log(e));
