import { ExtendedBasicPayloadType } from '../../types';
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
  payload: ExtendedBasicPayloadType
): Promise<string> => {
  try {
    const balances = await getBalances({
      url: payload.url,
      apiKey: payload.apiKey,
      timeout: payload.timeout
    });
    return balances.hopr;
  } catch (APIError) {
    throw APIError;
  }
};
