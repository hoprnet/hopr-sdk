import { ZodError } from 'zod';
import {
  ApiErrorResponse,
  CloseSessionPayloadType,
  CloseSessionPayloadCallType,
  RemoveBasicAuthenticationPayloadType
} from '../../types';
import { sdkApiError, fetchWithTimeout, getHeaders } from '../../utils';

/**
 * Unassign an alias from a PeerId.
 *
 * @param apiEndpoint - The API endpoint
 * @param apiToken - The API token used to authenticate the request.
 * @param body - The payload containing the details of the alias to remove.
 * @returns A Promise that resolves to true if the alias was successfully removed.
 * @throws An error that occurred while processing the request.
 */
export const closeSession = async (
  payload: CloseSessionPayloadType
): Promise<boolean> => {
  const { protocol, listeningIp, port, apiToken, apiEndpoint, } = payload;
  const url = new URL(`api/v3/session/${protocol}/${listeningIp}/${port}`, apiEndpoint);
  const rawResponse = await fetchWithTimeout(
    url,
    {
      method: 'DELETE',
      headers: getHeaders(apiToken),
    },
    payload.timeout
  );

  // received expected response
  if (rawResponse.ok) {
    return true;
  }

  // received unexpected error from server
  if (rawResponse.status >= 500) {
    throw new Error(rawResponse.statusText);
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
