import { ZodError } from 'zod';
import {
  ApiErrorResponse,
  OpenSessionResponse,
  UpdateSessionConfigCallType,
  UpdateSessionConfigType
} from '../../types';
import { sdkApiError, fetchWithTimeout, getHeaders } from '../../utils';

/**
 * Updates configuration of an existing active session.
 *
 * @param apiEndpoint - The API endpoint
 * @param apiToken - The API token to be used for authentication.
 * @param sessionId - The ID of the session to update the configuration for.
 * @param maxSurbUpstream - The maximum upstream bandwidth for SURBs (e.g., "2 Mbps").
 * @param responseBuffer - The size of the response buffer (e.g., "2 MB").
 */
export const updateSessionConfig = async (
  payload: UpdateSessionConfigCallType
): Promise<boolean> => {
  const { sessionId, maxSurbUpstream, responseBuffer, apiToken, apiEndpoint } = payload;
  const body: UpdateSessionConfigType =
    {
      maxSurbUpstream,
      responseBuffer
    };

  const url = new URL(`api/v4/session/config/${sessionId}`, apiEndpoint);
  const rawResponse = await fetchWithTimeout(
    url,
    {
      method: 'POST',
      headers: getHeaders(apiToken),
      body: JSON.stringify(body)
    },
    payload.timeout
  );

  // received unexpected error from server
  if (rawResponse.status >= 500) {
    throw new Error(rawResponse.statusText);
  }

  // received expected response
  if (rawResponse.status === 204 || rawResponse.status === 200) {
    return true;
  }

  // check if response has the structure of an expected api error
  const jsonResponse = await rawResponse.json();
  const isApiErrorResponse = ApiErrorResponse.safeParse(jsonResponse);

  if (isApiErrorResponse.success) {
    throw new sdkApiError({
      status: rawResponse.status,
      statusText: isApiErrorResponse.data.status,
      hoprdErrorPayload: isApiErrorResponse.data
    });
  }

  // we could not parse the error and it is not unexpected
  throw new ZodError(isApiErrorResponse.error.issues);
};
