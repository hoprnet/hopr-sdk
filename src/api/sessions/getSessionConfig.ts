import {
  ApiErrorResponse,
  GetSessionConfigCallPayloadType,
  GetSessionConfigResponse,
  GetSessionConfigPayloadResponseType
} from '../../types';
import { sdkApiError, fetchWithTimeout, getHeaders } from '../../utils';

/**
 * Gets configuration of an existing active session.
 *
 * @param apiEndpoint - The API endpoint
 * @param apiToken - The API token to use for authentication.
 * @param sessionId - The ID of the session to retrieve the configuration for.
 */
export const getSessionConfig = async (
  payload: GetSessionConfigCallPayloadType
): Promise<GetSessionConfigPayloadResponseType> => {
  const { sessionId, apiToken, apiEndpoint } = payload;
  const url = new URL(`api/v4/session/config/${sessionId}`, apiEndpoint);
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
  const parsedRes = GetSessionConfigResponse.safeParse(jsonResponse);

  // received expected response
  if (parsedRes.success) {
    return parsedRes.data;
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
  throw parsedRes.error;
};
