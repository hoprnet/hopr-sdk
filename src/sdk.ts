import { ApiAdapter } from './api/adapter';
import { GetChannelResponseType } from './types';
import { createLogger } from './utils';

const log = createLogger('HoprSdk');

export class HoprSdk {
  public api: ApiAdapter;
  constructor({ url, apiToken }: { url: string; apiToken: string }) {
    this.api = new ApiAdapter(url, apiToken);
  }

  private async getOutgoingChannels(status?: GetChannelResponseType['status']) {
    const channels = await this.api.channels.getChannels();

    // filter outgoing channels by status
    const outgoingChannels = status
      ? channels?.outgoing.filter((ch) => ch.status === status)
      : channels?.outgoing;

    return outgoingChannels;
  }

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

  public async closeEverything() {
    // close outgoing
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

  public async cashOut({ recipient }: { recipient: string }) {
    // get balance to proceed to withdraw that balance
    const balance = await this.api.account.getBalances();
    const receipts: { native?: string; hopr?: string } = {};

    if (balance?.native) {
      const transferNativeFunds = await this.api.account.withdraw({
        recipient,
        amount: balance?.native,
        currency: 'NATIVE'
      });
      receipts.native = transferNativeFunds;
    }

    if (balance?.hopr) {
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
    const sumOfBalanceExpectedInFunds = BigInt(amount) * BigInt(peerIds.length);
    const nodeHasEnoughBalance =
      BigInt(balance?.native ?? 0) > sumOfBalanceExpectedInFunds;

    if (!nodeHasEnoughBalance) {
      log.debug(
        `node does not have enough balance to fund channels it needs: ${
          balance?.native
        }, and has:${sumOfBalanceExpectedInFunds.toString()}`
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
      const receipt = await this.api.channels.openChannels({ peerId, amount });
      if (receipt) {
        receipts[peerId] = receipt;
      }
    }

    return receipts;
  }
}
