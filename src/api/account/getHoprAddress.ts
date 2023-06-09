import { BasePayloadType } from '../../types';
import { getAddresses } from './getAddresses';

/**
 * Get the HOPR address of the node.
 *
 * @param apiEndpoint - The API endpoint
 * @param apiToken - The API token to be used for authentication.
 * @returns A Promise that resolves to the HOPR address.
 * @throws An error that occurred while processing the request.
 */
export const getHoprAddress = async (
  payload: BasePayloadType
): Promise<string> => {
  const addresses = await getAddresses({
    apiEndpoint: payload.apiEndpoint,
    apiToken: payload.apiToken,
    timeout: payload.timeout
  });
  return addresses.hopr;
};
