import { getBalances } from './getBalances';

/**
 * Get the HOPR balance of the node.
 *
 * @param url - The URL of the API endpoint.
 * @param apiKey - The API key to be used for authentication.
 * @returns A Promise that resolves to a string representing the HOPR balance.
 * @throws An error that occurred while processing the request.
 */
export const getHoprBalance = async (
  url: string,
  apiKey: string
): Promise<string> => {
  try {
    const balances = await getBalances(url, apiKey);
    return balances.hopr;
  } catch (APIError) {
    throw APIError;
  }
};