import { getBalances } from './getBalances';

/**
 * Get the HOPR balance of the node.
 *
 * @param url - The URL of the API endpoint.
 * @param apiKey - The API key to be used for authentication.
 * @returns A Promise that resolves with a string representing the HOPR balance, or an object with the keys "status" and "error" if unsuccessful.
 */
export const getHoprBalance = async (
  url: string,
  apiKey: string
): Promise<string | { status: string; error: string }> => {
  const balances = await getBalances(url, apiKey);
  if ('hopr' in balances) return balances['hopr'];
  return { status: balances['status']!, error: balances['error']! };
};
