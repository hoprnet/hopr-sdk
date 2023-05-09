import fetch from 'cross-fetch';
import { getHeaders } from '../../utils';

/**
 * Get the PeerId (Hopr address) that have this alias assigned to it.
 *
 * @param url - The base URL of the messaging service.
 * @param apiKey - The API key to use for authentication.
 * @param alias - The alias to retrieve the peer ID for.
 * @returns A promise that resolves to the peer ID associated with the alias, or an object with a status and error message if there was an error.
 */
export const getAlias = async (
  url: string,
  apiKey: string,
  alias: string
): Promise<string | { status: string; error?: string }> => {
  const res = await fetch(`${url}/api/v2/aliases/${alias}`, {
    method: 'GET',
    headers: getHeaders(apiKey)
  });

  const aliasResponse = (await res.json()) as {
    peerId?: string;
    status?: string;
    error?: string;
  };

  if (aliasResponse['peerId']) return aliasResponse['peerId'];
  else if (aliasResponse['error'])
    return { status: aliasResponse['status']!, error: aliasResponse['error'] };
  return { status: aliasResponse['status']! };
};
