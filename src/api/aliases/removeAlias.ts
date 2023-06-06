import { AliasPayloadType, Error } from '../../types';
import { APIError, fetchWithTimeout, getHeaders } from '../../utils';

/**
 * Unassign an alias from a PeerId.
 *
 * @param apiEndpoint - The API endpoint
 * @param apiToken - The API token used to authenticate the request.
 * @param body - The payload containing the details of the alias to remove.
 * @returns A Promise that resolves to true if the alias was successfully removed.
 * @throws An error that occurred while processing the request.
 */
export const removeAlias = async (
  payload: AliasPayloadType
): Promise<boolean> => {
  const apiEndpointParsed = new URL(payload.apiEndpoint).href;
  const rawResponse = await fetchWithTimeout(
    `${apiEndpointParsed}api/v2/aliases/${payload.alias}`,
    {
      method: 'DELETE',
      headers: getHeaders(payload.apiToken)
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
