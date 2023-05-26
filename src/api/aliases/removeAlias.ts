import { AliasPayloadType, Error } from '../../types';
import { APIError, fetchWithTimeout, getHeaders } from '../../utils';

/**
 * Unassign an alias from a PeerId.
 *
 * @param url - The base URL of the server.
 * @param apiKey - The API key used to authenticate the request.
 * @param body - The payload containing the details of the alias to remove.
 * @returns A Promise that resolves to true if the alias was successfully removed.
 * @throws An error that occurred while processing the request.
 */
export const removeAlias = async (
  payload: AliasPayloadType
): Promise<boolean> => {
  const rawResponse = await fetchWithTimeout(
    `${payload.url}/api/v2/aliases/${payload.alias}`,
    {
      method: 'DELETE',
      headers: getHeaders(payload.apiKey)
    },
    payload.timeout
  );

  if (rawResponse.status === 204) {
    return true;
  } else if (rawResponse.status > 499) {
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
