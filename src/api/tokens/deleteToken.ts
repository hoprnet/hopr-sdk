import { APIError, fetchWithTimeout, getHeaders } from '../../utils';
import { DeleteTokenPayloadType, Error } from '../../types';

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
  const rawResponse = await fetchWithTimeout(
    `${payload.apiEndpoint}/api/v2/tokens/${payload.id}`,
    {
      method: 'DELETE',
      headers: getHeaders(payload.apiToken)
    },
    payload.timeout
  );

  if (rawResponse.status === 204) {
    return true;
  } else if (rawResponse.status > 499) {
    // server error that was unexpected
    throw new APIError({
      status: rawResponse.status.toString(),
      error: rawResponse.statusText
    });
  } else {
    // response is neither successful nor unexpected
    const jsonResponse = await rawResponse.json();
    throw new APIError(Error.parse(jsonResponse));
  }
};
