import { BasePayloadType } from '../../types';
import { getBalances } from './getBalances';

/**
 * Get the native balance of the node.
 *
 * @param apiEndpoint - The API endpoint
 * @param apiToken - The API token to be used for authentication.
 * @returns A Promise that resolves with a string representing the native balance.
 * @throws An error that occurred while processing the request.
 */
export const getNativeBalance = async (
  payload: BasePayloadType
): Promise<string> => {
  const balances = await getBalances({
    apiEndpoint: payload.apiEndpoint,
    apiToken: payload.apiToken,
    timeout: payload.timeout
  });
  return balances.native;
};
