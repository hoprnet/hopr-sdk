import { BasicAuthenticationPayloadType } from '../../types';
import { getAddresses } from './getAddresses';

/**
 * Get the native address of the node.
 *
 * @param url - The URL of the API endpoint.
 * @param apiKey - The API key to be used for authentication.
 * @returns A Promise that resolves to the native address.
 * @throws An error that occurred while processing the request.
 */
export const getNativeAddress = async (
  payload: BasicAuthenticationPayloadType
): Promise<string> => {
  try {
    const addresses = await getAddresses({
      url: payload.url,
      apiKey: payload.apiKey
    });
    return addresses.native;
  } catch (APIError) {
    throw APIError;
  }
};
