import { getBalances } from './getBalances';

/**
 * Get the native balance of the node.
 *
 * @param url - The URL of the API endpoint.
 * @param apiKey - The API key to be used for authentication.
 * @returns A Promise that resolves with a string representing the native balance, or an object with the keys "status" and "error" if unsuccessful.
 */
export const getNativeBalance = async (
  url: string,
  apiKey: string
): Promise<string | { status: string; error: string }> => {
  const balances = await getBalances(url, apiKey);
  if ('native' in balances) return balances['native'];
  return { status: balances['status']!, error: balances['error']! };
};
