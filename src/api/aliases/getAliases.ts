import fetch from 'cross-fetch';
import { getHeaders } from '../../utils';

/**
 * Get all aliases you set previously and their corresponding peer IDs.
 *
 * @param url - The URL to retrieve the aliases from.
 * @param apiKey - The API key to use for authentication.
 * @returns An object with alias names as keys, and either the peerId associated with the alias or a status and error message object.
 */
export const getAliases = async (
  url: string,
  apiKey: string
): Promise<{
  [key: string]: string | { status: string; error: string };
}> => {
  const res = await fetch(`${url}/api/v2/aliases`, {
    method: 'GET',
    headers: getHeaders(apiKey)
  });

  const aliases = (await res.json()) as {
    [key: string]: string | { status: string; error: string };
  };

  if ('error' in aliases && 'status' in aliases)
    return { status: aliases['status'], error: aliases['error'] };
  return aliases;
};
