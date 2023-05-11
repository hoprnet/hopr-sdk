import fetch from 'cross-fetch';
import { getHeaders, APIError } from '../../utils';
import { getAliasesResponse, getAliasesResponseType, Error } from '../../types';

/**
 * Get all aliases you set previously and their corresponding peer IDs.
 *
 * @param url - The base URL of the server.
 * @param apiKey - The API key to use for authentication.
 * @returns An object with alias names as keys and the peerId associated with the alias.
 * @throws An error that occurred while processing the request.
 */
export const getAliases = async (
  url: string,
  apiKey: string
): Promise<getAliasesResponseType> => {
  const rawResponse = await fetch(`${url}/api/v2/aliases`, {
    method: 'GET',
    headers: getHeaders(apiKey)
  });

  const jsonResponse = await rawResponse.json();

  const parsedRes = getAliasesResponse.safeParse(jsonResponse);

  if (parsedRes.success && rawResponse.status === 200) {
    return parsedRes.data;
  } else if (rawResponse.status > 499) {
    throw new APIError({
      status: rawResponse.status.toString(),
      error: rawResponse.statusText
    });
  } else {
    // response is neither successful nor unexpected
    throw new APIError(Error.parse(jsonResponse));
  }
};
