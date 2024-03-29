import { APIError, fetchWithTimeout, getHeaders } from '../../utils';
import {
  AliasPayloadType,
  APIErrorResponse,
  GetAliasResponse
} from '../../types';
import { ZodError } from 'zod';

/**
 * Get the PeerId (Hopr address) that have this alias assigned to it.
 *
 * @param apiEndpoint - The API endpoint
 * @param apiToken - The API token to use for authentication.
 * @param body - An object containing the alias to retrieve the peer ID for.
 * @returns A promise that resolves to the peer ID associated with the alias.
 * @throws An error that occurred while processing the request.
 */
export const getAlias = async (payload: AliasPayloadType): Promise<string> => {
  const url = new URL(`api/v3/aliases/${payload.alias}`, payload.apiEndpoint);
  const rawResponse = await fetchWithTimeout(
    url,
    {
      method: 'GET',
      headers: getHeaders(payload.apiToken)
    },
    payload.timeout
  );

  // received unexpected error from server
  if (rawResponse.status > 499) {
    throw new Error(rawResponse.statusText);
  }

  const jsonResponse = await rawResponse.json();
  const parsedRes = GetAliasResponse.safeParse(jsonResponse);

  // received expected response
  if (parsedRes.success) {
    return parsedRes.data.peerId;
  }

  // check if response has the structure of an expected api error
  const isApiErrorResponse = APIErrorResponse.safeParse(jsonResponse);

  if (isApiErrorResponse.success) {
    throw new APIError(isApiErrorResponse.data);
  }

  // we could not parse the response and it is not unexpected
  throw new ZodError(parsedRes.error.issues);
};
