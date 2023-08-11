import { BasePayloadType } from '../../types';
import { getBalances } from './getBalances';

/**
 * Get the HOPR balance of the node.
 *
 * @param apiEndpoint - The API endpoint
 * @param apiToken - The API token to be used for authentication.
 * @returns A Promise that resolves to a string representing the HOPR balance.
 * @throws An error that occurred while processing the request.
 */
export const getHoprBalance = async (
  payload: BasePayloadType
): Promise<string> => {
  const balances = await getBalances({
    apiEndpoint: payload.apiEndpoint,
    apiToken: payload.apiToken,
    timeout: payload.timeout
  });
  return balances.hopr;
};
