import fetch from 'cross-fetch';
import { APIError, getHeaders } from '../../utils';
import { Error, deletePayloadType } from '../../types';

/**
 * Deletes a token. Can only be done before the lifetime expired.
 * After the lifetime expired the token is automatically deleted.
 *
 * @param url - The URL of the API endpoint.
 * @param apiKey - The API key to be used for authentication.
 * @returns A Promise that resolves to true if successful.
 * @throws An error that occurred while processing the request.
 */
export const deleteToken = async (
  url: string,
  apiKey: string,
  body: deletePayloadType
): Promise<boolean> => {
  const rawResponse = await fetch(`${url}/api/v2/tokens/${body.id}`, {
    method: 'DELETE',
    headers: getHeaders(apiKey)
  });

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
