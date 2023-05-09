import fetch from 'cross-fetch';
import { getHeaders } from '../utils';

/**
 * Gets the HOPR and native addresses associated to the node.
 *
 * @param url - The URL of the API endpoint.
 * @param apiKey - The API key to be used for authentication.
 *
 * @returns A promise that resolves with an object containing the HOPR and native addresses if successful, or an object with the keys "status" and "error" if unsuccessful.
 */
export const getAddresses = async (
  url: string,
  apiKey: string
): Promise<
  { hopr: string; native: string } | { status: string; error: string }
> => {
  const res = await fetch(`${url}/api/v2/account/addresses`, {
    method: 'GET',
    headers: getHeaders(apiKey)
  });
  const addresses = (await res.json()) as {
    nativeAddress?: string;
    native?: string;
    hoprAddress?: string;
    hopr?: string;
    status?: string;
    error?: string;
  };
  if (addresses['hopr'] && addresses['native'])
    return {
      hopr: addresses['hopr'],
      native: addresses['native']
    };
  return { status: addresses['status']!, error: addresses['error']! };
};
