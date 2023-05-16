import fetch from 'cross-fetch';
import { APIError, getHeaders } from '../../utils';
import { AliasPayloadType, Error, GetAliasResponse } from '../../types';

/**
 * Get the PeerId (Hopr address) that have this alias assigned to it.
 *
 * @param url - The base URL of the server.
 * @param apiKey - The API key to use for authentication.
 * @param body - An object containing the alias to retrieve the peer ID for.
 * @returns A promise that resolves to the peer ID associated with the alias.
 * @throws An error that occurred while processing the request.
 */
export const getAlias = async (payload: AliasPayloadType): Promise<string> => {
  const rawResponse = await fetch(
    `${payload.url}/api/v2/aliases/${payload.alias}`,
    {
      method: 'GET',
      headers: getHeaders(payload.apiKey)
    }
  );

  const jsonResponse = await rawResponse.json();
  const parsedRes = GetAliasResponse.safeParse(jsonResponse);

  if (rawResponse.status === 200 && parsedRes.success) {
    return parsedRes.data.peerId;
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
