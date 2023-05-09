import fetch from 'cross-fetch';
import { getHeaders } from '../utils';

/**
 * Fetches the HOPR and native balances of the node.
 *
 * @param url - The URL of the API endpoint.
 * @param apiKey - The API key to be used for authentication.
 * @returns A Promise that resolves with an object containing the HOPR and native balances if successful, or an object with the keys "status" and "error" if unsuccessful.
 */
export const getBalances = async (
  url: string,
  apiKey: string
): Promise<
  | {
      native: string;
      hopr: string;
    }
  | {
      status: string;
      error: string;
    }
> => {
  // Fetch and check error responses
  const res = await fetch(`${url}/api/v2/account/balances`, {
    method: 'GET',
    headers: getHeaders(apiKey)
  });
  const balances = (await res.json()) as {
    native?: string;
    hopr?: string;
    status?: string;
    error?: string;
  };

  if (balances.hopr && balances.native)
    return { hopr: balances.hopr, native: balances.native };
  return { status: balances.status!, error: balances.error! };
};
