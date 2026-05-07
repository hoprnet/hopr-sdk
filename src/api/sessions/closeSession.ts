import {
  ApiErrorResponse,
  CloseSessionPayloadType
} from '../../types';
import { sdkApiError, fetchWithTimeout, getHeaders } from '../../utils';

/**
 * Closes an active session.
 *
 * @param apiEndpoint - The API endpoint
 * @param apiToken - The API token used to authenticate the request.
 * @returns A Promise that resolves to true if the session was successfully closed.
 * @throws An error that occurred while processing the request.
 */
export const closeSession = async (
  payload: CloseSessionPayloadType
): Promise<boolean> => {
  const { protocol, listeningIp, port, apiToken, apiEndpoint } = payload;
  const url = new URL(
    `api/v4/session/${protocol}/${listeningIp}/${port}`,
    apiEndpoint
  );
  const rawResponse = await fetchWithTimeout(
    url,
    {
      method: 'DELETE',
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

  // received expected response (204 No Content documented for delete)
  if (rawResponse.status === 204) {
    return true;
  }

  const jsonResponse = await rawResponse.json();

  // any 2xx body we treat as success boolean true
  if (rawResponse.ok) {
    return true;
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
  throw isApiErrorResponse.error;
};
