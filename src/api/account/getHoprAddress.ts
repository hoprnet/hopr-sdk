import { getAddresses } from './getAddresses';
import { APIError } from '../../utils';
import { BasicAuthenticationPayloadType } from '../../types';

/**
 * Get the HOPR address of the node.
 *
 * @param url - The URL of the API endpoint.
 * @param apiKey - The API key to be used for authentication.
 * @returns A Promise that resolves to the HOPR address.
 * @throws An error that occurred while processing the request.
 */
export const getHoprAddress = async (
  payload: BasicAuthenticationPayloadType
): Promise<string> => {
  try {
    const addresses = await getAddresses({
      url: payload.url,
      apiKey: payload.apiKey
    });
    return addresses.hopr;
  } catch (APIError) {
    throw APIError;
  }
};
