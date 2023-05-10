import fetch from 'cross-fetch';
import { APIError, getHeaders } from '../../utils';
import { Error, aliasPayloadType } from '../../types';

/**
 * Get the PeerId (Hopr address) that have this alias assigned to it.
 *
 * @param url - The base URL of the server.
 * @param apiKey - The API key to use for authentication.
 * @param body - An object containing the alias to retrieve the peer ID for.
 * @returns A promise that resolves to the peer ID associated with the alias, or an object with a status and error message if there was an error.
 * @throws An error that occurred while processing the request.
 */
export const getAlias = async (
  url: string,
  apiKey: string,
  body: aliasPayloadType
): Promise<string> => {
  const rawResponse = await fetch(`${url}/api/v2/aliases/${body.alias}`, {
    method: 'GET',
    headers: getHeaders(apiKey)
  });

  const jsonResponse = await rawResponse.json();

  if (rawResponse.status === 200) {
    return jsonResponse.peerId;
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
