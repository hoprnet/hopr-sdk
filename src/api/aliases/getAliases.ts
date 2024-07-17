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
      status: rawResponse.status,
      statusText: rawResponse.statusText
    });
  }


  const jsonResponse = await rawResponse.json();
  const parsedRes = GetAliasesResponse.safeParse(jsonResponse);

  // parsedRes and error {} from HOPRd have the same type,
  // we can only rely on rawResponse.ok to know if its a success
  if (parsedRes.success && rawResponse.ok) {
    return parsedRes.data;
  }


  // check if response has the structure of an expected api error
  const isApiErrorResponse = ApiErrorResponse.safeParse(jsonResponse);

  if (isApiErrorResponse.success) {
    throw new sdkApiError({
      status: rawResponse.status,
      statusText: rawResponse.statusText,
      hoprdErrorPayload: isApiErrorResponse.data
    });
  }

  // we could not parse the response and it is not unexpected
  throw new Error('We could not parse the response and it is not unexpected');
};
