import fetch from 'cross-fetch';
import { getHeaders } from '../../utils';

/**
 * Instead of using HOPR address, we can assign HOPR address to a specific name called alias.
 * Give an address a more memorable alias and use it instead of Hopr address.
 * Aliases are kept locally and are not saved or shared on the network.
 *
 * @param url - The URL of the API endpoint.
 * @param apiKey - The API key to be used for authentication.
 * @param peerId - The peer ID to set the alias for.
 * @param alias - The alias to set for the given peer ID.
 * @returns A Promise that resolves with void if successful, or an object with the keys "status" and "error" if unsuccessful.
 */
export const setAlias = async (
  url: string,
  apiKey: string,
  peerId: string,
  alias: string
): Promise<void | { status: string; error?: string }> => {
  const res = await fetch(`${url}/api/v2/aliases`, {
    method: 'POST',
    headers: getHeaders(apiKey),
    body: JSON.stringify({ peerId, alias })
  });
  try {
    const response = (await res.json()) as {
      status: string;
      error?: string;
    };
    return response;
  } catch (e) {
    // If it can't turn the response into json, then it was successful
  }
};
