import { getBalances } from './getBalances';

export const getNativeBalance = async (): Promise<
  string | { status: string; error: string }
> => {
  const balances = await getBalances();
  if ('native' in balances) return balances['native'];
  return { status: balances['status']!, error: balances['error']! };
};
