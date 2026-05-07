import {
  ApiErrorResponse,
  GetSessionsPayloadType,
  GetSessionsResponse,
  GetSessionsResponseType
} from '../../types';
import { sdkApiError, fetchWithTimeout, getHeaders } from '../../utils';

/**
 * Get all sessions you set previously and their corresponding data.
 *
 * @param apiEndpoint - The API endpoint
 * @param apiToken - The API token to use for authentication.
 * @returns An array of session payloads.
 * @throws An error that occurred while processing the request.
 */
export const getSessions = async (
  payload: GetSessionsPayloadType
): Promise<GetSessionsResponseType> => {
  const { protocol, apiToken, apiEndpoint } = payload;
  const url = new URL(`api/v4/session/${protocol}`, apiEndpoint);
  const rawResponse = await fetchWithTimeout(
    url,
    {
      method: 'GET',
      headers: getHeaders(apiToken)
    },
    payload.timeout
  );

  // received unexpected error from server
  if (rawResponse.status >= 500) {
    throw new sdkApiError({
      status: rawResponse.status,
      statusText: rawResponse.statusText
    });
  }

  const jsonResponse = await rawResponse.json();

  // any non-2xx response is an error path
  if (!rawResponse.ok) {
    const isApiErrorResponse = ApiErrorResponse.safeParse(jsonResponse);
    if (isApiErrorResponse.success) {
      throw new sdkApiError({
        status: rawResponse.status,
        statusText: isApiErrorResponse.data.status,
        hoprdErrorPayload: isApiErrorResponse.data
      });
    }
    throw isApiErrorResponse.error;
  }

  const parsedRes = GetSessionsResponse.safeParse(jsonResponse);
  if (parsedRes.success) {
    return parsedRes.data;
  }
  throw parsedRes.error;
};
