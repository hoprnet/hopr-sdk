import { getAddresses } from './getAddresses';
import { APIError } from '../../utils';

/**
 * Get the HOPR address of the node.
 *
 * @param url - The URL of the API endpoint.
 * @param apiKey - The API key to be used for authentication.
 * @returns A Promise that resolves to the HOPR address.
 * @throws An error that occurred while processing the request.
 */
export const getHoprAddress = async (
  url: string,
  apiKey: string
): Promise<string> => {
  try {
    const addresses = await getAddresses(url, apiKey);
    return addresses.hopr;
  } catch (APIError) {
    throw APIError;
  }
};
