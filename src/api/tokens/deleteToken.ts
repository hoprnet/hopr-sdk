import { sdkApiError, fetchWithTimeout, getHeaders } from '../../utils';
import { ApiErrorResponse, DeleteTokenPayloadType } from '../../types';
import { ZodError } from 'zod';

/**
 * Deletes a token. Can only be done before the lifetime expired.
 * After the lifetime expired the token is automatically deleted.
 *
 * @param apiEndpoint - The API endpoint
 * @param apiToken - The API token to be used for authentication.
 * @param id - The id of the token to be deleted.
 * @returns A Promise that resolves to true if successful.
 * @throws An error that occurred while processing the request.
 */
export const deleteToken = async (
  payload: DeleteTokenPayloadType
): Promise<boolean> => {
  const url = new URL(`api/v3/tokens/${payload.id}`, payload.apiEndpoint);
  const rawResponse = await fetchWithTimeout(
    url,
    {
      method: 'DELETE',
      headers: getHeaders(payload.apiToken)
    },
    payload.timeout
  );

  // received expected response
  if (rawResponse.status === 204) {
    return true;
  }

  // received unexpected error from server
  if (rawResponse.status > 499) {
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
