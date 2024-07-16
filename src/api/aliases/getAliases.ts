import { ZodError } from 'zod';
import {
  ApiErrorResponse,
  BasePayloadType,
  GetAliasesResponse,
  GetAliasesResponseType
} from '../../types';
import { sdkApiError, fetchWithTimeout, getHeaders } from '../../utils';

/**
 * Get all aliases you set previously and their corresponding peer IDs.
 *
 * @param apiEndpoint - The API endpoint
 * @param apiToken - The API token to use for authentication.
 * @returns An object with alias names as keys and the peerId associated with the alias.
 * @throws An error that occurred while processing the request.
 */
export const getAliases = async (
  payload: BasePayloadType
): Promise<GetAliasesResponseType> => {
  const url = new URL(`api/v3/aliases`, payload.apiEndpoint);
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
    throw new sdkApiError({
      httpStatus: rawResponse.status,
      statusText: rawResponse.statusText
    });
  }

  const jsonResponse = await rawResponse.json();
  const parsedRes = GetAliasesResponse.safeParse(jsonResponse);

  // we could not parse the response
  if (parsedRes.success) {
    return parsedRes.data;
  }

  // check if response has the structure of an expected api error
  const isApiErrorResponse = ApiErrorResponse.safeParse(jsonResponse);

  if (isApiErrorResponse.success) {
    throw new sdkApiError({
      httpStatus: rawResponse.status,
      statusText: isApiErrorResponse.data.status,
      error: isApiErrorResponse.data?.error
    });
  }

  throw new ZodError(parsedRes.error.issues);
};
