import { sdkApiError, fetchWithTimeout, getHeaders } from '../../utils';
import {
  AliasPayloadType,
  ApiErrorResponse,
  GetAddressFromAliasResponse
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
export const getAddressFromAlias = async (payload: AliasPayloadType): Promise<string> => {
  const url = new URL(`api/v3/aliases_addresses/${payload.alias}`, payload.apiEndpoint);
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
  const parsedRes = GetAddressFromAliasResponse.safeParse(jsonResponse);

  // received expected response
  if (parsedRes.success) {
    return parsedRes.data.address;
  }

  // check if response has the structure of an expected api error
  const isApiErrorResponse = ApiErrorResponse.safeParse(jsonResponse);

  if (isApiErrorResponse.success) {
    throw new sdkApiError({
      status: rawResponse.status,
      statusText: isApiErrorResponse.data.status,
      hoprdErrorPayload: isApiErrorResponse.data
    });
  }

  // we could not parse the response and it is unexpected
  throw new ZodError(parsedRes.error.issues);
};
