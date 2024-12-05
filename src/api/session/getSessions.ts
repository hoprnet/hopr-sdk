import { ZodError } from 'zod';
import {
  ApiErrorResponse,
  GetSessionsPayloadType,
  GetSessionsResponse,
  GetSessionsResponseType
} from '../../types';
import {
  sdkApiError,
  fetchWithTimeout,
  getHeaders
} from '../../utils';

/**
 * Get all aliases you set previously and their corresponding peer IDs.
 *
 * @param apiEndpoint - The API endpoint
 * @param apiToken - The API token to use for authentication.
 * @returns An object with alias names as keys and the peerId associated with the alias.
 * @throws An error that occurred while processing the request.
 */
export const getSessions = async (
  payload: GetSessionsPayloadType
): Promise<GetSessionsResponseType> => {
  const { protocol, apiToken, apiEndpoint } = payload;
  const url = new URL(`api/v3/sessions/${protocol}`, apiEndpoint);
  const rawResponse = await fetchWithTimeout(
    url,
    {
      method: 'GET',
      headers: getHeaders(apiToken)
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

  // parsedRes and error {} from HOPRd have the same type,
  // we can only rely on rawResponse.ok to know if its a success
  if (rawResponse.ok) {
    const parsedRes = GetSessionsResponse.safeParse(jsonResponse);
    if (parsedRes.success) {
      return parsedRes.data;
    }
    throw new ZodError(parsedRes.error.issues);
  }

  const isApiErrorResponse = ApiErrorResponse.safeParse(jsonResponse);

  if (isApiErrorResponse.success) {
    throw new sdkApiError({
      status: rawResponse.status,
      statusText: rawResponse.statusText,
      hoprdErrorPayload: isApiErrorResponse.data
    });
  }

  // we could not parse the response and it is unexpected
  throw new ZodError(isApiErrorResponse.error.issues);
};
