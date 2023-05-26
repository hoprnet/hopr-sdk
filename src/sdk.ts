import { ApiAdapter } from './api/adapter';
import { GetChannelResponseType } from './types';
import { createLogger } from './utils';

const log = createLogger('HoprSdk');

// minimum amount of balance needed to do a transaction on gnosis chain
const MINIMUM_GNOSIS_GAS = 0.01;

/**
 * Main SDK class that exposes all functionality of the HOPR SDK.
 */
export class HoprSdk {
  public api: ApiAdapter;

  /**
   * Creates a new instance of the HOPR SDK.
   * @param url - The URL for the HOPR node API.
   * @param apiToken - The API token for the HOPR node.
   */
  constructor({
    url,
    apiKey,
    timeout
  }: {
    url: string;
    apiKey: string;
    timeout?: number;
  }) {
    this.api = new ApiAdapter({ url, apiKey, timeout });
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
    const sumOfHoprBalanceExpectedInFunds =
      BigInt(amount) * BigInt(peerIds.length);

    const nodeHasEnoughHoprBalance =
      BigInt(balance?.hopr ?? 0) > sumOfHoprBalanceExpectedInFunds;
    const nodeHasEnoughNativeBalance =
      BigInt(balance?.native ?? 0) > MINIMUM_GNOSIS_GAS;

    if (!nodeHasEnoughHoprBalance || !nodeHasEnoughNativeBalance) {
      log.debug(
        `node does not have enough balance to fund channels it needs: ${
          balance?.native
        }, and has:${sumOfHoprBalanceExpectedInFunds.toString()}`
      );
      return;
    }

    // receipts of open channels keyed by peerId
    const receipts: {
      [peerId: string]: {
        channelId: string;
        receipt: string;
      };
    } = {};

    // open channels for each peerId
    for (const peerId of peerIds) {
      const receipt = await this.api.channels.openChannel({ peerId, amount });
      if (receipt) {
        receipts[peerId] = receipt;
      }
    }

    return receipts;
  }
}
