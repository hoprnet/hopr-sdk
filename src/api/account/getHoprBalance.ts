import { getBalances } from './getBalances';

export const getHoprBalance = async (): Promise<
  string | { status: string; error: string }
> => {
  const balances = await getBalances();
  if ('hopr' in balances) return balances['hopr'];
  return { status: balances['status']!, error: balances['error']! };
};
