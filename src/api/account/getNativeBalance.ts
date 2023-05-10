import { getBalances } from './getBalances';

/**
 * Get the native balance of the node.
 *
 * @param url - The URL of the API endpoint.
 * @param apiKey - The API key to be used for authentication.
 * @returns A Promise that resolves with a string representing the native balance.
 * @throws An error that occurred while processing the request.
 */
export const getNativeBalance = async (
  url: string,
  apiKey: string
): Promise<string> => {
  try {
    const balances = await getBalances(url, apiKey);
    return balances.native;
  } catch (APIError) {
    throw APIError;
  }
};
