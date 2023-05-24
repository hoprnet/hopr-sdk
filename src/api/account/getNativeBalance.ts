import { ExtendedBasicPayloadType } from '../../types';
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
  payload: ExtendedBasicPayloadType
): Promise<string> => {
  try {
    const balances = await getBalances({
      url: payload.url,
      apiKey: payload.apiKey,
      timeout: payload.timeout
    });
    return balances.native;
  } catch (APIError) {
    throw APIError;
  }
};
