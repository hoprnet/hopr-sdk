import { CashOutPayloadType } from '../types/flows';
import { getBalances, withdraw } from '../api/account';

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
